import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  University,
  Program,
  AdmissionNotice,
  Scholarship,
  StudentLead,
} from '@/types';
import {
  universities as sampleUniversities,
  programs as samplePrograms,
  admissionNotices as sampleNotices,
  scholarships as sampleScholarships,
  studentLeads as sampleLeads,
} from '@/data/sampleData';

// ─── Interfaces ───────────────────────────────────────────────────────────────

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

// ─── UUID Helper for Supabase PostgreSQL UUID Columns ─────────────────────────
// PostgreSQL enforces valid UUID format on primary & foreign keys (e.g. 'u1' or 'u2'
// will fail unless converted deterministically to a valid RFC 4122 v4 UUID).
export function toUuid(str: string): string {
  if (!str) return '00000000-0000-4000-8000-000000000000';
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
  if (isUuid) return str;

  // Deterministic 128-bit hash formatted as a valid UUID v4
  let h1 = 0x811c9dc5;
  let h2 = 0x41c64e6d;
  let h3 = 0x9e3779b9;
  let h4 = 0x7b7d1351;

  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193);
    h2 = Math.imul(h2 ^ (c >> 2), 0x01000193);
    h3 = Math.imul(h3 ^ (c >> 4), 0x01000193);
    h4 = Math.imul(h4 ^ (c >> 6), 0x01000193);
  }

  const p1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const p2 = (h2 >>> 16).toString(16).padStart(4, '0');
  const p3 = '4' + (h2 & 0x0fff).toString(16).padStart(3, '0');
  const p4 = ((h3 >>> 30) | 8).toString(16) + (h3 & 0x0fff).toString(16).padStart(3, '0');
  const p5 = ((h3 >>> 0).toString(16).padStart(8, '0') + (h4 >>> 16).toString(16).padStart(4, '0')).slice(0, 12);

  return (p1 + '-' + p2 + '-' + p3 + '-' + p4 + '-' + p5).toLowerCase();
}

// ─── LocalStorage helpers ─────────────────────────────────────────────────────
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
    return raw ? (JSON.parse(raw) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (err) {
    console.error('[CMS] localStorage write error:', err);
  }
}

// Strip undefined values so Supabase doesn't send invalid fields
function cleanPayload(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

// ─── Map a Supabase universities row → ExtendedUniversityData ─────────────────
function rowToUniversity(row: Record<string, any>, base?: ExtendedUniversityData): ExtendedUniversityData {
  return {
    ...(base || {}),
    id: base?.id || row.id,
    slug: row.slug || row.id,
    name: row.name || 'Untitled University',
    shortName: row.short_name || base?.shortName || '',
    type: (row.type as any) || base?.type || 'Private',
    established: Number(row.established) || base?.established || 2000,
    accreditation: row.accreditation || base?.accreditation || 'UGC Approved',
    verification: (row.verification as any) || base?.verification || 'verified',
    logoUrl: row.logo_url || base?.logoUrl || '',
    logoColor: base?.logoColor || 'from-brand-600 to-accent-600',
    logoInitials: base?.logoInitials || (row.short_name || '').slice(0, 3) || 'UNI',
    coverPhotoUrl: base?.coverPhotoUrl || '',
    location: row.location || base?.location || 'Dhaka',
    division: (row.division as any) || base?.division || 'Dhaka',
    address: row.address || base?.address || '',
    website: row.website || base?.website || '',
    email: row.email || base?.email || '',
    phone: row.phone || base?.phone || '',
    campusInfo: row.campus_info || base?.campusInfo || '',
    description: row.description || base?.description || '',
    source: row.source || base?.source || 'Official University Website',
    rating: Number(row.rating) || base?.rating || 4.5,
    reviewCount: Number(row.review_count) || base?.reviewCount || 0,
    tuitionMin: Number(row.tuition_min) || base?.tuitionMin || 0,
    tuitionMax: Number(row.tuition_max) || base?.tuitionMax || 0,
    programCount: Number(row.program_count) || base?.programCount || 0,
    scholarshipAvailable: row.scholarship_available ?? base?.scholarshipAvailable ?? true,
    popularPrograms: row.popular_programs || base?.popularPrograms || [],
    faculties: Array.isArray(row.faculties) ? row.faculties : (base?.faculties || []),
    facilities: Array.isArray(row.facilities) ? row.facilities : (base?.facilities || []),
    admissionTestRequired: row.admission_test_required ?? base?.admissionTestRequired ?? true,
    minGPA: Number(row.min_gpa) || base?.minGPA || 3.5,
    featured: row.featured ?? base?.featured ?? false,
    lastUpdated: row.last_updated || row.updated_at || new Date().toISOString(),
    seoTitle: base?.seoTitle || '',
    seoDescription: base?.seoDescription || '',
    status: base?.status || 'published',
    isPublished: true,
  };
}

// ─── Payloads matching exact Supabase database columns ─────────────────────────
function buildUniversityDbPayload(u: ExtendedUniversityData): Record<string, any> {
  return cleanPayload({
    id: toUuid(u.id),
    name: u.name,
    slug: u.slug,
    short_name: u.shortName || null,
    logo_url: u.logoUrl || null,
    location: u.location || null,
    division: u.division || null,
    established: u.established ? Number(u.established) : null,
    website: u.website || null,
    email: u.email || null,
    phone: u.phone || null,
    address: u.address || null,
    description: u.description || null,
    campus_info: u.campusInfo || null,
    accreditation: u.accreditation || null,
    rating: u.rating !== undefined ? Number(u.rating) : null,
    review_count: u.reviewCount !== undefined ? Number(u.reviewCount) : null,
    tuition_min: u.tuitionMin !== undefined ? Number(u.tuitionMin) : null,
    tuition_max: u.tuitionMax !== undefined ? Number(u.tuitionMax) : null,
    program_count: u.programCount !== undefined ? Number(u.programCount) : null,
    scholarship_available: u.scholarshipAvailable ?? true,
    faculties: u.faculties ?? [],
    facilities: u.facilities ?? [],
    popular_programs: u.popularPrograms ?? [],
    admission_test_required: u.admissionTestRequired ?? true,
    min_gpa: u.minGPA !== undefined ? Number(u.minGPA) : null,
    featured: u.featured ?? false,
    source: u.source || null,
    verification: u.verification || 'verified',
    last_updated: new Date().toISOString().split('T')[0],
    updated_at: new Date().toISOString(),
  });
}

function buildProgramDbPayload(prog: Partial<Program> & { id: string; universityId?: string }): Record<string, any> {
  return cleanPayload({
    id: toUuid(prog.id),
    name: prog.name,
    slug: prog.slug,
    university_id: prog.universityId ? toUuid(prog.universityId) : null,
    degree: (prog as any).degree || null,
    department: (prog as any).department || null,
    duration: prog.avgDurationYears ? String(prog.avgDurationYears) : null,
    tuition_min: prog.avgTuitionMin !== undefined ? Number(prog.avgTuitionMin) : null,
    tuition_max: prog.avgTuitionMax !== undefined ? Number(prog.avgTuitionMax) : null,
    credits: prog.avgCredits !== undefined ? Number(prog.avgCredits) : null,
    description: prog.description || null,
    admission_requirements: (prog as any).admissionRequirements
      ? Array.isArray((prog as any).admissionRequirements)
        ? (prog as any).admissionRequirements.join(', ')
        : (prog as any).admissionRequirements
      : null,
    career_opportunities: prog.careerOpportunities
      ? Array.isArray(prog.careerOpportunities)
        ? prog.careerOpportunities.join(', ')
        : prog.careerOpportunities
      : null,
    updated_at: new Date().toISOString(),
  });
}

function buildScholarshipDbPayload(sch: Partial<Scholarship> & { id: string; universityId: string }): Record<string, any> {
  return cleanPayload({
    id: toUuid(sch.id),
    university_id: toUuid(sch.universityId),
    title: sch.name || (sch as any).title || 'Scholarship Scheme',
    description: sch.applicationProcess || (sch as any).description || null,
    eligibility: sch.eligibility || null,
    amount: sch.percentage ? `${sch.percentage}% tuition waiver` : ((sch as any).amount || null),
    deadline: (sch as any).deadline || null,
    application_url: sch.source || (sch as any).application_url || null,
    status: 'published',
    updated_at: new Date().toISOString(),
  });
}

function buildNoticeDbPayload(notice: Partial<AdmissionNotice> & { id: string; universityId: string }): Record<string, any> {
  return cleanPayload({
    id: toUuid(notice.id),
    university_id: toUuid(notice.universityId),
    title: notice.title || 'Admission Notice',
    description: notice.officialSource || (notice as any).description || null,
    application_start: notice.applicationStart || null,
    application_deadline: notice.deadline || null,
    admission_test_date: notice.admissionTestDate || null,
    application_url: notice.applicationLink || null,
    status: 'published',
    updated_at: new Date().toISOString(),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CMS Service
// ─────────────────────────────────────────────────────────────────────────────
export const universityCmsService = {

  // ── Auth & Role ──────────────────────────────────────────────────────────────
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
    if (!isSupabaseConfigured) return 'super_admin';
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

      if (!error && data?.role) return data.role as 'super_admin' | 'admin' | 'student';
      return 'student';
    } catch {
      return 'student';
    }
  },

  async getAssignedUniversityIds(userId: string): Promise<string[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const adminUuid = toUuid(userId);
      const { data, error } = await supabase
        .from('admin_university_access')
        .select('university_id')
        .eq('admin_id', adminUuid);
      if (error) {
        console.error('[CMS] getAssignedUniversityIds error:', error.message);
        return [];
      }
      return (data || []).map((d) => d.university_id as string);
    } catch (err) {
      console.error('[CMS] getAssignedUniversityIds exception:', err);
      return [];
    }
  },

  // ── Universities ─────────────────────────────────────────────────────────────
  async getUniversities(): Promise<ExtendedUniversityData[]> {
    const map: Record<string, ExtendedUniversityData> = {};

    // 1. Sample data as baseline
    sampleUniversities.forEach((u) => {
      map[u.id] = { ...u, type: 'Private', logoUrl: '', coverPhotoUrl: '', status: 'published', isPublished: true };
    });

    // 2. Supabase live data overlays sample data
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('[CMS] getUniversities SELECT error:', error.message);
      } else if (data && data.length > 0) {
        data.forEach((row) => {
          const sampleBase = sampleUniversities.find(
            (s) => s.slug === row.slug || s.id === row.id || toUuid(s.id) === row.id
          );
          const localKey = sampleBase?.id || row.id;
          map[localKey] = rowToUniversity(row, map[localKey] || (sampleBase as ExtendedUniversityData));
        });
      }
    }

    // 3. localStorage overlay last (user's active edits take precedence)
    const localUnis = getLocalItem<Record<string, ExtendedUniversityData>>('universities', {});
    Object.values(localUnis).forEach((u) => {
      if (u?.id) map[u.id] = { ...(map[u.id] || ({} as ExtendedUniversityData)), ...u };
    });

    return Object.values(map);
  },

  async getUniversityBySlugOrId(slugOrId: string): Promise<ExtendedUniversityData | null> {
    if (isSupabaseConfigured) {
      const targetUuid = toUuid(slugOrId);
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .or(`slug.eq.${slugOrId},id.eq.${targetUuid}`)
        .maybeSingle();

      if (!error && data) {
        const sampleBase = sampleUniversities.find(
          (u) => u.slug === slugOrId || u.id === slugOrId || u.slug === data.slug || toUuid(u.id) === data.id
        );
        const result = rowToUniversity(data, sampleBase as ExtendedUniversityData | undefined);
        const localUnis = getLocalItem<Record<string, ExtendedUniversityData>>('universities', {});
        const localKey = sampleBase?.id || result.id;
        if (localUnis[localKey]) {
          return { ...result, ...localUnis[localKey] };
        }
        return result;
      }
      if (error) console.error('[CMS] getUniversityBySlugOrId error:', error.message);
    }

    const all = await this.getUniversities();
    return all.find((u) => u.slug === slugOrId || u.id === slugOrId) || null;
  },

  async saveUniversity(uni: Partial<ExtendedUniversityData> & { id: string }): Promise<ExtendedUniversityData> {
    const existing = (await this.getUniversityBySlugOrId(uni.id)) || ({} as ExtendedUniversityData);
    const updated: ExtendedUniversityData = {
      ...existing,
      ...uni,
      lastUpdated: new Date().toISOString(),
    };

    // 1. Save to localStorage immediately (instant UI update)
    const localUnis = getLocalItem<Record<string, ExtendedUniversityData>>('universities', {});
    localUnis[uni.id] = updated;
    setLocalItem('universities', localUnis);
    emitCmsUpdate('university', updated.id);

    // 2. Persist to Supabase using only existing database columns with valid UUID
    if (isSupabaseConfigured) {
      // Find existing DB record by slug to reuse its exact UUID if already inserted
      let dbId = toUuid(updated.id);
      if (updated.slug) {
        const { data: existingRow } = await supabase
          .from('universities')
          .select('id')
          .eq('slug', updated.slug)
          .maybeSingle();
        if (existingRow?.id) {
          dbId = existingRow.id;
        }
      }

      const payload = buildUniversityDbPayload({ ...updated, id: dbId });
      const { data: saved, error } = await supabase
        .from('universities')
        .upsert(payload)
        .select('id, name, slug')
        .single();

      if (error) {
        console.error('[CMS] saveUniversity upsert FAILED:', error.message, error.details);
        throw new Error(`Supabase save failed: ${error.message}`);
      } else {
        console.info('[CMS] University saved to Supabase successfully:', saved);
      }
    }

    return updated;
  },

  async deleteUniversity(id: string): Promise<boolean> {
    const localUnis = getLocalItem<Record<string, ExtendedUniversityData>>('universities', {});
    delete localUnis[id];
    setLocalItem('universities', localUnis);
    emitCmsUpdate('university', id);

    if (isSupabaseConfigured) {
      const targetUuid = toUuid(id);
      const { error } = await supabase
        .from('universities')
        .delete()
        .or(`id.eq.${targetUuid},slug.eq.${id}`);
      if (error) {
        console.error('[CMS] deleteUniversity error:', error.message);
        return false;
      }
    }
    return true;
  },

  // ── Programs ──────────────────────────────────────────────────────────────────
  async getPrograms(universityId?: string): Promise<Program[]> {
    const localProgs = getLocalItem<Program[]>('programs', samplePrograms);
    const map = new Map<string, Program>();
    localProgs.forEach((p) => map.set(p.id, p));

    if (isSupabaseConfigured) {
      let query = supabase.from('programs').select('*').order('name', { ascending: true });
      if (universityId) {
        const targetUuid = toUuid(universityId);
        query = query.eq('university_id', targetUuid);
      }
      const { data, error } = await query;

      if (error) {
        console.error('[CMS] getPrograms error:', error.message);
      } else if (data) {
        data.forEach((d) => {
          map.set(d.id, {
            id: d.id,
            slug: d.slug || d.id,
            name: d.name,
            category: (d.category as any) || 'General',
            description: d.description || '',
            careerOpportunities: d.career_opportunities
              ? (Array.isArray(d.career_opportunities) ? d.career_opportunities : [d.career_opportunities])
              : [],
            avgTuitionMin: Number(d.tuition_min) || 0,
            avgTuitionMax: Number(d.tuition_max) || 0,
            avgCredits: Number(d.credits) || 140,
            avgDurationYears: Number(d.duration) || 4,
            offeringUniversityIds: d.university_id ? [d.university_id] : [],
          });
        });
      }
    }

    const list = Array.from(map.values());
    if (universityId) {
      const targetUuid = toUuid(universityId);
      return list.filter((p) =>
        p.offeringUniversityIds.includes(universityId) ||
        p.offeringUniversityIds.includes(targetUuid)
      );
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
      category: prog.category || existing?.category || 'General',
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

    if (idx >= 0) existingList[idx] = updated; else existingList.push(updated);
    setLocalItem('programs', existingList);
    emitCmsUpdate('program', updated.id);

    if (isSupabaseConfigured) {
      const progUuid = toUuid(updated.id);
      const uniUuid = prog.universityId ? toUuid(prog.universityId) : null;
      const payload = buildProgramDbPayload({
        ...updated,
        id: progUuid,
        universityId: uniUuid || undefined,
      });
      const { error } = await supabase.from('programs').upsert(payload);
      if (error) {
        console.error('[CMS] saveProgram FAILED:', error.message);
        throw new Error(`Program save failed: ${error.message}`);
      }
      console.info('[CMS] Program saved to Supabase successfully:', updated.id);
    }

    return updated;
  },

  async deleteProgram(id: string): Promise<boolean> {
    const list = getLocalItem<Program[]>('programs', samplePrograms).filter((p) => p.id !== id);
    setLocalItem('programs', list);
    emitCmsUpdate('program', id);

    if (isSupabaseConfigured) {
      const progUuid = toUuid(id);
      const { error } = await supabase.from('programs').delete().eq('id', progUuid);
      if (error) { console.error('[CMS] deleteProgram error:', error.message); return false; }
    }
    return true;
  },

  // ── Admission Notices ─────────────────────────────────────────────────────────
  async getAdmissionNotices(universityId?: string): Promise<AdmissionNotice[]> {
    const map = new Map<string, AdmissionNotice>();
    getLocalItem<AdmissionNotice[]>('admission_notices', sampleNotices).forEach((n) => map.set(n.id, n));

    if (isSupabaseConfigured) {
      let query = supabase.from('admission_notices').select('*').order('created_at', { ascending: false });
      if (universityId) {
        const targetUuid = toUuid(universityId);
        query = query.eq('university_id', targetUuid);
      }
      const { data, error } = await query;
      if (error) {
        console.error('[CMS] getAdmissionNotices error:', error.message);
      } else if (data) {
        data.forEach((d) => {
          map.set(d.id, {
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
          });
        });
      }
    }

    const list = Array.from(map.values());
    if (universityId) {
      const targetUuid = toUuid(universityId);
      return list.filter((n) => n.universityId === universityId || n.universityId === targetUuid);
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

    if (idx >= 0) list[idx] = updated; else list.unshift(updated);
    setLocalItem('admission_notices', list);
    emitCmsUpdate('admission_notice', updated.id);

    if (isSupabaseConfigured) {
      const noticeUuid = toUuid(updated.id);
      const uniUuid = toUuid(updated.universityId);
      const payload = buildNoticeDbPayload({
        ...updated,
        id: noticeUuid,
        universityId: uniUuid,
      });
      const { error } = await supabase.from('admission_notices').upsert(payload);
      if (error) {
        console.error('[CMS] saveAdmissionNotice FAILED:', error.message);
        throw new Error(`Admission notice save failed: ${error.message}`);
      }
      console.info('[CMS] Admission notice saved to Supabase successfully:', updated.id);
    }
    return updated;
  },

  async deleteAdmissionNotice(id: string): Promise<boolean> {
    const list = getLocalItem<AdmissionNotice[]>('admission_notices', sampleNotices).filter((n) => n.id !== id);
    setLocalItem('admission_notices', list);
    emitCmsUpdate('admission_notice', id);

    if (isSupabaseConfigured) {
      const noticeUuid = toUuid(id);
      const { error } = await supabase.from('admission_notices').delete().eq('id', noticeUuid);
      if (error) { console.error('[CMS] deleteAdmissionNotice error:', error.message); return false; }
    }
    return true;
  },

  // ── Scholarships ──────────────────────────────────────────────────────────────
  async getScholarships(universityId?: string): Promise<Scholarship[]> {
    const map = new Map<string, Scholarship>();
    getLocalItem<Scholarship[]>('scholarships', sampleScholarships).forEach((s) => map.set(s.id, s));

    if (isSupabaseConfigured) {
      let query = supabase.from('scholarships').select('*').order('created_at', { ascending: false });
      if (universityId) {
        const targetUuid = toUuid(universityId);
        query = query.eq('university_id', targetUuid);
      }
      const { data, error } = await query;
      if (error) {
        console.error('[CMS] getScholarships error:', error.message);
      } else if (data) {
        data.forEach((d) => {
          map.set(d.id, {
            id: d.id,
            universityId: d.university_id,
            name: d.title || (d as any).name || 'Scholarship',
            eligibility: d.eligibility || '',
            gpaRequirement: Number((d as any).gpa_requirement) || 4.5,
            percentage: Number((d as any).percentage) || 50,
            applicationProcess: d.description || '',
            verification: 'verified',
            lastUpdated: d.updated_at || new Date().toISOString(),
            source: d.application_url || 'University Registrar',
          });
        });
      }
    }

    const list = Array.from(map.values());
    if (universityId) {
      const targetUuid = toUuid(universityId);
      return list.filter((s) => s.universityId === universityId || s.universityId === targetUuid);
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

    if (idx >= 0) list[idx] = updated; else list.unshift(updated);
    setLocalItem('scholarships', list);
    emitCmsUpdate('scholarship', updated.id);

    if (isSupabaseConfigured) {
      const schUuid = toUuid(updated.id);
      const uniUuid = toUuid(updated.universityId);
      const payload = buildScholarshipDbPayload({
        ...updated,
        id: schUuid,
        universityId: uniUuid,
      });
      const { error } = await supabase.from('scholarships').upsert(payload);
      if (error) {
        console.error('[CMS] saveScholarship FAILED:', error.message);
        throw new Error(`Scholarship save failed: ${error.message}`);
      }
      console.info('[CMS] Scholarship saved to Supabase successfully:', updated.id);
    }
    return updated;
  },

  async deleteScholarship(id: string): Promise<boolean> {
    const list = getLocalItem<Scholarship[]>('scholarships', sampleScholarships).filter((s) => s.id !== id);
    setLocalItem('scholarships', list);
    emitCmsUpdate('scholarship', id);

    if (isSupabaseConfigured) {
      const schUuid = toUuid(id);
      const { error } = await supabase.from('scholarships').delete().eq('id', schUuid);
      if (error) { console.error('[CMS] deleteScholarship error:', error.message); return false; }
    }
    return true;
  },

  // ── Student Leads ─────────────────────────────────────────────────────────────
  async getStudentLeads(universityId?: string): Promise<StudentLead[]> {
    const map = new Map<string, StudentLead>();
    getLocalItem<StudentLead[]>('student_leads', sampleLeads).forEach((l) => map.set(l.id, l));

    if (isSupabaseConfigured) {
      let query = supabase.from('student_leads').select('*').order('created_at', { ascending: false });
      if (universityId) {
        const targetUuid = toUuid(universityId);
        query = query.eq('university_id', targetUuid);
      }
      const { data, error } = await query;
      if (error) {
        console.error('[CMS] getStudentLeads error:', error.message);
      } else if (data) {
        data.forEach((d) => {
          map.set(d.id, {
            id: d.id,
            name: d.name,
            phone: d.phone || '',
            email: d.email,
            preferredUniversityId: d.university_id,
            preferredProgramId: d.program,
            background: d.message || 'General inquiry',
            consent: true,
            date: d.created_at ? d.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          });
        });
      }
    }

    const list = Array.from(map.values());
    if (universityId) {
      const targetUuid = toUuid(universityId);
      return list.filter((l) => l.preferredUniversityId === universityId || l.preferredUniversityId === targetUuid);
    }
    return list;
  },

  // ── Admin Assignments ─────────────────────────────────────────────────────────
  async getAdminAssignments(): Promise<AdminAssignment[]> {
    const local = getLocalItem<AdminAssignment[]>('admin_assignments', []);
    if (!isSupabaseConfigured) return local;

    // Actual column in database is `admin_id`
    const { data, error } = await supabase
      .from('admin_university_access')
      .select('id, admin_id, university_id, assigned_by, created_at');

    if (error) {
      console.error('[CMS] getAdminAssignments error:', error.message);
      return local;
    }

    return (data || []).map((d) => ({
      id: d.id,
      userId: d.admin_id,
      universityId: d.university_id,
      assignedBy: d.assigned_by,
      createdAt: d.created_at,
    }));
  },

  async assignUniversityToAdmin(userId: string, universityId: string): Promise<boolean> {
    const current = getLocalItem<AdminAssignment[]>('admin_assignments', []);
    if (!current.some((a) => a.userId === userId && a.universityId === universityId)) {
      current.push({ id: `assign-${Date.now()}`, userId, universityId, createdAt: new Date().toISOString() });
      setLocalItem('admin_assignments', current);
    }

    if (isSupabaseConfigured) {
      const adminUuid = toUuid(userId);
      const uniUuid = toUuid(universityId);
      const { error } = await supabase.from('admin_university_access').insert({
        admin_id: adminUuid,
        university_id: uniUuid,
      });
      if (error) {
        console.error('[CMS] assignUniversityToAdmin error:', error.message);
        return false;
      }
    }
    return true;
  },

  async removeAdminAssignment(params: { userId?: string; universityId?: string; id?: string }): Promise<boolean> {
    let current = getLocalItem<AdminAssignment[]>('admin_assignments', []);
    if (params.id) {
      current = current.filter((a) => a.id !== params.id);
    } else if (params.userId && params.universityId) {
      current = current.filter((a) => !(a.userId === params.userId && a.universityId === params.universityId));
    }
    setLocalItem('admin_assignments', current);

    if (isSupabaseConfigured) {
      let error;
      if (params.id) {
        const targetId = toUuid(params.id);
        ({ error } = await supabase.from('admin_university_access').delete().eq('id', targetId));
      } else if (params.userId && params.universityId) {
        const adminUuid = toUuid(params.userId);
        const uniUuid = toUuid(params.universityId);
        ({ error } = await supabase
          .from('admin_university_access')
          .delete()
          .match({ admin_id: adminUuid, university_id: uniUuid }));
      }
      if (error) {
        console.error('[CMS] removeAdminAssignment error:', (error as any).message);
        return false;
      }
    }
    return true;
  },

  // ── Image Uploads ─────────────────────────────────────────────────────────────
  async uploadUniversityImage(file: File, folder: 'logos' | 'covers'): Promise<string> {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) throw new Error('Unsupported format. Use JPEG, PNG, WEBP or SVG.');
    if (file.size > 5 * 1024 * 1024) throw new Error('File too large. Max 5 MB.');

    if (isSupabaseConfigured) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from('university-assets')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (!error && data?.path) {
        const { data: pub } = supabase.storage.from('university-assets').getPublicUrl(data.path);
        if (pub?.publicUrl) return pub.publicUrl;
      }
      if (error) console.error('[CMS] image upload error:', error.message);
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};
