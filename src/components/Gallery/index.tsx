import React, { useState, useEffect } from 'react'
import styles from './gallery.module.css'

interface Carousel {
  src: string
  alt: string
}

interface Props {
  structure: Carousel[]
}

const Gallery: React.FC<Props> = ({ structure }) => {
  const [selectedImage, setSelectedImage] = useState(structure[0])

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <img
          src={`data:image/jpeg;base64,${selectedImage?.src}`}
          alt={selectedImage?.alt}
          className={styles.mainImage}
        />
      </div>
      <div className={styles.thumbnailContainer}>
        {structure.map((image, index) => (
          <div
            key={index}
            className={styles.thumbnail}
            onClick={() => setSelectedImage(image)}
          >
            <img src={`data:image/jpeg;base64,${image.src}`} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
