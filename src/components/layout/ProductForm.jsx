'use client';

import { useState, useEffect } from 'react';

import EditableImage from '@/components/layout/EditableImage';
import { useProfile } from '@/app/hooks/UseProfile';

const ProductForm = ({ onSubmit, product }) => {
  const [image, setImage] = useState(product?.image || '');
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [basePrice, setBasePrice] = useState(product?.basePrice || '');
  const [category, setCategory] = useState(product?.category || '');
  const [categories, setCategories] = useState([]);
  const { data, loading } = useProfile();

  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  if (loading) {
    return 'Ładowanie...';
  }

  if (!data.admin) {
    return 'Odmowa dostępu!';
  }
  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          category,
        })
      }
      className="mt-8 max-w-md mx-auto"
    >
      <div
        className="grid items-start gap-2"
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Nazwa produktu</label>

          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Opis</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Kategoria</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <label>Cena</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />

          <button type="submit">Zapisz</button>
        </div>
      </div>
    </form>
  );
};
export default ProductForm;