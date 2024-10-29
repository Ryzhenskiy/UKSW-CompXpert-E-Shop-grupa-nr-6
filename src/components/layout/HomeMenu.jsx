import MenuItem from '@/components/menu/MenuItem';
import SectionHeaders from '@/components/layout/SectionHeaders';
import Actuality from '@/components/layout/Actuality';

const HomeMenu = () => {
  return (
    <div className="">
      <SectionHeaders header={'Polecamy'} />
      <section className="grid  p-3 shadow-xl rounded-md grid-cols-2 sm:grid-cols-6">
        <MenuItem
          title="Monitor MSI G27"
          description="MSI G27123GX 1440p 27"
          price={700}
        />
        <MenuItem
          title="Monitor MSI G27"
          description="MSI G27123GX 1440p 27"
          price={700}
        />
        <MenuItem
          title="Monitor MSI G27"
          description="MSI G27123GX 1440p 27"
          price={700}
        />
        <MenuItem
          title="Monitor MSI G27"
          description="MSI G27123GX 1440p 27"
          price={700}
        />
        <MenuItem
          title="Monitor MSI G27"
          description="MSI G27123GX 1440p 27"
          price={700}
        />
        <MenuItem
          title="Monitor MSI G27"
          description="MSI G27123GX 1440p 27"
          price={700}
        />
      </section>
      <SectionHeaders header={'Aktualności'} className="mt-16" />
      <section className="grid  p-3 shadow-xl rounded-md gap-4 grid-cols-2 sm:grid-cols-5">
        <Actuality
          title="Jest o co walczyć! Czyli Black Month 2024"
          description="Przed nami Black Month &ndash; miesiąc najlepszych okazji,"
        />
        <Actuality
          title="Jest o co walczyć! Czyli Black Month 2024"
          description="Przed nami Black Month &ndash; miesiąc najlepszych okazji,"
        />
        <Actuality
          title="Jest o co walczyć! Czyli Black Month 2024"
          description="Przed nami Black Month &ndash; miesiąc najlepszych okazji,"
        />
        <Actuality
          title="Jest o co walczyć! Czyli Black Month 2024"
          description="Przed nami Black Month &ndash; miesiąc najlepszych okazji,"
        />
        <Actuality
          title="Jest o co walczyć! Czyli Black Month 2024"
          description="Przed nami Black Month &ndash; miesiąc najlepszych okazji,"
        />
      </section>
    </div>
  );
};
export default HomeMenu;
