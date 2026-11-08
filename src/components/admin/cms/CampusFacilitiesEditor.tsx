import { useState } from 'react';
import { Plus, Trash2, MapPin, Building2, Image as ImageIcon } from 'lucide-react';
import { CampusFacilitiesContent } from '@/types/cms';
import RichTextEditor from './RichTextEditor';
import MediaUploader from './MediaUploader';

interface CampusFacilitiesEditorProps {
  content: CampusFacilitiesContent;
  onChange: (updated: CampusFacilitiesContent) => void;
}

export default function CampusFacilitiesEditor({ content, onChange }: CampusFacilitiesEditorProps) {
  const handleAddImage = (url: string) => {
    if (!url) return;
    onChange({
      ...content,
      campusImages: [...(content.campusImages || []), url],
    });
  };

  const handleRemoveImage = (index: number) => {
    onChange({
      ...content,
      campusImages: content.campusImages.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Overview & Images */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Building2 className="text-brand-600" size={18} />
          Campus Overview & Visuals
        </h2>

        <RichTextEditor
          label="Campus Overview & Environment"
          value={content.overview || ''}
          onChange={(val) => onChange({ ...content, overview: val })}
          placeholder="Describe the campus area, architecture, green landscape, and location..."
          minHeight="120px"
        />

        <div>
          <label className="text-xs font-semibold text-ink-700">Campus Facility Photos</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
            {(content.campusImages || []).map((imgUrl, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden aspect-video border border-ink-200 bg-ink-100">
                <img src={imgUrl} alt={`Campus ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-md bg-black/60 text-white hover:bg-red-600"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <MediaUploader
              label="Add Campus Image"
              value=""
              onChange={handleAddImage}
              folder="campus"
              helperText="Upload campus facilities, study areas, grounds, or buildings."
            />
          </div>
        </div>
      </div>

      {/* Academic & Tech Infrastructure */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Academic & Technical Facilities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Central Library</label>
            <textarea
              rows={3}
              value={content.libraryDetails || ''}
              onChange={(e) => onChange({ ...content, libraryDetails: e.target.value })}
              placeholder="Book volumes, digital journals, study pods, quiet zones..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Laboratories & Workshops</label>
            <textarea
              rows={3}
              value={content.laboratoriesDetails || ''}
              onChange={(e) => onChange({ ...content, laboratoriesDetails: e.target.value })}
              placeholder="Engineering labs, electronics testing stations, chemistry labs..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Computer Labs & High-Speed Workstations</label>
            <textarea
              rows={3}
              value={content.computerLabsDetails || ''}
              onChange={(e) => onChange({ ...content, computerLabsDetails: e.target.value })}
              placeholder="Number of computer labs, hardware specifications, gigabit network..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Research & Innovation Centers</label>
            <textarea
              rows={3}
              value={content.researchCentersDetails || ''}
              onChange={(e) => onChange({ ...content, researchCentersDetails: e.target.value })}
              placeholder="Dedicated innovation hubs and specialized research setups..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>
        </div>
      </div>

      {/* Student Life & Amenities */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Student Amenities & Campus Life
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Auditorium & Event Halls</label>
            <textarea
              rows={2}
              value={content.auditoriumDetails || ''}
              onChange={(e) => onChange({ ...content, auditoriumDetails: e.target.value })}
              placeholder="Seating capacity, acoustics, staging for convocations and cultural fests..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Sports & Gymnasium Facilities</label>
            <textarea
              rows={2}
              value={content.sportsFacilitiesDetails || ''}
              onChange={(e) => onChange({ ...content, sportsFacilitiesDetails: e.target.value })}
              placeholder="Indoor games, cricket field, futsal court, gymnasium equipment..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Cafeteria & Dining</label>
            <textarea
              rows={2}
              value={content.cafeteriaDetails || ''}
              onChange={(e) => onChange({ ...content, cafeteriaDetails: e.target.value })}
              placeholder="Catering options, hygiene standards, subsidized meal packages..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Medical Center & First Aid</label>
            <textarea
              rows={2}
              value={content.medicalCenterDetails || ''}
              onChange={(e) => onChange({ ...content, medicalCenterDetails: e.target.value })}
              placeholder="Full-time doctors, emergency ambulance, psychological counseling..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Shuttle Bus Transportation</label>
            <textarea
              rows={2}
              value={content.transportationDetails || ''}
              onChange={(e) => onChange({ ...content, transportationDetails: e.target.value })}
              placeholder="Routes covered, bus schedules, student transit passes..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Residential Dormitories / Halls</label>
            <textarea
              rows={2}
              value={content.residentialHallsDetails || ''}
              onChange={(e) => onChange({ ...content, residentialHallsDetails: e.target.value })}
              placeholder="Male & female student residence halls, security, meal arrangements..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-ink-700">Google Maps Embed URL / Location Link</label>
          <input
            type="text"
            value={content.campusMapEmbedUrl || ''}
            onChange={(e) => onChange({ ...content, campusMapEmbedUrl: e.target.value })}
            placeholder="https://maps.google.com/..."
            className="input-field text-xs mt-1"
          />
        </div>
      </div>
    </div>
  );
}

