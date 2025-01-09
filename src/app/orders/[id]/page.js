'use client';

import { useEffect, useState } from 'react';
import SectionHeaders from '../../../components/layout/SectionHeaders';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import AddressInputs from '@/components/layout/AddressInputs';
import CartProduct from '@/components/layout/CartProduct';
import { clearCart } from '../../../../redux/slices/cartSlice';
const OrderPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  useEffect(() => {
    if (typeof window.console !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        dispatch(clearCart());
      }
    }

    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id=' + id).then((res) =>
        res.json().then((orderData) => {
          setOrder(orderData);
          console.log(orderData);
          setLoadingOrder(false);
        })
      );
    }
  }, []);

  let subtotal = 0;

  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += product.basePrice;
    }
  }

  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <div className="text-center">
        {' '}
        <SectionHeaders mainHeader="Your order" />
        <div className="my-4">
          <p>Dziękujemy za zamówienie!</p>
          <p>Zadzwonimy, gdy zamówienie będzie w drodze!</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Subtotal:{' '}
              <span className="text-black inline-block w-6 font-bold">
                ${subtotal}
              </span>
              <br />
              Delievery:{' '}
              <span className="text-black inline-block w-6 font-bold">$5</span>
              <br />
              Total:{' '}
              <span className="text-black inline-block w-6 font-bold">
                ${subtotal + 5}
              </span>
              <br />
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default OrderPage;
