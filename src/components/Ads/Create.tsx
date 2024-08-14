import React, { useState, useContext, RefObject, useRef } from 'react'
import { AdsContext } from '../../context/AdsContext'
import { readFileAsBase64 } from '../../lib'
import './ads.css'

interface Ad {
  address: string
  description: string
  location: { lat: number; lng: number }
  images: string[]
  phone: string
}

const AddAdForm: React.FC = () => {
  const { addAd } = useContext(AdsContext)!

  const refs: {
    [key: string]: RefObject<HTMLInputElement>
  } = {
    images: useRef<HTMLInputElement>(null),
  }

  const [ad, setAd] = useState<Ad>({
    address: '',
    description: '',
    location: { lat: 0, lng: 0 },
    images: [],
    phone: '',
  })

  const setSubImageFiles = async () => {
    const imageFiles =
      refs.images.current instanceof HTMLInputElement &&
      refs.images.current.files
        ? Array.from(refs.images.current.files)
        : []
    const base64Images = await Promise.all(imageFiles.map(readFileAsBase64))
    setAd((prevAd) => ({
      ...prevAd,
      images: base64Images,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addAd(ad)
    setAd({
      address: '',
      description: '',
      location: { lat: 0, lng: 0 },
      images: [],
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
      <input
        ref={refs.images}
        type='file'
        multiple
        onChange={setSubImageFiles}
      />
      <button type='submit'>Add Ad</button>
    </form>
  )
}

export default AddAdForm
