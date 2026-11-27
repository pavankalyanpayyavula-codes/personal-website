import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';

interface CountUpProps {
  /** Final text, e.g. "20+". The leading number counts up; the rest is kept as-is. */
  value: string;
  className?: string;
  duration?: number;
}

const NUMBER_RE = /^(\d+)(.*)$/;

// Counts a stat up from zero the first time it scrolls into view. Screen readers
// get the final value once (the moving digits are hidden from them), and visitors
// who prefer reduced motion see the final value straight away.
const CountUp = ({ value, className = '', duration = 1.2 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
  const shouldReduceMotion = useReducedMotion();
  const match = NUMBER_RE.exec(value);
  const target = match ? Number(match[1]) : 0;
  const suffix = match?.[2] ?? '';
  const count = useMotionValue(shouldReduceMotion ? target : 0);
  const text = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (shouldReduceMotion) {
      count.set(target);
      return undefined;
    }
    if (!isInView) return undefined;
    const controls = animate(count, target, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [count, isInView, shouldReduceMotion, target, duration]);

  return (
    <span className={className}>
      <span className="visually-hidden">{value}</span>
      <motion.span ref={ref} aria-hidden="true">
        {match ? text : value}
      </motion.span>
    </span>
  );
};

export default CountUp;
