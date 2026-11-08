import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, Video, Tag } from 'lucide-react';
import { GalleryItemCMS } from '@/types/cms';
import MediaUploader from './MediaUploader';

interface GalleryEditorProps {
  gallery: GalleryItemCMS[];
  onChange: (updated: GalleryItemCMS[]) => void;
}

export default function GalleryEditor({ gallery, onChange }: GalleryEditorProps) {
  const [filter, setFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItemCMS>>({
    title: '',
    caption: '',
    category: 'Campus',
    mediaType: 'image',
    mediaUrl: '',
  });

  const categories = ['Campus', 'Event', 'Laboratory', 'Classroom', 'Video'];

  const filtered = gallery.filter((g) => filter === 'all' || g.category === filter);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.mediaUrl) return;

    const item: GalleryItemCMS = {
      id: `gal-${Date.now()}`,
      title: newItem.title || '',
      caption: newItem.caption || '',
      category: (newItem.category as any) || 'Campus',
      mediaType: newItem.mediaType || 'image',
      mediaUrl: newItem.mediaUrl,
    };

    onChange([item, ...gallery]);
    setIsModalOpen(false);
    setNewItem({ title: '', caption: '', category: 'Campus', mediaType: 'image', mediaUrl: '' });
  };

  const handleDelete = (id: string) => {
    onChange(gallery.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-ink-100">
          <div>
            <h2 className="text-base font-bold text-ink-900">Campus Gallery & Media ({gallery.length})</h2>
            <p className="text-xs text-ink-500">
              Upload photos and videos categorized into campus views, student events, labs, and classrooms.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5"
          >
            <Plus size={14} /> Add Media
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              filter === 'all' ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
            }`}
          >
            All Media ({gallery.length})
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                filter === c ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-xl overflow-hidden border border-ink-200 bg-ink-100 aspect-video shadow-sm"
            >
              {item.mediaType === 'video' ? (
                <div className="w-full h-full bg-navy-900 flex items-center justify-center text-white p-3 text-center">
                  <Video size={24} className="mb-1" />
                  <p className="text-[10px] truncate max-w-full">{item.title || 'Video Media'}</p>
                </div>
              ) : (
                <img
                  src={item.mediaUrl}
                  alt={item.title || 'Gallery item'}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              )}

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition p-2.5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-bold bg-white/90 text-ink-800 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                    title="Delete item"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div>
                  {item.title && <p className="text-white font-bold text-xs truncate">{item.title}</p>}
                  {item.caption && <p className="text-white/80 text-[10px] truncate">{item.caption}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-xs text-ink-400 italic py-6 text-center">
            No media found for this category. Click "Add Media" above.
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-ink-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <h3 className="text-base font-bold text-ink-900">Add Gallery Media</h3>
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
                <label className="text-xs font-semibold text-ink-700">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                  className="input-field text-xs mt-1"
                >
                  <option value="Campus">Campus</option>
                  <option value="Event">Event</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Video">Video</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Title (Optional)</label>
                <input
                  type="text"
                  value={newItem.title || ''}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g. Modern Physics Laboratory"
                  className="input-field text-xs mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Caption / Description</label>
                <input
                  type="text"
                  value={newItem.caption || ''}
                  onChange={(e) => setNewItem({ ...newItem, caption: e.target.value })}
                  placeholder="e.g. Students conducting optics experiments"
                  className="input-field text-xs mt-1"
                />
              </div>

              <MediaUploader
                label="Upload Image or Paste URL *"
                value={newItem.mediaUrl || ''}
                onChange={(url) => setNewItem({ ...newItem, mediaUrl: url })}
                folder="gallery"
                helperText="Upload campus or event photo."
              />

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-ink-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary !py-2 !px-4 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary !py-2 !px-5 text-xs">
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

