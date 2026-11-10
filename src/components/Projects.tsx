import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink, Layers, X, Briefcase, UserCheck, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  category: 'Professional Experience' | 'Personal Project';
  company?: string;
  role: string;
  shortDescription: string;
  problemSolved: string;
  overview: string;
  mainFeatures: string[];
  techStack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    cloudAndDevOps?: string[];
    securityAndAuth?: string[];
    libraries?: string[];
  };
  tags: string[];
  bannerImage: string;
  screenshotImage?: string;
  isBannerConceptualArtwork?: boolean;
  liveUrl?: string;
  sourceUrl?: string;
};

const allProjects: Project[] = [
  // --- Professional Experience Projects (Ratnam Solutions Private Limited) ---
  {
    id: 'weekend-nest',
    title: 'Weekend Nest',
    category: 'Professional Experience',
    company: 'Ratnam Solutions Private Limited',
    role: 'Full Stack Developer',
    shortDescription:
      'Weekend getaway and property booking marketplace supporting villas, resorts, and banquet halls with verified host onboarding and booking operations.',
    problemSolved:
      'Centralized fragmented weekend retreat bookings, streamlined host identity verification, and automated real-time booking availability calendars.',
    overview:
      'A full-stack property booking platform developed for Ratnam Solutions Private Limited using Next.js App Router and MongoDB via Prisma. It features automated guest reservation flows, host verification with Aadhaar & PAN validation, multi-tier admin governance, and automated PDF invoice compilation.',
    mainFeatures: [
      'Multi-category accommodation discovery (villas, resorts, farmhouses, banquet halls) with location and pricing filters',
      'Host onboarding workflow with Aadhaar & PAN government ID verification',
      'Dynamic property availability calendar preventing double-bookings',
      'Four-tier administrative governance (Super Admin, Operations, Customer Support, Finance)',
      'Automated PDF invoice and receipt generation via PDF-Lib',
    ],
    techStack: {
      frontend: ['Next.js (App Router)', 'React', 'Tailwind CSS', 'Radix UI', 'Lucide React'],
      backend: ['Next.js API Routes', 'Server Actions', 'Node.js'],
      database: ['MongoDB Atlas', 'Prisma ORM'],
      cloudAndDevOps: ['AWS S3', 'AWS CloudFront', 'SST Serverless Framework'],
      securityAndAuth: ['JWT Authentication', 'OTP MFA', 'Bcryptjs'],
    },
    tags: ['Next.js', 'React', 'MongoDB', 'Prisma', 'AWS S3', 'Tailwind CSS'],
    bannerImage: '/projects/weekend-nest-banner.jpg',
    screenshotImage: '/projects/weekend-nest-banner.jpg',
  },
  {
    id: 'hikode',
    title: 'HiKode',
    category: 'Professional Experience',
    company: 'Ratnam Solutions Private Limited',
    role: 'Full Stack Developer',
    shortDescription:
      'Talent networking, career opportunities, and coaching/mentoring platform connecting job seekers, professional mentors, and recruiting organizations.',
    problemSolved:
      'Solved disjointed career networking by building an integrated opportunities board, debounce-stabilized real-time chat, and verified mentoring bookings.',
    overview:
      'A comprehensive talent and mentoring portal developed for Ratnam Solutions Private Limited featuring an Angular 18 SSR frontend and a Node.js/Express backend. Integrated real-time bidirectional chat via Socket.io, multi-parameter job search, and Stripe payment integration for coaching appointments.',
    mainFeatures: [
      'Multi-parameter opportunity search filtering across countries, states, cities, salaries, and technical competencies',
      'Real-time messaging and chat powered by Socket.io with strict multi-field filtering and debounce layout stabilization',
      'Mentorship booking and coaching schedule management with integrated Stripe payments',
      'Rich-text job vacancy and tech event authoring powered by Quill editor (ngx-quill)',
      'Role-based access control (RBAC) across candidates, mentors, and system administrators with Redis caching',
    ],
    techStack: {
      frontend: ['Angular 18 (SSR)', 'Bootstrap 5', 'RxJS 7', 'Quill Editor', 'Toastr'],
      backend: ['Node.js', 'Express', 'Mongoose', 'Socket.io', 'Redis (ioredis)'],
      database: ['MongoDB'],
      cloudAndDevOps: ['Multer File Storage', 'Swagger UI API Documentation'],
      securityAndAuth: ['JWT Authentication', 'Helmet Security Headers', 'Rate Limiting', 'Stripe API'],
    },
    tags: ['Angular 18', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redis', 'Stripe'],
    bannerImage: '/projects/hikode-banner.png',
    screenshotImage: '/projects/hikode-banner.png',
    liveUrl: 'https://hikode.me/jobs',
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management System',
    category: 'Professional Experience',
    company: 'Ratnam Solutions Private Limited',
    role: 'Full Stack Developer',
    shortDescription:
      'Enterprise asset tracking and inventory governance platform engineered to manage office hardware, employee laptops, peripherals, and kiosk devices.',
    problemSolved:
      'Eliminated unmonitored hardware loss and untracked remote employee device custody by establishing QR-driven audits and immutable lifecycle transaction logs.',
    overview:
      'An enterprise device and asset governance system developed for Ratnam Solutions Private Limited tracking physical branch hardware and remote Work-From-Home (WFH) equipment. Features embedded camera QR/barcode scanning, custodial checkout workflows, repair management, and asynchronous CSV batch import queues.',
    mainFeatures: [
      'Asset lifecycle management across 9 states (In Office, Warehouse, WFH, Repair, Rental, Sold, Scrapped)',
      'Embedded camera QR/barcode scanner via html5-qrcode for instant physical audit lookups',
      'Custodial assignment tracking for remote employees with dispatch addresses and return inspection ticketing',
      'Immutable audit trail recording every state alteration, location handover, and administrative action',
      'Asynchronous batch CSV import processing powered by BullMQ queues and Redis',
      'Three-tier RBAC (SUPER_ADMIN, ADMIN, EMPLOYEE) restricting employee visibility to assigned custody',
    ],
    techStack: {
      frontend: ['React 18', 'Vite', 'React Router', 'Tailwind CSS', 'Lucide React', 'html5-qrcode'],
      backend: ['Node.js', 'Express', 'Mongoose ODM', 'BullMQ Worker Engine'],
      database: ['MongoDB Atlas'],
      cloudAndDevOps: ['Redis Cache & Queues', 'AWS S3 Asset Storage'],
      securityAndAuth: ['JWT Authentication', 'Role-Based Route Guards', 'Bcryptjs'],
    },
    tags: ['React 18', 'Vite', 'Node.js', 'MongoDB', 'Redis', 'BullMQ', 'AWS S3', 'QR Scanner'],
    bannerImage: '/projects/inventory-management-banner.png',
    screenshotImage: '/projects/inventory-management-banner.png',
    isBannerConceptualArtwork: true,
  },

  // --- Personal Projects (Independent Development) ---
  {
    id: 'campus-placement',
    title: 'Campus Placement System',
    category: 'Personal Project',
    role: 'Independent Developer & Architect',
    shortDescription:
      'Institutional recruitment and placement governance platform combining multi-tenant university administration with an ATS resume builder and explainable AI job matching.',
    problemSolved:
      'Replaced disorganized campus placement coordination with a unified digital ecosystem featuring automated ATS compliance, AI resume parsing, and deterministic job-candidate match explanations.',
    overview:
      'An independent full-stack institutional recruitment platform serving four stakeholder portals (Students, Recruiters, Placement Officers, and Super Admins). Powered by an AI microservice built with Python FastAPI, PyMuPDF, and Scikit-learn.',
    mainFeatures: [
      'Multi-tenant institutional governance supporting independent colleges, departments, and authorized company drives',
      '4 specialized stakeholder portals with role-tailored dashboards and recruitment pipeline analytics',
      'AI Resume Parser with binary magic-byte inspection (%PDF-) and 150+ standardized technical skill taxonomy extraction',
      '5-Template ATS Resume Builder with Groq LLaMA AI content enhancement and headless Puppeteer PDF compilation',
      'Explainable AI match scoring combining required skill overlap (70%), preferred overlap (15%), and dynamic TF-IDF cosine similarity (15%)',
    ],
    techStack: {
      frontend: ['React 19', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts', 'Lucide React'],
      backend: ['Node.js', 'Express', 'Mongoose', 'Puppeteer', 'Groq SDK'],
      database: ['MongoDB Community Server'],
      cloudAndDevOps: ['Python FastAPI Microservice', 'PyMuPDF', 'Scikit-learn', 'Pydantic'],
      securityAndAuth: ['JWT in httpOnly Strict Cookies', 'Helmet Security', 'Binary Magic-Byte Validation'],
    },
    tags: ['React 19', 'Python', 'FastAPI', 'MongoDB', 'Puppeteer', 'Groq LLaMA', 'TF-IDF'],
    bannerImage: '/projects/campus-placement-banner.png',
    screenshotImage: '/projects/campus-placement-banner.png',
  },
  {
    id: 'blockchain-medical',
    title: 'Blockchain-Based Secure Medical Data Sharing',
    category: 'Personal Project',
    role: 'Independent Concept',
    shortDescription:
      'Secure sharing of medical information using blockchain technology.',
    problemSolved:
      'Addressing data privacy, security, and tamper resistance in the sharing of sensitive health records across healthcare environments.',
    overview:
      'An independent project focused on the secure, decentralized sharing of medical information using blockchain technology to protect patient data confidentiality and record integrity.',
    mainFeatures: [
      'Secure sharing of medical information using blockchain technology',
      'Patient medical record privacy and confidentiality principles',
      'Tamper-resistant approach to distributed healthcare information management',
    ],
    techStack: {
      libraries: ['Blockchain Technology', 'Secure Medical Data Sharing Concept'],
    },
    tags: ['Blockchain', 'Medical Data Security', 'Independent Concept'],
    bannerImage: '/projects/blockchain-medical-banner.png',
    screenshotImage: '/projects/blockchain-medical-banner.png',
    isBannerConceptualArtwork: true,
  },
  {
    id: 'smartcart-ai',
    title: 'SmartCart AI',
    category: 'Personal Project',
    role: 'Independent Concept',
    shortDescription:
      'AI-powered smart shopping project.',
    problemSolved:
      'Exploring intelligent automated assistance and friction-free checkout workflows for modern smart shopping experiences.',
    overview:
      'An independent conceptual project exploring AI-powered smart shopping assistance, automated cart calculations, and intelligent retail workflows.',
    mainFeatures: [
      'AI-powered smart shopping concept',
      'Automated retail assistance exploration',
      'Intelligent shopping cart and checkout workflow conceptualization',
    ],
    techStack: {
      libraries: ['Artificial Intelligence', 'Smart Shopping Exploration'],
    },
    tags: ['Artificial Intelligence', 'Smart Shopping', 'Independent Concept'],
    bannerImage: '/projects/smartcart-ai-banner.png',
    screenshotImage: '/projects/smartcart-ai-banner.png',
    isBannerConceptualArtwork: true,
  },
];

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
};

function TiltCard({ children, className = '', glowOnHover = true }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof window === 'undefined') return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || !canHover || reducedMotion) return;

    const handleMove = (e: MouseEvent | PointerEvent) => {
      if ('pointerType' in e && (e.pointerType === 'touch' || e.pointerType === 'pen')) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Strict movement limits: subtle tilt max +/- 2.2 deg X, +/- 2.8 deg Y
      const rotateX = ((centerY - y) / centerY) * 2.2;
      const rotateY = ((x - centerX) / centerX) * 2.8;

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -5px, 0)`;
      el.style.transition = 'transform 0.12s ease-out, border-color 0.25s ease, box-shadow 0.25s ease';
    };

    const handleLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.25s ease, box-shadow 0.25s ease';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group/card transition-all duration-300 will-change-transform ${
        glowOnHover
          ? 'hover:border-[#B7F52B]/45 dark:hover:border-[#B7F52B]/40 hover:shadow-[0_14px_36px_-6px_rgba(0,0,0,0.35),0_0_20px_-4px_rgba(183,245,43,0.14)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Professional Experience' | 'Personal Project'>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const professionalProjects = allProjects.filter((p) => p.category === 'Professional Experience');
  const personalProjects = allProjects.filter((p) => p.category === 'Personal Project');

  // Handle Escape key and body scroll locking for project detail modal
  useEffect(() => {
    if (!activeModalProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;

      // 1. Projects Section Header Reveal
      gsap.fromTo(
        '.projects-header',
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

      // 2. Project Cards Subtle Staggered Entrance
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: isMobile ? 18 : 28 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
            opacity: 1,
            y: 0,
            stagger: isMobile ? 0.06 : 0.09,
            duration: 0.6,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="projects-section py-20 lg:py-24 border-t border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="projects-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">
              <span className="w-5 h-[2px] bg-[#B7F52B] rounded-full" />
              <span>PROJECT PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[var(--text)] tracking-tight leading-[1.1]">
              Verified Work & <br />
              Engineered Products.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] shadow-2xs">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-black text-white dark:bg-[#B7F52B] dark:text-black shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              All Projects (6)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('Professional Experience')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'Professional Experience'
                  ? 'bg-black text-white dark:bg-[#B7F52B] dark:text-black shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <Briefcase size={13} />
              <span>Professional (3)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('Personal Project')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'Personal Project'
                  ? 'bg-black text-white dark:bg-[#B7F52B] dark:text-black shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <UserCheck size={13} />
              <span>Personal (3)</span>
            </button>
          </div>
        </div>

        {/* --- CATEGORY 1: Professional Experience Projects --- */}
        {(selectedCategory === 'All' || selectedCategory === 'Professional Experience') && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[var(--border)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B7F52B] shadow-[0_0_8px_#B7F52B]" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] tracking-tight">
                Professional Experience Projects
              </h3>
              <span className="ml-auto text-xs font-mono font-medium text-[var(--text-muted)] px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)]">
                Ratnam Solutions Private Limited
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalProjects.map((project) => (
                <TiltCard
                  key={project.id}
                  className="project-card relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full transition-all duration-300 hover:border-[#B7F52B]/40 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.35),0_0_24px_-4px_rgba(183,245,43,0.12)] overflow-hidden"
                >
                  {/* Subtle top edge glow */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B7F52B]/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Banner Image */}
                    <div
                      onClick={() => setActiveModalProject(project)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveModalProject(project);
                        }
                      }}
                      className="rounded-xl overflow-hidden border border-[var(--border)] bg-neutral-950 aspect-square mb-5 relative group/img flex items-center justify-center cursor-pointer select-none"
                    >
                      {/* Ambient glowing backdrop so banners blend seamlessly */}
                      <img
                        src={project.bannerImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-35 pointer-events-none"
                      />
                      <img
                        src={project.bannerImage}
                        alt={project.title}
                        loading="lazy"
                        className="project-banner-img relative z-10 w-full h-full object-contain transition-transform duration-500 ease-out group-hover/card:scale-104"
                      />
                      <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      {project.isBannerConceptualArtwork && (
                        <div className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-neutral-300 border border-white/10 shadow-xs">
                          Conceptual Artwork
                        </div>
                      )}
                    </div>

                    {/* Category Label & Company */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#B7F52B]/15 text-[#B7F52B] border border-[#B7F52B]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B7F52B] shadow-[0_0_6px_#B7F52B]" />
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        Ratnam Solutions
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-extrabold text-[var(--text)] tracking-tight mb-2.5 flex items-start justify-between min-h-[56px]">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="text-left line-clamp-2 leading-snug group-hover/card:text-[#B7F52B] transition-colors duration-200 cursor-pointer"
                      >
                        {project.title}
                      </button>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[var(--text-muted)] hover:text-[#B7F52B] transition-colors p-1 shrink-0 ml-2"
                          aria-label={`View live project ${project.title}`}
                        >
                          <ArrowUpRight size={18} className="transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                        </a>
                      )}
                    </h4>

                    {/* Short Description */}
                    <p className="text-[var(--text-muted)] text-[13px] leading-relaxed mb-4 min-h-[60px] line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Badges & Actions */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5 min-h-[54px] content-start">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-muted)] transition-all duration-200 group-hover/card:text-[var(--text)] group-hover/card:border-[var(--border-strong)]"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-mono text-[var(--text-muted)] opacity-80">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] mt-auto">
                      <MagneticButton distance={3}>
                        <button
                          type="button"
                          onClick={() => setActiveModalProject(project)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[var(--border-strong)] text-[var(--text)] bg-[var(--bg-subtle)] hover:bg-[var(--border)] hover:border-[#B7F52B]/40 hover:text-[#B7F52B] transition-all cursor-pointer"
                        >
                          <span>View Details</span>
                          <Layers size={13} className="text-[#B7F52B]" />
                        </button>
                      </MagneticButton>

                      {project.liveUrl ? (
                        <MagneticButton distance={3}>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#B7F52B] text-black hover:bg-[#c6fa4d] shadow-[0_0_14px_rgba(183,245,43,0.25)] transition-all"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={12} />
                          </a>
                        </MagneticButton>
                      ) : (
                        <span className="text-[11px] font-mono text-[var(--text-muted)] opacity-70">
                          Internal Enterprise
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {/* --- CATEGORY 2: Personal Projects --- */}
        {(selectedCategory === 'All' || selectedCategory === 'Personal Project') && (
          <div>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[var(--border)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text)] tracking-tight">
                Personal Projects
              </h3>
              <span className="ml-auto text-xs font-mono font-medium text-[var(--text-muted)] px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)]">
                Independent Projects
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalProjects.map((project) => (
                <TiltCard
                  key={project.id}
                  className="project-card relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full transition-all duration-300 hover:border-[#B7F52B]/40 hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.35),0_0_24px_-4px_rgba(183,245,43,0.12)] overflow-hidden"
                >
                  {/* Subtle top edge glow */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B7F52B]/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Banner Image */}
                    <div
                      onClick={() => setActiveModalProject(project)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveModalProject(project);
                        }
                      }}
                      className="rounded-xl overflow-hidden border border-[var(--border)] bg-neutral-950 aspect-square mb-5 relative group/img flex items-center justify-center cursor-pointer select-none"
                    >
                      {/* Ambient glowing backdrop so banners blend seamlessly */}
                      <img
                        src={project.bannerImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-35 pointer-events-none"
                      />
                      <img
                        src={project.bannerImage}
                        alt={project.title}
                        loading="lazy"
                        className="project-banner-img relative z-10 w-full h-full object-contain transition-transform duration-500 ease-out group-hover/card:scale-104"
                      />
                      <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      {project.isBannerConceptualArtwork && (
                        <div className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-neutral-300 border border-white/10 shadow-xs">
                          Conceptual Artwork
                        </div>
                      )}
                    </div>

                    {/* Category Label */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]" />
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">Independent</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-extrabold text-[var(--text)] tracking-tight mb-2.5 flex items-start justify-between min-h-[56px]">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="text-left line-clamp-2 leading-snug group-hover/card:text-[#B7F52B] transition-colors duration-200 cursor-pointer"
                      >
                        {project.title}
                      </button>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[var(--text-muted)] hover:text-[#B7F52B] transition-colors p-1 shrink-0 ml-2"
                          aria-label={`View live project ${project.title}`}
                        >
                          <ArrowUpRight size={18} className="transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                        </a>
                      )}
                    </h4>

                    {/* Short Description */}
                    <p className="text-[var(--text-muted)] text-[13px] leading-relaxed mb-4 min-h-[60px] line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Badges & Actions */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5 min-h-[54px] content-start">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-muted)] transition-all duration-200 group-hover/card:text-[var(--text)] group-hover/card:border-[var(--border-strong)]"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 rounded-lg text-[10px] font-mono text-[var(--text-muted)] opacity-80">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)] mt-auto">
                      <MagneticButton distance={3}>
                        <button
                          type="button"
                          onClick={() => setActiveModalProject(project)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[var(--border-strong)] text-[var(--text)] bg-[var(--bg-subtle)] hover:bg-[var(--border)] hover:border-[#B7F52B]/40 hover:text-[#B7F52B] transition-all cursor-pointer"
                        >
                          <span>View Details</span>
                          <Layers size={13} className="text-[#B7F52B]" />
                        </button>
                      </MagneticButton>

                      {project.liveUrl ? (
                        <MagneticButton distance={3}>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#B7F52B] text-black hover:bg-[#c6fa4d] shadow-[0_0_14px_rgba(183,245,43,0.25)] transition-all"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight size={12} />
                          </a>
                        </MagneticButton>
                      ) : (
                        <span className="text-[11px] font-mono text-[var(--text-muted)] opacity-70">
                          Concept Specs
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Interactive Project Detail Modal --- */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="bg-[var(--bg)] border border-[var(--border-strong)] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close project modal"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[var(--text-muted)] hover:text-[var(--text)] w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[var(--border)] flex items-center justify-center cursor-pointer hover:bg-[var(--bg-subtle)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--lime)]"
            >
              <X size={18} />
            </button>

            {/* Modal Header: Side-by-side with Compact Small Photo Thumbnail */}
            <div className="flex flex-row items-center gap-4 sm:gap-6 pb-6 mb-6 border-b border-[var(--border)] pr-10 sm:pr-12">
              {/* Compact Small Photo Thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-neutral-950 shrink-0 relative flex items-center justify-center shadow-md">
                <img
                  src={activeModalProject.screenshotImage || activeModalProject.bannerImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-35 pointer-events-none"
                />
                <img
                  src={activeModalProject.screenshotImage || activeModalProject.bannerImage}
                  alt={`${activeModalProject.title} Thumbnail`}
                  className="relative z-10 w-full h-full object-contain p-1.5"
                />
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                    activeModalProject.category === 'Professional Experience'
                      ? 'bg-[#B7F52B]/15 text-[#B7F52B] border border-[#B7F52B]/30'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border)]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${activeModalProject.category === 'Professional Experience' ? 'bg-[#B7F52B]' : 'bg-[var(--text-muted)]'}`} />
                    {activeModalProject.category}
                  </span>

                  {activeModalProject.company && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text)]">
                      {activeModalProject.company}
                    </span>
                  )}

                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    Role: {activeModalProject.role}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--text)] tracking-tight mb-1.5 leading-tight">
                  {activeModalProject.title}
                </h3>

                {activeModalProject.isBannerConceptualArtwork && (
                  <p className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5 opacity-80">
                    <AlertCircle size={12} className="text-[#84be39] shrink-0" />
                    <span>Conceptual visual representation</span>
                  </p>
                )}
              </div>
            </div>

            {/* 1. Project Overview */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2 font-bold">
                Project Overview
              </h4>
              <p className="text-sm sm:text-base text-[var(--text)] leading-relaxed">
                {activeModalProject.overview}
              </p>
            </div>

            {/* 2. Problem Being Solved */}
            <div className="mb-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#84be39] mb-1.5 font-bold">
                Problem Solved
              </h4>
              <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
                {activeModalProject.problemSolved}
              </p>
            </div>

            {/* 3. Main Features */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3 font-bold">
                Main Features & Capabilities
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] text-[var(--text)]">
                {activeModalProject.mainFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7F52B] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Verified Technology Stack */}
            <div className="mb-8">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3 font-bold">
                Verified Technology Stack
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {activeModalProject.techStack.frontend && (
                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                    <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] mb-1 font-semibold">
                      Frontend
                    </span>
                    <span className="font-medium text-[var(--text)]">
                      {activeModalProject.techStack.frontend.join(', ')}
                    </span>
                  </div>
                )}
                {activeModalProject.techStack.backend && (
                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                    <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] mb-1 font-semibold">
                      Backend
                    </span>
                    <span className="font-medium text-[var(--text)]">
                      {activeModalProject.techStack.backend.join(', ')}
                    </span>
                  </div>
                )}
                {activeModalProject.techStack.database && (
                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                    <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] mb-1 font-semibold">
                      Database
                    </span>
                    <span className="font-medium text-[var(--text)]">
                      {activeModalProject.techStack.database.join(', ')}
                    </span>
                  </div>
                )}
                {activeModalProject.techStack.cloudAndDevOps && (
                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                    <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] mb-1 font-semibold">
                      Cloud & DevOps
                    </span>
                    <span className="font-medium text-[var(--text)]">
                      {activeModalProject.techStack.cloudAndDevOps.join(', ')}
                    </span>
                  </div>
                )}
                {activeModalProject.techStack.securityAndAuth && (
                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] sm:col-span-2">
                    <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] mb-1 font-semibold">
                      Security & Authentication
                    </span>
                    <span className="font-medium text-[var(--text)]">
                      {activeModalProject.techStack.securityAndAuth.join(', ')}
                    </span>
                  </div>
                )}
                {activeModalProject.techStack.libraries && (
                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] sm:col-span-2">
                    <span className="block font-mono text-[10px] uppercase text-[var(--text-muted)] mb-1 font-semibold">
                      Project Focus Area
                    </span>
                    <span className="font-medium text-[var(--text)]">
                      {activeModalProject.techStack.libraries.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-3">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#B7F52B] text-black hover:opacity-90 transition-all flex items-center gap-1.5"
                  >
                    <span>Visit Live Project</span>
                    <ExternalLink size={13} />
                  </a>
                )}
                {activeModalProject.sourceUrl && (
                  <a
                    href={activeModalProject.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full text-xs font-bold border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-subtle)] transition-all flex items-center gap-1.5"
                  >
                    <span>Source Repository</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
