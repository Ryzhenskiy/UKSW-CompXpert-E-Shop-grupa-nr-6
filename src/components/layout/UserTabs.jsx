'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
const UserTabs = ({ isAdmin }) => {
  const path = usePathname();

  return (
    <div className="flex gap-2 tabs justify-center">
      <Link className={path === '/profile' ? 'active' : ''} href={'/profile'}>
        Profil
      </Link>
      {isAdmin && (
        <>
          <Link
            href={'/categories'}
            className={path === '/categories' ? 'active' : ''}
          >
            Kategorie
          </Link>
          <Link
            href={'/adminProducts'}
            className={path === '/adminProducts' ? 'active' : ''}
          >
            Produkty
          </Link>
          <Link
            href={'/users'}
            className={path.includes('/users') ? 'active' : ''}
          >
            Użytkownicy
          </Link>
        </>
      )}
      <Link href={'/orders'} className={path === '/orders' ? 'active' : ''}>
        Zamówienia
      </Link>
    </div>
  );
};
export default UserTabs;
