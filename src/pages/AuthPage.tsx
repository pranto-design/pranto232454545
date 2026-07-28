import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, BookOpen, Calendar, ShieldCheck } from 'lucide-react';

export default function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const [userType, setUserType] = useState('student');
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-ink-50 to-brand-50/40">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 flex items-center justify-center text-white">
              <GraduationCap size={24} />
            </div>
            <span className="font-display font-bold text-2xl text-ink-900">UniVara</span>
          </Link>
          <h1 className="text-2xl font-bold text-ink-900">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
          <p className="text-sm text-ink-500 mt-1">{isLogin ? 'Log in to continue to UniVara' : 'Join the largest private university community in Bangladesh'}</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'student', label: 'Student' },
                { id: 'alumni', label: 'Alumni' },
                { id: 'rep', label: 'Rep' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setUserType(t.id)}
                  className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                    userType === t.id ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-ink-600 border-ink-200 hover:border-brand-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-ink-600 mb-1 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                <input required className="input pl-9" placeholder="Your name" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-ink-600 mb-1 block">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input type="email" required className="input pl-9" placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-ink-600 mb-1 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input type="password" required className="input pl-9" placeholder="••••••••" />
            </div>
          </div>

          {!isLogin && userType !== 'rep' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-ink-600 mb-1 block">University</label>
                <div className="relative">
                  <BookOpen size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input className="input pl-9" placeholder="University" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-ink-600 mb-1 block">Graduation Year</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
                  <input type="number" className="input pl-9" placeholder="2027" />
                </div>
              </div>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-ink-600"><input type="checkbox" className="rounded text-brand-600" /> Remember me</label>
              <a href="#" className="text-brand-600 hover:underline">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="btn-primary w-full">
            {isLogin ? 'Log in' : 'Sign up'}
          </button>

          <p className="text-center text-sm text-ink-500">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link to={isLogin ? '/signup' : '/login'} className="text-brand-600 hover:underline font-medium">
              {isLogin ? 'Sign up' : 'Log in'}
            </Link>
          </p>
        </form>

        {!isLogin && (
          <p className="text-center text-xs text-ink-400 mt-4 flex items-center justify-center gap-1.5">
            <ShieldCheck size={13} /> University representatives require admin verification.
          </p>
        )}
      </div>
    </div>
  );
}
