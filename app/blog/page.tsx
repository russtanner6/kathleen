import Link from 'next/link';
import { getAllBlogPosts, getSiteSettings } from '@/lib/content';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog | Love Sophia Joy',
  description: 'Reflections, invitations, and notes from Kathleen.',
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const settings = getSiteSettings();

  return (
    <>
      <Nav settings={settings} />
      <main className="blog-page">
        <div className="blog-inner">
          <div className="blog-header">
            <p className="section-label">Journal</p>
            <h1 className="section-heading">Reflections &amp; Offerings</h1>
          </div>
          <div className="blog-list">
            {posts.length === 0 ? (
              <p className="section-body" style={{ textAlign: 'center', margin: '0 auto' }}>
                No posts yet. Soon.
              </p>
            ) : (
              posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <p className="blog-meta">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h2>{post.title}</h2>
                  {post.excerpt && <p>{post.excerpt}</p>}
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer brand={settings.brand} copyright={settings.copyright} />
    </>
  );
}
