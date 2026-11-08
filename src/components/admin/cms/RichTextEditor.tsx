import { useState, useRef, type ChangeEvent } from 'react';
import {
  Bold, Italic, List, ListOrdered, Heading1, Heading2, Link as LinkIcon,
  Code, Undo, Redo, Eye, Edit3
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = 'Write content here...',
  minHeight = '180px',
}: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (prefix: string, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || 'text';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const nextValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(nextValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 10);
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-ink-800 uppercase tracking-wider">{label}</label>
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="text-[11px] font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition"
          >
            {isPreview ? <><Edit3 size={12} /> Edit</> : <><Eye size={12} /> Preview</>}
          </button>
        </div>
      )}

      <div className="border border-ink-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-ink-50/70 border-b border-ink-200 text-ink-700">
          <button
            type="button"
            onClick={() => applyFormat('**', '**')}
            title="Bold"
            className="p-1.5 hover:bg-white hover:text-brand-600 rounded-lg transition text-xs flex items-center"
          >
            <Bold size={14} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('*', '*')}
            title="Italic"
            className="p-1.5 hover:bg-white hover:text-brand-600 rounded-lg transition text-xs flex items-center"
          >
            <Italic size={14} />
          </button>
          <div className="h-4 w-px bg-ink-200 mx-1" />
          <button
            type="button"
            onClick={() => applyFormat('## ')}
            title="Heading 2"
            className="p-1.5 hover:bg-white hover:text-brand-600 rounded-lg transition text-xs flex items-center font-bold"
          >
            <Heading1 size={14} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('### ')}
            title="Heading 3"
            className="p-1.5 hover:bg-white hover:text-brand-600 rounded-lg transition text-xs flex items-center font-semibold"
          >
            <Heading2 size={14} />
          </button>
          <div className="h-4 w-px bg-ink-200 mx-1" />
          <button
            type="button"
            onClick={() => applyFormat('- ')}
            title="Bullet List"
            className="p-1.5 hover:bg-white hover:text-brand-600 rounded-lg transition text-xs flex items-center"
          >
            <List size={14} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('1. ')}
            title="Numbered List"
            className="p-1.5 hover:bg-white hover:text-brand-600 rounded-lg transition text-xs flex items-center"
          >
            <ListOrdered size={14} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('[', '](https://example.com)')}
            title="Hyperlink"
            className="p-1.5 hover:bg-white hover:text-brand-600 rounded-lg transition text-xs flex items-center"
          >
            <LinkIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => applyFormat('`', '`')}
            title="Code/Key"
            className="p-1.5 hover:bg-white hover:text-brand-600 rounded-lg transition text-xs flex items-center"
          >
            <Code size={14} />
          </button>
        </div>

        {/* Content Area */}
        {isPreview ? (
          <div
            style={{ minHeight }}
            className="p-4 prose prose-sm max-w-none text-ink-800 overflow-y-auto leading-relaxed bg-white"
          >
            {value.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) {
                return <h2 key={idx} className="text-lg font-bold text-ink-900 mt-2 mb-1">{line.slice(3)}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={idx} className="text-base font-semibold text-ink-900 mt-2 mb-1">{line.slice(4)}</h3>;
              }
              if (line.startsWith('- ')) {
                return <li key={idx} className="ml-4 list-disc text-sm text-ink-700">{line.slice(2)}</li>;
              }
              if (!line.trim()) {
                return <div key={idx} className="h-2" />;
              }
              return <p key={idx} className="text-sm text-ink-700 my-1">{line}</p>;
            })}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full p-3.5 text-sm text-ink-800 placeholder-ink-400 focus:outline-none resize-y leading-relaxed font-sans"
          />
        )}
      </div>
      <p className="text-[11px] text-ink-400">Supports Markdown formatting (bold, headings, bullet lists, links).</p>
    </div>
  );
}

