import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { listingsSeed, offersSeed, requestsSeed } from '../data/mockData.ts'
import type { BuyerRequest, DemoUser, Listing, Offer } from '../types/index.ts'
import { AppContext } from './appContext.ts'

export function AppProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage === 'bn' ? 'bn' : 'en'
  }, [i18n.resolvedLanguage])

  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('notunayon-listings') || '[]') as Listing[]
      return [...listingsSeed, ...stored]
    } catch {
      return listingsSeed
    }
  })
  const [offers, setOffers] = useState<Offer[]>(offersSeed)
  const [requests, setRequests] = useState<BuyerRequest[]>(requestsSeed)
  const [saved, setSaved] = useState<string[]>([])
  const [user, setUser] = useState<DemoUser | null>(() => {
    try {
      return JSON.parse(localStorage.getItem('notunayon-demo-user') || 'null') as DemoUser | null
    } catch {
      return null
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'notunayon-listings',
      JSON.stringify(listings.filter((item) => !listingsSeed.some((seed) => seed.id === item.id))),
    )
  }, [listings])

  const store = useMemo(
    () => ({
      listings,
      setListings,
      offers,
      setOffers,
      requests,
      setRequests,
      saved,
      setSaved,
      user,
      setUser,
    }),
    [listings, offers, requests, saved, user],
  )

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}
