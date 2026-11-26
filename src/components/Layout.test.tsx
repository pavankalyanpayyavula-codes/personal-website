import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';

const renderLayout = (route = '/page') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/page" element={<p>Page body</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

describe('Layout', () => {
  it('wraps the page in navbar, main and footer', () => {
    renderLayout();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Page body');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has a skip link that targets the main content', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute('href', '#main');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
  });

  it('scrolls to the top when a page opens', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo');
    renderLayout();
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    scrollTo.mockRestore();
  });
});
