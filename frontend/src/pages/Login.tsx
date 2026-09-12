import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await login(email, password);
      if (res.error) {
        // Friendly error messages
        if (res.error.toLowerCase().includes('invalid login credentials') || res.error.toLowerCase().includes('invalid credentials')) {
          setErrorMsg('Incorrect email or password. Please try again.');
        } else if (res.error.toLowerCase().includes('email not confirmed')) {
          setErrorMsg('Please confirm your email address before signing in. Check your inbox for a confirmation link.');
        } else if (res.error.toLowerCase().includes('too many requests')) {
          setErrorMsg('Too many login attempts. Please wait a moment and try again.');
        } else {
          setErrorMsg(res.error);
        }
      } else {
        if (res.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-black font-geist">
      <div className="max-w-md w-full bg-studio-card border border-studio-border p-8 rounded-xl space-y-6 shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-sm font-bold text-white">AK</span>
            </div>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan">// Secure Portal</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-studio-white uppercase">Sign In</h2>
          <p className="text-xs text-studio-text">Access your project milestones and client dashboard.</p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-start gap-3 text-sm text-red-400">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1.5">
              <Mail size={11} />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-studio-border px-4 py-2.5 rounded-lg text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors placeholder:text-studio-text/40"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1.5">
                <Lock size={11} />
                <span>Password</span>
              </label>
              <Link to="/forgot-password" className="text-xs text-accent-cyan hover:text-studio-white transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-studio-border px-4 py-2.5 pr-11 rounded-lg text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors placeholder:text-studio-text/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-studio-text hover:text-accent-cyan transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-accent-indigo text-black hover:text-white py-3.5 rounded-lg font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Register & Admin Links */}
        <div className="space-y-3 pt-2 border-t border-studio-border/60">
          <div className="text-center text-xs text-studio-text">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent-cyan hover:text-studio-white transition-colors font-semibold">
              Create Account
            </Link>
          </div>

          <div className="text-center">
            <Link
              to="/admin-credentials"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400/90 hover:text-cyan-300 font-mono bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-3 py-1.5 rounded transition-all"
            >
              <span>🔑 Admin Credentials &amp; Quick Sign In Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
