import mongoose from 'mongoose';

const LikesSchema = new mongoose.Schema(
  {
    user: {
      type: Number,
      required: true,
    },
    video: {
      type: Number,
      required: true,
    },
    channel: {
      type: Number,
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

export default mongoose.model('Likes', LikesSchema);
