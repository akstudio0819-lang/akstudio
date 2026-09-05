import React from 'react';
import { Layout, Code, Layers, ShoppingBag, Briefcase, Cpu, RefreshCw, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  features: string[];
  slug: string;
  price?: string;
}

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

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  iconName,
  features,
  slug,
  price
}) => {
  const IconComponent = iconMap[iconName] || Cpu;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative bg-studio-card border border-studio-border/70 hover:border-accent-indigo/60 p-8 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between h-full"
    >
      {/* Background glow hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/0 via-transparent to-accent-cyan/0 group-hover:from-accent-indigo/[0.04] group-hover:to-accent-cyan/[0.04] transition-all duration-300 pointer-events-none" />

      <div>
        {/* Icon & Arrow Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-studio-black border border-studio-border rounded-lg flex items-center justify-center text-studio-white group-hover:text-accent-cyan group-hover:border-accent-cyan/40 transition-all duration-300">
            <IconComponent size={22} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <motion.div
            className="text-studio-text group-hover:text-accent-cyan transition-colors"
            whileHover={{ x: 4 }}
          >
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </div>

        {/* Info */}
        <h3 className="text-xl font-display font-semibold text-studio-white mb-3 group-hover:text-accent-cyan transition-colors">
          {title}
        </h3>
        <p className="text-sm text-studio-text leading-relaxed mb-6">
          {description}
        </p>

        {/* Key Features */}
        <ul className="space-y-2 mb-8 border-t border-studio-border/50 pt-4">
          {features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="text-xs text-studio-text flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-indigo" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Full link clickable block */}
      <Link to={`/services`} className="absolute inset-0 z-10" aria-label={`View details of ${title}`} />
    </motion.div>
  );
};
