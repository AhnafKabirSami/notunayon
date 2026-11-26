import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import { filterListings } from '../../utils.ts'
import ListingCard from '../block/ListingCard.tsx'
import SearchBox from '../block/SearchBox.tsx'

export default function MarketplaceEmbedded() {
  const { listings } = useApp()
  const [query, setQuery] = useState('')
  const rows = filterListings(listings, query).slice(0, 6)

  return (
    <>
      <SearchBox onSearch={setQuery} compact />
      <div className="listing-grid dash-listing-grid">
        {rows.map((item) => (
          <ListingCard key={item.id} listing={item} />
        ))}
      </div>
      <Link className="button button-outline-dark" to="/marketplace">
        Open marketplace filters <ArrowRight size={16} />
      </Link>
    </>
  )
}
