import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0, className = '' }) => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay }
    };

    return (
        <motion.div
            className={className}
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
