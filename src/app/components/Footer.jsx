import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className="flex flex-col justify-around gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
        <Image src={assets.logo_light} alt="Logo" width={120} />
        <p className="text-white text-sm">All rights reserved. Copyright @blogger</p>
        <div className="flex">
            <Image src={assets.facebook_icon} alt="Facebook icon" width={40} className="cursor-pointer" />
            <Image src={assets.twitter_icon} alt="X icon" width={40} className="cursor-pointer" />
            <Image src={assets.googleplus_icon} alt="Facebook icon" width={40} className="cursor-pointer" />
        </div>
    </div>
  )
}

export default Footer