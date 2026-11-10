import { useEffect, useRef } from 'react';
import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import HeroVisual from './HeroVisual';
import MagneticButton from './MagneticButton';

type HeroProps = {
  theme?: 'light' | 'dark';
};

export default function Hero({ theme = 'dark' }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.dataset.heroAnimated = 'true';
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden"
    >
      {/* Subtle Background Ambient Accent (Desktop only) */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#B7F52B]/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (Editorial Typography & Content) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Availability Indicator */}
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-muted)] mb-8 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#B7F52B] shadow-[0_0_8px_#B7F52B]" />
              <span className="tracking-wide">Available for Opportunities</span>
            </div>

            {/* Kinetic Typography: Masked Entrance Line-by-Line */}
            <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-extrabold text-[var(--text)] tracking-tight leading-[0.95] mb-2 select-none">
              <span className="block overflow-hidden py-1">
                <span className="hero-name-line inline-block">Lokesh</span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="hero-name-line inline-block">Prasanth</span>
              </span>
            </h1>

            {/* Lime-green Curved Underline Swoop */}
            <div className="w-48 sm:w-72 -mt-1 mb-6 text-[#B7F52B]" aria-hidden="true">
              <svg viewBox="0 0 240 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full overflow-visible">
                <path
                  ref={underlineRef}
                  d="M4 13C60 17 180 17 236 5"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="260"
                  strokeDashoffset="0"
                />
              </svg>
            </div>

            {/* Full Stack Developer Title with code icon */}
            <div className="hero-subtitle flex items-center gap-2.5 text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight mb-4">
              <span className="text-[#84be39] font-mono text-lg font-black">{`</>`}</span>
              <h2>Full Stack Developer</h2>
            </div>

            {/* Short Introduction */}
            <p className="hero-bio text-[var(--text-muted)] text-base sm:text-lg max-w-lg font-normal leading-relaxed mb-8">
              Building digital products that solve real problems.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <MagneticButton distance={7}>
                <a
                  href="#projects"
                  className="hero-cta inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold tracking-wide transition-[transform,background-color,color] transform hover:-translate-y-0.5 shadow-sm bg-black text-white dark:bg-[#B7F52B] dark:text-black hover:opacity-95"
                >
                  <span>Explore Work</span>
                  <ArrowUpRight size={15} />
                </a>
              </MagneticButton>

              <MagneticButton distance={7}>
                <a
                  href="/Lokesh_resume.pdf"
                  download="Lokesh_Resume.pdf"
                  className="hero-cta inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold tracking-wide border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text)] hover:bg-[var(--bg-subtle)] transition-[transform,background-color,color] shadow-2xs"
                >
                  <span>Resume</span>
                  <Download size={14} />
                </a>
              </MagneticButton>
            </div>

            {/* Social Icons Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[var(--text-muted)]" aria-label="Social links">
              <a
                href="https://github.com/lokesh2707"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="hero-social w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors shadow-2xs focus-visible:outline-2 focus-visible:outline-[var(--lime)]"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/lokesh-prasanth-6784022a7/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="hero-social w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors shadow-2xs focus-visible:outline-2 focus-visible:outline-[var(--lime)]"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X Profile"
                className="hero-social w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors font-bold text-sm shadow-2xs focus-visible:outline-2 focus-visible:outline-[var(--lime)]"
              >
                𝕏
              </a>
              <a
                href="mailto:lokeshsridhara2005@gmail.com"
                aria-label="Send Email"
                className="hero-social w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[var(--border)] bg-[var(--bg-card)] flex items-center justify-center hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors shadow-2xs focus-visible:outline-2 focus-visible:outline-[var(--lime)]"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right Column (Orbital Visual Composition) */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroVisual theme={theme} />
          </div>
        </div>
      </div>
    </section>
  );
}
