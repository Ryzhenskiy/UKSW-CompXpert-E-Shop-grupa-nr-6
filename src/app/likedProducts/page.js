'use client';

import { useSelector } from 'react-redux';
import SectionHeaders from '@/components/layout/SectionHeaders';
import MenuItem from '@/components/menu/MenuItem';

const LikedProductsPage = () => {
  const likedProducts = useSelector((state) => state.liked.likedProducts);
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders header={'Favourites'} />
      </div>
      {likedProducts?.length === 0 && (
        <div>No products in favourites list {':('}</div>
      )}
      {likedProducts?.length > 0 &&
        likedProducts.map((product, index) => <MenuItem product={product} />)}
    </section>
  );
};
export default LikedProductsPage;
