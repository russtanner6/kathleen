# Site images

Images are served from this folder as `/images/<file>` — they must live in the
repo, not on an outside domain.

## Required files

The homepage and blog reference these three files by name:

| File             | Used by                              |
| ---------------- | ------------------------------------ |
| `logo.png`       | Hero logo (`content/pages/home.json`)   |
| `ocean.jpg`      | Hero background + blog featured image   |
| `kathleen.jpeg`  | About portrait (`content/pages/home.json`) |

If a file is missing, that image simply won't render — nothing else breaks.

## Why they live here

These three were previously hotlinked from `https://russtanner.xyz/`. That
domain was rebuilt in August 2026 onto a Vercel project that doesn't contain
them, so all three started 404ing and every image on the site disappeared at
once — without anything in this repo changing.

Keeping images in `public/images/` means they deploy with the site and can't be
broken by an unrelated project.

## Adding or replacing images

Either drop a file in this folder and commit it, or upload through the Tina
admin media manager at `/admin` — Tina is configured to write here
(`mediaRoot: 'images'`, `publicFolder: 'public'` in `tina/config.ts`).
