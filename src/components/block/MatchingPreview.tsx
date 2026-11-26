import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import { marketplaceLabel } from '../../utils/marketplace.ts'
import { calculateDemoMatches } from '../../utils/matching.ts'

export default function MatchingPreview() {
  const { t } = useTranslation()
  const { listings } = useApp()
  const rows = calculateDemoMatches(listings).slice(0, 3)

  return (
    <div className="rounded-[5px] border border-line bg-surface p-5 shadow-[0_9px_26px_rgba(28,57,38,0.05)] dark:shadow-none">
      <div className="flex items-center justify-between border-b border-line-soft pb-3.5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-[4px] bg-ochre-soft text-ochre">
            <Sparkles size={16} />
          </span>
          <div>
            <b className="block text-[11px] text-ink">Supplier match preview</b>
            <small className="mt-[3px] block text-[9px] text-muted">
              {marketplaceLabel(t, 'Rice Husk', { fixed: true })} · 1–5 MT · sample buyer
            </small>
          </div>
        </div>
        <span className="inline-flex items-center gap-[5px] rounded-[2px] bg-surface-warm px-[7px] py-[5px] text-[8px] font-[760] tracking-[0.06em] text-pending">
          DEMO
        </span>
      </div>
      {rows.map(({ listing, score, distance, reasons }, index) => (
        <Link
          className="flex items-center gap-[11px] border-b border-line-soft py-3.5"
          to={`/marketplace/${listing.id}`}
          key={listing.id}
        >
          <div className="font-serif text-[15px] text-subtle">0{index + 1}</div>
          <div className="min-w-0 flex-1">
            <b className="block text-[11px] text-ink">{listing.seller}</b>
            <span className="mt-[3px] block text-[9px] text-muted">
              {marketplaceLabel(t, listing.name, { id: listing.id })} · {listing.location} ·{' '}
              {distance}
            </span>
            <small className="mt-1 block text-[9px] text-eyebrow">{reasons[0]}</small>
          </div>
          <strong className="text-right text-[14px] text-link">
            {score}%
            <small className="block text-[8px] font-medium text-subtle">fit score</small>
          </strong>
        </Link>
      ))}
      <p className="mt-[13px] mb-0 text-[9px] leading-[1.7] text-muted">
        Illustrative scoring preview. Not a real AI prediction or validated performance measure.
      </p>
    </div>
  )
}
