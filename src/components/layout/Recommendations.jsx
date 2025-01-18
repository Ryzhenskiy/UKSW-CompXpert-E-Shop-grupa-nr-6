'use client';

import MenuItem from '@/components/menu/MenuItem';
import { useEffect, useState } from 'react';

const Recommendations = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/adminProducts')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const productsToShow = products.slice(0, 5);

  return (
    <section className="mt-5 flex justify-center">
      <div className="flex w-[95%]">
        <div className="flex-col p-2 w-[90%]">
          <div className="grid grid-cols-1 p-2 sm:grid-cols-6">
            {productsToShow.length > 0 ? (
              productsToShow.map((item) => (
                <MenuItem key={item.id} product={item} />
              ))
            ) : (
              <h1>Polecane produkty pojawią się już wkrótce...</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
