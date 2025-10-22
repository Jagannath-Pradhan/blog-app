'use client'

import React, { useState } from 'react'

const page = ({ params }) => {
    const [data, setData] = useState(null);

  return (
    <div>
        {params.id}
    </div>
  )
}

export default page