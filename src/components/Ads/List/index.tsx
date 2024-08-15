import React, { useEffect, useState, useContext } from 'react'
import { AdsContext } from '../../../context/AdsContext'
import './list.css'
import Gallery from '../../Gallery'
import EditAdForm from '../Create/Edit'
import { Ad } from '../../../interfaces'
import ShowAddress from '../../Map/Show'

const AdList: React.FC = () => {
  const { ads, deleteAd } = useContext(AdsContext)!
  const [edit, setEdite] = useState<Ad | null>(null)

  return (
    <div className='ads-container'>
      {ads.map((ad) => (
        <div key={ad.id} className='card'>
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
          <button onClick={() => deleteAd(ad.id)}>Delete</button>
          <button onClick={() => setEdite(ad)}>Edit</button>
          {edit && <EditAdForm ad={edit} />}
        </div>
      ))}
    </div>
  )
}

export default AdList
