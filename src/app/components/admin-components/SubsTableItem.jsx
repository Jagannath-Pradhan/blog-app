import React from 'react'

const SubsTableItem = ({ email, mongoId, date, deleteEmail }) => {
    const emailDate = new Date(date);
    const formattedDate = emailDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    return (
        <tr className="bg-white border-b text-left">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {email ? email : 'No email'}
            </th>
            <td className="hidden sm:block px-6 py-4">
                {formattedDate ? formattedDate : 'No date'}
            </td>
            <td className="px-6 py-4">
                <span className="cursor-pointer text-red-600" onClick={() => deleteEmail(mongoId)}>X</span>
            </td>
        </tr>
    )
}

export default SubsTableItem