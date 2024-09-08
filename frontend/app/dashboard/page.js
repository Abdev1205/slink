'use client'

import useSession from '@/hooks/useSession'
import React from 'react'

const DahboardPage = () => {
  const { user } = useSession()
  return (
    <div>
      <h2>Name : {user?.name}</h2>
    </div>
  )
}

export default DahboardPage
