import Cart from '@/components/icons/Cart';
import Link from 'next/link';

const Actuality = ({ title, description, price, id }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center p-4 rounded-lg bg-white shadow-md shadow-black/25 transition-all">
        <img
          src="/carousel-1.jpg"
          alt="image"
          className=" max-h-48 max-w-56 max-w-auto block mx-auto"
        />
      </div>
      <div className="text-center">
        <h4 className="font-semibold text-xl my-3">{title}</h4>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};
export default Actuality;
