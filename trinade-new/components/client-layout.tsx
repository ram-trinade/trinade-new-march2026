'use client'

import { GeolocationProvider } from '@/components/geolocation-context'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <GeolocationProvider>
      {children}
    </GeolocationProvider>
  )
}