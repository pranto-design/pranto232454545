import { useState } from 'react';
import { Plus, Trash2, Users, Trophy, Sparkles, Briefcase } from 'lucide-react';
import { StudentLifeContent } from '@/types/cms';
import RichTextEditor from './RichTextEditor';

interface StudentLifeEditorProps {
  content: StudentLifeContent;
  onChange: (updated: StudentLifeContent) => void;
}

export default function StudentLifeEditor({ content, onChange }: StudentLifeEditorProps) {
  const [newClubName, setNewClubName] = useState('');
  const [newClubCategory, setNewClubCategory] = useState('');
  const [newClubDesc, setNewClubDesc] = useState('');
  const [newCult, setNewCult] = useState('');
  const [newSport, setNewSport] = useState('');
  const [newEventName, setNewEventName] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const addClub = () => {
    if (!newClubName.trim()) return;
    onChange({
      ...content,
      organizationsAndClubs: [
        ...(content.organizationsAndClubs || []),
        {
          name: newClubName.trim(),
          category: newClubCategory.trim() || 'General',
          description: newClubDesc.trim(),
        },
      ],
    });
    setNewClubName('');
    setNewClubCategory('');
    setNewClubDesc('');
  };

  const addEvent = () => {
    if (!newEventName.trim()) return;
    onChange({
      ...content,
      annualEvents: [
        ...(content.annualEvents || []),
        { name: newEventName.trim(), time: newEventTime.trim(), description: '' },
      ],
    });
    setNewEventName('');
    setNewEventTime('');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Overview */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Users className="text-brand-600" size={18} />
          Student Life & Co-curricular Experience
        </h2>
        <RichTextEditor
          label="Student Life Overview"
          value={content.overview || ''}
          onChange={(val) => onChange({ ...content, overview: val })}
          minHeight="120px"
        />
      </div>

      {/* Clubs & Societies */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Student Clubs & Societies ({content.organizationsAndClubs?.length || 0})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(content.organizationsAndClubs || []).map((club, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-ink-50 border border-ink-100 relative group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-ink-900 text-xs">{club.name}</p>
                  <span className="text-[10px] text-brand-600 font-semibold">{club.category}</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      organizationsAndClubs: content.organizationsAndClubs.filter((_, i) => i !== idx),
                    })
                  }
                  className="text-ink-400 hover:text-red-600"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              {club.description && <p className="text-[11px] text-ink-600 mt-1 line-clamp-2">{club.description}</p>}
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2 border-t border-ink-100">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Club Name (e.g. Computer Club)"
              value={newClubName}
              onChange={(e) => setNewClubName(e.target.value)}
              className="input-field text-xs"
            />
            <input
              type="text"
              placeholder="Category (e.g. Technology, Debating, Arts)"
              value={newClubCategory}
              onChange={(e) => setNewClubCategory(e.target.value)}
              className="input-field text-xs"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Brief description of activities and workshops..."
              value={newClubDesc}
              onChange={(e) => setNewClubDesc(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addClub} className="btn-secondary !py-2 !px-3 text-xs">
              <Plus size={14} /> Add Club
            </button>
          </div>
        </div>
      </div>

      {/* Cultural, Sports & Annual Events */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Trophy className="text-brand-600" size={18} />
          Annual Events, Sports & Cultural Activities
        </h2>

        {/* Events */}
        <div>
          <label className="text-xs font-semibold text-ink-700">Flagship Annual Events & Carnivals</label>
          <div className="space-y-1.5 mt-2">
            {(content.annualEvents || []).map((ev, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-ink-50 text-xs">
                <div>
                  <span className="font-bold text-ink-900">{ev.name}</span>
                  {ev.time && <span className="text-ink-500 ml-2">({ev.time})</span>}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      annualEvents: content.annualEvents.filter((_, i) => i !== idx),
                    })
                  }
                  className="text-ink-400 hover:text-red-600"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Event Name (e.g. National Tech Carnival)"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <input
              type="text"
              placeholder="Season / Time (e.g. Every Spring)"
              value={newEventTime}
              onChange={(e) => setNewEventTime(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addEvent} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* Career & Alumni */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-ink-100">
          <div>
            <label className="text-xs font-semibold text-ink-700">Career Placement & Internship Services</label>
            <textarea
              rows={3}
              value={content.careerServices || ''}
              onChange={(e) => onChange({ ...content, careerServices: e.target.value })}
              placeholder="Job fairs, resume clinics, on-campus corporate interviews..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Alumni Network & Associations</label>
            <textarea
              rows={3}
              value={content.alumniNetwork || ''}
              onChange={(e) => onChange({ ...content, alumniNetwork: e.target.value })}
              placeholder="Worldwide alumni reach, notable graduates, mentor connections..."
              className="input-field text-xs mt-1 resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

