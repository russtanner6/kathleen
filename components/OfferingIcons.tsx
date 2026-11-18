import type { ReactElement } from 'react';

/**
 * SVG icons for offering cards. Keys correspond to the `icon` field in home.json.
 * Keeping these as a map makes cards editable via JSON (icon name) without needing
 * Kathleen to paste raw SVG.
 */
const ICONS: Record<string, ReactElement> = {
  sound: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <path d="M11 16c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <circle cx="16" cy="16" r="2" />
      <path d="M16 18v8" />
      <path d="M12 26h8" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3c0 6-7 9-7 16a7 7 0 0014 0c0-3-2-5-3-7 0 3-2 5-4 5s-3-2-3-5c0-2 3-5 3-9z" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="16" cy="6" r="3" />
      <path d="M16 9v6" />
      <path d="M10 28l3-10h6l3 10" />
      <circle cx="16" cy="18" r="2" strokeDasharray="2 2" />
      <path d="M8 6h2M22 6h2M4 16h3M25 16h3" opacity="0.4" />
    </svg>
  ),
  divination: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="16" cy="14" r="9" />
      <path d="M10 25h12" />
      <path d="M12 28h8" />
      <path d="M16 8v2M12 10l1 1M20 10l-1 1" opacity="0.5" />
      <circle cx="16" cy="14" r="3" strokeDasharray="2 1.5" />
    </svg>
  ),
  coaching: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 28V15" />
      <path d="M16 20c-4-1-7-5-7-9 4 0 7 3 7 7" />
      <path d="M16 15c4-1 7-5 7-9-4 0-7 3-7 7" />
    </svg>
  ),
  reiki: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18c0-2 2-4 5-4 2 0 3 1 5 1s3-1 5-1c3 0 5 2 5 4v2c0 3-4 7-10 9C10 27 6 23 6 20v-2z" />
      <path d="M16 8v3M12 9l1 2M20 9l-1 2" opacity="0.5" />
      <circle cx="16" cy="5" r="1.5" fill="#D4A017" opacity="0.3" />
    </svg>
  ),
  constellations: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="16" cy="8" r="3" />
      <circle cx="7" cy="22" r="3" />
      <circle cx="25" cy="22" r="3" />
      <path d="M14 10.5L9 19.5" />
      <path d="M18 10.5l5 9" />
      <path d="M10 22h12" strokeDasharray="2 2" />
    </svg>
  ),
  quantum: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round">
      <ellipse cx="16" cy="16" rx="12" ry="5" />
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(120 16 16)" />
      <circle cx="16" cy="16" r="2" fill="#D4A017" opacity="0.4" />
    </svg>
  ),
  meditation: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 26c-3-2-6-5-6-9 0-3 2-5 4-6 1.3-.6 2-.5 2 1" />
      <path d="M16 26c3-2 6-5 6-9 0-3-2-5-4-6-1.3-.6-2-.5-2 1" />
      <path d="M16 12c-1-4-4-7-7-8 0 4 2 7 5 9" />
      <path d="M16 12c1-4 4-7 7-8 0 4-2 7-5 9" />
      <path d="M8 27h16" opacity="0.3" />
    </svg>
  ),
  oils: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4c-3 5-8 9-8 15a8 8 0 0016 0c0-6-5-10-8-15z" />
      <path d="M13 20c0 2 1.5 3 3 3s3-1 3-3" opacity="0.4" />
    </svg>
  ),
  retreats: (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="16" cy="16" r="10" strokeDasharray="3 2" />
      <circle cx="16" cy="9" r="2" />
      <circle cx="10" cy="20" r="2" />
      <circle cx="22" cy="20" r="2" />
      <path d="M16 11v3M11.5 19l3-2M20.5 19l-3-2" opacity="0.4" />
    </svg>
  ),
};

export function OfferingIcon({ name }: { name: string }) {
  return ICONS[name] ?? ICONS.sound;
}

export const CREATION_ICONS: Record<string, ReactElement> = {
  music: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 48V20l20-6v28" />
      <circle cx="20" cy="48" r="4" />
      <circle cx="40" cy="42" r="4" />
      <path d="M24 30l20-6" opacity="0.4" />
      <path d="M14 18c2-3 5-4 8-4" opacity="0.3" />
      <path d="M50 12c-2-3-5-4-8-4" opacity="0.3" />
    </svg>
  ),
  writing: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 8c4 4 4 10 0 14L22 40l-8 2 2-8L34 16" />
      <path d="M34 16l6-2c2-1 4 0 6 2" />
      <path d="M22 40l-4 4" />
      <path d="M14 52h28" opacity="0.3" />
      <path d="M16 16c0-4 3-7 7-8" opacity="0.25" />
    </svg>
  ),
  oils: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#D4A017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="24" y="24" width="16" height="26" rx="3" />
      <path d="M28 24v-6a4 4 0 018 0v6" />
      <path d="M30 14h4v-2a2 2 0 00-4 0v2z" fill="#D4A017" opacity="0.2" />
      <path d="M28 36h8" opacity="0.3" />
      <path d="M28 40h8" opacity="0.3" />
      <circle cx="32" cy="32" r="1" fill="#D4A017" opacity="0.4" />
      <path d="M20 54c3-2 5-2 8 0s5 2 8 0 5-2 8 0" opacity="0.25" />
      <path d="M44 34c3 1 5 3 5 6" opacity="0.2" />
      <path d="M20 34c-3 1-5 3-5 6" opacity="0.2" />
    </svg>
  ),
};
