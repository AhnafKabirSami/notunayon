import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, CircleHelp, MapPin, Sparkles, Sprout } from 'lucide-react'
import { useApp } from '../../context/useApp.js'
import { calculateDemoMatches } from '../../utils/matching.js'
import { marketplaceLabel, photo } from '../../utils/marketplace.js'
import DashPageHeader from './DashPageHeader.jsx'

function RecommendationCard({ listing, match }) {
  const { t } = useTranslation()

  return (
    <article className="recommendation-card">
      <div className="recommendation-image" style={{ backgroundColor: listing.color }}>
        <img
          src={photo(listing.image, 380)}
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
      <div className="recommendation-copy">
        <span className="request-category">
          {marketplaceLabel(t, listing.category, { type: 'category' })}
        </span>
        <h3>{marketplaceLabel(t, listing.name, { id: listing.id })}</h3>
        <p>
          {listing.seller} · <MapPin size={14} /> {listing.location}{' '}
          <span>· {match.distance} (illustrative)</span>
        </p>
        <div className="recommendation-reasons">
          {match.reasons.map((reason) => (
            <span key={reason}>
              <Check size={13} /> {reason}
            </span>
          ))}
        </div>
      </div>
      <div className="recommendation-score">
        <div>
          {match.score}
          <small>%</small>
        </div>
        <span>
          Compatibility
          <br />
          demo score
        </span>
        <Link to={`/marketplace/${listing.id}`}>
          View listing <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}

export function RecommendationRow({ match }) {
  const { t } = useTranslation()
  const { listing, score, distance } = match

  return (
    <Link className="recommendation-row" to={`/marketplace/${listing.id}`}>
      <span className="row-material">
        <i style={{ backgroundColor: listing.color }}>
          <Sprout size={17} />
        </i>
        <span>
          <b>{marketplaceLabel(t, listing.name, { id: listing.id })}</b>
          <small>
            {listing.seller} · {distance}
          </small>
        </span>
      </span>
      <strong>
        {score}% <small>demo match</small>
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
      <div className="matching-config">
        <div>
          <span className="eyebrow">Sample buyer requirements</span>
          <h3>
            {marketplaceLabel(t, 'Rice Husk', { fixed: true })} · 1–5 MT · Delivery near Gazipur
          </h3>
          <p>Target price: ৳24/kg or less · Preferred condition: dry</p>
        </div>
        <span className="demo-tag">
          <Sparkles size={14} /> DEMONSTRATION PREVIEW
        </span>
      </div>
      <div className="weight-notice">
        <CircleHelp size={17} />
        <p>
          <b>Illustrative matching weights:</b> material compatibility 35%, location proximity 25%,
          quantity 20%, price 15%, condition 5%. Hard requirements like material type and minimum
          quantity are filters, not score factors. These weights are not validated performance
          metrics.
        </p>
      </div>
      <div className="recommendation-list">
        {matches.map(({ listing, ...match }) => (
          <RecommendationCard key={listing.id} listing={listing} match={match} />
        ))}
      </div>
    </>
  )
}
