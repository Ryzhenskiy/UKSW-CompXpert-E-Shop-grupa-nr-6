import mongoose from 'mongoose';
import { Review } from '../../models/Review';

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();

  if (data.reviewText === '') {
    throw new Error('Review text can not be empty');
  }

  const reviewDoc = await Review.create(data);

  return Response.json(reviewDoc);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  return Response.json(await Review.find());
}
