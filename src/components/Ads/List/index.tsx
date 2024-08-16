import React, { useState, useContext } from 'react'
import { AdsContext } from '../../../context/AdsContext'
import styles from './list.module.css'
import Gallery from '../../Gallery'
import EditAdForm from '../Create/Edit'
import { Ad } from '../../../interfaces'
import ShowAddress from '../../Map/Show'

const AdList: React.FC = () => {
  const { ads, deleteAd } = useContext(AdsContext)!
  const [edit, setEdite] = useState<Ad | null>(null)
  const [loading, setLoading] = useState(true) // Add loading state

  const onClose = () => {
    setEdite(null)
  }

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000) // Simulate a 2-second loading period

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles.adsContainer}>
      {loading ? (
        Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className={styles.loadingPlaceholder}></div>
        ))
      ) : (
        ads.map((ad) => (
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
            <button className={styles.deleteButton} onClick={() => deleteAd(ad.id)}>Delete</button>
            <button className={styles.editButton} onClick={() => setEdite(ad)}>Edit</button>
          </div>
        ))
      )}
      {edit && <EditAdForm ad={edit} onClose={onClose} />}
    </div>
  )
}

export default AdList
