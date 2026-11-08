import { useState } from 'react';
import { Palette, Eye, EyeOff, MoveUp, MoveDown, Layout, Type } from 'lucide-react';
import { WebsiteDesignSettings } from '@/types/cms';

interface DesignSettingsEditorProps {
  settings: WebsiteDesignSettings;
  onChange: (updated: WebsiteDesignSettings) => void;
}

export default function DesignSettingsEditor({ settings, onChange }: DesignSettingsEditorProps) {
  const sectionLabels: Record<keyof WebsiteDesignSettings['sectionVisibility'], string> = {
    hero: 'Hero & Announcements Banner',
    about: 'About University, Mission & Leadership',
    academics: 'Academic Programs & Curriculum',
    departments: 'Departments & Faculties Directory',
    admission: 'Admission Requirements & Timeline',
    tuition: 'Tuition Fees & Calculator Breakdown',
    campus: 'Campus & Facilities Showcase',
    faculty: 'Faculty & Professors Profiles',
    research: 'Research Centers & Projects',
    studentLife: 'Student Life, Clubs & Sports',
    notices: 'Notices, Circulars & Announcements',
    gallery: 'Campus Photos & Video Gallery',
    contact: 'Contact Information & Inquiry Desk',
  };

  const toggleVisibility = (key: keyof WebsiteDesignSettings['sectionVisibility']) => {
    onChange({
      ...settings,
      sectionVisibility: {
        ...settings.sectionVisibility,
        [key]: !settings.sectionVisibility[key],
      },
    });
  };

  const moveSection = (idx: number, direction: 'up' | 'down') => {
    const list = [...settings.sectionOrder];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;

    onChange({ ...settings, sectionOrder: list });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Branding Colors */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Palette className="text-brand-600" size={18} />
          Theme Colors & Accents
        </h2>
        <p className="text-xs text-ink-500">
          Customize the university's signature branding colors. These colors will highlight buttons, cards, headers and badges while remaining 100% harmonized with the UniVara design system.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Primary Brand Color</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={settings.primaryColor || '#0284c7'}
                onChange={(e) => onChange({ ...settings, primaryColor: e.target.value })}
                className="h-9 w-9 rounded-lg border border-ink-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={settings.primaryColor || '#0284c7'}
                onChange={(e) => onChange({ ...settings, primaryColor: e.target.value })}
                className="input-field text-xs uppercase"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Secondary Accent Color</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={settings.secondaryColor || '#4f46e5'}
                onChange={(e) => onChange({ ...settings, secondaryColor: e.target.value })}
                className="h-9 w-9 rounded-lg border border-ink-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={settings.secondaryColor || '#4f46e5'}
                onChange={(e) => onChange({ ...settings, secondaryColor: e.target.value })}
                className="input-field text-xs uppercase"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Highlight / Badge Color</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={settings.accentColor || '#10b981'}
                onChange={(e) => onChange({ ...settings, accentColor: e.target.value })}
                className="h-9 w-9 rounded-lg border border-ink-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={settings.accentColor || '#10b981'}
                onChange={(e) => onChange({ ...settings, accentColor: e.target.value })}
                className="input-field text-xs uppercase"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Swatch */}
        <div className="mt-3 p-4 rounded-xl border border-ink-200 bg-ink-50/50 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold text-ink-700">Live Component Preview:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              style={{ backgroundColor: settings.primaryColor }}
              className="text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm"
            >
              Apply Online
            </button>
            <span
              style={{ backgroundColor: `${settings.primaryColor}15`, color: settings.primaryColor }}
              className="text-xs font-bold px-2.5 py-1 rounded-full border border-current"
            >
              UGC Accredited
            </span>
            <span
              style={{ backgroundColor: `${settings.accentColor}20`, color: settings.accentColor }}
              className="text-xs font-bold px-2.5 py-1 rounded-full"
            >
              Tuition 100% Waiver
            </span>
          </div>
        </div>
      </div>

      {/* Typography & Layout Styles */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Layout className="text-brand-600" size={18} />
          Layout Styles & Typography
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Hero Section Layout</label>
            <select
              value={settings.heroLayout || 'banner_carousel'}
              onChange={(e) => onChange({ ...settings, heroLayout: e.target.value as any })}
              className="input-field text-xs mt-1"
            >
              <option value="banner_carousel">Banner Slideshow Carousel</option>
              <option value="centered_card">Centered Institutional Card</option>
              <option value="split_image">Split Image & Intro Grid</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Display Typography Font</label>
            <select
              value={settings.fontFamily || 'Inter'}
              onChange={(e) => onChange({ ...settings, fontFamily: e.target.value as any })}
              className="input-field text-xs mt-1"
            >
              <option value="Inter">Inter (Clean Modern SaaS)</option>
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Prestigious)</option>
              <option value="Poppins">Poppins (Friendly Geometric)</option>
              <option value="Roboto">Roboto (Classic Academic)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Footer Component Style</label>
            <select
              value={settings.footerStyle || 'detailed'}
              onChange={(e) => onChange({ ...settings, footerStyle: e.target.value as any })}
              className="input-field text-xs mt-1"
            >
              <option value="detailed">Detailed Multi-Column University Footer</option>
              <option value="minimal">Minimal Compact Footer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section Ordering & Visibility Controls */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Eye className="text-brand-600" size={18} />
          Section Visibility & Display Ordering
        </h2>
        <p className="text-xs text-ink-500">
          Control which sections appear on the public university profile and adjust their vertical presentation order.
        </p>

        <div className="space-y-2">
          {settings.sectionOrder.map((secKey, idx) => {
            const isVisible = settings.sectionVisibility[secKey as keyof WebsiteDesignSettings['sectionVisibility']] ?? true;
            const label = sectionLabels[secKey as keyof WebsiteDesignSettings['sectionVisibility']] || secKey;

            return (
              <div
                key={secKey}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                  isVisible ? 'bg-white border-ink-200 shadow-sm' : 'bg-ink-100/60 border-ink-200 text-ink-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-ink-400 w-5">{idx + 1}.</span>
                  <span className={`text-xs font-bold ${isVisible ? 'text-ink-800' : 'text-ink-400 line-through'}`}>
                    {label}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleVisibility(secKey as any)}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                      isVisible ? 'text-brand-700 bg-brand-50 hover:bg-brand-100' : 'text-ink-500 bg-ink-200 hover:bg-ink-300'
                    }`}
                    title={isVisible ? 'Hide section' : 'Show section'}
                  >
                    {isVisible ? <Eye size={13} /> : <EyeOff size={13} />}
                    <span className="hidden sm:inline">{isVisible ? 'Visible' : 'Hidden'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveSection(idx, 'up')}
                    className="p-1.5 rounded-lg text-ink-500 hover:text-ink-800 hover:bg-ink-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Up"
                  >
                    <MoveUp size={14} />
                  </button>

                  <button
                    type="button"
                    disabled={idx === settings.sectionOrder.length - 1}
                    onClick={() => moveSection(idx, 'down')}
                    className="p-1.5 rounded-lg text-ink-500 hover:text-ink-800 hover:bg-ink-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Down"
                  >
                    <MoveDown size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

