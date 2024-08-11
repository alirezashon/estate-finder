import React, { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconUrl from '/node_modules/leaflet/dist/images/marker-icon.png'
import shadowUrl from '/node_modules/leaflet/dist/images/marker-shadow.png'
import './index.module.css' 

const defaultIcon = new L.Icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  shadowUrl: shadowUrl,
  shadowSize: [41, 41],
})

const LocationMarker: React.FC<{
  setCoord: (coord: [number, number]) => void
}> = ({ setCoord }) => {
  useMapEvents({
    click(e) {
      setCoord([e.latlng.lat, e.latlng.lng])
    },
  })
  return null
}

const Map: React.FC = () => {
  const [coord, setCoord] = useState<[number, number]>([35.75, 51.49])

  return (
    <div>
      {coord}
      <MapContainer
        style={{
          height: '40vh',
          width: '50vw',
        }}
        center={coord}
        zoom={13}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker icon={defaultIcon} position={coord}>        
        </Marker>
        <LocationMarker setCoord={setCoord} />
      </MapContainer>
    </div>
  )
}

export default Map