import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Heart, MapPin, Package } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import type { Listing } from '../../types/index.ts'
import { formatPrice } from '../../utils.ts'
import { marketplaceLabel, photo } from '../../utils/marketplace.ts'

interface ListingCardProps {
  listing: Listing
  horizontal?: boolean
}

export default function ListingCard({ listing, horizontal = false }: ListingCardProps) {
  const { t } = useTranslation()
  const { saved, setSaved } = useApp()
  const isSaved = saved.includes(listing.id)

  return (
    <article className={`listing-card ${horizontal ? 'listing-horizontal' : ''}`}>
      <Link
        to={`/marketplace/${listing.id}`}
        className="listing-image"
        style={{ backgroundColor: listing.color }}
      >
        <img
          src={photo(listing.image, 650)}
          alt={marketplaceLabel(t, listing.name, { id: listing.id })}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <span className="listing-category">
          {marketplaceLabel(t, listing.category, { type: 'category' })}
        </span>
        <button
          className={`save-button ${isSaved ? 'is-saved' : ''}`}
          type="button"
          aria-label={isSaved ? t('common.save') : t('marketplace.save')}
          onClick={(e) => {
            e.preventDefault()
            setSaved(
              isSaved ? saved.filter((id) => id !== listing.id) : [...saved, listing.id],
            )
          }}
        >
          <Heart size={17} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </Link>
      <div className="listing-body">
        <div className="listing-title-row">
          <Link className="listing-title" to={`/marketplace/${listing.id}`}>
            {marketplaceLabel(t, listing.name, { id: listing.id })}
          </Link>
          <strong>{formatPrice(listing.price, listing.unit)}</strong>
        </div>
        <span className="listing-seller">{listing.seller}</span>
        <div className="listing-meta">
          <span>
            <MapPin size={14} />
            {listing.location}
          </span>
          <span>
            <Package size={14} />
            {listing.quantity} {listing.quantityUnit}
          </span>
        </div>
        <div className="listing-tags">
          <span>{listing.condition}</span>
          <span>{listing.availability}</span>
        </div>
        <Link className="listing-link" to={`/marketplace/${listing.id}`}>
          {t('common.view')} {t('common.more')} <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  )
}
