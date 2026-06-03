'use client'

import React, { useState, useEffect } from 'react'

export interface ToastItem {
  id: number
  message: string
  isExiting: boolean
}

interface ToastProps {
  toasts: ToastItem[]
  isDarkMode: boolean
}

const IndividualToast = ({ toast, isDarkMode }: { toast: ToastItem; isDarkMode: boolean }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation immediately after mount
    const raf = requestAnimationFrame(() => {
      setIsVisible(true)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className={`pointer-events-auto px-6 py-4 rounded-2xl shadow-xl border transition-all duration-500 transform ${
        isVisible && !toast.isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800 text-white'
          : 'bg-white border-red-600 text-gray-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-teal-500 font-bold">!</span>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  )
}

const Toast = ({ toasts, isDarkMode }: ToastProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <IndividualToast key={toast.id} toast={toast} isDarkMode={isDarkMode} />
      ))}
    </div>
  )
}

export default Toast
