'use client';

import { useEffect } from 'react';

/**
 * Client-side scroll effects:
 *  - IntersectionObserver reveals .reveal elements
 *  - Hero content parallax + opacity
 *  - Section-number parallax
 *  - Hides the scroll indicator after a small scroll
 */
export default function ScrollEffects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    const heroContent = document.querySelector<HTMLElement>('.hero-content');
    const heroSection = document.querySelector<HTMLElement>('.hero');
    const sectionNumbers = document.querySelectorAll<HTMLElement>(
      '.section-number[data-parallax]'
    );
    const scrollIndicator = document.querySelector('.scroll-indicator');

    let ticking = false;

    function onScroll() {
      const scrollY = window.scrollY;
      const heroH = heroSection?.offsetHeight ?? window.innerHeight;

      if (scrollIndicator) {
        scrollIndicator.classList.toggle('hidden', scrollY > 30);
      }

      if (heroContent && scrollY <= heroH) {
        const offset = scrollY * 0.35;
        heroContent.style.transform = `translateY(${offset}px)`;
        heroContent.style.opacity = String(1 - (scrollY / heroH) * 0.6);
      }

      sectionNumbers.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax') ?? '0');
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const distFromCenter = rect.top - window.innerHeight * 0.7;
          el.style.transform = `translateY(${distFromCenter * speed}px)`;
        }
      });

      ticking = false;
    }

    function handler() {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', handler, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', handler);
      observer.disconnect();
    };
  }, []);

  return null;
}
