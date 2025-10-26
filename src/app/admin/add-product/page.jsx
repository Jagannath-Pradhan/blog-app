'use client'

import { assets } from '@/assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
    author: 'Alex Bennett',
    authorImg: '/author-img.png'
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({ ...data, [name]: value }))
    // console.log(data)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('author', data.author)
    formData.append('authorImg', data.authorImg)
    formData.append('image', image)

    try {
      const res = await axios.post('/api/blog', formData)
      const data = res.data
      if (data.success) {
        toast.success(data.message || 'Blog added successfully')
        setImage(false)
        setData({
          title: '',
          description: '',
          category: 'Startup',
          author: 'Alex Bennett',
          authorImg: '/author-img.png'
        })
      } else {
        toast.error(data.message || 'Something went wrong')
      }
    } catch (err) {
      toast.error('Error uploading blog')
      console.error(err)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <p className="text-xl">Upload thumbnail</p>
      <label htmlFor="image">
        <Image className="mt-4" src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt="upload-area-img" />
      </label>
      <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden required />
      <p className="text-xl mt-4">Blog Title</p>
      <input type="text" placeholder="Type here" name="title" onChange={onChangeHandler} value={data.value} className="w-full sm:w-[500px] mt-4 px-4 py-3 border border-gray-200" required />
      <p className="text-xl mt-4">Blog Description</p>
      <textarea placeholder="Write content here" rows={6} name="description" onChange={onChangeHandler} value={data.description} className="w-full sm:w-[500px] mt-4 px-4 py-3 border border-gray-200" required />
      <p className="text-xl mt-4">Blog Category</p>
      <select name="category" onChange={onChangeHandler} value={data.category} className="w-40 mt-4 px-4 py-3 border text-gray-500">
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
      <br />
      <button type="submit" className="mt-8 w-40 h-12 bg-black text-white cursor-pointer">Add</button>
    </form>
  )
}

export default page