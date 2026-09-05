import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-studio-black relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent-indigo/10 rounded-full glow-blur pointer-events-none" />

      <div className="space-y-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-9xl sm:text-[12rem] font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-accent-indigo via-accent-cyan to-indigo-500 tracking-tighter"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-xl sm:text-2xl font-display font-semibold text-studio-white uppercase">
            Looks like this page went offline.
          </h2>
          <p className="text-xs sm:text-sm text-studio-text max-w-md mx-auto leading-relaxed">
            The link you clicked might be broken, or the page may have been moved or renamed in our recent dashboard overhaul.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-studio-white hover:bg-accent-indigo text-studio-black hover:text-white px-6 py-3 rounded text-sm font-semibold transition-all duration-300 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
