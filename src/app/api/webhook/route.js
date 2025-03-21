import { Order } from '@/app/models/Order';
import { sendMail } from '../../../libs/mail';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  const session = await getServerSession(authOptions);

  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
    return Response.json(e, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const orderId = event?.data?.object?.metadata?.orderId;

    const order = await Order.findOne({ _id: orderId });

    sendMail({
      to: event?.data?.object?.customer_email,
      subject: `Zamówienie ${order._id} złożone`,
      body: `Twoje zamówienie zostało złożone. Produkty: ${order.cartProducts
        .map((product) => product.name)
        .join(', ')}`,
    });
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  }
  return Response.json('ok', { status: 200 });
}
