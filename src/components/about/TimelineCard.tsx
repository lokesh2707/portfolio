import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function TimelineCard() {
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
      aria-label="Timeline: May 2026 to Present, Currently working"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="about-card group relative p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xs hover:border-[var(--border-strong)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:border-[#10b981] cursor-pointer select-none flex flex-col justify-between h-full min-h-[148px]"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#10b981]/5 blur-2xl transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0.2 }}
      />

      {/* Miniature Visual Stage (h-14) */}
      <div className="w-full h-14 relative flex items-center justify-between rounded-lg bg-[var(--bg-subtle)]/40 border border-[var(--border)]/40 px-3 overflow-hidden mb-2.5">
        {/* Left side: Miniature Flipping Calendar */}
        <div className="flex items-center gap-2 z-10">
          <div
            className="relative w-8 h-9 rounded-md bg-[#161b22] border border-[var(--border)] overflow-hidden flex flex-col items-center shadow-xs perspective-500"
            style={{ perspective: '400px' }}
          >
            {/* Calendar spiral rings header */}
            <div className="w-full h-3 bg-[#10b981]/20 border-b border-[#10b981]/30 flex items-center justify-around px-1">
              <span className="w-1 h-1 rounded-full bg-[#10b981]" />
              <span className="w-1 h-1 rounded-full bg-[#10b981]" />
              <span className="w-1 h-1 rounded-full bg-[#10b981]" />
            </div>

            {/* Static base month & day */}
            <div className="flex-1 w-full flex flex-col items-center justify-center -space-y-0.5">
              <span className="text-[7.5px] font-mono font-bold text-[#10b981] uppercase leading-none">
                MAY
              </span>
              <span className="text-[10px] font-mono font-extrabold text-[var(--text)] leading-none">
                26
              </span>
            </div>

            {/* Flipping calendar page overlay */}
            <div
              className={`absolute inset-x-0 bottom-0 top-3 bg-[#1e2430] flex flex-col items-center justify-center -space-y-0.5 ${
                isHovered ? 'timeline-calendar-page-flip' : ''
              }`}
              style={{
                transformOrigin: 'top center',
                backfaceVisibility: 'hidden',
              }}
            >
              <span className="text-[7px] font-mono font-bold text-[#34d399] uppercase leading-none">
                MAY
              </span>
              <span className="text-[9.5px] font-mono font-extrabold text-[#f3f4f6] leading-none">
                '26
              </span>
            </div>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium hidden sm:inline">
            TIMELINE
          </span>
        </div>

        {/* Right side: Interactive Horizontal Career Timeline with mouse parallax */}
        <div
          className="relative w-36 h-12 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        >
          <svg
            viewBox="0 0 130 46"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="timeline-track-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#b7f52b" stopOpacity="1" />
              </linearGradient>
              <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Horizontal Track Line */}
            <line
              x1="14"
              y1="23"
              x2="114"
              y2="23"
              stroke="#1e293b"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Illuminated Progress Track when hovered */}
            <line
              x1="14"
              y1="23"
              x2="114"
              y2="23"
              stroke="url(#timeline-track-glow)"
              strokeWidth="2"
              strokeLinecap="round"
              className={isHovered ? 'timeline-progress-draw' : ''}
              strokeDasharray="100"
              strokeDashoffset={isHovered ? '0' : '60'}
              style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
            />

            {/* Start Node: May 2026 */}
            <g transform="translate(14, 23)">
              <circle cx="0" cy="0" r="4.5" fill="#0f172a" stroke="#64748b" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="2" fill="#94a3b8" />
              <text
                x="0"
                y="14"
                textAnchor="middle"
                fontSize="6"
                fontFamily="monospace"
                fill="#64748b"
              >
                START
              </text>
            </g>

            {/* Glowing Milestone Indicator moving towards "Present" */}
            <g
              className={isHovered ? 'timeline-packet-travel' : 'timeline-packet-rest'}
              transform="translate(14, 23)"
            >
              <circle
                cx="0"
                cy="0"
                r="4.5"
                fill="#b7f52b"
                opacity="0.3"
                filter="url(#packet-glow)"
                className="animate-pulse"
              />
              <circle cx="0" cy="0" r="2.5" fill="#b7f52b" />
            </g>

            {/* End Milestone Node: Present Position with Live Pulse */}
            <g transform="translate(114, 23)">
              {/* Outer Pulsing Beacon Rings (Active currently working status) */}
              <circle
                cx="0"
                cy="0"
                r="6"
                fill="none"
                stroke="#10b981"
                strokeWidth="1"
                className="timeline-beacon-ring"
              />
              <circle
                cx="0"
                cy="0"
                r="9"
                fill="none"
                stroke="#10b981"
                strokeWidth="0.8"
                className="timeline-beacon-ring ring-delayed"
              />

              {/* Present Node Core */}
              <circle cx="0" cy="0" r="5" fill="#064e3b" stroke="#10b981" strokeWidth="1.4" />
              <circle cx="0" cy="0" r="2.2" fill="#34d399" />

              <text
                x="0"
                y="14"
                textAnchor="middle"
                fontSize="6"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#10b981"
              >
                NOW
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Card Content (Preserved typography & details) */}
      <div className="mt-auto">
        <h3 className="text-xs font-bold text-[var(--text)] group-hover:text-[#10b981] transition-colors duration-200">
          May 2026 – Present
        </h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          <p className="text-[11px] text-[var(--text-muted)] leading-snug">
            Currently working
          </p>
        </div>
      </div>
    </div>
  );
}
