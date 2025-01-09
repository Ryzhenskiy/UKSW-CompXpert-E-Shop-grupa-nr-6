import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { Order } from '../../models/Order';
import { Product } from '../../models/Product';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];

  for (const cartProduct of cartProducts) {
    const productName = cartProduct.name;
    const productInfo = await Product.findById(cartProduct._id);
    let productPrice = productInfo.basePrice;

    stripeLineItems.push({
      quantity: cartProduct.qty,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100 * cartProduct.qty,
      },
    });
  }

  console.log(stripeLineItems);
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      'orders/' +
      orderDoc._id.toString() +
      '?clear-cart=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delievery fee',
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'USD' },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}
