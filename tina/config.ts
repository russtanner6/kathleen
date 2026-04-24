import { defineConfig } from 'tinacms';

/**
 * Tina CMS configuration.
 *
 * For production editing via Tina Cloud, set these env vars in Vercel:
 *   NEXT_PUBLIC_TINA_CLIENT_ID
 *   TINA_TOKEN
 * and register the project at https://tina.io.
 *
 * For local editing, run:  npm run dev:tina
 * Then open http://localhost:3000/admin
 */

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'home',
        label: 'Homepage',
        path: 'content/pages',
        match: { include: 'home' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object',
            name: 'meta',
            label: 'SEO',
            fields: [
              { type: 'string', name: 'title', label: 'Page Title' },
              { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'blocks',
            label: 'Page Sections',
            list: true,
            ui: {
              itemProps: (item: any) => ({
                label: `${item?._template}${item?.hidden ? ' (hidden)' : ''}`,
              }),
            },
            templates: [
              {
                name: 'hero',
                label: 'Hero',
                fields: [
                  { type: 'boolean', name: 'hidden', label: 'Hidden' },
                  { type: 'image', name: 'logoImage', label: 'Logo' },
                  { type: 'image', name: 'backgroundImage', label: 'Background Image' },
                  { type: 'string', name: 'title', label: 'Title' },
                  { type: 'string', name: 'subtitle', label: 'Subtitle / Mantra' },
                ],
              },
              {
                name: 'about',
                label: 'About',
                fields: [
                  { type: 'boolean', name: 'hidden', label: 'Hidden' },
                  { type: 'string', name: 'number', label: 'Number' },
                  { type: 'string', name: 'label', label: 'Label' },
                  { type: 'string', name: 'heading', label: 'Heading' },
                  { type: 'image', name: 'image', label: 'Photo' },
                  { type: 'string', name: 'paragraphs', label: 'Paragraphs', list: true, ui: { component: 'textarea' } },
                ],
              },
              {
                name: 'offerings',
                label: 'Offerings',
                fields: [
                  { type: 'boolean', name: 'hidden', label: 'Hidden' },
                  { type: 'string', name: 'number', label: 'Number' },
                  { type: 'string', name: 'label', label: 'Label' },
                  { type: 'string', name: 'heading', label: 'Heading' },
                  { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
                  {
                    type: 'object',
                    name: 'cards',
                    label: 'Cards',
                    list: true,
                    ui: { itemProps: (item: any) => ({ label: item?.title }) },
                    fields: [
                      { type: 'string', name: 'number', label: 'Number' },
                      {
                        type: 'string',
                        name: 'icon',
                        label: 'Icon',
                        options: [
                          'sound', 'flame', 'design', 'divination', 'coaching',
                          'reiki', 'constellations', 'quantum', 'meditation', 'oils', 'retreats',
                        ],
                      },
                      { type: 'string', name: 'title', label: 'Title' },
                      { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
                      { type: 'string', name: 'cta', label: 'CTA Label' },
                    ],
                  },
                ],
              },
              {
                name: 'wholeness',
                label: 'Wholeness',
                fields: [
                  { type: 'boolean', name: 'hidden', label: 'Hidden' },
                  { type: 'string', name: 'number', label: 'Number' },
                  { type: 'string', name: 'label', label: 'Label' },
                  { type: 'string', name: 'heading', label: 'Heading' },
                  { type: 'string', name: 'intro', label: 'Intro', ui: { component: 'textarea' } },
                  { type: 'string', name: 'quote', label: 'Quote', ui: { component: 'textarea' } },
                  { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
                  { type: 'string', name: 'ctaText', label: 'CTA Text' },
                ],
              },
              {
                name: 'earthStrip',
                label: 'Earth Strip',
                fields: [
                  { type: 'boolean', name: 'hidden', label: 'Hidden' },
                  {
                    type: 'object',
                    name: 'elements',
                    label: 'Elements',
                    list: true,
                    ui: { itemProps: (item: any) => ({ label: item?.label }) },
                    fields: [
                      { type: 'string', name: 'icon', label: 'Emoji' },
                      { type: 'string', name: 'label', label: 'Label' },
                    ],
                  },
                ],
              },
              {
                name: 'testimonials',
                label: 'Testimonials',
                fields: [
                  { type: 'boolean', name: 'hidden', label: 'Hidden' },
                  { type: 'string', name: 'number', label: 'Number' },
                  { type: 'string', name: 'label', label: 'Label' },
                  { type: 'string', name: 'heading', label: 'Heading' },
                  {
                    type: 'object',
                    name: 'items',
                    label: 'Items',
                    list: true,
                    ui: { itemProps: (item: any) => ({ label: item?.author }) },
                    fields: [
                      { type: 'string', name: 'quote', label: 'Quote', ui: { component: 'textarea' } },
                      { type: 'string', name: 'author', label: 'Author' },
                    ],
                  },
                ],
              },
              {
                name: 'creations',
                label: 'Creations',
                fields: [
                  { type: 'boolean', name: 'hidden', label: 'Hidden' },
                  { type: 'string', name: 'number', label: 'Number' },
                  { type: 'string', name: 'label', label: 'Label' },
                  { type: 'string', name: 'heading', label: 'Heading' },
                  {
                    type: 'object',
                    name: 'items',
                    label: 'Items',
                    list: true,
                    ui: { itemProps: (item: any) => ({ label: item?.title }) },
                    fields: [
                      { type: 'string', name: 'visual', label: 'Visual Style', options: ['v1', 'v2', 'v3'] },
                      { type: 'string', name: 'iconKey', label: 'Icon', options: ['music', 'writing', 'oils'] },
                      { type: 'string', name: 'title', label: 'Title' },
                      { type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
                    ],
                  },
                ],
              },
              {
                name: 'contact',
                label: 'Contact',
                fields: [
                  { type: 'boolean', name: 'hidden', label: 'Hidden' },
                  { type: 'string', name: 'number', label: 'Number' },
                  { type: 'string', name: 'label', label: 'Label' },
                  { type: 'string', name: 'heading', label: 'Heading' },
                  { type: 'string', name: 'email', label: 'Email' },
                  { type: 'string', name: 'formspreeId', label: 'Formspree Form ID' },
                  {
                    type: 'object',
                    name: 'socialLinks',
                    label: 'Social Links',
                    list: true,
                    ui: { itemProps: (item: any) => ({ label: item?.label }) },
                    fields: [
                      { type: 'string', name: 'label', label: 'Label' },
                      { type: 'string', name: 'url', label: 'URL' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'siteSettings',
        label: 'Site Settings',
        path: 'content/settings',
        match: { include: 'site' },
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'brand', label: 'Brand Name' },
          { type: 'string', name: 'copyright', label: 'Copyright' },
          {
            type: 'object',
            name: 'navLinks',
            label: 'Nav Links',
            list: true,
            ui: {
              itemProps: (item: any) => ({
                label: `${item?.label ?? ''}${item?.hidden ? ' (hidden)' : ''}`,
              }),
            },
            fields: [
              { type: 'boolean', name: 'hidden', label: 'Hidden' },
              { type: 'string', name: 'label', label: 'Label' },
              { type: 'string', name: 'href', label: 'Link' },
            ],
          },
          {
            type: 'object',
            name: 'navFooterLinks',
            label: 'Nav Social Links',
            list: true,
            ui: { itemProps: (item: any) => ({ label: item?.label }) },
            fields: [
              { type: 'string', name: 'label', label: 'Label' },
              { type: 'string', name: 'url', label: 'URL' },
            ],
          },
        ],
      },
      {
        name: 'post',
        label: 'Blog Posts',
        path: 'content/blog',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
          { type: 'datetime', name: 'date', label: 'Date' },
          { type: 'string', name: 'author', label: 'Author' },
          { type: 'string', name: 'excerpt', label: 'Excerpt', ui: { component: 'textarea' } },
          { type: 'image', name: 'featuredImage', label: 'Featured Image' },
          { type: 'rich-text', name: 'body', label: 'Body', isBody: true },
        ],
      },
    ],
  },
});
