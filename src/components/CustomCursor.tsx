import { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'skill' | 'button' | 'hidden';

/**
 * Premium Context-Aware Custom Cursor for desktop devices.
 * Features:
 * - Two-layer cursor: precision lime-green inner dot + smooth spring-delayed outer ring.
 * - Context-aware morphing:
 *   - Normal content & project cards: standard 8px dot + 32px translucent ring.
 *   - Technology cards (.skill-card): expanded ring + lime-green glow + magnetic pull.
 *   - Buttons & interactive links: expanded ring + magnetic attraction + dot scale.
 *   - Form inputs & textfields: hidden to preserve native text cursor.
 * - Click ripple effect on mousedown.
 * - Restrained magnetic attraction in the RAF render loop.
 * - Disabled on touchscreens, mobile devices, and reduced-motion environments.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const [isSupported, setIsSupported] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || !canHover || prefersReducedMotion) {
      return;
    }

    setIsSupported(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let targetMagneticElement: HTMLElement | null = null;
    let animationFrameId: number;
    let hasMoved = false;

    // Mouse Move: update target coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
        ringX = mouseX;
        ringY = mouseY;
      }

      // Fast, zero-lag positioning of the inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      if (hasMoved) {
        setIsVisible(true);
      }
    };

    // Click Ripple Effect
    const handleMouseDown = (e: MouseEvent) => {
      if (!rippleRef.current) return;
      const ripple = rippleRef.current;
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.classList.remove('cursor-ripple-active');
      // Trigger reflow to restart CSS animation cleanly
      void ripple.offsetWidth;
      ripple.classList.add('cursor-ripple-active');
    };

    // Context-Aware Target Detection via Event Delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Text inputs / textareas / contenteditable: hide custom cursor
      if (target.closest('input, textarea, select, [contenteditable]')) {
        targetMagneticElement = null;
        setCursorMode('hidden');
        return;
      }

      // 2. Clickable Buttons, Navigation Links & Magnetic Wrappers
      const clickable = target.closest<HTMLElement>('a, button, [role="button"], [data-magnetic]');
      if (clickable) {
        targetMagneticElement = clickable;
        setCursorMode('button');
        return;
      }

      // 3. Technology Cards: expanded ring + lime glow + magnetic attraction
      const skillCard = target.closest<HTMLElement>('.skill-card, [data-cursor="skill"]');
      if (skillCard) {
        targetMagneticElement = skillCard;
        setCursorMode('skill');
        return;
      }

      // Default state over standard page content & project cards
      targetMagneticElement = null;
      setCursorMode('default');
    };

    // 60-120fps Smooth Spring-delayed follower loop with magnetic attraction
    const render = () => {
      let targetX = mouseX;
      let targetY = mouseY;

      // Subtle magnetic pull toward interactive element center
      if (targetMagneticElement) {
        const rect = targetMagneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - mouseX;
        const dy = centerY - mouseY;

        // Restrain magnetic displacement (max ±7px)
        const pullFactor = 0.18;
        const pullX = Math.max(-7, Math.min(7, dx * pullFactor));
        const pullY = Math.max(-7, Math.min(7, dy * pullFactor));

        targetX = mouseX + pullX;
        targetY = mouseY + pullY;
      }

      // Natural spring-like lerp interpolation
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isSupported) return null;

  // Context-aware dynamic styles for outer ring & inner dot
  const isHidden = cursorMode === 'hidden' || !isVisible;
  const isButton = cursorMode === 'button';
  const isSkill = cursorMode === 'skill';

  return (
    <div
      data-cursor-root="true"
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-250 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Precision Inner Lime Dot */}
      <div
        ref={dotRef}
        data-cursor-dot="true"
        className={`fixed top-0 left-0 rounded-full bg-[#B7F52B] shadow-[0_0_8px_#B7F52B] pointer-events-none will-change-transform transition-[width,height,margin,opacity,transform] duration-200 ease-out ${
          isButton
            ? 'w-2.5 h-2.5 -ml-1.25 -mt-1.25 opacity-100 scale-125'
            : isSkill
            ? 'w-2 h-2 -ml-1 -mt-1 opacity-100'
            : 'w-2 h-2 -ml-1 -mt-1 opacity-100'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />

      {/* Smooth Context-Aware Follower Ring */}
      <div
        ref={ringRef}
        data-cursor-ring="true"
        data-cursor-mode={cursorMode}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform flex items-center justify-center transition-[width,height,margin,border-color,background-color,box-shadow,transform] duration-250 ease-out ${
          isButton
            ? 'w-[52px] h-[52px] -ml-[26px] -mt-[26px] border border-[#B7F52B]/80 bg-[#B7F52B]/15 shadow-[0_0_20px_rgba(183,245,43,0.3)]'
            : isSkill
            ? 'w-[48px] h-[48px] -ml-[24px] -mt-[24px] border border-[#B7F52B]/70 bg-[#B7F52B]/10 shadow-[0_0_18px_rgba(183,245,43,0.25)]'
            : 'w-8 h-8 -ml-4 -mt-4 border border-[#B7F52B]/45 bg-[#B7F52B]/5 shadow-[0_0_10px_rgba(183,245,43,0.15)]'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />

      {/* Expanding Click Ripple Ring */}
      <div
        ref={rippleRef}
        data-cursor-ripple="true"
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#B7F52B] opacity-0 will-change-transform"
      />
    </div>
  );
}
