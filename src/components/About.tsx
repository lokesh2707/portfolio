import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GraduationCard from './about/GraduationCard';
import DeveloperCard from './about/DeveloperCard';
import JourneyCard from './about/JourneyCard';
import TimelineCard from './about/TimelineCard';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const yDelta = isMobile ? 18 : 28;

      // 1. Heading Reveal
      gsap.fromTo(
        '.about-heading',
        { opacity: 0, y: yDelta },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
        }
      );

      // 2. Narrative Intro & Link Reveal
      gsap.fromTo(
        '.about-narrative',
        { opacity: 0, y: yDelta - 8 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.08,
          ease: 'power3.out',
        }
      );

      // 3. Staggered Entrance for Info Cards
      gsap.fromTo(
        '.about-card',
        { opacity: 0, y: yDelta },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            once: true,
          },
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.55,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-24 border-t border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-10">
          <span className="w-5 h-[2px] bg-[#B7F52B] rounded-full" />
          <span>ABOUT ME</span>
        </div>

        {/* Horizontal Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column: Bold Display Headline with Lime Highlight */}
          <div className="lg:col-span-5 about-heading">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight leading-[1.1]">
              A developer who <br />
              enjoys building <br />
              <span className="bg-[#B7F52B] text-black px-2.5 py-0.5 rounded-lg inline-block mt-1">
                real solutions.
              </span>
            </h2>
          </div>

          {/* Middle Column: Detailed Introduction & Link */}
          <div className="lg:col-span-3 flex flex-col justify-between pt-1 about-narrative">
            <p className="text-[var(--text-muted)] text-[14px] leading-relaxed mb-6">
              I’m a Full Stack Developer at Ratnam Solutions Private Limited focused on building scalable,
              high-performance web applications with modern architectures, clean engineering principles, and measurable business impact.
            </p>
            <a
              href="#experience"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text)] hover:text-[#84be39] transition-colors group w-fit"
            >
              <span>More about me</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right Column: 2x2 Information Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 about-cards-grid">
            {/* Card 1: Education */}
            <GraduationCard />

            {/* Card 2: Current Role */}
            <DeveloperCard />

            {/* Card 3: Location */}
            <JourneyCard />

            {/* Card 4: Employment Status */}
            <TimelineCard />
          </div>
        </div>
      </div>
    </section>
  );
}
