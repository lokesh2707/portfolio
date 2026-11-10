import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-10 border-t border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] text-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Wordmark */}
        <a href="#hero" className="font-extrabold text-lg tracking-tight text-[var(--text)]">
          LP<span className="text-[#B7F52B]">.</span>
        </a>

        {/* Copyright */}
        <p className="font-normal text-center">
          © {new Date().getFullYear()} Lokesh Prasanth. Designed with care. Built to be useful.
        </p>

        {/* Back to top */}
        <a
          href="#hero"
          className="inline-flex items-center gap-1 font-bold text-[var(--text)] hover:text-[#84be39] transition-colors"
        >
          <span>Back to top</span>
          <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}
