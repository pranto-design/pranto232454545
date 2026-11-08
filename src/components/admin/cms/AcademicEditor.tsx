import { useState } from 'react';
import { Plus, Trash2, Edit3, BookOpen, GraduationCap } from 'lucide-react';
import { AcademicProgramCMS } from '@/types/cms';
import RichTextEditor from './RichTextEditor';
import MediaUploader from './MediaUploader';

interface AcademicEditorProps {
  faculties: string[];
  academicCalendarSummary: string;
  programs: AcademicProgramCMS[];
  onChange: (updated: {
    faculties: string[];
    academicCalendarSummary: string;
    programs: AcademicProgramCMS[];
  }) => void;
}

export default function AcademicEditor({
  faculties,
  academicCalendarSummary,
  programs,
  onChange,
}: AcademicEditorProps) {
  const [newFaculty, setNewFaculty] = useState('');
  const [editingProgram, setEditingProgram] = useState<AcademicProgramCMS | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addFaculty = () => {
    if (!newFaculty.trim()) return;
    onChange({
      faculties: [...faculties, newFaculty.trim()],
      academicCalendarSummary,
      programs,
    });
    setNewFaculty('');
  };

  const removeFaculty = (index: number) => {
    onChange({
      faculties: faculties.filter((_, i) => i !== index),
      academicCalendarSummary,
      programs,
    });
  };

  const handleOpenAddProgram = () => {
    setEditingProgram({
      id: `prog-${Date.now()}`,
      name: '',
      degree: 'BSc',
      facultyName: faculties[0] || 'Faculty of Science & Technology',
      departmentName: 'Computer Science & Engineering',
      durationYears: 4,
      totalCredits: 140,
      tuitionPerCredit: 6500,
      admissionFee: 25000,
      semesterFee: 15000,
      totalTuitionEstimate: 935000,
      degreeLevel: 'Undergraduate',
      scholarshipAvailable: true,
      curriculumSummary: 'Standard 4-year degree curriculum comprising foundation, core, and elective courses.',
    });
    setIsModalOpen(true);
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram || !editingProgram.name) return;

    const existingIdx = programs.findIndex((p) => p.id === editingProgram.id);
    let updatedPrograms = [...programs];
    if (existingIdx >= 0) {
      updatedPrograms[existingIdx] = editingProgram;
    } else {
      updatedPrograms.push(editingProgram);
    }

    onChange({
      faculties,
      academicCalendarSummary,
      programs: updatedPrograms,
    });
    setIsModalOpen(false);
    setEditingProgram(null);
  };

  const handleDeleteProgram = (id: string) => {
    onChange({
      faculties,
      academicCalendarSummary,
      programs: programs.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Faculties List */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <GraduationCap className="text-brand-600" size={18} />
          Faculties & Academic Divisions
        </h2>

        <div className="flex flex-wrap gap-2">
          {faculties.map((f, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-50 text-brand-800 border border-brand-200"
            >
              {f}
              <button
                type="button"
                onClick={() => removeFaculty(idx)}
                className="text-brand-400 hover:text-red-600 transition"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <input
            type="text"
            placeholder="Add new Faculty (e.g. Faculty of Business Administration)"
            value={newFaculty}
            onChange={(e) => setNewFaculty(e.target.value)}
            className="input-field text-xs flex-1"
          />
          <button type="button" onClick={addFaculty} className="btn-secondary !py-2 !px-3 text-xs">
            <Plus size={14} /> Add Faculty
          </button>
        </div>
      </div>

      {/* Academic Calendar Summary */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Academic System & Calendar Overview
        </h2>
        <RichTextEditor
          label="Academic Calendar & Trimester / Semester Policy"
          value={academicCalendarSummary || ''}
          onChange={(val) =>
            onChange({
              faculties,
              academicCalendarSummary: val,
              programs,
            })
          }
          placeholder="Explain terms, credit systems, grading policies, and academic calendar..."
          minHeight="120px"
        />
      </div>

      {/* Degree Programs Management */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-ink-100">
          <div className="flex items-center gap-2">
            <BookOpen className="text-brand-600" size={18} />
            <h2 className="text-base font-bold text-ink-900">Academic Programs ({programs.length})</h2>
          </div>
          <button
            type="button"
            onClick={handleOpenAddProgram}
            className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1"
          >
            <Plus size={14} /> Add Program
          </button>
        </div>

        <div className="space-y-3">
          {programs.map((p) => (
            <div
              key={p.id}
              className="p-3.5 bg-ink-50/70 border border-ink-200 rounded-xl flex items-center justify-between gap-4 hover:bg-white transition"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink-900 text-sm">{p.name}</span>
                  <span className="chip text-[10px] bg-brand-100 text-brand-700 font-bold">
                    {p.degree} • {p.degreeLevel}
                  </span>
                </div>
                <p className="text-xs text-ink-500 mt-0.5">
                  {p.facultyName} • {p.totalCredits} Credits • {p.durationYears} Years
                </p>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                  Est. Total: ৳{p.totalTuitionEstimate?.toLocaleString()} (৳{p.tuitionPerCredit}/cr)
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProgram({ ...p });
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 text-ink-600 hover:text-brand-600 rounded-lg hover:bg-brand-50"
                  title="Edit Program"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProgram(p.id)}
                  className="p-1.5 text-ink-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Delete Program"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}

          {programs.length === 0 && (
            <p className="text-xs text-ink-400 italic py-4 text-center">
              No academic programs created yet. Click "Add Program" above.
            </p>
          )}
        </div>
      </div>

      {/* Program Add/Edit Modal */}
      {isModalOpen && editingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-ink-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <h3 className="text-base font-bold text-ink-900">
                {editingProgram.name ? `Edit ${editingProgram.name}` : 'Add Academic Program'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-ink-400 hover:text-ink-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-ink-700">Program Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProgram.name}
                    onChange={(e) => setEditingProgram({ ...editingProgram, name: e.target.value })}
                    placeholder="e.g. Bachelor of Science in Computer Science and Engineering"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Degree Code / Suffix *</label>
                  <input
                    type="text"
                    required
                    value={editingProgram.degree}
                    onChange={(e) => setEditingProgram({ ...editingProgram, degree: e.target.value })}
                    placeholder="BSc / BBA / MSc"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Degree Level</label>
                  <select
                    value={editingProgram.degreeLevel}
                    onChange={(e) => setEditingProgram({ ...editingProgram, degreeLevel: e.target.value as any })}
                    className="input-field text-xs mt-1"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Faculty Name</label>
                  <input
                    type="text"
                    value={editingProgram.facultyName}
                    onChange={(e) => setEditingProgram({ ...editingProgram, facultyName: e.target.value })}
                    placeholder="Faculty of Engineering"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Duration (Years)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingProgram.durationYears}
                    onChange={(e) => setEditingProgram({ ...editingProgram, durationYears: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Total Credits</label>
                  <input
                    type="number"
                    value={editingProgram.totalCredits}
                    onChange={(e) => {
                      const cr = Number(e.target.value);
                      const total = cr * (editingProgram.tuitionPerCredit || 0) + (editingProgram.admissionFee || 0);
                      setEditingProgram({ ...editingProgram, totalCredits: cr, totalTuitionEstimate: total });
                    }}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Tuition Per Credit (BDT)</label>
                  <input
                    type="number"
                    value={editingProgram.tuitionPerCredit}
                    onChange={(e) => {
                      const perCr = Number(e.target.value);
                      const total = (editingProgram.totalCredits || 0) * perCr + (editingProgram.admissionFee || 0);
                      setEditingProgram({ ...editingProgram, tuitionPerCredit: perCr, totalTuitionEstimate: total });
                    }}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">One-time Admission Fee (BDT)</label>
                  <input
                    type="number"
                    value={editingProgram.admissionFee}
                    onChange={(e) => {
                      const adm = Number(e.target.value);
                      const total = (editingProgram.totalCredits || 0) * (editingProgram.tuitionPerCredit || 0) + adm;
                      setEditingProgram({ ...editingProgram, admissionFee: adm, totalTuitionEstimate: total });
                    }}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Computed Total Tuition (BDT)</label>
                  <input
                    type="number"
                    value={editingProgram.totalTuitionEstimate}
                    onChange={(e) => setEditingProgram({ ...editingProgram, totalTuitionEstimate: Number(e.target.value) })}
                    className="input-field text-xs mt-1 bg-ink-50 font-bold text-brand-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Curriculum & Course Overview</label>
                <textarea
                  rows={3}
                  value={editingProgram.curriculumSummary || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, curriculumSummary: e.target.value })}
                  placeholder="Outline key subject courses, credits distribution, and graduation thesis requirements..."
                  className="input-field text-xs mt-1 resize-y"
                />
              </div>

              <MediaUploader
                label="Curriculum Syllabus PDF Document (Optional)"
                value={editingProgram.curriculumPdfUrl || ''}
                onChange={(url) => setEditingProgram({ ...editingProgram, curriculumPdfUrl: url })}
                accept="pdf"
                folder="curriculum"
                helperText="Upload official course curriculum PDF."
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary !py-2 !px-4 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary !py-2 !px-5 text-xs">
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

