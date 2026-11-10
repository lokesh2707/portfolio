import { useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import MagneticButton from './MagneticButton';

type HeaderProps = {
  theme: 'light' | 'dark';
  onThemeChange: () => void;
};

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ theme, onThemeChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--bg)]/90 border-b border-[var(--border)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* LP Logo */}
        <a
          href="#hero"
          className="text-2xl font-extrabold tracking-tighter text-[var(--text)] flex items-center group"
          aria-label="Lokesh Prasanth Home"
        >
          <span>LP</span>
          <span className="text-[#B7F52B] inline-block transition-transform group-hover:scale-125">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold tracking-wide text-[var(--text-muted)]">
          {navLinks.map((link) => {
            const isActive = activeNav === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveNav(link.label)}
                className={`relative py-2 transition-colors hover:text-[var(--text)] ${
                  isActive ? 'text-[var(--text)] font-bold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B7F52B] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle + Resume Button */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onThemeChange}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--text)] hover:border-[var(--border-strong)] transition-all shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--lime)]"
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>

          {/* Resume Button */}
          <MagneticButton distance={6} className="hidden sm:inline-block">
            <a
              href="/Lokesh_resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all transform hover:-translate-y-0.5 shadow-sm bg-black text-white dark:bg-[#B7F52B] dark:text-black focus-visible:outline-2 focus-visible:outline-[var(--lime)]"
            >
              <span>Resume</span>
              <ArrowUpRight size={14} />
            </a>
          </MagneticButton>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--lime)]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-b border-[var(--border)] bg-[var(--bg)] px-6 py-6 flex flex-col gap-2 animate-in slide-in-from-top-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveNav(link.label);
                setMobileMenuOpen(false);
              }}
              className="text-base font-semibold text-[var(--text)] hover:text-[#B7F52B] transition-colors py-2.5 flex items-center min-h-[44px]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Lokesh_resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-bold bg-[#B7F52B] text-black shadow-sm min-h-[44px]"
          >
            <span>Download Resume</span>
            <ArrowUpRight size={15} />
          </a>
        </nav>
      )}
    </header>
  );
}
