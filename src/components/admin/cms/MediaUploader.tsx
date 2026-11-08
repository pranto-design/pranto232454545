import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Loader2, Link as LinkIcon, Check } from 'lucide-react';
import { universityCmsService } from '@/services/universityCmsService';

interface MediaUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: 'image' | 'pdf' | 'all';
  folder?: string;
  helperText?: string;
}

export default function MediaUploader({
  value,
  onChange,
  label,
  accept = 'image',
  folder = 'media',
  helperText,
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [rawUrl, setRawUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPdf = value?.toLowerCase().endsWith('.pdf') || value?.includes('application/pdf');

  const handleFile = async (file: File) => {
    try {
      setUploading(true);
      const uploadedUrl = await universityCmsService.uploadMedia(file, folder);
      onChange(uploadedUrl);
      setRawUrl(uploadedUrl);
    } catch (err) {
      console.error('File upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-ink-800 uppercase tracking-wider">{label}</label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition"
          >
            <LinkIcon size={12} /> {showUrlInput ? 'Upload File' : 'Paste Direct URL'}
          </button>
        </div>
      )}

      {showUrlInput ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={rawUrl}
            onChange={(e) => setRawUrl(e.target.value)}
            placeholder="https://example.com/asset.jpg or .pdf"
            className="input-field text-xs flex-1"
          />
          <button
            type="button"
            onClick={() => onChange(rawUrl)}
            className="btn-secondary !px-3 !py-1 text-xs shrink-0 flex items-center gap-1"
          >
            <Check size={14} /> Apply
          </button>
        </div>
      ) : value ? (
        <div className="relative border border-ink-200 rounded-xl p-3 bg-white shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {isPdf ? (
              <div className="h-12 w-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
            ) : (
              <img
                src={value}
                alt="Uploaded asset preview"
                className="h-14 w-14 object-cover rounded-lg border border-ink-100 shrink-0 bg-ink-50"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-ink-800 truncate">
                {isPdf ? 'PDF Document Uploaded' : 'Image Attached'}
              </p>
              <p className="text-[10px] text-ink-400 truncate max-w-xs">{value}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium px-2 py-1"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => {
                onChange('');
                setRawUrl('');
              }}
              className="p-1 rounded-lg text-ink-400 hover:text-red-500 hover:bg-red-50 transition"
              title="Remove asset"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
            dragOver ? 'border-brand-500 bg-brand-50/50' : 'border-ink-200 hover:border-brand-400 bg-ink-50/30'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-brand-600 py-2">
              <Loader2 size={24} className="animate-spin" />
              <span className="text-xs font-medium">Uploading to storage...</span>
            </div>
          ) : (
            <>
              <div className="h-10 w-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
                {accept === 'pdf' ? <FileText size={18} /> : <Upload size={18} />}
              </div>
              <div>
                <p className="text-xs font-semibold text-ink-800">
                  Click to upload or drag & drop
                </p>
                <p className="text-[11px] text-ink-400 mt-0.5">
                  {accept === 'pdf' ? 'PDF files up to 10MB' : 'PNG, JPG, WebP or SVG up to 5MB'}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept === 'pdf' ? 'application/pdf' : accept === 'image' ? 'image/*' : 'image/*,application/pdf'}
        onChange={handleFileChange}
        className="hidden"
      />

      {helperText && <p className="text-[11px] text-ink-400">{helperText}</p>}
    </div>
  );
}

