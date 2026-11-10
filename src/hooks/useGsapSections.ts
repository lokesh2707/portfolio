import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGsapSections() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      // Debounced ScrollTrigger recalculations on window resize
      let timer: number | undefined;
      const handleResize = () => {
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        if (timer) clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.warn('GSAP sections handler failed to initialize:', error);
    }
  }, []);
}
