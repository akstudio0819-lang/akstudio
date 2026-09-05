import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Service } from '../utils/mockData';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { Check, Cpu, HelpCircle, ArrowRight, Layers, Layout, Code, ShoppingBag, Briefcase, RefreshCw, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap: Record<string, React.ComponentType<any>> = {
  Layout,
  Code,
  Layers,
  ShoppingBag,
  Briefcase,
  Cpu,
  RefreshCw,
  ShieldCheck,
};

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.getServices();
        const active = res.filter(s => s.active);
        setServices(active);
        if (active.length > 0) {
          setActiveTab(active[0]._id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const activeService = services.find(s => s._id === activeTab);

  // Common FAQs
  const faqs = [
    { q: "How long does a website project take?", a: "A custom Website Design and Development project typically takes between 4 to 8 weeks depending on the complexity of layouts, content density, and backend configurations." },
    { q: "What technologies do you use?", a: "We build primarily on the modern React stack with Vite, TypeScript, and Tailwind CSS on the frontend, powered by Express.js/Node.js REST APIs and MongoDB for storage. Authentication is secured via Supabase Auth." },
    { q: "Do you offer website redesigns?", a: "Yes. We take outdated websites, extract existing content structure and media assets, optimize redirect scripts to preserve organic SEO ranks, and deliver a modern responsive redesign." },
    { q: "Do you write copy and supply images?", a: "While we request existing corporate files, brand guidelines, and copy, we can coordinate with copywriters and procure premium stock assets to align with the visual design." }
  ];

  return (
    <div className="space-y-32 pb-20">
      {/* Hero */}
      <section className="studio-container pt-12 text-center max-w-4xl space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-3.5 py-1.5 rounded border border-accent-cyan/20">// PROFESSIONAL CAPABILITIES</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-studio-white leading-tight">
          Bespoke Services <br />
          <span className="bg-gradient-to-r from-accent-indigo via-accent-cyan to-indigo-500 bg-clip-text text-transparent">
            Designed to Convert
          </span>
        </h1>
        <p className="text-base sm:text-lg text-studio-text max-w-2xl mx-auto leading-relaxed font-sans">
          Explore our suite of expert design and engineering solutions. We provide clean structures, robust APIs, and custom client panels with tailored scope options.
        </p>
      </section>

      {/* Services Grid Navigation and Details */}
      <section className="studio-container">
        {loading ? (
          <div className="h-96 bg-studio-card animate-pulse rounded-lg border border-studio-border" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar list of services */}
            <div className="lg:col-span-4 space-y-2">
              <h3 className="text-xs font-bold font-mono text-studio-text uppercase tracking-widest mb-4 pl-3">// Services Menu</h3>
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || Cpu;
                const isActive = service._id === activeTab;
                return (
                  <button
                    key={service._id}
                    onClick={() => setActiveTab(service._id)}
                    className={`w-full text-left px-5 py-4 rounded-lg border flex items-center justify-between transition-all duration-300 ${
                      isActive
                        ? 'bg-accent-indigo text-white border-accent-indigo shadow-md shadow-accent-indigo/10'
                        : 'bg-studio-card text-studio-text border-studio-border/70 hover:border-accent-cyan/40 hover:text-studio-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 font-semibold text-sm">
                      <IconComponent size={18} />
                      <span>{service.title}</span>
                    </div>
                    <ArrowRight size={14} className={`transition-transform duration-300 ${isActive ? 'translate-x-1' : 'opacity-40'}`} />
                  </button>
                );
              })}
            </div>

            {/* Main Service Details panel */}
            <div className="lg:col-span-8 bg-studio-card border border-studio-border p-8 md:p-12 rounded-lg">
              <AnimatePresence mode="wait">
                {activeService && (
                  <motion.div
                    key={activeService._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-studio-border/50">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-studio-white uppercase">
                          {activeService.title}
                        </h2>
                      </div>
                      <span className="w-12 h-12 rounded-lg bg-studio-black border border-studio-border flex items-center justify-center text-accent-cyan">
                        {React.createElement(iconMap[activeService.icon] || Cpu, { size: 24 })}
                      </span>
                    </div>

                    {/* Desc */}
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase font-mono font-bold text-studio-text tracking-widest">// Service Overview</h4>
                      <p className="text-sm md:text-base text-studio-text leading-relaxed font-sans">
                        {activeService.description}
                      </p>
                    </div>

                    {/* Deliverables */}
                    <div className="space-y-4 border-t border-studio-border/50 pt-6">
                      <h4 className="text-xs uppercase font-mono font-bold text-studio-text tracking-widest">// Key Deliverables</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeService.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-studio-text font-sans">
                            <Check size={16} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </section>

      {/* FAQs */}
      <section className="studio-container max-w-4xl">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Clear answers to common questions about our studio processes, project scopes, and timeline expectations."
          label="FAQ"
          center
        />

        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-studio-card border border-studio-border p-6 sm:p-8 rounded-lg space-y-3">
              <div className="flex gap-3 items-start">
                <HelpCircle size={20} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                <h4 className="text-base sm:text-lg font-display font-semibold text-studio-white uppercase leading-snug">
                  {faq.q}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-studio-text leading-relaxed font-sans pl-8">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
};
