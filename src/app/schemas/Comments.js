import mongoose from 'mongoose';

const CommentsSchema = new mongoose.Schema(
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
    comment: {
      type: String,
      required: true,
    },
    reply: {
      type: Boolean,
      required: true,
      default: true,
    },
    reply_id: {
      type: Number,
      // required: true,
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

export default mongoose.model('Comments', CommentsSchema);
