import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Menu, X, GraduationCap, Calculator, GitCompare,
  Award, Users, Bell, ChevronDown,
} from 'lucide-react';
import { useCompare } from '@/context/CompareContext';

const navItems = [
  { label: 'Universities', to: '/universities' },
  { label: 'Programs', to: '/programs' },
  { label: 'Compare', to: '/compare', icon: GitCompare },
  { label: 'Calculator', to: '/calculator', icon: Calculator },
  { label: 'Admission', to: '/admission', icon: Bell },
  { label: 'Scholarships', to: '/scholarships', icon: Award },
  { label: 'Community', to: '/community', icon: Users },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { count } = useCompare();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMobileOpen(false);
    }
  };

  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <header className="sticky top-0 z-50 bg-ink-50/90 backdrop-blur-lg border-b border-ink-200/70">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 flex items-center justify-center text-white">
              <GraduationCap size={20} />
            </div>
            <span className="font-display font-bold text-lg text-ink-900 hidden sm:block">UniVara</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link flex items-center gap-1.5 ${isActive(item.to) ? 'nav-link-active' : ''}`}
              >
                {item.icon && <item.icon size={15} />}
                {item.label}
                {item.label === 'Compare' && count > 0 && (
                  <span className="ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-brand-600 text-white text-[10px] font-bold">
                    {count}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Search size={16} className="absolute left-3 text-ink-400 pointer-events-none" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-40 lg:w-56 rounded-xl border border-ink-200 bg-ink-50/50 pl-9 pr-3 py-2 text-sm focus:bg-white focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none transition"
              />
            </form>

            {/* Language switcher */}
            <div className="hidden sm:flex items-center rounded-lg border border-ink-200 overflow-hidden text-xs font-medium">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1.5 ${lang === 'en' ? 'bg-brand-600 text-white' : 'text-ink-600 hover:bg-ink-100'}`}
              >
                English
              </button>
              <span className="text-ink-300">|</span>
              <button
                onClick={() => setLang('bn')}
                className={`px-2.5 py-1.5 ${lang === 'bn' ? 'bg-brand-600 text-white' : 'text-ink-600 hover:bg-ink-100'}`}
              >
                বাংলা
              </button>
            </div>

            <Link to="/login" className="btn-ghost hidden sm:inline-flex text-sm">Log in</Link>
            <Link to="/signup" className="btn-primary hidden sm:inline-flex text-sm">Sign up</Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden btn-ghost px-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-ink-200 bg-ink-50 animate-slide-down">
          <div className="container-page py-4 space-y-1">
            <form onSubmit={handleSearch} className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search universities, programs..."
                className="input pl-9"
              />
            </form>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(item.to) ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-100'
                }`}
              >
                {item.icon && <item.icon size={16} />}
                {item.label}
                {item.label === 'Compare' && count > 0 && (
                  <span className="ml-auto inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-brand-600 text-white text-[10px] font-bold">
                    {count}
                  </span>
                )}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 border-t border-ink-200 mt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1">Log in</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-primary flex-1">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
