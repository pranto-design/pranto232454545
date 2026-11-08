import { useState } from 'react';
import { Plus, Trash2, Edit3, Building, Mail, Phone, BookOpen } from 'lucide-react';
import { DepartmentCMS } from '@/types/cms';
import MediaUploader from './MediaUploader';

interface DepartmentEditorProps {
  departments: DepartmentCMS[];
  onChange: (updated: DepartmentCMS[]) => void;
}

export default function DepartmentEditor({ departments, onChange }: DepartmentEditorProps) {
  const [editingDept, setEditingDept] = useState<DepartmentCMS | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [researchAreaInput, setResearchAreaInput] = useState('');

  const handleOpenAdd = () => {
    setEditingDept({
      id: `dept-${Date.now()}`,
      name: '',
      facultyName: 'Faculty of Science & Engineering',
      headOfDepartment: '',
      description: '',
      imageUrl: '',
      researchAreas: [],
      contactEmail: '',
      contactPhone: '',
      availableProgramNames: [],
    });
    setResearchAreaInput('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDept || !editingDept.name) return;

    const existingIdx = departments.findIndex((d) => d.id === editingDept.id);
    let list = [...departments];
    if (existingIdx >= 0) {
      list[existingIdx] = editingDept;
    } else {
      list.push(editingDept);
    }

    onChange(list);
    setIsModalOpen(false);
    setEditingDept(null);
  };

  const handleDelete = (id: string) => {
    onChange(departments.filter((d) => d.id !== id));
  };

  const addResearchArea = () => {
    if (!researchAreaInput.trim() || !editingDept) return;
    setEditingDept({
      ...editingDept,
      researchAreas: [...(editingDept.researchAreas || []), researchAreaInput.trim()],
    });
    setResearchAreaInput('');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ink-100">
          <div>
            <h2 className="text-base font-bold text-ink-900">Departments Management ({departments.length})</h2>
            <p className="text-xs text-ink-500">
              Manage departments, department heads, available programs, and specialized research divisions.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5"
          >
            <Plus size={14} /> Add Department
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {departments.map((d) => (
            <div
              key={d.id}
              className="p-4 bg-ink-50/60 border border-ink-200 rounded-2xl flex flex-col justify-between hover:border-brand-300 transition"
            >
              <div>
                <div className="flex items-start gap-3">
                  {d.imageUrl ? (
                    <img
                      src={d.imageUrl}
                      alt={d.name}
                      className="h-12 w-12 rounded-xl object-cover border border-ink-200 shrink-0"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                      <Building size={22} />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-ink-900 text-sm truncate">{d.name}</h3>
                    <p className="text-[11px] text-ink-500 font-medium">{d.facultyName}</p>
                    {d.headOfDepartment && (
                      <p className="text-[11px] text-brand-700 font-semibold mt-0.5">
                        Head: {d.headOfDepartment}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-ink-600 mt-3 line-clamp-2 leading-relaxed">
                  {d.description || 'No description provided.'}
                </p>

                {d.researchAreas && d.researchAreas.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {d.researchAreas.slice(0, 3).map((r, i) => (
                      <span key={i} className="text-[10px] bg-white border border-ink-200 px-2 py-0.5 rounded-md text-ink-600">
                        {r}
                      </span>
                    ))}
                    {d.researchAreas.length > 3 && (
                      <span className="text-[10px] text-ink-400 self-center">+{d.researchAreas.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-ink-200/60 flex items-center justify-between text-xs">
                <span className="text-ink-400 text-[11px]">{d.contactEmail || 'No email specified'}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingDept({ ...d });
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 text-ink-600 hover:text-brand-600 rounded-lg hover:bg-brand-50"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(d.id)}
                    className="p-1.5 text-ink-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {departments.length === 0 && (
          <p className="text-xs text-ink-400 italic py-6 text-center">
            No departments configured yet. Click "Add Department" to start.
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-ink-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <h3 className="text-base font-bold text-ink-900">
                {editingDept.name ? `Edit ${editingDept.name}` : 'Add Department'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-ink-400 hover:text-ink-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-semibold text-ink-700">Department Name *</label>
                <input
                  type="text"
                  required
                  value={editingDept.name}
                  onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                  placeholder="Department of Computer Science and Engineering"
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Affiliated Faculty</label>
                  <input
                    type="text"
                    value={editingDept.facultyName}
                    onChange={(e) => setEditingDept({ ...editingDept, facultyName: e.target.value })}
                    placeholder="Faculty of Engineering"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Head of Department (HOD)</label>
                  <input
                    type="text"
                    value={editingDept.headOfDepartment}
                    onChange={(e) => setEditingDept({ ...editingDept, headOfDepartment: e.target.value })}
                    placeholder="Prof. Dr. M. Rahman"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Contact Email</label>
                  <input
                    type="email"
                    value={editingDept.contactEmail || ''}
                    onChange={(e) => setEditingDept({ ...editingDept, contactEmail: e.target.value })}
                    placeholder="cse@univ.edu.bd"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Contact Phone</label>
                  <input
                    type="tel"
                    value={editingDept.contactPhone || ''}
                    onChange={(e) => setEditingDept({ ...editingDept, contactPhone: e.target.value })}
                    placeholder="+880 2 841 4046"
                    className="input-field text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Department Overview & Description</label>
                <textarea
                  rows={3}
                  value={editingDept.description}
                  onChange={(e) => setEditingDept({ ...editingDept, description: e.target.value })}
                  placeholder="Describe the department, laboratory facilities, and achievements..."
                  className="input-field text-xs mt-1 resize-y"
                />
              </div>

              <MediaUploader
                label="Department Logo or Facility Photo"
                value={editingDept.imageUrl || ''}
                onChange={(url) => setEditingDept({ ...editingDept, imageUrl: url })}
                folder="departments"
                helperText="Upload department building, lab, or banner photo."
              />

              {/* Research Areas */}
              <div>
                <label className="text-xs font-semibold text-ink-700">Research Focus Areas</label>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(editingDept.researchAreas || []).map((ra, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200"
                    >
                      {ra}
                      <button
                        type="button"
                        onClick={() =>
                          setEditingDept({
                            ...editingDept,
                            researchAreas: editingDept.researchAreas.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-brand-400 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="e.g. Artificial Intelligence, Robotics"
                    value={researchAreaInput}
                    onChange={(e) => setResearchAreaInput(e.target.value)}
                    className="input-field text-xs flex-1"
                  />
                  <button type="button" onClick={addResearchArea} className="btn-secondary !py-1.5 !px-3 text-xs">
                    <Plus size={14} /> Add Area
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary !py-2 !px-4 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary !py-2 !px-5 text-xs">
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

