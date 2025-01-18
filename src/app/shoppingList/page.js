'use client';

import { useSelector } from 'react-redux';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItemShoppingList from '@/components/menu/MenuItemShoppingList';
import MenuItemShoppingList_2 from '@/components/menu/MenuItemShoppingList_2';
import MenuItemShoppingList_3 from '@/components/menu/MenuItemShoppingList_3';
import MenuItemShoppingList_4 from '@/components/menu/MenuItemShoppingList_4';
import MenuItemShoppingList_5 from '@/components/menu/MenuItemShoppingList_5';
//import {MenuItemShoppingList as MenuItemShoppingList_2} from '@/components/menu/MenuItemShoppingList';
import { removeFromShoppingList as removeFromShoppingList_1 } from '../../../redux/slices/shoppingListSlice';
import { removeFromShoppingList as removeFromShoppingList_2 } from '../../../redux/slices/shoppingListSlice_2';
import { removeFromShoppingList as removeFromShoppingList_3 } from '../../../redux/slices/shoppingListSlice_3';
import { removeFromShoppingList as removeFromShoppingList_4 } from '../../../redux/slices/shoppingListSlice_4';
import { removeFromShoppingList as removeFromShoppingList_5 } from '../../../redux/slices/shoppingListSlice_5';

const ShoppingListPage = () => {
  const shoppingListProducts = useSelector((state) => state.shopping_list.shoppingListProducts);
  const shoppingListProducts_2 = useSelector((state) => state.shopping_list_2.shoppingListProducts);
  const shoppingListProducts_3 = useSelector((state) => state.shopping_list_3.shoppingListProducts);
  const shoppingListProducts_4 = useSelector((state) => state.shopping_list_4.shoppingListProducts);
  const shoppingListProducts_5 = useSelector((state) => state.shopping_list_5.shoppingListProducts);
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders header={'Lista zakupowa nr 1'} />
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
              onRemove = {removeFromShoppingList_1}
            />
          ))}
        </div>
      )}
      <div className="text-center">
        <SectionHeaders header={'Lista zakupowa nr 2'} />
      </div>
      {shoppingListProducts_2?.length === 0 && (
        <div>Brak produktów na liście zakupowej.</div>
      )}
      {shoppingListProducts_2?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {shoppingListProducts_2.map((product, index) => (
            <MenuItemShoppingList_2
              key = {index}
              product = {product}
              onRemove = {removeFromShoppingList_2}
            />
          ))}
        </div>
      )}
      <div className="text-center">
        <SectionHeaders header={'Lista zakupowa nr 3'} />
      </div>
      {shoppingListProducts_3?.length === 0 && (
        <div>Brak produktów na liście zakupowej.</div>
      )}
      {shoppingListProducts_3?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {shoppingListProducts_3.map((product, index) => (
            <MenuItemShoppingList_3
              key = {index}
              product = {product}
              onRemove = {removeFromShoppingList_3}
            />
          ))}
        </div>
      )}
      <div className="text-center">
        <SectionHeaders header={'Lista zakupowa nr 4'} />
      </div>
      {shoppingListProducts_4?.length === 0 && (
        <div>Brak produktów na liście zakupowej.</div>
      )}
      {shoppingListProducts_4?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {shoppingListProducts_4.map((product, index) => (
            <MenuItemShoppingList_4
              key = {index}
              product = {product}
              onRemove = {removeFromShoppingList_4}
            />
          ))}
        </div>
      )}
      <div className="text-center">
        <SectionHeaders header={'Lista zakupowa nr 5'} />
      </div>
      {shoppingListProducts_5?.length === 0 && (
        <div>Brak produktów na liście zakupowej.</div>
      )}
      {shoppingListProducts_5?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {shoppingListProducts_5.map((product, index) => (
            <MenuItemShoppingList_5
              key = {index}
              product = {product}
              onRemove = {removeFromShoppingList_5}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default ShoppingListPage;