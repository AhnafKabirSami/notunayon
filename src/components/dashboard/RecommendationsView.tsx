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
    <article className="grid grid-cols-[126px_1fr_130px] items-center gap-[15px] border border-[#e6ebe4] bg-white p-3 max-md:grid-cols-[75px_1fr] max-md:gap-2.5 max-[420px]:grid-cols-[61px_1fr] max-[420px]:p-2 dark:border-[#34463a] dark:bg-[#1a261f]">
      <div
        className="h-[93px] overflow-hidden bg-[#baa978] max-md:h-[75px] max-[420px]:h-[62px]"
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
        <span className="text-[9px] text-[#758377] dark:text-[#b2beb5]">
          {marketplaceLabel(t, listing.category, { type: 'category' })}
        </span>
        <h3 className="my-1 text-[13px] font-semibold tracking-[-0.03em] text-[#252e28] max-[420px]:text-[11px] dark:text-[#edf4ef]">
          {marketplaceLabel(t, listing.name, { id: listing.id })}
        </h3>
        <p className="m-0 flex items-center gap-1 text-[8px] leading-[1.7] text-[#737c75] max-[420px]:flex-wrap max-[420px]:text-[7px] dark:text-[#b2beb5]">
          {listing.seller} · <MapPin size={12} /> {listing.location}{' '}
          <span>· {match.distance} (illustrative)</span>
        </p>
        <div className="mt-[9px] flex flex-wrap gap-[5px] max-[420px]:gap-[3px]">
          {match.reasons.map((reason) => (
            <span
              key={reason}
              className="inline-flex items-center gap-[3px] bg-[#f0f4ed] px-[5px] py-1 text-[7px] text-[#5c725f] max-md:text-[6px] dark:bg-[#223128] dark:text-[#dfe9e2]"
            >
              <Check size={13} /> {reason}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center border-l border-[#edf0ec] pl-[11px] text-center max-md:col-start-2 max-md:flex-row max-md:justify-between max-md:border-t max-md:border-l-0 max-md:pt-2 max-md:pl-0 max-md:text-left dark:border-[#34463a]">
        <div className="text-[20px] font-bold text-[#3e754b] dark:text-[#a6c5ab]">
          {match.score}
          <small className="text-[11px]">%</small>
        </div>
        <span className="text-[8px] leading-[1.4] text-[#919b92] max-md:block max-[420px]:text-[7px] dark:text-[#b2beb5]">
          Compatibility
          <br />
          demo score
        </span>
        <Link
          to={`/marketplace/${listing.id}`}
          className="mt-2 inline-flex items-center gap-1 text-[8px] font-[650] text-[#4a7453] max-md:mt-0 dark:text-[#dbe8df]"
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
      className="flex items-center justify-between gap-2 border-b border-[#edf0ec] py-2.5 dark:border-[#34463a]"
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
          <b className="block text-[9px] text-[#4d5e51] dark:text-[#edf4ef]">
            {marketplaceLabel(t, listing.name, { id: listing.id })}
          </b>
          <small className="mt-[3px] block text-[8px] text-[#8f9990] dark:text-[#b2beb5]">
            {listing.seller} · {distance}
          </small>
        </span>
      </span>
      <strong className="text-right text-[10px] text-[#39704a] dark:text-[#edf4ef]">
        {score}%{' '}
        <small className="mt-[3px] block text-[7px] font-[450] text-[#98a098] dark:text-[#b2beb5]">
          demo match
        </small>
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
        eyebrow="AI matching · demonstration preview"
        title="Supplier recommendations"
        text="A simple illustrative ranking that combines material, location, quantity, price, and condition fit."
      />
      <div className="mb-[11px] flex items-center justify-between gap-[15px] border border-[#dfe9dc] bg-[#eef4ed] p-4 max-md:flex-col max-md:items-start dark:border-[#34463a] dark:bg-[#1a261f]">
        <div>
          <span className="text-[10px] font-[760] tracking-[0.13em] text-[#63806b] uppercase dark:text-[#a6c5ab]">
            Sample buyer requirements
          </span>
          <h3 className="mt-[7px] mb-1 text-[13px] font-semibold tracking-[-0.03em] text-[#252e28] dark:text-[#edf4ef]">
            {marketplaceLabel(t, 'Rice Husk', { fixed: true })} · 1–5 MT · Delivery near Gazipur
          </h3>
          <p className="m-0 text-[9px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
            Target price: ৳24/kg or less · Preferred condition: dry
          </p>
        </div>
        <span className="inline-flex items-center gap-[5px] rounded-[2px] bg-[#f5f1e7] px-[7px] py-[5px] text-[8px] font-[760] tracking-[0.06em] text-[#827144] max-[420px]:text-[7px] dark:bg-[#223128] dark:text-[#dfe9e2]">
          <Sparkles size={14} /> DEMONSTRATION PREVIEW
        </span>
      </div>
      <div className="mb-3 flex items-start gap-[9px] border border-[#eee9dc] bg-[#faf8f1] p-[11px] text-[#687569] dark:border-[#34463a] dark:bg-[#1a261f] dark:text-[#b2beb5]">
        <CircleHelp size={17} className="shrink-0 text-[#977d47]" />
        <p className="m-0 text-[9px] leading-[1.7]">
          <b className="text-[#555f51] dark:text-[#edf4ef]">Illustrative matching weights:</b>{' '}
          material compatibility 35%, location proximity 25%, quantity 20%, price 15%, condition
          5%. Hard requirements like material type and minimum quantity are filters, not score
          factors. These weights are not validated performance metrics.
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
