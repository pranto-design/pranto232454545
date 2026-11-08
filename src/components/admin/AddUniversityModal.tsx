import React, { useState } from 'react';
import { Plus, X, Building, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { ExtendedUniversityData, universityCmsService } from '@/services/universityCmsService';

interface AddUniversityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (newUni: ExtendedUniversityData) => void;
}

export default function AddUniversityModal({ isOpen, onClose, onCreated }: AddUniversityModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState<'Private' | 'Public' | 'International' | 'Specialized' | 'Other'>('Private');
  const [established, setEstablished] = useState<number>(2026);
  const [description, setDescription] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accreditation, setAccreditation] = useState('UGC Approved');
  const [tuitionMin, setTuitionMin] = useState<number>(600000);
  const [tuitionMax, setTuitionMax] = useState<number>(1200000);
  const [minGPA, setMinGPA] = useState<number>(3.5);
  const [admissionTestRequired, setAdmissionTestRequired] = useState(true);
  const [scholarshipAvailable, setScholarshipAvailable] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('');

  if (!isOpen) return null;

  // Auto-generate slug from name if not manually edited
  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageType: 'logo' | 'cover') => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const url = await universityCmsService.uploadUniversityImage(
        file,
        imageType === 'logo' ? 'logos' : 'covers'
      );
      if (imageType === 'logo') setLogoUrl(url);
      else setCoverPhotoUrl(url);
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('University Name is required.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const generatedId = `u-${slug.trim() || Date.now()}`;
      const newUni: ExtendedUniversityData = {
        id: generatedId,
        name: name.trim(),
        shortName: shortName.trim() || name.slice(0, 5).toUpperCase(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        type,
        established: Number(established) || 2026,
        accreditation,
        verification: 'verified',
        logoUrl,
        coverPhotoUrl,
        logoColor: 'from-brand-600 to-accent-600',
        logoInitials: (shortName || name).slice(0, 3).toUpperCase(),
        division: division as any,
        location: location.trim() || division,
        address: address.trim(),
        website: website.trim(),
        email: email.trim(),
        phone: phone.trim(),
        description: description.trim(),
        campusInfo: `${name} permanent modern campus featuring high-tech laboratories and facilities.`,
        source: 'Official University Registry',
        rating: 4.5,
        reviewCount: 0,
        tuitionMin: Number(tuitionMin) || 0,
        tuitionMax: Number(tuitionMax) || 0,
        programCount: 0,
        scholarshipAvailable,
        popularPrograms: [],
        faculties: [
          {
            id: `fac-1`,
            name: 'Faculty of Science & Engineering',
            departments: ['Computer Science and Engineering', 'Electrical and Electronic Engineering'],
          },
        ],
        facilities: ['Central Library', 'Computer Labs', 'Cafeteria', 'Auditorium'],
        admissionTestRequired,
        minGPA: Number(minGPA) || 3.5,
        featured: false,
        lastUpdated: new Date().toISOString(),
        seoTitle: `${name} - Admission, Programs, Tuition Fees | UniVara`,
        seoDescription: `Explore admission circulars, tuition fee structures, scholarships, and degree programs for ${name} on UniVara.`,
        status: 'published',
        isPublished: true,
      };

      const saved = await universityCmsService.saveUniversity(newUni);
      onCreated(saved);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error creating university');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-ink-200 overflow-hidden my-8 animate-fade-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 bg-ink-50/50">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold">
              <Building size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-ink-900">Add New University</h2>
              <p className="text-[11px] text-ink-500">Create a dynamic university entry accessible immediately on UniVara.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-400 hover:text-ink-700 rounded-lg transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
              {error}
            </div>
          )}

          {/* Section 1: Basic Profile */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-brand-700 uppercase tracking-wider">1. Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-ink-700">University Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. United International University"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Short Name / Acronym *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UIU"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">URL Slug *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. united-international-university"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">University Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="input-field text-xs mt-1"
                >
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="International">International</option>
                  <option value="Specialized">Specialized</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Establishment Year</label>
                <input
                  type="number"
                  value={established}
                  onChange={(e) => setEstablished(Number(e.target.value))}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-ink-700">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief overview of the institution..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field text-xs mt-1"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Images */}
          <div className="space-y-3 pt-3 border-t border-ink-100">
            <h3 className="text-xs font-bold text-brand-700 uppercase tracking-wider">2. University Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 border border-ink-200 rounded-xl space-y-2">
                <span className="text-xs font-semibold text-ink-700">University Logo</span>
                {logoUrl && <img src={logoUrl} alt="Logo" className="h-16 object-contain" />}
                <label className="btn-secondary !py-1 !px-2.5 text-xs block text-center cursor-pointer">
                  <span>{logoUrl ? 'Change Logo' : 'Upload Logo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-3 border border-ink-200 rounded-xl space-y-2">
                <span className="text-xs font-semibold text-ink-700">Cover Photo</span>
                {coverPhotoUrl && <img src={coverPhotoUrl} alt="Cover" className="h-16 w-full object-cover rounded-lg" />}
                <label className="btn-secondary !py-1 !px-2.5 text-xs block text-center cursor-pointer">
                  <span>{coverPhotoUrl ? 'Change Cover Photo' : 'Upload Cover'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'cover')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Location & Contact */}
          <div className="space-y-3 pt-3 border-t border-ink-100">
            <h3 className="text-xs font-bold text-brand-700 uppercase tracking-wider">3. Location &amp; Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-ink-700">Division</label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
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
                  placeholder="e.g. Madani Avenue, Dhaka"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-ink-700">Full Address</label>
                <input
                  type="text"
                  placeholder="Full campus street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Official Website URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Admissions Email</label>
                <input
                  type="email"
                  placeholder="admission@example.edu.bd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field text-xs mt-1"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Statistics & Admission */}
          <div className="space-y-3 pt-3 border-t border-ink-100">
            <h3 className="text-xs font-bold text-brand-700 uppercase tracking-wider">4. Academic &amp; Tuition Bounds</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-ink-700">Tuition Min (BDT)</label>
                <input
                  type="number"
                  value={tuitionMin}
                  onChange={(e) => setTuitionMin(Number(e.target.value))}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Tuition Max (BDT)</label>
                <input
                  type="number"
                  value={tuitionMax}
                  onChange={(e) => setTuitionMax(Number(e.target.value))}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Min HSC GPA</label>
                <input
                  type="number"
                  step="0.1"
                  value={minGPA}
                  onChange={(e) => setMinGPA(Number(e.target.value))}
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-ink-800">
                  <input
                    type="checkbox"
                    checked={admissionTestRequired}
                    onChange={(e) => setAdmissionTestRequired(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  Written Admission Test Required
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-ink-800">
                  <input
                    type="checkbox"
                    checked={scholarshipAvailable}
                    onChange={(e) => setScholarshipAvailable(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  Merit Scholarships Available
                </label>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-secondary !py-2 !px-4 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary !py-2 !px-5 text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={16} />
              {loading ? 'Creating University...' : 'Create & Open Editor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

