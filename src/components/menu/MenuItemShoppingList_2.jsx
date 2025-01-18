'use client';

import Cart from '@/components/icons/Cart';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import { incrementQty, decrementQty } from '../../../redux/slices/shoppingListSlice_2';
import toast from 'react-hot-toast';
import Edit from '@/components/icons/Edit';
import Trash from '@/components/icons/Trash';

const MenuItemList = ({ product, onRemove }) => {
  const dispatch = useDispatch();
  function handleAddProductToCart() {
    for(let i=0; i<product.qty; i++){
      dispatch(addToCart(product));
    }
    toast.success('Produkt został dodany do koszyka.');
  }

  function handleRemoveProductFromShoppingList(id) {
    dispatch(onRemove(id));
    toast.success('Produkt został usunięty z listy zakupowej.');
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
        
      </Link>
      <div className="flex items-center justify-between mt-4 text-gray-500">
        <button
          className="w-8 h-8  text-gray-600 font-bold flex items-center justify-center border"
          onClick={(ev) => dispatch(decrementQty(product._id))}
        >
          -
        </button>
        <span className="text-lg font-semibold">{product.qty}</span>
        <button
          className="w-8 h-8 text-gray-600 font-bold flex items-center justify-center border"
          onClick={(ev) => dispatch(incrementQty(product._id))}
        >
          +
        </button>
      </div>
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
            handleRemoveProductFromShoppingList(product._id);
          }}
          className="w-10 text-primary hover:text-white border border-primary p-1 rounded-md hover:bg-primary hover:cursor-pointer transition-all"
        >
          Usuń
        </button>
      </div>
    </div>
  );
};
export default MenuItemList;

//<Edit className="w-6 h-6" />

//        <p className="text-gray-500 text-sm line-clamp-3 h-[60px]">
//          {product.description}
//        </p>
