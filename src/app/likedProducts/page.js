'use client';

import { useSelector } from 'react-redux';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from '@/components/menu/MenuItem';

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
      {likedProducts?.length > 0 &&
        likedProducts.map((product, index) => <MenuItem product={product} />)}
    </section>
  );
};
export default LikedProductsPage;
