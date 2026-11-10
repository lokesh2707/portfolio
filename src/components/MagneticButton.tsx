import React, { useRef, useEffect } from 'react';

type MagneticButtonProps = {
  children: React.ReactElement;
  distance?: number;
  className?: string;
};

/**
 * Subtle Magnetic Button wrapper for desktop pointer devices.
 * Applies a restrained 4-8px magnetic attraction toward the mouse pointer
 * with smooth easing on approach and a graceful return on pointer leave.
 * Automatically disabled on touchscreens, mobile devices, and reduced-motion environments.
 */
export default function MagneticButton({
  children,
  distance = 6,
  className = '',
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || !canHover || reducedMotion) {
      return;
    }

    let isInside = false;

    const handleMove = (e: MouseEvent | PointerEvent) => {
      if ('pointerType' in e && (e.pointerType === 'touch' || e.pointerType === 'pen')) return;
      isInside = true;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Subtle proportional displacement toward pointer
      const deltaX = (e.clientX - centerX) * 0.22;
      const deltaY = (e.clientY - centerY) * 0.22;

      // Clamp movement within restrained bounds (4-8px)
      const clampedX = Math.max(-distance, Math.min(distance, deltaX));
      const clampedY = Math.max(-distance, Math.min(distance, deltaY));

      el.style.transform = `translate3d(${clampedX.toFixed(2)}px, ${clampedY.toFixed(2)}px, 0)`;
      el.style.transition = 'transform 0.12s ease-out';
    };

    const handleLeave = () => {
      if (!isInside) return;
      isInside = false;

      // Smooth restoration to origin
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)';
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
  }, [distance]);

  return (
    <div
      ref={containerRef}
      className={`inline-block will-change-transform ${className}`}
      data-magnetic="true"
    >
      {children}
    </div>
  );
}
