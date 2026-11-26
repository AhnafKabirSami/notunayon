import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, HandCoins, RotateCcw, X } from 'lucide-react'
import { useApp } from '../../context/useApp.js'
import { marketplaceLabel } from '../../utils/marketplace.js'
import EmptyState from '../ui/EmptyState.jsx'
import InlineNotice from '../ui/InlineNotice.jsx'

export default function OffersTable({ rows, setOffers, seller = false, compact = false }) {
  const { t } = useTranslation()
  const { setOffers: saveOffers } = useApp()
  const update = setOffers || saveOffers
  const [note, setNote] = useState('')

  if (!rows.length) {
    return (
      <EmptyState
        icon={<HandCoins />}
        title="No offers yet"
        text="Offers submitted through the demo marketplace will appear here."
      />
    )
  }

  return (
    <div className={`table-card ${compact ? 'compact-table' : ''}`}>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>{seller ? 'Buyer' : 'Offer ID'}</th>
              <th>Material</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Status / actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((offer) => (
              <tr key={offer.id}>
                <td className="table-primary">
                  {seller ? offer.buyer : offer.id}
                  <small>{offer.message}</small>
                </td>
                <td>{marketplaceLabel(t, offer.material, { id: offer.id })}</td>
                <td>৳{offer.price} / kg</td>
                <td>{offer.quantity}</td>
                <td>{offer.date}</td>
                <td>
                  <div className="offer-action-cell">
                    <span className={`status-chip status-${offer.status.toLowerCase()}`}>
                      {offer.status}
                    </span>
                    {seller && offer.status === 'Pending' && (
                      <div className="table-actions">
                        <button
                          title="Accept offer"
                          onClick={() => {
                            update((items) =>
                              items.map((item) =>
                                item.id === offer.id ? { ...item, status: 'Accepted' } : item,
                              ),
                            )
                            setNote('Offer accepted in this local demo.')
                          }}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          title="Reject offer"
                          onClick={() => {
                            update((items) =>
                              items.map((item) =>
                                item.id === offer.id ? { ...item, status: 'Rejected' } : item,
                              ),
                            )
                            setNote('Offer rejected in this local demo.')
                          }}
                        >
                          <X size={14} />
                        </button>
                        <button
                          title="Counteroffer"
                          onClick={() => {
                            update((items) =>
                              items.map((item) =>
                                item.id === offer.id ? { ...item, status: 'Countered' } : item,
                              ),
                            )
                            setNote('A counteroffer was recorded in this local demo.')
                          }}
                        >
                          <RotateCcw size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <InlineNotice text={note} />}
    </div>
  )
}
