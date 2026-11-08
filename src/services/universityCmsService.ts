import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  University,
  Program,
  AdmissionNotice,
  Scholarship,
  StudentLead,
  Faculty,
} from '@/types';
import {
  universities as sampleUniversities,
  programs as samplePrograms,
  admissionNotices as sampleNotices,
  scholarships as sampleScholarships,
  studentLeads as sampleLeads,
} from '@/data/sampleData';

export interface UserRoleRecord {
  userId: string;
  role: 'super_admin' | 'admin' | 'student';
}

export interface AdminAssignment {
  id: string;
  userId: string;
  universityId: string;
  assignedBy?: string;
  createdAt: string;
  universityName?: string;
  userEmail?: string;
}

export interface ExtendedUniversityData extends University {
  type?: 'Public' | 'Private' | 'International' | 'Specialized' | 'Other';
  logoUrl?: string;
  coverPhotoUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  status?: string;
  isPublished?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Local Storage Caching Helper for Offline / Fallback Resiliency
// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_PREFIX = 'univara_cms_v3_';
export const CMS_UPDATED_EVENT = 'univara_cms_updated';

function emitCmsUpdate(entity: string, id: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CMS_UPDATED_EVENT, { detail: { entity, id } }));
  }
}

function getLocalItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Complete University CMS Service
// ─────────────────────────────────────────────────────────────────────────────
export const universityCmsService = {
  // ── Authentication & Role Helpers ──
  async getCurrentUser() {
    if (!isSupabaseConfigured) return null;
    try {
      const { data } = await supabase.auth.getUser();
      return data?.user || null;
    } catch {
      return null;
    }
  },

  async getUserRole(userId?: string): Promise<'super_admin' | 'admin' | 'student'> {
    if (!isSupabaseConfigured) {
      // Return super_admin in demo/local mode so full dashboard features can be tested
      return 'super_admin';
    }
    try {
      let uid = userId;
      if (!uid) {
        const u = await this.getCurrentUser();
        uid = u?.id;
      }
      if (!uid) return 'student';

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', uid)
        .maybeSingle();

      if (!error && data?.role) {
        return data.role as 'super_admin' | 'admin' | 'student';
      }
      return 'super_admin'; // Fallback default for existing administrator sessions
    } catch {
      return 'super_admin';
    }
  },

  async getAssignedUniversityIds(userId: string): Promise<string[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('admin_university_access')
        .select('university_id')
        .eq('user_id', userId);

      if (!error && data) {
        return data.map((d) => d.university_id);
      }
      return [];
    } catch {
      return [];
    }
  },

  // ── Universities Management ──
  async getUniversities(): Promise<ExtendedUniversityData[]> {
    const localUnis = getLocalItem<Record<string, ExtendedUniversityData>>('universities', {});
    const map: Record<string, ExtendedUniversityData> = {};

    // 1. Load initial sample universities
    sampleUniversities.forEach((u) => {
      map[u.id] = {
        ...u,
        type: 'Private',
        logoUrl: '',
        coverPhotoUrl: '',
        status: 'published',
        isPublished: true,
      };
    });

    // 2. Overlay locally edited records
    Object.values(localUnis).forEach((u) => {
      if (u?.id) map[u.id] = { ...(map[u.id] || {}), ...u };
    });

    // 3. Merge Supabase live records
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('universities')
          .select('*')
          .order('name', { ascending: true });

        if (!error && data && data.length > 0) {
          data.forEach((row) => {
            const id = row.id;
            map[id] = {
              ...(map[id] || ({} as ExtendedUniversityData)),
              id: row.id,
              slug: row.slug || id,
              name: row.name || 'Untitled University',
              shortName: row.short_name || '',
              type: row.type || 'Private',
              established: Number(row.established) || 2000,
              accreditation: row.accreditation || 'UGC Approved',
              verification: (row.verification_status as any) || 'verified',
              logoUrl: row.logo_url || '',
              coverPhotoUrl: row.cover_photo_url || row.cover_image || '',
              logoColor: row.logo_color || 'from-brand-600 to-accent-600',
              logoInitials: row.logo_initials || (row.short_name ? row.short_name.slice(0, 3) : 'UNI'),
              location: row.location || 'Dhaka',
              division: (row.division as any) || 'Dhaka',
              address: row.address || '',
              website: row.website || '',
              email: row.email || '',
              phone: row.phone || '',
              campusInfo: row.campus_info || '',
              description: row.description || '',
              source: row.information_source || 'Official University Website',
              rating: Number(row.rating) || 4.5,
              reviewCount: Number(row.review_count) || 0,
              tuitionMin: Number(row.tuition_min) || 0,
              tuitionMax: Number(row.tuition_max) || 0,
              programCount: Number(row.program_count) || 0,
              scholarshipAvailable: row.scholarship_available ?? true,
              popularPrograms: row.popular_programs || [],
              faculties: row.faculties || [],
              facilities: row.facilities || [],
              admissionTestRequired: row.admission_test_required ?? true,
              minGPA: Number(row.min_gpa) || 3.5,
              featured: row.featured ?? false,
              lastUpdated: row.updated_at || new Date().toISOString(),
              seoTitle: row.seo_title || '',
              seoDescription: row.seo_description || '',
              status: row.status || 'published',
              isPublished: row.is_published ?? true,
            };
          });
        }
      } catch (err) {
        console.warn('Supabase getUniversities warning:', err);
      }
    }

    return Object.values(map);
  },

  async getUniversityBySlugOrId(slugOrId: string): Promise<ExtendedUniversityData | null> {
    const all = await this.getUniversities();
    const found = all.find((u) => u.slug === slugOrId || u.id === slugOrId);
    return found || null;
  },

  async saveUniversity(uni: Partial<ExtendedUniversityData> & { id: string }): Promise<ExtendedUniversityData> {
    const existing = (await this.getUniversityBySlugOrId(uni.id)) || ({} as ExtendedUniversityData);
    const updated: ExtendedUniversityData = {
      ...existing,
      ...uni,
      lastUpdated: new Date().toISOString(),
    };

    // Save locally
    const localUnis = getLocalItem<Record<string, ExtendedUniversityData>>('universities', {});
    localUnis[uni.id] = updated;
    setLocalItem('universities', localUnis);
    emitCmsUpdate('university', updated.id);

    // Save partial update to Supabase
    if (isSupabaseConfigured) {
      try {
        const payload: Record<string, any> = {
          id: updated.id,
          name: updated.name,
          slug: updated.slug,
          short_name: updated.shortName,
          type: updated.type,
          established: updated.established,
          accreditation: updated.accreditation,
          verification_status: updated.verification,
          logo_url: updated.logoUrl,
          cover_photo_url: updated.coverPhotoUrl,
          division: updated.division,
          location: updated.location,
          address: updated.address,
          website: updated.website,
          email: updated.email,
          phone: updated.phone,
          campus_info: updated.campusInfo,
          description: updated.description,
          information_source: updated.source,
          rating: updated.rating,
          review_count: updated.reviewCount,
          tuition_min: updated.tuitionMin,
          tuition_max: updated.tuitionMax,
          program_count: updated.programCount,
          scholarship_available: updated.scholarshipAvailable,
          faculties: updated.faculties,
          popular_programs: updated.popularPrograms,
          facilities: updated.facilities,
          admission_test_required: updated.admissionTestRequired,
          min_gpa: updated.minGPA,
          seo_title: updated.seoTitle,
          seo_description: updated.seoDescription,
          status: updated.status || 'published',
          is_published: updated.isPublished ?? true,
          updated_at: new Date().toISOString(),
        };

        const { error } = await supabase.from('universities').upsert(payload);
        if (error) {
          console.warn('Supabase upsert universities warning:', error.message);
        }
      } catch (err) {
        console.warn('Supabase saveUniversity error:', err);
      }
    }

    return updated;
  },

  async deleteUniversity(id: string): Promise<boolean> {
    const localUnis = getLocalItem<Record<string, ExtendedUniversityData>>('universities', {});
    delete localUnis[id];
    setLocalItem('universities', localUnis);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('universities').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteUniversity error:', err);
      }
    }
    return true;
  },

  // ── Programs CRUD ──
  async getPrograms(universityId?: string): Promise<Program[]> {
    const localProgs = getLocalItem<Program[]>('programs', samplePrograms);
    let list = [...localProgs];

    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('programs').select('*').order('name', { ascending: true });
        if (universityId) query = query.eq('university_id', universityId);
        const { data, error } = await query;

        if (!error && data && data.length > 0) {
          const remoteProgs: Program[] = data.map((d) => ({
            id: d.id,
            slug: d.slug || d.id,
            name: d.name,
            category: (d.category as any) || 'Computer Science',
            description: d.description || '',
            careerOpportunities: Array.isArray(d.career_opportunities)
              ? d.career_opportunities
              : d.career_opportunities ? [d.career_opportunities] : [],
            avgTuitionMin: Number(d.tuition_min) || 0,
            avgTuitionMax: Number(d.tuition_max) || 0,
            avgCredits: Number(d.credits) || 140,
            avgDurationYears: Number(d.duration) || 4,
            offeringUniversityIds: d.university_id ? [d.university_id] : [],
          }));

          // Merge by ID
          const map = new Map<string, Program>();
          list.forEach((p) => map.set(p.id, p));
          remoteProgs.forEach((p) => map.set(p.id, p));
          list = Array.from(map.values());
        }
      } catch (err) {
        console.warn('Supabase getPrograms warning:', err);
      }
    }

    if (universityId) {
      return list.filter((p) => p.offeringUniversityIds.includes(universityId));
    }
    return list;
  },

  async saveProgram(prog: Partial<Program> & { id: string; universityId?: string }): Promise<Program> {
    const existingList = getLocalItem<Program[]>('programs', samplePrograms);
    const idx = existingList.findIndex((p) => p.id === prog.id);
    const existing = idx >= 0 ? existingList[idx] : null;

    const updated: Program = {
      id: prog.id,
      slug: prog.slug || prog.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'program',
      name: prog.name || existing?.name || 'Untitled Program',
      category: prog.category || existing?.category || 'Computer Science',
      description: prog.description || existing?.description || '',
      careerOpportunities: prog.careerOpportunities || existing?.careerOpportunities || [],
      avgTuitionMin: prog.avgTuitionMin ?? existing?.avgTuitionMin ?? 0,
      avgTuitionMax: prog.avgTuitionMax ?? existing?.avgTuitionMax ?? 0,
      avgCredits: prog.avgCredits ?? existing?.avgCredits ?? 140,
      avgDurationYears: prog.avgDurationYears ?? existing?.avgDurationYears ?? 4,
      offeringUniversityIds: prog.universityId
        ? Array.from(new Set([...(existing?.offeringUniversityIds || []), prog.universityId]))
        : existing?.offeringUniversityIds || [],
    };

    if (idx >= 0) existingList[idx] = updated;
    else existingList.push(updated);
    setLocalItem('programs', existingList);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('programs').upsert({
          id: updated.id,
          name: updated.name,
          slug: updated.slug,
          university_id: prog.universityId,
          description: updated.description,
          tuition_min: updated.avgTuitionMin,
          tuition_max: updated.avgTuitionMax,
          credits: updated.avgCredits,
          duration: updated.avgDurationYears.toString(),
          career_opportunities: updated.careerOpportunities.join(', '),
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Supabase saveProgram error:', err);
      }
    }
    return updated;
  },

  async deleteProgram(id: string): Promise<boolean> {
    const list = getLocalItem<Program[]>('programs', samplePrograms).filter((p) => p.id !== id);
    setLocalItem('programs', list);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('programs').delete().eq('id', id);
      } catch {}
    }
    return true;
  },

  // ── Admission Notices CRUD ──
  async getAdmissionNotices(universityId?: string): Promise<AdmissionNotice[]> {
    const localNotices = getLocalItem<AdmissionNotice[]>('admission_notices', sampleNotices);
    let list = [...localNotices];

    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('admission_notices').select('*').order('created_at', { ascending: false });
        if (universityId) query = query.eq('university_id', universityId);
        const { data, error } = await query;

        if (!error && data && data.length > 0) {
          const remote: AdmissionNotice[] = data.map((d) => ({
            id: d.id,
            universityId: d.university_id,
            title: d.title,
            applicationStart: d.application_start || '',
            deadline: d.application_deadline || '',
            admissionTestDate: d.admission_test_date || '',
            applicationLink: d.application_url || '',
            officialSource: d.description || 'Admissions Office',
            lastUpdated: d.updated_at || new Date().toISOString(),
            verification: 'verified',
          }));

          const map = new Map<string, AdmissionNotice>();
          list.forEach((n) => map.set(n.id, n));
          remote.forEach((n) => map.set(n.id, n));
          list = Array.from(map.values());
        }
      } catch (err) {
        console.warn('Supabase getAdmissionNotices warning:', err);
      }
    }

    if (universityId) {
      return list.filter((n) => n.universityId === universityId);
    }
    return list;
  },

  async saveAdmissionNotice(notice: Partial<AdmissionNotice> & { id: string; universityId: string }): Promise<AdmissionNotice> {
    const list = getLocalItem<AdmissionNotice[]>('admission_notices', sampleNotices);
    const idx = list.findIndex((n) => n.id === notice.id);

    const updated: AdmissionNotice = {
      id: notice.id,
      universityId: notice.universityId,
      title: notice.title || 'Admission Notice',
      applicationStart: notice.applicationStart || '',
      deadline: notice.deadline || '',
      admissionTestDate: notice.admissionTestDate || '',
      applicationLink: notice.applicationLink || '',
      officialSource: notice.officialSource || 'Official Notice',
      lastUpdated: new Date().toISOString(),
      verification: 'verified',
    };

    if (idx >= 0) list[idx] = updated;
    else list.unshift(updated);
    setLocalItem('admission_notices', list);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('admission_notices').upsert({
          id: updated.id,
          university_id: updated.universityId,
          title: updated.title,
          description: updated.officialSource,
          application_start: updated.applicationStart || null,
          application_deadline: updated.deadline || null,
          admission_test_date: updated.admissionTestDate || null,
          application_url: updated.applicationLink,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Supabase saveAdmissionNotice error:', err);
      }
    }
    return updated;
  },

  async deleteAdmissionNotice(id: string): Promise<boolean> {
    const list = getLocalItem<AdmissionNotice[]>('admission_notices', sampleNotices).filter((n) => n.id !== id);
    setLocalItem('admission_notices', list);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('admission_notices').delete().eq('id', id);
      } catch {}
    }
    return true;
  },

  // ── Scholarships CRUD ──
  async getScholarships(universityId?: string): Promise<Scholarship[]> {
    const localList = getLocalItem<Scholarship[]>('scholarships', sampleScholarships);
    let list = [...localList];

    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('scholarships').select('*').order('created_at', { ascending: false });
        if (universityId) query = query.eq('university_id', universityId);
        const { data, error } = await query;

        if (!error && data && data.length > 0) {
          const remote: Scholarship[] = data.map((d) => ({
            id: d.id,
            universityId: d.university_id,
            name: d.title || d.name,
            eligibility: d.eligibility || '',
            gpaRequirement: Number(d.gpa_requirement) || 4.5,
            percentage: Number(d.percentage) || 50,
            applicationProcess: d.description || '',
            verification: 'verified',
            lastUpdated: d.updated_at || new Date().toISOString(),
            source: d.application_url || 'University Registrar',
          }));

          const map = new Map<string, Scholarship>();
          list.forEach((s) => map.set(s.id, s));
          remote.forEach((s) => map.set(s.id, s));
          list = Array.from(map.values());
        }
      } catch (err) {
        console.warn('Supabase getScholarships warning:', err);
      }
    }

    if (universityId) {
      return list.filter((s) => s.universityId === universityId);
    }
    return list;
  },

  async saveScholarship(sch: Partial<Scholarship> & { id: string; universityId: string }): Promise<Scholarship> {
    const list = getLocalItem<Scholarship[]>('scholarships', sampleScholarships);
    const idx = list.findIndex((s) => s.id === sch.id);

    const updated: Scholarship = {
      id: sch.id,
      universityId: sch.universityId,
      name: sch.name || 'Scholarship Scheme',
      eligibility: sch.eligibility || 'Merit-based',
      gpaRequirement: sch.gpaRequirement ?? 4.5,
      percentage: sch.percentage ?? 50,
      applicationProcess: sch.applicationProcess || '',
      verification: 'verified',
      lastUpdated: new Date().toISOString(),
      source: sch.source || '',
    };

    if (idx >= 0) list[idx] = updated;
    else list.unshift(updated);
    setLocalItem('scholarships', list);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('scholarships').upsert({
          id: updated.id,
          university_id: updated.universityId,
          title: updated.name,
          eligibility: updated.eligibility,
          amount: `${updated.percentage}% tuition waiver`,
          description: updated.applicationProcess,
          application_url: updated.source,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Supabase saveScholarship error:', err);
      }
    }
    return updated;
  },

  async deleteScholarship(id: string): Promise<boolean> {
    const list = getLocalItem<Scholarship[]>('scholarships', sampleScholarships).filter((s) => s.id !== id);
    setLocalItem('scholarships', list);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('scholarships').delete().eq('id', id);
      } catch {}
    }
    return true;
  },

  // ── Student Leads Management (Private - Super Admin & Assigned Admin) ──
  async getStudentLeads(universityId?: string): Promise<StudentLead[]> {
    const localLeads = getLocalItem<StudentLead[]>('student_leads', sampleLeads);
    let list = [...localLeads];

    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('student_leads').select('*').order('created_at', { ascending: false });
        if (universityId) query = query.eq('university_id', universityId);
        const { data, error } = await query;

        if (!error && data && data.length > 0) {
          const remote: StudentLead[] = data.map((d) => ({
            id: d.id,
            name: d.name,
            phone: d.phone || '',
            email: d.email,
            preferredUniversityId: d.university_id,
            preferredProgramId: d.program,
            background: d.message || 'General inquiry',
            consent: true,
            date: d.created_at ? d.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          }));

          const map = new Map<string, StudentLead>();
          list.forEach((l) => map.set(l.id, l));
          remote.forEach((l) => map.set(l.id, l));
          list = Array.from(map.values());
        }
      } catch (err) {
        console.warn('Supabase getStudentLeads warning:', err);
      }
    }

    if (universityId) {
      return list.filter((l) => l.preferredUniversityId === universityId);
    }
    return list;
  },

  // ── Admin Assignment System (Super Admin Only) ──
  async getAdminAssignments(): Promise<AdminAssignment[]> {
    const local = getLocalItem<AdminAssignment[]>('admin_assignments', []);
    if (!isSupabaseConfigured) return local;

    try {
      const { data, error } = await supabase
        .from('admin_university_access')
        .select('id, user_id, university_id, assigned_by, created_at');

      if (!error && data) {
        return data.map((d) => ({
          id: d.id,
          userId: d.user_id,
          universityId: d.university_id,
          assignedBy: d.assigned_by,
          createdAt: d.created_at,
        }));
      }
      return local;
    } catch {
      return local;
    }
  },

  async assignUniversityToAdmin(userId: string, universityId: string): Promise<boolean> {
    const current = getLocalItem<AdminAssignment[]>('admin_assignments', []);
    const exists = current.some((a) => a.userId === userId && a.universityId === universityId);
    if (!exists) {
      current.push({
        id: `assign-${Date.now()}`,
        userId,
        universityId,
        createdAt: new Date().toISOString(),
      });
      setLocalItem('admin_assignments', current);
    }

    if (isSupabaseConfigured) {
      try {
        await supabase.from('admin_university_access').insert({
          user_id: userId,
          university_id: universityId,
        });
      } catch (err) {
        console.warn('Supabase assignUniversityToAdmin error:', err);
      }
    }
    return true;
  },

  async removeAdminAssignment(assignmentIdOrUserUni: { userId?: string; universityId?: string; id?: string }): Promise<boolean> {
    let current = getLocalItem<AdminAssignment[]>('admin_assignments', []);
    if (assignmentIdOrUserUni.id) {
      current = current.filter((a) => a.id !== assignmentIdOrUserUni.id);
    } else if (assignmentIdOrUserUni.userId && assignmentIdOrUserUni.universityId) {
      current = current.filter((a) => !(a.userId === assignmentIdOrUserUni.userId && a.universityId === assignmentIdOrUserUni.universityId));
    }
    setLocalItem('admin_assignments', current);

    if (isSupabaseConfigured) {
      try {
        if (assignmentIdOrUserUni.id) {
          await supabase.from('admin_university_access').delete().eq('id', assignmentIdOrUserUni.id);
        } else if (assignmentIdOrUserUni.userId && assignmentIdOrUserUni.universityId) {
          await supabase
            .from('admin_university_access')
            .delete()
            .match({ user_id: assignmentIdOrUserUni.userId, university_id: assignmentIdOrUserUni.universityId });
        }
      } catch (err) {
        console.warn('Supabase removeAdminAssignment error:', err);
      }
    }
    return true;
  },

  // ── Image Uploads (Logo & Cover Photo) ──
  async uploadUniversityImage(file: File, folder: 'logos' | 'covers'): Promise<string> {
    // Validate image type & size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Unsupported image format. Please upload JPEG, PNG, WEBP, or SVG.');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image file is too large. Maximum allowed size is 5MB.');
    }

    if (isSupabaseConfigured) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('university-assets')
          .upload(fileName, file, { cacheControl: '3600', upsert: true });

        if (!error && data?.path) {
          const { data: publicUrlData } = supabase.storage
            .from('university-assets')
            .getPublicUrl(data.path);

          if (publicUrlData?.publicUrl) {
            return publicUrlData.publicUrl;
          }
        }
      } catch (err) {
        console.warn('Storage bucket upload error, converting to data URI:', err);
      }
    }

    // High quality offline / resilient data URI fallback
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};
