import mongoose from 'mongoose';

const InvoicesSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
    },
    plan: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    datecreate: {
      type: Date,
    },
    datevcto: {
      type: Date,
    },
    datepay: {
      type: Date,
    },
    pay: {
      type: Boolean,
      default: false,
    },
    subscription_id: {
      type: Number,
    },
    month: {
      type: Number,
    },
    acquirer_id: {
      type: String,
    },
    authorization_code: {
      type: String,
    },
    tid: {
      type: String,
    },
    antifraud_score: {
      type: String,
    },
    ip: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Invoices', InvoicesSchema);
