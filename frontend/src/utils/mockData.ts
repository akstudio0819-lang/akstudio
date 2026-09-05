export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  client: string;
  industry: string;
  services: string[];
  technologies: string[];
  thumbnail: string;
  gallery: string[];
  challenge: string;
  solution: string;
  results: string;
  status: 'Inquiry' | 'Planning' | 'Design' | 'Development' | 'Testing' | 'Completed';
  createdAt: string;
}

export interface Review {
  _id: string;
  name: string;
  business: string;
  rating: number;
  review: string;
  image: string;
  approved: boolean;
  createdAt: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  active: boolean;
}

export interface ContactEnquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: 'pending' | 'reviewed' | 'contacted' | 'converted' | 'cancelled';
  createdAt: string;
}

export interface Consultation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  projectType: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  project?: string;
  read: boolean;
  createdAt: string;
}

export const initialServices: Service[] = [
  {
    _id: "s1",
    title: "Website Design",
    slug: "website-design",
    description: "Create premium, responsive, and conversion-focused visual interfaces designed to capture and hold attention.",
    icon: "Layout",
    features: ["Responsive UI Mockups", "Interactive Prototypes", "Modern Typography System", "Design Tokens", "Figma Components", "Custom Brand Assets"],
    price: "₹35,000",
    active: true
  },
  {
    _id: "s2",
    title: "Web Development",
    slug: "web-development",
    description: "Build ultra-fast, search-engine-optimized, and responsive frontend systems using React, Vite, and tailwind structures.",
    icon: "Code",
    features: ["Vite / React Integration", "Tailwind CSS Layouts", "W3C Clean Code Structure", "Speed Optimization (LCP < 2s)", "Custom Micro-interactions", "Framer Motion Animations"],
    price: "₹50,000",
    active: true
  },
  {
    _id: "s3",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Deep research, user journey mapping, and wireframing for complex SaaS software and custom web architectures.",
    icon: "Layers",
    features: ["User Persona Definition", "Sitemap Architecture", "Low & High Fidelity Wireframes", "Interactive Interactive Flows", "Usability Testing", "UX Audit Reports"],
    price: "₹30,000",
    active: true
  },
  {
    _id: "s4",
    title: "E-commerce Development",
    slug: "e-commerce-development",
    description: "Create complete high-converting storefronts, customized checkouts, and clean admin inventory trackers.",
    icon: "ShoppingBag",
    features: ["Product Management System", "Stripe & Razorpay Settings", "Secured Checkout Flow", "Discount Code Engine", "Order Invoicing PDF", "SEO Optimized Pages"],
    price: "₹75,000",
    active: true
  },
  {
    _id: "s5",
    title: "Business Websites",
    slug: "business-websites",
    description: "Premium brochure sites and corporate architectures built to establish bulletproof credibility and capture emails.",
    icon: "Briefcase",
    features: ["Company Bio Sections", "Portfolio Integration", "Career/Jobs Boards", "Interactive Location Map", "Newsletter Signup Integration", "Analytics Tracking Setup"],
    price: "₹40,000",
    active: true
  },
  {
    _id: "s6",
    title: "Custom Web Applications",
    slug: "custom-web-applications",
    description: "Tailor-made portals, fullstack client hubs, dashboard statistics trackers, and custom Node/MongoDB systems.",
    icon: "Cpu",
    features: ["Custom Database Architecture", "Express & Mongoose REST API", "Dual Dashboard Panels", "Interactive Realtime Reports", "Third-Party API Hookups", "Supabase Secure Auth"],
    price: "₹1,20,000",
    active: true
  },
  {
    _id: "s7",
    title: "Website Redesign",
    slug: "website-redesign",
    description: "Transform lagging obsolete websites into hyper-modern, high-performing corporate assets that drive sales.",
    icon: "RefreshCw",
    features: ["Legacy Site Assets Audit", "Content Migration Strategy", "Speed & Performance Boost", "Modern Visual Refresh", "Responsive Breakpoints", "Zero SEO Impact Reroutes"],
    price: "₹30,000",
    active: true
  },
  {
    _id: "s8",
    title: "Maintenance & Support",
    slug: "maintenance-support",
    description: "Hourly, weekly, and monthly packages to handle security updates, package checks, content edits, and server tasks.",
    icon: "ShieldCheck",
    features: ["Daily/Weekly Databases Backups", "Supabase Security Audits", "React Dependency Checks", "Core Web Vitals Checks", "Monthly Analytics Delivery", "Priority Email Support"],
    price: "₹8,000/mo",
    active: true
  }
];

export const initialProjects: Project[] = [
  {
    _id: "p1",
    title: "Dream Avenue Clinic",
    slug: "dream-avenue-clinic",
    category: "Healthcare Website",
    description: "A comprehensive digital ecosystem built for a premier dental and cosmetic clinic to streamline appointment inquiries and show clinical expertise.",
    client: "Dr. Aditya Sharma",
    industry: "Healthcare / Medical Services",
    services: ["UI/UX Design", "Web Development", "Consultation Booking System"],
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Express.js", "MongoDB"],
    thumbnail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop"
    ],
    challenge: "Dream Avenue Clinic suffered from a disjointed patient booking process and a legacy site that did not match the premium high-end aesthetic of their physical clinic. They needed a clean, inviting, and highly informative portal that ranks organically and builds instantaneous client trust.",
    solution: "We designed an Apple-style editorial medical portal. The site includes interactive treatment guides, detailed specialist cards, verified review integrations, and an intuitive custom consultation booking dashboard linked to their backend. Submissions are categorized and routed instantly.",
    results: "Within three weeks of launch, the clinic saw a 42% decrease in administrative booking friction and a substantial uplift in premium cosmetic consultation requests.",
    status: "Completed",
    createdAt: "2026-06-15T08:00:00Z"
  },
  {
    _id: "p2",
    title: "SKIHA Clinic",
    slug: "skiha-clinic",
    category: "Healthcare / E-commerce",
    description: "A premium dermatology portal paired with a luxury clinical skincare store, complete with custom search and skin diagnostic questionnaires.",
    client: "Skiha Dermatology Group",
    industry: "Skincare / E-commerce",
    services: ["E-commerce Development", "UI/UX Design", "Custom Web Application"],
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Stripe API"],
    thumbnail: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop"
    ],
    challenge: "The brand wanted to combine clinical consultations with custom e-commerce product lines under a single premium design system. Connecting appointments and product listings dynamically without visual clutter was a key obstacle.",
    solution: "Created a minimalist, editorial layout that splits paths into Clinical Appointments and Skincare E-shop. It features interactive diagnostic surveys that dynamically suggest specific skincare products, boosting order sizes.",
    results: "Delivered a lightning-fast responsive storefront. Cart conversion rates increased by 28% and diagnostic survey completion rates reached 70%.",
    status: "Completed",
    createdAt: "2026-07-10T10:00:00Z"
  },
  {
    _id: "p3",
    title: "AK Sports Store",
    slug: "ak-sports",
    category: "Sports E-commerce",
    description: "High-performance sports equipment store featuring real-time inventory synchronizations and customer-centric product filters.",
    client: "AK Sports Ltd.",
    industry: "Retail / Sports Equipment",
    services: ["E-commerce Development", "Brand Strategy", "Speed Optimization"],
    technologies: ["React", "Express.js", "MongoDB", "Redux", "Tailwind CSS"],
    thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=800&auto=format&fit=crop"
    ],
    challenge: "AK Sports faced high load times and mobile cart abandonment rates. Their product filter engine was slow and returned empty searches due to faulty index layouts.",
    solution: "We rebuilt the entire catalog frontend with optimized state structures and designed a fast multi-layered facet search. Implemented smooth slide-in checkouts and automated cart-retrieval email reminders.",
    results: "Google Lighthouse score reached 98/100 on desktop and 91/100 on mobile, driving a direct 35% growth in mobile-purchased sports packages.",
    status: "Completed",
    createdAt: "2026-08-01T12:00:00Z"
  }
];

export const initialReviews: Review[] = [
  {
    _id: "r1",
    name: "Dr. Aditya Sharma",
    business: "Dream Avenue Clinic",
    rating: 5,
    review: "AK Studio completely overhauled our medical portal. The appointment booking structure has transformed how our clinic handles daily clients. Their eye for detail is outstanding.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&auto=format&fit=crop",
    approved: true,
    createdAt: "2026-06-20T11:00:00Z"
  },
  {
    _id: "r2",
    name: "Meera Nair",
    business: "SKIHA Clinic",
    rating: 5,
    review: "The design feels so premium and sophisticated. Our clients frequently comment on how beautiful and easy to use the e-commerce shop is. Highly professional developers!",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    approved: true,
    createdAt: "2026-07-15T09:00:00Z"
  },
  {
    _id: "r3",
    name: "Rohan Verma",
    business: "AK Sports Store",
    rating: 5,
    review: "Incredible loading speeds and very clean layouts. The facet search tool has reduced empty queries to zero. Our conversion rates are up, and the team provided outstanding maintenance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    approved: true,
    createdAt: "2026-08-05T14:30:00Z"
  }
];
