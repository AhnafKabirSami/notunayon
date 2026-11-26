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
    <div className="min-w-0 rounded-[3px] border border-[#e6eae4] bg-white px-[15px] py-[14px] max-md:p-[11px] dark:border-[#34463a] dark:bg-[#1a261f]">
      <div className="mb-[11px] flex items-center justify-between text-[#8c978d]">
        <span className="grid h-[30px] w-[30px] place-items-center rounded-[3px] bg-[#edf3eb] text-[#557a5e] dark:bg-[#223128] dark:text-[#a6c5ab] [&>svg]:w-4">
          {icon}
        </span>
        <MoreHorizontal size={17} />
      </div>
      <strong className="block text-[23px] font-[650] tracking-[-0.04em] text-[#2e4034] max-md:text-[20px] dark:text-[#edf4ef]">
        {value}
      </strong>
      <b className="mt-0.5 block text-[9px] font-[650] text-[#657168] dark:text-[#edf4ef]">
        {label}
      </b>
      <small className="mt-[7px] block text-[8px] text-[#96a096] dark:text-[#b2beb5]">{trend}</small>
    </div>
  )
}
