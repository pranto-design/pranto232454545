
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const [userType, setUserType] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        const { data, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (loginError) throw loginError;
        if (!data.user) throw new Error('Login failed. Please try again.');

        // Check whether the user is an Admin or Super Admin.
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .maybeSingle();

        if (roleError) throw roleError;

        if (
          roleData?.role === 'super_admin' ||
          roleData?.role === 'admin'
        ) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        const { data, error: signupError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
              user_type: userType,
              university: university.trim(),
            },
            emailRedirectTo: `${window.location.origin}/login`,
          },
        });

        if (signupError) throw signupError;

        if (data.session) {
          navigate('/', { replace: true });
        } else {
          setMessage(
            'Account created! Please check your email to confirm your account before logging in.'
          );
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Please enter your email address first.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (resetError) throw resetError;

      setMessage(
        'Password recovery email sent. Please check your inbox and spam folder.'
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not send recovery email.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-ink-50 to-brand-50/40">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 flex items-center justify-center text-white">
              <GraduationCap size={24} />
            </div>
            <span className="font-display font-bold text-2xl text-ink-900">
              UniVara
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-ink-900">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>

          <p className="text-sm text-ink-500 mt-1">
            {isLogin
              ? 'Log in to continue to UniVara'
              : 'Join the university community'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'student', label: 'Student' },
                { id: 'alumni', label: 'Alumni' },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setUserType(type.id)}
                  className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${userType === type.id
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-ink-600 border-ink-200 hover:border-brand-300'
                    }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-ink-600 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                />
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input pl-9"
                  placeholder="Your name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-ink-600 mb-1 block">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-9"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-600 mb-1 block">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
              />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-9"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-ink-600 mb-1 block">
                University
              </label>
              <div className="relative">
                <BookOpen
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
                />
                <input
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="input pl-9"
                  placeholder="Your university"
                />
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-ink-600">
                <input type="checkbox" className="rounded text-brand-600" />
                Remember me
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="text-brand-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading
              ? 'Please wait...'
              : isLogin
                ? 'Log in'
                : 'Sign up'}
          </button>

          <p className="text-center text-sm text-ink-500">
            {isLogin
              ? "Don't have an account? "
              : 'Already have an account? '}
            <Link
              to={isLogin ? '/signup' : '/login'}
              className="text-brand-600 hover:underline font-medium"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </Link>
          </p>
        </form>

        {!isLogin && (
          <p className="text-center text-xs text-ink-400 mt-4 flex items-center justify-center gap-1.5">
            <ShieldCheck size={13} />
            Admin accounts are created by the Super Admin.
          </p>
        )}
      </div>
    </div>
  );
}
