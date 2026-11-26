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
    <div className="matching-preview">
      <div className="matching-preview-head">
        <div>
          <span className="match-avatar">
            <Sparkles size={16} />
          </span>
          <div>
            <b>Supplier match preview</b>
            <small>
              {marketplaceLabel(t, 'Rice Husk', { fixed: true })} · 1–5 MT · sample buyer
            </small>
          </div>
        </div>
        <span className="preview-tag">DEMO</span>
      </div>
      {rows.map(({ listing, score, distance, reasons }, index) => (
        <Link className="match-row" to={`/marketplace/${listing.id}`} key={listing.id}>
          <div className="match-rank">0{index + 1}</div>
          <div className="match-info">
            <b>{listing.seller}</b>
            <span>
              {marketplaceLabel(t, listing.name, { id: listing.id })} · {listing.location} ·{' '}
              {distance}
            </span>
            <small>{reasons[0]}</small>
          </div>
          <strong>
            {score}%<small>fit score</small>
          </strong>
        </Link>
      ))}
      <p className="match-disclaimer">
        Illustrative scoring preview. Not a real AI prediction or validated performance measure.
      </p>
    </div>
  )
}
