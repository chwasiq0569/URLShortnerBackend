import mongoose from 'mongoose';

const shortSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("ShortUrl", shortSchema);