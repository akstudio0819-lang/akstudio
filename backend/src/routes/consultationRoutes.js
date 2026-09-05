import express from 'express';
import { 
  getConsultations, 
  createConsultation, 
  updateConsultationStatus 
} from '../controllers/consultationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getConsultations);
router.post('/', createConsultation);
router.put('/:id', protect, adminOnly, updateConsultationStatus);

export default router;
