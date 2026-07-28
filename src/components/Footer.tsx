import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Youtube, Instagram, Mail } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Universities', to: '/universities' },
    { label: 'Programs', to: '/programs' },
    { label: 'Compare', to: '/compare' },
    { label: 'Tuition Calculator', to: '/calculator' },
    { label: 'Admission Hub', to: '/admission' },
    { label: 'Scholarships', to: '/scholarships' },
  ],
  Community: [
    { label: 'Discussions', to: '/community' },
    { label: 'Reviews', to: '/community' },
    { label: 'Ask a Question', to: '/community' },
  ],
  'For Universities': [
    { label: 'Claim Your University', to: '/rep-portal' },
    { label: 'Advertise With Us', to: '/advertise' },
    { label: 'Submit Information', to: '/submit-info' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-ink-300 mt-20">
      <div className="container-page py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white">
                <GraduationCap size={22} />
              </div>
              <span className="font-display font-bold text-xl text-white">UniVara</span>
            </Link>
            <p className="text-sm text-ink-400 max-w-xs leading-relaxed">
              The largest organized private university information and student community platform in Bangladesh. Find, compare, and choose the right university for your future.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Youtube, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-lg bg-navy-800 hover:bg-brand-600 flex items-center justify-center text-ink-400 hover:text-white transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-3">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-ink-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-500">
            © 2026 UniVara. All data is sample/demo content for illustration. Always verify with official university sources.
          </p>
          <p className="text-xs text-ink-500">
            Made for Bangladeshi students with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
