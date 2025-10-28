'use client'

import BlogTableItem from '@/app/components/admin-components/BlogTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [blogs, setBlogs] = useState([])

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blog')
      const data = res.data;

      if (data.success) {
        setBlogs(data.blogs)
        console.log(data.blogs)
      } else {
        console.error('Failed to fetch blogs:', data.message)
      }
    }
    catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const deleteBlog = async (mongoId) => {
    try {
      const res = await axios.delete(`/api/blog?id=${mongoId}`)
      const data = res.data;
      if (data.success) {
        toast.success(data.message || 'Blog deleted successfully!')
        fetchBlogs()
      } else {
        console.error('Failed to delete blog:', data.message)
      }
    }
    catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <BlogTableItem key={blog._id} mongoId={blog._id} authorImg={blog.authorImg} title={blog.title} author={blog.author} date={blog.date} deleteBlog={deleteBlog} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page