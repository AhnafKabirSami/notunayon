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
      <div className="mb-4 grid grid-cols-4 gap-3 max-md:mb-2.5 max-md:grid-cols-2 max-md:gap-2">
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
      <div className="mt-3.5 grid grid-cols-2 gap-3.5 max-md:mt-[9px] max-md:grid-cols-1 max-md:gap-[9px]">
        <div className="min-w-0 rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]">
          <div className="mb-[15px] flex items-start justify-between gap-2.5">
            <div>
              <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-ink">
                {buyer ? 'Sourcing activity' : 'Listing views'}
              </h2>
              <p className="m-0 text-[9px] leading-[1.7] text-muted">
                Last 7 days · illustrative data
              </p>
            </div>
            <span className="inline-flex items-center gap-[5px] rounded-[2px] bg-surface-warm px-[7px] py-[5px] text-[8px] font-[760] tracking-[0.06em] text-pending">
              DEMO
            </span>
          </div>
          <MiniChart tall />
          <div className="flex justify-between border-t border-line-soft pt-2.5 text-[9px] text-muted">
            <span>Week to date</span>
            <b className="text-ink-soft">{buyer ? '12 actions' : '218 views'}</b>
          </div>
        </div>
        <div className="min-w-0 rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]">
          <div className="mb-[15px] flex items-start justify-between gap-2.5">
            <div>
              <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-ink">
                Category breakdown
              </h2>
              <p className="m-0 text-[9px] leading-[1.7] text-muted">
                Sample marketplace activity
              </p>
            </div>
          </div>
          <div className="grid gap-[17px] pt-2">
            {(
              [
                ['Rice by-products', 76],
                ['Crop residues', 58],
                ['Animal manure', 42],
                ['Poultry waste', 30],
              ] as Array<[string, number]>
            ).map(([label, amount]) => (
              <div key={label} className="grid grid-cols-[100px_1fr_28px] items-center gap-[7px]">
                <span className="text-[8px] text-muted">
                  {marketplaceLabel(t, label, { type: 'category' })}
                </span>
                <div className="h-1.5 rounded-[5px] bg-surface-tint">
                  <i
                    className="block h-full rounded-[5px] bg-eyebrow"
                    style={{ width: `${amount}%` }}
                  />
                </div>
                <b className="text-right text-[8px] text-ink-soft">{amount}%</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
