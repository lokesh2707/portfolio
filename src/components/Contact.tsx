import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;

      // 1. Contact Container Box Entrance
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: isMobile ? 18 : 28 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          }
        );
      }

      // 2. Inner Elements Staggered Reveal
      gsap.fromTo(
        '.contact-left-content',
        { opacity: 0, y: isMobile ? 14 : 20 },
        {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            once: true,
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.contact-form-container',
        { opacity: 0, y: isMobile ? 14 : 22 },
        {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            once: true,
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.08,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('Sending…');
    try {
      await emailjs.send('service_608dj5o', 'template_awnng0g', formData, 'qa0E16x8vliCpZJEL');
      setStatus('Message sent successfully. Thank you!');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('Could not send message. Please email directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 lg:py-24 border-t border-[var(--border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Contrasting Contact Box matching reference */}
        <div
          ref={cardRef}
          className="rounded-3xl bg-[#11151A] text-white p-8 sm:p-12 lg:p-16 border border-white/10 shadow-xl overflow-hidden relative"
        >
          {/* Subtle Ambient Radial Glow with Parallax Response */}
          <div
            ref={glowRef}
            className="absolute top-0 right-0 w-96 h-96 bg-[#B7F52B]/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B7F52B] mb-8">
            <span className="w-5 h-[2px] bg-[#B7F52B] rounded-full" />
            <span>GET IN TOUCH</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
            {/* Left Column: Heading & Pitch */}
            <div className="contact-left-content lg:col-span-6 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.05] text-white mb-6">
                  Let’s build <br />
                  something great <br />
                  <span className="bg-[#B7F52B] text-black px-3 py-0.5 rounded-xl inline-block mt-1">
                    together.
                  </span>
                </h2>

                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md mb-8">
                  Have an exciting project, an internship opportunity, or want to discuss full-stack engineering?
                  I’d love to connect.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="flex flex-col gap-4 text-xs text-neutral-300">
                <a
                  href="mailto:lokeshsridhara2005@gmail.com"
                  className="inline-flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#B7F52B] hover:text-[#B7F52B] transition-all group"
                >
                  <Mail size={16} className="text-[#B7F52B]" />
                  <span className="font-mono text-xs truncate">lokeshsridhara2005@gmail.com</span>
                  <ArrowUpRight size={14} className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://www.linkedin.com/in/lokesh-prasanth-6784022a7/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#B7F52B] hover:text-[#B7F52B] transition-all group"
                >
                  <Linkedin size={16} className="text-[#B7F52B]" />
                  <span className="font-mono text-xs">linkedin.com/in/lokesh-prasanth</span>
                  <ArrowUpRight size={14} className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://github.com/lokesh2707"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#B7F52B] hover:text-[#B7F52B] transition-all group"
                >
                  <Github size={16} className="text-[#B7F52B]" />
                  <span className="font-mono text-xs">github.com/lokesh2707</span>
                  <ArrowUpRight size={14} className="ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>

                <div className="flex items-center gap-6 pt-2 text-neutral-400 font-mono text-[11px]">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone size={13} className="text-[#B7F52B]" /> +91 80745 19845
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#B7F52B]" /> Akividu, India
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Message Form */}
            <div className="contact-form-container lg:col-span-6 bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#B7F52B] focus-visible:outline-2 focus-visible:outline-[var(--lime)] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#B7F52B] focus-visible:outline-2 focus-visible:outline-[var(--lime)] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#B7F52B] focus-visible:outline-2 focus-visible:outline-[var(--lime)] transition-colors resize-none"
                  />
                </div>

                <MagneticButton distance={6}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-bold bg-[#B7F52B] text-black hover:opacity-90 transition-all cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--lime)] min-h-[44px]"
                  >
                    <Send size={14} />
                    <span>{loading ? 'Sending…' : 'Send Message'}</span>
                  </button>
                </MagneticButton>

                {status && (
                  <p
                    aria-live="polite"
                    className={`text-xs font-medium mt-1 text-center ${
                      status.includes('successfully') ? 'text-[#B7F52B]' : 'text-red-400'
                    }`}
                  >
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
