import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Lock, User, AlertCircle, Check, Eye, EyeOff, Info } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailConfirmRequired, setEmailConfirmRequired] = useState(false);

  // Password strength indicator
  const getPasswordStrength = (pw: string) => {
    if (!pw) return { label: '', color: '', width: '0%' };
    if (pw.length < 6) return { label: 'Too short', color: 'bg-red-500', width: '20%' };
    if (pw.length < 8) return { label: 'Weak', color: 'bg-orange-400', width: '40%' };
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw) && pw.length >= 8) return { label: 'Strong', color: 'bg-green-400', width: '100%' };
    return { label: 'Medium', color: 'bg-yellow-400', width: '70%' };
  };
  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return;

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
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
        // Email confirmation required — show message, user must confirm before signing in
        setSuccess(true);
        setEmailConfirmRequired(true);
      } else {
        // Auto sign-in succeeded — go straight to dashboard
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

              {/* Password with Eye Toggle */}
              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1.5">
                  <Lock size={11} />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min. 6 characters"
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
                {/* Password Strength Bar */}
                {password && (
                  <div className="space-y-1 pt-1">
                    <div className="h-1 w-full bg-studio-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                        style={{ width: strength.width }}
                      />
                    </div>
                    <p className="text-[10px] text-studio-text font-mono">{strength.label}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password with Eye Toggle */}
              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1.5">
                  <Lock size={11} />
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-black border px-4 py-2.5 pr-11 rounded-lg text-sm text-studio-white focus:outline-none transition-colors placeholder:text-studio-text/40 ${
                      confirmPassword && confirmPassword !== password
                        ? 'border-red-500/60 focus:border-red-500'
                        : confirmPassword && confirmPassword === password
                        ? 'border-green-500/60 focus:border-green-400'
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
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-[10px] text-red-400 font-mono">Passwords do not match</p>
                )}
                {confirmPassword && confirmPassword === password && (
                  <p className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                    <Check size={10} /> Passwords match
                  </p>
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
          </>
        )}

        {/* Sign In Link */}
        {!success && (
          <div className="text-center text-xs text-studio-text pt-1">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-cyan hover:text-studio-white transition-colors font-semibold">
              Sign In Here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
