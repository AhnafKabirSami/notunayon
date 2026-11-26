import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { listingsSeed, offersSeed, requestsSeed } from '../data/mockData.js'
import { AppContext } from './appContext.js'

export function AppProvider({ children }) {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage === 'bn' ? 'bn' : 'en'
  }, [i18n.resolvedLanguage])

  const [listings, setListings] = useState(() => {
    try {
      return [...listingsSeed, ...JSON.parse(localStorage.getItem('notunayon-listings') || '[]')]
    } catch {
      return listingsSeed
    }
  })
  const [offers, setOffers] = useState(offersSeed)
  const [requests, setRequests] = useState(requestsSeed)
  const [saved, setSaved] = useState([])
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('notunayon-demo-user') || 'null')
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
