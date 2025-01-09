'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useCurrentSession } from '@/app/hooks/useCurrentSession';
import { useState } from 'react';
import SearchBar from './SearchBar';
import Person from '@/components/icons/Person';
import Heart from '@/components/icons/Heart';
import Cart from '../icons/Cart';
import { useSelector } from 'react-redux';

export const Header = () => {
  // const session = useCurrentSession();
  // const status = session?.status;
  // const userData = session?.session?.user;
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const userName = userData?.name?.split(' ')[0] || userData?.email || '';

  const toggleBurgerMenu = () => setIsBurgerOpen((prev) => !prev);
  const closeBurgerMenu = () => setIsBurgerOpen(false);

  return (
    <header className="flex items-center justify-between border-b-2 p-2">
      <Link
        href={'/'}
        className="text-primary flex items-center gap-2 font-semibold text-2xl"
      >
        <Image
          src={'/compxpert.png'}
          width={100}
          height={100}
          alt={'CompXpert Logo'}
        />
      </Link>

      <SearchBar />
      {/* Desktop Navigation */}
      <nav className="hidden sm:flex items-center text-gray-500 font-semibold">
        <AuthLinks
          status={status}
          userName={userName}
          onClose={closeBurgerMenu}
        />
      </nav>

      {/* Mobile Icon */}
      <button
        onClick={toggleBurgerMenu}
        type="button"
        className="sm:hidden text-gray-500 z-10 w-10"
      >
        |||
      </button>

      {/* Mobile Menu */}
      {isBurgerOpen && (
        <div
          className="w-[50%] fixed inset-y-0 right-0 flex flex-col transition-all items-center justify-center bg-black bg-opacity-80 text-white z-20"
          onClick={closeBurgerMenu}
        >
          <AuthLinks
            status={status}
            userName={userName}
            onClose={closeBurgerMenu}
          />
        </div>
      )}
    </header>
  );
};

const AuthLinks = ({ status, userName, onClose }) => {
  const cartProducts = useSelector((state) => state.cart.cartProducts);
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {status === 'authenticated' ? (
        <>
          <Link
            href={'/profile'}
            onClick={onClose}
            className="flex items-center gap-1"
          >
            <div className="flex flex-col text-right">
              <div className="italic">Cześć,</div>

              <div>{userName}</div>
            </div>

            <Person className="w-8 h-8" />
          </Link>
          <div className="relative">
            <Link href={'/cart'}>
              <Cart className="w-8 h-8" />
            </Link>
            <span className="bg-primary px-2 rounded-lg text-white absolute -top-3 -right-3">
              {cartProducts.length}
            </span>
          </div>
          <Link href={'/likedProducts'}>
            <Heart className="w-8 h-8" />
          </Link>

          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="bg-primary text-white px-8 py-2"
          >
            Wyloguj
          </button>
        </>
      ) : (
        <>
          <Link
            href={'/login'}
            onClick={onClose}
            className="bg-primary text-white px-8 py-2 rounded-lg"
          >
            Zaloguj&nbsp;się
          </Link>
          <Link
            href={'/register'}
            onClick={onClose}
            className="bg-primary text-white px-8 py-2 rounded-lg"
          >
            Zarejestruj&nbsp;się
          </Link>
        </>
      )}
    </div>
  );
};