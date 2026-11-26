import { createContext, type Dispatch, type SetStateAction } from 'react'
import type { BuyerRequest, DemoUser, Listing, Offer } from '../types/index.ts'

export interface AppContextValue {
  listings: Listing[]
  setListings: Dispatch<SetStateAction<Listing[]>>
  offers: Offer[]
  setOffers: Dispatch<SetStateAction<Offer[]>>
  requests: BuyerRequest[]
  setRequests: Dispatch<SetStateAction<BuyerRequest[]>>
  saved: string[]
  setSaved: Dispatch<SetStateAction<string[]>>
  user: DemoUser | null
  setUser: Dispatch<SetStateAction<DemoUser | null>>
}

export const AppContext = createContext<AppContextValue | null>(null)
