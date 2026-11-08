import { useState } from 'react';
import { Plus, Trash2, Edit3, User, Mail, Phone, BookOpen, GraduationCap } from 'lucide-react';
import { FacultyMemberCMS } from '@/types/cms';
import MediaUploader from './MediaUploader';

interface FacultyStaffEditorProps {
  faculty: FacultyMemberCMS[];
  onChange: (updated: FacultyMemberCMS[]) => void;
}

export default function FacultyStaffEditor({ faculty, onChange }: FacultyStaffEditorProps) {
  const [editingMember, setEditingMember] = useState<FacultyMemberCMS | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingMember({
      id: `fac-${Date.now()}`,
      name: '',
      designation: 'Assistant Professor',
      department: 'Computer Science & Engineering',
      photoUrl: '',
      education: 'Ph.D. in Computer Science',
      researchInterests: 'Machine Learning, Artificial Intelligence',
      email: '',
      phone: '',
    });
    setIsModalOpen(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.name) return;

    const existingIdx = faculty.findIndex((f) => f.id === editingMember.id);
    let list = [...faculty];
    if (existingIdx >= 0) {
      list[existingIdx] = editingMember;
    } else {
      list.push(editingMember);
    }

    onChange(list);
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleDelete = (id: string) => {
    onChange(faculty.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ink-100">
          <div>
            <h2 className="text-base font-bold text-ink-900">Faculty & Staff Profiles ({faculty.length})</h2>
            <p className="text-xs text-ink-500">
              Manage professors, lecturers, deans, educational qualifications, research interests, and contacts.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5"
          >
            <Plus size={14} /> Add Faculty Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {faculty.map((f) => (
            <div
              key={f.id}
              className="p-4 bg-ink-50/70 border border-ink-200 rounded-2xl flex items-start gap-3 hover:border-brand-300 transition"
            >
              {f.photoUrl ? (
                <img
                  src={f.photoUrl}
                  alt={f.name}
                  className="h-16 w-16 rounded-xl object-cover border border-ink-200 shrink-0 bg-white"
                />
              ) : (
                <div className="h-16 w-16 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                  <User size={28} />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-ink-900 text-sm truncate">{f.name}</h3>
                    <p className="text-xs font-semibold text-brand-700">{f.designation}</p>
                    <p className="text-[11px] text-ink-500 truncate">{f.department}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMember({ ...f });
                        setIsModalOpen(true);
                      }}
                      className="p-1 text-ink-400 hover:text-brand-600 rounded"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(f.id)}
                      className="p-1 text-ink-400 hover:text-red-600 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {f.education && (
                  <p className="text-[11px] text-ink-600 mt-1.5 line-clamp-1">
                    🎓 {f.education}
                  </p>
                )}
                {f.researchInterests && (
                  <p className="text-[10px] text-ink-500 line-clamp-1 mt-0.5">
                    🔬 {f.researchInterests}
                  </p>
                )}
                {f.email && (
                  <p className="text-[10px] text-brand-600 font-medium truncate mt-1">
                    ✉ {f.email}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {faculty.length === 0 && (
          <p className="text-xs text-ink-400 italic py-6 text-center">
            No faculty profiles added yet. Click "Add Faculty Profile" above.
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-ink-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <h3 className="text-base font-bold text-ink-900">
                {editingMember.name ? `Edit ${editingMember.name}` : 'Add Faculty Profile'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-ink-400 hover:text-ink-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-semibold text-ink-700">Full Name & Title *</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  placeholder="Prof. Dr. Tariqul Islam"
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Designation / Role *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.designation}
                    onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                    placeholder="Professor & Dean / Lecturer"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Department</label>
                  <input
                    type="text"
                    value={editingMember.department}
                    onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                    placeholder="Computer Science & Engineering"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Official Email</label>
                  <input
                    type="email"
                    value={editingMember.email}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    placeholder="teacher@univ.edu.bd"
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Contact Phone (Optional)</label>
                  <input
                    type="tel"
                    value={editingMember.phone || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="input-field text-xs mt-1"
                  />
                </div>
              </div>

              <MediaUploader
                label="Faculty Profile Photo"
                value={editingMember.photoUrl || ''}
                onChange={(url) => setEditingMember({ ...editingMember, photoUrl: url })}
                folder="faculty"
                helperText="Square portrait photo (1:1 ratio)."
              />

              <div>
                <label className="text-xs font-semibold text-ink-700">Educational Background</label>
                <textarea
                  rows={2}
                  value={editingMember.education}
                  onChange={(e) => setEditingMember({ ...editingMember, education: e.target.value })}
                  placeholder="e.g. Ph.D. in Computer Science (Univ. of Tokyo), M.Sc. (BUET)"
                  className="input-field text-xs mt-1 resize-y"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Research Interests</label>
                <textarea
                  rows={2}
                  value={editingMember.researchInterests}
                  onChange={(e) => setEditingMember({ ...editingMember, researchInterests: e.target.value })}
                  placeholder="e.g. Deep Learning, Natural Language Processing, Cyber Security"
                  className="input-field text-xs mt-1 resize-y"
                />
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
                  Save Faculty Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

