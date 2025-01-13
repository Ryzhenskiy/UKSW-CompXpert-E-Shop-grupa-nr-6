'use client';

import MenuItem from '@/components/menu/MenuItem';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/adminProducts')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="mt-5 flex justify-center">
      <div className="flex w-[95%]">
        <div className="flex-col p-2 w-[90%]">
          <h1>
            <b>Wszystkie Produkty</b> ({products.length} wyniki)
          </h1>

          <div className="grid grid-cols-1 gap-10 p-2 sm:grid-cols-5">
            {products.length > 0 ? (
              products.map((item) => (
                <MenuItem key={item.id} product={item} />
              ))
            ) : (
              <h1>Nie znaleziono produktów.</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;