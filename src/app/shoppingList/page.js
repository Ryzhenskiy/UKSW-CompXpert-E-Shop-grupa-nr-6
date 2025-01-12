'use client';

import { useSelector } from 'react-redux';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItemShoppingList from '@/components/menu/MenuItemShoppingList';
import { removeFromShoppingList } from '../../../redux/slices/shoppingListSlice';

const ShoppingListPage = () => {
  //const likedProducts = useSelector((state) => state.liked.likedProducts);
  const shoppingListProducts = useSelector((state) => state.shopping_list.shoppingListProducts);
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders header={'Lista zakupowa'} />
      </div>
      {shoppingListProducts?.length === 0 && (
        <div>Brak produktów na liście zakupowej.</div>
      )}
      {shoppingListProducts?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {shoppingListProducts.map((product, index) => (
            <MenuItemShoppingList 
              key = {index}
              product = {product}
              onRemove = {removeFromShoppingList}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default ShoppingListPage;

