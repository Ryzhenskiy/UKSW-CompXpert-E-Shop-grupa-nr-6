'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import UserTabs from '@/components/layout/UserTabs';

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session?.data?.user?.name);
      setImage(session.data.user.image);
      fetch('/api/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) =>
        res.json().then((data) => {
          setUserName(data.name);
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setImage(data.image);
          setIsAdmin(data.admin);
        })
      );
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          phone,
          streetAddress,
          postalCode,
          city,
          country,
          image,
        }),
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    toast.promise(savingPromise, {
      loading: 'Loading...',
      error: 'Error',
      success: 'Profile saved!',
    });
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadingPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setImage(link);
          });
        }
        throw new Error('Something went wrong!');
      });

      await toast.promise(uploadingPromise, {
        loading: 'Loading...',
        error: 'Error',
        success: 'File uploaded!',
      });
    }
  }

  if (status === 'loading') {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4">
          <div>
            <div className="p-2 relative max-w-[120px]">
              {image && (
                <Image
                  src={image}
                  width={120}
                  height={120}
                  alt={'avatar'}
                  className="rounded-lg mb-2"
                />
              )}

              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                  Zmień
                </span>
              </label>
            </div>
          </div>

          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label className="text-primary font-semibold border-b border-primary block">
              Imię i nazwisko
            </label>
            <input
              type="text"
              placeholder={'Imię i nazwisko'}
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label className="text-primary font-semibold border-b border-primary block">
              Email
            </label>
            <input
              type="text"
              placeholder={'Email'}
              value={session.data.user.email}
              disabled={true}
            />
            <label className="text-primary font-semibold border-b border-primary block">
              Numer telefonu
            </label>
            <input
              type="tel"
              placeholder="Numer telefonu"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label className="text-primary font-semibold border-b border-primary block">
              Twój adres
            </label>
            <input
              type="text"
              placeholder="Twój adres"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />

            <div className="flex gap-2">
              <div clas>
                <label className="text-primary font-semibold border-b border-primary block mb-2">
                  Kod pocztowy
                </label>
                <input
                  style={{ margin: '0px' }}
                  type="text"
                  placeholder="Kod pocztowy"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
              <div>
                <label className="text-primary font-semibold border-b border-primary block mb-2">
                  Miasto
                </label>
                <input
                  style={{ margin: '0px' }}
                  type="text"
                  placeholder="Miasto"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
            </div>
            <label className="text-primary font-semibold border-b border-primary block">
              Kraj
            </label>
            <input
              type="text"
              placeholder="Kraj"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />

            <button type="submit">Zapisz</button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
