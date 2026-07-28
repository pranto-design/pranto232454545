import { useState, useMemo } from 'react';
import { Calculator, Info, RotateCcw, TrendingDown } from 'lucide-react';
import { universities, programs, getOfferingsByUniversity, formatBDTFull } from '@/data/sampleData';

export default function CalculatorPage() {
  const [universityId, setUniversityId] = useState('');
  const [programId, setProgramId] = useState('');
  const [totalCredits, setTotalCredits] = useState(160);
  const [tuitionPerCredit, setTuitionPerCredit] = useState(5000);
  const [admissionFee, setAdmissionFee] = useState(20000);
  const [labFee, setLabFee] = useState(4000);
  const [otherFees, setOtherFees] = useState(3000);
  const [semesterFee, setSemesterFee] = useState(5000);
  const [semesters, setSemesters] = useState(12);
  const [scholarshipPct, setScholarshipPct] = useState(0);

  // Auto-fill from offering
  const autofill = (uniId: string, progId: string) => {
    const offering = getOfferingsByUniversity(uniId).find((o) => o.programId === progId);
    if (offering) {
      setTotalCredits(offering.totalCredits);
      setTuitionPerCredit(offering.tuitionPerCredit);
      setAdmissionFee(offering.admissionFee);
      setLabFee(offering.labFee);
      setOtherFees(offering.otherFees);
      setSemesterFee(offering.semesterFee);
      setSemesters(offering.durationYears * 3);
    }
  };

  const onUniChange = (id: string) => {
    setUniversityId(id);
    if (programId) autofill(id, programId);
  };
  const onProgChange = (id: string) => {
    setProgramId(id);
    if (universityId) autofill(universityId, id);
  };

  const calc = useMemo(() => {
    const baseTuition = totalCredits * tuitionPerCredit;
    const otherFeesTotal = (labFee + otherFees + semesterFee) * semesters;
    const subtotal = baseTuition + admissionFee + otherFeesTotal;
    const scholarshipAmount = (subtotal * scholarshipPct) / 100;
    const total = subtotal - scholarshipAmount;
    const perSemester = total / semesters;
    const perYear = total / (semesters / 3);
    return { baseTuition, otherFeesTotal, subtotal, scholarshipAmount, total, perSemester, perYear };
  }, [totalCredits, tuitionPerCredit, admissionFee, labFee, otherFees, semesterFee, semesters, scholarshipPct]);

  const reset = () => {
    setUniversityId(''); setProgramId(''); setTotalCredits(160); setTuitionPerCredit(5000);
    setAdmissionFee(20000); setLabFee(4000); setOtherFees(3000); setSemesterFee(5000);
    setSemesters(12); setScholarshipPct(0);
  };

  return (
    <div className="container-page py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-ink-900 flex items-center gap-2"><Calculator className="text-brand-600" /> Tuition Fee Calculator</h1>
        <p className="text-ink-500 mt-2">Estimate your total university cost including tuition, fees, and scholarships. All amounts in BDT (৳).</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-ink-900">Your Details</h2>
            <button onClick={reset} className="text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1"><RotateCcw size={13} /> Reset</button>
          </div>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-ink-600 mb-1 block">University</label>
                <select value={universityId} onChange={(e) => onUniChange(e.target.value)} className="input">
                  <option value="">Select university</option>
                  {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-ink-600 mb-1 block">Program</label>
                <select value={programId} onChange={(e) => onProgChange(e.target.value)} className="input">
                  <option value="">Select program</option>
                  {programs.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            {universityId && programId && (
              <p className="text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">✓ Values auto-filled from this university's program data. Adjust as needed.</p>
            )}

            <div className="grid sm:grid-cols-2 gap-3">
              <NumberInput label="Total Credits" value={totalCredits} onChange={setTotalCredits} />
              <NumberInput label="Tuition per Credit (৳)" value={tuitionPerCredit} onChange={setTuitionPerCredit} />
              <NumberInput label="Admission Fee (৳)" value={admissionFee} onChange={setAdmissionFee} />
              <NumberInput label="Lab Fee / Semester (৳)" value={labFee} onChange={setLabFee} />
              <NumberInput label="Other Fees / Semester (৳)" value={otherFees} onChange={setOtherFees} />
              <NumberInput label="Semester Fee (৳)" value={semesterFee} onChange={setSemesterFee} />
              <NumberInput label="Number of Semesters" value={semesters} onChange={setSemesters} />
            </div>

            <div>
              <label className="text-xs font-medium text-ink-600 mb-1 block">
                Scholarship: {scholarshipPct}% {scholarshipPct > 0 && <TrendingDown size={12} className="inline text-emerald-600" />}
              </label>
              <input
                type="range" min={0} max={100} step={5} value={scholarshipPct}
                onChange={(e) => setScholarshipPct(Number(e.target.value))}
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-[10px] text-ink-400 mt-1">
                <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="card p-6 bg-gradient-to-br from-brand-600 to-accent-700 text-white">
            <p className="text-sm text-brand-100">Estimated Total Cost</p>
            <p className="text-4xl font-bold font-display mt-1">{formatBDTFull(calc.total)}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-brand-200 text-xs">Per Semester</p>
                <p className="font-bold">{formatBDTFull(Math.round(calc.perSemester))}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-brand-200 text-xs">Per Year</p>
                <p className="font-bold">{formatBDTFull(Math.round(calc.perYear))}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-3">Cost Breakdown</h3>
            <div className="space-y-2.5 text-sm">
              <Row label="Base Tuition (credits × per credit)" value={formatBDTFull(calc.baseTuition)} />
              <Row label="Admission Fee" value={formatBDTFull(admissionFee)} />
              <Row label="Lab + Other + Semester Fees (total)" value={formatBDTFull(calc.otherFeesTotal)} />
              <div className="border-t border-ink-100 pt-2.5">
                <Row label="Subtotal" value={formatBDTFull(calc.subtotal)} bold />
              </div>
              {scholarshipPct > 0 && (
                <Row label={`Scholarship (${scholarshipPct}%)`} value={`− ${formatBDTFull(calc.scholarshipAmount)}`} className="text-emerald-700" />
              )}
              <div className="border-t border-ink-200 pt-2.5">
                <Row label="Estimated Total" value={formatBDTFull(calc.total)} bold className="text-brand-700 text-base" />
              </div>
            </div>
          </div>

          <div className="card p-4 bg-amber-50/60 border-amber-200">
            <div className="flex items-start gap-2">
              <Info size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-ink-600">
                <strong>Disclaimer:</strong> Fees are estimates and may change. Always verify current fees with the university. This calculator uses sample data for demonstration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-xs font-medium text-ink-600 mb-1 block">{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="input" />
    </div>
  );
}

function Row({ label, value, bold, className = '' }: { label: string; value: string; bold?: boolean; className?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`${bold ? 'font-semibold text-ink-800' : 'text-ink-600'} ${className}`}>{label}</span>
      <span className={`${bold ? 'font-bold' : 'font-medium'} ${className}`}>{value}</span>
    </div>
  );
}
