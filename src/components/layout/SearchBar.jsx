import Search from '@/components/icons/Search';

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 p-2">
      <Search />
      <input
        type="text"
        placeholder="Search computer parts..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
export default SearchBar;
