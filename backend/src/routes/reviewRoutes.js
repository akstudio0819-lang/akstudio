import express from 'express';
import { 
  getReviews, 
  createReview, 
  updateReview, 
  deleteReview 
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);
router.put('/:id', protect, adminOnly, updateReview);
router.delete('/:id', protect, adminOnly, deleteReview);

export default router;
