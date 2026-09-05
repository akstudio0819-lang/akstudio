import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const FoldcraftHero: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/portfolio' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-geist">
      {/* Video Background (no z-index) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover [object-position:70%_center]"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navbar (z-30) */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        {/* Left Side: AK Logo + Brand Name */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          {/* AK Gradient Logo Box */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
            <span className="text-sm font-bold text-white tracking-tight">AK</span>
          </div>
          <span className="text-[15px] font-semibold text-white tracking-tight">AK Studio</span>
        </Link>

        {/* Center: Desktop Nav Links */}
        <div className="hidden items-center gap-7 md:flex absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-white font-semibold underline underline-offset-4 decoration-white/60'
                    : 'text-white/70 hover:text-white font-normal'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side Desktop: Sign In + Start a Project */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm text-white/80 hover:text-white transition-colors font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105"
          >
            Start a Project
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-white transition-transform active:scale-90 md:hidden"
          aria-label="Toggle menu"
        >
          <Menu
            className={`absolute h-6 w-6 transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            className={`absolute h-6 w-6 transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu (z-20) */}
      <div
        className={`absolute inset-x-0 top-0 z-20 bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'h-screen opacity-100'
            : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-all duration-500 delay-100 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-3xl font-medium transition-colors ${
                  location.pathname === link.path ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 self-start rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
              >
                Start a Project
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content (z-10) */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col justify-center px-6 py-12 md:px-12 lg:px-16 max-w-4xl">
        {/* Top Badge */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-cyan-400 sm:text-sm animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
          WEB DESIGN &amp; DEVELOPMENT STUDIO
        </p>

        {/* Main H1 Title */}
        <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
          Your Business<br />
          Deserves a Website<br />
          That <span className="text-blue-500">Stands Out.</span>
        </h1>

        {/* Description Paragraph */}
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg animate-[fadeSlideUp_0.8s_ease_0.6s_both]">
          AK Studio designs and develops modern business websites, portfolio websites, and digital experiences that help you attract customers and grow online.
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-wrap items-center gap-4 animate-[fadeSlideUp_0.8s_ease_0.8s_both]">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            <span>Start Your Project</span>
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:scale-105"
          >
            <span>Explore Our Work</span>
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Bottom Feature Bullets */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-white/90 sm:text-sm animate-[fadeSlideUp_0.8s_ease_1.0s_both]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            <span>Modern Design</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            <span>Clean Code</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            <span>High Performance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
