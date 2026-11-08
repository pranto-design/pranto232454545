import { useState, useEffect } from 'react';
import { Clock, ShieldCheck, RefreshCw, FileText, User, Filter } from 'lucide-react';
import { CMSAuditLog } from '@/types/cms';
import { universityCmsService } from '@/services/universityCmsService';

interface AuditLogsTabProps {
  selectedUniId?: string;
}

export default function AuditLogsTab({ selectedUniId }: AuditLogsTabProps) {
  const [logs, setLogs] = useState<CMSAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await universityCmsService.getAuditLogs();
      setLogs(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [selectedUniId]);

  const filtered = logs.filter((l) => {
    if (filterAction !== 'all' && l.action !== filterAction) return false;
    return true;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'publish':
        return <span className="chip bg-emerald-50 text-emerald-700 font-bold">Published</span>;
      case 'approve':
        return <span className="chip bg-blue-50 text-blue-700 font-bold">Approved</span>;
      case 'submit_review':
        return <span className="chip bg-amber-50 text-amber-700 font-bold">In Review</span>;
      case 'reject':
        return <span className="chip bg-red-50 text-red-700 font-bold">Rejected</span>;
      case 'delete':
        return <span className="chip bg-red-100 text-red-800 font-bold">Deleted</span>;
      case 'duplicate':
        return <span className="chip bg-purple-50 text-purple-700 font-bold">Duplicated</span>;
      case 'update':
      default:
        return <span className="chip bg-ink-100 text-ink-700 font-bold">Updated</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight">
            Activity & CMS Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
            Full compliance audit trail of all university edits, section modifications, reviews, and publishing events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="input-field text-xs py-1.5"
          >
            <option value="all">All Actions</option>
            <option value="update">Updated</option>
            <option value="publish">Published</option>
            <option value="submit_review">Submitted for Review</option>
            <option value="approve">Approved</option>
            <option value="reject">Rejected</option>
            <option value="delete">Deleted</option>
            <option value="duplicate">Duplicated</option>
          </select>

          <button
            type="button"
            onClick={fetchLogs}
            disabled={loading}
            className="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1.5"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      <div className="card bg-white border border-ink-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50/70 text-ink-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Actor Email</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-ink-50/50 transition">
                  <td className="py-3 px-4 text-ink-500 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="py-3 px-4 font-semibold text-ink-800 whitespace-nowrap">
                    {log.entityType}
                  </td>
                  <td className="py-3 px-4 text-ink-600 font-medium whitespace-nowrap">
                    {log.actorEmail || 'admin@univara.com'}
                  </td>
                  <td className="py-3 px-4 text-ink-500 max-w-xs truncate font-mono text-[11px]">
                    {log.changes ? JSON.stringify(log.changes) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-ink-400">
              <Clock size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs">No audit logs matching criteria found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

