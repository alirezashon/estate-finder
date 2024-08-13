import React, { createContext, useState, useEffect } from 'react'
import { Ad, AdsContextProps } from '../interfaces'

export const AdsContext = createContext<AdsContextProps | null>(null)

export const AdsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ads, setAds] = useState<Ad[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/ads')
      .then((res) => res.json())
      .then((data) => setAds(data))
  }, [])

  const addAd = (ad: Omit<Ad, 'id' | 'userId'>) => {
    const newAd: Ad = {
      ...ad,
      id: Date.now(),
      userId: 1,
    }

    fetch('http://localhost:5000/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAd),
    }).then(() => setAds((prev) => [...prev, newAd]))
  }

  const updateAd = (id: number, updatedAd: Ad) => {
    fetch(`http://localhost:5000/ads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAd),
    }).then(() =>
      setAds((prev) => prev.map((ad) => (ad.id === id ? updatedAd : ad)))
    )
  }

  const deleteAd = (id: number) => {
    fetch(`http://localhost:5000/ads/${id}`, { method: 'DELETE' }).then(() =>
      setAds((prev) => prev.filter((ad) => ad.id !== id))
    )
  }

  return (
    <AdsContext.Provider value={{ ads, addAd, updateAd, deleteAd }}>
      {children}
    </AdsContext.Provider>
  )
}
