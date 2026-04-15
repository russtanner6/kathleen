# Love Sophia Joy — Session Log

## 2026-04-14 — Initial Setup
- Created `index.html` from Siteground source, removed Cloudflare email obfuscation
- Restored real mailto link (info@lovesophiajoy.com)
- Initialized git repo, pushed to https://github.com/russtanner6/kathleen
- Created `CLAUDE.md` project documentation
- Created `notes.md` with client design/planning notes
- Vercel project created (awaiting domain connection for lovesophiajoy.com)

## 2026-04-15 — CMS Planning & Architecture Decisions
### Problem
Kathleen (non-technical client) needs to edit the website herself: change images, modify text, reorder sections, manage a blog, and eventually add shopping.

### Options evaluated
1. **Next.js + Sanity** — powerful, flexible, but Sanity's editor is dashboard-based (not inline/visual)
2. **Next.js + Tina CMS** — visual inline editing directly on the page, great for non-technical users
3. **Next.js + Decap CMS** — lightweight, but less polished editing experience
4. **Astro + CMS** — simpler framework, but less ecosystem support for future features
5. **WordPress on Vercel** — rejected, too heavy

### Decision: Next.js + Tina CMS + Tina Cloud
- **Tina CMS** chosen for its visual/inline editing — Kathleen can click on text and images to edit them directly on the page
- **Tina Cloud** (not self-hosted) — free for 2 users (Russ + Kathleen), handles auth and backend automatically
- **Formspree** for contact form — free tier (50 submissions/month), sends email notifications
- **Flexible block-based homepage** — sections are modular blocks that Kathleen can reorder via the editor
- **Blog collection** — schema defined now, full blog (listing + post pages) built as part of rebuild

### Editing experience documented for client
- **Change picture**: Click image → sidebar shows upload field → pick file → save
- **Change text**: Click text → sidebar opens rich text editor → type changes → save
- **Reorder sections**: Drag and drop blocks in sidebar
- **Add/remove offerings or testimonials**: Add/remove items from array fields in sidebar
- **Blog posts**: Click "New Post" in Tina admin, write in rich text editor, publish
- **New page layouts**: Requires developer (Russ) to create template first, then Kathleen fills content
- **New section types**: Requires developer to create component + schema, then Kathleen can use it

### Files in repo
- `index.html` — current live site (will be replaced by Next.js app)
- `CLAUDE.md` — full project docs including detailed rebuild plan for next session
- `SESSION-LOG.md` — this file
- `notes.md` — raw client design notes

### Next session action
**Execute the full rebuild**: scaffold Next.js + Tina, build all components, port CSS, wire Tina Cloud, set up Formspree, deploy. See CLAUDE.md for the complete step-by-step plan.
