'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    });

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect or perform any action after successful login
    //   window.location.href = '/'; // or another route
        router.push('/')
    }
  };

  return (
    <div>
      <h1 className='text-4xl mt-6 text-center'>Log In</h1>
      <div className='border-gray-800 border-1 w-1/2 m-auto'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-2xl font-md leading-8 text-gray-900 mt-3">
            User Name
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
            placeholder="Add Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password" className="block text-2xl font-md leading-8 text-gray-900 mt-3">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
            placeholder="Add Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="submit"
            value="Log In"
            className='w-full h-100 bg-gray-800 mt-4 rounded-md border-0 text-center py-2 pl-7 pr-20 text-gray-200 text-2xl ring-1 ring-inset ring-gray-300 cursor-pointer'
          />
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}