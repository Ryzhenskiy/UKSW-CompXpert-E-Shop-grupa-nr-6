import { Trash } from '@/components/icons/Trash';
import Image from 'next/image';
import { incrementQty, decrementQty } from '../../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const CartProduct = ({ product, onRemove }) => {
  const dispatch = useDispatch();

  function handleDeleteButtonClick(id) {
    dispatch(onRemove(id));
    toast.success('Produkt został usunięty z koszyka.');
  }
  return (
    <div className="flex gap-4 items-center mb-2 border-b py-2">
      {' '}
      <div className="w-24">
        <Image src={product.image} alt={''} width={240} height={240} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{product.name}</h1>
        <div className="flex gap-2 items-center justify-center">
          <div className="flex items-center space-x-4 border rounded-xl">
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
          <div className="text-lg font-semibold">{product.basePrice}{'\u00A0'}zł</div>

          {!!onRemove && (
            <div className="ml-2">
              <button
                type="button"
                onClick={(ev) => handleDeleteButtonClick(product._id)}
                className="p-2"
              >
                <Trash />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartProduct;
