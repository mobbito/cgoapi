import mongoose from 'mongoose';

const SpecialitiesSchema = new mongoose.Schema(
  {
    clinic_id: {
      type: Number,
      required: true,
    },
    photo_id: {
      type: Number,
      required: true,
    },
    photo_url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Specialities', SpecialitiesSchema);
