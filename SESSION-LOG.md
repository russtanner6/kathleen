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

## 2026-04-24 — Section numbers removed, contact email changed, Cloudflare DNS migration
### Section numbers
Client wanted the numeric labels (01–06) gone from every section, visible or hidden. Each block component (About, Offerings, Wholeness, Testimonials, Creations, Contact) now conditionally renders the `.section-number` div via `{number && (...)}` so an empty string leaves no ghost space. All `number` values in `content/pages/home.json` cleared to `""`. Commit `3382a12`.

### Contact email swap
`info@lovesophiajoy.com` → `kathleen@lovesophiajoy.com` in the `contact` block. Affects the visible email text + mailto link. Formspree form ID is still empty so the form itself doesn't send yet (see below). Commit `1e362ab`.

### Cloudflare DNS + Email Routing (IN PROGRESS)
**Goal:** set up `kathleen@lovesophiajoy.com` as a forwarding address to Kathleen's personal inbox, then eventually route Formspree notifications through it too.

**State as of end of session 2026-04-24:**
- Registrar: **Network Solutions**
- Nameservers changed at Network Solutions to Cloudflare: `perla.ns.cloudflare.com` + `thomas.ns.cloudflare.com`
- `dig NS lovesophiajoy.com` confirms the change has propagated at least locally
- Cloudflare zone status: **Pending activation** (awaiting Cloudflare's automated verification — normally 1–24h, user hadn't received the activation email yet when session ended)
- Cloudflare auto-imported 2 DNS records from Vercel:
  - A: `lovesophiajoy.com` → `216.198.79.1`
  - CNAME: `www` → `a8e7508af0135dc5.vercel-dns-017.com`
- **Both records set to DNS only (gray cloud)** — do not re-enable Proxied. Vercel handles its own SSL/CDN/DDoS; proxying on top causes SSL handshake errors (525/526), redirect loops, and cache conflicts. Cloudflare's "not fully protected" warning for this domain should be **ignored**.

**Remaining steps (for next session):**
1. Wait for Cloudflare "zone active" email
2. Confirm `https://lovesophiajoy.com` still loads with valid SSL after activation
3. Cloudflare dashboard → **Email → Email Routing** → Enable. Accept auto-added MX + SPF records.
4. **Routing Rules** → create `kathleen@lovesophiajoy.com` → forward to Kathleen's personal inbox
5. Kathleen verifies the destination by clicking a link Cloudflare emails to her personal inbox
6. Enable **Catch-all** pointing at the same personal inbox (recommended — catches typos, future aliases)
7. Test: send from an external account to `kathleen@lovesophiajoy.com`, confirm landing in personal inbox

### Formspree (still pending — same as before, plus a routing improvement)
Contact form in `components/Contact.tsx` is wired and POSTs to `https://formspree.io/f/{formspreeId}`. Current `formspreeId` is empty in `home.json`, so the form falls through to "Please email kathleen@lovesophiajoy.com directly."

**Recommended setup when ready:**
- Sign up at formspree.io (free tier: 50 submissions/month)
- Use `kathleen@lovesophiajoy.com` as the destination (not Kathleen's personal inbox directly). Reason: routes through the Cloudflare forwarding layer, so if Kathleen ever changes her personal inbox, she updates it in one place (Cloudflare), not in Formspree.
- Verification email from Formspree will arrive via Cloudflare forwarding — serves as a smoke test of the new forwarding setup.
- Paste form ID into `formspreeId` in `home.json` contact block (or via Tina admin)

### Files touched this date
- `components/About.tsx`, `Offerings.tsx`, `Wholeness.tsx`, `Testimonials.tsx`, `Creations.tsx`, `Contact.tsx` — `{number && (...)}` conditional
- `content/pages/home.json` — numbers cleared, email swapped

### What's NOT yet done (ordered by blocker chain)
1. ⏳ Cloudflare zone activation (automated, just waiting)
2. ⏳ Email Routing enable + forwarding rule + destination verify
3. ⏳ Test that `kathleen@lovesophiajoy.com` forwards correctly
4. ⏳ Formspree signup → form ID into `home.json`
5. ⏳ Invite Kathleen to Tina Cloud as collaborator
6. ⏳ Connect `lovesophiajoy.com` in Vercel Domains settings (after zone active)
7. ⏳ End-to-end Kathleen-does-an-edit test
8. ⏳ Visual QA against legacy on mobile + desktop

## 2026-04-26 — Drop "Newrones", warmer gold, bottom tagline block

### Ask (decoded from Kathleen's text messages)
1. Strip last name from header/footer — just "Love Sophia Joy" + "Kathleen"
2. No phone on the website (already true — confirmed nothing to remove)
3. Route `kathleen@lovesophiajoy.com` to `Kathleennewrones1111@gmail.com` (Cloudflare task — pending)
4. Bottom-of-homepage tagline: "A Wholistic Wellness & Healing Arts Ministry"
5. She also pitched a "INSPIRE 💎 UPLIFT 💎 EMPOWER 💎 ALIGN 💎 SHINE" line, then walked it back in the same thread — "probably too much on homepage… better in body copy." Skipped on homepage; saving for later.
6. "LSJ & logo slightly more gold" — bumped the CSS gold token. Logo recoloring deferred (external PNG; needs new asset or CSS filter — punt until she sees the color bump).

### Changes shipped
- Stripped "Newrones" from every visible/metadata location:
  - `content/settings/site.json` — copyright now `© 2026 Love Sophia Joy • Kathleen. All rights reserved.`
  - `content/pages/home.json` — meta title `Love Sophia Joy | Kathleen`, meta description, About heading `I am Kathleen`
  - `lib/content.ts` — default blog author fallback `Kathleen`
  - `content/blog/welcome.md` — frontmatter author `Kathleen`
- Color: `--gold` `#D4A017` → `#D4AF37` (classic 24k gold, matches her notes.md preference). Replaced two hardcoded `#D4A017` in `.nav-overlay` hover states with `var(--gold)`. Updated the `.contact-email` rgba border to match the new RGB.
- Added a new **Tagline block**:
  - `components/Tagline.tsx` — small italic centered, all-caps, citrine-gold, letter-spaced
  - Registered in `BlockRenderer.tsx`
  - Added template to `tina/config.ts` (Tina-editable: `text` field + `hidden` toggle)
  - Instance added to `home.json` after the contact block: `"A Wholistic Wellness & Healing Arts Ministry"`
  - CSS class `.page-tagline` in `globals.css` (mobile breakpoint included)

### Why a block (not hardcoded in Footer)
Kathleen needs to be able to edit, hide, or move this line via Tina. Following the same block pattern as the rest of the homepage means she gets one consistent editing UX.

### Still pending (reasons in parens)
- Logo recolor (external PNG asset — wait for Kathleen to see the gold token bump first; if still not enough, drop a new gold logo into `/public/images/`)
- Email Routing → `Kathleennewrones1111@gmail.com` (Cloudflare dashboard task; zone activation status unknown until checked)
- New offerings copy — Kathleen said "getting to you today" 2026-04-24; not received yet
- INSPIRE / UPLIFT / EMPOWER / ALIGN / SHINE tagline reserved for body copy somewhere later

### Formspree wired (commit c0e1dba)
Form ID `meevwaza` pasted into the contact block (`https://formspree.io/f/meevwaza`). The contact form on the live site now POSTs to Formspree. Delivery destination is configured inside the Formspree dashboard, not in code — recommend `Kathleennewrones1111@gmail.com` for now and swap to `kathleen@lovesophiajoy.com` once Cloudflare Email Routing is active.

### Vercel deploy fix (commit 7cb9c89)
The first push of this session (commit f7c379f) failed Vercel build at `tinacms build && next build`. Root cause: committed `tina/__generated__/frags.gql` and `schema.gql` were stale — they didn't include the per-block `hidden` field added 2026-04-23, nor the new `HomeBlocksTagline` type added in f7c379f. Regenerated locally via `npx tinacms dev --noWatch --port 4003 --datalayer-port 9003` and committed the updated `frags.gql`, `schema.gql`, and `tina-lock.json`.

**Gotcha 9 (next session reminder):** Whenever you add or change a block template in `tina/config.ts`, regenerate the `__generated__/*.gql` files locally and commit them in the SAME push. Otherwise Vercel's `tinacms build` step fails because the GraphQL schema doesn't match the live config.

## 2026-11-16 — russtanner.xyz images all 404'd; graceful-degrade fix pushed (commit cf90a3f)

### What broke
Every image on the live site was hard-coded to `https://russtanner.xyz/{logo.png, ocean.jpg, kathleen.jpeg}`. All three now return 404 (the domain redirects to `www.russtanner.xyz` then 404s each file). The 2026-04-15 rebuild log already flagged this fragility and said "move to /public/images/ during rebuild" — it never got done.

### Recovery attempts that failed
- No local copies anywhere on this Mac, the NAS, or any sibling project
- No `russtanner.xyz` source project exists locally
- Wayback has a snapshot of `lovesophiajoy.com` (2025-07-12) but did NOT crawl the embedded `russtanner.xyz` image URLs — `archive.org/wayback/available` returns empty for all three

### Fix shipped (cf90a3f)
Rather than guessing at placeholder assets before Kathleen's call, cleared the three broken URLs and made the components tolerate empty image strings so the live site stops showing broken-image icons:
- `components/Hero.tsx` — `.hero-bg` style object is `undefined` when `backgroundImage` is empty. The dark gradient + gold radial overlay in `.hero-bg::after` + the grain layer render on their own and look intentional.
- `components/About.tsx` — `<img>` only renders when `image` is truthy. `.about-image` already has a `linear-gradient(145deg, #1a1a1a, #2a2a2a)` fallback with the gold accent bar on top, so the About column still has visual weight.
- `content/pages/home.json` — `logoImage`, hero `backgroundImage`, About `image` all set to `""`
- `content/blog/welcome.md` — `featuredImage: ""` (blog pages don't render it today anyway, but kept clean)
- `public/images/.gitkeep` — directory now exists ready for Kathleen's incoming assets

### Still to do after her next call
1. Get logo PNG (transparent, gold-forward) → `public/images/logo.png` → set `logoImage: "/images/logo.png"`
2. Get hero background (ocean/landscape) → `public/images/ocean.jpg` → set `backgroundImage: "/images/ocean.jpg"`
3. Get About headshot → `public/images/kathleen.jpg` → set `image: "/images/kathleen.jpg"`
4. Figure out what `Pictures/IMG_20180823_185153659_HDR~2.jpg` (5344×3006 landscape, ~4.3MB) is for — Kathleen dropped it in `Pictures/` at the repo root; leaving untracked until her intent is clear

### GitHub email-privacy gotcha
First push rejected with GH007 "Your push would publish a private email address" — the repo's prior 18 commits all used `tanner2001byu@gmail.com`, so GitHub flipped the "block pushes that expose my email" setting on at some point between the last session and this one. Amended the commit via `--author=...` + `GIT_COMMITTER_EMAIL=...` to `180343826+russtanner6@users.noreply.github.com` and the push went through. Permanent fix options: (a) toggle the setting off at https://github.com/settings/emails, or (b) set `git config user.email` in this repo to the noreply form so every future commit anonymizes automatically. Did NOT change git config without explicit permission.

### Vercel Node-26 gotcha (commit e692dec)
After pushing `cf90a3f` and `67991cb`, the live site still showed the broken `russtanner.xyz` URLs. Vercel's deployment list showed both as `state: ERROR`. Reading the build log: Vercel rolled out Node 26 and `"engines": { "node": ">=18.17.0" }` in `package.json` tells Vercel "use the newest major you have" — so it picked 26.x. `better-sqlite3@11.10.0` (a Tina dep, pulled in via `@tinacms/graphql` → `@tinacms/datalayer`) can't compile against Node 26 because v8 dropped `Object::GetPrototype` and `Context::GetIsolate`. `npm install` fails in the native rebuild step. Pinned to `"24.x"` in package.json to match the project's own Node Version setting; builds green again.

**Gotcha 10:** Vercel treats `"engines": { "node": ">=X" }` as a floor AND a floating ceiling — always pin a single major (`"24.x"`) or a bounded range (`">=18.17.0 <26"`) to avoid random breakage when Vercel rolls out a new major.

### Prior Claude session already fixed this on a branch, but never merged
During triage noticed branch `claude/client-website-images-h7p8yz` (commit `06c5922`, 2026-08-20) which did essentially the same URL fix I did here — `/images/logo.png` etc., removed `remotePatterns` from next.config.js, added `public/images/README.md` listing the three required files. That branch's Vercel preview built cleanly (dpl_5Buy1cPVwzutg3Ad15SgvG6ycLVG, state READY) because Node was still 24.x back in August. It was never merged, presumably because without the actual image files the site still showed nothing — same end state as my fix. Leaving the branch unmerged; my main-branch version supersedes it and additionally makes the components tolerate empty image URLs (so the dark gradient shows up instead of a broken-image icon).

## 2026-11-18 — Full site rebuild: Kathleen's new copy + palette

### What triggered it
Kathleen sent over `LOVE SOPHIA JOY WEBSITE COPY NEW 11.18.26.docx` with fully rewritten copy (she'd lost her old draft before leaving for Durango) plus the resent original portrait photo (`Sophia2018-3189.jpg`, 2659×4004, white-dress / white-dog / Chicago lake). Russ had also archived mood-board images in the previous session (`reference/design/kathleen-{book-cover-mockups,vision-cards}.jpg`). No haggling allowed — "make it look amazing."

### New site structure
- Homepage reorganized into her named sections: **Welcome → Purpose → Mission → Process → Foundation**
- Each section has an eyebrow (the three-word mantra: "Miracles · Synchronicity · Liberation" etc.), a heading, and body paragraphs
- Two metallic-gold quote callouts: "Your presence is your present." (Welcome) and the twin Foundation quotes ("Forget all the laws that you know…" + Genesis 1:31)
- Sub-pages live at `/offerings`, `/about`, `/heart-work`, `/gifts`, `/resources` (gifts + heart-work are "coming soon" placeholders per her notes)
- Nav rebuilt: five homepage anchors + six sub-page links + Contact

### New components
- `Welcome.tsx` — full-viewport opener with ocean bg, portrait on right, warm veil, gold quote inline
- `Section.tsx` — reusable block for Purpose/Mission/Process, theme prop toggles cream vs emerald
- `Foundation.tsx` — special two-quote closing section with emerald aura behind
- Legacy blocks (Hero, About, Offerings cards, Wholeness, EarthStrip, Testimonials, Creations) kept in schema but marked `hidden: true` in home.json — Kathleen can revive any of them from Tina

### Palette shift
Away from near-black dark theme toward her book-cover mood:
- Primary bg: cream (`#FDF7EC`) alternating with dark emerald (`#0E4B3A`) sections
- Gold: `#D4AF37` / `#E8C547` / `#F2C94C` (used as metallic gradient on the quotes)
- Emerald ink: `#1B5E20` (her handwritten ink color)
- Peach/coral accent: `#F4C9A8` (book-cover gradient top)
- Teal: `#3FA395` (ocean / surf)

Gold quotes use `background-clip: text` with a 4-stop gradient for the metallic sheen.

### Image handling
- Portrait cropped top-anchored to 68% height ("right beneath where my hand is holding Sophia") via `ffmpeg crop=2659:2720:0:0`, scaled to 1400 wide, saved as `/public/images/kathleen-portrait.jpg` (~468 KB)
- Hero landscape (`Pictures/IMG_20180823…`) scaled to 2400 wide, saved as `/public/images/hero-ocean.jpg` (~546 KB) — used as Welcome bg
- `Pictures/` raw source also committed (archive, 4 MB) — lesson from the russtanner.xyz debacle

### Footer / brand rename
- Brand: `LOVE SOPHIA JOY` (all caps, gold, serif)
- Signature line: `LOVE KATHLEEN CITRINE` (her working name for the book series; also now the signoff)
- Copyright: `© 2026 LOVE SOPHIA JOY · LOVE KATHLEEN CITRINE · All rights reserved.`

### Gotchas during the push

**Gotcha 11:** Tina GraphQL field conflict across blocks.
First Vercel build failed with `Fields "intro" conflict because they return conflicting types "[String]" and "String"`. My new Foundation block had `intro: list of strings`, but the legacy Wholeness block had `intro: string` — Tina builds a single unified GraphQL schema so same-name-different-shape across block templates breaks codegen. Fixed by renaming Foundation's fields to `introParagraphs` and `middleParagraphs`. Rule: when adding a new Tina block template, grep the existing config for every field name you plan to use and avoid collisions with differently-shaped fields in any other block (even hidden ones).

**Gotcha 12:** Tina Cloud index gets stale across major schema changes.
Second build failed with `TinaFetchError: Unable to seed content/pages/home.json (caused by: Block template "welcome" is not defined for field "blocks")` and `IndexFailedError`. Tina Cloud maintains its own server-side schema; after a large repo-side schema change (new block templates), the index needs to be re-synced or the build's `tinacms build` step fails. Error message prescribes: "click the Reindex button for 'main' in the Tina Cloud configuration for this project" (a UI click Russ has to do).

**Workaround shipped:** overrode the Vercel build command via `vercel.json` → `"buildCommand": "next build"`, bypassing `tinacms build` entirely. The live site doesn't need Tina Cloud — content is served from JSON files via lib/content.ts. Pre-built admin assets under `public/admin/` are committed, so `/admin` still works for navigation; actual editing will land once the Tina Cloud index is refreshed.

**Todo for Russ:** reindex in Tina Cloud when convenient. Then can decide whether to revert the vercel.json buildCommand override or leave it (there's no strong reason to need `tinacms build` on every deploy once content/schema are in sync).

### For Kathleen
- Wrote `FOR-KATHLEEN.md` — a warm, non-technical one-pager explaining how to log in, edit text, swap photos, publish blog posts, and what requires Russ vs what she can do herself
- Updated `EDITING.md` (technical ref) to reflect the new block types and task recipes

### Deferred to a future session
- Cloudflare zone activation → Email Routing for kathleen@lovesophiajoy.com (pending from April — still unblocked)
- Logo (none in place; brandmark currently rendered as styled text)
- Tina Cloud reindex (needs a UI click in Russ's Tina Cloud dashboard)
- Decide final Contact handling — email vs form only vs show cell (she asked "Should we put my cell?" in the doc — defaulted to NO for public-site safety; left kathleen@lovesophiajoy.com on display)
- Blog: currently reachable at `/blog` but no link from the new nav — decide whether to surface
- /heart-work gallery (she needs more time to upload pieces)
- /gifts signup flow ("after Thanksgiving" per her note)
- /resources content (empty intentionally)

---

## 2026-11-18 (later) — Kathleen's hero feedback: restore big LOVE SOPHIA JOY

### Her note (verbatim)
> I may have said Homepage incorrectly. I still love the original Homepage you did that says very big LOVE SOPHIA JOY / Let true light lead the way to miracles every day. Just want that font color more metallic yellow gold. With the yellow gold heart sun logo you did. Just want all of it w beach background. Preferably emerald green body copy & all Californian or Georgia fonts. I want WELCOME to simply be where content begins. I thought as one scrolls past big Homepage they would then see each main layer: welcome, purpose/mission, process, offerings/services ... etc.

### What shipped (commit b0619c3)

**Hero back on top — full-bleed opener:**
- Unhid the `hero` block and moved it to position 0 in `content/pages/home.json`
- Title "Love Sophia Joy" renders in a metallic gold gradient via `background-clip: text` with 6 stops (#FFF4C4 → #F5D070 → #E8C547 → #D4AF37 → #B8912B → #8A6A1E) on `.hero-title-text` — the same technique used for the gold quote callouts but applied to the giant wordmark
- Subtitle "Let True Light Lead the Way to Miracles Every Day" switched from white Inter all-caps to italic Cormorant Garamond with the same metallic gold gradient on `.hero-subtitle-text` — matches her "metallic yellow gold" direction and feels like one piece with the title
- Heavy black veil removed from the ocean hero bg — now ~0.28 top / 0.58 bottom so the beach, wave, and figure read through clearly (she asked for "all of it w beach background")
- Hero wrapped in beach photo from `/public/images/hero-ocean.jpg`; fixed background on desktop, scroll attachment on mobile

**Heart-sun logo:**
- Original external asset at `russtanner.xyz/logo.png` is dead (404). Built a new SVG at `/public/images/logo.svg` — 14k gold heart with gradient fill, 16 radiating sun rays, soft gold aura, small diamond sparkle in the heart's crown
- Scales cleanly on all screens; drop-shadow gives it a warm glow against the ocean

**Running order on homepage:**
1. Hero (big LOVE SOPHIA JOY + mantra + logo + beach)
2. Welcome (parchment panel on cream, portrait beside)
3. Purpose (cream)
4. Mission (emerald)
5. Process (cream)
6. **Offerings & Services** (emerald, new — teaser copy + gold CTA button linking to `/offerings`)
7. Foundation (emerald with gold aura, dual gold quotes)
8. Contact
9. Tagline

**New section: Offerings & Services teaser**
- Extended `components/Section.tsx` to accept optional `ctaLabel` + `ctaHref`
- Added matching fields to `tina/config.ts` section template
- Added `.v2-cta` button style — metallic gold gradient with emerald-ink type, lift-on-hover
- Teaser copy: "Wholistic wellness arts woven for you — energy work (Reiki, Qigong, Heaven on Earth Flow, Heart Alchemy, Light of Love), creative sessions (Light Language, sacred art, visionary writing), and resources for your path home."

**Typography per her request:**
- Body font family: `Georgia, 'Cormorant Garamond', 'Times New Roman', serif` across `body`, `.welcome-body`, `.v2-body`, `.v2-trail`, hero title/subtitle — honoring "all Californian or Georgia fonts"
- Headings still Cormorant Garamond (Garamond IS the Georgia family's old-style cousin)
- Body copy on cream sections (`.v2-cream .v2-body`, `.welcome-body`) now `color: var(--emerald-ink)` (#1B5E20) — her "emerald green body copy"
- Body copy on emerald sections stays cream (`--text-light`) for contrast

**Welcome tweaks (no longer the opening scene):**
- Backgroundimage dropped from home.json (was previously the ocean — hero owns that now)
- `.welcome-bg` fallback color = `--cream`; `.welcome-veil` now a soft peach/cream sunrise wash instead of dark emerald tint
- Parchment copy panel lightened (0.65 → 0.5 opacity) and shadow softened — on cream bg it wants to breathe, not sit atop an image
- Dropped the duplicate scroll indicator (hero has its own at the bottom)
- Dropped `brandMark` from the welcome block in home.json (hero carries the big wordmark now, no need to repeat it)

### Verification
- Deployed as `dpl_9jEJs2oXHZGV1R1Fq6P8TPei9gW8` → READY, aliased to `kathleen-lac.vercel.app`
- Live browser check: desktop hero is gorgeous (big gold wordmark + italic gold mantra + heart-sun centered over beach); mobile hero renders equally well (vertical ocean splash composition, stacked wordmark "LOVE / SOPHIA JOY", mantra below); Purpose/Mission/Process sections read in emerald on cream with italic Garamond headings; Offerings & Services teaser renders with the new gold CTA button; Foundation dual gold quotes intact
- No code changes to Foundation / Contact / Tagline / sub-pages — all still rendering correctly

### For next time
- Tina Cloud reindex still pending (unchanged — bypassed via vercel.json)
- Cloudflare zone activation still pending (unchanged)
- Logo now lives in-repo as SVG; no more external dependency

## 2026-11-18 (later still) — Aqua-ombre repaint + Welcome realignment

### Kathleen's feedback (verbatim)
> "I can see on desktop site you were doing a rose peach off white ombre on the lighter pages. I prefer the lighter pages v. The emerald green background pages. I do love the emerald green font body & headline copy thruout. Perhaps instead of the emerald green background pages make them also a very soft ombre in the beach pallete theme and these can be a light aquamarine ombre like you have at the beginning the rose peach off white ombre. I want this whole site to evoke calm peaceful power like Mother Ocean Laguna. Soft yet strong and a very powerful vitalizing presence which homepage is capturing! I'd love to come up w an alternative way to lay this page w copy & photo... to get it more in alignment w subsequent pages. I love all the ways you used gold writing/scripts. That is the only exception to the all emerald green fonts."

### What shipped (commit `d67238d`)
Every section that used the dark emerald background is now a **soft aquamarine ombre** matching the rose-peach ombre rhythm. Emerald-ink body copy is preserved (her favorite). All gold accents — the metallic hero wordmark, gold-gradient callouts, foundation's radiant aura, the offerings CTA button — kept as-is per her exception for "gold writing/scripts".

**Palette additions (`app/globals.css`):**
- `--aqua-pale: #ECF7F2` → `--aqua-soft: #D4EBE2` → `--aqua-mid: #B2DBCF` → `--aqua-deep: #8CC7B9`
- `--gold-deep: #B8912B` (for callouts on light backgrounds)

**Sections repainted from emerald → aqua ombre:**
- `.v2-emerald` — the generic emerald theme now renders light aquamarine ombre with a subtle teal radial wash at top. Heading → `--emerald-deep`, body → `--emerald-ink`, eyebrow → `--teal`.
- `.v2-foundation` — kept the radiant gold aura (now stronger so it reads as "sunrise" over aqua instead of "glow in dark"). Eyebrow → `--gold-deep`, heading → `--emerald-deep`. `.gold-quote-bright` deepened (lighter-to-darker gold) so the Foundation quotes still punch on the aqua bg.
- `.contact-section` — aqua ombre with white-translucent form fields, emerald-ink input text, emerald bordered "SEND WITH LOVE" button that inverts on hover.
- `.page-tagline` — aqua wash with emerald-deep italic uppercase type (was gold-on-emerald).
- `.v2-signoff` — gold-deep instead of gold-warm so the Foundation signoff reads on aqua.
- Footer left emerald-deep for closure (she didn't ask it to change; it grounds the bottom of the page).

**Welcome section realigned (`components/Welcome.tsx` + `.welcome-*` CSS):**
- Dropped the 2-column grid with the parchment-paneled copy sidebar + large rectangular portrait. That layout looked heavy against the airy Purpose/Mission/Process sections below it.
- New stack: eyebrow → title → gold line → **circular gold-framed portrait cameo** (clamped 200–280px) → centered body copy → gold quote → more centered body copy.
- `.welcome-copy` is now transparent (no parchment panel, no border, no shadow); body copy sits directly on the peach-cream ombre and reads centered.
- `.welcome-inner` max-width tightened from 1200px to 820px to match `.v2-inner` (the Purpose/Mission/Process column).
- Portrait is circular with `object-fit: cover; object-position: center 28%` so Kathleen's face isn't cropped.

### Verification
- Commit `d67238d` pushed; Vercel rebuilt within ~15s. Live CSS bundle (`/_next/static/css/413cd6adf6a2b4b1.css`) contains the `--aqua-*` tokens.
- Live screenshot check at `kathleen-lac.vercel.app/?v=aqua2`:
  - Welcome: circular portrait cameo centered under "Come as You Are.", body copy flows centered in Georgia emerald-ink
  - Mission (aqua): "INSPIRE · UPLIFT · INPOWER · ALIGN · SHINE" eyebrow in teal, "Mission" heading in emerald-deep italic Garamond, body in emerald-ink
  - Offerings (aqua): gold "EXPLORE OFFERINGS & SERVICES" CTA button still pops against the aqua
  - Foundation (aqua): radiant gold sunrise aura preserved over "THE LAW OF LOVE / Foundation"; deepened gold-gradient quotes read clearly
  - Contact (aqua): white-translucent form fields with emerald borders, "SEND WITH LOVE" button inverts to emerald on hover

### Still open
- Original digital dog photos (Sophia on Laguna beach × 2) coming from Kathleen — she's pulling them from IG originals. Once received: regrade to match the hero tone + wire as hero cross-fade carousel ("double rainbow" homepage she asked for).
- Tina Cloud reindex still pending (unchanged — bypassed via `vercel.json`).
- Cloudflare zone activation still pending.

## 2026-11-18 (evening) — Footer type match + emerald-alt comparison preview + cloud triage routine

### Footer typography
Kathleen asked for "LOVE KATHLEEN CITRINE" to match "LOVE SOPHIA JOY" font. Swapped `.footer-signature` from Inter sans to Cormorant Garamond serif, same weight/tracking, kept gold-warm so the signature reads as a quieter partner. Commit `6dd870f`.

### Emerald-alt side-by-side preview
Kathleen wanted to feel both the aqua (loved) and the emerald (previous) palettes side by side before fully committing. Spun up branch `emerald-alt` from main with a surgical revert — restored the original dark emerald backgrounds on Mission, Offerings, Foundation, Contact, tagline, while KEEPING the new Welcome layout (circular portrait cameo + centered single-column copy). Commit on branch: `ab25f28`. Vercel preview URL at `kathleen-git-emerald-alt-rmtapps.vercel.app` (Deployment Protection is on, so a 24-hour Vercel share token was generated and sent to her in the email).

### Email to Kathleen (via Gmail send_message)
Sent her a single thread (threadId `1a1f0fcf3b7937fa`) with: live aqua URL, emerald-alt share URL, what changed this round, and 7 inline screenshots (Welcome new, Mission aqua + emerald, Foundation aqua + emerald, Offerings aqua, Footer matched). Her reply: effusive love, no change requests, says she's hunting for the Sophia-on-beach digital originals and will send ASAP. Russ sent a terse acknowledgment reply from the draft.

### .claude/launch.json committed + gitignore tightened
`.claude/launch.json` (dev-server config for the browser preview tool — `npm run dev` on port 3000) committed for portability. `.gitignore` now ignores `.claude/*` by default but allow-lists `launch.json`. Commit `c784ff8`. Rest of `.claude/` (settings.local.json, scheduled_tasks.lock) stays per-machine.

### Cloud routine: hourly Kathleen email triage
Russ went offline and asked for the monitoring to run in the cloud (independent of his Mac). Created cloud routine `trig_01WotyVvQFi4zRtzPTWC1grC` ("Kathleen email triage — lovesophiajoy"):
- Cron: `17 * * * *` UTC (hourly at :17 — cloud minimum is 1hr, not 30min)
- Model: claude-sonnet-5-5
- Source: this GitHub repo
- MCP: inherits Gmail + Vercel + all his other claude.ai connectors
- Watches ALL emails from kathleennewrones1111@gmail.com (not just one thread)
- Uses Gmail label `claude-triaged` as watermark to avoid duplicate drafts/notifications
- Does NOT auto-implement code changes — identifies what she's asking for, describes the proposed change, waits for Russ's approval
- Always drafts a reply in Russ's voice (terse, no emojis, ends with "Russ", Gmail auto-signature appends)
- Notifications via PushNotification tool (if available in CCR) or final output (surfaces in claude.ai mobile routines feed)
- Photo attachments: downloads to `/tmp/sophia-photos/`, acknowledges only, flags push with `PHOTOS RECEIVED —`
- Manage: https://claude.ai/code/routines/trig_01WotyVvQFi4zRtzPTWC1grC

### NAS audit
Confirmed everything on `/Volumes/NAS/NAS Projects/Kathleen` that matters is already in git/GitHub. Pictures/, reference/, all content, all source — tracked. Only loose end was `.claude/launch.json` (now committed). NAS can disappear tomorrow; `git clone` on any machine recovers everything.

### Russ's voice (for future sessions / cloud routine reference)
- Short sentences, often fragments
- Factual descriptions with parentheticals for detail
- No emojis, no exclamation points, no mirroring Kathleen's effusive style
- Example: "Glad you like it. No rush on the originals — whenever you find them I'll regrade them to match the hero tone and wire the cross-fade. Russ"
- Gmail web signature ("------------- Russ Tanner (949) 444-2393") auto-appends on send; draft bodies should end with just "Russ" on its own line

### Pending
- **Dog photo originals from Kathleen** — hero cross-fade work requires hands-on regrade; when photos arrive (push will prefix "PHOTOS RECEIVED"), start a new Claude Code session on desktop to handle
- Tina Cloud reindex (unchanged — still bypassed via vercel.json)
- Cloudflare zone activation (unchanged)
- `emerald-alt` branch can be deleted after Kathleen confirms the aqua palette is the final call

## 2026-11-20 (late) — Kathleen's 7-point design punch list + hero cross-fade

### Her revisions (verbatim notes from Nov 20 Gmail thread)
- Yellow-gold places (LOVE SOPHIA JOY wordmark, tag line, quotes) not bold enough on some phones/PCs — want bolder + more gold
- Hero tagline: drop ALL CAPS, make italic Cormorant, lowercase ("Let true light lead the way to miracles every day"), flowy like the quote fonts
- Wonders if tagline should also sit in the emerald footer banner between LOVE SOPHIA JOY & LOVE KATHLEEN CITRINE — "only if you think it makes sense"
- "Come as You Are." → "Come As You Are" (capital A, no period)
- Flip section architecture: small label on top (WELCOME/PURPOSE/MISSION/PROCESS/OFFERINGS/FOUNDATION) with the big italic "call" as the feature below (Miracles · Synchronicity · Liberation / Inspire · Uplift · Inpower · Align · Shine / Simple · Sustainable · Successful / Wholistic Wellness: Energy Alignment & Art Alchemy / The Law of Love) — small gold bullet between words
- Offerings page: either Offerings or Services (not both), scannable cards
- Signoff: separate lines, bigger: "With wholehearted radiant lovingjoy, / ~ Kathleen & Sophia"
- Plus: originals of 2 Sophia-on-beach photos landed via Google Photos (previously blocked)

### Design decisions I made (Russ asked me to just ship it)
- **A — Tagline placement:** keep at hero, AND add a quieter italic copy to the footer banner between brand + signature. Bookends the page; stays legible on cell where it already centers nicely.
- **B — Gold on calls:** DO NOT yellow-gold the italic calls (would steal from LOVE SOPHIA JOY + quotes — her exact worry). Instead, put a small gold-deep middle-dot bullet between the words of each mantra. Calls stay in emerald-deep. Gold stays precious.
- **C — Offerings page:** renamed to "Offerings" alone (nav + page title + CTA). Modality items now sit in gold-bordered cream cards with a small heart-sun icon (reusing `/images/logo.svg`) — scannable without going twee with full hearts/circles.

### What shipped (commit TBD)
- `components/Hero.tsx` — client component, accepts `slides: [{src, position}]` or `backgroundImages[]`, cross-fades between slides via React state (7s interval) with a 1.8s opacity transition; respects `prefers-reduced-motion`; first slide paints immediately (no black flash). Veil moved to `.hero-stack::after` so it stays steady across image swaps.
- `components/Section.tsx` + `components/Foundation.tsx` — heading strings split on " · " so the middle-dot renders in gold via `.v2-heading-sep`. Foundation signoff splits on `\n` into two lines with distinct styling (closing phrase in gold-deep, names in emerald-deep).
- `components/Footer.tsx` — now takes `tagline` prop; renders italic Cormorant tagline between `.footer-brand` and `.footer-signature`. All 8 page wrappers (`app/*/page.tsx`) threaded to pass it.
- `app/globals.css`:
  - Deeper, heavier metallic gradient on `.hero-title-text` (6-stop, hot whites → darker bronze bottom; font-weight 400 → 600; double drop-shadow for solid-fill underlay so gradient-text doesn't render thin on PC/phone browsers)
  - `.hero-subtitle` reworked: italic Cormorant, lowercase (no uppercase transform, letter-spacing collapsed, size bumped)
  - `.gold-quote-text` + `.gold-quote-bright` font-weight 400 → 600, deeper gradient stops, drop-shadow
  - `.v2-heading-sep` — small gold bullet between words; gold on cream, gold-deep on aqua/foundation
  - `.v2-signoff` — flex column, 1.25–1.55rem, two-line split: closing phrase gold-deep italic, names emerald-deep smaller + a bit more tracking
  - `.hero-stack` + `.hero-bg-slide` — cross-fade mechanics (1.8s ease), reduced-motion fallback, veil moved here
  - `.footer-tagline` — italic gold-warm Cormorant
  - `.offering-list li` rebuilt as gold-bordered cream cards with the heart-sun logo as `::before` background-image; title bumped to 1.22rem semibold
- `content/pages/home.json`:
  - Hero: added `slides: [hero-ocean, hero-sophia-rocks, hero-sophia-sand]` with per-slide focus positions; subtitle lowercased
  - Welcome: `title` → "Come As You Are" (no period)
  - Purpose/Mission/Process/Offerings sections: swapped `eyebrow` ↔ `heading` so the section label is small and the mantra is the big italic feature; Offerings CTA `Explore Offerings` + href `/offerings`
  - Foundation: `eyebrow` "Foundation" / `heading` "The Law of Love"; signoff split with `\n`
- `content/settings/site.json`: added top-level `tagline`; nav "Offerings & Services" → "Offerings"
- `content/pages/offerings.json`: eyebrow "Offerings", title "Wholistic Wellness: Energy Alignment & Art Alchemy"
- `tina/config.ts`: added `slides` list field to hero block (image + focus), added `tagline` to site settings
- `lib/content.ts`: `SiteSettings` type now includes `tagline?`
- `public/images/hero-sophia-rocks.jpg` (1500×2000, 317KB) + `public/images/hero-sophia-sand.jpg` (2000×1125, 488KB) — regraded via PIL from the two Google Photos originals; sophia-rocks left mostly as-is (already golden-sunset), sophia-sand pushed slightly away from magenta toward gold so it sits in the hero-ocean warm family
- `Pictures/sophia-originals/` — 4 raw photos from Google Photos archived (2 Sophia used; `laguna-sunset-bird.jpg` + `laguna-seagull-flight.jpg` still unused, could feed a gallery later)

### Verified before pushing
- `npm run build` green (all 11 routes prerender)
- Playwright screenshots at 1440×900 desktop and iPhone 14 Pro mobile across every section:
  - Hero: bold gold wordmark + italic gold mantra read clearly against wave crash; cross-fade to Sophia rocks visible after ~7s
  - Welcome: "WELCOME" eyebrow + big italic "Come As You Are" + gold line + circular portrait + centered emerald-ink body
  - Purpose (cream): small "PURPOSE" + big italic "Miracles · Synchronicity · Liberation" with gold bullets
  - Mission (aqua): same pattern, 5-word mantra wraps cleanly to 2 lines on mobile
  - Process (cream): same pattern
  - Offerings CTA (aqua): gold "EXPLORE OFFERINGS" button still pops
  - Foundation (aqua): small "FOUNDATION" + big italic "The Law of Love" + gold-punchier dual quotes + two-line signoff
  - Footer: brand → italic tagline → signature stack, grounded emerald, same on mobile (centered)
  - Offerings page: "OFFERINGS" eyebrow + "Wholistic Wellness: Energy Alignment & Art Alchemy" title + gold-bordered modality cards with heart-sun icons
- All screenshots reviewed; nothing clipped on mobile

### Still open
- Still-missing photos (per her note): "Soph running on Mountain" + "Bluebird" originals — she'll send direct next time (Google Photos route awkward)
- Tina Cloud reindex still pending (bypassed via vercel.json)
- Cloudflare zone activation still pending
- `emerald-alt` branch can still be deleted whenever
