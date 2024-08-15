import React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
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

const LocationMarker: React.FC<{ setCoord: (coord: [number, number]) => void, coord: [number, number] }> = ({ setCoord, coord }) => {
  useMapEvents({
    click(e) {
      setCoord([e.latlng.lat, e.latlng.lng])
    },
  })

  return <Marker icon={defaultIcon} position={coord} />
}

interface Props {
  coord: [number, number]
  setCoord: (coord: [number, number]) => void
}

const Map: React.FC<Props> = ({ coord, setCoord }) => {
  return (
    <div>
      <MapContainer
        style={{ height: '40vh' }}
        center={coord}
        zoom={13}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker setCoord={setCoord} coord={coord} />
      </MapContainer>
    </div>
  )
}

export default Map
