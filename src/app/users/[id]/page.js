'use client';

import toast from 'react-hot-toast';
import UserTabs from '../../../components/layout/UserTabs';
import { useProfile } from '../../hooks/UseProfile';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import UserForm from '@/components/layout/UserForm';

const EditUserPage = () => {
  const { loading, data } = useProfile();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
        console.log(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();

    const updatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          _id: id,
        }),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(updatingPromise, {
      loading: 'Aktualizowanie...',
      success: 'Profil został zaaktualizowany!',
      error: 'Aktualizacja zakończyła się niepowodzeniem!',
    });
  }

  if (loading) {
    return 'Ładowanie informacji o użytkowniku...';
  }

  if (!data.admin) {
    return 'Odmowa dostępu!';
  }

  return (
    <section className="mt-8 mx-auto max-w-lg">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
};
export default EditUserPage;
