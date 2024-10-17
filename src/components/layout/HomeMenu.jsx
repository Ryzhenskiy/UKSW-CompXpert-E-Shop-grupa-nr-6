import MenuItem from '@/components/menu/MenuItem';
import SectionHeaders from '@/components/layout/SectionHeaders';

const HomeMenu = () => {
  return (
    <div>
      <SectionHeaders header={'Recommended products'} subheader={'On top'} />
      <section className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </section>
    </div>
  );
};
export default HomeMenu;
