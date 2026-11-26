import { useState, type Dispatch, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, HandCoins, RotateCcw, X } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import type { Offer, OfferStatus } from '../../types/index.ts'
import { marketplaceLabel } from '../../utils/marketplace.ts'
import EmptyState from '../ui/EmptyState.tsx'
import InlineNotice from '../ui/InlineNotice.tsx'

interface OffersTableProps {
  rows: Offer[]
  setOffers?: Dispatch<SetStateAction<Offer[]>>
  seller?: boolean
  compact?: boolean
}

const statusClasses: Record<OfferStatus, string> = {
  Accepted: 'text-chip-text bg-surface-tint',
  Rejected: 'text-danger bg-danger-soft',
  Countered: 'text-info bg-info-soft',
  Pending: 'text-pending bg-surface-warm',
}

export default function OffersTable({
  rows,
  setOffers,
  seller = false,
  compact = false,
}: OffersTableProps) {
  const { t } = useTranslation()
  const { setOffers: saveOffers } = useApp()
  const update = setOffers || saveOffers
  const [note, setNote] = useState('')

  if (!rows.length) {
    return (
      <EmptyState
        icon={<HandCoins />}
        title="No offers yet"
        text="Offers submitted through the marketplace will appear here."
      />
    )
  }

  return (
    <div
      className={`overflow-hidden rounded-[3px] border border-line bg-surface ${
        compact ? 'max-h-[330px] overflow-auto' : ''
      }`}
    >
      <div className="w-full overflow-x-auto">
        <table className={`w-full border-collapse text-left ${compact ? 'min-w-[550px]' : 'min-w-[670px]'}`}>
          <thead>
            <tr>
              {[seller ? 'Buyer' : 'Offer ID', 'Material', 'Price', 'Quantity', 'Date', 'Status / actions'].map(
                (head) => (
                  <th
                    key={head}
                    className={`bg-surface-subtle text-[8px] font-bold tracking-[0.04em] whitespace-nowrap text-muted uppercase ${
                      compact ? 'px-2 py-[9px]' : 'px-3 py-2.5'
                    }`}
                  >
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((offer) => (
              <tr key={offer.id}>
                <td
                  className={`border-t border-line-soft align-middle text-[9px] font-[650] text-ink-soft ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  {seller ? offer.buyer : offer.id}
                  <small
                    className={`mt-1 block truncate text-[8px] font-normal text-subtle ${
                      compact ? 'max-w-[170px]' : 'max-w-[225px]'
                    }`}
                  >
                    {offer.message}
                  </small>
                </td>
                <td
                  className={`border-t border-line-soft align-middle text-[9px] text-muted ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  {marketplaceLabel(t, offer.material, { id: offer.id })}
                </td>
                <td
                  className={`border-t border-line-soft align-middle text-[9px] text-muted ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  ৳{offer.price} / kg
                </td>
                <td
                  className={`border-t border-line-soft align-middle text-[9px] text-muted ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  {offer.quantity}
                </td>
                <td
                  className={`border-t border-line-soft align-middle text-[9px] text-muted ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  {offer.date}
                </td>
                <td
                  className={`border-t border-line-soft align-middle text-[9px] text-muted ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex rounded-[2px] px-1.5 py-1 text-[8px] whitespace-nowrap ${
                        statusClasses[offer.status]
                      }`}
                    >
                      {offer.status}
                    </span>
                    {seller && offer.status === 'Pending' && (
                      <div className="flex gap-1">
                        <button
                          title="Accept offer"
                          className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-line bg-surface-tint-soft text-muted hover:border-eyebrow hover:text-link"
                          onClick={() => {
                            update((items) =>
                              items.map((item) =>
                                item.id === offer.id ? { ...item, status: 'Accepted' } : item,
                              ),
                            )
                            setNote('Offer accepted.')
                          }}
                        >
                          <Check size={14} />
                        </button>
                        <button
                          title="Reject offer"
                          className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-line bg-surface-tint-soft text-muted hover:border-eyebrow hover:text-link"
                          onClick={() => {
                            update((items) =>
                              items.map((item) =>
                                item.id === offer.id ? { ...item, status: 'Rejected' } : item,
                              ),
                            )
                            setNote('Offer rejected.')
                          }}
                        >
                          <X size={14} />
                        </button>
                        <button
                          title="Counteroffer"
                          className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-line bg-surface-tint-soft text-muted hover:border-eyebrow hover:text-link"
                          onClick={() => {
                            update((items) =>
                              items.map((item) =>
                                item.id === offer.id ? { ...item, status: 'Countered' } : item,
                              ),
                            )
                            setNote('A counteroffer was recorded.')
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
