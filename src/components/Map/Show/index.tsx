import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconUrl from '/node_modules/leaflet/dist/images/marker-icon.png'
import shadowUrl from '/node_modules/leaflet/dist/images/marker-shadow.png'
import '../index.module.css'

const defaultIcon = new L.Icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  shadowUrl: shadowUrl,
  shadowSize: [41, 41],
})

interface Props {
  coord: [number, number]
}

const ShowAddress: React.FC<Props> = ({ coord }) => {
  return (
    <div>
      <MapContainer
        style={{
          height: '20vh',
        }}
        center={coord}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false} 
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker icon={defaultIcon} position={coord}></Marker>
      </MapContainer>
    </div>
  )
}

export default ShowAddress