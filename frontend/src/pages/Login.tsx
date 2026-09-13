import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await login(email, password);
      if (res.error) {
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

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMsg(null);
    try {
      const res = await loginWithGoogle();
      if (res.error) {
        setErrorMsg(res.error);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Google Sign-In failed. Please try again.');
    } finally {
      setGoogleLoading(false);
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

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full bg-studio-black hover:bg-studio-dark border border-studio-border text-white py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-3 hover:border-accent-cyan/50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          <span>{googleLoading ? 'Connecting to Google...' : 'Sign In with Google'}</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-studio-border/60 w-full" />
          <span className="bg-studio-card px-3 text-[10px] uppercase font-mono text-studio-text/60 absolute">Or Email</span>
        </div>

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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-studio-border px-4 py-2.5 pr-10 rounded-lg text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors placeholder:text-studio-text/40"
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

        {/* Register Link */}
        <div className="text-center text-xs text-studio-text pt-2 border-t border-studio-border/60">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent-cyan hover:text-studio-white transition-colors font-semibold">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};
