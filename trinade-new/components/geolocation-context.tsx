'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface LocationData {
  country?: string
  countryCode?: string
  region?: string
  city?: string
  latitude?: number
  longitude?: number
  timezone?: string
}

interface GeolocationContextType {
  location: LocationData | null
  isLoading: boolean
  error: string | null
  requestLocation: () => Promise<void>
  hasPermission: boolean | null
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined)

export const useGeolocation = () => {
  const context = useContext(GeolocationContext)
  if (context === undefined) {
    throw new Error('useGeolocation must be used within a GeolocationProvider')
  }
  return context
}

interface GeolocationProviderProps {
  children: ReactNode
}

export const GeolocationProvider: React.FC<GeolocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  const checkPermission = async (): Promise<boolean> => {
    if (!navigator.permissions) return false

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' })
      setHasPermission(result.state === 'granted')
      return result.state === 'granted'
    } catch {
      return false
    }
  }

  const getLocationFromCoords = async (latitude: number, longitude: number): Promise<LocationData> => {
    try {
      // Use a geocoding service to get location details
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )

      if (!response.ok) {
        throw new Error('Geocoding service unavailable')
      }

      const data = await response.json()

      return {
        country: data.countryName,
        countryCode: data.countryCode,
        region: data.principalSubdivision,
        city: data.city,
        latitude,
        longitude,
        timezone: data.timeZone?.name || Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    } catch (err) {
      console.warn('Geocoding failed, using basic location data:', err)
      // Fallback to basic location data
      return {
        latitude,
        longitude,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    }
  }

  const requestLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        })
      })

      const { latitude, longitude } = position.coords
      const locationData = await getLocationFromCoords(latitude, longitude)

      setLocation(locationData)
      setHasPermission(true)
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location access denied by user')
            setHasPermission(false)
            break
          case err.POSITION_UNAVAILABLE:
            setError('Location information is unavailable')
            break
          case err.TIMEOUT:
            setError('Location request timed out')
            break
          default:
            setError('An unknown error occurred')
        }
      } else {
        setError('Failed to get location')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Check initial permission status
    checkPermission()

    // Optional: Auto-request location on mount (commented out for user consent)
    // requestLocation()
  }, [])

  const value: GeolocationContextType = {
    location,
    isLoading,
    error,
    requestLocation,
    hasPermission,
  }

  return (
    <GeolocationContext.Provider value={value}>
      {children}
    </GeolocationContext.Provider>
  )
}