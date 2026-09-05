import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/portfolio' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants: any = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
    opened: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    opened: { opacity: 1, x: 0 }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-studio-black/80 backdrop-blur-md border-b border-studio-border py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="studio-container flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-display text-xl font-bold tracking-tight text-studio-white flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded bg-gradient-to-tr from-accent-indigo to-accent-cyan flex items-center justify-center text-studio-black font-extrabold group-hover:scale-105 transition-transform">AK</span>
          <span className="group-hover:text-accent-cyan transition-colors">AK Studio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-sans text-sm font-medium transition-colors hover:text-studio-white ${
                  isActive ? 'text-studio-white' : 'text-studio-text'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeNavIndicator" 
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-accent-cyan"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Dashboard actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                className="flex items-center gap-1.5 text-xs text-accent-cyan hover:text-studio-white border border-accent-cyan/30 hover:border-studio-white px-3.5 py-1.5 rounded transition-all font-medium"
              >
                <LayoutDashboard size={14} />
                Portal
              </Link>
              <button 
                onClick={logout}
                className="text-studio-text hover:text-red-400 p-1.5 rounded transition-colors"
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <Link 
              to="/login"
              className="text-sm font-medium text-studio-text hover:text-studio-white transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link 
            to="/contact"
            className="relative group overflow-hidden bg-studio-white hover:bg-accent-indigo text-studio-black hover:text-white px-5 py-2.5 rounded font-sans text-sm font-semibold transition-all duration-300 flex items-center gap-1"
          >
            <span>Start a Project</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-3">
          {user && (
            <Link 
              to={user.role === 'admin' ? '/admin' : '/dashboard'} 
              className="text-accent-cyan p-1.5 border border-accent-cyan/20 rounded"
            >
              <LayoutDashboard size={18} />
            </Link>
          )}
          <button 
            onClick={toggleMenu} 
            className="text-studio-white p-1 hover:text-accent-cyan transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full left-0 right-0 bg-studio-dark/95 border-b border-studio-border backdrop-blur-lg md:hidden overflow-hidden z-30"
          >
            <div className="px-6 py-8 space-y-6 flex flex-col">
              {navLinks.map((link) => (
                <motion.div variants={itemVariants} key={link.name}>
                  <Link
                    to={link.path}
                    className={`block font-display text-lg font-medium py-1.5 transition-colors hover:text-accent-cyan ${
                      location.pathname === link.path ? 'text-accent-cyan' : 'text-studio-text'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <hr className="border-studio-border" />

              <motion.div variants={itemVariants} className="space-y-4">
                {user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-studio-text">Signed in as {user.name}</span>
                    <button 
                      onClick={logout} 
                      className="flex items-center gap-1 text-sm text-red-400 font-medium"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login"
                    className="block text-center text-sm font-medium text-studio-text hover:text-studio-white py-2 border border-studio-border rounded transition-colors"
                  >
                    Sign In
                  </Link>
                )}
                
                <Link
                  to="/contact"
                  className="block text-center bg-studio-white text-studio-black font-semibold py-3 rounded hover:bg-accent-indigo hover:text-white transition-all text-sm"
                >
                  Start a Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
