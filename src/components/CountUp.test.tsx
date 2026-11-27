import { render, screen, waitFor } from '@testing-library/react';
import CountUp from './CountUp';

describe('CountUp', () => {
  it('gives screen readers the final value only', () => {
    const { container } = render(<CountUp value="20+" className="stat" />);
    expect(screen.getByText('20+')).toHaveClass('visually-hidden');
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('stat');
  });

  it('counts up to the final value once in view', async () => {
    const { container } = render(<CountUp value="20+" duration={0.05} />);
    const digits = container.querySelector('[aria-hidden="true"]');
    await waitFor(() => expect(digits).toHaveTextContent('20+'));
  });

  it('shows text without a leading number as-is', () => {
    const { container } = render(<CountUp value="Lead" />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent('Lead');
  });
});
