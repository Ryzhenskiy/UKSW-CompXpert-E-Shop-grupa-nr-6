'use client';

import Filters from '@/components/layout/Filters';
import MenuItem from '@/components/menu/MenuItem';
import { useSearchParams } from 'next/navigation.js';
import { data } from './data.js';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [filteredItems, setFilteredItems] = useState(data);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const search = useSearchParams();
  const searchQuery = search?.get('q');
  const encodedSearchQuery = encodeURI(searchQuery || '');
  console.log(encodedSearchQuery);

  const handleFilterByPart = (part) => {
    if (selectedFilters.includes(part)) {
      let filters = selectedFilters.filter((el) => el !== part);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, part]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  function filterItems() {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedPart) => {
        let temp = data.filter((item) => item.category === selectedPart);
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems(data);
    }
  }

  return (
    <section className="mt-5">
      <div className="flex w-full">
        <Filters handleFilterByPart={handleFilterByPart} />
        <div className="flex-col w-[80%]">
          <h1>
            {encodedSearchQuery} (
            {
              filteredItems.filter((item) =>
                item.title
                  .toLowerCase()
                  .includes(encodedSearchQuery.toLowerCase())
              ).length
            }{' '}
            wyniki)
          </h1>
          <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-5">
            {filteredItems.length > 0 ? (
              filteredItems
                .filter((item) =>
                  item.title
                    .toLowerCase()
                    .includes(encodedSearchQuery.toLowerCase())
                )
                .map((item) => (
                  <MenuItem
                    onClick={() => console.log('clicked')}
                    title={item.title}
                    description={item.desc}
                    price={item.price}
                  />
                ))
            ) : (
              <h1>Items no found</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductsPage;
