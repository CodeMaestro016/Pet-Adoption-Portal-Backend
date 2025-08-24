import express from 'express';
import { getPets, getPetById, addPet, updatePet, deletePet } from '../controllers/petController.js';
import { protect, shelterOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPets).post(protect, shelterOnly, addPet);
router.route('/:id').get(getPetById).put(protect, shelterOnly, updatePet).delete(protect, shelterOnly, deletePet);

export default router;