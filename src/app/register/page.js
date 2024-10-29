'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setError(false);
    console.log('here1');
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      setError(true);
    }
    if (response.ok) {
      setUserCreated(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary font-semibold text-4xl mb-4">
        Rejestracja
      </h1>
      {userCreated && (
        <div className="my-4 text-center text-gray-500 text-lg">
          Użytkownik został stworzony. Zaraz możesz{' '}
          <Link href={'/login'} className="underline">
            zalogować się &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center text-gray-500 text-lg">
          Pojawił się problem!
          <br />
          Spróbuj później...
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={creatingUser}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          disabled={creatingUser}
          placeholder="hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Rejestruj
        </button>

        <div className="my-4 text-center text-gray-500">
          albo zaloguj się za pomocą serwisu
        </div>
        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="flex gap-4 items-center justify-center"
        >
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Zaloguj się z Google{' '}
        </button>
        <div className="text-center text-gray-500 mt-4 border-t pt-4">
          Już masz konto?{' '}
          <Link href={'/login'} className="underline">
            Zaloguj się tutaj &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};
export default RegisterPage;
