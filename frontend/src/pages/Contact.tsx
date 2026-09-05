import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { SectionTitle } from '../components/SectionTitle';
import { Mail, Phone, MapPin, Check, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const location = useLocation();

  // Form Fields State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Website Design');
  const [budget, setBudget] = useState('₹25,000–₹50,000');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pre-fill fields if navigated from Pricing Quote Calculator
  useEffect(() => {
    if (location.state) {
      const stateObj = location.state as { service?: string; budget?: string; message?: string };
      if (stateObj.service) setService(stateObj.service);
      if (stateObj.budget) setBudget(stateObj.budget);
      if (stateObj.message) setMessage(stateObj.message);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setLoading(true);
    try {
      // 1. Save data to Supabase Database & Trigger Backend Email Dispatch
      await api.submitContact({
        name,
        email,
        phone,
        company,
        service,
        budget,
        message
      });

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfos = [
    { icon: <Mail className="text-accent-cyan" size={20} />, title: 'Email Address', detail: 'akstudio0819@gmail.com', action: 'mailto:akstudio0819@gmail.com' },
    { icon: <Phone className="text-accent-cyan" size={20} />, title: 'Phone Number', detail: '+91 9422124226', action: 'tel:+919422124226' },
    { icon: <MapPin className="text-accent-cyan" size={20} />, title: 'Studio Address', detail: 'At Post Advali, Malvan, Sindhudurg, Maharashtra, India', action: 'https://maps.google.com/?q=Advali+Malvan+Sindhudurg+Maharashtra' }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero */}
      <section className="studio-container pt-12 text-center max-w-4xl space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-3.5 py-1.5 rounded border border-accent-cyan/20">// START A CONVERSATION</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-studio-white leading-tight">
          Let's Build Something Great
        </h1>
        <p className="text-base sm:text-lg text-studio-text max-w-2xl mx-auto leading-relaxed font-sans">
          Tell us about your project brief, visual direction, and target deadline. Our studio team will review and reply within 24 hours.
        </p>
      </section>

      {/* Main Grid Contact Content */}
      <section className="studio-container grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Contact Info sidebar */}
        <div className="lg:col-span-5 space-y-8 lg:pr-8">
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-studio-white uppercase">// Studio Desk</h3>
            <p className="text-sm text-studio-text leading-relaxed">
              Have questions about pricing scopes, contract terms, or active maintenance plans? Reach out directly via email, phone, or by scheduling a free consultation.
            </p>
          </div>

          <div className="space-y-6">
            {contactInfos.map((info, idx) => (
              <a
                key={idx}
                href={info.action}
                className="block p-5 bg-studio-card border border-studio-border/60 hover:border-accent-cyan/40 rounded-lg transition-colors"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded bg-studio-black border border-studio-border flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-xs text-studio-text uppercase tracking-widest font-mono font-semibold">{info.title}</h4>
                    <p className="text-sm font-semibold text-studio-white mt-0.5">{info.detail}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Project Enquiry Form */}
        <div className="lg:col-span-7 bg-studio-card border border-studio-border p-8 rounded-lg">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto text-green-400">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-display font-bold text-studio-white uppercase">Inquiry Received</h3>
              <p className="text-sm text-studio-text max-w-md mx-auto leading-relaxed">
                Thanks! Your project enquiry has been received. We'll review your budget and requirements and get back to you soon.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs font-mono text-accent-cyan hover:text-studio-white border border-accent-cyan/20 px-4 py-2 rounded transition-colors"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text font-bold">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. aditya@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text font-bold">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 99999 88888"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text font-bold">Company / Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dream Avenue LLC"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text font-bold">Select Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors cursor-pointer"
                  >
                    <option value="Website Design">Website Design</option>
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="E-commerce">E-commerce Development</option>
                    <option value="Website Redesign">Website Redesign</option>
                    <option value="Custom Application">Custom Application</option>
                    <option value="Maintenance">Maintenance & Support</option>
                    <option value="Other">Other Digital Solution</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text font-bold">Project Scope / Scale</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors cursor-pointer"
                  >
                    <option value="Small Business / Startup">Small Business / Startup</option>
                    <option value="Medium Growth Business">Medium Growth Business</option>
                    <option value="Enterprise Platform">Enterprise Platform</option>
                    <option value="Custom Scope">Custom Scope</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text font-bold">Project Details</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Outline the project deliverables, integrations, design guides, or key deadlines..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-studio-white hover:bg-accent-indigo text-studio-black hover:text-white py-3.5 rounded font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Send Project Request</span>
                <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
