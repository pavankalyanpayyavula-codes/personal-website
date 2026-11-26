import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';
import { contact, navigation } from '../data';

describe('Footer', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
  });

  it('invites visitors to get in touch', () => {
    expect(screen.getByText(/have a role or project in mind/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /let's talk/i })).toHaveAttribute('href', '/contact');
  });

  it('shows the current year in the copyright line', () => {
    expect(
      screen.getByText(`© ${new Date().getFullYear()} Pavan Kalyan Payyavula`),
    ).toBeInTheDocument();
  });

  it('links to every page', () => {
    const nav = screen.getByRole('list', { name: /footer/i });
    for (const link of navigation) {
      expect(within(nav).getByRole('link', { name: link.name })).toHaveAttribute('href', link.path);
    }
  });

  it('links to email and each social profile in a new tab', () => {
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      `mailto:${contact.email}`,
    );
    for (const social of contact.socials) {
      const link = screen.getByRole('link', { name: social.name });
      expect(link).toHaveAttribute('href', social.url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
