'use client';

import { useSelector } from 'react-redux';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItemList from '@/components/menu/MenuItemLiked';
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
        <div className="place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {likedProducts.map((product, index) => (
            <MenuItemList
              key={index}
              product={product}
              onRemove={removeFromLiked}
            />
          ))}
        </div>
      )}
    </section>
  );
};
export default LikedProductsPage;
