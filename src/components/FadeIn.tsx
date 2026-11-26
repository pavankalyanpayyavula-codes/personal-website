import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  ul: motion.ul,
  aside: motion.aside,
  section: motion.section,
} as const;

export type FadeInTag = keyof typeof MOTION_TAGS;

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: FadeInTag;
}

// Fades content up as it scrolls into view (once). Turned off automatically
// for visitors who prefer reduced motion (see MotionConfig in App.tsx).
const FadeIn = ({ children, delay = 0, className = '', as = 'div' }: FadeInProps) => {
  // Every entry shares motion.div's props, so treat them as one component type.
  const Component = (MOTION_TAGS[as] ?? motion.div) as typeof motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
};

export default FadeIn;
