import { useTranslation } from 'react-i18next'
import { transactionsSeed } from '../../data/mockData.ts'
import { marketplaceLabel } from '../../utils/marketplace.ts'

export default function TransactionsTable({ buyer = false }: { buyer?: boolean }) {
  const { t } = useTranslation()

  return (
    <div className="overflow-hidden rounded-[3px] border border-[#e5eae4] bg-white dark:border-[#34463a] dark:bg-[#1a261f]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[670px] border-collapse text-left">
          <thead>
            <tr>
              {['Transaction ID', buyer ? 'Seller' : 'Buyer', 'Material', 'Quantity', 'Amount', 'Date', 'Status'].map(
                (head) => (
                  <th
                    key={head}
                    className="bg-[#fbfcfa] px-3 py-2.5 text-[8px] font-bold tracking-[0.04em] whitespace-nowrap text-[#8a948b] uppercase dark:border-[#34463a] dark:bg-[#1a261f] dark:text-[#b2beb5]"
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
                <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] font-[650] text-[#44584a] dark:border-[#34463a] dark:text-[#edf4ef]">
                  {item.id}
                  <small className="mt-1 block max-w-[225px] truncate text-[8px] font-normal text-[#9aa29a] dark:text-[#b2beb5]">
                    Demo record
                  </small>
                </td>
                <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                  {item.buyer}
                </td>
                <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                  {marketplaceLabel(t, item.material, { id: item.id })}
                </td>
                <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                  {item.quantity}
                </td>
                <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                  {item.amount}
                </td>
                <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                  {item.date}
                </td>
                <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                  <span
                    className={`inline-flex rounded-[2px] px-1.5 py-1 text-[8px] whitespace-nowrap ${
                      item.status === 'Completed'
                        ? 'bg-[#edf4e9] text-[#47704d] dark:bg-[#223128] dark:text-[#dfe9e2]'
                        : 'bg-[#f6f2e7] text-[#867544] dark:bg-[#223128] dark:text-[#dfe9e2]'
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
