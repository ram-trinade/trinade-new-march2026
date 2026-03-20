'use client'

import dynamic from 'next/dynamic'

const ErrorContent = dynamic(() => import('@/components/experimental-error-content'), { ssr: false })
const PremiumCursor = dynamic(() => import('@/components/premium-cursor'), { ssr: false })

export default function NotFound() {
  return (
    <div className="solutions-page">
      <PremiumCursor />
      <ErrorContent />
    </div>
  )
}
