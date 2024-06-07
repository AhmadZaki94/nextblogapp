'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';


export default function AddBlog() {
    const { data: session } = useSession();
    console.log(session, "inside add blog");
    const [blogData, setBlogData] = useState({
        title: '',
        metadescription: '',
        content: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        const res = await axios('/api/addblog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogData.title, blogData.metadescription, blogData.content),
        });

        if (res.ok) {
            alert('Blog added successfully!');
            // router.push('/displayblogs');
        } else {
            const errorData = await res.json();
            alert(`Failed to add blog: ${errorData.error}`);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBlogData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(blogData);
    }
    if(!session || session.user.role !== 'user'){
        return (
            <div>
                <h1 className='text-5xl m-auto mt-32 text-center font-bold'>Only Admin Can Access This page</h1>
            </div>
        )
    }
  return (
    <div>
        <h1 className='text-4xl mt-6 text-center'>Add Blog</h1>
        <div className='border-gray-800 border-1 w-1/2 m-auto'>
            <form action="" onSubmit={handleSubmit} >
                <label htmlFor="title" className="block text-2xl font-md leading-8 text-gray-900 mt-3">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                    placeholder="Add Title"
                    onChange={handleChange}
                    
                />
                <label htmlFor="meta_description" className="block text-2xl font-md leading-8 text-gray-900 mt-3">
                    Meta Description
                </label>
                <input
                    type="text"
                    name="meta_description"
                    id="meta_description"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                    placeholder="Add Meta Description"
                    onChange={handleChange}
                />
                <label htmlFor="content" className="block text-2xl font-md leading-8 text-gray-900 mt-3">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                    rows="2"
                    placeholder="Enter text here"
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Submit"
                    className='w-full h-100 bg-gray-800 mt-4 rounded-md border-0 text-center py-2 pl-7 pr-20 text-gray-200 text-2xl ring-1 ring-inset ring-gray-300 cursor-pointer'
                />
            </form>
        </div>
    </div>
  )
}
