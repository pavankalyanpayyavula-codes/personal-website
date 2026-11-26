import { render, screen } from '@testing-library/react';
import Logo from './Logo';

describe('Logo', () => {
  it('shows the name and a decorative PK monogram', () => {
    const { container } = render(<Logo />);
    expect(screen.getByText('Pavan Kalyan')).toBeInTheDocument();
    const mark = container.querySelector('.logo-mark');
    expect(mark).toHaveTextContent('PK');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
  });
});
