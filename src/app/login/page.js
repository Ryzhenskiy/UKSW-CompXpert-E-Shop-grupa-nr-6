'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
    setLoginInProgress(false);
  }
  //TODO
  //123332

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4 font-semibold">
        Logowanie
      </h1>

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          disabled={loginInProgress}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="hasło"
          disabled={loginInProgress}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Zaloguj się
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
      </form>
    </section>
  );
};
export default LoginPage;
