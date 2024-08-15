import React, { useState, useContext } from 'react'
import { AdsContext } from '../../../../context/AdsContext'
import { Ad } from '../../../../interfaces'

const EditAdForm: React.FC<{ ad: Ad }> = ({ ad }) => {
  const { updateAd } = useContext(AdsContext)!
  const [updatedAd, setUpdatedAd] = useState(ad)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateAd(ad.id, updatedAd)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={updatedAd.address}
        onChange={(e) =>
          setUpdatedAd({ ...updatedAd, address: e.target.value })
        }
        placeholder='Address'
        required
      />
      <input
        type='text'
        value={updatedAd.description}
        onChange={(e) =>
          setUpdatedAd({ ...updatedAd, description: e.target.value })
        }
        placeholder='Description'
        required
      />
      <input
        type='text'
        value={updatedAd.phone}
        onChange={(e) => setUpdatedAd({ ...updatedAd, phone: e.target.value })}
        placeholder='Phone'
        required
      />
      <input
        type='number'
        value={updatedAd.location.lat}
        onChange={(e) =>
          setUpdatedAd({
            ...updatedAd,
            location: {
              ...updatedAd.location,
              lat: parseFloat(e.target.value),
            },
          })
        }
        placeholder='Latitude'
        required
      />
      <input
        type='number'
        value={updatedAd.location.lng}
        onChange={(e) =>
          setUpdatedAd({
            ...updatedAd,
            location: {
              ...updatedAd.location,
              lng: parseFloat(e.target.value),
            },
          })
        }
        placeholder='Longitude'
        required
      />
      <button type='submit'>Update Ad</button>
    </form>
  )
}

export default EditAdForm
