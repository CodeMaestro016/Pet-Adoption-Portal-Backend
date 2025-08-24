import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  type: { type: String, enum: ['Dog', 'Cat', 'Other'], required: true },
  description: { type: String, required: true },
  image: { type: String }, // URL or path to image (to be handled with Multer/Cloudinary later)
  available: { type: Boolean, default: true },
  shelterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);
export default Pet;