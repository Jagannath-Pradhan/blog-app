'use client';

import React, { useState, use, useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { assets, blog_data } from '@/assets/assets';
import axios from 'axios';

const Page = ({ params }) => {
  const resolvedParams = use(params);
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`/api/blog?id=${resolvedParams.id}`);
      const data = res.data;
      if (data.success) {
        setData(data.blog);
      } else {
        // console.error('Failed to fetch blog data:', data.message);
        throw new Error(data.message || 'Failed to fetch blog');
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    data ? <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={assets.logo} alt="logo" width={180} className="w-[130px] sm:w-auto" />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000]">
            Get Started <Image src={assets.arrow} alt="arrow-icon" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
          <Image src={data.authorImg} alt="author-img" width={60} height={60} className="mx-auto mt-6 border border-white rounded-full" />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image src={data.image} alt="blog-img" width={1280} height={720} className="border-4 border-white" />
        <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
        <p>{data.description}</p>
        <h3 className="my-5 text-[18px] font-semibold">Step 1: Self-Reflection and Goal Setting</h3>
        <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflectig on your values, aspirants, and long-term goals.</p>
        <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflectig on your values, aspirants, and long-term goals.</p>
        <h3 className="my-5 text-[18px] font-semibold">Step 2: Self-Reflection and Goal Setting</h3>
        <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflectig on your values, aspirants, and long-term goals.</p>
        <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflectig on your values, aspirants, and long-term goals.</p>
        <h3 className="my-5 text-[18px] font-semibold">Step 3: Self-Reflection and Goal Setting</h3>
        <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflectig on your values, aspirants, and long-term goals.</p>
        <p className="my-3">Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflectig on your values, aspirants, and long-term goals.</p>
        <h3 className="my-5 text-[18px] font-semibold">Conclusion:</h3>
        <p className="my-3">Managing your lifestyle is a journey that requires commitment and self-awareness. By following this step-by-step guide, you can take control of your life and make meaningful changes that lead to a more balanced and fulfilling lifestyle. Remember that it's okay to seek support and guidance from professionals or mentors along the way. Your well-being and happiness are worth the effort.</p>
        <div className="my-24">
          <p className="text-black font-semibold my-4">Share this article on social media</p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="facebook-icon" width={50} height={50} className="mr-2 cursor-pointer" />
            <Image src={assets.twitter_icon} alt="twitter-icon" width={50} height={50} className="mr-2 cursor-pointer" />
            <Image src={assets.googleplus_icon} alt="facebook-icon" width={50} height={50} className="mr-2 cursor-pointer" />
          </div>
        </div>
      </div>
      <Footer />
    </> : <></>
  );
};

export default Page;
