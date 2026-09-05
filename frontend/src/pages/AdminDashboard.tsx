import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Project, Review, ContactEnquiry, Consultation, Service } from '../utils/mockData';
import { LayoutDashboard, FolderKanban, MessageSquare, Star, Settings, Eye, CheckCircle2, XCircle, Trash2, Edit3, Plus, RefreshCw } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  // Sidebar Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'enquiries' | 'consultations' | 'reviews'>('overview');

  // Loaded DB data
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  
  const [loading, setLoading] = useState(true);

  // CRUD Forms State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Project Form Fields
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('');
  const [projClient, setProjClient] = useState('');
  const [projIndustry, setProjIndustry] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projChallenge, setProjChallenge] = useState('');
  const [projSolution, setProjSolution] = useState('');
  const [projResults, setProjResults] = useState('');
  const [projStatus, setProjStatus] = useState<Project['status']>('Inquiry');
  const [projTech, setProjTech] = useState('');
  const [projThumbnail, setProjThumbnail] = useState('');

  // Load Admin Data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, projectsRes, enquiriesRes, consultationsRes, reviewsRes] = await Promise.all([
        api.getAdminStats(),
        api.getProjects(),
        api.getEnquiries(),
        api.getConsultations(),
        api.getReviews()
      ]);
      setStats(statsRes);
      setProjects(projectsRes);
      setEnquiries(enquiriesRes);
      setConsultations(consultationsRes);
      setReviews(reviewsRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Project CRUD Actions
  const handleOpenCreateProj = () => {
    setEditingProject(null);
    setProjTitle('');
    setProjCategory('Website Design');
    setProjClient('');
    setProjIndustry('');
    setProjDesc('');
    setProjChallenge('');
    setProjSolution('');
    setProjResults('');
    setProjStatus('Inquiry');
    setProjTech('React, Tailwind CSS');
    setProjThumbnail('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop');
    setShowProjectModal(true);
  };

  const handleOpenEditProj = (p: Project) => {
    setEditingProject(p);
    setProjTitle(p.title);
    setProjCategory(p.category);
    setProjClient(p.client);
    setProjIndustry(p.industry);
    setProjDesc(p.description);
    setProjChallenge(p.challenge);
    setProjSolution(p.solution);
    setProjResults(p.results);
    setProjStatus(p.status);
    setProjTech(p.technologies.join(', '));
    setProjThumbnail(p.thumbnail);
    setShowProjectModal(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = projTech.split(',').map(t => t.trim()).filter(t => t);
    const slug = projTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const projectPayload = {
      title: projTitle,
      slug,
      category: projCategory,
      description: projDesc,
      client: projClient,
      industry: projIndustry,
      services: [projCategory],
      technologies: techArray,
      thumbnail: projThumbnail,
      gallery: [],
      challenge: projChallenge,
      solution: projSolution,
      results: projResults,
      status: projStatus
    };

    try {
      if (editingProject) {
        await api.updateProject(editingProject._id, projectPayload);
      } else {
        await api.createProject(projectPayload);
      }
      setShowProjectModal(false);
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.deleteProject(id);
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  // Review CRUD Actions
  const handleApproveReview = async (id: string, approved: boolean) => {
    try {
      await api.updateReview(id, { approved });
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.deleteReview(id);
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  // Enquiry Actions
  const handleUpdateEnquiryStatus = async (id: string, status: ContactEnquiry['status']) => {
    try {
      await api.updateEnquiryStatus(id, status);
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await api.deleteEnquiry(id);
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  // Consultation Actions
  const handleUpdateConsultationStatus = async (id: string, status: Consultation['status']) => {
    try {
      await api.updateConsultationStatus(id, status);
      loadAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !stats) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-studio-black">
        <div className="w-10 h-10 border-4 border-accent-indigo border-t-accent-cyan rounded-full animate-spin" />
        <p className="text-xs text-studio-text tracking-widest uppercase">Loading Admin Console...</p>
      </div>
    );
  }

  return (
    <div className="studio-container py-12 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-studio-card border border-studio-border p-6 rounded-lg h-fit space-y-6 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider block">Role-based Auth</span>
              <h4 className="text-sm font-bold text-studio-white uppercase">Admin Console</h4>
            </div>
            <button onClick={loadAdminData} className="text-studio-text hover:text-accent-cyan p-1" title="Refresh">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          <hr className="border-studio-border" />

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'overview' ? 'bg-accent-indigo text-white' : 'text-studio-text hover:bg-studio-black/40 hover:text-studio-white'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Metrics Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'projects' ? 'bg-accent-indigo text-white' : 'text-studio-text hover:bg-studio-black/40 hover:text-studio-white'
              }`}
            >
              <FolderKanban size={16} />
              <span>Projects CRUD ({projects.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'enquiries' ? 'bg-accent-indigo text-white' : 'text-studio-text hover:bg-studio-black/40 hover:text-studio-white'
              }`}
            >
              <MessageSquare size={16} />
              <span>Contact Enquiries ({enquiries.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('consultations')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'consultations' ? 'bg-accent-indigo text-white' : 'text-studio-text hover:bg-studio-black/40 hover:text-studio-white'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Consultations ({consultations.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'reviews' ? 'bg-accent-indigo text-white' : 'text-studio-text hover:bg-studio-black/40 hover:text-studio-white'
              }`}
            >
              <Star size={16} />
              <span>Reviews Manager ({reviews.length})</span>
            </button>
          </nav>
        </aside>

        {/* Content area */}
        <main className="flex-grow bg-studio-card border border-studio-border p-8 rounded-lg min-h-[500px]">
          
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && stats && (
            <div className="space-y-8">
              <div className="border-b border-studio-border pb-4">
                <h2 className="text-xl font-display font-bold text-studio-white uppercase">Overview Metrics</h2>
                <p className="text-xs text-studio-text">Platform activity dashboard counters.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-studio-black border border-studio-border p-6 rounded-lg text-center space-y-1">
                  <span className="text-[10px] font-mono text-studio-text uppercase tracking-widest block">Total Projects</span>
                  <div className="text-3xl font-display font-bold text-accent-cyan">{stats.totalProjects}</div>
                </div>
                <div className="bg-studio-black border border-studio-border p-6 rounded-lg text-center space-y-1">
                  <span className="text-[10px] font-mono text-studio-text uppercase tracking-widest block">Clients Set</span>
                  <div className="text-3xl font-display font-bold text-accent-cyan">{stats.totalClients}</div>
                </div>
                <div className="bg-studio-black border border-studio-border p-6 rounded-lg text-center space-y-1">
                  <span className="text-[10px] font-mono text-studio-text uppercase tracking-widest block">Pending Enqs</span>
                  <div className="text-3xl font-display font-bold text-accent-cyan">{stats.pendingEnquiries}</div>
                </div>
                <div className="bg-studio-black border border-studio-border p-6 rounded-lg text-center space-y-1">
                  <span className="text-[10px] font-mono text-studio-text uppercase tracking-widest block">Pending Consults</span>
                  <div className="text-3xl font-display font-bold text-accent-cyan">{stats.pendingConsultations}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS CRUD */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="border-b border-studio-border pb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-display font-bold text-studio-white uppercase">Manage Portfolio Projects</h2>
                  <p className="text-xs text-studio-text">Add, edit, or archive case studies.</p>
                </div>
                <button
                  onClick={handleOpenCreateProj}
                  className="bg-accent-indigo hover:bg-indigo-700 text-white px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-studio-border text-studio-text font-mono uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((proj) => (
                      <tr key={proj._id} className="border-b border-studio-border/50 hover:bg-studio-black/25">
                        <td className="py-3.5 px-4 font-semibold text-studio-white">{proj.title}</td>
                        <td className="py-3.5 px-4 text-studio-text">{proj.client}</td>
                        <td className="py-3.5 px-4 text-accent-cyan">{proj.category}</td>
                        <td className="py-3.5 px-4 text-studio-text">{proj.status}</td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button onClick={() => handleOpenEditProj(proj)} className="text-accent-cyan hover:text-studio-white p-1">
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => handleDeleteProject(proj._id)} className="text-red-400 hover:text-red-600 p-1">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="border-b border-studio-border pb-4">
                <h2 className="text-xl font-display font-bold text-studio-white uppercase">Client Enquiries</h2>
                <p className="text-xs text-studio-text">Review and update incoming website development requests.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {enquiries.map((enq) => (
                  <div key={enq._id} className="bg-studio-black/40 border border-studio-border p-5 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-bold">{enq.service}</span>
                        <h4 className="text-sm font-bold text-studio-white">{enq.name} ({enq.company || 'No Company'})</h4>
                        <span className="text-xs text-studio-text block">{enq.email} • {enq.phone}</span>
                      </div>
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateEnquiryStatus(enq._id, e.target.value as any)}
                        className="bg-studio-black border border-studio-border px-3 py-1.5 rounded text-xs text-accent-cyan cursor-pointer focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    
                    <p className="text-xs text-studio-text bg-studio-black/20 p-3 border border-studio-border/40 rounded italic">
                      "{enq.message}"
                    </p>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-accent-cyan font-bold">Budget: {enq.budget}</span>
                      <button onClick={() => handleDeleteEnquiry(enq._id)} className="text-red-400 hover:text-red-600 flex items-center gap-1">
                        <Trash2 size={12} /> Delete Inquiry
                      </button>
                    </div>
                  </div>
                ))}
                {enquiries.length === 0 && (
                  <p className="text-center py-10 text-studio-text text-sm">No enquiries received yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CONSULTATIONS */}
          {activeTab === 'consultations' && (
            <div className="space-y-6">
              <div className="border-b border-studio-border pb-4">
                <h2 className="text-xl font-display font-bold text-studio-white uppercase">Introductory Consultations</h2>
                <p className="text-xs text-studio-text">Approve, cancel, or complete scheduling discovery requests.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {consultations.map((cons) => (
                  <div key={cons._id} className="bg-studio-black/40 border border-studio-border p-5 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-bold">{cons.projectType}</span>
                        <h4 className="text-sm font-bold text-studio-white">{cons.name}</h4>
                        <span className="text-xs text-studio-text block">{cons.email} • {cons.phone}</span>
                        <div className="text-xs font-semibold text-studio-white mt-1">
                          Date: {cons.date} at {cons.time}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateConsultationStatus(cons._id, 'Confirmed')}
                          className="bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded text-xs uppercase font-mono font-bold"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleUpdateConsultationStatus(cons._id, 'Cancelled')}
                          className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1 rounded text-xs uppercase font-mono font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    {cons.message && (
                      <p className="text-xs text-studio-text bg-studio-black/20 p-3 border border-studio-border/40 rounded italic">
                        "{cons.message}"
                      </p>
                    )}
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-studio-text">Status: {cons.status}</span>
                      <button
                        onClick={() => handleUpdateConsultationStatus(cons._id, 'Completed')}
                        className="text-accent-cyan hover:underline"
                      >
                        Mark Completed
                      </button>
                    </div>
                  </div>
                ))}
                {consultations.length === 0 && (
                  <p className="text-center py-10 text-studio-text text-sm">No consultations requested yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS MODERATION */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="border-b border-studio-border pb-4">
                <h2 className="text-xl font-display font-bold text-studio-white uppercase">Client Reviews Moderation</h2>
                <p className="text-xs text-studio-text">Approve and index user-submitted testimonials.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {reviews.map((rev) => (
                  <div key={rev._id} className="bg-studio-black/40 border border-studio-border p-5 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-studio-white">{rev.name} ({rev.business})</h4>
                        <span className="text-xs text-accent-cyan">Rating: {rev.rating}/5 stars</span>
                      </div>
                      <div className="flex gap-2">
                        {rev.approved ? (
                          <button
                            onClick={() => handleApproveReview(rev._id, false)}
                            className="bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded text-xs uppercase font-mono font-bold"
                          >
                            Unapprove
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApproveReview(rev._id, true)}
                            className="bg-green-500/15 border border-green-500/30 text-green-400 px-3 py-1 rounded text-xs uppercase font-mono font-bold"
                          >
                            Approve
                          </button>
                        )}
                        <button onClick={() => handleDeleteReview(rev._id)} className="text-red-400 hover:text-red-600 p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-studio-text font-sans">"{rev.review}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CREATE/EDIT PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-studio-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-studio-card border border-studio-border p-8 rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6">
            <h3 className="text-xl font-display font-bold text-studio-white uppercase">
              {editingProject ? 'Edit Case Study' : 'Create Case Study'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs md:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text">Title</label>
                  <input
                    type="text"
                    required
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text">Category</label>
                  <input
                    type="text"
                    required
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text">Client</label>
                  <input
                    type="text"
                    required
                    value={projClient}
                    onChange={(e) => setProjClient(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text">Industry</label>
                  <input
                    type="text"
                    required
                    value={projIndustry}
                    onChange={(e) => setProjIndustry(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text">Challenge</label>
                  <textarea
                    rows={3}
                    value={projChallenge}
                    onChange={(e) => setProjChallenge(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text">Solution</label>
                  <textarea
                    rows={3}
                    value={projSolution}
                    onChange={(e) => setProjSolution(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text">Results</label>
                  <textarea
                    rows={3}
                    value={projResults}
                    onChange={(e) => setProjResults(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={projTech}
                    onChange={(e) => setProjTech(e.target.value)}
                    placeholder="React, Express, MongoDB"
                    className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase font-mono text-studio-text">Thumbnail URL</label>
                  <input
                    type="text"
                    value={projThumbnail}
                    onChange={(e) => setProjThumbnail(e.target.value)}
                    className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-mono text-studio-text">Project Milestone Status</label>
                <select
                  value={projStatus}
                  onChange={(e) => setProjStatus(e.target.value as any)}
                  className="w-full bg-studio-black border border-studio-border px-3 py-2 rounded text-studio-white focus:outline-none focus:border-accent-cyan cursor-pointer"
                >
                  <option value="Inquiry">Inquiry</option>
                  <option value="Planning">Planning</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-accent-indigo hover:bg-indigo-700 text-white px-6 py-2.5 rounded font-semibold text-xs uppercase tracking-widest flex-grow"
                >
                  Save Case Study
                </button>
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="bg-studio-black border border-studio-border hover:border-studio-white text-studio-white px-6 py-2.5 rounded font-semibold text-xs uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
