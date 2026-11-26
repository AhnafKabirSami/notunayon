import { useTranslation } from 'react-i18next'
import { CalendarDays, Eye, HandCoins, TrendingUp } from 'lucide-react'
import type { DashboardRole } from '../../types/index.ts'
import { marketplaceLabel } from '../../utils/marketplace.ts'
import MiniChart from '../ui/MiniChart.tsx'
import StatCard from '../ui/StatCard.tsx'
import DashPageHeader from './DashPageHeader.tsx'

export default function AnalyticsView({ type }: { type: DashboardRole }) {
  const { t } = useTranslation()
  const buyer = type === 'buyer'

  return (
    <>
      <DashPageHeader
        eyebrow={`${type} workspace`}
        title={buyer ? 'Purchase analytics' : 'Listing analytics'}
        text="Illustrative activity charts. These numbers do not represent verified marketplace performance."
      />
      <div className="stats-grid">
        <StatCard
          icon={<Eye />}
          label="Listing views"
          value={buyer ? '84' : '218'}
          trend="Sample count"
        />
        <StatCard
          icon={<HandCoins />}
          label={buyer ? 'Offers sent' : 'Offers received'}
          value={buyer ? '12' : '18'}
          trend="Illustrative"
        />
        <StatCard
          icon={<TrendingUp />}
          label={buyer ? 'Spend this month' : 'Sales this month'}
          value="৳24,500"
          trend="Demo value"
        />
        <StatCard icon={<CalendarDays />} label="Active days" value="22" trend="Sample period" />
      </div>
      <div className="dashboard-two-col">
        <div className="dash-panel">
          <div className="panel-title">
            <div>
              <h2>{buyer ? 'Sourcing activity' : 'Listing views'}</h2>
              <p>Last 7 days · illustrative data</p>
            </div>
            <span className="demo-tag">DEMO</span>
          </div>
          <MiniChart tall />
          <div className="chart-foot">
            <span>Week to date</span>
            <b>{buyer ? '12 actions' : '218 views'}</b>
          </div>
        </div>
        <div className="dash-panel">
          <div className="panel-title">
            <div>
              <h2>Category breakdown</h2>
              <p>Sample marketplace activity</p>
            </div>
          </div>
          <div className="category-bars">
            {(
              [
                ['Rice by-products', 76],
                ['Crop residues', 58],
                ['Animal manure', 42],
                ['Poultry waste', 30],
              ] as Array<[string, number]>
            ).map(([label, amount]) => (
              <div key={label}>
                <span>{marketplaceLabel(t, label, { type: 'category' })}</span>
                <div>
                  <i style={{ width: `${amount}%` }} />
                </div>
                <b>{amount}%</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
