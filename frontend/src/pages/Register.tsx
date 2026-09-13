import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, User, AlertCircle, Check, Info, Eye, EyeOff } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailConfirmRequired, setEmailConfirmRequired] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify both fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await register(name, email, password);
      if (res.error) {
        if (res.error.toLowerCase().includes('already registered') || res.error.toLowerCase().includes('user already exists')) {
          setErrorMsg('An account with this email already exists. Try signing in instead.');
        } else if (res.error.toLowerCase().includes('invalid email')) {
          setErrorMsg('Please enter a valid email address.');
        } else if (res.error.toLowerCase().includes('password')) {
          setErrorMsg('Password is too weak. Use at least 6 characters.');
        } else {
          setErrorMsg(res.error);
        }
      } else if (res.emailConfirmRequired) {
        setSuccess(true);
        setEmailConfirmRequired(true);
      } else {
        setSuccess(true);
        setEmailConfirmRequired(false);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setErrorMsg(null);
    try {
      const res = await loginWithGoogle();
      if (res.error) {
        setErrorMsg(res.error);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Google Sign-Up failed. Please try again.');
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
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan">// Registration</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-studio-white uppercase">Create Account</h2>
          <p className="text-xs text-studio-text">Open a client portal to track your project and book consultations.</p>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-start gap-3 text-sm text-red-400">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success — auto logged in, redirecting */}
        {success && !emailConfirmRequired && (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-center gap-3 text-sm text-green-400">
              <Check size={16} className="flex-shrink-0" />
              <span>Account created & signed in! Redirecting to your dashboard...</span>
            </div>
            <div className="flex justify-center">
              <svg className="animate-spin h-6 w-6 text-accent-cyan" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          </div>
        )}

        {/* Success — email confirmation required */}
        {success && emailConfirmRequired && (
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-start gap-3 text-sm text-green-400">
              <Check size={16} className="flex-shrink-0 mt-0.5" />
              <span>Account created successfully!</span>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex items-start gap-3 text-sm text-blue-400">
              <Info size={16} className="flex-shrink-0 mt-0.5" />
              <span>
                A confirmation link has been sent to <strong>{email}</strong>. Please check your inbox and click the link before signing in.
              </span>
            </div>
            <div className="text-center pt-2">
              <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-accent-cyan hover:text-studio-white transition-colors">
                Go to Sign In →
              </Link>
            </div>
          </div>
        )}

        {!success && (
          <>
            {/* Google Sign-Up Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
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
              <span>{googleLoading ? 'Connecting to Google...' : 'Sign Up with Google'}</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-studio-border/60 w-full" />
              <span className="bg-studio-card px-3 text-[10px] uppercase font-mono text-studio-text/60 absolute">Or Email</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1.5">
                  <User size={11} />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aditya Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-studio-border px-4 py-2.5 rounded-lg text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors placeholder:text-studio-text/40"
                />
              </div>

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

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1.5">
                  <Lock size={11} />
                  <span>Password</span>
                </label>
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

                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex gap-1 h-1">
                      <div className={`h-full flex-1 rounded-full transition-colors ${strength >= 1 ? 'bg-red-500' : 'bg-studio-border'}`} />
                      <div className={`h-full flex-1 rounded-full transition-colors ${strength >= 2 ? 'bg-orange-500' : 'bg-studio-border'}`} />
                      <div className={`h-full flex-1 rounded-full transition-colors ${strength >= 3 ? 'bg-yellow-500' : 'bg-studio-border'}`} />
                      <div className={`h-full flex-1 rounded-full transition-colors ${strength >= 4 ? 'bg-green-500' : 'bg-studio-border'}`} />
                    </div>
                    <p className="text-[10px] font-mono text-studio-text">
                      Strength: {strength <= 1 ? 'Weak' : strength <= 3 ? 'Medium' : 'Strong'}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1.5">
                  <Lock size={11} />
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-black border px-4 py-2.5 pr-10 rounded-lg text-sm text-studio-white focus:outline-none transition-colors placeholder:text-studio-text/40 ${
                      confirmPassword.length > 0
                        ? confirmPassword === password
                          ? 'border-green-500/60 focus:border-green-500'
                          : 'border-red-500/60 focus:border-red-500'
                        : 'border-studio-border focus:border-accent-cyan'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-studio-text hover:text-accent-cyan transition-colors"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirmPassword.length > 0 && confirmPassword !== password && (
                  <p className="text-[10px] text-red-400 font-mono">Passwords do not match</p>
                )}
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center text-xs text-studio-text pt-2 border-t border-studio-border/60">
              Already have an account?{' '}
              <Link to="/login" className="text-accent-cyan hover:text-studio-white transition-colors font-semibold">
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
