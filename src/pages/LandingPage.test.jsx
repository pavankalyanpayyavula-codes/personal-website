import { screen, within } from '@testing-library/react';
import LandingPage from './LandingPage';
import { career, contact, careerStartYear } from '../data';
import { renderAt } from '../test/utils';

describe('LandingPage', () => {
  afterEach(() => vi.useRealTimers());

  it('introduces Pavan with name, role and photo', () => {
    renderAt(<LandingPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Pavan Kalyan Payyavula' })).toBeInTheDocument();
    expect(screen.getByText(/senior software engineer · hyderabad/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pavan kalyan/i })).toBeInTheDocument();
  });

  it('sets the home page title', () => {
    renderAt(<LandingPage />);
    expect(document.title).toBe('Pavan Kalyan Payyavula · Senior Frontend Engineer');
  });

  it('calculates years of experience from the career start year', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(careerStartYear + 9, 5, 1));
    renderAt(<LandingPage />);
    expect(screen.getByText(/front-end engineer with 9\+ years/i)).toBeInTheDocument();
    expect(within(document.querySelector('.stats')).getByText('9+')).toBeInTheDocument();
  });

  it('links to the career page and offers the resume download', () => {
    renderAt(<LandingPage />);
    expect(screen.getByRole('link', { name: /see my work/i })).toHaveAttribute('href', '/career');
    const resume = screen.getByRole('link', { name: /download résumé/i });
    expect(resume).toHaveAttribute('href', contact.resume.url);
    expect(resume).toHaveAttribute('download', contact.resume.fileName);
  });

  it('lists every employer with role and dates', () => {
    renderAt(<LandingPage />);
    for (const exp of career.experiences) {
      expect(screen.getByRole('heading', { name: exp.company })).toBeInTheDocument();
      expect(screen.getAllByText(exp.period).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole('link', { name: /full career history/i })).toHaveAttribute('href', '/career');
  });

  it('links to social profiles', () => {
    renderAt(<LandingPage />);
    const social = screen.getByRole('list', { name: /elsewhere/i });
    for (const s of contact.socials) {
      expect(within(social).getByRole('link', { name: new RegExp(s.name) })).toHaveAttribute('href', s.url);
    }
  });
});
