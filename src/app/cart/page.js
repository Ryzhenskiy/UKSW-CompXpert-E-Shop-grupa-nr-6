'use client';

import { useEffect, useState } from 'react';

import { Trash } from '@/components/icons/Trash';
import { useProfile } from '@/app/hooks/UseProfile';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from '../../../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import AddressInputs from '@/components/layout/AddressInputs';
import Image from 'next/image';
import SectionHeaders from '@/components/layout/SectionHeaders';
const CartPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const [address, setAddress] = useState({});

  const { data: profileData } = useProfile();

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

  function handleDeleteButtonClick(id) {
    dispatch(removeFromCart(id));
    toast.success('Produkt został usunięty z koszyka.');
  }

  async function proceedToCheckout(ev) {
    //address and shopping cart products
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address,
        cartProducts,
      }),
    });
    const link = await response.json();
    //redirect to stripe
    window.location = link;
  }

  let subtotal = cartProducts.reduce((acc, p) => p.basePrice * p.qty + acc, 0);

  return (
    <section className="mt-8 max-w-[80%] mx-auto">
      <div className="text-center">
        <SectionHeaders header={'Cart'} />
      </div>

      <div className=" mt-8 grid grid-cols-2 gap-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart {':('}</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div className="flex gap-4 items-center mb-2 border-b py-2">
                {' '}
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={''}
                    width={240}
                    height={240}
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <div className="flex gap-2 items-center justify-center">
                    <div className="flex items-center space-x-4 border rounded-xl">
                      <button
                        className="w-8 h-8  text-gray-600 font-bold flex items-center justify-center border"
                        onClick={(ev) => dispatch(decrementQty(product._id))}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {product.qty}
                      </span>
                      <button
                        className="w-8 h-8 text-gray-600 font-bold flex items-center justify-center border"
                        onClick={(ev) => dispatch(incrementQty(product._id))}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-lg font-semibold">
                      $ {product.basePrice}
                    </div>

                    <div className="ml-2">
                      <button
                        type="button"
                        onClick={(ev) => handleDeleteButtonClick(product._id)}
                        className="p-2"
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="py-2 justify-end items-center pr-16 flex">
            <div className="text-gray-500">
              Subtotal: <br />
              Delievery: <br />
              Total:
            </div>

            <div className="text-lg font-semibold pl-2 text-right">
              ${subtotal} <br />
              $5 <br />${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg h-fit">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressChange}
            />
            <button type="submit">Pay: ${subtotal + 5} </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default CartPage;
