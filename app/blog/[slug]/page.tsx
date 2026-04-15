import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPost, getSiteSettings } from '@/lib/content';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} | Love Sophia Joy`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();
  const settings = getSiteSettings();

  return (
    <>
      <Nav settings={settings} />
      <main className="blog-post">
        <div className="blog-post-inner">
          <Link href="/blog" className="blog-back">
            ← Back to Journal
          </Link>
          <h1>{post.title}</h1>
          <p className="blog-meta">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {' · '}
            {post.author}
          </p>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </main>
      <Footer brand={settings.brand} copyright={settings.copyright} />
    </>
  );
}
