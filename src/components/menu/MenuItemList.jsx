'use client';

import Cart from '@/components/icons/Cart';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import { removeFromLiked } from '../../../redux/slices/likedProductsSlice';
import toast from 'react-hot-toast';
import Edit from '@/components/icons/Edit';

const MenuItemList = ({ product }) => {
  const dispatch = useDispatch();
  function handleAddProductToCart() {
    dispatch(addToCart(product));
    toast.success('Produkt został dodany do koszyka.');
  }

  function handleRemoveProductFromFavourites() {
    dispatch(removeFromLiked(product));
    toast.success('Produkt został usunięty z ulubionych.');
  }
  
  return (
    <div className="w-64 h-[410px] text-center p-4 rounded-lg hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all ">
      <Link href={'/products/' + product._id}>
        <div className="text-center h-[200px] flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="mx-auto object-cover "
          />
        </div>

        <h4 className="font-semibold text-xl my-3 h-[50px] line-clamp-1">
          {product.name}
        </h4>
        <p className="text-gray-500 text-sm line-clamp-3 h-[60px]">
          {product.description}
        </p>
      </Link>
      <div className="flex items-center justify-between mt-4 text-gray-500">
        {product.basePrice} zł
        <button
          type="button"
          onClick={(ev) => {
            handleAddProductToCart();
          }}
          className="w-10 text-primary hover:text-white border border-primary p-1 rounded-md hover:bg-primary hover:cursor-pointer transition-all"
        >
          <Cart className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={(ev) => {
            handleRemoveProductFromFavourites();
          }}
          className="w-10 text-primary hover:text-white border border-primary p-1 rounded-md hover:bg-primary hover:cursor-pointer transition-all"
        >
          <Edit className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
export default MenuItemList;