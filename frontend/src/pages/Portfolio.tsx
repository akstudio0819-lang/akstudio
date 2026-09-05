import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Project } from '../utils/mockData';
import { SectionTitle } from '../components/SectionTitle';
import { ProjectCard } from '../components/ProjectCard';
import { CTASection } from '../components/CTASection';
import { motion, AnimatePresence } from 'framer-motion';

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    'All',
    'Web Design',
    'Development',
    'E-commerce',
    'UI/UX',
    'Business'
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.getProjects();
        setProjects(res);
        setFilteredProjects(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => {
        const cat = project.category.toLowerCase();
        const servicesString = project.services.join(' ').toLowerCase();
        const filterLower = filter.toLowerCase();
        return cat.includes(filterLower) || servicesString.includes(filterLower);
      });
      setFilteredProjects(filtered);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero */}
      <section className="studio-container pt-12 text-center max-w-4xl space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-3.5 py-1.5 rounded border border-accent-cyan/20">// SELECTED CASE STUDIES</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-studio-white leading-tight">
          Selected Portfolio
        </h1>
        <p className="text-base sm:text-lg text-studio-text max-w-2xl mx-auto leading-relaxed font-sans">
          A showcase of bespoke visual websites, e-commerce storefronts, and fullstack digital platforms designed and engineered by AK Studio.
        </p>
      </section>

      {/* Filter Tabs */}
      <section className="studio-container">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((filter) => {
            const isActive = filter === selectedFilter;
            return (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? 'bg-studio-white text-studio-black border-studio-white shadow-md'
                    : 'bg-studio-card text-studio-text border-studio-border/70 hover:border-accent-cyan hover:text-studio-white'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Portfolio grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-72 bg-studio-card border border-studio-border animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProjectCard
                    title={project.title}
                    slug={project.slug}
                    category={project.category}
                    description={project.description}
                    technologies={project.technologies}
                    thumbnail={project.thumbnail}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-20 bg-studio-card border border-studio-border rounded-lg">
                <p className="text-studio-text">No projects match the selected category.</p>
              </div>
            )}
          </motion.div>
        )}
      </section>

      <CTASection />
    </div>
  );
};
