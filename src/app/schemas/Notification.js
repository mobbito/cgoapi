import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    provider: {
      type: Number,
      required: true,
    },
    video: {
      type: Number,
      // required: true,
    },
    photo: {
      type: Number,
      // required: true,
    },
    date: {
      type: Date,
      // required: true,
    },
    channel_name: {
      type: String,
    },
    channel_avatar: {
      type: String,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Notification', NotificationSchema);
