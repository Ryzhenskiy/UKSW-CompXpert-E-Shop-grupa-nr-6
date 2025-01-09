'use client';

import Filters from '@/components/layout/Filters';
import MenuItem from '@/components/menu/MenuItem';
import { useSearchParams } from 'next/navigation.js';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const search = useSearchParams();
  const searchQuery = search?.get('q');
  const encodedSearchQuery = encodeURI(searchQuery || '');

  useEffect(() => {
    fetch('/api/adminProducts').then((res) =>
      res.json().then((data) => setProducts(data))
    );
  }, []);

  // const handleFilterByPart = (part) => {
  //   if (selectedFilters.includes(part)) {
  //     let filters = selectedFilters.filter((el) => el !== part);
  //     setSelectedFilters(filters);
  //   } else {
  //     setSelectedFilters([...selectedFilters, part]);
  //   }
  // };

  // useEffect(() => {
  //   filterItems();
  // }, [selectedFilters]);

  // function filterItems() {
  //   if (selectedFilters.length > 0) {
  //     let tempItems = selectedFilters.map((selectedPart) => {
  //       let temp = data.filter((item) => item.category === selectedPart);
  //       return temp;
  //     });
  //     setProducts(tempItems.flat());
  //   } else {
  //     setProducts(data);
  //   }
  // }

  return (
    <section className="mt-5 flex justify-center">
      <div className="flex w-[95%]">
        <div className="flex-col p-2 w-[90%]">
          <h1>
            <b>{encodedSearchQuery.toUpperCase()}</b> (
            {
              products.filter((item) =>
                item.name
                  .toLowerCase()
                  .includes(encodedSearchQuery.toLowerCase())
              ).length
            }{' '}
            wyniki)
          </h1>

          <div className="grid grid-cols-1 gap-10 p-2 sm:grid-cols-5">
            {products.length > 0 ? (
              products
                .filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(encodedSearchQuery.toLowerCase())
                )
                .map((item) => <MenuItem product={item} />)
            ) : (
              <h1>Nie znaleziono przedmiotu.</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductsPage;