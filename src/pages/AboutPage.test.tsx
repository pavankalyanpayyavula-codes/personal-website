import { screen } from '@testing-library/react';
import AboutPage from './AboutPage';
import { home } from '../data';
import { renderAt } from '../test/utils';

describe('AboutPage', () => {
  beforeEach(() => renderAt(<AboutPage />, { route: '/about' }));

  it('greets the visitor and sets the page title', () => {
    expect(
      screen.getByRole('heading', { level: 1, name: /hello, i'm pavan/i }),
    ).toBeInTheDocument();
    expect(document.title).toBe('About · Pavan Kalyan Payyavula');
  });

  it('shows the bio with the profile photo', () => {
    expect(screen.getByText(/lead a team of four frontend engineers/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pavan kalyan/i })).toHaveAttribute(
      'src',
      home.profileImage,
    );
  });

  it('renders a card for each skill group with all its skills', () => {
    for (const group of home.skills) {
      expect(screen.getByRole('heading', { name: group.title })).toBeInTheDocument();
      for (const skill of group.skills) {
        expect(screen.getAllByText(skill).length).toBeGreaterThan(0);
      }
    }
  });

  it('lists education and interests', () => {
    for (const edu of home.education) {
      expect(screen.getByRole('heading', { name: edu.degree })).toBeInTheDocument();
      expect(screen.getByText(edu.school)).toBeInTheDocument();
    }
    for (const interest of home.interests) {
      expect(screen.getByText(interest.title, { exact: false })).toBeInTheDocument();
    }
  });
});
