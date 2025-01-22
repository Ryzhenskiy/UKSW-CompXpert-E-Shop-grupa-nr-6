'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import UserForm from '@/components/layout/UserForm';
import toast from 'react-hot-toast';
import UserTabs from '@/components/layout/UserTabs';

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;

  const [user, setUser] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) =>
        res.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        })
      );
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    toast.promise(savingPromise, {
      loading: 'Ładowanie...',
      error: 'Błąd!',
      success: 'Zmiany na profilu zostały zapisane!',
    });
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  if (status === 'loading' || !profileFetched) {
    return 'Ładowanie...';
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-md mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
};
export default ProfilePage;