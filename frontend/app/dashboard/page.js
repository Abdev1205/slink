'use client'

import Weekly from '@/components/stats/Weekly'
import UrlTable from '@/components/table/UrlTable'
import useSession from '@/hooks/useSession'
import api from '@/utils/axios'
import React, { useEffect, useState } from 'react'

const DahboardPage = () => {
  const { user } = useSession();
  const [urlData, setUrlData] = useState([]);

  const geturl = async () => {
    try {
      const res = await api.get('/api/shorten/url', { withCredentials: true });
      setUrlData(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    geturl();
  }, []);

  return (
    <div>
      <div className=' w-[100%] flex justify-center   ' >
        <div className=' w-[90%] mt-[5rem]   ' >
          <UrlTable urls={urlData} />
        </div>
      </div>
    </div>
  )
}

export default DahboardPage
