import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const ICONS = {
  linkedin: faLinkedinIn,
  github: faGithub,
  email: faEnvelope,
  resume: faFilePdf,
  download: faArrowDown,
};

const SocialIcon = ({ name, className = '' }) => {
  const icon = ICONS[name];
  return icon ? <FontAwesomeIcon icon={icon} className={className} fixedWidth /> : null;
};

export default SocialIcon;
