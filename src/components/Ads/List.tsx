import React, { useContext } from 'react'
import { AdsContext } from '../../context/AdsContext'

const AdList: React.FC = () => {
  const { ads, deleteAd } = useContext(AdsContext)!

  return (
    <div>
      {ads.map((ad) => (
        <div key={ad.id} className='card'>
          <h4>{ad.address}</h4>
          <p>{ad.description}</p>
          <p>{ad.phone}</p>
          <p>
            Location: {ad.location.lat}, {ad.location.lng}
          </p>
          <button onClick={() => deleteAd(ad.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default AdList
