'use client'

import React, { useEffect, useState } from 'react'
import SubsTableItem from '@/app/components/admin-components/SubsTableItem'
import axios from 'axios'
import { toast } from 'react-toastify'

const page = () => {
  const [emails, setEmails] = useState([])

  const fetchEmails = async () => {
    try {
      const res = await axios.get('/api/email')
      const data = res.data

      if (data.success) {
        setEmails(data.emails)
        // console.log(data.emails)
      }
    } catch (error) {
      console.error("Error fetching emails:", error)
    }
  }

  const deleteEmail = async (mongoId) => {
    try {
      const res = await axios.delete(`/api/email?id=${mongoId}`)
      const data = res.data;
      if (data.success) {
        toast.success(data.message || 'Email deleted successfully!')
        fetchEmails()
      } else {
        toast.error(data.message || 'Failed to delete email')
        console.error('Failed to delete email:', data.message)
      }
    }
    catch (error) {
      console.error('Error deleting email:', error)
    }
  }

  useEffect(() => {
    fetchEmails()
  }, [])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => (
              <SubsTableItem key={item._id} mongoId={item._id} email={item.email} date={item.date} deleteEmail={deleteEmail}  />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page