'use client';

import { useEffect, useState } from 'react';
import type { SiteSettings } from '@/lib/content';

export default function Nav({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroH = window.innerHeight;
      setScrolled(window.scrollY > heroH * 0.85);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-brand" style={{ visibility: 'hidden' }}>
          .
        </a>
        <div
          className={`menu-toggle${open ? ' active' : ''}`}
          onClick={() => setOpen((v) => !v)}
          role="button"
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      <div
        className={`nav-backdrop${open ? ' open' : ''}`}
        onClick={close}
      />

      <div className={`nav-overlay${open ? ' open' : ''}`}>
        <ul>
          {settings.navLinks.filter((l) => !l.hidden).map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link" onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-footer">
          {settings.navFooterLinks.map((link) => (
            <a key={link.label} href={link.url} onClick={close}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
