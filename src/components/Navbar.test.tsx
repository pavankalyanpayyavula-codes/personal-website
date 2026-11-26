import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Navbar from './Navbar';
import { navigation } from '../data';

const renderNav = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Navbar links={navigation} />
    </MemoryRouter>,
  );

describe('Navbar', () => {
  it('renders the logo link home and every navigation link', () => {
    renderNav();
    expect(screen.getByRole('link', { name: /pavan kalyan, home/i })).toHaveAttribute('href', '/');
    for (const link of navigation) {
      expect(screen.getByRole('link', { name: link.name })).toHaveAttribute('href', link.path);
    }
  });

  it('marks the link for the current page as active', () => {
    renderNav('/career');
    expect(screen.getByRole('link', { name: 'Career' })).toHaveClass('is-active');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveClass('is-active');
  });

  it('opens and closes the mobile menu with the toggle button', async () => {
    const user = userEvent.setup();
    renderNav();
    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName(/close menu/i);
    expect(document.getElementById('primary-nav')).toHaveClass('is-open');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    renderNav();
    const toggle = screen.getByRole('button', { name: /open menu/i });
    await user.click(toggle);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the menu after navigating to another page', async () => {
    const user = userEvent.setup();
    renderNav();
    const toggle = screen.getByRole('button', { name: /open menu/i });
    await user.click(toggle);
    await user.click(screen.getByRole('link', { name: 'Contact' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('raises the bar once the page is scrolled', () => {
    const { container } = renderNav();
    const header = container.querySelector('header');
    expect(header).not.toHaveClass('is-raised');

    window.scrollY = 100;
    fireEvent.scroll(window);
    expect(header).toHaveClass('is-raised');

    window.scrollY = 0;
    fireEvent.scroll(window);
    expect(header).not.toHaveClass('is-raised');
  });

  it('renders no links when none are passed', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(document.querySelectorAll('#primary-nav li')).toHaveLength(0);
  });
});
