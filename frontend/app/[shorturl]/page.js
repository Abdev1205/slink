'use client'

import api from '@/utils/axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ShortUrlPage = ({ params }) => {
  const router = useRouter()

  const redirectToLongUrl = async () => {
    const { shorturl } = params;
    try {
      const res = await api.get(`/${shorturl}`);
      console.log(res.data)
      if (res.data && res.data.longUrl) {
        window.location.href = res.data.longUrl;
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (params && params.shorturl) {
      redirectToLongUrl();
    }
  }, [router])
  return null;
}

export default ShortUrlPage
