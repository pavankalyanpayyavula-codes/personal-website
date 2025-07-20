import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Blogs.css';

const Blogs = ({ onSearch, onTagSelect, searchTerm, selectedTags }) => {
  const [blogs, setBlogs] = useState([
    {
      title: 'Micro Frontend Architecture in Modern Web Development',
      date: 'March 15, 2025',
      preview: 'Exploring the benefits and implementation strategies of micro frontend architecture in large-scale applications. Learn how we implemented this architecture at Apple Maps to improve team autonomy and deployment frequency.',
      readTime: '5 min read',
      tags: ['Architecture', 'Frontend', 'React', 'Micro Frontend'],
      image: 'https://placehold.co/600x400/007bff/ffffff?text=Micro+Frontend'
    },
    {
      title: 'Optimizing React Performance: A Deep Dive',
      date: 'February 28, 2025',
      preview: 'Learn advanced techniques for optimizing React applications, from code splitting to memoization. Real-world examples from my experience at Rakuten where we achieved a 78% performance improvement.',
      readTime: '7 min read',
      tags: ['React', 'Performance', 'JavaScript', 'Optimization'],
      image: 'https://placehold.co/600x400/00a67e/ffffff?text=React+Performance'
    },
    {
      title: 'Building Accessible Web Applications',
      date: 'February 15, 2025',
      preview: 'A comprehensive guide to implementing web accessibility standards in modern web applications. How we achieved 98% accessibility score at Rakuten through systematic improvements.',
      readTime: '6 min read',
      tags: ['Accessibility', 'HTML', 'CSS', 'WCAG'],
      image: 'https://placehold.co/600x400/e64a19/ffffff?text=Web+Accessibility'
    },
    {
      title: 'Modern CI/CD Practices with Jenkins and Bitbucket',
      date: 'January 30, 2025',
      preview: 'Implementing robust CI/CD pipelines for React applications. A detailed look at how we reduced deployment time by 40% using automated testing and deployment strategies.',
      readTime: '8 min read',
      tags: ['DevOps', 'CI/CD', 'Jenkins', 'Automation'],
      image: 'https://placehold.co/600x400/6b4fbb/ffffff?text=CI+CD'
    },
    {
      title: 'Authentication Best Practices with Okta',
      date: 'January 15, 2025',
      preview: 'Implementing secure authentication in React applications using Okta. Learn about the integration process and best practices for handling user authentication at scale.',
      readTime: '6 min read',
      tags: ['Security', 'Authentication', 'Okta', 'React'],
      image: 'https://placehold.co/600x400/ff5722/ffffff?text=Auth+Security'
    },
    {
      title: 'Webpack 5 Migration Guide',
      date: 'December 30, 2024',
      preview: 'A step-by-step guide to migrating from Webpack 4 to Webpack 5. Based on real experience migrating a large-scale React application at Rakuten.',
      readTime: '9 min read',
      tags: ['Webpack', 'Build Tools', 'Performance', 'Migration'],
      image: 'https://placehold.co/600x400/8bc34a/ffffff?text=Webpack'
    }
  ]);

  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [activeTag, setActiveTag] = useState('');

  useEffect(() => {
    let filtered = [...blogs];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) ||
        blog.preview.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply tag filter
    if (activeTag) {
      filtered = filtered.filter(blog =>
        blog.tags.includes(activeTag)
      );
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, activeTag, blogs]);

  const handleTagClick = (tag) => {
    setActiveTag(activeTag === tag ? '' : tag);
    if (onTagSelect) {
      onTagSelect(tag);
    }
  };

  const getAllTags = () => {
    const tags = new Set();
    blogs.forEach(blog => {
      blog.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="blogs-container">
      <h1>Technical Blog</h1>
      <p className="blogs-intro">
        Sharing insights and experiences from my journey in software development.
        Here you'll find in-depth articles about frontend development, architecture, performance optimization,
        and best practices learned from working at Apple, Rakuten, and Cognizant.
      </p>
      
      <div className="blogs-filter">
        <input 
          type="text" 
          placeholder="Search articles..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="popular-tags">
          <span>Filter by:</span>
          {getAllTags().map((tag) => (
            <button 
              key={tag}
              className={`tag ${activeTag === tag ? 'active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        className="blogs-grid"
        layout
      >
        <AnimatePresence>
          {filteredBlogs.map((blog, index) => (
            <motion.article 
              key={blog.title}
              className="blog-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
            >
              <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="blog-date">{blog.date}</span>
                  <span className="blog-read-time">{blog.readTime}</span>
                </div>
                <h2>{blog.title}</h2>
                <p>{blog.preview}</p>
                <div className="blog-tags">
                  {blog.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`tag ${activeTag === tag ? 'active' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="read-more">Read More</button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredBlogs.length === 0 && (
        <div className="no-results">
          <h3>No articles found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Blogs; 