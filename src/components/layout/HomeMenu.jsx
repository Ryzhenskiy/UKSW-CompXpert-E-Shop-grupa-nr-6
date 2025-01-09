import MenuItem from '@/components/menu/MenuItem';
import SectionHeaders from '@/components/layout/SectionHeaders';
import Actuality from '@/components/layout/Actuality';

const HomeMenu = () => {
  return (
    <div className="">
      <SectionHeaders header={'Polecamy'} />
      <section className="grid  p-3 shadow-xl rounded-md grid-cols-2 sm:grid-cols-6"></section>
      <SectionHeaders header={'Aktualności'} className="mt-16" />
      <section className="grid  p-3 shadow-xl rounded-md gap-4 grid-cols-2 sm:grid-cols-5">
        <Actuality
          title="Jest o co walczyć! Czyli Black Month 2024."
          description="Przed nami Black Month &ndash; miesiąc najlepszych okazji."
        />
        <Actuality
          title="Najlepsze promocje, tylko w CompXpert."
          description="Teraz czekają na ciebie super obniżki."
        />
        <Actuality
          title="Najniższe ceny na nowy rok czekają na ciebie w CompXpert."
          description="Już dziś skorzystaj z najlepszych promocji."
        />
        <Actuality
          title="Black Friday nadchodzi!"
          description="Już jutro Black Friday w CompXpert."
        />
        <Actuality
          title="Zerknij na nasze nowe promocje."
          description="Promocje już na ciebie czekają."
        />
      </section>
    </div>
  );
};
export default HomeMenu;