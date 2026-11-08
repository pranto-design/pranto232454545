import { useState } from 'react';
import { Plus, Trash2, Edit3, Bell, Pin, FileText, Calendar } from 'lucide-react';
import { UniversityNoticeCMS } from '@/types/cms';
import MediaUploader from './MediaUploader';

interface NoticesEditorProps {
  notices: UniversityNoticeCMS[];
  onChange: (updated: UniversityNoticeCMS[]) => void;
}

export default function NoticesEditor({ notices, onChange }: NoticesEditorProps) {
  const [editingNotice, setEditingNotice] = useState<UniversityNoticeCMS | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingNotice({
      id: `not-${Date.now()}`,
      title: '',
      category: 'Admission',
      content: '',
      fileUrl: '',
      publishDate: new Date().toISOString().split('T')[0],
      isPinned: false,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice || !editingNotice.title) return;

    const existingIdx = notices.findIndex((n) => n.id === editingNotice.id);
    let list = [...notices];
    if (existingIdx >= 0) {
      list[existingIdx] = editingNotice;
    } else {
      list.unshift(editingNotice);
    }

    onChange(list);
    setIsModalOpen(false);
    setEditingNotice(null);
  };

  const handleDelete = (id: string) => {
    onChange(notices.filter((n) => n.id !== id));
  };

  const togglePin = (id: string) => {
    onChange(
      notices.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ink-100">
          <div>
            <h2 className="text-base font-bold text-ink-900">Notices, Circulars & Announcements ({notices.length})</h2>
            <p className="text-xs text-ink-500">
              Publish official academic, admission, examination notices, and upload PDF circular attachments.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5"
          >
            <Plus size={14} /> Publish Notice
          </button>
        </div>

        <div className="space-y-3">
          {notices.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 ${
                n.isPinned ? 'bg-amber-50/50 border-amber-200' : 'bg-ink-50/50 border-ink-200 hover:bg-white'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {n.isPinned && (
                    <span className="chip text-[10px] bg-amber-100 text-amber-800 font-bold flex items-center gap-1">
                      <Pin size={10} /> Pinned
                    </span>
                  )}
                  <span className="chip text-[10px] bg-brand-100 text-brand-800 font-bold">
                    {n.category}
                  </span>
                  <span className="text-[11px] text-ink-400">📅 {n.publishDate}</span>
                </div>

                <h3 className="font-bold text-ink-900 text-sm mt-1.5">{n.title}</h3>
                {n.content && (
                  <p className="text-xs text-ink-600 mt-1 line-clamp-2 leading-relaxed">{n.content}</p>
                )}

                {n.fileUrl && (
                  <div className="mt-2">
                    <a
                      href={n.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline font-medium"
                    >
                      <FileText size={13} /> View Attached PDF Document
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => togglePin(n.id)}
                  className={`p-1.5 rounded-lg transition ${
                    n.isPinned ? 'text-amber-600 bg-amber-100' : 'text-ink-400 hover:text-amber-600'
                  }`}
                  title={n.isPinned ? 'Unpin Notice' : 'Pin to Top'}
                >
                  <Pin size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingNotice({ ...n });
                    setIsModalOpen(true);
                  }}
                  className="p-1.5 text-ink-500 hover:text-brand-600 rounded-lg hover:bg-brand-50"
                  title="Edit Notice"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(n.id)}
                  className="p-1.5 text-ink-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Delete Notice"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {notices.length === 0 && (
            <p className="text-xs text-ink-400 italic py-6 text-center">
              No notices published yet. Click "Publish Notice" above.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-ink-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <h3 className="text-base font-bold text-ink-900">
                {editingNotice.title ? 'Edit Notice' : 'Publish Notice'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-ink-400 hover:text-ink-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-semibold text-ink-700">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={editingNotice.title}
                  onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  placeholder="e.g. Undergraduate Admission Circular for Fall 2026 Semester"
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Category</label>
                  <select
                    value={editingNotice.category}
                    onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value as any })}
                    className="input-field text-xs mt-1"
                  >
                    <option value="Admission">Admission</option>
                    <option value="Academic">Academic</option>
                    <option value="Exam">Exam</option>
                    <option value="General">General</option>
                    <option value="Events">Events</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Publish Date</label>
                  <input
                    type="date"
                    value={editingNotice.publishDate}
                    onChange={(e) => setEditingNotice({ ...editingNotice, publishDate: e.target.value })}
                    className="input-field text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Notice Content / Instructions</label>
                <textarea
                  rows={4}
                  value={editingNotice.content}
                  onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                  placeholder="Full text of the notice, guidelines, and instructions..."
                  className="input-field text-xs mt-1 resize-y"
                />
              </div>

              <MediaUploader
                label="Official Document / Circular PDF"
                value={editingNotice.fileUrl || ''}
                onChange={(url) => setEditingNotice({ ...editingNotice, fileUrl: url })}
                accept="pdf"
                folder="notices"
                helperText="Attach downloadable PDF for students."
              />

              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-ink-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingNotice.isPinned}
                    onChange={(e) => setEditingNotice({ ...editingNotice, isPinned: e.target.checked })}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Pin this notice to top of notices list</span>
                </label>
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
                  Save Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

