export interface Ad {
  id: number
  userId: number
  location: {
    lat: number
    lng: number
  }
  address: string
  description: string
  phone: string
}

export interface AdsContextProps {
  ads: Ad[]
  addAd: (ad: Omit<Ad, 'id' | 'userId'>) => void
  updateAd: (id: number, updatedAd: Ad) => void
  deleteAd: (id: number) => void
}
