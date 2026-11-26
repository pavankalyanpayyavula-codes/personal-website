import { render } from '@testing-library/react';
import SocialIcon from './SocialIcon';

describe('SocialIcon', () => {
  it.each([
    ['linkedin', 'linkedin-in'],
    ['github', 'github'],
    ['email', 'envelope'],
    ['resume', 'file-pdf'],
    ['download', 'arrow-down'],
  ])('renders the %s icon', (name, faName) => {
    const { container } = render(<SocialIcon name={name} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('data-icon', faName);
  });

  it('passes through a className', () => {
    const { container } = render(<SocialIcon name="github" className="contact-icon" />);
    expect(container.querySelector('svg')).toHaveClass('contact-icon');
  });

  it('renders nothing for an unknown icon name', () => {
    const { container } = render(<SocialIcon name="myspace" />);
    expect(container).toBeEmptyDOMElement();
  });
});
