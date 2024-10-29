'use client';

import Image from 'next/image';
import Right from '../icons/Right';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className=" flex justify-center p-10 lg:w-[100%] lg:flex lg:items-center lg:justify-between">
      <div className="gap-6">
        <h1 className=" text-6xl text-primary font-bold md:text-8xl">
          CompXpert
        </h1>

        <p className="text-gray-500 text-3xl mt-5 font-semibold italic ">
          Wszystko staje się lepsze z komputerami
        </p>

        <Link
          href={'/'}
          className=" w-[50%] justify-center md:w-[40%] bg-primary uppercase text-white px-4 py-2 rounded-full flex items-center gap-2 mt-5 font-semibold"
        >
          Zamów teraz
          <Right />
        </Link>
      </div>

      <Image
        src={'/hero-image.png'}
        width={550}
        height={550}
        alt={'pizza'}
        className="hidden lg:block"
      />
    </section>
  );
};
export default Hero;
