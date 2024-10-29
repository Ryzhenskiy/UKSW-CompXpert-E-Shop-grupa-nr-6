import Cart from '@/components/icons/Cart';
import Link from 'next/link';

const MenuItem = ({ title, description, price, id }) => {
  return (
    <Link
      href={'/products/' + id}
      className="w-fit h-fit  text-center p-4 rounded-lg hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
    >
      <div className="text-center">
        <img
          src="/carousel-1.jpg"
          alt="image"
          className=" max-h-32 max-w-48 max-w-auto block mx-auto"
        />
      </div>

      <h4 className="font-semibold text-xl my-3">{title}</h4>
      <p className="text-gray-500 text-sm">{description}</p>
      <div className="flex items-center  justify-between mt-4 text-gray-500">
        {price} zł
        <button
          type="button"
          className=" w-10 text-primary hover:text-white border  border-primary p-1 rounded-md  hover:bg-primary hover:cursor-pointer transition-all"
        >
          <Cart className="w-6 h-6" />
        </button>
      </div>
    </Link>
  );
};
export default MenuItem;
