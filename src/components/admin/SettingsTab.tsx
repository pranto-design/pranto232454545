import React, { useState, useEffect } from 'react';
import {
  User, Lock, Mail, Shield, CheckCircle2, AlertCircle, Save
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SettingsTab({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setEmail(data.user.email);
      } else {
        setEmail('admin@univara.com');
      }
    }
    loadUser();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      setMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setMsg({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    try {
      setSaving(true);
      setMsg(null);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setMsg({ type: 'success', text: 'Password successfully updated!' });
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Error updating password' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-ink-900">Admin Account &amp; Settings</h1>
        <p className="text-xs sm:text-sm text-ink-500 mt-0.5">
          Manage your credentials and view account role privileges.
        </p>
      </div>

      {msg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {msg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {msg.text}
        </div>
      )}

      {/* Account Info */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-ink-900 border-b border-ink-100 pb-2">Profile Overview</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-ink-700">Account Email</label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="email"
                disabled
                value={email}
                className="input-field text-xs bg-ink-50 text-ink-600 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Assigned Platform Role</label>
            <div className="mt-1 flex items-center gap-2">
              <span className={`chip-${isSuperAdmin ? 'primary' : 'success'} text-xs font-bold`}>
                <Shield size={12} className="inline mr-1" />
                {isSuperAdmin ? 'Super Administrator' : 'Administrator'}
              </span>
            </div>
            <p className="text-[11px] text-ink-500 mt-1">
              {isSuperAdmin
                ? 'Full system access: Manage all universities, programs, admissions, scholarships, and admin accounts.'
                : 'Restricted access: Manage content and student inquiries only for assigned universities.'}
            </p>
          </div>
        </div>
      </div>

      {/* Password Management */}
      <div className="card p-5 bg-white border border-ink-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-ink-900 border-b border-ink-100 pb-2">Update Password</h3>
        <form onSubmit={handleUpdatePassword} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-ink-700">New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field text-xs mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ink-700">Confirm New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field text-xs mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5 shadow-sm mt-2"
          >
            <Save size={14} />
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

