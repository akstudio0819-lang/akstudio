import React, { useState } from 'react';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Info, HelpCircle } from 'lucide-react';

export const Pricing: React.FC = () => {
  const navigate = useNavigate();

  // Quote Calculator State
  const [pages, setPages] = useState(5);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isCms, setIsCms] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // Price Calculation Logic
  const calculateTotal = () => {
    const basePageCost = 3000; // ₹3,000 per page
    const ecommerceCost = 25000;
    const cmsCost = 15000;
    const authCost = 20000;
    const baseSetup = 15000;

    let total = baseSetup + (pages * basePageCost);
    if (isEcommerce) total += ecommerceCost;
    if (isCms) total += cmsCost;
    if (isAuth) total += authCost;

    return total;
  };

  const handleRequestQuote = () => {
    const total = calculateTotal();
    const serviceType = isEcommerce ? 'E-commerce' : isAuth ? 'Custom Application' : 'Website Design';
    const message = `Dynamic Quote Request via Builder: Estimated Cost ₹${total.toLocaleString('en-IN')} (Pages: ${pages}, E-commerce: ${isEcommerce ? 'Yes' : 'No'}, Custom CMS: ${isCms ? 'Yes' : 'No'}, Supabase Auth: ${isAuth ? 'Yes' : 'No'}).`;
    
    // Pass state to Contact Page
    navigate('/contact', { 
      state: { 
        service: serviceType,
        budget: total < 25000 ? 'Under ₹25,000' : total < 50000 ? '₹25,000–₹50,000' : total < 100000 ? '₹50,000–₹1,00,000' : '₹1,00,000+',
        message: message
      } 
    });
  };

  const planTiers = [
    {
      name: 'Starter',
      desc: 'Ideal for independent professionals, startup founders, and local small businesses needing a rapid visual launch.',
      price: '₹35,000',
      features: [
        'Up to 5 Premium Pages',
        'Mobile-Responsive Layouts',
        'Contact Inquiry Form',
        'Standard Google Fonts',
        'Social Media Integrations',
        '1 Month Free Support'
      ],
      cta: 'Choose Starter',
      path: '/contact'
    },
    {
      name: 'Professional',
      desc: 'Tailored for growing brands requiring sophisticated design work, product showcases, or custom dashboard workflows.',
      price: '₹75,000',
      features: [
        'Up to 12 Premium Pages',
        'E-commerce Product Listings',
        'Stripe / Razorpay Checkout',
        'Custom Admin Database Manager',
        'Supabase Secure Client Portals',
        '3 Months Priority Support'
      ],
      cta: 'Request Quote',
      path: '/contact',
      popular: true
    },
    {
      name: 'Custom',
      desc: 'Bespoke SaaS architectures, advanced REST microservices, client portals, and specific database management setups.',
      price: 'Custom Scope',
      features: [
        'Custom Scoped Pages',
        'Fullstack Node/Express APIs',
        'Advanced Mongoose DB Models',
        'Live Client Messenger Support',
        'Tailored Role Auth Checks',
        '6 Months SLA Support'
      ],
      cta: 'Contact Studio',
      path: '/contact'
    }
  ];

  return (
    <div className="space-y-32 pb-20">
      {/* Hero */}
      <section className="studio-container pt-12 text-center max-w-4xl space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-3.5 py-1.5 rounded border border-accent-cyan/20">// TRANSPARENT ESTIMATES</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-studio-white leading-tight">
          Flexible Pricing Plans
        </h1>
        <p className="text-base sm:text-lg text-studio-text max-w-2xl mx-auto leading-relaxed font-sans">
          Select one of our preset tiered packages, or use our interactive cost estimator to design a custom scope corresponding to your exact specifications.
        </p>
      </section>

      {/* Preset Pricing Tiers */}
      <section className="studio-container grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {planTiers.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-studio-card border rounded-lg p-8 flex flex-col justify-between h-full relative space-y-8 ${
              plan.popular ? 'border-accent-indigo shadow-lg shadow-accent-indigo/5' : 'border-studio-border/70'
            }`}
          >
            {plan.popular && (
              <span className="absolute top-4 right-4 bg-accent-indigo text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                Recommended
              </span>
            )}

            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-studio-text bg-studio-black px-2 py-1 border border-studio-border/40 rounded">
                {plan.name} Package
              </span>
              <h3 className="text-2xl font-display font-bold text-studio-white uppercase">{plan.name}</h3>
              <p className="text-xs sm:text-sm text-studio-text leading-relaxed font-sans">{plan.desc}</p>
              
              <div className="pt-2">
                <span className="text-[10px] text-studio-text uppercase tracking-wider block">Estimated Investment</span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-accent-cyan">{plan.price}</span>
              </div>

              {/* Feature Checks */}
              <ul className="border-t border-studio-border/50 pt-6 space-y-3">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="text-xs sm:text-sm text-studio-text flex items-center gap-2.5 font-sans">
                    <Check size={16} className="text-accent-cyan flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  navigate(plan.path, { 
                    state: { 
                      service: plan.name === 'Starter' ? 'Website Design' : plan.name === 'Professional' ? 'E-commerce' : 'Other',
                      budget: plan.name === 'Starter' ? '₹25,000–₹50,000' : plan.name === 'Professional' ? '₹50,000–₹1,00,000' : '₹1,00,000+'
                    } 
                  });
                }}
                className={`w-full text-center font-semibold py-3.5 rounded text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-accent-indigo hover:bg-indigo-700 text-white shadow-md'
                    : 'bg-studio-black hover:bg-studio-white text-studio-white hover:text-studio-black border border-studio-border hover:border-studio-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive Quote Builder */}
      <section className="studio-container max-w-4xl">
        <div className="bg-studio-card border border-studio-border p-8 md:p-12 rounded-lg space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-indigo/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-accent-cyan uppercase tracking-widest">// Interactive Estimator</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-studio-white uppercase">Build Your Project Estimate</h2>
            <p className="text-xs sm:text-sm text-studio-text max-w-xl mx-auto leading-relaxed">
              Adjust the slider and toggle custom capabilities to see a realtime estimation of your project package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-y border-studio-border/40 py-8">
            {/* Controls */}
            <div className="space-y-6">
              {/* Pages Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-studio-white uppercase">Number of Pages</span>
                  <span className="font-mono text-accent-cyan font-bold">{pages} Pages</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="w-full h-1 bg-studio-black border border-studio-border rounded-lg appearance-none cursor-pointer accent-accent-cyan"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 border border-studio-border/60 hover:border-accent-cyan/30 rounded bg-studio-black/20 cursor-pointer select-none">
                  <div className="space-y-0.5">
                    <span className="text-xs sm:text-sm font-semibold text-studio-white">E-commerce Shop Checkout</span>
                    <p className="text-[10px] text-studio-text">Products, cart configurations, Stripe gateway integrations</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isEcommerce}
                    onChange={(e) => setIsEcommerce(e.target.checked)}
                    className="w-4 h-4 rounded border-studio-border bg-studio-card text-accent-cyan focus:ring-accent-indigo focus:ring-opacity-50"
                  />
                </label>

                <label className="flex items-center justify-between p-3 border border-studio-border/60 hover:border-accent-cyan/30 rounded bg-studio-black/20 cursor-pointer select-none">
                  <div className="space-y-0.5">
                    <span className="text-xs sm:text-sm font-semibold text-studio-white">Custom Database / CMS</span>
                    <p className="text-[10px] text-studio-text">Dynamic project dashboard, blogs, custom Mongoose structures</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isCms}
                    onChange={(e) => setIsCms(e.target.checked)}
                    className="w-4 h-4 rounded border-studio-border bg-studio-card text-accent-cyan focus:ring-accent-indigo focus:ring-opacity-50"
                  />
                </label>

                <label className="flex items-center justify-between p-3 border border-studio-border/60 hover:border-accent-cyan/30 rounded bg-studio-black/20 cursor-pointer select-none">
                  <div className="space-y-0.5">
                    <span className="text-xs sm:text-sm font-semibold text-studio-white">Client Dashboard & Auth</span>
                    <p className="text-[10px] text-studio-text">Secure register/login portals via Supabase authentication</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isAuth}
                    onChange={(e) => setIsAuth(e.target.checked)}
                    className="w-4 h-4 rounded border-studio-border bg-studio-card text-accent-cyan focus:ring-accent-indigo focus:ring-opacity-50"
                  />
                </label>
              </div>
            </div>

            {/* Results display */}
            <div className="bg-studio-black border border-studio-border p-8 rounded-lg text-center space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-studio-text tracking-widest">Calculated Price</span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-accent-cyan">
                  ₹{calculateTotal().toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-studio-text block">*Estimates exclude recurring domain/server hosting.</span>
              </div>
              <button
                onClick={handleRequestQuote}
                className="w-full bg-studio-white hover:bg-accent-indigo text-studio-black hover:text-white py-3 rounded font-semibold text-xs uppercase tracking-widest transition-all duration-300"
              >
                Send Request With Quote Estimations
              </button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
