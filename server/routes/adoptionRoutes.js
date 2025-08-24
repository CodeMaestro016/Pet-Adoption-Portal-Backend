import express from 'express';
import { requestAdoption, getAdoptionRequests, getMyAdoptionRequests, updateAdoptionStatus } from '../controllers/adoptionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/adoptions/:petId', protect, requestAdoption);
router.get('/adoptions', protect, getAdoptionRequests);
router.get('/my-adoptions', protect, getMyAdoptionRequests); // New endpoint
router.put('/adoptions/:id', protect, updateAdoptionStatus);

export default router;