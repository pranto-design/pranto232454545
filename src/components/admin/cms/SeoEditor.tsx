import { useState } from 'react';
import { Search, Globe, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { SEOSettings } from '@/types/cms';
import MediaUploader from './MediaUploader';

interface SeoEditorProps {
  seo: SEOSettings;
  slug: string;
  onChange: (updated: SEOSettings) => void;
}

export default function SeoEditor({ seo, slug, onChange }: SeoEditorProps) {
  const [newKeyword, setNewKeyword] = useState('');

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    onChange({
      ...seo,
      keywords: [...(seo.keywords || []), newKeyword.trim()],
    });
    setNewKeyword('');
  };

  const removeKeyword = (idx: number) => {
    onChange({
      ...seo,
      keywords: seo.keywords.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Search Engine Snippet Preview */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Search className="text-brand-600" size={18} />
          Google Search Engine Result Preview
        </h2>

        <div className="p-4 rounded-xl border border-ink-200 bg-white font-sans max-w-2xl shadow-sm">
          <p className="text-[11px] text-ink-500 truncate flex items-center gap-1">
            <Globe size={11} className="text-emerald-700" />
            <span>https://univara.com/universities/{slug}</span>
          </p>
          <h3 className="text-base text-blue-800 hover:underline font-medium cursor-pointer mt-0.5 truncate">
            {seo.metaTitle || 'University Profile - Admission, Tuition & Rankings | UniVara'}
          </h3>
          <p className="text-xs text-ink-600 mt-1 line-clamp-2 leading-relaxed">
            {seo.metaDescription ||
              'Explore comprehensive academic programs, admission requirements, verified tuition fees, scholarships, and campus facilities on UniVara.'}
          </p>
        </div>
      </div>

      {/* Meta Title & Description */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Search Engine Metadata
        </h2>

        <div>
          <div className="flex justify-between">
            <label className="text-xs font-semibold text-ink-700">SEO Page Meta Title</label>
            <span
              className={`text-[10px] font-bold ${
                (seo.metaTitle || '').length > 60 ? 'text-amber-600' : 'text-ink-400'
              }`}
            >
              {(seo.metaTitle || '').length} / 60 chars recommended
            </span>
          </div>
          <input
            type="text"
            value={seo.metaTitle || ''}
            onChange={(e) => onChange({ ...seo, metaTitle: e.target.value })}
            placeholder="American International University-Bangladesh (AIUB) - Admission, Tuition & Programs | UniVara"
            className="input-field text-xs mt-1"
          />
        </div>

        <div>
          <div className="flex justify-between">
            <label className="text-xs font-semibold text-ink-700">Meta Description</label>
            <span
              className={`text-[10px] font-bold ${
                (seo.metaDescription || '').length > 160 ? 'text-amber-600' : 'text-ink-400'
              }`}
            >
              {(seo.metaDescription || '').length} / 160 chars recommended
            </span>
          </div>
          <textarea
            rows={3}
            value={seo.metaDescription || ''}
            onChange={(e) => onChange({ ...seo, metaDescription: e.target.value })}
            placeholder="Comprehensive guide to AIUB. View 2026 tuition fees, admission deadlines, available scholarships, and degree programs..."
            className="input-field text-xs mt-1 resize-y"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-ink-700">Canonical URL</label>
          <input
            type="url"
            value={seo.canonicalUrl || `https://univara.com/universities/${slug}`}
            onChange={(e) => onChange({ ...seo, canonicalUrl: e.target.value })}
            className="input-field text-xs mt-1"
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="text-xs font-semibold text-ink-700">Target SEO Keywords</label>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {(seo.keywords || []).map((k, idx) => (
              <span
                key={idx}
                className="chip bg-brand-50 text-brand-800 border border-brand-200 text-xs font-medium"
              >
                {k}
                <button
                  type="button"
                  onClick={() => removeKeyword(idx)}
                  className="ml-1 text-brand-400 hover:text-red-600"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add keyword (e.g. Bangladesh University, Tuition Fees, CSE Admission)"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addKeyword} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add Keyword
            </button>
          </div>
        </div>

        {/* Open Graph Social Image */}
        <div className="pt-2">
          <MediaUploader
            label="Open Graph (OG) Share Image"
            value={seo.ogImageUrl || ''}
            onChange={(url) => onChange({ ...seo, ogImageUrl: url })}
            folder="seo"
            helperText="Appears when link is shared on Facebook, WhatsApp, Twitter, and LinkedIn (1200x630 recommended)."
          />
        </div>
      </div>
    </div>
  );
}

