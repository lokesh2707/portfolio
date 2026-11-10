import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function JourneyCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<number | null>(null);

  // Viewport-based trigger for mobile devices
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
          }, 2400);
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
    }, 2400);
  }, []);

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="region"
      aria-label="Location: Akividu, India. Open to relocation"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="about-card group relative p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xs hover:border-[var(--border-strong)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:border-[#f97316] cursor-pointer select-none flex flex-col justify-between h-full min-h-[148px]"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#f97316]/5 blur-2xl transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0.2 }}
      />

      {/* Miniature Visual Stage (h-14) */}
      <div className="w-full h-14 relative flex items-center justify-between rounded-lg bg-[var(--bg-subtle)]/40 border border-[var(--border)]/40 px-3 overflow-hidden mb-2.5">
        {/* Left side pill badge */}
        <div className="flex items-center gap-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium">
            LOCATION
          </span>
        </div>

        {/* Right side interactive journey with mouse parallax */}
        <div
          className="relative w-36 h-12 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        >
          <svg
            viewBox="0 0 130 48"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="journey-road-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#475569" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Curved Road Path */}
            <path
              d="M 6 38 Q 45 44, 75 34 T 120 36"
              stroke="#1e293b"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Center Dashed Lane Markings */}
            <path
              d="M 8 38 Q 45 44, 75 34 T 118 36"
              stroke="#64748b"
              strokeWidth="1"
              strokeDasharray="3 3"
              strokeLinecap="round"
              className={isHovered ? 'journey-road-flow' : ''}
            />

            {/* Destination Location Pin at (104, 28) */}
            <g
              transform="translate(104, 18)"
              className={isHovered ? 'journey-pin-arrive' : ''}
              style={{ transformOrigin: '7px 18px' }}
            >
              {/* Radar Pulse Rings upon arrival */}
              {isHovered && (
                <>
                  <circle
                    cx="7"
                    cy="18"
                    r="4"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="1"
                    className="journey-radar-ring ring-1"
                  />
                  <circle
                    cx="7"
                    cy="18"
                    r="7"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="0.8"
                    className="journey-radar-ring ring-2"
                  />
                </>
              )}

              {/* Pin Shadow */}
              <ellipse cx="7" cy="18" rx="4.5" ry="1.5" fill="#000000" opacity="0.4" />

              {/* Pin Body */}
              <path
                d="M 7 18 C 7 18, 1 11, 1 7 C 1 3.7 3.7 1 7 1 C 10.3 1 13 3.7 13 7 C 13 11, 7 18, 7 18 Z"
                fill="#ea580c"
                stroke="#fed7aa"
                strokeWidth="0.8"
              />
              {/* Inner Pin Dot */}
              <circle cx="7" cy="7" r="2.2" fill="#ffffff" />
            </g>

            {/* Motorcycle & Rider Group (Traverses the road from left to destination) */}
            <g
              className={isHovered ? 'journey-moto-travel' : 'journey-moto-parked'}
            >
              {/* Headlight beam cone */}
              <polygon
                points="24,29 38,24 38,36"
                fill="#fef08a"
                opacity={isHovered ? 0.35 : 0.15}
              />

              {/* Rear Wheel */}
              <circle
                cx="8"
                cy="32"
                r="3.5"
                fill="#0f172a"
                stroke="#64748b"
                strokeWidth="1.2"
                className={isHovered ? 'journey-wheel-spin' : ''}
                style={{ transformOrigin: '8px 32px' }}
              />
              <circle cx="8" cy="32" r="1.2" fill="#cbd5e1" />

              {/* Front Wheel */}
              <circle
                cx="21"
                cy="32"
                r="3.5"
                fill="#0f172a"
                stroke="#64748b"
                strokeWidth="1.2"
                className={isHovered ? 'journey-wheel-spin' : ''}
                style={{ transformOrigin: '21px 32px' }}
              />
              <circle cx="21" cy="32" r="1.2" fill="#cbd5e1" />

              {/* Motorcycle Chassis & Engine */}
              <path
                d="M 8 32 L 13 28 L 19 28 L 21 32 L 15 33 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="0.8"
              />
              {/* Orange Fuel Tank Accent */}
              <path d="M 12 28 Q 15 25 18 28 Z" fill="#f97316" />
              {/* Handlebar & Windshield */}
              <line x1="18" y1="28" x2="20" y2="24" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
              <line x1="19" y1="24" x2="21" y2="24" stroke="#e2e8f0" strokeWidth="1" strokeLinecap="round" />

              {/* Rider Silhouette (Helmet & Body) */}
              {/* Torso leaning forward */}
              <path d="M 11 28 Q 13 23 16 25" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
              {/* Helmet */}
              <circle cx="16" cy="22" r="2.8" fill="#e2e8f0" />
              {/* Helmet Visor */}
              <path d="M 17 21.5 L 18.5 22.5" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* Card Content (Preserved typography & details) */}
      <div className="mt-auto">
        <h3 className="text-xs font-bold text-[var(--text)] group-hover:text-[#f97316] transition-colors duration-200">
          Akividu, India
        </h3>
        <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">
          Open to relocation
        </p>
      </div>
    </div>
  );
}
