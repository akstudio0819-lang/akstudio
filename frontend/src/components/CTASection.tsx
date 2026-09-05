import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-studio-black border-t border-studio-border">
      {/* Decorative Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-indigo/10 rounded-full glow-blur pointer-events-none" />

      <div className="studio-container relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent-cyan bg-accent-indigo/10 px-3 py-1.5 rounded border border-accent-indigo/20">
            Let's Collaborate
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold uppercase leading-tight text-studio-white">
            Ready to Take Your <br />
            <span className="bg-gradient-to-r from-accent-indigo via-accent-cyan to-indigo-500 bg-clip-text text-transparent">
              Business Online?
            </span>
          </h2>
          <p className="text-base sm:text-lg text-studio-text max-w-2xl mx-auto leading-relaxed font-sans">
            Tell us about your idea and let's create a digital experience that makes your brand stand out, attracts customers, and drives growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-studio-white hover:bg-accent-indigo text-studio-black hover:text-white px-8 py-4 rounded font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-accent-indigo/25"
            >
              <span>Start Your Project</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/consultation"
              className="w-full sm:w-auto bg-studio-card hover:bg-studio-black text-studio-white border border-studio-border hover:border-accent-cyan px-8 py-4 rounded font-sans font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              <span>Book a Consultation</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
