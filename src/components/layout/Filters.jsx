const Filters = () => {
  const partTypes = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage'];
  const brands = ['Intel', 'AMD', 'NVIDIA', 'Corsair', 'Samsung'];
  return (
    <div className="w-64 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4 uppercase underline">
        Filters
      </h3>
      {/* Part Type Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Part Type</h4>
        {partTypes.map((part) => (
          <label key={part} className="block mb-2">
            <input type="checkbox" value={part} className="mr-2" />
            {part}
          </label>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Brand</h4>
        {brands.map((brand) => (
          <label key={brand} className="block mb-2">
            <input type="checkbox" value={brand} className="mr-2" />
            {brand}
          </label>
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Price Range</h4>
        <input type="range" min="50" max="5000" className="w-full" />
        <span className="block mt-2 text-sm"></span>
      </div>
    </div>
  );
};
export default Filters;
