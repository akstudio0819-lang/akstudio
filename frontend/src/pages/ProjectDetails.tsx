import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Project } from '../utils/mockData';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, User, Briefcase, Cpu } from 'lucide-react';
import { CTASection } from '../components/CTASection';

export const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!slug) return;
      setLoading(true);
      setError(false);
      try {
        const currentProj = await api.getProjectBySlug(slug);
        setProject(currentProj);

        // Find next project in catalog
        const allProjects = await api.getProjects();
        const index = allProjects.findIndex(p => p.slug === slug);
        if (index !== -1 && index < allProjects.length - 1) {
          setNextProject(allProjects[index + 1]);
        } else if (allProjects.length > 1) {
          setNextProject(allProjects[0]); // loop back to first
        } else {
          setNextProject(null);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-studio-black">
        <div className="w-10 h-10 border-4 border-accent-indigo border-t-accent-cyan rounded-full animate-spin" />
        <p className="text-xs text-studio-text tracking-widest uppercase">Loading Case Study...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-studio-black text-center px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-studio-white uppercase">Project Not Found</h2>
        <p className="text-studio-text max-w-md">Looks like the case study you are trying to view does not exist or has been archived.</p>
        <Link to="/portfolio" className="bg-accent-indigo hover:bg-indigo-700 text-white px-6 py-3 rounded text-sm font-semibold transition-all">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-24 pb-20">
      {/* Project Hero Header */}
      <section className="studio-container pt-8 space-y-6">
        <Link to="/portfolio" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-studio-text hover:text-accent-cyan transition-colors mb-4">
          <ArrowLeft size={14} />
          <span>Back to Work</span>
        </Link>

        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">{project.category}</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-studio-white leading-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-studio-text max-w-4xl leading-relaxed font-sans">
            {project.description}
          </p>
        </div>
      </section>

      {/* Main Banner Image */}
      <section className="studio-container">
        <div className="w-full aspect-[21/9] rounded-lg overflow-hidden border border-studio-border bg-studio-card">
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover grayscale contrast-110" />
        </div>
      </section>

      {/* Project Meta Info */}
      <section className="studio-container grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-y border-studio-border/50">
        <div className="flex items-center gap-3">
          <User size={18} className="text-accent-cyan flex-shrink-0" />
          <div>
            <h4 className="text-xs text-studio-text uppercase tracking-widest font-mono">Client</h4>
            <p className="text-sm font-semibold text-studio-white">{project.client}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Briefcase size={18} className="text-accent-cyan flex-shrink-0" />
          <div>
            <h4 className="text-xs text-studio-text uppercase tracking-widest font-mono">Industry</h4>
            <p className="text-sm font-semibold text-studio-white">{project.industry}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Cpu size={18} className="text-accent-cyan flex-shrink-0" />
          <div>
            <h4 className="text-xs text-studio-text uppercase tracking-widest font-mono">Status</h4>
            <p className="text-sm font-semibold text-studio-white">{project.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-accent-cyan flex-shrink-0" />
          <div>
            <h4 className="text-xs text-studio-text uppercase tracking-widest font-mono">Year</h4>
            <p className="text-sm font-semibold text-studio-white">2026</p>
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="studio-container grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Challenge */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-bold text-studio-white uppercase tracking-tight">The Challenge</h3>
            <p className="text-sm sm:text-base text-studio-text leading-relaxed font-sans">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-bold text-studio-white uppercase tracking-tight">The Solution</h3>
            <p className="text-sm sm:text-base text-studio-text leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>

          {/* Results */}
          <div className="space-y-4 border-l-2 border-accent-indigo pl-6 bg-studio-card/20 py-4 pr-4 rounded-r">
            <h3 className="text-lg font-display font-bold text-studio-white uppercase tracking-tight">The Outcome</h3>
            <p className="text-sm sm:text-base text-studio-text leading-relaxed font-sans">
              {project.results}
            </p>
          </div>
        </div>

        {/* Right Side Services & Tech */}
        <div className="lg:col-span-4 space-y-8 bg-studio-card border border-studio-border p-8 rounded-lg h-fit">
          <div className="space-y-3">
            <h4 className="text-xs text-studio-text font-bold uppercase tracking-widest font-mono">// Services Delivered</h4>
            <ul className="space-y-2">
              {project.services.map((serv, index) => (
                <li key={index} className="text-sm text-studio-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                  {serv}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 pt-6 border-t border-studio-border/50">
            <h4 className="text-xs text-studio-text font-bold uppercase tracking-widest font-mono">// Stack & Tools</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="text-xs font-mono bg-studio-black border border-studio-border px-2.5 py-1 rounded text-studio-text">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="studio-container">
          <h3 className="text-lg font-display font-bold text-studio-white uppercase tracking-tight mb-8">Screenshots & Layouts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((img, idx) => (
              <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-studio-border bg-studio-card group">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next Project Redirect */}
      {nextProject && (
        <section className="studio-container border-t border-studio-border pt-16">
          <div className="bg-studio-card border border-studio-border p-8 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-widest">Next Case Study</span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-studio-white uppercase">{nextProject.title}</h3>
            </div>
            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="bg-studio-white hover:bg-accent-indigo text-studio-black hover:text-white px-6 py-3 rounded text-sm font-semibold transition-all flex items-center gap-2 group"
            >
              <span>View Case Study</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
};
