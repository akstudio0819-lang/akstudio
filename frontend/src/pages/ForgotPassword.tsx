import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Mail, Check, AlertCircle, ArrowLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await resetPassword(email);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 bg-studio-black">
      <div className="max-w-md w-full bg-studio-card border border-studio-border p-8 rounded-lg space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan">// Password Recovery</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-studio-white uppercase">Reset Password</h2>
          <p className="text-xs text-studio-text">Provide your email address below, and we'll dispatch a link to securely reset your credentials.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded flex items-center gap-3 text-sm text-red-400">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {success ? (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded flex items-center gap-3 text-sm text-green-400">
              <Check size={18} className="flex-shrink-0" />
              <span>Password recovery instructions dispatched! Check your email inbox.</span>
            </div>
            <Link
              to="/login"
              className="w-full bg-studio-white hover:bg-accent-indigo text-studio-black hover:text-white py-3 rounded font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Return to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1.5">
                <Mail size={12} />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                required
                placeholder="e.g. aditya@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-studio-white hover:bg-accent-indigo text-studio-black hover:text-white py-3.5 rounded font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center"
            >
              <span>{loading ? 'Sending Instructions...' : 'Send Recovery Email'}</span>
            </button>
          </form>
        )}

        <div className="text-center text-xs">
          <Link to="/login" className="text-studio-text hover:text-studio-white transition-colors flex items-center justify-center gap-1.5 font-semibold">
            <ArrowLeft size={12} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
