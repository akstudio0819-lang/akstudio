import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  slug: string;
  category: string;
  description: string;
  technologies: string[];
  thumbnail: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  slug,
  category,
  description,
  technologies,
  thumbnail
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative bg-studio-card border border-studio-border/70 rounded-lg overflow-hidden flex flex-col justify-between h-full"
    >
      <div className="relative overflow-hidden aspect-video bg-studio-dark">
        {/* Project Thumbnail Image with Hover Zoom */}
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-studio-black/20 group-hover:bg-studio-black/40 transition-colors duration-300" />
        
        {/* Category Badge top-left */}
        <span className="absolute top-4 left-4 bg-studio-black/80 backdrop-blur text-accent-cyan text-xs font-semibold px-3 py-1.5 rounded-full border border-studio-border/40 uppercase tracking-wider">
          {category}
        </span>
      </div>

      <div className="p-8 flex flex-col justify-between flex-grow">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-display font-semibold text-studio-white group-hover:text-accent-cyan transition-colors line-clamp-1">
              {title}
            </h3>
            <span className="w-8 h-8 rounded-full border border-studio-border flex items-center justify-center text-studio-white group-hover:bg-accent-indigo group-hover:border-accent-indigo transition-all duration-300 flex-shrink-0">
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>

          <p className="text-sm text-studio-text leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>
        </div>

        <div>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] uppercase font-mono font-medium tracking-wider bg-studio-black/60 border border-studio-border/50 text-studio-text px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Full Link block trigger */}
          <Link 
            to={`/portfolio/${slug}`} 
            className="text-xs font-semibold text-studio-white group-hover:text-accent-cyan uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>View Case Study</span>
          </Link>
        </div>
      </div>

      {/* Make whole card clickable block */}
      <Link to={`/portfolio/${slug}`} className="absolute inset-0 z-10" aria-label={`View Case Study of ${title}`} />
    </motion.div>
  );
};
