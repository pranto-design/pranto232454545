import { useState } from 'react';
import { Plus, Trash2, Edit3, CircleDollarSign, Calculator, Percent } from 'lucide-react';
import { ProgramFeeStructure } from '@/types/cms';
import RichTextEditor from './RichTextEditor';

interface TuitionFeesEditorProps {
  generalPolicy: string;
  programFees: ProgramFeeStructure[];
  onChange: (updated: { generalPolicy: string; programFees: ProgramFeeStructure[] }) => void;
}

export default function TuitionFeesEditor({
  generalPolicy,
  programFees,
  onChange,
}: TuitionFeesEditorProps) {
  const [editingFee, setEditingFee] = useState<ProgramFeeStructure | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingFee({
      programId: `prog-fee-${Date.now()}`,
      programName: '',
      admissionFee: 25000,
      perCreditFee: 6500,
      semesterFee: 15000,
      labFee: 3000,
      libraryFee: 2000,
      otherFees: 2500,
      totalCredits: 140,
      totalEstimatedCost: 935000,
      waiverInfo: 'Up to 100% merit waivers for top GPA scorers.',
      scholarshipInfo: 'Sibling waiver, freedom fighter ward waiver, and semester GPA scholarships.',
    });
    setIsModalOpen(true);
  };

  const handleSaveFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFee || !editingFee.programName) return;

    const existingIdx = programFees.findIndex((f) => f.programId === editingFee.programId);
    let list = [...programFees];
    if (existingIdx >= 0) {
      list[existingIdx] = editingFee;
    } else {
      list.push(editingFee);
    }

    onChange({ generalPolicy, programFees: list });
    setIsModalOpen(false);
    setEditingFee(null);
  };

  const handleDelete = (id: string) => {
    onChange({
      generalPolicy,
      programFees: programFees.filter((f) => f.programId !== id),
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* General Policy */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-ink-900 pb-2 border-b border-ink-100 flex items-center gap-2">
          <CircleDollarSign className="text-brand-600" size={18} />
          Tuition & Fee Policy Overview
        </h2>
        <RichTextEditor
          label="Institutional Fee Structure & Payment Guidelines"
          value={generalPolicy || ''}
          onChange={(val) => onChange({ generalPolicy: val, programFees })}
          placeholder="Explain installment plans, per-credit billing rules, refund policies, and deadline penalties..."
          minHeight="120px"
        />
      </div>

      {/* Program Fees Table */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-ink-100">
          <div>
            <h2 className="text-base font-bold text-ink-900">Program Fee Breakdown ({programFees.length})</h2>
            <p className="text-xs text-ink-500">
              Manage admission fees, per-credit rates, lab charges, and scholarships separately for each academic program.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1"
          >
            <Plus size={14} /> Add Program Fee
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-ink-200 text-ink-500 uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">Program Name</th>
                <th className="py-2.5 px-3">Per Credit</th>
                <th className="py-2.5 px-3">Admission Fee</th>
                <th className="py-2.5 px-3">Credits</th>
                <th className="py-2.5 px-3">Est. Total Cost</th>
                <th className="py-2.5 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {programFees.map((f) => (
                <tr key={f.programId} className="hover:bg-ink-50/70 transition">
                  <td className="py-3 px-3 font-bold text-ink-900">
                    {f.programName}
                    {f.waiverInfo && (
                      <p className="text-[10px] text-brand-600 font-normal truncate max-w-xs">{f.waiverInfo}</p>
                    )}
                  </td>
                  <td className="py-3 px-3 text-ink-800 font-semibold">৳{f.perCreditFee?.toLocaleString()}</td>
                  <td className="py-3 px-3 text-ink-600">৳{f.admissionFee?.toLocaleString()}</td>
                  <td className="py-3 px-3 text-ink-600">{f.totalCredits} cr</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">৳{f.totalEstimatedCost?.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingFee({ ...f });
                          setIsModalOpen(true);
                        }}
                        className="p-1 text-ink-500 hover:text-brand-600 rounded"
                        title="Edit Fee"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(f.programId)}
                        className="p-1 text-ink-400 hover:text-red-600 rounded"
                        title="Delete Fee"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {programFees.length === 0 && (
            <p className="text-xs text-ink-400 italic py-6 text-center">
              No program fee structures defined yet. Click "Add Program Fee" above.
            </p>
          )}
        </div>
      </div>

      {/* Modal for Program Fee */}
      {isModalOpen && editingFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-ink-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <h3 className="text-base font-bold text-ink-900">
                {editingFee.programName ? `Edit Fees: ${editingFee.programName}` : 'Add Program Fee Structure'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-ink-400 hover:text-ink-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFee} className="space-y-4 pt-4">
              <div>
                <label className="text-xs font-semibold text-ink-700">Program Name *</label>
                <input
                  type="text"
                  required
                  value={editingFee.programName}
                  onChange={(e) => setEditingFee({ ...editingFee, programName: e.target.value })}
                  placeholder="e.g. B.Sc. in Computer Science and Engineering"
                  className="input-field text-xs mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-ink-700">Tuition Per Credit (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={editingFee.perCreditFee}
                    onChange={(e) => {
                      const perCr = Number(e.target.value);
                      const total = perCr * (editingFee.totalCredits || 0) + (editingFee.admissionFee || 0);
                      setEditingFee({ ...editingFee, perCreditFee: perCr, totalEstimatedCost: total });
                    }}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Total Credits</label>
                  <input
                    type="number"
                    value={editingFee.totalCredits}
                    onChange={(e) => {
                      const cr = Number(e.target.value);
                      const total = (editingFee.perCreditFee || 0) * cr + (editingFee.admissionFee || 0);
                      setEditingFee({ ...editingFee, totalCredits: cr, totalEstimatedCost: total });
                    }}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Admission Fee (One-time)</label>
                  <input
                    type="number"
                    value={editingFee.admissionFee}
                    onChange={(e) => {
                      const adm = Number(e.target.value);
                      const total = (editingFee.perCreditFee || 0) * (editingFee.totalCredits || 0) + adm;
                      setEditingFee({ ...editingFee, admissionFee: adm, totalEstimatedCost: total });
                    }}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Semester Activity Fee</label>
                  <input
                    type="number"
                    value={editingFee.semesterFee}
                    onChange={(e) => setEditingFee({ ...editingFee, semesterFee: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Lab Fee (Per Course/Term)</label>
                  <input
                    type="number"
                    value={editingFee.labFee}
                    onChange={(e) => setEditingFee({ ...editingFee, labFee: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink-700">Library / Development Fee</label>
                  <input
                    type="number"
                    value={editingFee.libraryFee}
                    onChange={(e) => setEditingFee({ ...editingFee, libraryFee: Number(e.target.value) })}
                    className="input-field text-xs mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Total Estimated Cost (BDT)</label>
                <input
                  type="number"
                  value={editingFee.totalEstimatedCost}
                  onChange={(e) => setEditingFee({ ...editingFee, totalEstimatedCost: Number(e.target.value) })}
                  className="input-field text-xs mt-1 bg-ink-50 font-bold text-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Waiver & Discount Information</label>
                <textarea
                  rows={2}
                  value={editingFee.waiverInfo}
                  onChange={(e) => setEditingFee({ ...editingFee, waiverInfo: e.target.value })}
                  placeholder="e.g. 100% waiver for GPA 5.0, 50% for GPA 4.80+"
                  className="input-field text-xs mt-1 resize-y"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink-700">Scholarship Information</label>
                <textarea
                  rows={2}
                  value={editingFee.scholarshipInfo}
                  onChange={(e) => setEditingFee({ ...editingFee, scholarshipInfo: e.target.value })}
                  placeholder="e.g. Semester merit scholarships for top 10% students"
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
                  Save Fee Structure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

