import { useState, useEffect } from 'react';
import SceneErrorBoundary from './SceneErrorBoundary';
import HeroScene from './HeroScene';

type HeroVisualProps = {
  theme?: 'light' | 'dark';
};

const techStack = ['React', 'Next.js', 'Node.js', 'Java', 'Spring Boot'];

function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function shouldEnable3D(): boolean {
  if (typeof window === 'undefined') return false;
  if (!isWebGLAvailable()) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

export default function HeroVisual({ theme = 'dark' }: HeroVisualProps) {
  const [shouldLoad3D, setShouldLoad3D] = useState(() => shouldEnable3D());
  const [hasWebGLError, setHasWebGLError] = useState(false);

  // Monitor prefers-reduced-motion dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setShouldLoad3D(shouldEnable3D());
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const show3D = shouldLoad3D && !hasWebGLError;

  return (
    <div
      className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center select-none"
      data-testid="hero-visual"
    >
      {/* Background Orbital Guide Rings and Ambient Glow (Always present underneath 3D scene) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Subtle Faint Crosshairs */}
        <span className="absolute top-6 right-12 text-[var(--border-strong)] text-lg font-mono select-none">+</span>
        <span className="absolute bottom-12 left-6 text-[var(--border-strong)] text-lg font-mono select-none">+</span>

        {/* Ambient Radial Glow */}
        <div
          className={`absolute w-3/4 h-3/4 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
            theme === 'dark' ? 'bg-[#B7F52B]/20' : 'bg-[#B7F52B]/15'
          }`}
        />
        {/* Subtle Orbital Geometry Guides */}
        <div className="absolute w-[92%] h-[92%] rounded-full border border-[var(--border)] opacity-60" />
        <div className="absolute w-[76%] h-[76%] rounded-full border border-[var(--border)] border-dashed opacity-40 rotate-12" />

        {/* Center Lime Core Ambient Glow (Underneath central sphere) */}
        <div className="absolute w-28 h-28 rounded-full bg-[#B7F52B]/25 blur-xl pointer-events-none" />
      </div>

      {/* Primary 3D WebGL Orbital Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {show3D ? (
          <SceneErrorBoundary onError={() => setHasWebGLError(true)}>
            <HeroScene
              onContextLost={() => setHasWebGLError(true)}
              onContextRestored={() => setHasWebGLError(false)}
            />
          </SceneErrorBoundary>
        ) : (
          /* Static non-animated representation for reduced-motion or WebGL failure */
          <div
            className="relative w-full h-full flex items-center justify-center select-none pointer-events-none"
            data-testid="hero-static-fallback"
          >
            <div className="w-24 h-24 rounded-full bg-[#B7F52B] shadow-[0_0_40px_#B7F52B] opacity-75" />
          </div>
        )}
      </div>

      {/* Floating Code Bracket Stack */}
      <div className="absolute right-0 sm:right-2 bottom-12 sm:bottom-16 z-20 font-mono text-xs sm:text-[13px] leading-relaxed select-none pointer-events-none bg-[var(--bg-card)]/80 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-2 sm:p-0 rounded-lg sm:rounded-none border border-[var(--border)] sm:border-0 shadow-2xs sm:shadow-none">
        <div className="text-[var(--text)] font-semibold mb-0.5">{'{'}</div>
        <div className="pl-3.5 flex flex-col gap-0.5 text-[var(--text-muted)] font-medium">
          {techStack.map((tech) => (
            <span key={tech} className="hover:text-[var(--text)] transition-colors">
              {tech}
            </span>
          ))}
        </div>
        <div className="text-[var(--text)] font-semibold mt-0.5">{'}'}</div>
      </div>
    </div>
  );
}
