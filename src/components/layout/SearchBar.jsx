'use client';

import Search from '@/components/icons/Search';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const onSearch = (ev) => {
    ev.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/products?q=${encodedSearchQuery}`);
  };

  return (
    <form className="flex items-center w-[50%]" onSubmit={onSearch}>
      <input
        value={searchQuery}
        onChange={(ev) => setSearchQuery(ev.target.value)}
        type="text"
        placeholder="Czego szukasz?"
        className="p-2 border shadow-md border-gray-300 rounded-sm focus:outline-none"
      />
      <div className="text-white bg-primary p-2 rounded-md">
        <Search className="w-7 h-7" />
      </div>
    </form>
  );
};
export default SearchBar;
