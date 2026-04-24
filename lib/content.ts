import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const ROOT = process.cwd();

export type HomeData = {
  meta: { title: string; description: string };
  blocks: any[];
};

export type SiteSettings = {
  brand: string;
  copyright: string;
  navLinks: { label: string; href: string; hidden?: boolean }[];
  navFooterLinks: { label: string; url: string }[];
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  featuredImage?: string;
};

export type BlogPost = BlogPostMeta & { contentHtml: string };

export function getHomeData(): HomeData {
  const file = path.join(ROOT, 'content/pages/home.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function getSiteSettings(): SiteSettings {
  const file = path.join(ROOT, 'content/settings/site.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const dir = path.join(ROOT, 'content/blog');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      author: data.author ?? 'Kathleen Newrones',
      excerpt: data.excerpt ?? '',
      featuredImage: data.featuredImage,
    } as BlogPostMeta;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const file = path.join(ROOT, 'content/blog', `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    author: data.author ?? 'Kathleen Newrones',
    excerpt: data.excerpt ?? '',
    featuredImage: data.featuredImage,
    contentHtml: processed.toString(),
  };
}
