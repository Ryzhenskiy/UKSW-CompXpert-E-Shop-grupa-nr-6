'use client';

import { useEffect, useState } from 'react';

import { useProfile } from '@/app/hooks/UseProfile';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../redux/slices/cartSlice';
import CartProduct from '@/components/layout/CartProduct';

import toast from 'react-hot-toast';
import AddressInputs from '@/components/layout/AddressInputs';

import SectionHeaders from '@/components/layout/SectionHeaders';
const CartPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const [address, setAddress] = useState({});

  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed :(');
      }
    }
  }, []);

  useEffect(() => {
    console.log(profileData);
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  function handleAddressChange(propName, value) {
    setAddress((prev) => ({ ...prev, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    const promise = new Promise((resolve, reject) => {
      ev.preventDefault();
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          //redirect to stripe
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    toast.promise(promise, {
      loading: 'Przygotowujemy twoje zamówienie...',
      success: 'Przekierowanie do płatności',
      error: 'Pojawił się błąd! Spróbuj później!',
    });
  }

  let subtotal = cartProducts.reduce((acc, p) => p.basePrice * p.qty + acc, 0);

  return (
    <section className="mt-8 max-w-[80%] mx-auto">
      <div className="text-center">
        <SectionHeaders header={'Kozyk zakupowy'} />
      </div>

      {cartProducts?.length === 0 ? (
        <div className="text-center mt-8">
          <p>Niema produktów w koszyku {':('}</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            {cartProducts.map((product, index) => (
              <CartProduct
                key={product._id}
                product={product}
                onRemove={removeFromCart}
              />
            ))}

            <div className="py-2 justify-end items-center pr-16 flex">
              <div className="text-gray-500">
                Suma częściowa: <br />
                Dostawa: <br />
                Suma całkowita:
              </div>

              <div className="text-lg font-semibold pl-2 text-right">
                ${subtotal} <br />
                $5 <br />${subtotal + 5}
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg h-fit">
          <h2>Dane zamówienia</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Zapłać: {subtotal + 5} zł </button>
          </form>
        </div>
      </div>
      )}
    </section>
  );
};
export default CartPage;
