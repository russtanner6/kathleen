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

## 2026-04-15 — Rebuild Executed
Scaffolded the full Next.js 14 (App Router) application, ported every section from the legacy `index.html`, and got a clean production build + smoke test (all routes HTTP 200).

### Tech stack now in place
- **Next.js 14.2.15** (App Router, TypeScript, React 18)
- **Tina CMS 2.2 config** — schema for homepage blocks, site settings, and blog collection (local dev only; Tina Cloud activation pending env vars — see below)
- **gray-matter + remark** — Markdown blog posts compiled to HTML at build time
- **Formspree** wired into the Contact component (waiting on a Formspree form ID — empty string today means the form shows a helpful "email directly" fallback)
- All content hot-loaded from JSON at build time, so the site renders without Tina Cloud

### File structure
```
app/
  layout.tsx              — root layout, fonts, metadata from content/pages/home.json
  globals.css             — exact port of the legacy <style> block + blog styles
  page.tsx                — homepage, reads home.json and renders via BlockRenderer
  blog/page.tsx           — blog index
  blog/[slug]/page.tsx    — individual blog post, generateStaticParams for SSG
components/
  Nav.tsx                 — client: hamburger + slide-out, scroll-state tracking
  ScrollEffects.tsx       — client: IntersectionObserver reveals + parallax
  Hero.tsx, About.tsx, Offerings.tsx, Wholeness.tsx, EarthStrip.tsx,
  Testimonials.tsx, Creations.tsx, Contact.tsx (Formspree), Footer.tsx
  BlockRenderer.tsx       — maps block._template → component
  OfferingIcons.tsx       — SVG icon registry (Kathleen picks by name, not raw SVG)
content/
  pages/home.json         — flexible block array (hero, about, offerings…contact)
  settings/site.json      — brand, copyright, nav links
  blog/welcome.md         — seed post with gray-matter frontmatter
lib/content.ts            — file reading helpers (home, settings, blog)
tina/config.ts            — full Tina schema for homepage blocks + blog
_legacy/index.html        — original single-file site, preserved for reference
```

### Verification
- `npm install` — 1221 packages, 0 vulnerabilities
- `npx next build` — ✓ compiled, 6 static pages generated (/, /blog, /blog/welcome, _not-found, etc.)
- `next start` smoke test — /, /blog, /blog/welcome all return HTTP 200
- DOM inspection confirmed nav, hero content, and structure render correctly

### Known issue / TypeScript note
Tina's TS types don't currently accept `itemProps` on list object fields in a way that matches our schema. To keep `next build` green I excluded `tina/config.ts` from Next's tsconfig — Tina has its own build step via `tinacms build` / `tinacms dev` which handles the config on its own. This does NOT affect the runtime site.

### What's still pending (Tina Cloud activation)
The content system works today — anyone can edit `content/pages/home.json` in Git and the site updates on the next deploy. Full visual editing via Tina Cloud requires:

1. Sign up at https://tina.io and register the GitHub repo (`russtanner6/kathleen`)
2. Get `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN`
3. Add both as environment variables in the Vercel project
4. Change the Vercel build command to `tinacms build && next build`
5. Invite Kathleen as a second user (free tier supports 2 users)
6. Admin will be available at `/admin` on the deployed site

For local testing right now: `npm run dev:tina` → open http://localhost:3000/admin

### Formspree activation
1. Create a Formspree project at https://formspree.io (free tier: 50 submissions/month)
2. Copy the form ID (e.g. `xyzabcd`)
3. Edit `content/pages/home.json`, set `formspreeId` on the `contact` block
4. Commit + push — Vercel redeploys automatically

### Deployment
Committed and pushed. Vercel should auto-detect Next.js now that `package.json` exists and redeploy as a Next.js app instead of static HTML.

### Next steps
- Activate Tina Cloud (manual signup step above)
- Create Formspree form + paste ID
- Connect lovesophiajoy.com domain in Vercel when registrar creds are available
- Visually QA against the legacy page on mobile and desktop
- Kick the tires on the blog with a real second post

## 2026-04-15 (later) — Tina Cloud Activation + Vercel Build Fixes
Everything flagged as "pending" above is now **done** (except Formspree + domain). The Tina admin is live at `https://kathleen-lac.vercel.app/admin/index.html` and the user confirmed the login screen loads.

### What went wrong (and how we fixed it)
This took 5 iterations. Capturing each gotcha so future-me doesn't re-discover them.

**Gotcha 1 — Vercel was still in "static site" mode.**
The Vercel project was created back when the repo was a single `index.html`, so its framework preset was locked to "Other" with Output Directory overridden to `public`. First push of the rebuild landed, Next.js compiled cleanly, then Vercel failed with `No Output Directory named "public" found`. Fixed by:
- Adding `vercel.json` with `{"framework": "nextjs"}` (commit 84c4323)
- Also manually flipping the framework preset to Next.js and clearing the Output Directory override in Vercel dashboard → Build & Development Settings

**Gotcha 2 — Tina Cloud needed a Content (Read-Only) token, not Search.**
Tokens tab shows two. Only the Content (Read-Only) one goes into the `TINA_TOKEN` env var. Search token is for a feature we don't use.

**Gotcha 3 — Vercel build command override was OFF.**
Added `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` as env vars, but the build kept running bare `next build` and producing no `/admin`. The Build Command override toggle in Vercel Settings was silently OFF. Flipped ON and set to `tinacms build && next build`.

**Gotcha 4 — `public/` directory didn't exist in the repo.**
`tinacms build` writes to `public/admin/index.html`. Without `public/` existing, nothing landed. Fixed by adding `public/.gitkeep` (commit c463ff3).

**Gotcha 5 — Chicken-and-egg with Tina Cloud branch indexing.** (The big one.)
Tina Cloud showed "No branches found" and every Vercel build failed with `Branch 'main' is not on Tina Cloud`. The Project Setup Checklist in Tina's Overview tab said the `tina-lock.json` file is required for Tina Cloud to index content, but that file only exists after running Tina locally once.

What actually fixed it:
1. Ran `npx tinacms dev --noWatch --port 4002 --datalayer-port 9002` locally — this generated `tina/tina-lock.json` and `tina/__generated__/_schema.json`, `_graphql.json`, etc.
2. Removed `/tina/__generated__` from .gitignore (the schema/graphql/lookup JSON files inside it MUST be committed) — kept `types.ts`, `client.ts`, `config.prebuild.jsx` gitignored since those are per-machine build artifacts.
3. Committed `tina/tina-lock.json` and the necessary `__generated__` files (commit e58f264).
4. Pushed to `main`. Tina Cloud's GitHub App noticed the new files and indexed the branch (~30–60 seconds). "Refresh Branches" in Tina Cloud UI helped.
5. Redeployed on Vercel manually (the auto-deploy from that push ran before indexing finished, so we hit the same error once more as a race condition — the manual redeploy after indexing completed was the one that worked).

**Gotcha 6 — `tina/__generated__/public/admin/.gitignore` is auto-created.**
Tina drops a `.gitignore` inside `public/admin/` that excludes `index.html` and `assets/`. This is correct — the admin bundle itself should be built fresh each deploy. Just commit the `.gitignore` file, not the bundle.

### Commits from this sub-session
- `84c4323` Force Vercel framework preset to nextjs via vercel.json
- `c463ff3` Add public/ directory so Tina admin build has an output target
- `e58f264` Commit Tina generated schema + lock file so Tina Cloud can index main
- `360c2e0` Add EDITING.md — how the site updates through Tina CMS

### Final state as of this commit
- ✅ Next.js 14 site live at kathleen-lac.vercel.app
- ✅ Tina admin live at kathleen-lac.vercel.app/admin/index.html
- ✅ Tina Cloud indexing `main` branch
- ✅ `tinacms build && next build` passes on Vercel
- ✅ Client ID (`7adf5d15-5de4-4201-82c1-c17902f0cdf6`) and `TINA_TOKEN` set as Vercel env vars
- ✅ Editing guide in EDITING.md covers the full workflow
- ⏳ **Formspree form ID** — user needs to create form, paste ID into `content/pages/home.json` on the `contact` block (or use Tina admin)
- ⏳ **Invite Kathleen** as a collaborator in Tina Cloud (free tier: 2 users)
- ⏳ **Domain**: `lovesophiajoy.com` to connect in Vercel when registrar creds available
- ⏳ **Test edit**: User should click through to `/admin`, make a small edit, confirm it deploys, then revert

### Key files a new session needs to know about
- `vercel.json` — forces framework to nextjs (do not delete)
- `public/.gitkeep` — placeholder so `public/` exists (not strictly needed anymore since tina writes here, but harmless)
- `tina/tina-lock.json` — **must stay committed**; Tina Cloud uses it to index
- `tina/__generated__/_schema.json`, `_graphql.json`, `_lookup.json` — **must stay committed** (see .gitignore rules)
- `public/admin/.gitignore` — prevents the built admin bundle from being committed; correct behavior
- `EDITING.md` — human-readable guide to the editing workflow

## 2026-04-23 — Hide sections 02–05 via a per-block toggle
### Ask
Client wanted sections 02 Offerings, 03 Wholeness, 04 Testimonials, and 05 Creations hidden from the live site — not deleted. Earth Strip (unnumbered, sits mid-range) also hidden.

### Approach
Added a reusable `hidden: boolean` field to every block template in the Tina schema and to nav links. `BlockRenderer` and `Nav` skip items where `hidden === true`. Tina sidebar labels now show `(hidden)` suffix so Kathleen can see what's off at a glance.

Hidden blocks set in `content/pages/home.json`: offerings, wholeness, earthStrip, testimonials, creations.
Hidden nav links set in `content/settings/site.json`: Offerings, Sessions, Voices (they would scroll to nothing otherwise).

### Why this over deleting
- Preserves all copy and image refs exactly as-is
- Kathleen can re-enable any section from `/admin` by toggling one boolean — no redeploy needed beyond Tina's normal save
- Schema stays identical to the documented architecture; no blocks lost

### Files touched
- `components/BlockRenderer.tsx` — `if (block?.hidden) return null;`
- `components/Nav.tsx` — `.filter((l) => !l.hidden)` on navLinks
- `lib/content.ts` — `hidden?: boolean` added to nav link type
- `tina/config.ts` — `hidden` field added to every block template + nav link; itemProps shows `(hidden)` suffix
- `content/pages/home.json`, `content/settings/site.json` — flags set

Commit `e2d3372`. Build verified clean.
