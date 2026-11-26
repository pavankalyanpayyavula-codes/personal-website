import { render, screen } from '@testing-library/react';
import App from './App';

const renderAt = (path: string) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

describe('App routing', () => {
  it.each([
    ['/', { level: 1, name: 'Pavan Kalyan Payyavula' }],
    ['/about', { level: 1, name: /hello, i'm pavan/i }],
    ['/career', { level: 1, name: 'Experience' }],
    ['/blogs', { level: 1, name: /notes on frontend engineering/i }],
    ['/contact', { level: 1, name: /let's talk/i }],
  ])('renders the right page at %s inside the shared layout', (path, heading) => {
    renderAt(path);
    expect(screen.getByRole('heading', heading)).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('redirects unknown URLs to the home page', () => {
    renderAt('/does-not-exist');
    expect(window.location.pathname).toBe('/');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Pavan Kalyan Payyavula' }),
    ).toBeInTheDocument();
  });
});
