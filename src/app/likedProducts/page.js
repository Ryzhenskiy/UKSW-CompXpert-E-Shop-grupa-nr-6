'use client';

import { useSelector } from 'react-redux';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItemList from '@/components/menu/MenuItemList';
import { removeFromLiked } from '../../../redux/slices/likedProductsSlice';

const LikedProductsPage = () => {
  const likedProducts = useSelector((state) => state.liked.likedProducts);
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders header={'Ulubione'} />
      </div>
      {likedProducts?.length === 0 && (
        <div>Brak produktów na liście ulubionych.</div>
      )}
      {likedProducts?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {likedProducts.map((product, index) => (
            <MenuItemList 
              key = {index}
              product = {product}
              onRemove = {removeFromLiked}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default LikedProductsPage;
