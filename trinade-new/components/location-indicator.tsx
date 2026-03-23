'use client'

import { useGeolocation } from '@/components/geolocation-context'
import { motion } from 'motion/react'

interface LocationIndicatorProps {
  className?: string
  showDetails?: boolean
}

export default function LocationIndicator({ className = '', showDetails = false }: LocationIndicatorProps) {
  const { location, isLoading, error } = useGeolocation()

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center gap-2 text-sm ${className}`}
        style={{ color: 'rgba(201,168,110,0.8)' }}
      >
        <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
        Detecting location...
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-sm ${className}`}
        style={{ color: 'rgba(239, 68, 68, 0.8)' }}
      >
        📍 Location unavailable
      </motion.div>
    )
  }

  if (!location?.country) {
    return null
  }

  const displayText = showDetails
    ? `${location.city ? `${location.city}, ` : ''}${location.country}`
    : location.country

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-2 text-sm ${className}`}
      style={{ color: 'rgba(201,168,110,0.8)' }}
    >
      <span>📍</span>
      <span>{displayText}</span>
    </motion.div>
  )
}