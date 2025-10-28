'use client'

import React, { useState } from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'

const Header = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);

      const res = await axios.post('/api/email', formData);
      const data = res.data;

      if (data.success) {
        toast.success(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        toast.error(data.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Error subscribing email:', error);
      // toast.error('An error occurred. Please try again later.');
    }
  }

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Image src={assets.logo} alt="logo" width={180} className='w-[130px] sm:w-auto' />
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black border-solid shadow-[-7px_7px_0px_#000]'>Get Started <Image src={assets.arrow} alt='arrow-icon-image' /> </button>
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sint exercitationem minus iure earum nobis dicta molestias magnam deleniti quae?</p>
        <form onSubmit={handleSubmit} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000]'>
          <input type='email' placeholder='Enter your email' className='pl-4 outline-none' onChange={(e) => setEmail(e.target.value)} value={email} />
          <button type='submit' className='border-l border-black p-4 sm:px-8 active:bg-gray-600 active:text-white cursor-pointer'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header