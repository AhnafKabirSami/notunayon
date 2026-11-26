import { useTranslation } from 'react-i18next'
import { transactionsSeed } from '../../data/mockData.js'
import { marketplaceLabel } from '../../utils/marketplace.js'

export default function TransactionsTable({ buyer = false }) {
  const { t } = useTranslation()

  return (
    <div className="table-card">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>{buyer ? 'Seller' : 'Buyer'}</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionsSeed.map((item) => (
              <tr key={item.id}>
                <td className="table-primary">
                  {item.id}
                  <small>Demo record</small>
                </td>
                <td>{item.buyer}</td>
                <td>{marketplaceLabel(t, item.material, { id: item.id })}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>
                  <span
                    className={`status-chip ${
                      item.status === 'Completed' ? 'status-active' : 'status-pending'
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
