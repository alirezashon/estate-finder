import React, { useState, useEffect } from 'react'
import './gallery.css'

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
    <div className='gallery'>
      <div className='mainImageContainer'>
        <img
          src={`data:image/jpeg;base64,${selectedImage?.src}`}
          alt={selectedImage?.alt}
          className='mainImage'
        />
      </div>
      <div className='thumbnailContainer'>
        {structure.map((image, index) => (
          <div
            key={index}
            className='thumbnail'
            onClick={() => setSelectedImage(image)}
          >
              <img
                src={`data:image/jpeg;base64,${image.src}`}
                alt={image.alt}
              />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
