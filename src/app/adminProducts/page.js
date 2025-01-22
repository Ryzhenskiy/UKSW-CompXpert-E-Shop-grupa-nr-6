'use client';
import UserTabs from '@/components/layout/UserTabs';
import Link from 'next/link';
import Image from 'next/image';
import Right from '@/components/icons/Right';
import { useEffect, useState } from 'react';
import withAuth from '../../hoc/withAuth';
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('/api/adminProducts').then((res) =>
      res.json().then((products) => {
        setProducts(products);
      })
    );
  }, []);

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-4">
        <Link className="button" href={'/adminProducts/new'}>
          Utworz nowy produkt
          <Right />
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {products.map((product) => (
          <div
            key={product._id}
            className=" bg-gray-300 p-2 rounded-md text-center"
          >
            <Link href={'/adminProducts/edit/' + product._id}>
              <div className="relarive">
                <Image
                  src={product.image}
                  width={200}
                  height={200}
                  alt={'product-image'}
                  className="rounded-md"
                />
              </div>

              <span>{product.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
export default withAuth(AdminProducts);
