import { model, models, Schema } from 'mongoose';

const ReviewSchema = new Schema(
  {
    userEmail: { type: String },
    userName: { type: String },
    reviewText: { type: String },
    productId: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

export const Review = models?.Review || model('Review', ReviewSchema);
