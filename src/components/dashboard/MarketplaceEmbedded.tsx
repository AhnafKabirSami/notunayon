import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import { filterListings } from '../../utils.ts'
import ListingCard from '../block/ListingCard.tsx'
import SearchBox from '../block/SearchBox.tsx'
import { buttonClasses } from '../ui/buttonStyles.ts'

export default function MarketplaceEmbedded() {
  const { listings } = useApp()
  const [query, setQuery] = useState('')
  const rows = filterListings(listings, query).slice(0, 6)

  return (
    <>
      <SearchBox onSearch={setQuery} compact />
      <div className="my-[15px] grid grid-cols-3 gap-[17px] max-[1000px]:grid-cols-2 max-md:gap-2.5">
        {rows.map((item) => (
          <ListingCard key={item.id} listing={item} />
        ))}
      </div>
      <Link className={buttonClasses({ variant: 'outline-dark' })} to="/marketplace">
        Open marketplace filters <ArrowRight size={16} />
      </Link>
    </>
  )
}
