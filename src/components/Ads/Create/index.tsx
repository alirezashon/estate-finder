import React, { useRef, useState, useContext, RefObject } from 'react'
import { AdsContext } from '../../../context/AdsContext'
import { readFileAsBase64 } from '../../../lib'
import Map from '../../Map'
import styles from './create.module.css'

interface Ad {
  address: string
  description: string
  location: { lat: number; lng: number }
  images: string[]
  phone: string
}

const AddAdForm: React.FC = () => {
  const { addAd } = useContext(AdsContext)!
  const [coord, setCoord] = useState<[number, number]>([35.75, 51.49])
  const [images, setImages] = useState<string[]>([])

  const refs: {
    address: RefObject<HTMLInputElement>
    description: RefObject<HTMLInputElement>
    phone: RefObject<HTMLInputElement>
    images: RefObject<HTMLInputElement>
  } = {
    address: useRef<HTMLInputElement>(null),
    description: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    images: useRef<HTMLInputElement>(null),
  }

  const setSubImageFiles = async () => {
    const imageFiles =
      refs.images.current instanceof HTMLInputElement &&
      refs.images.current.files
        ? Array.from(refs.images.current.files)
        : []
    const base64Images = await Promise.all(imageFiles.map(readFileAsBase64))
    setImages(base64Images)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const address = refs.address.current?.value.trim()
    const description = refs.description.current?.value.trim()
    const phone = refs.phone.current?.value.trim()

    if (!address || !description || !phone || !coord) {
      alert('Please fill in all required fields.')
      return
    }

    const newAd: Ad = {
      address,
      description,
      location: { lat: coord[0], lng: coord[1] },
      images: images || [],
      phone,
    }

    addAd(newAd)

    refs.address.current!.value = ''
    refs.description.current!.value = ''
    refs.phone.current!.value = ''
    refs.images.current!.value = ''
    setImages([])
    setCoord([35.75, 51.49])
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        ref={refs.address}
        type='text'
        placeholder='آدرس'
        required
        className={styles.input}
      />
      <input
        ref={refs.description}
        type='text'
        placeholder='توضیحات'
        required
        className={styles.input}
      />
      <input
        ref={refs.phone}
        type='text'
        placeholder='شماره تلفن'
        required
        className={styles.input}
      />
      <Map coord={coord} setCoord={setCoord} />
      <input
        ref={refs.images}
        placeholder='تصویر'
        type='file'
        multiple
        onChange={setSubImageFiles}
        className={styles.fileInput}
      />
      <button type='submit' className={styles.button}>
        ایجاد{' '}
      </button>
    </form>
  )
}

export default AddAdForm
