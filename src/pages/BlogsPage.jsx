import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/BlogsPage.css';

const BlogsPage = () => {
  useEffect(() => {
    document.title = 'Blogs | Pavan Kalyan';
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'tech', name: 'Technology' },
    { id: 'web', name: 'Web Development' },
    { id: 'career', name: 'Career Growth' },
    { id: 'tutorial', name: 'Tutorials' }
  ];

  // Placeholder blog posts until you create your own on Medium
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React and TypeScript',
      category: 'web',
      date: 'Coming Soon',
      readTime: '10 min read',
      excerpt: 'A comprehensive guide to setting up and using TypeScript with React, including best practices and common pitfalls to avoid.',
      image: 'https://placehold.co/600x400/3b82f6/ffffff?text=React+%2B+TypeScript',
      mediumUrl: '#',
      comingSoon: true
    },
    {
      id: 2,
      title: 'Building Scalable Frontend Architecture',
      category: 'tech',
      date: 'Coming Soon',
      readTime: '12 min read',
      excerpt: 'Learn how to structure large-scale frontend applications using modern architecture patterns and best practices.',
      image: 'https://placehold.co/600x400/10b981/ffffff?text=Frontend+Architecture',
      mediumUrl: '#',
      comingSoon: true
    },
    {
      id: 3,
      title: 'From Junior to Senior Developer',
      category: 'career',
      date: 'Coming Soon',
      readTime: '8 min read',
      excerpt: 'Key insights and lessons learned during my journey from a junior to senior developer position.',
      image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Career+Growth',
      mediumUrl: '#',
      comingSoon: true
    },
    {
      id: 4,
      title: 'Mastering CSS Grid and Flexbox',
      category: 'tutorial',
      date: 'Coming Soon',
      readTime: '15 min read',
      excerpt: 'A detailed tutorial on creating responsive layouts using CSS Grid and Flexbox with practical examples.',
      image: 'https://placehold.co/600x400/ec4899/ffffff?text=CSS+Layout',
      mediumUrl: '#',
      comingSoon: true
    }
  ];

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  const handleReadMore = (post) => {
    if (post.comingSoon) {
      alert('This blog post is coming soon! Please check back later.');
    } else if (post.mediumUrl !== '#') {
      window.open(post.mediumUrl, '_blank');
    }
  };

  return (
    <div className="blogs-container">
      <motion.div 
        className="blogs-header"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1>My Blog</h1>
        <p>Sharing insights about technology, development, and professional growth</p>
      </motion.div>

      <motion.div 
        className="search-container"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        <input
          type="text"
          className="search-input"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </motion.div>

      <motion.div 
        className="categories-filter"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.3 }}
      >
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {isLoading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
        </div>
      ) : filteredPosts.length > 0 ? (
        <motion.div 
          className="blogs-grid"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={{ ...fadeIn.transition, delay: 0.4 }}
        >
          {filteredPosts.map(post => (
            <motion.article 
              key={post.id}
              className="blog-card"
              whileHover={{ y: -5 }}
            >
              <img className="blog-image" src={post.image} alt={post.title} />
              <div className="blog-content">
                <span className="blog-category">
                  {categories.find(c => c.id === post.category)?.name}
                </span>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <div className="blog-meta">
                    <span className="blog-date">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {post.date}
                    </span>
                    <span className="blog-read-time">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {post.readTime}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleReadMore(post)} 
                    className="read-more"
                  >
                    {post.comingSoon ? 'Coming Soon' : 'Read More'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="empty-state"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          transition={fadeIn.transition}
        >
          <h3>No posts found</h3>
          <p>Try adjusting your search or filter to find what you're looking for.</p>
          <button 
            className="category-button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
          >
            View all posts
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BlogsPage; 