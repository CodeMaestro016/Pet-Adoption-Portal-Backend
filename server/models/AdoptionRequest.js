import mongoose from 'mongoose';

const adoptionRequestSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  adopterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shelterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  requestDate: { type: Date, default: Date.now },
}, { timestamps: true });

const AdoptionRequest = mongoose.model('AdoptionRequest', adoptionRequestSchema);
export default AdoptionRequest;