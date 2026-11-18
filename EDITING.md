# Editing Guide — Love Sophia Joy

How to edit the Love Sophia Joy website via Tina CMS.

---

## The short version

1. Go to **https://kathleen-lac.vercel.app/admin/index.html** (or `lovesophiajoy.com/admin` once the domain is connected)
2. Log in with your Tina Cloud account
3. Pick what you want to edit from the left sidebar
4. Make changes — fields update live as you type
5. Click **Save**
6. Wait ~1–2 minutes — your changes appear on the live site automatically

That's it. You never touch code or Git. Tina handles everything in the background.

---

## What lives where

The site is built from a few small content files. Tina gives you a visual editor for each one; under the hood, editing = writing to these files + pushing to GitHub.

| What you'll see in Tina | Where it's stored | What it controls |
|---|---|---|
| **Homepage** | `content/pages/home.json` | Every section of the homepage — hero, about, offerings, sessions, testimonials, creations, contact |
| **Site Settings** | `content/settings/site.json` | Brand name, copyright, nav menu links |
| **Blog Posts** | `content/blog/*.md` | Each blog post is one file (Markdown with frontmatter for title/date/excerpt/image) |

You don't need to know the file paths — Tina shows everything through its sidebar. They're only listed so you know where the source of truth lives.

---

## How the homepage is structured

The homepage is **block-based**. It's a vertical stack of sections that you can:

- Edit individually
- Reorder by dragging
- Add new ones (from the set of block types below)
- Remove ones you don't want

### The block types

| Block | What it is |
|---|---|
| **Hero** | Top of the page — ocean background, logo, title, mantra line |
| **About** | Two-column section with Kathleen's photo + bio paragraphs |
| **Offerings** | The horizontal-scroll row of modality cards (Sound Healing, Shamanic, Human Design, …) |
| **Wholeness** | Centered "Weave Your Wholeness" section with intro, quote, body, and a CTA button |
| **Earth Strip** | The thin band with emoji icons (Citrine Sun, Sapphire Ocean, etc.) |
| **Testimonials** | The 4-quote grid under "From Those Who've Walked This Path" |
| **Creations** | The 3-card row for Sacred Music, Visionary Writing, Essential Oils |
| **Contact** | The contact form section at the bottom |

Each block has its own editable fields. For example, the **Offerings** block has:
- A section heading and intro paragraph
- A list of **cards**, each with: number, icon (picked from a dropdown), title, description, and CTA label
- You can add, remove, or reorder cards inside the block

---

## What Kathleen can do herself (no developer needed)

- ✏️ **Edit any text** on the homepage — titles, paragraphs, taglines, buttons, quotes, testimonials
- 🖼️ **Swap any image** — hero background, logo, about photo, blog featured images. Upload from her computer and Tina stores it
- 📋 **Reorder sections** on the homepage (e.g., move Testimonials above Offerings) by dragging in the sidebar
- ➕ **Add or remove items** inside a section — add another offering card, delete a testimonial, add a social link
- 🔗 **Update contact info** — email address, social media links
- 📝 **Write and publish blog posts** — new post, rich text editor, save. It goes live in ~2 min
- 🏷️ **Update nav menu** labels and links from Site Settings

---

## What still requires a developer (Russ)

- 🎨 **Visual design changes** — colors, fonts, spacing, animations, layout. These live in `app/globals.css`
- 🧩 **New block types** — e.g., adding a "Pricing" block or an "FAQ" block. Needs a new React component + an entry in the Tina schema
- 🛣️ **New page templates** — e.g., a standalone "Retreats" page or a shop. Needs new routes under `app/`
- 🧰 **New features** — booking calendar, e-commerce, membership login
- 📐 **Tina schema changes** — adding new fields to existing blocks

Kathleen can always request these — they're just changes that land through code rather than through the admin UI.

---

## The editing flow, end-to-end

Here's what actually happens when Kathleen clicks **Save** in the Tina admin:

```
 ┌──────────────┐    edits    ┌─────────────┐    commit    ┌──────────┐
 │  Tina Admin  │ ──────────> │  Tina Cloud │ ───────────> │  GitHub  │
 │  (browser)   │             │  (backend)  │              │  main    │
 └──────────────┘             └─────────────┘              └─────┬────┘
                                                                 │
                                                       triggers  │
                                                                 ▼
                           ┌──────────────┐   deploys    ┌──────────┐
                           │   Live Site  │ <─────────── │  Vercel  │
                           │ (lovesophia) │              │   build  │
                           └──────────────┘              └──────────┘
```

**Steps in plain English:**

1. Kathleen logs in to the admin, makes an edit, clicks Save
2. Tina Cloud takes the change and commits it to the GitHub repo on the `main` branch (with Kathleen listed as the commit author)
3. GitHub notifies Vercel — "something new on main"
4. Vercel automatically runs a build:
   - `tinacms build` — regenerates Tina's schema artifacts
   - `next build` — rebuilds the site from the updated content files
5. The new version replaces the live site usually within 1–2 minutes

**Why this is nice:**

- Every edit is a real Git commit — full history, everything is undoable via Git
- No separate "CMS database" that can go out of sync with the code
- If Vercel or Tina Cloud goes down, the content files are still there in GitHub and can be edited by hand
- Works beautifully with Vercel's preview deploys — we can make changes on a branch and preview them before merging

---

## Common tasks

### Change a hero image
1. Admin → **Homepage** → **Hero** block
2. Click the **Background Image** field → Upload → pick new image → Save
3. Wait ~90 seconds, refresh the live site

### Add a new offering
1. Admin → **Homepage** → **Offerings** block
2. Scroll to the **Cards** list → click **+ Add Item**
3. Fill number, icon (dropdown), title, description, CTA → Save
4. Drag it into the right position in the list

### Remove a testimonial
1. Admin → **Homepage** → **Testimonials** block
2. Find the item in the list → click the ⋯ menu → **Delete** → Save

### Reorder the homepage sections
1. Admin → **Homepage**
2. In the main sections list, drag a block up or down
3. Save

### Write a blog post
1. Admin → **Blog Posts** → **+ New Post**
2. Fill title, date, author, excerpt, featured image
3. Write the body in the rich text editor
4. Save
5. It appears automatically at `/blog` and `/blog/<slug>`

### Update the email or social links
1. Admin → **Homepage** → **Contact** block for the contact section footer
2. Or Admin → **Site Settings** for the slide-out nav menu's social links

---

## Editing without Tina (fallback)

If Tina Cloud is ever down or unreachable, edits can still happen directly in GitHub:

1. Open https://github.com/russtanner6/kathleen
2. Navigate to `content/pages/home.json` (or whichever file)
3. Click the pencil icon to edit
4. Make changes → **Commit to main**
5. Vercel redeploys as usual

This only really matters for emergencies — Tina is the day-to-day tool.

---

## When things go wrong

**Problem:** "I saved in Tina but the site hasn't updated"
- Wait 2 minutes (Vercel builds take time)
- Check https://vercel.com — is there a build running or failing?
- Hard refresh the live site (Cmd+Shift+R) to bypass browser cache

**Problem:** "Tina admin won't load / shows an error"
- Check that `kathleen-lac.vercel.app` (or the domain) is in Tina Cloud → Configuration → Site URLs
- Check that you're logged in to the right Tina Cloud account
- Try logging out and back in

**Problem:** "I accidentally deleted a section"
- Every edit is a Git commit — nothing is ever truly lost
- Ping Russ — he can revert the commit in under a minute

**Problem:** "The build on Vercel failed"
- Check the build log (Vercel → Deployments → click the failed one)
- Most common cause: a schema mismatch after a developer change. Ping Russ.

---

## Accounts & access

- **Tina Cloud project**: "Love Sophia Joy" under Russ's Organization
- **Client ID**: `7adf5d15-5de4-4201-82c1-c17902f0cdf6` (public, safe to share)
- **GitHub repo**: https://github.com/russtanner6/kathleen
- **Vercel project**: `kathleen` (preview: `kathleen-lac.vercel.app`)
- **Collaborators in Tina Cloud**: Russ + Kathleen (free tier allows 2 users)

---

## Files in the repo that matter for editing

```
content/
  pages/home.json          ← everything on the homepage
  settings/site.json       ← brand, copyright, nav links
  blog/*.md                ← blog posts
public/
  images/                  ← uploaded media (Tina writes here)
tina/
  config.ts                ← the schema that defines what fields Tina shows
  tina-lock.json           ← Tina Cloud's index (auto-managed)
  __generated__/           ← auto-generated GraphQL artifacts (committed)
```

Everything else (`app/`, `components/`, `lib/`) is the code that renders those files. Kathleen should never need to touch it.
