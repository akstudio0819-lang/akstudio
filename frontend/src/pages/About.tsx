import React from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { Check, Target, Compass, Award, Shield, Eye, Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';

export const About: React.FC = () => {
  const values = [
    { icon: <Heart className="text-accent-cyan" size={20} />, title: 'Creativity', desc: 'Refusing cookie-cutter templates to deliver custom designs tailored exactly to your brand voice.' },
    { icon: <Award className="text-accent-cyan" size={20} />, title: 'Quality', desc: 'Building clean code structures that lead to fast load speeds, clean SEO indexation, and flawless security.' },
    { icon: <Eye className="text-accent-cyan" size={20} />, title: 'Transparency', desc: 'Maintaining clear client communications, project timeline reports, and upfront budgeting.' },
    { icon: <Compass className="text-accent-cyan" size={20} />, title: 'Innovation', desc: 'Using modern UI frameworks (React, Framer Motion) to deliver engaging micro-interactions.' },
    { icon: <Shield className="text-accent-cyan" size={20} />, title: 'Reliability', desc: 'Standing by our systems post-launch with database backups, server audits, and responsive fixes.' },
    { icon: <Users className="text-accent-cyan" size={20} />, title: 'User Experience', desc: 'Placing user testing, accessibility standards, and intuitive navigation loops at our core.' },
  ];

  const capabilities = [
    'Custom React/Vite Applications',
    'Responsive Branding UI Kits',
    'Secured E-commerce Frontends',
    'Fullstack Node/Express APIs',
    'Database Schemas (MongoDB)',
    'Third-Party Payment Hookups',
    'Client/Admin Support Panels',
    'Search Engine Optimization (SEO)',
    'Speed & Core Web Vitals Audits'
  ];

  return (
    <div className="space-y-32 pb-20">
      {/* Hero */}
      <section className="studio-container pt-12 text-center max-w-4xl space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-3.5 py-1.5 rounded border border-accent-cyan/20">// ABOUT THE STUDIO</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-studio-white leading-tight">
          We Create Digital <br />
          <span className="bg-gradient-to-r from-accent-indigo via-accent-cyan to-indigo-500 bg-clip-text text-transparent">
            Experiences
          </span> <br />
          With Purpose
        </h1>
        <p className="text-base sm:text-lg text-studio-text max-w-2xl mx-auto leading-relaxed font-sans">
          AK Studio was founded to bridge the gap between creative visual designs and high-fidelity, custom full-stack development. We believe your business site should load instantly, look stunning, and drive real business metrics.
        </p>
      </section>

      {/* Intro & Philosophy */}
      <section className="studio-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group overflow-hidden border border-studio-border/80 rounded-xl aspect-square bg-studio-card shadow-2xl shadow-accent-cyan/5">
          <img
            src="/akstudio-workstation.jpg"
            alt="AK Studio workstation setup"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-100 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-studio-black/60 via-transparent to-transparent opacity-60" />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-indigo">// OUR PHILOSOPHY</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-studio-white uppercase">
            Bespoke Engineering Over Generic Templates.
          </h2>
          <p className="text-studio-text leading-relaxed font-sans text-sm md:text-base">
            Templates are weighed down with bloated styling, conflicting script libraries, and rigid structures that break on mobile screens. Our approach is completely custom. We design your website pixel by pixel, then program it using lightweight modern structures that score at the top of search metrics and load inside a single second.
          </p>
          <p className="text-studio-text leading-relaxed font-sans text-sm md:text-base">
            Whether you need a simple visual showcase to capture enquiries or a custom multi-dashboard platform to coordinate clients, we build with clean Node, Express, MongoDB, and Supabase components to guarantee scale, flexibility, and absolute control.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="studio-container grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-studio-card border border-studio-border p-8 rounded-lg space-y-4">
          <div className="w-12 h-12 rounded-lg bg-studio-black border border-studio-border flex items-center justify-center text-accent-cyan">
            <Target size={24} />
          </div>
          <h3 className="text-xl font-display font-bold text-studio-white uppercase tracking-tight">Our Mission</h3>
          <p className="text-sm text-studio-text leading-relaxed font-sans">
            To build custom websites and software platforms that help businesses stand out, automate repetitive administrative tasks, and capture measurable customer conversions online.
          </p>
        </div>

        <div className="bg-studio-card border border-studio-border p-8 rounded-lg space-y-4">
          <div className="w-12 h-12 rounded-lg bg-studio-black border border-studio-border flex items-center justify-center text-accent-cyan">
            <Compass size={24} />
          </div>
          <h3 className="text-xl font-display font-bold text-studio-white uppercase tracking-tight">Our Vision</h3>
          <p className="text-sm text-studio-text leading-relaxed font-sans">
            To become the premier creative digital agency known for engineering clean, high-performance visual builds and bespoke fullstack dashboard systems for ambitious brands worldwide.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="studio-container">
        <SectionTitle
          title="Our Core Values"
          subtitle="The principles that guide how we write our code, layout our interfaces, and communicate with our clients."
          label="Values"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(0.4 + idx * 0.05, 20)}
              className="bg-studio-card border border-studio-border p-8 rounded-lg space-y-4"
            >
              <div className="w-10 h-10 rounded bg-studio-black border border-studio-border flex items-center justify-center">
                {val.icon}
              </div>
              <h4 className="text-base font-display font-bold text-studio-white uppercase tracking-tight">
                {val.title}
              </h4>
              <p className="text-xs md:text-sm text-studio-text leading-relaxed font-sans">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="studio-container text-center max-w-4xl space-y-8">
        <SectionTitle
          title="Studio Capabilities"
          subtitle="A summary of the modern technical capabilities and strategies we bring to every project scope."
          label="Capabilities"
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="bg-studio-card border border-studio-border/60 p-5 rounded-lg flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-accent-indigo/10 border border-accent-indigo/30 flex items-center justify-center flex-shrink-0 text-accent-cyan">
                <Check size={12} />
              </div>
              <span className="text-sm font-semibold text-studio-white">{cap}</span>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
};
