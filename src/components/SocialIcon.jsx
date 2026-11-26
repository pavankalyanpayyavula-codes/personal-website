import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const ICONS = {
  linkedin: faLinkedinIn,
  github: faGithub,
  email: faEnvelope,
};

const SocialIcon = ({ name, className = '' }) => {
  const icon = ICONS[name];
  return icon ? <FontAwesomeIcon icon={icon} className={className} fixedWidth /> : null;
};

export default SocialIcon;
