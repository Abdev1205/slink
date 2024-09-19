'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CircleBg, CubesBg, Grillbg, UrlErrorImage } from '@/public/assetsManager'
import PrimaryButton from '@/components/button/PrimaryButton'
import DashboardNavbar from '@/components/navbar/DashboardNavbar'

const ShortUrlPage = ({ params }) => {
  const router = useRouter()
  const [error, setError] = useState(null)

  const redirectToLongUrl = async () => {
    const { shorturl } = params
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/redirect/${shorturl}`
  }

  useEffect(() => {
    if (params && params.shorturl) {
      if (window.location.search) {
        const queryParams = new URLSearchParams(window.location.search)
        const errorType = queryParams.get('error')
        if (errorType) {
          // Display error message
          setError(getErrorMessage(errorType))
        } else {
          // Redirect if no error parameters are present
          redirectToLongUrl()
        }
      } else {
        // Redirect if there are no query parameters
        redirectToLongUrl()
      }
    }
  }, [params])

  const getErrorMessage = (errorType) => {
    switch (errorType) {
      case 'URLNotFound':
        return 'The URL you provided was not found.'
      case 'URLInactive':
        return 'The URL is currently inactive.'
      case 'URLExpired':
        return 'The URL has expired.'
      default:
        return 'An unknown error occurred.'
    }
  }

  return (
    <div>
      {error ? (
        <div className='relative flex flex-col overflow-clip w-[100%] h-[100vh] bg-[#0B101B] ' >
          <Image
            src={Grillbg}
            alt='bg'
            className='absolute w-full opacity-[.35] z-[15] no-select '
          />
          <Image
            src={CubesBg}
            alt='bg'
            className=' absolute w-full opacity-[.55]  z-[5] no-select '
          />
          <Image
            src={CircleBg}
            alt='bg'
            className=' absolute w-full  z-[5] no-select '
          />
          <div className=' z-[55] px-[4rem]  ' >
            <DashboardNavbar />
          </div>
          <div className=' z-[50] flex w-full items-center justify-center h-[calc(100vh-8rem)] ' >
            <div className='flex flex-col items-center gap-[2rem] w-fit ' >
              <Image
                src={UrlErrorImage}
                alt='Url not found'
                className='w-[20rem]'
              />
              <p className=' font-openSans text-[1.3rem] text-white/75  '>{error}</p>
              <PrimaryButton text='Go to Home' exec={() => router.push('/')} styles=' text-white ' />
            </div>
          </div>
        </div>

      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  )
}

export default ShortUrlPage