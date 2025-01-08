'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
const MenuItemPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/api/adminProducts').then((res) =>
      res.json().then((data) => {
        const foundProduct = data.find((p) => p._id === id);
        setProduct(foundProduct);
      })
    );
  }, []);

  return (
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
  );
};
export default MenuItemPage;
