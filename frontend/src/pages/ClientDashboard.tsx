import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Project, Consultation, Message } from '../utils/mockData';
import { LayoutDashboard, FolderKanban, CalendarRange, MessageSquare, User, LogOut, CheckCircle2, CircleDot, Send } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';

export const ClientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'consultations' | 'messages'>('overview');

  // Backend/LocalStorage State
  const [projects, setProjects] = useState<Project[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [sendingMsg, setSendingMsg] = useState(false);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const [projectsRes, consultationsRes, messagesRes] = await Promise.all([
          api.getProjects(),
          api.getConsultations(),
          api.getMessages(user.email)
        ]);

        // Filter projects by client name / email matching (fallback to showing mock projects as client projects in demo)
        const clientProjs = projectsRes.filter(p => p.client.toLowerCase().includes(user.name.toLowerCase()) || p.client.toLowerCase().includes('aditya') || projectsRes.length > 0);
        setProjects(clientProjs.slice(0, 1)); // show 1 demo project tracker

        // Filter consultations by user email
        const userConsults = consultationsRes.filter(c => c.email.toLowerCase() === user.email.toLowerCase());
        setConsultations(userConsults);
        setMessages(messagesRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [user]);

  // Handle send message to admin
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    setSendingMsg(true);
    try {
      const msg = await api.sendMessage({
        sender: user.email,
        receiver: 'admin',
        message: newMessage,
        project: projects[0]?.title
      });
      
      setMessages(prev => [...prev, msg]);
      setNewMessage('');
      
      // Standalone auto reply simulation trigger
      setTimeout(async () => {
        const updatedMsgs = await api.getMessages(user.email);
        setMessages(updatedMsgs);
      }, 1800);
    } catch (err) {
      console.error(err);
    } finally {
      setSendingMsg(false);
    }
  };

  const steps = ['Inquiry', 'Planning', 'Design', 'Development', 'Testing', 'Completed'];
  const getStepIndex = (status: Project['status']) => steps.indexOf(status);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-studio-black">
        <div className="w-10 h-10 border-4 border-accent-indigo border-t-accent-cyan rounded-full animate-spin" />
        <p className="text-xs text-studio-text tracking-widest uppercase">Loading Portal...</p>
      </div>
    );
  }

  const activeProject = projects[0];

  return (
    <div className="studio-container py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Controls */}
        <aside className="w-full md:w-64 bg-studio-card border border-studio-border p-6 rounded-lg h-fit space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider block">Logged in as</span>
            <h4 className="text-sm font-bold text-studio-white uppercase truncate">{user?.name}</h4>
            <span className="text-[10px] text-studio-text truncate block">{user?.email}</span>
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
              <span>Project Tracker</span>
            </button>
            
            <button
              onClick={() => setActiveTab('consultations')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'consultations' ? 'bg-accent-indigo text-white' : 'text-studio-text hover:bg-studio-black/40 hover:text-studio-white'
              }`}
            >
              <CalendarRange size={16} />
              <span>Consultations ({consultations.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'messages' ? 'bg-accent-indigo text-white' : 'text-studio-text hover:bg-studio-black/40 hover:text-studio-white'
              }`}
            >
              <MessageSquare size={16} />
              <span>Project Messages</span>
            </button>
          </nav>

          <hr className="border-studio-border" />

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </aside>

        {/* Dashboard Panels */}
        <main className="flex-grow bg-studio-card border border-studio-border p-8 rounded-lg min-h-[450px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="border-b border-studio-border pb-4">
                <h2 className="text-xl font-display font-bold text-studio-white uppercase">Project Milestones</h2>
                <p className="text-xs text-studio-text">Monitor active development timelines and design phases.</p>
              </div>

              {activeProject ? (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-semibold">Active Project</span>
                    <h3 className="text-lg font-bold text-studio-white uppercase">{activeProject.title}</h3>
                    <p className="text-xs text-studio-text max-w-xl leading-relaxed">{activeProject.description}</p>
                  </div>

                  {/* Horizontal Milestone Tracker */}
                  <div className="relative pt-6 pb-2">
                    {/* Background Bar */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-studio-black -translate-y-1/2 z-0" />
                    
                    {/* Progress Fill */}
                    <div 
                      className="absolute top-1/2 left-0 h-1 bg-accent-cyan -translate-y-1/2 z-0 transition-all duration-500"
                      style={{ 
                        width: `${(getStepIndex(activeProject.status) / (steps.length - 1)) * 100}%` 
                      }}
                    />

                    {/* Step Indicators */}
                    <div className="relative flex justify-between z-10">
                      {steps.map((step, idx) => {
                        const currentIdx = getStepIndex(activeProject.status);
                        const isDone = idx < currentIdx;
                        const isCurrent = idx === currentIdx;
                        
                        return (
                          <div key={step} className="flex flex-col items-center">
                            <div 
                              className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                isDone 
                                  ? 'bg-studio-black border-accent-cyan text-accent-cyan' 
                                  : isCurrent 
                                    ? 'bg-accent-indigo border-accent-cyan text-studio-white animate-pulse'
                                    : 'bg-studio-black border-studio-border text-studio-text'
                              }`}
                            >
                              {isDone ? <CheckCircle2 size={14} /> : <CircleDot size={14} />}
                            </div>
                            <span className="text-[9px] uppercase font-mono tracking-wider font-semibold mt-2.5 text-studio-white">
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border border-studio-border/60 bg-studio-black/25 p-5 rounded space-y-2">
                    <span className="text-[10px] font-mono text-accent-cyan font-bold uppercase tracking-wider">Scope Deliverables</span>
                    <div className="grid grid-cols-2 gap-2">
                      {activeProject.services.map((serv, index) => (
                        <div key={index} className="text-xs text-studio-text flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-accent-cyan" />
                          <span>{serv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <FolderKanban className="text-studio-border mx-auto" size={48} />
                  <h3 className="text-base font-semibold text-studio-white uppercase">No Active Projects</h3>
                  <p className="text-xs text-studio-text max-w-sm mx-auto leading-relaxed">
                    You do not have any active projects tracked under this client account. Start by submitting a project request or scheduling a consultation.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONSULTATIONS */}
          {activeTab === 'consultations' && (
            <div className="space-y-8">
              <div className="border-b border-studio-border pb-4">
                <h2 className="text-xl font-display font-bold text-studio-white uppercase">Your Consultations</h2>
                <p className="text-xs text-studio-text">Review scheduled introductory discovery calls.</p>
              </div>

              {consultations.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {consultations.map((cons) => (
                    <div key={cons._id} className="bg-studio-black/40 border border-studio-border p-5 rounded-lg flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-wider font-bold">{cons.projectType}</span>
                        <div className="text-sm font-semibold text-studio-white flex items-center gap-2">
                          <span>{cons.date}</span>
                          <span className="text-studio-text">at</span>
                          <span>{cons.time}</span>
                        </div>
                        {cons.message && <p className="text-xs text-studio-text italic">"{cons.message}"</p>}
                      </div>
                      <span className={`text-[10px] uppercase font-mono px-2.5 py-1 rounded border ${
                        cons.status === 'Confirmed' 
                          ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                          : cons.status === 'Pending'
                            ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                            : 'bg-studio-border border-studio-border text-studio-text'
                      }`}>
                        {cons.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <CalendarRange className="text-studio-border mx-auto" size={48} />
                  <h3 className="text-base font-semibold text-studio-white uppercase">No Consultations Scheduled</h3>
                  <p className="text-xs text-studio-text max-w-sm mx-auto leading-relaxed">
                    Need to discuss custom coding requirements, pricing, or templates? Book a free discovery call.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6 flex flex-col h-[500px]">
              <div className="border-b border-studio-border pb-4 flex-shrink-0">
                <h2 className="text-xl font-display font-bold text-studio-white uppercase">Project Messages</h2>
                <p className="text-xs text-studio-text">Direct secure coordination link with the AK Studio development desk.</p>
              </div>

              {/* Chat messages viewport */}
              <div className="flex-grow overflow-y-auto space-y-4 pr-2 bg-studio-black/20 p-4 rounded border border-studio-border/60">
                {messages.map((msg) => {
                  const isAdmin = msg.sender === 'admin';
                  return (
                    <div 
                      key={msg._id} 
                      className={`flex flex-col max-w-[80%] ${isAdmin ? 'mr-auto items-start' : 'ml-auto items-end'}`}
                    >
                      <div className={`p-3.5 rounded-lg text-xs md:text-sm font-sans leading-relaxed ${
                        isAdmin 
                          ? 'bg-studio-card border border-studio-border text-studio-white rounded-tl-none' 
                          : 'bg-accent-indigo text-white rounded-tr-none'
                      }`}>
                        {msg.message}
                      </div>
                      <span className="text-[9px] font-mono text-studio-text mt-1.5 block">
                        {isAdmin ? 'AK Studio Desk' : 'You'} • {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2 flex-shrink-0 pt-2">
                <input
                  type="text"
                  required
                  placeholder="Ask a question or leave a note..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow bg-studio-black border border-studio-border px-4 py-2.5 rounded text-sm text-studio-white focus:outline-none focus:border-accent-cyan"
                />
                <button
                  type="submit"
                  disabled={sendingMsg}
                  className="bg-accent-indigo hover:bg-indigo-700 text-white px-5 rounded flex items-center justify-center transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
