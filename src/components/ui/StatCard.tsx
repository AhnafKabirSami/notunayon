import type { ReactNode } from 'react'
import { MoreHorizontal } from 'lucide-react'

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string | number
  trend: string
}

export default function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <div className="min-w-0 rounded-[3px] border border-line bg-surface px-[15px] py-[14px] max-md:p-[11px]">
      <div className="mb-[11px] flex items-center justify-between text-subtle">
        <span className="grid h-[30px] w-[30px] place-items-center rounded-[3px] bg-surface-tint text-eyebrow [&>svg]:w-4">
          {icon}
        </span>
        <MoreHorizontal size={17} />
      </div>
      <strong className="block text-[23px] font-[650] tracking-[-0.04em] text-ink max-md:text-[20px]">
        {value}
      </strong>
      <b className="mt-0.5 block text-[9px] font-[650] text-muted">{label}</b>
      <small className="mt-[7px] block text-[8px] text-subtle">{trend}</small>
    </div>
  )
}
