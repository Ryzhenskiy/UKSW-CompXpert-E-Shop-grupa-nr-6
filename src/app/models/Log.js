import { model, models, Schema } from 'mongoose';

const LogSchema = new Schema({
  email: { type: String },
  action: { type: String },
  provider: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export const Log = models?.Log || model('Log', LogSchema);
