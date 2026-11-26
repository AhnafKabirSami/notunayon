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
    <article
      className={`group overflow-hidden rounded-[4px] border border-line bg-surface transition duration-150 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_35px_rgba(29,48,37,0.08)] dark:hover:shadow-none ${
        horizontal
          ? 'grid grid-cols-[190px_1fr] max-md:grid-cols-[110px_1fr] max-[420px]:grid-cols-[92px_1fr]'
          : ''
      }`}
    >
      <Link
        to={`/marketplace/${listing.id}`}
        className={`relative block overflow-hidden bg-media-fallback ${
          horizontal
            ? 'h-full min-h-[190px] max-md:min-h-[185px]'
            : 'h-[184px] max-md:h-[145px] max-[420px]:h-[125px]'
        }`}
        style={{ backgroundColor: listing.color }}
      >
        <img
          src={photo(listing.image, 650)}
          alt={marketplaceLabel(t, listing.name, { id: listing.id })}
          loading="lazy"
          className="block h-full w-full object-cover transition duration-350 group-hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <span className="listing-category absolute top-[11px] left-[11px] rounded-[2px] bg-white/[0.94] px-[7px] py-[5px] text-[9px] font-[620] text-forest-dark">
          {marketplaceLabel(t, listing.category, { type: 'category' })}
        </span>
        <button
          className={`absolute top-2.5 right-2.5 grid h-[31px] w-[31px] place-items-center rounded-full border-0 bg-white hover:text-heart ${
            isSaved ? 'text-heart' : 'text-forest-dark'
          }`}
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
      <div
        className={
          horizontal ? 'p-[19px] max-md:p-[11px]' : 'px-4 pt-[15px] pb-[13px] max-md:p-3'
        }
      >
        <div className="flex items-start justify-between gap-2 max-md:flex-col max-md:gap-1">
          <Link
            className="listing-title text-[15px] font-[720] text-ink max-md:text-[12px]"
            to={`/marketplace/${listing.id}`}
          >
            {marketplaceLabel(t, listing.name, { id: listing.id })}
          </Link>
          <strong className="mt-0.5 text-[11px] whitespace-nowrap text-link max-md:text-[10px]">
            {formatPrice(listing.price, listing.unit)}
          </strong>
        </div>
        <span className="listing-seller mt-[5px] block text-[10px] text-muted">
          {listing.seller}
        </span>
        <div className="listing-meta mt-3.5 flex gap-4 text-[10px] text-muted max-md:mt-2.5 max-md:flex-col max-md:gap-1.5 max-[420px]:text-[8px]">
          <span className="flex items-center gap-[5px]">
            <MapPin size={14} className="text-eyebrow" />
            {listing.location}
          </span>
          <span className="flex items-center gap-[5px]">
            <Package size={14} className="text-eyebrow" />
            {listing.quantity} {listing.quantityUnit}
          </span>
        </div>
        <div className="listing-tags mt-[13px] flex flex-wrap gap-1.5 max-[420px]:gap-[3px]">
          <span className="rounded-[2px] bg-surface-tint px-1.5 py-1 text-[9px] text-chip-text max-md:text-[7px] max-[420px]:px-1 max-[420px]:py-[3px]">
            {listing.condition}
          </span>
          <span className="rounded-[2px] bg-surface-tint px-1.5 py-1 text-[9px] text-chip-text max-md:text-[7px] max-[420px]:px-1 max-[420px]:py-[3px]">
            {listing.availability}
          </span>
        </div>
        <Link
          className={`mt-3.5 flex items-center justify-between border-t border-line-soft pt-[11px] text-[10px] font-bold text-link max-md:mt-2.5 ${
            horizontal ? 'max-w-[280px]' : ''
          }`}
          to={`/marketplace/${listing.id}`}
        >
          {t('common.view')} {t('common.more')} <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  )
}
