'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Rating from '@/components/layout/Rating';
import ReviewCard from '@/components/layout/ReviewCard';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SectionHeaders from '@/components/layout/SectionHeaders';

const MenuItemPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const session = useSession();
  const { status } = session;

  useEffect(() => {
    fetch('/api/adminProducts').then((res) =>
      res.json().then((data) => {
        const foundProduct = data.find((p) => p._id === id);
        setProduct(foundProduct);
      })
    );
    fetchReviews();
  }, []);

  function fetchReviews() {
    fetch('/api/review').then((res) =>
      res.json().then((data) => {
        const foundReviews = data.filter((r) => r.productId === id);
        setReviews(foundReviews);
      })
    );
  }

  return (
    <div className="flex flex-col mx-auto max-w-3xl md:w-1/2">
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 md:items-start gap-36">
        <div className="max-w-lg md:w-1/2">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
          <p>Opis</p>
          <div className="max-w-lg md:w-1/2">
            <p className="text-gray-600 mb-4">{product?.description}</p>
            <p className="text-2xl font-semibold text-blue-600 mb-6">
              {product?.basePrice} zł
            </p>
            <button className="primary">Dodaj do koszyka</button>
          </div>
        </div>
      </div>
      {status === 'unauthenticated' ? (
        <div className="text-center text-gray-500 mt-4 border-t pt-4">
          Jeśli chcesz zostawić opinię,{' '}
          <Link href={'/login'} className="underline">
            Zaloguj się tutaj &raquo;
          </Link>
        </div>
      ) : (
        <Rating productId={id} />
      )}
      <SectionHeaders
        header={'Recenzje' + ' (' + reviews?.length + ')'}
        className="mt-2"
      />
      {reviews?.length > 0 && reviews.map((r) => <ReviewCard review={r} />)}
    </div>
  );
};
export default MenuItemPage;
