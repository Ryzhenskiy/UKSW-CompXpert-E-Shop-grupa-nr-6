import SearchBar from '@/components/layout/SearchBar';
import Filters from '@/components/layout/Filters';
import MenuItem from '@/components/menu/MenuItem';
const ProductsPage = () => {
  return (
    <section className="mt-5">
      <div className="flex w-full">
        <Filters />
        <div className="flex-col w-[80%]">
          <SearchBar />
          <div className="grid grid-cols-3 gap-4 p-2">
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductsPage;
