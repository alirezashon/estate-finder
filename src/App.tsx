import React, { useState, useContext } from 'react'
import { AdsContext } from './context/AdsContext'
import styles from './components/Ads/List/list.module.css'
import Gallery from './components/Gallery'
import { Ad } from './interfaces'
import ShowAddress from './components/Map/Show'

const AdList: React.FC = () => {
  const { ads, deleteAd } = useContext(AdsContext)!
  const [edit, setEdite] = useState<Ad | null>(null)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles.adsContainer}>
      {loading
        ? Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className={styles.loadingPlaceholder}></div>
          ))
        : ads?.map((ad) => (
            <div key={ad.id} className={styles.card}>
              <h4>{ad.address}</h4>
              {ad.images && (
                <Gallery
                  structure={ad.images?.map((img, index) => ({
                    src: img,
                    alt: ad.description + index,
                  }))}
                />
              )}
              <p>{ad.description}</p>
              <p>{ad.phone}</p>
              <ShowAddress coord={[ad.location.lat, ad.location.lng]} />
            </div>
          ))}
    </div>
  )
}

export default AdList
