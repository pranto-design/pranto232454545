import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Lock } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Password reset is not configured yet. Please contact support.');
      return;
    }
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (sessionData.session) setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) return setError(updateError.message);
    setMessage('Your password has been updated. You can now log in.');
    setPassword('');
    setConfirmPassword('');
    setTimeout(() => navigate('/login', { replace: true }), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink-50 to-brand-50/40 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 flex items-center justify-center text-white"><GraduationCap size={24} /></div>
            <span className="font-display font-bold text-2xl text-ink-900">UniVara</span>
          </Link>
          <h1 className="text-2xl font-bold text-ink-900">Set a new password</h1>
          <p className="text-sm text-ink-500 mt-1">Choose a secure password for your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {!ready && !error && <p className="text-sm text-ink-500 bg-ink-50 p-3 rounded-lg">Open this page from the password recovery link in your email.</p>}
          <div><label className="text-xs font-medium text-ink-600 mb-1 block">New password</label><div className="relative"><Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" /><input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-9" placeholder="At least 6 characters" /></div></div>
          <div><label className="text-xs font-medium text-ink-600 mb-1 block">Confirm password</label><div className="relative"><Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" /><input type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input pl-9" placeholder="Repeat your password" /></div></div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}
          {message && <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{message}</p>}
          <button type="submit" disabled={loading || !ready || !isSupabaseConfigured} className="btn-primary w-full disabled:opacity-60">{loading ? 'Updating...' : 'Update password'}</button>
          <p className="text-center text-sm text-ink-500"><Link to="/login" className="text-brand-600 hover:underline">Back to login</Link></p>
        </form>
      </div>
    </div>
  );
}

