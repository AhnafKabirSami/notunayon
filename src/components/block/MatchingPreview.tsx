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
    <div className="rounded-[5px] border border-[#e3e9e1] bg-white p-5 shadow-[0_9px_26px_rgba(28,57,38,0.05)] dark:border-[#34463a] dark:bg-[#1a261f] dark:shadow-none">
      <div className="flex items-center justify-between border-b border-[#edf0ec] pb-3.5 dark:border-[#34463a]">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-[4px] bg-[#f3eddf] text-[#856934] dark:bg-[#223128] dark:text-[#a6c5ab]">
            <Sparkles size={16} />
          </span>
          <div>
            <b className="block text-[11px] text-[#334139] dark:text-[#edf4ef]">
              Supplier match preview
            </b>
            <small className="mt-[3px] block text-[9px] text-[#849087] dark:text-[#b2beb5]">
              {marketplaceLabel(t, 'Rice Husk', { fixed: true })} · 1–5 MT · sample buyer
            </small>
          </div>
        </div>
        <span className="inline-flex items-center gap-[5px] rounded-[2px] bg-[#f5f1e7] px-[7px] py-[5px] text-[8px] font-[760] tracking-[0.06em] text-[#827144] dark:bg-[#223128] dark:text-[#dfe9e2]">
          DEMO
        </span>
      </div>
      {rows.map(({ listing, score, distance, reasons }, index) => (
        <Link
          className="flex items-center gap-[11px] border-b border-[#eff1ee] py-3.5 dark:border-[#34463a]"
          to={`/marketplace/${listing.id}`}
          key={listing.id}
        >
          <div className="font-serif text-[15px] text-[#a0aca3]">0{index + 1}</div>
          <div className="min-w-0 flex-1">
            <b className="block text-[11px] text-[#34443a] dark:text-[#edf4ef]">
              {listing.seller}
            </b>
            <span className="mt-[3px] block text-[9px] text-[#768178] dark:text-[#b2beb5]">
              {marketplaceLabel(t, listing.name, { id: listing.id })} · {listing.location} ·{' '}
              {distance}
            </span>
            <small className="mt-1 block text-[9px] text-[#628069] dark:text-[#a6c5ab]">
              {reasons[0]}
            </small>
          </div>
          <strong className="text-right text-[14px] text-[#2d6542] dark:text-[#edf4ef]">
            {score}%
            <small className="block text-[8px] font-medium text-[#929a93] dark:text-[#b2beb5]">
              fit score
            </small>
          </strong>
        </Link>
      ))}
      <p className="mt-[13px] mb-0 text-[9px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
        Illustrative scoring preview. Not a real AI prediction or validated performance measure.
      </p>
    </div>
  )
}
