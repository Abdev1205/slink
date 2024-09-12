'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ShortUrlPage = ({ params }) => {
  const router = useRouter()
  const [error, setError] = useState(null)

  const redirectToLongUrl = async () => {
    const { shorturl } = params
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${shorturl}`
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
        <div>
          <p>{error}</p>
          {/* Optionally add a button to redirect the user to a different page */}
          <button onClick={() => router.push('/')}>Go to Home</button>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  )
}

export default ShortUrlPage