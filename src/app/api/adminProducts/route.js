import mongoose from 'mongoose';
import { Product } from '../../models/Product';

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();

  const productDoc = await Product.create(data);
  return Response.json(productDoc);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  return Response.json(await Product.find());
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, ...data } = await req.json();
  await Product.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  await Product.deleteOne({ _id });

  return Response.json(true);
}
