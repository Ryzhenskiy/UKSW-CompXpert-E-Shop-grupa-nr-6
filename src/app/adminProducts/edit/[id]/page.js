'use client';
import UserTabs from '../../../../components/layout/UserTabs';
import ProductForm from '@/components/layout/ProductForm';
import Left from '@/components/icons/Left';
import Right from '@/components/icons/Right';
import Link from 'next/link';
import toast from 'react-hot-toast';
import DeleteButton from '@/components/layout/DeleteButton';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProfile } from '@/app/hooks/UseProfile';
import withAuth from '../../../../hoc/withAuth';

const AdminProductEditPage = () => {
  const { id } = useParams();
  const { data, loading } = useProfile();
  const [product, setProduct] = useState(null);
  const [redirectToProducts, setRedirectToProducts] = useState(false);

  useEffect(() => {
    fetch('/api/adminProducts').then((res) =>
      res.json().then((products) => {
        const item = products.find((product) => product._id == id);
        setProduct(item);
      })
    );
  }, []);

  async function handleFormSubmit(ev, product) {
    ev.preventDefault();
    product = { ...product, _id: id };
    fetch('/api/adminProducts', {
      method: 'PUT',
      body: JSON.stringify(product),
      headers: { 'Content-Type': 'application/json' },
    });

    setRedirectToProducts(true);
  }

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/adminProducts?_id=' + id, {
        method: 'DELETE',
      });

      if (response.ok) resolve();
      else reject();
    });

    toast.promise(promise, {
      loading: 'Usuwanie produktu...',
      success: 'Produkt został usunięty',
      error: 'Wystąpił błąd przy usuwaniu produktu',
    });

    setRedirectToProducts(true);
  }

  if (redirectToProducts) {
    redirect('/adminProducts');
  }

  if (loading) {
    return 'Ładowanie informacji...';
  }

  if (!data.admin) {
    return 'Odmowa dostępu!';
  }
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-4">
        <Link className="button" href={'/adminProducts'}>
          <span>Pokaż wszystkie produkty</span>

          <Left />
        </Link>
      </div>

      <ProductForm onSubmit={handleFormSubmit} product={product} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton label={'Usuń'} onDelete={handleDeleteClick} />
        </div>
      </div>
    </section>
  );
};
export default withAuth(AdminProductEditPage);
