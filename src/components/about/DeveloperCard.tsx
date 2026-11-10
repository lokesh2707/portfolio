import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function DeveloperCard() {
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
      aria-label="Role: Full Stack Developer at Ratnam Solutions Private Limited"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="about-card group relative p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xs hover:border-[var(--border-strong)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:border-[#38bdf8] cursor-pointer select-none flex flex-col justify-between h-full min-h-[148px]"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#38bdf8]/5 blur-2xl transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0.2 }}
      />

      {/* Miniature Visual Stage (h-14) */}
      <div className="w-full h-14 relative flex items-center justify-between rounded-lg bg-[var(--bg-subtle)]/40 border border-[var(--border)]/40 px-3 overflow-hidden mb-2.5">
        {/* Left side pill badge */}
        <div className="flex items-center gap-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium">
            ENGINEERING
          </span>
        </div>

        {/* Right side interactive developer with mouse parallax */}
        <div
          className="relative w-32 h-12 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          }}
        >
          <svg
            viewBox="0 0 120 48"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="dev-screen-glow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#b7f52b" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Desk Surface */}
            <line x1="24" y1="42" x2="108" y2="42" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />

            {/* Chair Backrest */}
            <path d="M 28 24 Q 26 38 30 42" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Developer Person */}
            <g transform="translate(10, 0)">
              {/* Head & Hair */}
              <circle cx="28" cy="20" r="4.5" fill="#e2e8f0" />
              {/* Modern Cyber Headphone Band */}
              <path d="M 25 18 A 4 4 0 0 1 31 18" stroke="#38bdf8" strokeWidth="1.2" fill="none" />
              <rect x="23.5" y="18.5" width="2" height="3" rx="1" fill="#38bdf8" />

              {/* Torso */}
              <path
                d="M 23 26 C 23 24, 33 24, 33 26 L 35 41 L 22 41 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="0.8"
              />

              {/* Arm & Typing Hands */}
              {/* Upper Arm */}
              <path d="M 29 27 L 38 34" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

              {/* Left Hand (Tapping) */}
              <path
                d="M 38 34 L 46 39"
                stroke="#94a3b8"
                strokeWidth="1.8"
                strokeLinecap="round"
                className={isHovered ? 'dev-typing-left' : ''}
              />

              {/* Right Hand (Tapping) */}
              <path
                d="M 37 35 L 48 38.5"
                stroke="#cbd5e1"
                strokeWidth="1.8"
                strokeLinecap="round"
                className={isHovered ? 'dev-typing-right' : ''}
              />
            </g>

            {/* Laptop */}
            <g transform="translate(10, 0)">
              {/* Laptop Base (Keyboard) */}
              <path d="M 52 42 L 72 42 L 70 39 L 55 39 Z" fill="#334155" stroke="#475569" strokeWidth="0.6" />

              {/* Laptop Screen (Angled back) */}
              <polygon
                points="70,39 82,23 96,23 84,39"
                fill="#090d16"
                stroke="#38bdf8"
                strokeWidth="1"
                strokeLinejoin="round"
              />

              {/* Changing Code Lines on Screen */}
              <g className={isHovered ? 'dev-code-scrolling' : ''}>
                {/* Code line 1 - Lime */}
                <line x1="77" y1="27" x2="88" y2="27" stroke="#b7f52b" strokeWidth="1.2" strokeLinecap="round" />
                {/* Code line 2 - Cyan */}
                <line x1="75" y1="30" x2="84" y2="30" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
                {/* Code line 3 - Purple */}
                <line x1="73" y1="33" x2="86" y2="33" stroke="#c084fc" strokeWidth="1.2" strokeLinecap="round" />
                {/* Code line 4 - Cyan */}
                <line x1="71" y1="36" x2="79" y2="36" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
              </g>

              {/* Screen Ambient Light Cone */}
              <polygon
                points="70,39 82,23 96,23 84,39"
                fill="url(#dev-screen-glow)"
                opacity={isHovered ? 0.35 : 0.15}
                className="transition-opacity duration-300"
              />
            </g>

            {/* Floating Programming Symbols: { }, </>, 01 */}
            {isHovered && (
              <g className="dev-floating-symbols">
                {/* Symbol 1: Curly Braces { } */}
                <text
                  x="86"
                  y="20"
                  fill="#b7f52b"
                  fontSize="7"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="dev-symbol dev-symbol-1"
                >
                  {'{ }'}
                </text>

                {/* Symbol 2: Tag </> */}
                <text
                  x="96"
                  y="16"
                  fill="#38bdf8"
                  fontSize="7"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="dev-symbol dev-symbol-2"
                >
                  {'</>'}
                </text>

                {/* Symbol 3: Binary 01 */}
                <text
                  x="78"
                  y="14"
                  fill="#c084fc"
                  fontSize="6.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                  className="dev-symbol dev-symbol-3"
                >
                  01
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Card Content (Preserved typography & details) */}
      <div className="mt-auto">
        <h3 className="text-xs font-bold text-[var(--text)] group-hover:text-[#38bdf8] transition-colors duration-200">
          Full Stack Developer
        </h3>
        <p className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate leading-snug">
          Ratnam Solutions Private Limited
        </p>
      </div>
    </div>
  );
}
