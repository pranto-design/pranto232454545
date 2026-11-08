import { useState } from 'react';
import { Plus, Trash2, Microscope, BookOpen, Globe } from 'lucide-react';
import { ResearchSectionContent } from '@/types/cms';
import RichTextEditor from './RichTextEditor';

interface ResearchEditorProps {
  content: ResearchSectionContent;
  onChange: (updated: ResearchSectionContent) => void;
}

export default function ResearchEditor({ content, onChange }: ResearchEditorProps) {
  const [newCenterName, setNewCenterName] = useState('');
  const [newCenterFocus, setNewCenterFocus] = useState('');
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjInv, setNewProjInv] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newCollab, setNewCollab] = useState('');

  const addCenter = () => {
    if (!newCenterName.trim()) return;
    onChange({
      ...content,
      researchCenters: [
        ...(content.researchCenters || []),
        { name: newCenterName.trim(), focus: newCenterFocus.trim() },
      ],
    });
    setNewCenterName('');
    setNewCenterFocus('');
  };

  const addProject = () => {
    if (!newProjTitle.trim()) return;
    onChange({
      ...content,
      keyProjects: [
        ...(content.keyProjects || []),
        { title: newProjTitle.trim(), investigator: newProjInv.trim(), description: '' },
      ],
    });
    setNewProjTitle('');
    setNewProjInv('');
  };

  const addArea = () => {
    if (!newArea.trim()) return;
    onChange({
      ...content,
      researchAreas: [...(content.researchAreas || []), newArea.trim()],
    });
    setNewArea('');
  };

  const addCollab = () => {
    if (!newCollab.trim()) return;
    onChange({
      ...content,
      collaborations: [...(content.collaborations || []), newCollab.trim()],
    });
    setNewCollab('');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Overview & Publications */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Microscope className="text-brand-600" size={18} />
          Research & Innovation Strategy
        </h2>
        <RichTextEditor
          label="Research Vision & Overview"
          value={content.overview || ''}
          onChange={(val) => onChange({ ...content, overview: val })}
          minHeight="120px"
        />
        <div>
          <label className="text-xs font-semibold text-ink-700">Publications & Citation Impact Summary</label>
          <textarea
            rows={2}
            value={content.publicationsSummary || ''}
            onChange={(e) => onChange({ ...content, publicationsSummary: e.target.value })}
            placeholder="e.g. Over 200 Scopus-indexed research articles published annually..."
            className="input-field text-xs mt-1 resize-y"
          />
        </div>
      </div>

      {/* Research Centers */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Specialized Research Centers & Labs
        </h2>

        <div className="space-y-2">
          {(content.researchCenters || []).map((rc, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-ink-50 text-xs">
              <div>
                <p className="font-bold text-ink-900">{rc.name}</p>
                <p className="text-ink-500">{rc.focus}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...content,
                    researchCenters: content.researchCenters.filter((_, i) => i !== idx),
                  })
                }
                className="text-ink-400 hover:text-red-600"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          <input
            type="text"
            placeholder="Center Name (e.g. Center for Artificial Intelligence)"
            value={newCenterName}
            onChange={(e) => setNewCenterName(e.target.value)}
            className="input-field text-xs"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Research Focus (e.g. NLP, Computer Vision)"
              value={newCenterFocus}
              onChange={(e) => setNewCenterFocus(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addCenter} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Ongoing Projects & Collaborations */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Key Projects & Global Collaborations
        </h2>

        {/* Projects */}
        <div>
          <label className="text-xs font-semibold text-ink-700">Funded / High-Impact Projects</label>
          <div className="space-y-2 mt-2">
            {(content.keyProjects || []).map((kp, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-ink-50 text-xs">
                <div>
                  <span className="font-bold text-ink-900">{kp.title}</span>
                  {kp.investigator && <span className="text-brand-600 ml-2">({kp.investigator})</span>}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      keyProjects: content.keyProjects.filter((_, i) => i !== idx),
                    })
                  }
                  className="text-ink-400 hover:text-red-600"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <input
              type="text"
              placeholder="Project Title"
              value={newProjTitle}
              onChange={(e) => setNewProjTitle(e.target.value)}
              className="input-field text-xs"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Department / Investigator"
                value={newProjInv}
                onChange={(e) => setNewProjInv(e.target.value)}
                className="input-field text-xs flex-1"
              />
              <button type="button" onClick={addProject} className="btn-secondary !py-1.5 !px-3 text-xs">
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="pt-2">
          <label className="text-xs font-semibold text-ink-700">Primary Research Domains</label>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {(content.researchAreas || []).map((ra, idx) => (
              <span key={idx} className="chip bg-brand-50 text-brand-700 border border-brand-200 text-xs">
                {ra}
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      researchAreas: content.researchAreas.filter((_, i) => i !== idx),
                    })
                  }
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
              placeholder="e.g. Nanotechnology, Renewable Power, FinTech"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addArea} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* Collaborations */}
        <div className="pt-2">
          <label className="text-xs font-semibold text-ink-700">Institutional & Industry Collaborations</label>
          <div className="space-y-1.5 mt-2">
            {(content.collaborations || []).map((collab, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-ink-50 text-xs">
                <span>🌐 {collab}</span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      collaborations: content.collaborations.filter((_, i) => i !== idx),
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
              placeholder="e.g. Partner University in Japan, National ICT Division"
              value={newCollab}
              onChange={(e) => setNewCollab(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addCollab} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

