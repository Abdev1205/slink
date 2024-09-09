'use client'

import React from 'react'
import { useEffect } from 'react';

const Modal = ({ visible, onClose = () => { }, callback = () => { }, children, focusMode }) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);
  if (!visible) return null;
  return (
    <div
      id="background"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target.id == "background" && !focusMode) onClose();
      }}
    >
      {children}
    </div>
  )
}

export default Modal
