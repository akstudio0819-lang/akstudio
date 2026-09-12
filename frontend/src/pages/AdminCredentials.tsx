import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield, Key, Mail, Lock, Check, ArrowRight, AlertCircle, Copy } from 'lucide-react';

export const AdminCredentials: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const adminEmail = 'akstudio0819@gmail.com';
  const adminPassword = 'Akstu@0819';

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleQuickLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    setStatusMsg('Signing into Admin Panel...');
    try {
      // 1. Try signing in
      const res = await login(adminEmail, adminPassword);
      if (res.error) {
        // 2. If user doesn't exist yet, auto-register the admin account
        setStatusMsg('Creating Admin Account in Supabase...');
        const regRes = await register('AK Studio Admin', adminEmail, adminPassword);
        if (regRes.error) {
          setErrorMsg(regRes.error);
        } else {
          // Log in after creation
          await login(adminEmail, adminPassword);
          navigate('/admin');
        }
      } else {
        navigate('/admin');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during Admin sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-black font-geist">
      <div className="max-w-xl w-full bg-studio-card border border-studio-border p-8 rounded-xl space-y-8 shadow-2xl shadow-black/60">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield size={24} className="text-white" />
            </div>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-accent-cyan">// Administrative Credentials Portal</span>
          <h1 className="text-3xl font-display font-bold text-studio-white uppercase">Admin Portal Credentials</h1>
          <p className="text-sm text-studio-text max-w-md mx-auto">
            Access client enquiries, strategy consultations, live reviews, service pricing, and system metrics.
          </p>
        </div>

        {/* Credentials Box */}
        <div className="bg-black/60 border border-studio-border/80 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border/50">
            <span className="text-xs font-mono font-bold uppercase text-accent-cyan flex items-center gap-1.5">
              <Key size={13} />
              <span>Primary Admin Account</span>
            </span>
            <span className="text-[11px] bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 px-2 py-0.5 rounded font-mono">
              Full Admin Privileges
            </span>
          </div>

          {/* Email Field */}
          <div className="flex items-center justify-between bg-studio-card p-3 rounded-lg border border-studio-border/50">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-studio-text" />
              <div>
                <p className="text-[10px] uppercase font-mono text-studio-text">Admin Email</p>
                <p className="text-sm font-semibold text-white font-mono">{adminEmail}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(adminEmail, 'email')}
              className="text-xs bg-studio-black hover:bg-studio-dark border border-studio-border px-3 py-1.5 rounded text-studio-text hover:text-white transition-colors flex items-center gap-1.5"
            >
              {copiedField === 'email' ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
              <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Password Field */}
          <div className="flex items-center justify-between bg-studio-card p-3 rounded-lg border border-studio-border/50">
            <div className="flex items-center gap-3">
              <Lock size={16} className="text-studio-text" />
              <div>
                <p className="text-[10px] uppercase font-mono text-studio-text">Admin Password</p>
                <p className="text-sm font-semibold text-accent-cyan font-mono">{adminPassword}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(adminPassword, 'password')}
              className="text-xs bg-studio-black hover:bg-studio-dark border border-studio-border px-3 py-1.5 rounded text-studio-text hover:text-white transition-colors flex items-center gap-1.5"
            >
              {copiedField === 'password' ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
              <span>{copiedField === 'password' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Secondary Email Note */}
          <div className="text-[11px] text-studio-text/70 pt-1">
            * Secondary fallback admin email: <span className="font-mono text-white">admin@akstudio.com</span>
          </div>
        </div>

        {/* Status / Error Alerts */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-center gap-3 text-sm text-red-400">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {statusMsg && !errorMsg && loading && (
          <div className="bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-lg text-xs text-cyan-400 text-center animate-pulse font-mono">
            {statusMsg}
          </div>
        )}

        {/* One-Click Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleQuickLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2.5 disabled:opacity-60"
          >
            <span>{loading ? 'Authenticating...' : 'One-Click Sign In to Admin Panel'}</span>
            <ArrowRight size={16} />
          </button>

          <div className="flex justify-between items-center text-xs text-studio-text pt-2">
            <Link to="/login" className="hover:text-white transition-colors">
              ← Standard Sign In Page
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Studio Desk →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
