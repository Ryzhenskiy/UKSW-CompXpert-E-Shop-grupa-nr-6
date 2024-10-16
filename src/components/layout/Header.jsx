'use client';

import Link from '../../../node_modules/next/link';
import Image from '../../../node_modules/next/image';

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link
          className="text-primary flex items-center gap-2 font-semibold text-2xl"
          href={'/'}
        >
          <Image
            src={'/compxpert.png'}
            width={120}
            height={120}
            // layout={'fill'}
            // objectFit={'contain'}
            alt={'pizza'}
          />
        </Link>

        <Link href={'/'}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        <Link
          href={'/login'}
          className="bg-primary text-white px-8 py-2 rounded-full"
        >
          Login
        </Link>
        <Link
          href={'/login'}
          className="bg-primary text-white px-8 py-2 rounded-full"
        >
          Register
        </Link>
      </nav>
    </header>
  );
};
