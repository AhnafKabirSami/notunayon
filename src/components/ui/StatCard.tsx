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
    <div className="stat-card">
      <div className="stat-card-top">
        <span>{icon}</span>
        <MoreHorizontal size={17} />
      </div>
      <strong>{value}</strong>
      <b>{label}</b>
      <small>{trend}</small>
    </div>
  )
}
