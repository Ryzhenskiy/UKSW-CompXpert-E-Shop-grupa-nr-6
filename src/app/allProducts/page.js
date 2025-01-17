'use client';

import MenuItem from '@/components/menu/MenuItem';
import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({ ...prevRange, [name]: Number(value) }));
  };

  const toggleCategory = (category) => {
    setSelectedCategory((prev) => (prev === category ? '' : category));
  };

  useEffect(() => {
    fetch('/api/adminProducts')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    fetch('/api/categories').then((res) =>
      res.json().then((data) => {
        setCategories(data);
      })
    );
  }, []);

  useEffect(() => {
    // Filtrowanie produktów
    const filteredProductsNew = products.filter((product) => {
      const withinPriceRange =
        product.basePrice >= priceRange.min &&
        product.basePrice <= priceRange.max;

      console.log(selectedCategory);
      const matchesCategory =
        selectedCategory === '' || product.category === selectedCategory._id;

      console.log(withinPriceRange || matchesCategory);
      return matchesCategory && withinPriceRange;
    });
    setFilteredProducts(filteredProductsNew);
  }, [selectedCategory.name, priceRange]);

  return (
    <section className="mt-5 flex justify-center">
      <div className="p-4 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Filtruj produkty
        </h2>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-600 mb-2">
            Kategorie:
          </p>
          <ul className="flex flex-col gap-2">
            <li>
              <button
                className={`px-4 py-2 rounded-md shadow-sm text-sm ${
                  selectedCategory === ''
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => toggleCategory('')}
              >
                Wszyscy
              </button>
            </li>
            {categories.map((category) => (
              <li key={category._id}>
                <button
                  className={`px-4 py-2 rounded-md shadow-sm text-sm ${
                    selectedCategory === category._id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-gray-700">Cena</span>
          <div className="flex gap-4">
            <label className="block text-sm font-medium text-gray-600">
              Od:
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
              />
            </label>

            <label className="block text-sm font-medium text-gray-600">
              Do:
              <input
                type="number"
                name="max"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={priceRange.max}
                onChange={handlePriceChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex-col p-2 w-[90%]">
          <h1>
            <b>
              {!selectedCategory
                ? 'Wszystkie Produkty'
                : `${selectedCategory.name.toUpperCase()}`}
            </b>{' '}
            ({!selectedCategory ? products.length : filteredProducts.length}{' '}
            wyniki)
          </h1>

          <div className=" mt-5 grid grid-cols-1 gap-5 p-2 sm:grid-cols-4">
            {!selectedCategory
              ? products.map((item) => (
                  <MenuItem key={item.id} product={item} />
                ))
              : filteredProducts.map((item) => (
                  <MenuItem key={item.id} product={item} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
