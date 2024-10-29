'use client';
import { useParams } from 'next/navigation';
const MenuItemPage = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};
export default MenuItemPage;
