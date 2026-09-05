import { Variants } from 'framer-motion';

export const fadeIn = (duration = 0.5): Variants => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration, ease: 'easeOut' }
  }
});

export const fadeUp = (duration = 0.6, distance = 40): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.25, 0.1, 0.25, 1.0] }
  }
});

export const fadeDown = (duration = 0.6, distance = 40): Variants => ({
  hidden: { opacity: 0, y: -distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.25, 0.1, 0.25, 1.0] }
  }
});

export const slideLeft = (duration = 0.6, distance = 50): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: [0.25, 0.1, 0.25, 1.0] }
  }
});

export const slideRight = (duration = 0.6, distance = 50): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: [0.25, 0.1, 0.25, 1.0] }
  }
});

export const scaleIn = (duration = 0.5, delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, delay, ease: 'easeOut' }
  }
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const textReveal: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
  }
};

export const imageReveal: Variants = {
  hidden: { scale: 1.15, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }
  }
};
