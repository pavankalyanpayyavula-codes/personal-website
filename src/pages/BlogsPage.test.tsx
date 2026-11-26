import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogsPage from './BlogsPage';
import { blogs } from '../data';
import { renderAt } from '../test/utils';

describe('BlogsPage', () => {
  it('sets the page title and heading', () => {
    renderAt(<BlogsPage />, { route: '/blogs' });
    expect(document.title).toBe('Writing · Pavan Kalyan Payyavula');
    expect(
      screen.getByRole('heading', { level: 1, name: /notes on frontend engineering/i }),
    ).toBeInTheDocument();
  });

  it('shows every post with an "All Posts" filter selected', () => {
    renderAt(<BlogsPage />);
    expect(screen.getByRole('button', { name: 'All Posts' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    for (const post of blogs.posts) {
      expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument();
    }
  });

  it('filters posts by topic', async () => {
    const user = userEvent.setup();
    renderAt(<BlogsPage />);
    const category = blogs.categories.find(
      (c) => c.id !== 'all' && blogs.posts.some((p) => p.category === c.id),
    );
    if (!category) throw new Error('Test needs at least one category with posts');

    await user.click(screen.getByRole('button', { name: category.name }));
    expect(screen.getByRole('button', { name: category.name })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    for (const post of blogs.posts) {
      const heading = screen.queryByRole('heading', { name: post.title });
      if (post.category === category.id) expect(heading).toBeInTheDocument();
      else expect(heading).not.toBeInTheDocument();
    }
  });

  it('marks unpublished posts as coming soon without a link', () => {
    renderAt(<BlogsPage />);
    const upcoming = blogs.posts.filter((p) => p.comingSoon);
    expect(screen.getAllByText(/coming soon/i).length).toBe(upcoming.length);
    for (const post of upcoming) {
      expect(screen.getByRole('heading', { name: post.title }).querySelector('a')).toBeNull();
    }
  });
});
