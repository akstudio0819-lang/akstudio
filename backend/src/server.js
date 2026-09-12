import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import projectRoutes from './routes/projectRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Connect DB (Optional fallback)
connectDB();

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors({
  origin: '*',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

app.use(express.json());

// Phusion Passenger Health Check Route (Fixes cPanel startup Content-Type header checks)
app.get('/_health', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.status(200).send('OK');
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/messages', messageRoutes);

// Admin Stats Endpoint
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalProjects: 3,
    totalClients: 3,
    pendingEnquiries: 1,
    pendingConsultations: 1,
    pendingReviews: 0
  });
});

// Serve static frontend files in production (if public/ dist folder exists)
const publicPath = path.join(__dirname, '../public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath, {
    setHeaders: (res) => {
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    }
  }));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.join(publicPath, 'index.html'));
  });
} else {
  // Health check fallback
  app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.status(200).send('<html><body>AK Studio API Active</body></html>');
  });
}

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AK Studio Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
