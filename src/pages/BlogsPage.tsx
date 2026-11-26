import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { blogs } from '../data';
import '../styles/BlogsPage.css';

const BlogsPage = () => {
  useDocumentTitle('Writing');
  const [category, setCategory] = useState('all');
  const { categories, posts } = blogs;

  const categoryName = (id: string): string => categories.find((c) => c.id === id)?.name ?? id;
  const visible = posts.filter((p) => category === 'all' || p.category === category);
  const allComingSoon = posts.every((p) => p.comingSoon);

  return (
    <div className="page container writing">
      <FadeIn className="page-header">
        <span className="eyebrow">Writing</span>
        <h1>Notes on frontend engineering</h1>
        <p>
          Articles on React, frontend architecture and growing as an engineer.
          {allComingSoon && ' The first posts are on the way.'}
        </p>
      </FadeIn>

      <FadeIn className="filters" delay={0.05}>
        <div role="group" aria-label="Filter by topic">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`filter ${category === c.id ? 'is-active' : ''}`}
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </FadeIn>

      {visible.length === 0 ? (
        <p className="empty">Nothing in this topic yet.</p>
      ) : (
        <ul className="post-list">
          {visible.map((post) => {
            const isLive = !post.comingSoon && Boolean(post.mediumUrl) && post.mediumUrl !== '#';
            return (
              <FadeIn as="li" key={post.id} className={`post ${isLive ? '' : 'is-upcoming'}`}>
                <div className="post-meta">
                  <span>{categoryName(post.category)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="post-title">
                  {isLive ? (
                    <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  ) : (
                    <span>{post.title}</span>
                  )}
                </h2>
                <p className="post-excerpt">{post.excerpt}</p>
                {!isLive && <span className="post-badge">Coming soon</span>}
              </FadeIn>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BlogsPage;
