import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Menu, X, GraduationCap, Calculator, GitCompare,
  Award, Users, Bell,
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
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { count } = useCompare();

  // Smart Header: Shows when scrolling UP or near top (< 80px), Hides when scrolling DOWN
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;

      setIsScrolled(currentScrollY > 15);

      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else {
        const diff = currentScrollY - lastScrollY.current;
        if (diff < -3) {
          // Scrolling UP -> show header
          setIsVisible(true);
        } else if (diff > 5) {
          // Scrolling DOWN -> hide header
          setIsVisible(false);
        }
      }

      lastScrollY.current = Math.max(0, currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out transform ${
          isVisible || mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-2xl border-b border-emerald-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2'
            : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-3'
        }`}
      >
        <div className="container-page w-full max-w-full">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/25 border border-white/30 group-hover:scale-105 transition-transform">
                <GraduationCap size={20} />
              </div>
              <span className="font-display font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                Uni<span className="text-emerald-600">Vara</span>
              </span>
            </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 backdrop-blur-md shadow-inner">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive(item.to)
                    ? 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90'
                }`}
              >
                {item.icon && <item.icon size={15} className={isActive(item.to) ? 'text-white' : 'text-emerald-600'} />}
                {t(item.label)}
                {item.label === 'nav.compare' && count > 0 && (
                  <span
                    className={`ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-bold ${
                      isActive(item.to) ? 'bg-white text-emerald-700' : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Login / Signup */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <Link
                to="/login"
                className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 px-3.5 py-1.5 rounded-xl transition-all"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/signup"
                className="text-xs sm:text-sm font-semibold text-white px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 active:scale-95 transition-all"
              >
                {t('nav.signup')}
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="xl:hidden flex items-center justify-center h-9 w-9 text-slate-800 hover:bg-slate-100/90 rounded-xl transition-all border border-slate-200/80 active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-3xl shadow-2xl animate-slide-down">
          <div className="container-page py-4 space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive(item.to)
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon && <item.icon size={16} className={isActive(item.to) ? 'text-white' : 'text-emerald-600'} />}
                {t(item.label)}
                {item.label === 'nav.compare' && count > 0 && (
                  <span
                    className={`ml-auto inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full text-[10px] font-bold ${
                      isActive(item.to) ? 'bg-white text-emerald-700' : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 border-t border-slate-200/80 mt-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all"
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all"
              >
                {t('nav.signup')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>

    {/* Spacer so layout doesn't shift under fixed header */}
    <div className="h-16 w-full shrink-0" aria-hidden="true" />
  </>
  );
}
