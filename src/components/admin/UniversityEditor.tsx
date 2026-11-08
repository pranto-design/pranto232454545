import React, { useState, useEffect } from 'react';
import {
  Save, Eye, ArrowLeft, Image as ImageIcon, Building, MapPin,
  GraduationCap, Award, FileText, CheckCircle2, AlertCircle,
  Plus, Trash2, Globe, Phone, Mail, Sliders, ExternalLink
} from 'lucide-react';
import { ExtendedUniversityData, universityCmsService } from '@/services/universityCmsService';
import { Faculty } from '@/types';

interface UniversityEditorProps {
  universityId: string;
  onBack: () => void;
  onSaved?: (updated: ExtendedUniversityData) => void;
  isSuperAdmin?: boolean;
}

export default function UniversityEditor({
  universityId,
  onBack,
  onSaved,
  isSuperAdmin = true,
}: UniversityEditorProps) {
  const [activeTab, setActiveTab] = useState<
    'general' | 'images' | 'contact' | 'overview' | 'statistics' | 'academic' | 'facilities' | 'admission' | 'seo'
  >('general');

  const [uni, setUni] = useState<ExtendedUniversityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Facility & Faculty inputs
  const [newFacility, setNewFacility] = useState('');
  const [newFacultyName, setNewFacultyName] = useState('');
  const [newDeptInput, setNewDeptInput] = useState<{ [facIndex: number]: string }>({});

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await universityCmsService.getUniversityBySlugOrId(universityId);
        if (data) {
          setUni({ ...data });
        }
      } catch (err: any) {
        setSaveError('Failed to load university details: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [universityId]);

  const handleChange = (field: keyof ExtendedUniversityData, value: any) => {
    if (!uni) return;
    setUni((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'cover') => {
    const file = e.target.files?.[0];
    if (!file || !uni) return;
    try {
      setSaving(true);
      const url = await universityCmsService.uploadUniversityImage(
        file,
        type === 'logo' ? 'logos' : 'covers'
      );
      if (type === 'logo') {
        handleChange('logoUrl', url);
      } else {
        handleChange('coverPhotoUrl', url);
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!uni) return;
    try {
      setSaving(true);
      setSaveError(null);
      setSaveSuccess(false);

      const saved = await universityCmsService.saveUniversity(uni);
      setUni(saved);
      setSaveSuccess(true);
      if (onSaved) onSaved(saved);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setSaveError(err.message || 'Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  // Facilities helpers
  const addFacility = () => {
    if (!newFacility.trim() || !uni) return;
    const facilities = [...(uni.facilities || []), newFacility.trim()];
    handleChange('facilities', facilities);
    setNewFacility('');
  };

  const removeFacility = (index: number) => {
    if (!uni) return;
    const facilities = (uni.facilities || []).filter((_, i) => i !== index);
    handleChange('facilities', facilities);
  };

  // Faculties helpers
  const addFaculty = () => {
    if (!newFacultyName.trim() || !uni) return;
    const faculties = [
      ...(uni.faculties || []),
      {
        id: `fac-${Date.now()}`,
        name: newFacultyName.trim(),
        departments: [],
      },
    ];
    handleChange('faculties', faculties);
    setNewFacultyName('');
  };

  const removeFaculty = (facIndex: number) => {
    if (!uni) return;
    const faculties = (uni.faculties || []).filter((_, i) => i !== facIndex);
    handleChange('faculties', faculties);
  };

  const addDepartment = (facIndex: number) => {
    const deptName = newDeptInput[facIndex]?.trim();
    if (!deptName || !uni) return;
    const faculties = [...(uni.faculties || [])];
    if (faculties[facIndex]) {
      faculties[facIndex] = {
        ...faculties[facIndex],
        departments: [...faculties[facIndex].departments, deptName],
      };
      handleChange('faculties', faculties);
      setNewDeptInput((prev) => ({ ...prev, [facIndex]: '' }));
    }
  };

  const removeDepartment = (facIndex: number, deptIndex: number) => {
    if (!uni) return;
    const faculties = [...(uni.faculties || [])];
    if (faculties[facIndex]) {
      faculties[facIndex] = {
        ...faculties[facIndex],
        departments: faculties[facIndex].departments.filter((_, i) => i !== deptIndex),
      };
      handleChange('faculties', faculties);
    }
  };

  if (loading) {
    return (
      <div className="card p-12 text-center">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full mb-3" />
        <p className="text-sm font-medium text-ink-600">Loading university details...</p>
      </div>
    );
  }

  if (!uni) {
    return (
      <div className="card p-8 text-center space-y-4">
        <AlertCircle size={40} className="mx-auto text-rose-500" />
        <h3 className="text-lg font-bold text-ink-900">University Not Found</h3>
        <button onClick={onBack} className="btn-secondary mx-auto">
          <ArrowLeft size={16} /> Return to Universities
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General Info' },
    { id: 'images', label: 'Logo & Cover' },
    { id: 'contact', label: 'Contact & Location' },
    { id: 'overview', label: 'Campus Overview' },
    { id: 'statistics', label: 'Statistics' },
    { id: 'academic', label: 'Faculties & Depts' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'admission', label: 'Admission Info' },
    { id: 'seo', label: 'SEO' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ink-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-ink-200 hover:bg-ink-100 text-ink-600 transition"
            title="Back to list"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-ink-900">{uni.name}</h1>
              <span className="chip-primary text-xs font-semibold">{uni.shortName}</span>
            </div>
            <p className="text-xs text-ink-500">Edit every detail displayed on the public university profile.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/universities/${uni.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1.5"
          >
            <ExternalLink size={14} /> View Public Page
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Save size={15} />
            {saving ? 'Saving Changes...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          University information updated successfully! Changes reflect on the public page dynamically.
        </div>
      )}

      {saveError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <AlertCircle size={16} className="text-rose-600 shrink-0" />
          {saveError}
        </div>
      )}

      {/* Tabs Nav */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar border-b border-ink-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-sm p-5 sm:p-6">
        {/* 1. General Info */}
        {activeTab === 'general' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-base font-bold text-ink-900 border-b border-ink-100 pb-2">University Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink-700">University Full Name *</label>
                <input
                  type="text"
                  value={uni.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="input-field text-xs mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Short Name / Acronym *</label>
                <input
                  type="text"
                  value={uni.shortName}
                  onChange={(e) => handleChange('shortName', e.target.value)}
                  className="input-field text-xs mt-1"
                  placeholder="e.g. BRACU"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">URL Slug *</label>
                <input
                  type="text"
                  value={uni.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className="input-field text-xs mt-1"
                  placeholder="e.g. brac-university"
                  required
                />
                <p className="text-[10px] text-ink-400 mt-0.5">Public route: /universities/{uni.slug}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">University Type</label>
                <select
                  value={uni.type || 'Private'}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="input-field text-xs mt-1"
                >
                  <option value="Private">Private University</option>
                  <option value="Public">Public University</option>
                  <option value="International">International University</option>
                  <option value="Specialized">Specialized University</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Establishment Year</label>
                <input
                  type="number"
                  value={uni.established}
                  onChange={(e) => handleChange('established', Number(e.target.value))}
                  className="input-field text-xs mt-1"
                  placeholder="e.g. 2001"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Accreditation</label>
                <input
                  type="text"
                  value={uni.accreditation}
                  onChange={(e) => handleChange('accreditation', e.target.value)}
                  className="input-field text-xs mt-1"
                  placeholder="e.g. UGC Approved, Grade 'A'"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Verification Status</label>
                <select
                  value={uni.verification}
                  onChange={(e) => handleChange('verification', e.target.value)}
                  className="input-field text-xs mt-1"
                >
                  <option value="verified">Verified Official</option>
                  <option value="university_verified">University Verified</option>
                  <option value="needs_verification">Needs Verification</option>
                  <option value="community_reported">Community Reported</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink-700">Short Description</label>
              <textarea
                rows={3}
                value={uni.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="input-field text-xs mt-1"
                placeholder="High-level description of the university..."
              />
            </div>
          </div>
        )}

        {/* 2. Logo & Cover Photo */}
        {activeTab === 'images' && (
          <div className="space-y-6 max-w-3xl">
            <h3 className="text-base font-bold text-ink-900 border-b border-ink-100 pb-2">University Images</h3>
            <p className="text-xs text-ink-500">
              Only two image assets are supported for performance: University Logo and Cover Photo. Uploaded files are stored in Supabase Storage with preview and replacement options.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo Section */}
              <div className="card p-4 border border-ink-200 rounded-xl space-y-3">
                <p className="text-xs font-bold text-ink-800">1. University Logo</p>
                <div className="h-32 rounded-xl bg-ink-50 border border-ink-100 flex items-center justify-center overflow-hidden relative">
                  {uni.logoUrl ? (
                    <img src={uni.logoUrl} alt="Logo" className="max-h-24 max-w-full object-contain" />
                  ) : (
                    <div className="text-center text-ink-400">
                      <ImageIcon size={32} className="mx-auto mb-1 opacity-50" />
                      <span className="text-[11px]">No logo uploaded</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <label className="btn-secondary !py-1.5 !px-3 text-xs cursor-pointer flex-1 text-center">
                    <span>{uni.logoUrl ? 'Replace Logo' : 'Upload Logo'}</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp, image/svg+xml"
                      onChange={(e) => handleImageUpload(e, 'logo')}
                      className="hidden"
                    />
                  </label>
                  {uni.logoUrl && (
                    <button
                      type="button"
                      onClick={() => handleChange('logoUrl', '')}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Remove Logo"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Cover Photo Section */}
              <div className="card p-4 border border-ink-200 rounded-xl space-y-3">
                <p className="text-xs font-bold text-ink-800">2. University Cover Photo</p>
                <div className="h-32 rounded-xl bg-ink-50 border border-ink-100 flex items-center justify-center overflow-hidden relative">
                  {uni.coverPhotoUrl ? (
                    <img src={uni.coverPhotoUrl} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-ink-400">
                      <ImageIcon size={32} className="mx-auto mb-1 opacity-50" />
                      <span className="text-[11px]">No cover photo uploaded</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <label className="btn-secondary !py-1.5 !px-3 text-xs cursor-pointer flex-1 text-center">
                    <span>{uni.coverPhotoUrl ? 'Replace Cover' : 'Upload Cover'}</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(e) => handleImageUpload(e, 'cover')}
                      className="hidden"
                    />
                  </label>
                  {uni.coverPhotoUrl && (
                    <button
                      type="button"
                      onClick={() => handleChange('coverPhotoUrl', '')}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Remove Cover Photo"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Contact & Location */}
        {activeTab === 'contact' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-base font-bold text-ink-900 border-b border-ink-100 pb-2">Contact & Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink-700">Division</label>
                <select
                  value={uni.division}
                  onChange={(e) => handleChange('division', e.target.value)}
                  className="input-field text-xs mt-1"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">City / Location</label>
                <input
                  type="text"
                  value={uni.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="input-field text-xs mt-1"
                  placeholder="e.g. Merul Badda, Dhaka"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-ink-700">Full Campus Address</label>
                <input
                  type="text"
                  value={uni.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="input-field text-xs mt-1"
                  placeholder="e.g. Kha 224, Bir Uttam Rafiqul Islam Avenue, Dhaka 1212"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Official Website URL</label>
                <input
                  type="url"
                  value={uni.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="input-field text-xs mt-1"
                  placeholder="https://www.bracu.ac.bd"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Contact Email</label>
                <input
                  type="email"
                  value={uni.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="input-field text-xs mt-1"
                  placeholder="admissions@bracu.ac.bd"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Phone Number</label>
                <input
                  type="text"
                  value={uni.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="input-field text-xs mt-1"
                  placeholder="+880 2 222288051"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. Campus Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-base font-bold text-ink-900 border-b border-ink-100 pb-2">University Overview</h3>

            <div>
              <label className="text-xs font-semibold text-ink-700">Campus Environment & Facilities Info</label>
              <textarea
                rows={4}
                value={uni.campusInfo}
                onChange={(e) => handleChange('campusInfo', e.target.value)}
                className="input-field text-xs mt-1"
                placeholder="Details regarding permanent campus, green architecture, smart classrooms..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-ink-700">Official Information Source</label>
              <input
                type="text"
                value={uni.source}
                onChange={(e) => handleChange('source', e.target.value)}
                className="input-field text-xs mt-1"
                placeholder="e.g. Official University Website & UGC Annual Report"
              />
            </div>
          </div>
        )}

        {/* 5. Statistics */}
        {activeTab === 'statistics' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-base font-bold text-ink-900 border-b border-ink-100 pb-2">Statistics & Tuition Bounds</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink-700">Tuition Minimum (BDT)</label>
                <input
                  type="number"
                  value={uni.tuitionMin}
                  onChange={(e) => handleChange('tuitionMin', Number(e.target.value))}
                  className="input-field text-xs mt-1"
                  placeholder="e.g. 750000"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Tuition Maximum (BDT)</label>
                <input
                  type="number"
                  value={uni.tuitionMax}
                  onChange={(e) => handleChange('tuitionMax', Number(e.target.value))}
                  className="input-field text-xs mt-1"
                  placeholder="e.g. 1450000"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Rating (out of 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={uni.rating}
                  onChange={(e) => handleChange('rating', Number(e.target.value))}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Review Count</label>
                <input
                  type="number"
                  value={uni.reviewCount}
                  onChange={(e) => handleChange('reviewCount', Number(e.target.value))}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Program Count</label>
                <input
                  type="number"
                  value={uni.programCount}
                  onChange={(e) => handleChange('programCount', Number(e.target.value))}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="schAvailable"
                  checked={uni.scholarshipAvailable}
                  onChange={(e) => handleChange('scholarshipAvailable', e.target.checked)}
                  className="h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="schAvailable" className="text-xs font-semibold text-ink-800">
                  Scholarships Available for Undergraduate Students
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 6. Academic Information (Faculties & Departments) */}
        {activeTab === 'academic' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between border-b border-ink-100 pb-2">
              <h3 className="text-base font-bold text-ink-900">Faculties &amp; Departments</h3>
            </div>

            {/* Existing Faculties List */}
            <div className="space-y-4">
              {(uni.faculties || []).map((fac, fIdx) => (
                <div key={fac.id || fIdx} className="card p-4 bg-ink-50/50 border border-ink-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ink-900">{fac.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFaculty(fIdx)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1"
                    >
                      <Trash2 size={13} /> Remove Faculty
                    </button>
                  </div>

                  {/* Departments */}
                  <div className="pl-3 border-l-2 border-brand-200 space-y-2">
                    <p className="text-[11px] font-semibold text-ink-600">Departments under {fac.name}:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {fac.departments.map((d, dIdx) => (
                        <span
                          key={dIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-white border border-ink-200 text-ink-700 shadow-2xs"
                        >
                          {d}
                          <button
                            type="button"
                            onClick={() => removeDepartment(fIdx, dIdx)}
                            className="text-ink-400 hover:text-rose-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Add department input */}
                    <div className="flex items-center gap-2 pt-1 max-w-sm">
                      <input
                        type="text"
                        placeholder="Add department name..."
                        value={newDeptInput[fIdx] || ''}
                        onChange={(e) =>
                          setNewDeptInput((prev) => ({ ...prev, [fIdx]: e.target.value }))
                        }
                        className="input-field text-xs py-1"
                      />
                      <button
                        type="button"
                        onClick={() => addDepartment(fIdx)}
                        className="btn-secondary !py-1 !px-2 text-xs shrink-0"
                      >
                        Add Dept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Faculty */}
            <div className="p-4 border-2 border-dashed border-ink-200 rounded-xl space-y-2 bg-white">
              <p className="text-xs font-semibold text-ink-800">Add New Faculty / School</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. School of Data and Sciences"
                  value={newFacultyName}
                  onChange={(e) => setNewFacultyName(e.target.value)}
                  className="input-field text-xs"
                />
                <button
                  type="button"
                  onClick={addFaculty}
                  className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1 shrink-0"
                >
                  <Plus size={14} /> Add Faculty
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 7. Facilities */}
        {activeTab === 'facilities' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-base font-bold text-ink-900 border-b border-ink-100 pb-2">University Facilities</h3>
            <p className="text-xs text-ink-500">
              Campus amenities and student infrastructure displayed on the university profile.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {(uni.facilities || []).map((fac, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-800 text-xs font-medium"
                >
                  {fac}
                  <button
                    type="button"
                    onClick={() => removeFacility(idx)}
                    className="text-brand-500 hover:text-rose-600 transition"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-3 max-w-md">
              <input
                type="text"
                placeholder="e.g. High-performance Computing Lab"
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                className="input-field text-xs"
              />
              <button
                type="button"
                onClick={addFacility}
                className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1 shrink-0"
              >
                <Plus size={14} /> Add Facility
              </button>
            </div>
          </div>
        )}

        {/* 8. Admission Info */}
        {activeTab === 'admission' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-base font-bold text-ink-900 border-b border-ink-100 pb-2">Admission Requirements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink-700">Minimum HSC GPA (out of 5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={uni.minGPA}
                  onChange={(e) => handleChange('minGPA', Number(e.target.value))}
                  className="input-field text-xs mt-1"
                  placeholder="3.5"
                />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="admTestReq"
                  checked={uni.admissionTestRequired}
                  onChange={(e) => handleChange('admissionTestRequired', e.target.checked)}
                  className="h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="admTestReq" className="text-xs font-semibold text-ink-800">
                  Written Admission Test Required
                </label>
              </div>
            </div>
          </div>
        )}

        {/* 9. SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-base font-bold text-ink-900 border-b border-ink-100 pb-2">SEO &amp; Metadata</h3>
            <div>
              <label className="text-xs font-semibold text-ink-700">Meta Title</label>
              <input
                type="text"
                value={uni.seoTitle || ''}
                onChange={(e) => handleChange('seoTitle', e.target.value)}
                className="input-field text-xs mt-1"
                placeholder={`${uni.name} - Admission, Programs, Tuition Fees | UniVara`}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-ink-700">Meta Description</label>
              <textarea
                rows={3}
                value={uni.seoDescription || ''}
                onChange={(e) => handleChange('seoDescription', e.target.value)}
                className="input-field text-xs mt-1"
                placeholder="Comprehensive details on tuition fees, admission requirements, scholarships and faculties..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

