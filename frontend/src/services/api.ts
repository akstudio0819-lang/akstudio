import { supabase } from './supabase';
import { Project, Service, Review, ContactEnquiry, Consultation, Message, initialServices, initialProjects, initialReviews } from '../utils/mockData';

// Local storage fallback helpers
const initLocalDb = () => {
  if (!localStorage.getItem('aks_services')) {
    localStorage.setItem('aks_services', JSON.stringify(initialServices));
  }
  if (!localStorage.getItem('aks_projects')) {
    localStorage.setItem('aks_projects', JSON.stringify(initialProjects));
  }
  if (!localStorage.getItem('aks_reviews')) {
    localStorage.setItem('aks_reviews', JSON.stringify(initialReviews));
  }
};
initLocalDb();

const getLocal = <T>(key: string): T[] => {
  return JSON.parse(localStorage.getItem(key) || '[]') as T[];
};

export const api = {
  // Services
  getServices: async (): Promise<Service[]> => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (error || !data || data.length === 0) {
        return getLocal<Service>('aks_services');
      }
      return data.map(item => ({
        _id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        icon: item.icon,
        features: item.features || [],
        price: item.price,
        active: item.active
      }));
    } catch (e) {
      return getLocal<Service>('aks_services');
    }
  },
  createService: async (service: Omit<Service, '_id'>): Promise<Service> => {
    try {
      const { data, error } = await supabase.from('services').insert([{
        title: service.title,
        slug: service.slug,
        description: service.description,
        icon: service.icon,
        features: service.features,
        price: service.price,
        active: service.active
      }]).select();

      if (error || !data || data.length === 0) {
        const services = getLocal<Service>('aks_services');
        const newService = { ...service, _id: 's_' + Date.now() };
        services.push(newService);
        localStorage.setItem('aks_services', JSON.stringify(services));
        return newService;
      }

      return {
        _id: data[0].id,
        ...service
      };
    } catch (e) {
      const services = getLocal<Service>('aks_services');
      const newService = { ...service, _id: 's_' + Date.now() };
      services.push(newService);
      localStorage.setItem('aks_services', JSON.stringify(services));
      return newService;
    }
  },
  updateService: async (id: string, service: Partial<Service>): Promise<Service> => {
    try {
      const { data, error } = await supabase.from('services').update({
        title: service.title,
        slug: service.slug,
        description: service.description,
        icon: service.icon,
        features: service.features,
        price: service.price,
        active: service.active
      }).eq('id', id).select();

      if (error || !data) throw new Error('Update failed');
      return { _id: data[0].id, ...data[0] } as Service;
    } catch (e) {
      const services = getLocal<Service>('aks_services');
      const idx = services.findIndex(s => s._id === id);
      if (idx !== -1) {
        services[idx] = { ...services[idx], ...service } as Service;
        localStorage.setItem('aks_services', JSON.stringify(services));
        return services[idx];
      }
      throw new Error('Service not found');
    }
  },
  deleteService: async (id: string): Promise<boolean> => {
    try {
      await supabase.from('services').delete().eq('id', id);
      return true;
    } catch (e) {
      const services = getLocal<Service>('aks_services');
      const filtered = services.filter(s => s._id !== id);
      localStorage.setItem('aks_services', JSON.stringify(filtered));
      return true;
    }
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        return getLocal<Project>('aks_projects');
      }
      return data.map(item => ({
        _id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category,
        description: item.description,
        client: item.client,
        industry: item.industry,
        services: item.services || [],
        technologies: item.technologies || [],
        thumbnail: item.thumbnail,
        gallery: item.gallery || [],
        challenge: item.challenge,
        solution: item.solution,
        results: item.results,
        status: item.status,
        createdAt: item.created_at
      }));
    } catch (e) {
      return getLocal<Project>('aks_projects');
    }
  },
  getProjectBySlug: async (slug: string): Promise<Project> => {
    try {
      const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
      if (error || !data) {
        const projects = getLocal<Project>('aks_projects');
        const project = projects.find(p => p.slug === slug);
        if (project) return project;
        throw new Error('Project not found');
      }
      return {
        _id: data.id,
        title: data.title,
        slug: data.slug,
        category: data.category,
        description: data.description,
        client: data.client,
        industry: data.industry,
        services: data.services || [],
        technologies: data.technologies || [],
        thumbnail: data.thumbnail,
        gallery: data.gallery || [],
        challenge: data.challenge,
        solution: data.solution,
        results: data.results,
        status: data.status,
        createdAt: data.created_at
      };
    } catch (e) {
      const projects = getLocal<Project>('aks_projects');
      const project = projects.find(p => p.slug === slug);
      if (project) return project;
      throw new Error('Project not found');
    }
  },
  createProject: async (project: Omit<Project, '_id' | 'createdAt'>): Promise<Project> => {
    try {
      const { data, error } = await supabase.from('projects').insert([{
        title: project.title,
        slug: project.slug,
        category: project.category,
        description: project.description,
        client: project.client,
        industry: project.industry,
        services: project.services,
        technologies: project.technologies,
        thumbnail: project.thumbnail,
        gallery: project.gallery,
        challenge: project.challenge,
        solution: project.solution,
        results: project.results,
        status: project.status
      }]).select();

      if (error || !data || data.length === 0) {
        const projects = getLocal<Project>('aks_projects');
        const newProj: Project = { ...project, _id: 'p_' + Date.now(), createdAt: new Date().toISOString() };
        projects.push(newProj);
        localStorage.setItem('aks_projects', JSON.stringify(projects));
        return newProj;
      }
      return { _id: data[0].id, ...project, createdAt: data[0].created_at };
    } catch (e) {
      const projects = getLocal<Project>('aks_projects');
      const newProj: Project = { ...project, _id: 'p_' + Date.now(), createdAt: new Date().toISOString() };
      projects.push(newProj);
      localStorage.setItem('aks_projects', JSON.stringify(projects));
      return newProj;
    }
  },
  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    try {
      const { data, error } = await supabase.from('projects').update(project).eq('id', id).select();
      if (error || !data) throw new Error('Update failed');
      return { _id: data[0].id, ...data[0] } as Project;
    } catch (e) {
      const projects = getLocal<Project>('aks_projects');
      const idx = projects.findIndex(p => p._id === id);
      if (idx !== -1) {
        projects[idx] = { ...projects[idx], ...project } as Project;
        localStorage.setItem('aks_projects', JSON.stringify(projects));
        return projects[idx];
      }
      throw new Error('Project not found');
    }
  },
  deleteProject: async (id: string): Promise<boolean> => {
    try {
      await supabase.from('projects').delete().eq('id', id);
      return true;
    } catch (e) {
      const projects = getLocal<Project>('aks_projects');
      const filtered = projects.filter(p => p._id !== id);
      localStorage.setItem('aks_projects', JSON.stringify(filtered));
      return true;
    }
  },

  // Reviews
  getReviews: async (): Promise<Review[]> => {
    try {
      const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        return getLocal<Review>('aks_reviews');
      }
      return data.map(r => ({
        _id: r.id,
        name: r.client_name,
        business: r.business_name,
        rating: r.rating,
        review: r.review,
        image: r.profile_image,
        approved: r.approved !== undefined && r.approved !== null ? r.approved : true,
        createdAt: r.created_at
      }));
    } catch (e) {
      return getLocal<Review>('aks_reviews');
    }
  },
  createReview: async (review: Omit<Review, '_id' | 'createdAt'>): Promise<Review> => {
    try {
      const { data, error } = await supabase.from('reviews').insert([{
        client_name: review.name,
        business_name: review.business,
        rating: review.rating,
        review: review.review,
        profile_image: review.image || '',
        approved: true
      }]).select();

      if (error || !data || data.length === 0) {
        const reviews = getLocal<Review>('aks_reviews');
        const newReview: Review = { ...review, approved: true, _id: 'r_' + Date.now(), createdAt: new Date().toISOString() };
        reviews.unshift(newReview);
        localStorage.setItem('aks_reviews', JSON.stringify(reviews));
        return newReview;
      }
      return {
        _id: data[0].id,
        name: data[0].client_name,
        business: data[0].business_name,
        rating: data[0].rating,
        review: data[0].review,
        image: data[0].profile_image,
        approved: true,
        createdAt: data[0].created_at
      };
    } catch (e) {
      const reviews = getLocal<Review>('aks_reviews');
      const newReview: Review = { ...review, approved: true, _id: 'r_' + Date.now(), createdAt: new Date().toISOString() };
      reviews.unshift(newReview);
      localStorage.setItem('aks_reviews', JSON.stringify(reviews));
      return newReview;
    }
  },
  updateReview: async (id: string, review: Partial<Review>): Promise<Review> => {
    try {
      const payload: any = {};
      if (review.name) payload.client_name = review.name;
      if (review.business) payload.business_name = review.business;
      if (review.rating !== undefined) payload.rating = review.rating;
      if (review.review) payload.review = review.review;
      if (review.image !== undefined) payload.profile_image = review.image;
      if (review.approved !== undefined) payload.approved = review.approved;

      const { data, error } = await supabase.from('reviews').update(payload).eq('id', id).select();
      if (error || !data) throw new Error('Update review failed');
      return {
        _id: data[0].id,
        name: data[0].client_name,
        business: data[0].business_name,
        rating: data[0].rating,
        review: data[0].review,
        image: data[0].profile_image,
        approved: data[0].approved,
        createdAt: data[0].created_at
      };
    } catch (e) {
      const reviews = getLocal<Review>('aks_reviews');
      const idx = reviews.findIndex(r => r._id === id);
      if (idx !== -1) {
        reviews[idx] = { ...reviews[idx], ...review } as Review;
        localStorage.setItem('aks_reviews', JSON.stringify(reviews));
        return reviews[idx];
      }
      throw new Error('Review not found');
    }
  },
  deleteReview: async (id: string): Promise<boolean> => {
    try {
      await supabase.from('reviews').delete().eq('id', id);
      return true;
    } catch (e) {
      const reviews = getLocal<Review>('aks_reviews');
      const filtered = reviews.filter(r => r._id !== id);
      localStorage.setItem('aks_reviews', JSON.stringify(filtered));
      return true;
    }
  },

  // Contact / Enquiries
  getEnquiries: async (): Promise<ContactEnquiry[]> => {
    try {
      const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
      if (error || !data) return getLocal<ContactEnquiry>('aks_enquiries');
      return data.map(c => ({
        _id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        company: c.company,
        service: c.service,
        budget: c.budget,
        message: c.message,
        status: c.status,
        createdAt: c.created_at
      }));
    } catch (e) {
      return getLocal<ContactEnquiry>('aks_enquiries');
    }
  },
  submitContact: async (enquiry: Omit<ContactEnquiry, '_id' | 'status' | 'createdAt'>): Promise<ContactEnquiry> => {
    // 1. Send HTTP request to Backend API (which triggers Nodemailer to akstudio0819@gmail.com)
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry)
      }).catch(err => console.log('Backend email dispatch notice:', err));
    } catch (e) {
      console.log('Backend contact post ignored:', e);
    }

    // 2. Save to Supabase DB
    try {
      const { data, error } = await supabase.from('contacts').insert([{
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        company: enquiry.company,
        service: enquiry.service,
        budget: enquiry.budget,
        message: enquiry.message,
        status: 'pending'
      }]).select();

      if (error || !data || data.length === 0) {
        const enquiries = getLocal<ContactEnquiry>('aks_enquiries');
        const newEnq: ContactEnquiry = { ...enquiry, _id: 'e_' + Date.now(), status: 'pending', createdAt: new Date().toISOString() };
        enquiries.unshift(newEnq);
        localStorage.setItem('aks_enquiries', JSON.stringify(enquiries));
        return newEnq;
      }
      return { _id: data[0].id, ...enquiry, status: 'pending', createdAt: data[0].created_at };
    } catch (e) {
      const enquiries = getLocal<ContactEnquiry>('aks_enquiries');
      const newEnq: ContactEnquiry = { ...enquiry, _id: 'e_' + Date.now(), status: 'pending', createdAt: new Date().toISOString() };
      enquiries.unshift(newEnq);
      localStorage.setItem('aks_enquiries', JSON.stringify(enquiries));
      return newEnq;
    }
  },
  updateEnquiryStatus: async (id: string, status: ContactEnquiry['status']): Promise<ContactEnquiry> => {
    try {
      const { data, error } = await supabase.from('contacts').update({ status }).eq('id', id).select();
      if (error || !data) throw new Error('Update enquiry failed');
      return { _id: data[0].id, ...data[0] } as ContactEnquiry;
    } catch (e) {
      const enquiries = getLocal<ContactEnquiry>('aks_enquiries');
      const idx = enquiries.findIndex(e => e._id === id);
      if (idx !== -1) {
        enquiries[idx].status = status;
        localStorage.setItem('aks_enquiries', JSON.stringify(enquiries));
        return enquiries[idx];
      }
      throw new Error('Enquiry not found');
    }
  },
  deleteEnquiry: async (id: string): Promise<boolean> => {
    try {
      await supabase.from('contacts').delete().eq('id', id);
      return true;
    } catch (e) {
      const enquiries = getLocal<ContactEnquiry>('aks_enquiries');
      const filtered = enquiries.filter(e => e._id !== id);
      localStorage.setItem('aks_enquiries', JSON.stringify(filtered));
      return true;
    }
  },

  // Consultations
  getConsultations: async (): Promise<Consultation[]> => {
    try {
      const { data, error } = await supabase.from('consultations').select('*').order('created_at', { ascending: false });
      if (error || !data) return getLocal<Consultation>('aks_consultations');
      return data.map(c => ({
        _id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        date: c.preferred_date,
        time: c.preferred_time,
        projectType: c.service,
        message: c.message,
        status: c.status,
        createdAt: c.created_at
      }));
    } catch (e) {
      return getLocal<Consultation>('aks_consultations');
    }
  },
  bookConsultation: async (consultation: Omit<Consultation, '_id' | 'status' | 'createdAt'>): Promise<Consultation> => {
    try {
      const { data, error } = await supabase.from('consultations').insert([{
        name: consultation.name,
        email: consultation.email,
        phone: consultation.phone,
        preferred_date: consultation.date,
        preferred_time: consultation.time,
        service: consultation.projectType,
        message: consultation.message,
        status: 'Pending'
      }]).select();

      if (error || !data || data.length === 0) {
        const consultations = getLocal<Consultation>('aks_consultations');
        const newCons: Consultation = { ...consultation, _id: 'c_' + Date.now(), status: 'Pending', createdAt: new Date().toISOString() };
        consultations.push(newCons);
        localStorage.setItem('aks_consultations', JSON.stringify(consultations));
        return newCons;
      }
      return { _id: data[0].id, ...consultation, status: 'Pending', createdAt: data[0].created_at };
    } catch (e) {
      const consultations = getLocal<Consultation>('aks_consultations');
      const newCons: Consultation = { ...consultation, _id: 'c_' + Date.now(), status: 'Pending', createdAt: new Date().toISOString() };
      consultations.push(newCons);
      localStorage.setItem('aks_consultations', JSON.stringify(consultations));
      return newCons;
    }
  },
  updateConsultationStatus: async (id: string, status: Consultation['status']): Promise<Consultation> => {
    try {
      const { data, error } = await supabase.from('consultations').update({ status }).eq('id', id).select();
      if (error || !data) throw new Error('Update consultation failed');
      return { _id: data[0].id, ...data[0] } as Consultation;
    } catch (e) {
      const consultations = getLocal<Consultation>('aks_consultations');
      const idx = consultations.findIndex(c => c._id === id);
      if (idx !== -1) {
        consultations[idx].status = status;
        localStorage.setItem('aks_consultations', JSON.stringify(consultations));
        return consultations[idx];
      }
      throw new Error('Consultation not found');
    }
  },

  // Newsletter
  subscribeNewsletter: async (email: string): Promise<boolean> => {
    try {
      await supabase.from('contacts').insert([{
        name: 'Newsletter Subscriber',
        email: email,
        service: 'Newsletter',
        budget: 'N/A',
        message: 'Subscribed to monthly updates',
        status: 'pending'
      }]);
      return true;
    } catch (e) {
      return true;
    }
  },

  // Messages (Client Dashboard)
  getMessages: async (senderOrReceiver: string): Promise<Message[]> => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender.eq.${senderOrReceiver},receiver.eq.${senderOrReceiver}`)
        .order('created_at', { ascending: true });

      if (error || !data || data.length === 0) {
        return getLocal<Message>('aks_messages').filter(m => m.sender === senderOrReceiver || m.receiver === senderOrReceiver);
      }
      return data.map(m => ({
        _id: m.id,
        sender: m.sender,
        receiver: m.receiver,
        message: m.message,
        project: m.project,
        read: m.read,
        createdAt: m.created_at
      }));
    } catch (e) {
      return getLocal<Message>('aks_messages').filter(m => m.sender === senderOrReceiver || m.receiver === senderOrReceiver);
    }
  },
  sendMessage: async (msg: Omit<Message, '_id' | 'read' | 'createdAt'>): Promise<Message> => {
    try {
      const { data, error } = await supabase.from('messages').insert([{
        sender: msg.sender,
        receiver: msg.receiver,
        message: msg.message,
        project: msg.project,
        read: false
      }]).select();

      if (error || !data || data.length === 0) {
        const messages = getLocal<Message>('aks_messages');
        const newMsg: Message = { ...msg, _id: 'msg_' + Date.now(), read: false, createdAt: new Date().toISOString() };
        messages.push(newMsg);
        localStorage.setItem('aks_messages', JSON.stringify(messages));
        return newMsg;
      }
      return {
        _id: data[0].id,
        sender: data[0].sender,
        receiver: data[0].receiver,
        message: data[0].message,
        project: data[0].project,
        read: data[0].read,
        createdAt: data[0].created_at
      };
    } catch (e) {
      const messages = getLocal<Message>('aks_messages');
      const newMsg: Message = { ...msg, _id: 'msg_' + Date.now(), read: false, createdAt: new Date().toISOString() };
      messages.push(newMsg);
      localStorage.setItem('aks_messages', JSON.stringify(messages));
      return newMsg;
    }
  },

  // Admin Dashboard stats
  getAdminStats: async () => {
    try {
      const [projectsRes, enquiriesRes, consultationsRes, reviewsRes] = await Promise.all([
        supabase.from('projects').select('id, client', { count: 'exact' }),
        supabase.from('contacts').select('id, status', { count: 'exact' }),
        supabase.from('consultations').select('id, status', { count: 'exact' }),
        supabase.from('reviews').select('id, approved', { count: 'exact' })
      ]);

      const projectsData = projectsRes.data || [];
      const enquiriesData = enquiriesRes.data || [];
      const consultationsData = consultationsRes.data || [];
      const reviewsData = reviewsRes.data || [];

      return {
        totalProjects: projectsData.length || 3,
        totalClients: new Set(projectsData.map(p => p.client)).size || 3,
        pendingEnquiries: enquiriesData.filter(e => e.status === 'pending').length,
        pendingConsultations: consultationsData.filter(c => c.status === 'Pending').length,
        pendingReviews: reviewsData.filter(r => !r.approved).length
      };
    } catch (e) {
      return {
        totalProjects: 3,
        totalClients: 3,
        pendingEnquiries: 0,
        pendingConsultations: 0,
        pendingReviews: 0
      };
    }
  }
};
