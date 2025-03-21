import mongoose from 'mongoose';
import { Category } from '../../models/Category';
export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();
  if (!name) {
    throw new Error('Propery "name" has to be non empty string');
  }
  const categoryDoc = await Category.create({ name });

  return Response.json(categoryDoc);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);

  return Response.json(await Category.find());
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await req.json();

  console.log(_id, name);

  await Category.updateOne({ _id }, { name });

  return Response.json(true);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  await Category.deleteOne({ _id });

  return Response.json(true);
}
