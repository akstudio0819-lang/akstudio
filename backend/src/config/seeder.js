import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project } from '../models/Project.js';
import { Service } from '../models/Service.js';
import { Review } from '../models/Review.js';

dotenv.config();

const initialServices = [
  {
    title: "Website Design",
    slug: "website-design",
    description: "Create premium, responsive, and conversion-focused visual interfaces designed to capture and hold attention.",
    icon: "Layout",
    features: ["Responsive UI Mockups", "Interactive Prototypes", "Modern Typography System", "Design Tokens", "Figma Components"],
    price: "₹35,000",
    active: true
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: "Build ultra-fast, search-engine-optimized, and responsive frontend systems using React, Vite, and tailwind structures.",
    icon: "Code",
    features: ["Vite / React Integration", "Tailwind CSS Layouts", "W3C Clean Code Structure", "Speed Optimization (LCP < 2s)", "Framer Motion Animations"],
    price: "₹50,000",
    active: true
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Deep research, user journey mapping, and wireframing for complex SaaS software and custom web architectures.",
    icon: "Layers",
    features: ["User Persona Definition", "Sitemap Architecture", "Low & High Fidelity Wireframes", "Usability Testing"],
    price: "₹30,000",
    active: true
  },
  {
    title: "E-commerce Development",
    slug: "e-commerce-development",
    description: "Create complete high-converting storefronts, customized checkouts, and clean admin inventory trackers.",
    icon: "ShoppingBag",
    features: ["Product Management System", "Stripe & Razorpay Settings", "Secured Checkout Flow", "SEO Optimized Pages"],
    price: "₹75,000",
    active: true
  }
];

const initialProjects = [
  {
    title: "Dream Avenue Clinic",
    slug: "dream-avenue-clinic",
    category: "Healthcare Business Website",
    description: "A comprehensive digital ecosystem built for a premier dental and cosmetic clinic to streamline appointment inquiries.",
    client: "Dr. Aditya Sharma",
    industry: "Healthcare / Medical Services",
    services: ["UI/UX Design", "Web Development", "Consultation Booking System"],
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Express.js", "MongoDB"],
    thumbnail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop"
    ],
    challenge: "Dream Avenue Clinic suffered from a disjointed patient booking process and a legacy site that did not match the clinic's premium aesthetic.",
    solution: "We designed an Apple-style editorial medical portal with interactive treatment guides, specialist cards, and appointment builder.",
    results: "3 weeks post-launch: 42% decrease in administrative booking friction and substantial uplift in cosmetic consultation requests.",
    status: "Completed"
  },
  {
    title: "SKIHA Clinic",
    slug: "skiha-clinic",
    category: "Healthcare Website / E-commerce",
    description: "A premium dermatology portal paired with a luxury clinical skincare store.",
    client: "Skiha Dermatology Group",
    industry: "Skincare / E-commerce",
    services: ["E-commerce Development", "UI/UX Design", "Custom Web Application"],
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Stripe API"],
    thumbnail: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop"
    ],
    challenge: "Combining clinical consultations with custom e-commerce product lines under a single premium design system.",
    solution: "Created a minimalist, editorial layout that splits paths into Clinical Appointments and Skincare E-shop.",
    results: "Cart conversion rates increased by 28% and diagnostic survey completion rates reached 70%.",
    status: "Completed"
  },
  {
    title: "AK Sports",
    slug: "ak-sports",
    category: "Sports E-commerce Website",
    description: "High-performance sports equipment store featuring real-time inventory synchronizations.",
    client: "AK Sports Ltd.",
    industry: "Retail / Sports Equipment",
    services: ["E-commerce Development", "Brand Strategy", "Speed Optimization"],
    technologies: ["React", "Express.js", "MongoDB", "Redux", "Tailwind CSS"],
    thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
    gallery: [],
    challenge: "High load times and mobile cart abandonment rates due to slow product filters.",
    solution: "Rebuilt catalog frontend with optimized state structures and fast multi-layered search.",
    results: "Lighthouse score reached 98/100 on desktop, driving 35% growth in mobile purchases.",
    status: "Completed"
  }
];

const initialReviews = [
  {
    clientName: "Dr. Aditya Sharma",
    businessName: "Dream Avenue Clinic",
    rating: 5,
    review: "AK Studio completely overhauled our medical portal. The appointment booking structure has transformed how our clinic handles daily clients.",
    profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&auto=format&fit=crop",
    approved: true
  },
  {
    clientName: "Meera Nair",
    businessName: "SKIHA Clinic",
    rating: 5,
    review: "The design feels so premium and sophisticated. Our clients frequently comment on how beautiful and easy to use the e-commerce shop is.",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    approved: true
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/akstudio');
    console.log('Connected to MongoDB for Seeding...');

    await Service.deleteMany();
    await Project.deleteMany();
    await Review.deleteMany();

    await Service.insertMany(initialServices);
    await Project.insertMany(initialProjects);
    await Review.insertMany(initialReviews);

    console.log('Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding Failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
