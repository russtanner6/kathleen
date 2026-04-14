# Love Sophia Joy — Kathleen Newrones Website

## Project Overview
Personal website for Kathleen Newrones, a wholistic wellness healing artist based in Laguna Beach, CA. Brand name: **Love Sophia Joy**.

## Tech Stack
- **Single-page HTML** — all CSS and JS inline in `index.html`
- **Fonts**: Google Fonts (Cormorant Garamond, Inter)
- **No build step** — static HTML deployed directly
- **Hosting**: Vercel (static site)
- **Repository**: https://github.com/russtanner6/kathleen.git
- **Domain**: lovesophiajoy.com (to be connected via Vercel once registrar credentials are available)

## Architecture
- `index.html` — the entire website (single file, no dependencies)
- Static assets (images, logo) currently hosted externally on `russtanner.xyz`
- Contact form is front-end only (no backend — button does nothing yet)
- Social links (YouTube, Instagram, Facebook) are placeholder `#` links

## Design
- Dark theme with gold (#D4A017) accent color palette
- Slide-out navigation panel from right
- Horizontal scroll card section for offerings (11 modalities)
- Scroll-reveal animations via IntersectionObserver
- Parallax effects on hero and section numbers
- Responsive (mobile breakpoints at 768px and 600px)

## Sections
1. **Hero** — ocean background, logo, tagline
2. **About** — photo + bio of Kathleen
3. **Offerings** — 11 horizontal-scroll cards (Sound Healing, Shamanic Healing, Human Design, Divination, Coaching, Reiki, Family Constellations, Quantum Field Healing, Meditation, Essential Oils, Events & Retreats)
4. **Sessions (Wholeness)** — centered quote + CTA
5. **Earth Strip** — elemental icons band
6. **Testimonials** — 4 client testimonials in 2-column grid
7. **Creations** — Sacred Music, Visionary Writing, Essential Oil Blends
8. **Contact** — email (info@lovesophiajoy.com), form, social links
9. **Footer**

## Current State (2026-04-14)
- Initial deployment to Vercel via GitHub
- Previously hosted on Siteground (Cloudflare email obfuscation removed)
- Contact form has no backend — "Send With Love" button is non-functional
- Social media links are placeholder (#)
- Images served from russtanner.xyz (should eventually be moved to local/CDN)

## TODO
- [ ] Connect lovesophiajoy.com domain in Vercel (waiting for registrar credentials)
- [ ] Add backend for contact form (or integrate a form service like Formspree)
- [ ] Update social media links with real URLs
- [ ] Move images to local repo or CDN instead of russtanner.xyz
- [ ] Add meta tags for SEO and social sharing (Open Graph, Twitter cards)
- [ ] Add favicon

## Device Paths
- **Mac Studio**: `/Users/rmt-mac-studio/Projects/Kathleen`
