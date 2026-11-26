import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import type { IconName } from '../types/content';

const ICONS: Record<IconName, IconDefinition> = {
  linkedin: faLinkedinIn,
  github: faGithub,
  email: faEnvelope,
  resume: faFilePdf,
  download: faArrowDown,
};

interface SocialIconProps {
  /** Unknown names render nothing, so bad content data never crashes a page. */
  name: IconName | (string & {});
  className?: string;
}

const SocialIcon = ({ name, className = '' }: SocialIconProps) => {
  const icon = ICONS[name as IconName];
  return icon ? <FontAwesomeIcon icon={icon} className={className} fixedWidth /> : null;
};

export default SocialIcon;
