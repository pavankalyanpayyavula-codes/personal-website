import { screen, within } from '@testing-library/react';
import CareerPage from './CareerPage';
import { career, contact } from '../data';
import { renderAt } from '../test/utils';

describe('CareerPage', () => {
  it('sets the page title and shows the heading', () => {
    renderAt(<CareerPage />, { route: '/career' });
    expect(document.title).toBe('Career · Pavan Kalyan Payyavula');
    expect(screen.getByRole('heading', { level: 1, name: 'Experience' })).toBeInTheDocument();
  });

  it('offers the resume as a PDF download', () => {
    renderAt(<CareerPage />);
    const link = screen.getByRole('link', { name: /download résumé \(pdf\)/i });
    expect(link).toHaveAttribute('href', contact.resume.url);
    expect(link).toHaveAttribute('download', contact.resume.fileName);
  });

  it('shows every role with company, dates and all achievements', () => {
    renderAt(<CareerPage />);
    for (const exp of career.experiences) {
      // A company can also appear on an award card, so look within the timeline.
      const timeline = document.querySelector('.timeline');
      expect(within(timeline).getByText(exp.company)).toBeInTheDocument();
      expect(within(timeline).getByText(exp.period)).toBeInTheDocument();
      for (const achievement of exp.achievements) {
        expect(screen.getByText(achievement)).toBeInTheDocument();
      }
    }
  });

  it('lists each skill category', () => {
    renderAt(<CareerPage />);
    for (const category of Object.keys(career.skills)) {
      expect(screen.getByText(category)).toBeInTheDocument();
    }
  });

  it('lists awards', () => {
    renderAt(<CareerPage />);
    for (const award of career.awards) {
      expect(screen.getByRole('heading', { name: award.title })).toBeInTheDocument();
    }
  });

  it('shows certifications and only links those with a real URL', () => {
    renderAt(<CareerPage />);
    for (const cert of career.certifications) {
      const heading = screen.getByRole('heading', { name: cert.name });
      const link = heading.querySelector('a');
      if (cert.link && cert.link !== '#') {
        expect(link).toHaveAttribute('href', cert.link);
      } else {
        expect(link).toBeNull();
      }
    }
  });
});
