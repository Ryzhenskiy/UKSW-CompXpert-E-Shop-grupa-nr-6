const MenuItem = () => {
  return (
    <div className="text-center bg-gray-200 p-4 rounded-lg hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img
          src="/hero-image.png"
          alt="image"
          className="max-h-24 max-w-auto block mx-auto"
        />
      </div>

      <h4 className="font-semibold text-xl my-3">Monitor MSI</h4>
      <p className="text-gray-500 text-sm">Monitor MSI G27213 27" 1440p</p>
      <button className="bg-primary text-white rounded-full py-2 mt-4 w-[75%] mx-auto">
        Add to cart $12
      </button>
    </div>
  );
};
export default MenuItem;
