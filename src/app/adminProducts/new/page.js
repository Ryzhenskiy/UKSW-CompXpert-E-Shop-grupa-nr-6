'use client';

import Link from 'next/link';
import ProductForm from '@/components/layout/ProductForm';
import Left from '@/components/icons/Left';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import withAuth from '../../hoc/withAuth';

const AdminProductNewPage = () => {
  const [redirectToProducts, setRedirectToProducts] = useState(false);

  async function handleFormSubmit(ev, product) {
    ev.preventDefault();
    fetch('/api/adminProducts', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' },
    });

    setRedirectToProducts(true);
  }

  if (redirectToProducts) {
    redirect('/adminProducts');
  }
  return (
    <section className="mt-8 max-w-md mx-auto">
      <div className="mt-4">
        <Link className="button" href={'/adminProducts'}>
          Pokaż wszystkie produkty
          <Left />
        </Link>
      </div>
      <ProductForm product={null} onSubmit={handleFormSubmit} />
    </section>
  );
};
export default withAuth(AdminProductNewPage);
