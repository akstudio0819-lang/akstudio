import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Server, Check, Layers, Code, RefreshCw, Zap } from 'lucide-react';
import { api } from '../services/api';
import { Project, Service, Review } from '../utils/mockData';
import { SectionTitle } from '../components/SectionTitle';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { CTASection } from '../components/CTASection';
import { FoldcraftHero } from '../components/FoldcraftHero';
import { fadeUp, staggerContainer } from '../animations/variants';

export const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, projectsRes, reviewsRes] = await Promise.all([
          api.getServices(),
          api.getProjects(),
          api.getReviews(),
        ]);
        setServices(servicesRes.filter(s => s.active));
        setProjects(projectsRes.slice(0, 3)); // show top 3 on home page
        setReviews(reviewsRes.filter(r => r.approved));
      } catch (err) {
        console.error('Error fetching home data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
    { value: '100%', label: 'Commitment' },
    { value: '24/7', label: 'Support & Health' },
  ];

  const features = [
    { icon: <Sparkles className="text-accent-cyan" size={24} />, title: 'Premium Design', desc: 'Crafting unique, tailored, and bespoke digital aesthetics that instantly command authority and trust.' },
    { icon: <Layers className="text-accent-cyan" size={24} />, title: 'User-Focused UX', desc: 'Detailing intuitive layouts and workflows optimized to convert casual visitors into qualified customers.' },
    { icon: <Code className="text-accent-cyan" size={24} />, title: 'Modern Technology', desc: 'Leveraging top frameworks like React, TypeScript, Node, and MongoDB for flawless scaling and speed.' },
    { icon: <Zap className="text-accent-cyan" size={24} />, title: 'Responsive Experience', desc: 'Achieving pixel-perfect compatibility across every standard screen dimension from mobile to 4K.' },
    { icon: <Server className="text-accent-cyan" size={24} />, title: 'Performance Focused', desc: 'Scoring green Core Web Vitals targets with smart asset builds, rendering checks, and low page size.' },
    { icon: <RefreshCw className="text-accent-cyan" size={24} />, title: 'Long-Term Support', desc: 'Providing active updates, automated backups, and monthly metrics logs to keep you ahead.' },
  ];

  const processSteps = [
    { num: '01', title: 'Discovery', desc: 'Deep research into your target audience, competitors, business metrics, and goals.' },
    { num: '02', title: 'Strategy', desc: 'Establishing structure wireframes, page paths, site architecture, and content blueprints.' },
    { num: '03', title: 'Design', desc: 'Polishing premium UI visual mockups, style kits, assets, and prototype layouts.' },
    { num: '04', title: 'Development', desc: 'Rebuilding pixel-perfect layouts with react structures, tailwind CSS, and database routes.' },
    { num: '05', title: 'Testing', desc: 'Verifying responsivity breakpoints, API payload speeds, and cross-browser security checks.' },
    { num: '06', title: 'Launch', desc: 'Deploying source files, setting domain bindings, tracking tools, and handover files.' },
  ];

  const techBadges = [
    'React', 'Node.js', 'MongoDB', 'Supabase', 'Framer Motion', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Express.js', 'Redux Toolkit'
  ];

  return (
    <div className="space-y-32 pb-20 font-geist">
      {/* SECTION 01 — FOLDCRAFT HERO */}
      <FoldcraftHero />

      {/* SECTION 02 — TRUST / STATS */}
      <section className="studio-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-6 border-y border-studio-border/60 bg-studio-card/30 rounded-lg backdrop-blur-sm">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(0.5 + index * 0.1, 20)}
              className="text-center space-y-2"
            >
              <h3 className="text-3xl md:text-5xl font-display font-bold text-accent-cyan tracking-tight">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm text-studio-text uppercase tracking-wider font-semibold font-mono">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 03 — ABOUT INTRO / WHO WE ARE */}
      <section className="studio-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">// WHO WE ARE</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-studio-white uppercase leading-tight tracking-tight">
            WE DON’T JUST BUILD WEBSITES.<br />
            WE BUILD DIGITAL EXPERIENCES.
          </h2>
          <p className="text-studio-text leading-relaxed font-sans text-base sm:text-lg max-w-2xl">
            AK Studio combines high-fidelity custom design, conversion strategies, and clean React-based technology. We replace slow templates with lightweight, custom codebases that provide instantaneous loading, intuitive navigation flow, and direct customer engagement.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-studio-white hover:text-accent-cyan transition-colors"
            >
              <span>MORE ABOUT AK STUDIO</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Workstation Image Card */}
        <div className="lg:col-span-5 relative group overflow-hidden border border-studio-border/80 rounded-xl aspect-[4/3] lg:aspect-square bg-studio-card shadow-2xl shadow-accent-cyan/5">
          <img
            src="/akstudio-workstation.jpg"
            alt="AK Studio workstation setup"
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 brightness-100 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-studio-black/60 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
            <span className="font-semibold text-accent-cyan">DESIGN • DEVELOP • DEPLOY</span>
            <span className="text-[10px] text-white/60">AK STUDIO SETUP</span>
          </div>
        </div>
      </section>

      {/* SECTION 04 — SERVICES */}
      <section className="studio-container">
        <SectionTitle
          title="What We Do"
          subtitle="A suite of digital services customized to establish your brand presence and optimize your conversion pipeline."
          label="Services"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-64 bg-studio-card border border-studio-border animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service._id} variants={fadeUp(0.5, 20)}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  iconName={service.icon}
                  features={service.features}
                  slug={service.slug}
                  price={service.price}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* SECTION 05 — FEATURED WORK */}
      <section className="studio-container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
          <SectionTitle
            title="Selected Work"
            subtitle="Explore our catalog of web builds, platforms, and e-commerce stores designed and developed by AK Studio."
            label="Case Studies"
          />
          <Link
            to="/portfolio"
            className="bg-studio-card border border-studio-border hover:border-accent-cyan hover:text-accent-cyan text-studio-white px-6 py-3 rounded text-sm font-medium transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All Work</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-72 bg-studio-card border border-studio-border animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                slug={project.slug}
                category={project.category}
                description={project.description}
                technologies={project.technologies}
                thumbnail={project.thumbnail}
              />
            ))}
          </div>
        )}
      </section>

      {/* SECTION 06 — CASE STUDY PREVIEW */}
      <section className="bg-studio-dark border-y border-studio-border py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/[0.03] rounded-full glow-blur pointer-events-none" />
        
        <div className="studio-container max-w-5xl">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">// DEEP DIVE CASE STUDY</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-studio-white mt-3 mb-12">
            Dream Avenue Clinic
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="border-l-2 border-accent-indigo pl-4">
                <h4 className="text-xs text-studio-text font-bold uppercase font-mono tracking-wider">Client</h4>
                <p className="text-sm font-semibold text-studio-white">Dr. Aditya Sharma / Premier Cosmetic Clinic</p>
              </div>
              <div className="border-l-2 border-accent-indigo pl-4">
                <h4 className="text-xs text-studio-text font-bold uppercase font-mono tracking-wider">The Challenge</h4>
                <p className="text-sm text-studio-text">
                  Dream Avenue Clinic suffered from high patient booking friction and an outdated web design that failed to reflect their premium, high-end clinic aesthetic.
                </p>
              </div>
              <div className="border-l-2 border-accent-indigo pl-4">
                <h4 className="text-xs text-studio-text font-bold uppercase font-mono tracking-wider">The Solution</h4>
                <p className="text-sm text-studio-text">
                  A high-end, responsive portal featuring structured treatment catalogs, interactive dentist files, verified testimonials, and a custom appointment builder linked directly to their Express/MongoDB admin panel.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/portfolio/dream-avenue-clinic"
                  className="bg-accent-indigo hover:bg-indigo-700 text-white font-sans text-xs uppercase font-bold tracking-widest px-6 py-3.5 rounded transition-all inline-flex items-center gap-2"
                >
                  <span>View Case Study</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 relative group overflow-hidden border border-studio-border rounded-lg aspect-video bg-studio-black">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
                alt="Dream Avenue case study"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-studio-black/80 to-transparent flex items-end p-8">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-accent-cyan font-semibold block mb-1">Impact</span>
                  <h4 className="text-xl font-bold text-studio-white uppercase">42% drop in admin booking friction</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — WHY AK STUDIO */}
      <section className="studio-container">
        <SectionTitle
          title="Why AK Studio?"
          subtitle="We focus on custom architecture, speed optimization, and premium aesthetics, completely skipping the generic templates."
          label="Our Principles"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(0.4 + idx * 0.05, 20)}
              className="bg-studio-card border border-studio-border/70 hover:border-accent-cyan/40 p-8 rounded-lg space-y-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-studio-black border border-studio-border flex items-center justify-center">
                {feat.icon}
              </div>
              <h3 className="text-lg font-display font-semibold text-studio-white uppercase tracking-tight">
                {feat.title}
              </h3>
              <p className="text-sm text-studio-text leading-relaxed font-sans">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 08 — PROCESS (TIMELINE) */}
      <section className="studio-container">
        <SectionTitle
          title="From Idea to Launch"
          subtitle="Our structured 6-phase development timeline ensures complete alignment, zero delays, and peak final performance."
          label="Our Process"
        />

        <div className="relative border-l-2 border-studio-border/60 ml-4 md:ml-8 pl-8 space-y-12">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp(0.5, 30)}
              className="relative"
            >
              {/* Timeline bubble */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-studio-black border-2 border-accent-indigo flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan" />
              </div>
              
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-accent-cyan bg-accent-indigo/10 border border-accent-indigo/20 px-2 py-0.5 rounded">
                  Phase {step.num}
                </span>
                <h3 className="text-xl font-display font-bold text-studio-white uppercase tracking-tight pt-1">
                  {step.title}
                </h3>
                <p className="text-sm text-studio-text max-w-xl leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 09 — TECHNOLOGY */}
      <section className="studio-container text-center max-w-4xl">
        <SectionTitle
          title="Powered by Modern Tech"
          subtitle="We build high-performance systems and dynamic client apps with robust, enterprise-grade open source stacks."
          label="Technology"
          center
        />

        <div className="flex flex-wrap items-center justify-center gap-4">
          {techBadges.map((tech) => (
            <span
              key={tech}
              className="bg-studio-card border border-studio-border/80 hover:border-accent-cyan/40 text-studio-white hover:text-accent-cyan px-5 py-3 rounded text-sm font-semibold font-mono tracking-wider transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 10 — TESTIMONIALS */}
      <section className="studio-container">
        <SectionTitle
          title="What Clients Say"
          subtitle="Verifiable feedback from business owners and managers who scaled their operations with AK Studio."
          label="Reviews"
          center
        />
        {loading ? (
          <div className="h-48 max-w-2xl mx-auto bg-studio-card border border-studio-border animate-pulse rounded-lg" />
        ) : (
          <TestimonialSlider testimonials={reviews} />
        )}
      </section>

      {/* SECTION 12 — FINAL CTA */}
      <CTASection />
    </div>
  );
};
