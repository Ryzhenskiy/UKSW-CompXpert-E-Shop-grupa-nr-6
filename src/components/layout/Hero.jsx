import Image from 'next/image';
import Right from '../icons/Right';
import Link from 'next/link';
const Hero = () => {
  return (
    <section className="w-[100%] flex items-center justify-between">
      <div className="gap-6">
        <h1 className="text-primary font-bold text-8xl">CompXpert</h1>
        <p className="text-gray-500 text-3xl mt-5 font-semibold italic ">
          Everything becomes better with computers
        </p>
        <Link
          href={'/'}
          className="justify-center w-[40%] bg-primary uppercase text-white px-4 py-2 rounded-full flex items-center gap-2 mt-5 font-semibold"
        >
          More details
          <Right />
        </Link>
      </div>
      <Image src={'/hero-image.png'} width={550} height={550} alt={'pizza'} />
    </section>
  );
};
export default Hero;
