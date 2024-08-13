import React, { useState, useContext } from 'react'
import { AdsContext } from '../../context/AdsContext'

const AddAdForm: React.FC = () => {
  const { addAd } = useContext(AdsContext)!
  const [ad, setAd] = useState({
    address: '',
    description: '',
    location: { lat: 0, lng: 0 },
    phone: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addAd(ad)
    setAd({
      address: '',
      description: '',
      location: { lat: 0, lng: 0 },
      phone: '',
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={ad.address}
        onChange={(e) => setAd({ ...ad, address: e.target.value })}
        placeholder='Address'
        required
      />
      <input
        type='text'
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
        placeholder='Description'
        required
      />
      <input
        type='text'
        value={ad.phone}
        onChange={(e) => setAd({ ...ad, phone: e.target.value })}
        placeholder='Phone'
        required
      />
      <input
        type='number'
        value={ad.location.lat}
        onChange={(e) =>
          setAd({
            ...ad,
            location: { ...ad.location, lat: parseFloat(e.target.value) },
          })
        }
        placeholder='Latitude'
        required
      />
      <input
        type='number'
        value={ad.location.lng}
        onChange={(e) =>
          setAd({
            ...ad,
            location: { ...ad.location, lng: parseFloat(e.target.value) },
          })
        }
        placeholder='Longitude'
        required
      />
      <button type='submit'>Add Ad</button>
    </form>
  )
}

export default AddAdForm
