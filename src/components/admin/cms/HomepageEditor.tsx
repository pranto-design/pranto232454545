import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, Sparkles, BarChart2 } from 'lucide-react';
import { HomepageSectionContent } from '@/types/cms';
import RichTextEditor from './RichTextEditor';
import MediaUploader from './MediaUploader';

interface HomepageEditorProps {
  content: HomepageSectionContent;
  onChange: (updated: HomepageSectionContent) => void;
}

export default function HomepageEditor({ content, onChange }: HomepageEditorProps) {
  const [newStatLabel, setNewStatLabel] = useState('');
  const [newStatVal, setNewStatVal] = useState('');

  const handleAddBanner = (url: string) => {
    if (!url) return;
    onChange({
      ...content,
      bannerImages: [...(content.bannerImages || []), url],
    });
  };

  const handleRemoveBanner = (index: number) => {
    onChange({
      ...content,
      bannerImages: content.bannerImages.filter((_, i) => i !== index),
    });
  };

  const handleAddStat = () => {
    if (!newStatLabel.trim() || !newStatVal.trim()) return;
    onChange({
      ...content,
      statistics: [
        ...(content.statistics || []),
        { label: newStatLabel.trim(), value: newStatVal.trim(), icon: 'Sparkles' },
      ],
    });
    setNewStatLabel('');
    setNewStatVal('');
  };

  const handleRemoveStat = (index: number) => {
    onChange({
      ...content,
      statistics: content.statistics.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Hero Section */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-ink-100">
          <Sparkles className="text-brand-600" size={18} />
          <h2 className="text-base font-bold text-ink-900">Homepage Hero Section</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Hero Main Title</label>
            <input
              type="text"
              value={content.heroTitle || ''}
              onChange={(e) => onChange({ ...content, heroTitle: e.target.value })}
              placeholder="e.g. Welcome to American International University-Bangladesh"
              className="input-field text-sm mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Hero Subtitle</label>
            <textarea
              rows={2}
              value={content.heroSubtitle || ''}
              onChange={(e) => onChange({ ...content, heroSubtitle: e.target.value })}
              placeholder="e.g. Where leaders are created. Fostering future-ready professionals..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-ink-700">Call to Action (CTA) Button Text</label>
              <input
                type="text"
                value={content.ctaButtonText || ''}
                onChange={(e) => onChange({ ...content, ctaButtonText: e.target.value })}
                placeholder="Apply For Admission"
                className="input-field text-xs mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink-700">CTA Button Destination Link</label>
              <input
                type="text"
                value={content.ctaButtonLink || ''}
                onChange={(e) => onChange({ ...content, ctaButtonLink: e.target.value })}
                placeholder="https://admission.university.edu"
                className="input-field text-xs mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Banner Images Carousel */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-ink-100">
          <ImageIcon className="text-brand-600" size={18} />
          <h2 className="text-base font-bold text-ink-900">Hero Banner Slideshow / Carousel</h2>
        </div>

        <p className="text-xs text-ink-500">
          Upload or link high-resolution banner images that appear on the university profile header.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(content.bannerImages || []).map((imgUrl, idx) => (
            <div key={idx} className="relative group rounded-xl overflow-hidden border border-ink-200 aspect-video bg-ink-100">
              <img src={imgUrl} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveBanner(idx)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-600 transition"
                title="Remove banner"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <MediaUploader
            label="Add Another Banner Slide"
            value=""
            onChange={handleAddBanner}
            folder="banners"
            helperText="Upload landscape 16:9 images."
          />
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Top Announcement Banner (Optional)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Announcement Text</label>
            <input
              type="text"
              value={content.announcementText || ''}
              onChange={(e) => onChange({ ...content, announcementText: e.target.value })}
              placeholder="e.g. Admission open for Fall 2026. Special 20% waiver for early applicants!"
              className="input-field text-xs mt-1"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-700">Announcement Link</label>
            <input
              type="text"
              value={content.announcementLink || ''}
              onChange={(e) => onChange({ ...content, announcementLink: e.target.value })}
              placeholder="/admission"
              className="input-field text-xs mt-1"
            />
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <RichTextEditor
          label="Homepage Introduction Section"
          value={content.introduction || ''}
          onChange={(val) => onChange({ ...content, introduction: val })}
          placeholder="Write a welcome introduction message for prospective students..."
          minHeight="140px"
        />
      </div>

      {/* Key Highlights / Statistics */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-ink-100">
          <BarChart2 className="text-brand-600" size={18} />
          <h2 className="text-base font-bold text-ink-900">Key University Statistics & Highlights</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(content.statistics || []).map((st, idx) => (
            <div key={idx} className="p-3 bg-ink-50 rounded-xl border border-ink-100 relative group">
              <p className="text-lg font-bold text-brand-600">{st.value}</p>
              <p className="text-xs text-ink-600 font-medium truncate">{st.label}</p>
              <button
                type="button"
                onClick={() => handleRemoveStat(idx)}
                className="absolute top-2 right-2 text-ink-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Add new stat */}
        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            placeholder="Stat Value (e.g. 15,000+)"
            value={newStatVal}
            onChange={(e) => setNewStatVal(e.target.value)}
            className="input-field text-xs flex-1"
          />
          <input
            type="text"
            placeholder="Label (e.g. Graduates Employed)"
            value={newStatLabel}
            onChange={(e) => setNewStatLabel(e.target.value)}
            className="input-field text-xs flex-1"
          />
          <button
            type="button"
            onClick={handleAddStat}
            className="btn-secondary !py-2 !px-3 text-xs shrink-0 flex items-center gap-1"
          >
            <Plus size={14} /> Add Stat
          </button>
        </div>
      </div>
    </div>
  );
}

