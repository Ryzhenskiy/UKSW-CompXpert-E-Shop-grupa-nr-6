'use client';

import Image from 'next/image';
import Right from '../icons/Right';

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center  text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-35 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Witamy w CompXpert
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Najlepsze miejsce dla najwyższej klasy sprzętu komputerowego i
            akcesoriów technicznych.
          </p>
          <div className="flex gap-2">
            <button type="button" className="bg-primary text-white border-none">
              Zamów teraz
              <Right />
            </button>
            <button type="button" className="border border-white text-white">
              Więcej
              <Right />
            </button>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <Image
        src="/carousel-1.jpg" // Path to your background image
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="-z-10" // Ensures the image is behind all content
      />
    </section>
  );
};
export default Hero;
