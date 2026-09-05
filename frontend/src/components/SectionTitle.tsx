import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  label?: string;
  center?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  label,
  center = false
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp(0.6, 30)}
      className={`max-w-3xl mb-16 ${center ? 'mx-auto text-center' : 'text-left'}`}
    >
      {label && (
        <span className="inline-block text-xs font-bold tracking-widest text-accent-cyan uppercase mb-3">
          // {label}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-display font-bold text-studio-white uppercase leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-studio-text leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
