import { useState } from 'react';
import { Plus, Trash2, Calendar, FileText, HelpCircle, CheckCircle2 } from 'lucide-react';
import { AdmissionSectionContent } from '@/types/cms';
import RichTextEditor from './RichTextEditor';
import MediaUploader from './MediaUploader';

interface AdmissionEditorProps {
  content: AdmissionSectionContent;
  onChange: (updated: AdmissionSectionContent) => void;
}

export default function AdmissionEditor({ content, onChange }: AdmissionEditorProps) {
  const [newReq, setNewReq] = useState('');
  const [newElig, setNewElig] = useState('');
  const [newStep, setNewStep] = useState('');
  const [newDoc, setNewDoc] = useState('');
  const [newEvent, setNewEvent] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const addReq = () => {
    if (!newReq.trim()) return;
    onChange({ ...content, requirements: [...(content.requirements || []), newReq.trim()] });
    setNewReq('');
  };

  const addElig = () => {
    if (!newElig.trim()) return;
    onChange({ ...content, eligibilityCriteria: [...(content.eligibilityCriteria || []), newElig.trim()] });
    setNewElig('');
  };

  const addStep = () => {
    if (!newStep.trim()) return;
    onChange({ ...content, applicationProcess: [...(content.applicationProcess || []), newStep.trim()] });
    setNewStep('');
  };

  const addDoc = () => {
    if (!newDoc.trim()) return;
    onChange({ ...content, requiredDocuments: [...(content.requiredDocuments || []), newDoc.trim()] });
    setNewDoc('');
  };

  const addImportantDate = () => {
    if (!newEvent.trim() || !newDate.trim()) return;
    onChange({
      ...content,
      importantDates: [...(content.importantDates || []), { event: newEvent.trim(), date: newDate.trim() }],
    });
    setNewEvent('');
    setNewDate('');
  };

  const addFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    onChange({
      ...content,
      admissionFaqs: [...(content.admissionFaqs || []), { question: newFaqQ.trim(), answer: newFaqA.trim() }],
    });
    setNewFaqQ('');
    setNewFaqA('');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Key Dates & Online Application */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <Calendar className="text-brand-600" size={18} />
          Key Admission Dates & Online Portal
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-ink-700">Application Start Date</label>
            <input
              type="date"
              value={content.applicationStartDate || ''}
              onChange={(e) => onChange({ ...content, applicationStartDate: e.target.value })}
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Application Deadline</label>
            <input
              type="date"
              value={content.applicationDeadline || ''}
              onChange={(e) => onChange({ ...content, applicationDeadline: e.target.value })}
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Online Application URL</label>
            <input
              type="url"
              value={content.onlineApplicationUrl || ''}
              onChange={(e) => onChange({ ...content, onlineApplicationUrl: e.target.value })}
              placeholder="https://admission.university.edu"
              className="input-field text-xs mt-1"
            />
          </div>
        </div>

        {/* Circular PDF Upload */}
        <div className="pt-2">
          <MediaUploader
            label="Upload Official Admission Circular PDF"
            value={content.admissionCircularPdfUrl || ''}
            onChange={(url) => onChange({ ...content, admissionCircularPdfUrl: url })}
            accept="pdf"
            folder="circulars"
            helperText="Official circular document prospective students can download."
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-ink-700">Admission Test Details</label>
          <textarea
            rows={2}
            value={content.admissionTestInfo || ''}
            onChange={(e) => onChange({ ...content, admissionTestInfo: e.target.value })}
            placeholder="Structure of the test (subjects, marks distribution, duration, viva voce)..."
            className="input-field text-xs mt-1 resize-y"
          />
        </div>
      </div>

      {/* Important Dates Table */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Admission Timeline / Important Dates
        </h2>

        <div className="space-y-2">
          {(content.importantDates || []).map((d, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-ink-50 text-xs">
              <div>
                <span className="font-bold text-ink-900">{d.event}</span>
                <span className="ml-3 text-ink-500 font-medium">📅 {d.date}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...content,
                    importantDates: content.importantDates.filter((_, i) => i !== idx),
                  })
                }
                className="text-ink-400 hover:text-red-600"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <input
            type="text"
            placeholder="Event Name (e.g. Admission Test)"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            className="input-field text-xs flex-1"
          />
          <input
            type="text"
            placeholder="Date (e.g. August 22, 2026)"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="input-field text-xs flex-1"
          />
          <button type="button" onClick={addImportantDate} className="btn-secondary !py-2 !px-3 text-xs">
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* Requirements & Eligibility */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Requirements & Eligibility Criteria
        </h2>

        {/* Requirements */}
        <div>
          <label className="text-xs font-semibold text-ink-700">General Admission Requirements</label>
          <div className="space-y-1.5 mt-2">
            {(content.requirements || []).map((r, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-ink-50 text-xs">
                <span>✓ {r}</span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      requirements: content.requirements.filter((_, i) => i !== idx),
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
              placeholder="e.g. Science background with Physics and Math for Engineering"
              value={newReq}
              onChange={(e) => setNewReq(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addReq} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* Eligibility */}
        <div className="pt-2">
          <label className="text-xs font-semibold text-ink-700">Eligibility Criteria (GPA / Grade Thresholds)</label>
          <div className="space-y-1.5 mt-2">
            {(content.eligibilityCriteria || []).map((ec, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-ink-50 text-xs">
                <span>• {ec}</span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      eligibilityCriteria: content.eligibilityCriteria.filter((_, i) => i !== idx),
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
              placeholder="e.g. Minimum GPA 3.00 in SSC and HSC separately"
              value={newElig}
              onChange={(e) => setNewElig(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addElig} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Step by Step Process & Required Documents */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100">
          Application Steps & Required Documents
        </h2>

        {/* Steps */}
        <div>
          <label className="text-xs font-semibold text-ink-700">Step-by-Step Application Process</label>
          <div className="space-y-1.5 mt-2">
            {(content.applicationProcess || []).map((st, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-ink-50 text-xs">
                <span className="font-medium text-ink-800">{st}</span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      applicationProcess: content.applicationProcess.filter((_, i) => i !== idx),
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
              placeholder="e.g. Complete online registration and upload passport size photo"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addStep} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add Step
            </button>
          </div>
        </div>

        {/* Documents */}
        <div className="pt-2">
          <label className="text-xs font-semibold text-ink-700">Required Documents List</label>
          <div className="space-y-1.5 mt-2">
            {(content.requiredDocuments || []).map((doc, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-ink-50 text-xs">
                <span>📄 {doc}</span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...content,
                      requiredDocuments: content.requiredDocuments.filter((_, i) => i !== idx),
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
              placeholder="e.g. 4 copies of passport-sized color photographs"
              value={newDoc}
              onChange={(e) => setNewDoc(e.target.value)}
              className="input-field text-xs flex-1"
            />
            <button type="button" onClick={addDoc} className="btn-secondary !py-1.5 !px-3 text-xs">
              <Plus size={14} /> Add Doc
            </button>
          </div>
        </div>
      </div>

      {/* Admission FAQs */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <HelpCircle className="text-brand-600" size={18} />
          Frequently Asked Questions (Admission FAQs)
        </h2>

        <div className="space-y-3">
          {(content.admissionFaqs || []).map((faq, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-ink-50 border border-ink-200 relative group">
              <p className="font-bold text-ink-900 text-xs pr-6">Q: {faq.question}</p>
              <p className="text-xs text-ink-600 mt-1">A: {faq.answer}</p>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...content,
                    admissionFaqs: content.admissionFaqs.filter((_, i) => i !== idx),
                  })
                }
                className="absolute top-2.5 right-2.5 text-ink-400 hover:text-red-600"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-2">
          <input
            type="text"
            placeholder="FAQ Question (e.g. Can I pay tuition in installments?)"
            value={newFaqQ}
            onChange={(e) => setNewFaqQ(e.target.value)}
            className="input-field text-xs"
          />
          <textarea
            rows={2}
            placeholder="FAQ Answer (e.g. Yes, semester tuition can be cleared in 3 installments...)"
            value={newFaqA}
            onChange={(e) => setNewFaqA(e.target.value)}
            className="input-field text-xs resize-y"
          />
          <button type="button" onClick={addFaq} className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1">
            <Plus size={14} /> Add FAQ Item
          </button>
        </div>
      </div>
    </div>
  );
}

