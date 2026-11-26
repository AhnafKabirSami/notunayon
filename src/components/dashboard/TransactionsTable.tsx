import { useTranslation } from 'react-i18next'
import { transactionsSeed } from '../../data/mockData.ts'
import { marketplaceLabel } from '../../utils/marketplace.ts'

export default function TransactionsTable({ buyer = false }: { buyer?: boolean }) {
  const { t } = useTranslation()

  return (
    <div className="overflow-hidden rounded-[3px] border border-line bg-surface">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[670px] border-collapse text-left">
          <thead>
            <tr>
              {['Transaction ID', buyer ? 'Seller' : 'Buyer', 'Material', 'Quantity', 'Amount', 'Date', 'Status'].map(
                (head) => (
                  <th
                    key={head}
                    className="bg-surface-subtle px-3 py-2.5 text-[8px] font-bold tracking-[0.04em] whitespace-nowrap text-muted uppercase"
                  >
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {transactionsSeed.map((item) => (
              <tr key={item.id}>
                <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] font-[650] text-ink-soft">
                  {item.id}
                  <small className="mt-1 block max-w-[225px] truncate text-[8px] font-normal text-subtle">
                    Order record
                  </small>
                </td>
                <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                  {item.buyer}
                </td>
                <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                  {marketplaceLabel(t, item.material, { id: item.id })}
                </td>
                <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                  {item.quantity}
                </td>
                <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                  {item.amount}
                </td>
                <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                  {item.date}
                </td>
                <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                  <span
                    className={`inline-flex rounded-[2px] px-1.5 py-1 text-[8px] whitespace-nowrap ${
                      item.status === 'Completed'
                        ? 'bg-surface-tint text-chip-text'
                        : 'bg-surface-warm text-pending'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
