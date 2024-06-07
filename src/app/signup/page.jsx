'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function  Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, email }),
        });
        if (response.ok) {
            alert("Signup successful!!!");
            router.push('/login');
        } else {
          alert('Signup failed');
        }
      };
  return (
    <div>
        <h1 className='text-4xl mt-6 text-center'>Sign Up</h1>
        <div className='border-gray-800 border-1 w-1/2 m-auto'>

            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="title" className="block text-2xl font-md leading-8 text-gray-900 mt-3">
                    User Name
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                    placeholder="Add Username"
                    onChange={(e) => setUsername(e.target.value)}
                    
                />
                <label htmlFor="email" className="block text-2xl font-md leading-8 text-gray-900 mt-3">
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                    placeholder="Add Email"
                    onChange={(e) => setEmail(e.target.value)}
                    
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
                />
                <input
                    type="submit"
                    value="Sign Up"
                    className='w-full h-100 bg-gray-800 mt-4 rounded-md border-0 text-center py-2 pl-7 pr-20 text-gray-200 text-2xl ring-1 ring-inset ring-gray-300 cursor-pointer'
                />
            </form>
        </div>
    </div>
  )
}
