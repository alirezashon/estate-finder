import React, { useState, useContext } from 'react'
import { AdsContext } from '../../../../context/AdsContext'
import { Ad } from '../../../../interfaces'
import styles from './edit.module.css'

const EditAdForm: React.FC<{ ad: Ad; onClose: () => void }> = ({
  ad,
  onClose,
}) => {
  const { updateAd } = useContext(AdsContext)!
  const [updatedAd, setUpdatedAd] = useState<Ad>(ad)

  const handleImageChange = (index: number) => {
    const newImage = prompt('Enter new image URL:')
    if (newImage) {
      const updatedImages = [...updatedAd.images]
      updatedImages[index] = newImage
      setUpdatedAd({ ...updatedAd, images: updatedImages })
    }
  }

  const handleDeleteImage = (index: number) => {
    const imageToDelete = updatedAd.images[index]
    const updatedImages = updatedAd.images.filter(
      (image) => image !== imageToDelete
    )
    setUpdatedAd({ ...updatedAd, images: updatedImages })
  }

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      )
      setUpdatedAd({
        ...updatedAd,
        images: [...updatedAd.images, ...newImages],
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateAd(updatedAd.id, updatedAd)
    onClose()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <form onSubmit={handleSubmit} className={styles.form}>
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
            onChange={(e) =>
              setUpdatedAd({ ...updatedAd, phone: e.target.value })
            }
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
          <div className={styles.imageGallery}>
            {updatedAd.images.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                <img
                  src={`data:image/jpeg;base64,${image}`}
                  alt={`Ad Image ${index + 1}`}
                  className={styles.adImage}
                  onClick={() => handleImageChange(index)}
                />
                <button
                  type='button'
                  className={styles.deleteButton}
                  onClick={() => handleDeleteImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <input
            type='file'
            multiple
            onChange={handleAddImages}
            className={styles.fileInput}
          />
          <button type='submit' className={styles.submitButton}>
            Update Ad
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditAdForm
