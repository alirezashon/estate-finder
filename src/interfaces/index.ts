export interface Ad {
  id: number
  userId: string
  location: {
    lat: number
    lng: number
  }
  images:string[]
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
