'use client';

import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4 font-semibold">
        Login
      </h1>

      <form className="block max-w-xs mx-auto">
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
          placeholder="password"
          disabled={loginInProgress}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
      </form>
    </section>
  );
};
export default LoginPage;
