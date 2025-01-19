import React, { useState } from 'react';

const ProductFilter = ({ products }) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Wyciągnięcie unikalnych producentów
  const manufacturers = Array.from(
    new Set(products.map((product) => product.manufacturer))
  );

  // Filtrowanie produktów
  const filteredProducts = products.filter((product) => {
    const withinPriceRange =
      product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesManufacturer =
      selectedManufacturer === '' ||
      product.manufacturer === selectedManufacturer;
    return withinPriceRange && matchesManufacturer;
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({ ...prevRange, [name]: Number(value) }));
  };

  const toggleManufacturer = (manufacturer) => {
    setSelectedManufacturer((prev) =>
      prev === manufacturer ? '' : manufacturer
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Filtruj produkty</h2>

      <div className="mb-4">
        <p className="block text-sm font-medium text-gray-700 mb-2">
          Producent:
        </p>
        <ul className="flex flex-wrap gap-2">
          <li>
            <button
              className={`px-4 py-2 rounded-md shadow-sm text-sm ${
                selectedManufacturer === ''
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => toggleManufacturer('')}
            >
              Wszystkie produkty
            </button>
          </li>
          {manufacturers.map((manufacturer) => (
            <li key={manufacturer}>
              <button
                className={`px-4 py-2 rounded-md shadow-sm text-sm ${
                  selectedManufacturer === manufacturer
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => toggleManufacturer(manufacturer)}
              >
                {manufacturer}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Cena minimalna:
          <input
            type="number"
            name="min"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={priceRange.min}
            onChange={handlePriceChange}
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Cena maksymalna:
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
  );
};

export default ProductFilter;
