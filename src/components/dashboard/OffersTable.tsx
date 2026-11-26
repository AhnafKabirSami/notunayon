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
  Accepted: 'text-[#47704d] bg-[#edf4e9] dark:text-[#dfe9e2] dark:bg-[#223128]',
  Rejected: 'text-[#99574e] bg-[#f8eeeb] dark:text-[#f2b8b0] dark:bg-[#3a2220]',
  Countered: 'text-[#596d91] bg-[#eef1f7] dark:text-[#c7d5ec] dark:bg-[#222a38]',
  Pending: 'text-[#867544] bg-[#f6f2e7] dark:text-[#dfe9e2] dark:bg-[#223128]',
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
        text="Offers submitted through the demo marketplace will appear here."
      />
    )
  }

  return (
    <div
      className={`overflow-hidden rounded-[3px] border border-[#e5eae4] bg-white dark:border-[#34463a] dark:bg-[#1a261f] ${
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
                    className={`bg-[#fbfcfa] text-[8px] font-bold tracking-[0.04em] whitespace-nowrap text-[#8a948b] uppercase dark:border-[#34463a] dark:bg-[#1a261f] dark:text-[#b2beb5] ${
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
                  className={`border-t border-[#f0f2ef] align-middle text-[9px] font-[650] text-[#44584a] dark:border-[#34463a] dark:text-[#edf4ef] ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  {seller ? offer.buyer : offer.id}
                  <small
                    className={`mt-1 block truncate text-[8px] font-normal text-[#9aa29a] dark:text-[#b2beb5] ${
                      compact ? 'max-w-[170px]' : 'max-w-[225px]'
                    }`}
                  >
                    {offer.message}
                  </small>
                </td>
                <td
                  className={`border-t border-[#f0f2ef] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5] ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  {marketplaceLabel(t, offer.material, { id: offer.id })}
                </td>
                <td
                  className={`border-t border-[#f0f2ef] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5] ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  ৳{offer.price} / kg
                </td>
                <td
                  className={`border-t border-[#f0f2ef] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5] ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  {offer.quantity}
                </td>
                <td
                  className={`border-t border-[#f0f2ef] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5] ${
                    compact ? 'px-2 py-[9px]' : 'px-3 py-[11px]'
                  }`}
                >
                  {offer.date}
                </td>
                <td
                  className={`border-t border-[#f0f2ef] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5] ${
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
                          className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-[#e8ece6] bg-[#f5f7f4] text-[#65746a] hover:border-[#a4baa4] hover:text-[#315e3d] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
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
                          className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-[#e8ece6] bg-[#f5f7f4] text-[#65746a] hover:border-[#a4baa4] hover:text-[#315e3d] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
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
                          className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-[#e8ece6] bg-[#f5f7f4] text-[#65746a] hover:border-[#a4baa4] hover:text-[#315e3d] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
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
