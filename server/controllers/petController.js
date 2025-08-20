import Pet from '../models/Pet.js';
import asyncHandler from 'express-async-handler';
import upload from '../middleware/uploadMiddleware.js';

// Get all pets
const getPets = asyncHandler(async (req, res) => {
  const pets = await Pet.find().populate('shelterId', 'name email');
  res.json(pets);
});

// Get single pet
const getPetById = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id).populate('shelterId', 'name email');
  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ message: 'Pet not found' });
  }
});

// Add new pet (Shelter only) with image upload
const addPet = [
  upload.single('image'), // 'image' is the field name for the file input
  asyncHandler(async (req, res) => {
    const { name, breed, age, type, description, available } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const pet = await Pet.create({
      name,
      breed,
      age,
      type,
      description,
      image,
      available,
      shelterId: req.user._id,
    });
    res.status(201).json(pet);
  }),
];

// Update pet (Shelter only) with optional image upload
const updatePet = [
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const pet = await Pet.findById(req.params.id);
    if (pet && pet.shelterId.toString() === req.user._id.toString()) {
      const { name, breed, age, type, description, available } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : pet.image;

      const updatedPet = await Pet.findByIdAndUpdate(
        req.params.id,
        { name, breed, age, type, description, image, available },
        { new: true }
      );
      res.json(updatedPet);
    } else {
      res.status(403).json({ message: 'Not authorized to update this pet' });
    }
  }),
];

// Delete pet (Shelter only)
const deletePet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (pet && pet.shelterId.toString() === req.user._id.toString()) {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet removed' });
  } else {
    res.status(403).json({ message: 'Not authorized to delete this pet' });
  }
});

export { getPets, getPetById, addPet, updatePet, deletePet };