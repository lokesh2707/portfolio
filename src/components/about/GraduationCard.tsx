import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function GraduationCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<number | null>(null);

  // Viewport-based trigger for mobile
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedOnce) {
          setIsHovered(true);
          setHasPlayedOnce(true);
          resetTimerRef.current = window.setTimeout(() => {
            setIsHovered(false);
          }, 1800);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, [hasPlayedOnce]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setParallax({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setParallax({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback(() => {
    setIsHovered(true);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 1800);
  }, []);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="region"
      aria-label="Education: B.Tech in Computer Science and Engineering"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="about-card group relative p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xs hover:border-[var(--border-strong)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:border-[#b7f52b] cursor-pointer select-none flex flex-col justify-between h-full min-h-[148px]"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#b7f52b]/5 blur-2xl transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0.2 }}
      />

      {/* Miniature Visual Stage (h-14) */}
      <div className="w-full h-14 relative flex items-center justify-between rounded-lg bg-[var(--bg-subtle)]/40 border border-[var(--border)]/40 px-3 overflow-hidden mb-2.5">
        {/* Left side pill badge */}
        <div className="flex items-center gap-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b7f52b]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium">
            ACADEMICS
          </span>
        </div>

        {/* Right side interactive illustration with mouse parallax */}
        <div
          className="relative w-28 h-12 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        >
          <svg
            viewBox="0 0 110 48"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="grad-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Pedestal / Rolled Diploma Parchment resting at base */}
            <g transform="translate(18, 30)">
              {/* Diploma Scroll */}
              <rect x="0" y="2" width="46" height="7" rx="3.5" fill="#1e2430" stroke="#334155" strokeWidth="0.8" />
              {/* Scroll Ribbon */}
              <rect x="20" y="1" width="6" height="9" rx="1.5" fill="#b7f52b" />
              <path d="M 23 10 L 21 14 M 23 10 L 25 14" stroke="#b7f52b" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Celebratory Particles (Bursts when hovered) */}
            {isHovered && (
              <g className="grad-particles">
                {/* 1. Lime particle top-left */}
                <circle cx="48" cy="22" r="1.5" fill="#b7f52b" className="grad-particle grad-p1" />
                {/* 2. Gold particle top */}
                <circle cx="56" cy="18" r="1.3" fill="#facc15" className="grad-particle grad-p2" />
                {/* 3. Cyan spark top-right */}
                <circle cx="68" cy="20" r="1.5" fill="#38bdf8" className="grad-particle grad-p3" />
                {/* 4. Rose star right */}
                <circle cx="74" cy="26" r="1.2" fill="#fb7185" className="grad-particle grad-p4" />
                {/* 5. Violet sparkle bottom-right */}
                <circle cx="70" cy="34" r="1.4" fill="#c084fc" className="grad-particle grad-p5" />
                {/* 6. Lime dot left */}
                <circle cx="36" cy="24" r="1.3" fill="#b7f52b" className="grad-particle grad-p6" />
                {/* 7. Gold spark bottom-left */}
                <circle cx="40" cy="32" r="1.2" fill="#fde047" className="grad-particle grad-p7" />
                {/* 8. White glint center-top */}
                <polygon points="58,12 60,15 63,15 60.5,17 61.5,20 58,18 54.5,20 55.5,17 53,15 56,15" fill="#ffffff" className="grad-particle grad-p8" />
              </g>
            )}

            {/* Mortarboard Graduation Cap Group */}
            <g
              className={isHovered ? 'grad-cap-animated' : 'grad-cap-rest'}
              style={{ transformOrigin: '56px 26px' }}
            >
              {/* Skull Cap Base */}
              <path
                d="M 44 26 C 44 32, 68 32, 68 26 L 68 29 C 68 34, 44 34, 44 29 Z"
                fill="#161b22"
                stroke="#334155"
                strokeWidth="0.8"
              />

              {/* Top Diamond Crown */}
              <polygon
                points="56,15 76,22 56,29 36,22"
                fill="#0f172a"
                stroke="#b7f52b"
                strokeWidth="1.2"
                strokeLinejoin="round"
                filter="url(#grad-glow)"
              />

              {/* Cap Center Button */}
              <circle cx="56" cy="22" r="1.8" fill="#facc15" />

              {/* Silk Tassel swinging from center button */}
              <g
                className={isHovered ? 'grad-tassel-swing' : ''}
                style={{ transformOrigin: '56px 22px' }}
              >
                {/* Tassel cord */}
                <path
                  d="M 56 22 Q 47 23 45 29"
                  stroke="#facc15"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Tassel brush */}
                <rect x="43.5" y="29" width="3" height="4.5" rx="1" fill="#facc15" />
                <line x1="44" y1="33.5" x2="46" y2="33.5" stroke="#ca8a04" strokeWidth="0.8" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Card Content (Preserved typography & details) */}
      <div className="mt-auto">
        <h3 className="text-xs font-bold text-[var(--text)] group-hover:text-[#b7f52b] transition-colors duration-200">
          B.Tech in CSE
        </h3>
        <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">
          Aditya College of Eng & Tech (JNTUK, 2026)
        </p>
      </div>
    </div>
  );
}
