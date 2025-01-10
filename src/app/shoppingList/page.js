'use client';

import { useSelector } from 'react-redux';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from '@/components/menu/MenuItem';

const ShoppingListPage = () => {
  const shoppingListProducts = useSelector((state) => state.liked.shoppingListProducts);
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders header={'Lista zakupowa'} />
      </div>
      {shoppingListProducts?.length === 0 && (
        <div>Brak produktów na liście zakupowej.</div>
      )}
      {shoppingListProducts?.length > 0 &&
        shoppingListProducts.map((product, index) => <MenuItem product={product} />)}
    </section>
  );
};
export default ShoppingListPage;
