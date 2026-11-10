import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Ratnam Solutions Private Limited',
    period: 'May 2026 – Present (Currently Working)',
    description:
      'Spearheading full-stack software development, architectural design, and production delivery. Engineered three core enterprise systems: Weekend Nest (marketplace platform with verified host onboarding and automated booking), HiKode (talent networking & coaching platform with real-time Socket.io chat and Stripe payments), and Inventory Management System (enterprise device and asset tracking platform with QR/barcode scanning and audit trails).',
    associatedProjects: ['Weekend Nest', 'HiKode', 'Inventory Management System'],
    tags: ['Next.js', 'React', 'Angular', 'Node.js', 'MongoDB', 'Redis', 'AWS S3', 'TypeScript', 'Socket.io', 'Stripe'],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'SkillDzire Technologies Pvt. Ltd.',
    period: '01 May, 2024 – 01 Jul, 2024',
    description:
      'Developed and maintained client web application modules using React, Node.js, and databases. Gained backend development experience including schema design and server-side logic.',
    associatedProjects: [],
    tags: ['React', 'Node.js', 'Databases', 'Web Development'],
  },
  {
    role: 'Artificial Intelligence & Machine Learning Intern',
    company: 'Andhra Pradesh State Skill Development Corporation (APSSDC)',
    period: '15 May, 2024 – 25 June, 2024',
    description:
      'Explored problem-solving and scripting in Python. Completed an object detection project implementing computer vision concepts and popular libraries including OpenCV and NumPy.',
    associatedProjects: [],
    tags: ['Python', 'OpenCV', 'NumPy', 'Computer Vision'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Academor',
    period: '02 Jan, 2024 – 30 Mar, 2024',
    description:
      'Built responsive web applications and landing pages using HTML, CSS, and JavaScript. Focused on user experience and mobile-first responsive design principles.',
    associatedProjects: [],
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;

      // 1. Heading & Intro Reveal
      gsap.fromTo(
        '.experience-header',
        { opacity: 0, y: isMobile ? 18 : 28 },
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

      // 2. Timeline Line Drawing Down via Scroll Scrub
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: '.experience-timeline-container',
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.5,
            },
          }
        );
      }

      // 3. Staggered Entrance for Milestone Cards & Nodes
      const items = gsap.utils.toArray<HTMLElement>('.experience-item');
      items.forEach((item) => {
        const node = item.querySelector('.timeline-node');
        const card = item.querySelector('.timeline-card');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          },
        });

        if (node) {
          tl.from(node, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'back.out(2)',
          });
        }

        if (card) {
          tl.fromTo(
            card,
            {
              x: isMobile ? 0 : 20,
              y: isMobile ? 16 : 0,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
            },
            '-=0.2'
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 lg:py-24 border-t border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-10">
          <span className="w-5 h-[2px] bg-[#B7F52B] rounded-full" />
          <span>EXPERIENCE</span>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="experience-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[var(--text)] tracking-tight leading-[1.1]">
            My Professional <br />
            Journey.
          </h2>
          <p className="text-[var(--text-muted)] text-sm max-w-sm leading-relaxed">
            A verified timeline of my software engineering career, professional responsibilities, and product contributions.
          </p>
        </div>

        {/* Vertical Professional Timeline Container */}
        <div className="experience-timeline-container relative pl-6 sm:pl-8 ml-3 sm:ml-4 flex flex-col gap-12">
          {/* Animated Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--border-strong)] origin-top"
            aria-hidden="true"
          />

          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${index}`}
              className="experience-item relative group"
            >
              {/* Glowing Timeline Node */}
              <div
                className="timeline-node absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#B7F52B] border-4 border-[var(--bg)] shadow-[0_0_10px_#B7F52B] transition-transform group-hover:scale-125"
                aria-hidden="true"
              />

              {/* Experience Card Details */}
              <div className="timeline-card rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-2xs hover:border-[var(--border-strong)] transition-[border-color,box-shadow] duration-200">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text)] tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-bold text-[#84be39] mt-0.5 tracking-wide">
                      {exp.company}
                    </p>
                  </div>

                  <span className="font-mono text-xs text-[var(--text-muted)] font-medium shrink-0">
                    {exp.period}
                  </span>
                </div>

                <p className="text-[var(--text-muted)] text-[13px] leading-relaxed mt-3 mb-4">
                  {exp.description}
                </p>

                {/* Associated Professional Projects Badge Linkage */}
                {exp.associatedProjects.length > 0 && (
                  <div className="mb-4 pt-3 border-t border-[var(--border)]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mr-2 font-semibold">
                      Associated Projects:
                    </span>
                    <div className="inline-flex flex-wrap gap-2 mt-1.5">
                      {exp.associatedProjects.map((p) => (
                        <a
                          key={p}
                          href="#projects"
                          className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#B7F52B]/15 text-[#84be39] border border-[#B7F52B]/30 hover:bg-[#B7F52B]/25 transition-colors"
                        >
                          {p} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[10px] font-semibold border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
