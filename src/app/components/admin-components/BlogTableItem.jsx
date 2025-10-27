import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({ authorImg, title, author, date }) => {
    const blogDate = new Date(date);
    date = blogDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <tr className="bg-white border-b">
            <th className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <Image src={authorImg ? authorImg : assets.profile_icon} alt="author-img" width={40} height={40} className="rounded-full border border-gray-300" />
                <p>{author ? author : 'No author'}</p>
            </th>
            <td className="px-6 py-4">
                {title ? title : 'No title'}
            </td>
            <td className="px-6 py-4">
                {date ? date : 'No date'}
            </td>
            <td className="px-6 py-4">
                <span className="cursor-pointer">X</span>
            </td>
        </tr>
    )
}

export default BlogTableItem