import mongoose from 'mongoose';
import { User } from '@/app/models/User';
import { Log } from '@/app/models/Log';
import bcrypt from 'bcrypt';

export async function POST(req) {
  let { email, password, action } = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = password;
  if (!pass?.length || pass.lenght < 5) {
    new Error('Password must be at least 5 characters');
  }
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create({ email, password });
  const log = await Log.create({
    email,
    action,
    provider: 'Credentials',
    timestamp: Date.now(),
  });
  return Response.json(createdUser, log);
}
