import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = models?.User || model('User', UserSchema);
