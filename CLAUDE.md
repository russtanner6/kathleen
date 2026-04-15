# Love Sophia Joy — Kathleen Newrones Website

## Project Overview
Personal website for Kathleen Newrones, a wholistic wellness healing artist based in Laguna Beach, CA. Brand name: **Love Sophia Joy**.

## Tech Stack (CURRENT — being replaced)
- **Single-page HTML** — all CSS and JS inline in `index.html`
- **Fonts**: Google Fonts (Cormorant Garamond, Inter)
- **Hosting**: Vercel (static site)
- **Repository**: https://github.com/russtanner6/kathleen.git
- **Domain**: lovesophiajoy.com (to be connected via Vercel once registrar credentials are available)

## Tech Stack (PLANNED — Next Session)
- **Next.js 14+ (App Router)** — Vercel's native framework
- **Tina CMS + Tina Cloud** — visual inline editing, free for 2 users (Russ + Kathleen)
- **Formspree** — contact form submissions (free tier, 50/month)
- **Content stored in Git** — Markdown/JSON files, version-controlled
- **Fonts**: Google Fonts (Cormorant Garamond, Inter) — unchanged
- **Hosting**: Vercel — unchanged

## NEXT SESSION: REBUILD TO NEXT.JS + TINA CMS

### What needs to happen
The entire site needs to be rebuilt from `index.html` into a Next.js app with Tina CMS. The visual design, animations, and functionality must be preserved exactly. The goal is to give Kathleen (non-technical client) the ability to edit the site herself through Tina's visual editor.

### Architecture decisions already made
1. **Tina Cloud** (not self-hosted) — simpler, free for 2 users, handles auth/backend automatically
2. **Formspree** for contact form — free tier, email notifications to Kathleen
3. **Flexible block-based page builder** — Kathleen should be able to reorder sections, add new ones, and have maximum CMS control. This means the homepage schema should use Tina's "block" field type so sections are modular and reorderable.
4. **Blog collection** — set up schema now, build blog template and listing page as part of the rebuild
5. **App Router** (not Pages Router)

### Build plan (execute in next session)

**Step 1: Scaffold**
- Initialize Next.js in project directory (replace current static HTML)
- Run `npx @tinacms/cli init` to add Tina
- Configure `tina/config.ts`

**Step 2: Content schema (`tina/config.ts`)**
Homepage uses flexible blocks so Kathleen can reorder sections:
- `heroBlock` — logo image, title, subtitle/mantra, background image
- `aboutBlock` — heading, photo, body paragraphs
- `offeringsBlock` — section title, array of cards (icon, title, description, CTA)
- `wholenessBlock` — heading, body, quote text, CTA button text
- `earthStripBlock` — array of elements (emoji, label)
- `testimonialsBlock` — section title, array of items (quote, author)
- `creationsBlock` — section title, array of items (title, description, visual style)
- `contactBlock` — email, social links array, Formspree form ID

Blog collection (`content/blog/*.md`):
- title, date, author, featured image, body (rich text), excerpt

**Step 3: React components**
Convert each HTML section to a component:
- `components/Nav.tsx` — hamburger + slide-out panel
- `components/Hero.tsx` — parallax hero
- `components/About.tsx` — photo + bio grid
- `components/Offerings.tsx` — horizontal scroll cards
- `components/Wholeness.tsx` — centered quote + CTA
- `components/EarthStrip.tsx` — elemental icons
- `components/Testimonials.tsx` — 2-column grid
- `components/Creations.tsx` — 3-column cards
- `components/Contact.tsx` — Formspree form + social links
- `components/Footer.tsx`
- `components/ScrollReveal.tsx` — IntersectionObserver wrapper
- `components/BlockRenderer.tsx` — maps block types to components

**Step 4: Port all CSS**
- Move to `app/globals.css` or CSS Modules
- Preserve exact colors, typography, layout, spacing, animations
- Keep: fadeUp, scrollPulse, parallax, scroll-reveal, hamburger menu

**Step 5: Wire Tina visual editing**
- Each component reads from Tina data props
- In edit mode, fields are click-to-edit inline
- Changes commit to GitHub via Tina Cloud

**Step 6: Formspree contact form**
- Create Formspree project, get endpoint
- Wire form to POST to Formspree
- Kathleen gets email notifications

**Step 7: Blog pages**
- `/app/blog/page.tsx` — blog listing page
- `/app/blog/[slug]/page.tsx` — individual blog post template
- Kathleen can create posts from Tina admin

**Step 8: Tina Cloud setup**
- Create Tina Cloud account at tina.io
- Register the project, connect GitHub repo
- Create logins for Russ and Kathleen
- Set environment variables in Vercel

**Step 9: Deploy and verify**
- Push to GitHub → Vercel auto-deploys
- Verify site looks identical to current version
- Verify Tina editor works at `/admin`
- Verify Formspree form delivers emails
- Test Kathleen's editing workflow

### What Kathleen can do herself (via Tina)
- Edit all text on every section
- Swap/upload images (hero, about photo, logo, blog images)
- Add/remove/reorder offering cards
- Add/remove/reorder testimonials
- Reorder homepage sections (flexible blocks)
- Update social links and contact email
- Write and publish blog posts
- Upload images to media library

### What requires developer (Russ) involvement
- Adding entirely new section/block types
- Changing visual design (colors, fonts, animations, layout CSS)
- Adding new features (shop, booking calendar, etc.)
- Creating new page templates/routes
- Tina schema changes

## Current Design
- Dark theme with gold (#D4A017) accent color palette
- Slide-out navigation panel from right (light beach palette, emerald text)
- Horizontal scroll card section for offerings (11 modalities)
- Scroll-reveal animations via IntersectionObserver
- Parallax effects on hero and section numbers
- Responsive (mobile breakpoints at 768px and 600px)

## Sections (current)
1. **Hero** — ocean background, logo, tagline "LET TRUE LIGHT LEAD THE WAY TO MIRACLES EVERY DAY"
2. **About** — photo + bio of Kathleen
3. **Offerings** — 11 horizontal-scroll cards
4. **Sessions (Wholeness)** — centered quote + CTA
5. **Earth Strip** — elemental icons band (Citrine Sun, Sapphire Ocean, Gold Sand, Lush Life, Free Spirit)
6. **Testimonials** — 4 client testimonials in 2-column grid
7. **Creations** — Sacred Music, Visionary Writing, Essential Oil Blends
8. **Contact** — email (info@lovesophiajoy.com), form, social links
9. **Footer**

## Key Info
- **Client email**: info@lovesophiajoy.com
- **YouTube**: @lovesophiajoy777
- **Domains of interest**: lovesophiajoy.com, lovesophiajoy.love, lovesophiajoy.org
- **Images currently hosted at**: russtanner.xyz (ocean.jpg, kathleen.jpeg, logo.png) — move to /public/images/ during rebuild
- **GitHub**: https://github.com/russtanner6/kathleen.git
- **Vercel project**: Kathleen

## Client Design Notes
See `notes.md` for raw client notes including:
- Brand direction (24-carat gold, umbrella brand LOVE SOPHIA JOY)
- Mantra styling preferences
- Nav dropdown styling (light sun beach palette, mid-emerald text)
- Future plans: book of poetry, book of love letters
- Logo concept: heart with diamond, 24-carat gold
- Service categories: Energy Work, Art, Resources
- "A Wholelistic Wellness & Healing Arts Ministry" as site description

## Device Paths
- **Mac Studio**: `/Users/rmt-mac-studio/Projects/Kathleen`
