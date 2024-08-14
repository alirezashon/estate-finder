import React, { useEffect, useState, useContext } from 'react';
import { AdsContext } from '../../context/AdsContext';
import './ads.css';

const AdList: React.FC = () => {
  const { ads, deleteAd } = useContext(AdsContext)!

  return (
    <div className="ads-container">
      {ads.map((ad) => (
        <div key={ad.id} className="card">
          <h4>{ad.address}</h4>
          <div className="images-container">
            {ad.images?.length > 0 && (
              ad.images?.map((img, index) => (
                <img
                  key={index}
                  src={`${img}`}
                  alt={`Ad image ${index + 1}`}
                  className="ad-image image-slide"
                />
              ))
            )}
          </div>
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

export default AdList;
