'use client';
import Filters from '@/components/layout/Filters';
import MenuItem from '@/components/menu/MenuItem';
import { useSearchParams } from 'next/navigation.js';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const search = useSearchParams();
  const searchQuery = search?.get('q');
  const encodedSearchQuery = encodeURI(searchQuery || '');

  const normalizeString = (str) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '')
      .toLowerCase();
  };

  useEffect(() => {
    fetch('/api/adminProducts').then((res) =>
      res.json().then((data) => {
        const filteredProducts = data.filter((item) =>
          normalizeString(item.name).includes(normalizeString(searchQuery))
        );
        setProducts(filteredProducts);
      })
    );
  }, [normalizeString(searchQuery)]);

  return (
    <section className="mt-5 flex justify-center">
      <div className="flex justify-center">
        <div className="flex-col max-w-[95%]">
          <h1>
            <b>{encodedSearchQuery.toUpperCase()}</b> ({products.length} wyniki)
          </h1>

          <div className=" grid grid-cols-1 gap-10 p-2 sm:grid-cols-5">
            {products.map((item) => (
              <MenuItem key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductsPage;
