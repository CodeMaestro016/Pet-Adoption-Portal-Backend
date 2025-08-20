import AdoptionRequest from '../models/AdoptionRequest.js';
import asyncHandler from 'express-async-handler';
import Pet from '../models/Pet.js'; // Add this import

// Request adoption (Adopter only)
const requestAdoption = asyncHandler(async (req, res) => {
  if (req.user.role !== 'Adopter') {
    res.status(403).json({ message: 'Only Adopters can request adoption' });
    return;
  }
  const { petId } = req.params;
  const pet = await Pet.findById(petId).populate('shelterId');
  if (!pet) {
    res.status(404).json({ message: 'Pet not found' });
    return;
  }
  const adoption = await AdoptionRequest.create({
    petId,
    adopterId: req.user._id,
    shelterId: pet.shelterId._id,
  });
  res.status(201).json(adoption);
});

// Get user's adoption requests (Shelter only)
const getAdoptionRequests = asyncHandler(async (req, res) => {
  if (req.user.role !== 'Shelter') {
    res.status(403).json({ message: 'Only Shelters can view adoption requests' });
    return;
  }
  const requests = await AdoptionRequest.find({ shelterId: req.user._id }).populate('adopterId', 'name email').populate('petId', 'name');
  res.json(requests);
});


// Get adopter's own adoption requests (Adopter only)
const getMyAdoptionRequests = asyncHandler(async (req, res) => {
  if (req.user.role !== 'Adopter') {
    res.status(403).json({ message: 'Only Adopters can view their own adoption requests' });
    return;
  }
  const requests = await AdoptionRequest.find({ adopterId: req.user._id }).populate('petId', 'name breed');
  res.json(requests);
});



// Update adoption request status (Shelter only)
const updateAdoptionStatus = asyncHandler(async (req, res) => {
  if (req.user.role !== 'Shelter') {
    res.status(403).json({ message: 'Only Shelters can update adoption status' });
    return;
  }
  const { id } = req.params;
  const { status } = req.body;
  const request = await AdoptionRequest.findById(id);
  if (!request || request.shelterId.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: 'Not authorized to update this request' });
    return;
  }
  const updatedRequest = await AdoptionRequest.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updatedRequest);
});

export { requestAdoption, getAdoptionRequests, getMyAdoptionRequests, updateAdoptionStatus };