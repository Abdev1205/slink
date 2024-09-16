'use client';

import React from 'react'
import Progress from './Progress'
import { Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <Progress />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Providers
