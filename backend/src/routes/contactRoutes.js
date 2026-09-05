import express from 'express';
import { 
  getContacts, 
  createContact, 
  updateContactStatus, 
  deleteContact 
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getContacts);
router.post('/', createContact);
router.put('/:id', protect, adminOnly, updateContactStatus);
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;
