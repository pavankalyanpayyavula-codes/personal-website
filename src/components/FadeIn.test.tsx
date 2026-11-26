import { render, screen } from '@testing-library/react';
import FadeIn from './FadeIn';

describe('FadeIn', () => {
  it('renders its children inside a div by default', () => {
    render(
      <FadeIn className="box">
        <p>Hello</p>
      </FadeIn>,
    );
    const wrapper = screen.getByText('Hello').parentElement;
    expect(wrapper?.tagName).toBe('DIV');
    expect(wrapper).toHaveClass('box');
  });

  it('renders as the element given in "as"', () => {
    render(
      <ul>
        <FadeIn as="li">Item</FadeIn>
      </ul>,
    );
    expect(screen.getByText('Item').tagName).toBe('LI');
  });

  it('falls back to a div for an unknown element name', () => {
    render(<FadeIn as={undefined}>Fallback</FadeIn>);
    expect(screen.getByText('Fallback').tagName).toBe('DIV');
  });
});
