import { MoreHorizontal } from 'lucide-react'

export default function StatCard({ icon, label, value, trend }) {
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
