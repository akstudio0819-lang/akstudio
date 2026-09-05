import React, { useState } from 'react';
import { api } from '../services/api';
import { SectionTitle } from '../components/SectionTitle';
import { Calendar, Clock, Check, Send } from 'lucide-react';

export const Consultation: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [projectType, setProjectType] = useState('Website Design');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date || !time) return;
    setLoading(true);
    try {
      // 1. Save data to Supabase Database
      await api.bookConsultation({
        name,
        email,
        phone,
        date,
        time,
        projectType,
        message
      });

      // 2. Dispatch Email notification to akstudio0819@gmail.com
      const mailSubject = encodeURIComponent(`New Consultation Request from ${name}`);
      const mailBody = encodeURIComponent(
        `New Discovery Call Scheduled!\n\n` +
        `Client Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'N/A'}\n` +
        `Requested Date: ${date}\n` +
        `Requested Time: ${time}\n` +
        `Service Focus: ${projectType}\n\n` +
        `Notes / Message:\n${message || 'N/A'}\n\n` +
        `Submitted via AK Studio Website`
      );

      const mailtoUrl = `mailto:akstudio0819@gmail.com?subject=${mailSubject}&body=${mailBody}`;
      window.open(mailtoUrl, '_blank');

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setDate('');
      setTime('');
      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero */}
      <section className="studio-container pt-12 text-center max-w-4xl space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-3.5 py-1.5 rounded border border-accent-cyan/20">// INTRODUCTORY DISCOVERY</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-studio-white leading-tight">
          Book a Free Consultation
        </h1>
        <p className="text-base sm:text-lg text-studio-text max-w-2xl mx-auto leading-relaxed font-sans">
          Schedule a 30-minute introductory meeting to clarify your requirements, outline estimated budgets, and structure design ideas.
        </p>
      </section>

      {/* Booking Form Layout */}
      <section className="studio-container max-w-3xl mx-auto">
        <div className="bg-studio-card border border-studio-border p-8 md:p-10 rounded-lg">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto text-green-400">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-display font-bold text-studio-white uppercase">Consultation Booked</h3>
              <p className="text-sm text-studio-text max-w-md mx-auto leading-relaxed">
                Thank you! Your free introductory consultation has been requested. We will check the scheduling timeline and email a Google Meet invite shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs font-mono text-accent-cyan hover:text-studio-white border border-accent-cyan/20 px-4 py-2 rounded transition-colors"
                >
                  Schedule another time
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
                  <label className="text-xs uppercase font-mono text-studio-text font-bold">Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text font-bold flex items-center gap-1">
                    <Clock size={14} />
                    <span>Preferred Time</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan transition-colors cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text font-bold">Brief Scope or Questions</label>
                <textarea
                  rows={4}
                  placeholder="Outline any specific design references, platform models or problems..."
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
                <span>Book Consultation</span>
                <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
