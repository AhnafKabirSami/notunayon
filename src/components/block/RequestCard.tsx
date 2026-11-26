import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Boxes, ChevronDown, MapPin } from 'lucide-react'
import type { BuyerRequest } from '../../types/index.ts'
import { marketplaceLabel } from '../../utils/marketplace.ts'

export default function RequestCard({ request }: { request: BuyerRequest }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <article className={`request-card ${expanded ? 'request-expanded' : ''}`}>
      <div className="request-card-main">
        <div className="request-icon">
          <Boxes size={21} />
        </div>
        <div className="request-primary">
          <span className="request-category">
            {marketplaceLabel(t, request.category, { type: 'category' })}
          </span>
          <h3>{marketplaceLabel(t, request.material, { id: request.id })}</h3>
          <p>
            {request.buyer} <span>·</span> {request.date}
          </p>
        </div>
        <div className="request-detail">
          <span>Quantity</span>
          <strong>{request.quantity}</strong>
        </div>
        <div className="request-detail">
          <span>Delivery location</span>
          <strong>
            <MapPin size={14} /> {request.location}
          </strong>
        </div>
        <div className="request-detail">
          <span>Expected price</span>
          <strong>{request.budget}</strong>
        </div>
        <button
          className="button button-outline-dark request-view"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Hide details' : 'View request'} <ChevronDown size={16} />
        </button>
      </div>
      {expanded && (
        <div className="request-extra">
          <span>
            <b>Preferred condition:</b> {request.condition}
            {request.deliveryDate && (
              <>
                {' '}
                · <b>Delivery date:</b> {request.deliveryDate}
              </>
            )}
            {request.requirements && (
              <>
                {' '}
                · <b>Additional needs:</b> {request.requirements}
              </>
            )}
          </span>
          <Link className="text-link" to="/login">
            Contact buyer <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </article>
  )
}
