import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Project } from '../utils/mockData';
import { SectionTitle } from '../components/SectionTitle';
import { CTASection } from '../components/CTASection';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Target, Award } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.getProjects();
        setProjects(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="space-y-32 pb-20">
      {/* Hero */}
      <section className="studio-container pt-12 text-center max-w-4xl space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-3.5 py-1.5 rounded border border-accent-cyan/20">// MEASURABLE OUTCOMES</span>
        <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-studio-white leading-tight">
          Client Case Studies
        </h1>
        <p className="text-base sm:text-lg text-studio-text max-w-2xl mx-auto leading-relaxed font-sans">
          Discover how AK Studio partners with medical clinics, e-commerce stores, and local companies to improve operations and drive customer conversions.
        </p>
      </section>

      {/* Case studies list */}
      <section className="studio-container">
        {loading ? (
          <div className="space-y-12">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="h-96 bg-studio-card animate-pulse rounded-lg border border-studio-border" />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {projects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={project._id}
                  className={`bg-studio-card border border-studio-border rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Visual */}
                  <div className={`lg:col-span-6 relative aspect-video h-full bg-studio-black min-h-[300px] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover grayscale contrast-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-studio-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className={`p-8 md:p-12 lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="text-xs font-mono font-bold uppercase text-accent-cyan">{project.category}</span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-studio-white uppercase">{project.title}</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs uppercase font-mono font-bold text-studio-text flex items-center gap-1.5 mb-1">
                          <Target size={14} className="text-accent-indigo" />
                          <span>Challenge</span>
                        </h4>
                        <p className="text-xs md:text-sm text-studio-text leading-relaxed font-sans">{project.challenge}</p>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase font-mono font-bold text-studio-text flex items-center gap-1.5 mb-1">
                          <Trophy size={14} className="text-accent-indigo" />
                          <span>Outcome</span>
                        </h4>
                        <p className="text-xs md:text-sm text-studio-text leading-relaxed font-sans">{project.results}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-studio-border/50 flex justify-between items-center">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="text-[10px] uppercase font-mono bg-studio-black/60 text-studio-text border border-studio-border/40 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/portfolio/${project.slug}`}
                        className="text-xs font-bold uppercase tracking-widest text-studio-white hover:text-accent-cyan transition-colors flex items-center gap-1.5"
                      >
                        <span>Deep Dive</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <CTASection />
    </div>
  );
};
