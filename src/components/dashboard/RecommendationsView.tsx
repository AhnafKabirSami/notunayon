import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, CircleHelp, MapPin, Sparkles, Sprout } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import type { Listing, MatchResult } from '../../types/index.ts'
import { marketplaceLabel, photo } from '../../utils/marketplace.ts'
import { calculateDemoMatches } from '../../utils/matching.ts'
import DashPageHeader from './DashPageHeader.tsx'

interface RecommendationCardProps {
  listing: Listing
  match: Omit<MatchResult, 'listing'>
}

function RecommendationCard({ listing, match }: RecommendationCardProps) {
  const { t } = useTranslation()

  return (
    <article className="grid grid-cols-[126px_1fr_130px] items-center gap-[15px] border border-line bg-surface p-3 max-md:grid-cols-[75px_1fr] max-md:gap-2.5 max-[420px]:grid-cols-[61px_1fr] max-[420px]:p-2">
      <div
        className="h-[93px] overflow-hidden bg-media-fallback max-md:h-[75px] max-[420px]:h-[62px]"
        style={{ backgroundColor: listing.color }}
      >
        <img
          src={photo(listing.image, 380)}
          alt=""
          className="block h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
      <div>
        <span className="text-[9px] text-muted">
          {marketplaceLabel(t, listing.category, { type: 'category' })}
        </span>
        <h3 className="my-1 text-[13px] font-semibold tracking-[-0.03em] text-ink max-[420px]:text-[11px]">
          {marketplaceLabel(t, listing.name, { id: listing.id })}
        </h3>
        <p className="m-0 flex items-center gap-1 text-[8px] leading-[1.7] text-muted max-[420px]:flex-wrap max-[420px]:text-[7px]">
          {listing.seller} · <MapPin size={12} /> {listing.location} <span>· {match.distance}</span>
        </p>
        <div className="mt-[9px] flex flex-wrap gap-[5px] max-[420px]:gap-[3px]">
          {match.reasons.map((reason) => (
            <span
              key={reason}
              className="inline-flex items-center gap-[3px] bg-surface-tint px-[5px] py-1 text-[7px] text-chip-text max-md:text-[6px]"
            >
              <Check size={13} /> {reason}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center border-l border-line-soft pl-[11px] text-center max-md:col-start-2 max-md:flex-row max-md:justify-between max-md:border-t max-md:border-l-0 max-md:pt-2 max-md:pl-0 max-md:text-left">
        <div className="text-[20px] font-bold text-eyebrow">
          {match.score}
          <small className="text-[11px]">%</small>
        </div>
        <span className="text-[8px] leading-[1.4] text-muted max-md:block max-[420px]:text-[7px]">
          Compatibility
          <br />
          match score
        </span>
        <Link
          to={`/marketplace/${listing.id}`}
          className="mt-2 inline-flex items-center gap-1 text-[8px] font-[650] text-link max-md:mt-0"
        >
          View listing <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}

export function RecommendationRow({ match }: { match: MatchResult }) {
  const { t } = useTranslation()
  const { listing, score, distance } = match

  return (
    <Link
      className="flex items-center justify-between gap-2 border-b border-line-soft py-2.5"
      to={`/marketplace/${listing.id}`}
    >
      <span className="flex items-center gap-2">
        <i
          className="grid h-8 w-8 place-items-center rounded-[3px] text-white"
          style={{ backgroundColor: listing.color }}
        >
          <Sprout size={17} />
        </i>
        <span>
          <b className="block text-[9px] text-ink-soft">
            {marketplaceLabel(t, listing.name, { id: listing.id })}
          </b>
          <small className="mt-[3px] block text-[8px] text-muted">
            {listing.seller} · {distance}
          </small>
        </span>
      </span>
      <strong className="text-right text-[10px] text-link">
        {score}% <small className="mt-[3px] block text-[7px] font-[450] text-muted">match</small>
      </strong>
    </Link>
  )
}

export default function RecommendationsView() {
  const { t } = useTranslation()
  const { listings } = useApp()
  const matches = calculateDemoMatches(listings)

  return (
    <>
      <DashPageHeader
        eyebrow="AI matching"
        title="Supplier recommendations"
        text="Smart supplier ranking combining material compatibility, proximity, quantity, price, and condition."
      />
      <div className="mb-[11px] flex items-center justify-between gap-[15px] border border-line bg-surface-tint p-4 max-md:flex-col max-md:items-start">
        <div>
          <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
            Active sourcing profile
          </span>
          <h3 className="mt-[7px] mb-1 text-[13px] font-semibold tracking-[-0.03em] text-ink">
            {marketplaceLabel(t, 'Rice Husk', { fixed: true })} · 1–5 MT · Delivery near Gazipur
          </h3>
          <p className="m-0 text-[9px] leading-[1.7] text-muted">
            Target price: ৳24/kg or less · Preferred condition: dry
          </p>
        </div>
        <span className="inline-flex items-center gap-[5px] rounded-[2px] bg-surface px-[7px] py-[5px] text-[8px] font-[760] tracking-[0.06em] text-chip-text max-[420px]:text-[7px]">
          <Sparkles size={14} /> AI MATCHED
        </span>
      </div>
      <div className="mb-3 flex items-start gap-[9px] border border-line bg-surface-warm-soft p-[11px] text-muted">
        <CircleHelp size={17} className="shrink-0 text-ochre" />
        <p className="m-0 text-[9px] leading-[1.7]">
          <b className="text-ink-soft">Matching criteria weights:</b> material compatibility 35%,
          location proximity 25%, quantity 20%, price 15%, condition 5%. Material type and minimum
          quantity act as required filters before scoring.
        </p>
      </div>
      <div className="grid gap-2.5">
        {matches.map(({ listing, ...match }) => (
          <RecommendationCard key={listing.id} listing={listing} match={match} />
        ))}
      </div>
    </>
  )
}
