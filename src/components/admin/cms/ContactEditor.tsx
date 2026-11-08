import { Mail, Phone, Globe, MapPin, Share2, MessageSquare } from 'lucide-react';
import { ContactSectionContent } from '@/types/cms';

interface ContactEditorProps {
  content: ContactSectionContent;
  onChange: (updated: ContactSectionContent) => void;
}

export default function ContactEditor({ content, onChange }: ContactEditorProps) {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Primary Contact Details */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Phone className="text-brand-600" size={18} />
          Primary Contact & Office Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Official General Email</label>
            <input
              type="email"
              value={content.email || ''}
              onChange={(e) => onChange({ ...content, email: e.target.value })}
              placeholder="info@university.edu"
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Primary Telephone Number</label>
            <input
              type="tel"
              value={content.phone || ''}
              onChange={(e) => onChange({ ...content, phone: e.target.value })}
              placeholder="+880 2 841 4046-9"
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Admission Office Helpline / Hotline</label>
            <input
              type="text"
              value={content.hotline || ''}
              onChange={(e) => onChange({ ...content, hotline: e.target.value })}
              placeholder="Hotline: +880 9612-000000"
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Official Web Domain</label>
            <input
              type="url"
              value={content.website || ''}
              onChange={(e) => onChange({ ...content, website: e.target.value })}
              placeholder="https://www.university.edu"
              className="input-field text-xs mt-1"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-ink-700">Full Physical Campus Address</label>
          <input
            type="text"
            value={content.address || ''}
            onChange={(e) => onChange({ ...content, address: e.target.value })}
            placeholder="Plot 408/1, Kuratoli, Khilkhet, Dhaka 1229, Bangladesh"
            className="input-field text-xs mt-1"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-ink-700">Admission Office Contact Desk Details</label>
          <textarea
            rows={2}
            value={content.admissionOfficeContact || ''}
            onChange={(e) => onChange({ ...content, admissionOfficeContact: e.target.value })}
            placeholder="e.g. Building 1, Ground Floor, Admission Desk. Available Sun-Thu 9am-5pm."
            className="input-field text-xs mt-1 resize-y"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-ink-700">Google Maps Embed URL</label>
          <input
            type="text"
            value={content.googleMapsEmbedUrl || ''}
            onChange={(e) => onChange({ ...content, googleMapsEmbedUrl: e.target.value })}
            placeholder="https://maps.google.com/maps?q=..."
            className="input-field text-xs mt-1"
          />
          <p className="text-[11px] text-ink-400 mt-0.5">Embeds an interactive map on the contact page.</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Share2 className="text-brand-600" size={18} />
          Official Social Media Channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Facebook Page URL</label>
            <input
              type="url"
              value={content.socialLinks?.facebook || ''}
              onChange={(e) =>
                onChange({
                  ...content,
                  socialLinks: { ...(content.socialLinks || {}), facebook: e.target.value },
                })
              }
              placeholder="https://facebook.com/university"
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">LinkedIn University Page</label>
            <input
              type="url"
              value={content.socialLinks?.linkedin || ''}
              onChange={(e) =>
                onChange({
                  ...content,
                  socialLinks: { ...(content.socialLinks || {}), linkedin: e.target.value },
                })
              }
              placeholder="https://linkedin.com/school/university"
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">YouTube Channel</label>
            <input
              type="url"
              value={content.socialLinks?.youtube || ''}
              onChange={(e) =>
                onChange({
                  ...content,
                  socialLinks: { ...(content.socialLinks || {}), youtube: e.target.value },
                })
              }
              placeholder="https://youtube.com/@university"
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Instagram Handle / URL</label>
            <input
              type="url"
              value={content.socialLinks?.instagram || ''}
              onChange={(e) =>
                onChange({
                  ...content,
                  socialLinks: { ...(content.socialLinks || {}), instagram: e.target.value },
                })
              }
              placeholder="https://instagram.com/university"
              className="input-field text-xs mt-1"
            />
          </div>
        </div>
      </div>

      {/* Interactive Contact Form Toggle */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={content.contactFormEnabled ?? true}
            onChange={(e) => onChange({ ...content, contactFormEnabled: e.target.checked })}
            className="h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
          />
          <div>
            <p className="text-xs font-bold text-ink-900">Enable Interactive Contact / Inquiry Form</p>
            <p className="text-[11px] text-ink-500">
              When checked, visitors can directly send inquiry messages and callback requests from the profile.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}

