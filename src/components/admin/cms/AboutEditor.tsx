import { useState } from 'react';
import { Plus, Trash2, Award, UserCheck, Shield } from 'lucide-react';
import { AboutSectionContent } from '@/types/cms';
import RichTextEditor from './RichTextEditor';
import MediaUploader from './MediaUploader';

interface AboutEditorProps {
  content: AboutSectionContent;
  onChange: (updated: AboutSectionContent) => void;
}

export default function AboutEditor({ content, onChange }: AboutEditorProps) {
  const [newCoreValue, setNewCoreValue] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newAccreditation, setNewAccreditation] = useState('');
  const [newRecognition, setNewRecognition] = useState('');

  const addCoreValue = () => {
    if (!newCoreValue.trim()) return;
    onChange({
      ...content,
      coreValues: [...(content.coreValues || []), newCoreValue.trim()],
    });
    setNewCoreValue('');
  };

  const addAchievement = () => {
    if (!newAchievement.trim()) return;
    onChange({
      ...content,
      achievements: [...(content.achievements || []), newAchievement.trim()],
    });
    setNewAchievement('');
  };

  const addAccreditation = () => {
    if (!newAccreditation.trim()) return;
    onChange({
      ...content,
      accreditations: [...(content.accreditations || []), newAccreditation.trim()],
    });
    setNewAccreditation('');
  };

  const addRecognition = () => {
    if (!newRecognition.trim()) return;
    onChange({
      ...content,
      recognitions: [...(content.recognitions || []), newRecognition.trim()],
    });
    setNewRecognition('');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Overview & History */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          University Overview & History
        </h2>
        <RichTextEditor
          label="Comprehensive University Overview"
          value={content.overview || ''}
          onChange={(val) => onChange({ ...content, overview: val })}
          minHeight="140px"
        />
        <RichTextEditor
          label="Foundation History & Heritage"
          value={content.history || ''}
          onChange={(val) => onChange({ ...content, history: val })}
          minHeight="140px"
        />
      </div>

      {/* Mission & Vision */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Mission, Vision & Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Mission Statement</label>
            <textarea
              rows={4}
              value={content.mission || ''}
              onChange={(e) => onChange({ ...content, mission: e.target.value })}
              className="input-field text-xs mt-1 resize-y"
              placeholder="State the institutional mission..."
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink-700">Vision Statement</label>
            <textarea
              rows={4}
              value={content.vision || ''}
              onChange={(e) => onChange({ ...content, vision: e.target.value })}
              className="input-field text-xs mt-1 resize-y"
              placeholder="State the institutional vision..."
            />
          </div>
        </div>

        {/* Core Values */}
        <div>
          <label className="text-xs font-semibold text-ink-700">Core Values</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(content.coreValues || []).map((val, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200"
              >
                {val}
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      coreValues: content.coreValues.filter((_, i) => i !== idx),
                    })
                  }
                  className="text-brand-400 hover:text-red-600"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder="Add value (e.g. Integrity & Transparency)"
              value={newCoreValue}
              onChange={(e) => setNewCoreValue(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button
              type="button"
              onClick={addCoreValue}
              className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1"
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Leadership / VC Message */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-ink-100">
          <UserCheck className="text-brand-600" size={18} />
          <h2 className="text-base font-bold text-ink-900">Leadership / Vice Chancellor Message</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Message Title</label>
            <input
              type="text"
              value={content.leadershipMessage?.title || ''}
              onChange={(e) =>
                onChange({
                  ...content,
                  leadershipMessage: {
                    ...(content.leadershipMessage || {
                      author: '',
                      authorDesignation: '',
                      message: '',
                    }),
                    title: e.target.value,
                  },
                })
              }
              placeholder="Message from the Vice Chancellor"
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Leader / VC Full Name</label>
            <input
              type="text"
              value={content.leadershipMessage?.author || ''}
              onChange={(e) =>
                onChange({
                  ...content,
                  leadershipMessage: {
                    ...(content.leadershipMessage || {
                      title: '',
                      authorDesignation: '',
                      message: '',
                    }),
                    author: e.target.value,
                  },
                })
              }
              placeholder="Prof. Dr. John Doe"
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Designation / Title</label>
            <input
              type="text"
              value={content.leadershipMessage?.authorDesignation || ''}
              onChange={(e) =>
                onChange({
                  ...content,
                  leadershipMessage: {
                    ...(content.leadershipMessage || {
                      title: '',
                      author: '',
                      message: '',
                    }),
                    authorDesignation: e.target.value,
                  },
                })
              }
              placeholder="Vice Chancellor"
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <MediaUploader
              label="Leader Portrait Photo"
              value={content.leadershipMessage?.photoUrl || ''}
              onChange={(url) =>
                onChange({
                  ...content,
                  leadershipMessage: {
                    ...(content.leadershipMessage || {
                      title: '',
                      author: '',
                      authorDesignation: '',
                      message: '',
                    }),
                    photoUrl: url,
                  },
                })
              }
              folder="leadership"
              helperText="Square or portrait photo."
            />
          </div>
        </div>

        <div>
          <RichTextEditor
            label="Full Leadership Speech / Statement"
            value={content.leadershipMessage?.message || ''}
            onChange={(val) =>
              onChange({
                ...content,
                leadershipMessage: {
                  ...(content.leadershipMessage || {
                    title: '',
                    author: '',
                    authorDesignation: '',
                  }),
                  message: val,
                },
              })
            }
            minHeight="140px"
          />
        </div>
      </div>

      {/* Accreditations, Recognitions, Achievements */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-ink-100">
          <Shield className="text-brand-600" size={18} />
          <h2 className="text-base font-bold text-ink-900">Accreditations, Recognitions & Achievements</h2>
        </div>

        {/* Accreditations */}
        <div>
          <label className="text-xs font-semibold text-ink-700">Accreditations & Approvals</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {(content.accreditations || []).map((acc, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
              >
                {acc}
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      accreditations: content.accreditations.filter((_, i) => i !== idx),
                    })
                  }
                  className="text-emerald-400 hover:text-red-600"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="e.g. IEB Accredited, ACBSP Global"
              value={newAccreditation}
              onChange={(e) => setNewAccreditation(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addAccreditation} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="pt-2">
          <label className="text-xs font-semibold text-ink-700">Key Institutional Achievements</label>
          <div className="space-y-1.5 mt-2">
            {(content.achievements || []).map((ach, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-ink-50 text-xs text-ink-800">
                <span>• {ach}</span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      achievements: content.achievements.filter((_, i) => i !== idx),
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
              placeholder="e.g. Over 90% graduate employment rate in 2025"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addAchievement} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

