import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: JSX.Element;
  glowColor: string;
  borderColor: string;
}

const skills: Skill[] = [
  {
    name: 'React',
    glowColor: 'rgba(0, 216, 254, 0.32)',
    borderColor: 'rgba(0, 216, 254, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#00D8FE] react-atom" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" className="react-nucleus" />
        <g stroke="currentColor" strokeWidth="1" fill="none" className="react-orbits">
          <ellipse rx="11" ry="4.2" className="react-orbit-1" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" className="react-orbit-2" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" className="react-orbit-3" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    glowColor: 'rgba(255, 255, 255, 0.28)',
    borderColor: 'rgba(255, 255, 255, 0.45)',
    icon: (
      <svg className="w-9 h-9 next-icon" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="88" fill="#000000" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="4" />
        <mask id="next_logo_mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="white" />
        </mask>
        <g mask="url(#next_logo_mask)">
          <path
            d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z"
            fill="url(#next_logo_grad)"
          />
          <rect x="115" y="54" width="12" height="72" fill="url(#next_logo_rect_grad)" />
        </g>
        <defs>
          <linearGradient id="next_logo_grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="next_logo_rect_grad" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    glowColor: 'rgba(83, 158, 67, 0.32)',
    borderColor: 'rgba(83, 158, 67, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#539E43] node-hex" viewBox="0 0 32 32" fill="currentColor">
        <path className="node-hex-outer" d="M16 2.4l12.4 7.2v14.4L16 31.2 3.6 24V9.6L16 2.4m0 2.8L5.6 10.8v11.8L16 28.4l10.4-5.8V10.8L16 5.2z" />
        <path className="node-hex-inner" d="M16 9.4a6.6 6.6 0 100 13.2 6.6 6.6 0 000-13.2z" />
      </svg>
    ),
  },
  {
    name: 'Java',
    glowColor: 'rgba(231, 111, 0, 0.32)',
    borderColor: 'rgba(231, 111, 0, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#E76F00] java-cup" viewBox="0 0 32 32" fill="currentColor">
        <path className="java-steam-1" d="M12.4 22.8c-2.4-.2-4.1-.7-4.1-.7s1.3.9 3.9 1.1c2.8.2 6.8.1 9.4-.8 0 0-1.4.5-4.4.6-1.7 0-3.3-.1-4.8-.2z" />
        <path className="java-steam-2" d="M11.6 20.2c-2.9-.3-5-.8-5-.8s1.6 1 4.7 1.3c3.4.3 8.2.1 11.4-.9 0 0-1.7.6-5.4.7-2.1 0-4-.1-5.7-.3z" />
        <path className="java-spark" d="M18.8 15.6c1.6 1.8.4 3.4.4 3.4s2.8-1.5 1.5-3.8c-1.3-2.1-4.7-3.2-4.7-3.2s2.6.8 2.8 3.6z" />
        <path className="java-base" d="M22.5 24.9c-6.8 1.8-15.5.3-15.5.3s2.3 1.2 7.7 1.4c6.7.2 12.8-1 12.8-1s-1.8.8-5 1.2z" />
      </svg>
    ),
  },
  {
    name: 'Spring Boot',
    glowColor: 'rgba(109, 179, 63, 0.32)',
    borderColor: 'rgba(109, 179, 63, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#6DB33F] spring-icon" viewBox="0 0 32 32" fill="currentColor">
        <path d="M28.3 14.1c-.8-5.7-5.4-9.9-11-9.9-6.3 0-11.4 5.2-11.4 11.5 0 2.6.9 5.1 2.5 7L5 26.1c-.4.4-.1 1.1.5 1.1h15.2c5.9 0 10.7-4.8 10.7-10.7 0-.8-.1-1.6-.3-2.4zm-9 9.3h-7.6c-.6 0-.9-.7-.5-1.1l2.5-2.8c-1.1-1.2-1.7-2.8-1.7-4.4 0-3.7 3-6.7 6.7-6.7s6.7 3 6.7 6.7-2.7 8.3-6.1 8.3z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    glowColor: 'rgba(19, 170, 82, 0.32)',
    borderColor: 'rgba(19, 170, 82, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#13AA52] mongo-leaf" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 1.5s-6.8 5.7-6.8 14.2c0 6.6 4.6 11.8 6.4 13.5.3.3.7.3.9 0 1.8-1.7 6.4-6.9 6.4-13.5 0-8.5-6.9-14.2-6.9-14.2zM15.4 28c-.2 0-.3-.1-.3-.3V17.8c0-.2.1-.4.3-.4s.3.2.3.4v9.9c0 .2-.1.3-.3.3zm1.2-12.8c0-.2-.1-.4-.3-.4s-.3.2-.3.4V5.3c0-.2.1-.4.3-.4s.3.2.3.4v9.9z" />
      </svg>
    ),
  },
  {
    name: 'Vibe Coding',
    glowColor: 'rgba(183, 245, 43, 0.32)',
    borderColor: 'rgba(183, 245, 43, 0.50)',
    icon: (
      <svg className="w-9 h-9 text-[#B7F52B] vibe-magic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="vibe-sparkle-center" d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" fill="currentColor" fillOpacity="0.25" />
        <g className="vibe-sparkle-top">
          <path d="M20 3v4" />
          <path d="M22 5h-4" />
        </g>
        <g className="vibe-sparkle-bottom">
          <path d="M4 17v2" />
          <path d="M5 18H3" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Prompt Engineering',
    glowColor: 'rgba(0, 216, 254, 0.32)',
    borderColor: 'rgba(0, 216, 254, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#00D8FE] prompt-box" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="4" fill="currentColor" fillOpacity="0.15" />
        <path className="prompt-chevron" d="m7 9 3 3-3 3" />
        <path className="prompt-cursor" d="M13 15h4" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    glowColor: 'rgba(49, 120, 198, 0.32)',
    borderColor: 'rgba(49, 120, 198, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#3178C6] ts-icon" viewBox="0 0 32 32" fill="currentColor">
        <rect width="32" height="32" rx="4" fill="#3178C6" />
        <path d="M14.2 13h-3.4v1.8h2.3V23h2.2v-8.2h2.3V13h-3.4zm4.8 5.7c.6.4 1.4.8 2.2.8.9 0 1.4-.4 1.4-1 0-.6-.5-.9-1.6-1.3-1.6-.6-2.6-1.5-2.6-2.8 0-1.7 1.4-2.9 3.5-2.9 1.1 0 2 .3 2.6.7l-.6 1.7c-.5-.3-1.2-.6-2-.6-.9 0-1.4.4-1.4.9 0 .6.5.9 1.7 1.3 1.7.6 2.6 1.5 2.6 2.8 0 1.8-1.4 3-3.7 3-1.3 0-2.3-.3-3-.8l.9-1.7z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'AI Workflows',
    glowColor: 'rgba(168, 85, 247, 0.32)',
    borderColor: 'rgba(168, 85, 247, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#A855F7] workflow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className="workflow-body" x="3" y="11" width="18" height="10" rx="3" fill="currentColor" fillOpacity="0.15" />
        <circle className="workflow-node-top" cx="12" cy="5" r="2" />
        <path className="workflow-link" d="M12 7v4" />
        <line className="workflow-node-left" x1="8" y1="16" x2="8.01" y2="16" strokeWidth="3" />
        <line className="workflow-node-right" x1="16" y1="16" x2="16.01" y2="16" strokeWidth="3" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    glowColor: 'rgba(6, 182, 212, 0.32)',
    borderColor: 'rgba(6, 182, 212, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#06B6D4] tailwind-wave" viewBox="0 0 32 32" fill="currentColor">
        <path d="M9 13.5c1-4 4-5.5 7-4.5 2.1.7 3.5 2.2 5 3.7 2.4 2.4 5.1 4.3 9 3.3 1-4 4-5.5 7-4.5-2 3.5-4.4 5-7.5 4.2-2.1-.7-3.5-2.2-5-3.7-2.4-2.4-5.1-4.3-9-3.3-2.9 1-5 2.9-6.5 4.8zm-7 8c1-4 4-5.5 7-4.5 2.1.7 3.5 2.2 5 3.7 2.4 2.4 5.1 4.3 9 3.3 1-4 4-5.5 7-4.5-2 3.5-4.4 5-7.5 4.2-2.1-.7-3.5-2.2-5-3.7-2.4-2.4-5.1-4.3-9-3.3-2.9 1-5 2.9-6.5 4.8z" transform="scale(0.8) translate(-1, 0)" />
      </svg>
    ),
  },
  {
    name: 'Git',
    glowColor: 'rgba(240, 80, 50, 0.32)',
    borderColor: 'rgba(240, 80, 50, 0.45)',
    icon: (
      <svg className="w-9 h-9 text-[#F05032] git-tree" viewBox="0 0 32 32" fill="currentColor">
        <path d="M29.8 14.6l-12.4-12.4c-.8-.8-2.1-.8-2.9 0l-2.4 2.4 3.7 3.7c.9-.3 1.9-.1 2.6.6.7.7.9 1.7.6 2.6l3.5 3.5c.9-.3 1.9-.1 2.6.6 1 .1 1 2.7 0 3.7-1 1-2.7 1-3.7 0-.8-.8-.9-1.9-.5-2.9l-3.3-3.3v7.4c.3.2.6.4.8.7 1 1 1 2.7 0 3.7-1 1-2.7 1-3.7 0-1-1-1-2.7 0-3.7.3-.3.7-.5 1.1-.7V9.7L9.8 15.8c-.8.8-.8 2.1 0 2.9l12.4 12.4c.8.8 2.1.8 2.9 0l4.7-4.7c.8-.8.8-2.1 0-2.9z" />
      </svg>
    ),
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const yDelta = isMobile ? 16 : 28;

      // 1. Heading & Description Reveal
      gsap.fromTo(
        '.skills-header',
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

      // 2. Skill Cards Stagger Reveal
      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: isMobile ? 12 : 18 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
          opacity: 1,
          y: 0,
          stagger: isMobile ? 0.02 : 0.035,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 lg:py-24 border-t border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-10">
          <span className="w-5 h-[2px] bg-[#B7F52B] rounded-full" />
          <span>MY SKILLS</span>
        </div>

        {/* Editorial Heading + Technology Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Title */}
          <div className="skills-header lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[var(--text)] tracking-tight leading-[1.1]">
              Technologies <br />
              I work with.
            </h2>
            <p className="text-[var(--text-muted)] text-xs mt-3 max-w-xs leading-relaxed">
              Modern frontend frameworks, scalable backend architectures, AI-assisted workflows, and full-stack development toolchains.
            </p>
          </div>

          {/* Right Technology Grid / Showcase Cards */}
          <div className="lg:col-span-8 skills-grid-container">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  tabIndex={0}
                  role="region"
                  aria-label={`${skill.name} technology`}
                  data-skill={skill.name}
                  data-cursor="skill"
                  style={
                    {
                      '--skill-glow': skill.glowColor,
                      '--skill-border': skill.borderColor,
                    } as React.CSSProperties
                  }
                  className="skill-card flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] cursor-default select-none group text-center focus-visible:outline-none"
                >
                  <div className="skill-icon mb-2.5 flex items-center justify-center">
                    {skill.icon}
                  </div>
                  <span className="text-xs font-bold text-[var(--text)] tracking-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
