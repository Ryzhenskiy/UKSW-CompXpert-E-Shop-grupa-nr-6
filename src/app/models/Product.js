import mongoose from 'mongoose';
import { model, models, Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number },
    category: { type: mongoose.Types.ObjectId },
  },
  { timestamps: true }
);

export const Product = models?.Product || model('Product', ProductSchema);
