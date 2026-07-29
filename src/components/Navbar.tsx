import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Menu, X, GraduationCap, Calculator, GitCompare,
  Award, Users, Bell, ChevronDown,
} from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { useLanguage } from '@/context/LanguageContext';

const navItems = [
  { label: 'nav.universities', to: '/universities' },
  { label: 'nav.programs', to: '/programs' },
  { label: 'nav.compare', to: '/compare', icon: GitCompare },
  { label: 'nav.calculator', to: '/calculator', icon: Calculator },
  { label: 'nav.admission', to: '/admission', icon: Bell },
  { label: 'nav.scholarships', to: '/scholarships', icon: Award },
  { label: 'nav.community', to: '/community', icon: Users },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
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
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link flex items-center gap-1.5 ${isActive(item.to) ? 'nav-link-active' : ''}`}
              >
                {item.icon && <item.icon size={15} />}
                {t(item.label)}
                {item.label === 'nav.compare' && count > 0 && (
                  <span className="ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-brand-600 text-white text-[10px] font-bold">
                    {count}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center rounded-lg border border-ink-200 overflow-hidden text-[10px] sm:text-xs font-medium">
              <button
                onClick={() => {
                  setLang('en');
                  console.log('Language set to English');
                }}
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 transition-colors ${lang === 'en' ? 'bg-brand-600 text-white' : 'text-ink-600 hover:bg-ink-100'}`}
              >
                English
              </button>
              <span className="text-ink-300">|</span>
              <button
                onClick={() => {
                  setLang('bn');
                  console.log('Language set to Bengali');
                }}
                className={`px-2 py-1 sm:px-2.5 sm:py-1.5 transition-colors ${lang === 'bn' ? 'bg-brand-600 text-white' : 'text-ink-600 hover:bg-ink-100'}`}
              >
                বাংলা
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link to="/login" className="btn-ghost text-xs sm:text-sm whitespace-nowrap">{t('nav.login')}</Link>
              <Link to="/signup" className="btn-primary text-xs sm:text-sm whitespace-nowrap">{t('nav.signup')}</Link>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="xl:hidden btn-ghost px-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-ink-200 bg-ink-50 animate-slide-down">
          <div className="container-page py-4 space-y-1">
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
                {t(item.label)}
                {item.label === 'nav.compare' && count > 0 && (
                  <span className="ml-auto inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-brand-600 text-white text-[10px] font-bold">
                    {count}
                  </span>
                )}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 border-t border-ink-200 mt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1">{t('nav.login')}</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-primary flex-1">{t('nav.signup')}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
