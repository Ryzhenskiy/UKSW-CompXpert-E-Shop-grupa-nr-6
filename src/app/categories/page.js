'use client';

import UserTabs from '@/components/layout/UserTabs';
import Edit from '@/components/icons/Edit';
import { Trash } from '@/components/icons/Trash';
import toast from 'react-hot-toast';
import DeleteButton from '@/components/layout/DeleteButton';
import { useProfile } from '@/app/hooks/UseProfile';

import { useEffect, useState } from 'react';

const CategoriesPage = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('/api/categories', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) =>
      res.json().then((data) => {
        setCategories(data);
      })
    );
  }

  async function removeCategory(_id) {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(deletingPromise, {
      loading: 'Usunięcie...',
      error: 'Wystąpił błąd przy usunięciu kategorii!',
      success: 'Kategoria została usunięta!',
    });

    fetchCategories();
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const data = { name: categoryName };

    if (editedCategory) {
      data._id = editedCategory._id;
    }

    const creatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      fetchCategories();
      setCategoryName('');
      setEditedCategory(false);
      if (response.ok) resolve();
      else reject();
    });

    toast.promise(creatingPromise, {
      loading: editedCategory ? 'Edycja...' : 'Tworzenie kategorii...',
      success: editedCategory
        ? 'Kategoria została edytowana'
        : 'Kategoria została stworzona',
      error: editedCategory
        ? 'Wystąpił błąd przy edycji kategorii!'
        : 'Wystąpił błąd przy tworzeniu kategorii!',
    });
  }

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData.admin) {
    return 'Not an admin!';
  }

  return (
    <section className="mt-5 max-w-lg mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-5" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory
                ? `Zmieniasz kategorię: ${editedCategory.name}`
                : 'Wprowadź nazwę kategorii'}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className=" flex gap-2 pb-2">
            <button type="submit">
              {editedCategory ? 'Edytuj' : 'Utworzyć'}
            </button>
            {editedCategory && (
              <button
                onClick={() => {
                  setEditedCategory(false);
                  setCategoryName('');
                }}
              >
                Anuluj
              </button>
            )}
          </div>
        </div>
      </form>

      {categories.map((category) => (
        <div className="flex grow  bg-gray-200 m-1 p-3 rounded-md justify-between items-center">
          <span>{category.name}</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="hover:bg-gray-100 border border-gray-500"
              onClick={() => {
                setEditedCategory(category);
                setCategoryName(category.name);
              }}
            >
              <Edit />
            </button>

            <DeleteButton
              label={<Trash />}
              onDelete={() => removeCategory(category._id)}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoriesPage;
