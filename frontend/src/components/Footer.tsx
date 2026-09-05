import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Check } from 'lucide-react';
import { api } from '../services/api';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await api.subscribeNewsletter(email);
      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/portfolio' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Web Design', path: '/services' },
    { name: 'Development', path: '/services' },
    { name: 'UI/UX Design', path: '/services' },
    { name: 'E-commerce', path: '/services' },
  ];

  const socialLinks = [
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, href: 'https://instagram.com/akstudio', name: 'Instagram' },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, href: 'https://linkedin.com/company/akstudio', name: 'LinkedIn' },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, href: 'https://facebook.com/akstudio', name: 'Facebook' },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>, href: 'https://youtube.com/akstudio', name: 'YouTube' },
  ];

  return (
    <footer className="bg-studio-dark border-t border-studio-border pt-20 pb-10 mt-auto">
      <div className="studio-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="font-display text-xl font-bold tracking-tight text-studio-white flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-gradient-to-tr from-accent-indigo to-accent-cyan flex items-center justify-center text-studio-black font-extrabold">AK</span>
              <span>AK Studio</span>
            </Link>
            <p className="text-sm text-studio-text leading-relaxed">
              Designing digital experiences that help businesses build their brand, attract customers, and grow online.
            </p>
            <div className="space-y-1.5 text-xs text-studio-text font-sans">
              <p><span className="font-semibold text-studio-white">Phone:</span> +91 9422124226</p>
              <p><span className="font-semibold text-studio-white">Email:</span> akstudio0819@gmail.com</p>
              <p><span className="font-semibold text-studio-white">Location:</span> At Post Advali, Malvan, Sindhudurg, Maharashtra, India</p>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-studio-card border border-studio-border flex items-center justify-center text-studio-text hover:text-accent-cyan hover:border-accent-cyan transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-studio-white uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-studio-text hover:text-studio-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-studio-white uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-studio-text hover:text-studio-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-studio-white uppercase tracking-wider">Stay Connected</h4>
            <p className="text-sm text-studio-text leading-relaxed">
              Subscribe to our monthly newsletter for design tips, development trends, and studio updates.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-studio-card border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-indigo transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-accent-indigo hover:bg-indigo-700 text-white px-4 py-2.5 rounded transition-all flex items-center justify-center min-w-[46px]"
              >
                {success ? <Check size={16} /> : <Send size={16} />}
              </button>
            </form>
            {success && (
              <p className="text-xs text-green-400">Thanks for subscribing to our newsletter!</p>
            )}
          </div>
        </div>

        <hr className="border-studio-border mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-studio-text">
          <div>
            © 2026 AK Studio. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-studio-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-studio-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
