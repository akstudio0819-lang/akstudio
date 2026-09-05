import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Review } from '../utils/mockData';
import { ReviewCard } from './ReviewCard';

interface TestimonialSliderProps {
  testimonials: Review[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-10 border border-studio-border rounded-lg bg-studio-card">
        <p className="text-studio-text">No reviews published yet.</p>
      </div>
    );
  }

  const current = testimonials[index];

  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Decorative Quote Icon */}
      <div className="absolute -top-6 -left-6 text-accent-indigo/10 pointer-events-none hidden sm:block">
        <Quote size={120} className="transform rotate-180" />
      </div>

      <div className="relative overflow-hidden min-h-[300px] flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            <ReviewCard
              name={current.name}
              business={current.business}
              rating={current.rating}
              review={current.review}
              image={current.image}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Actions */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-studio-border bg-studio-card hover:bg-studio-black hover:border-accent-cyan text-studio-white hover:text-accent-cyan flex items-center justify-center transition-all"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-xs font-mono text-studio-text">
          {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
        </span>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-studio-border bg-studio-card hover:bg-studio-black hover:border-accent-cyan text-studio-white hover:text-accent-cyan flex items-center justify-center transition-all"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
