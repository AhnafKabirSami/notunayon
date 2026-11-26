import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, CircleHelp, ClipboardList, MapPin, Plus, Search } from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import { locations } from '../data/mockData.ts'
import RequestCard from '../components/block/RequestCard.tsx'
import Button from '../components/ui/Button.tsx'
import EmptyState from '../components/ui/EmptyState.tsx'

export default function Requests() {
  const { requests } = useApp()
  const [query, setQuery] = useState('')
  const [place, setPlace] = useState('')

  const visible = requests.filter(
    (request) =>
      (!query ||
        `${request.material} ${request.buyer} ${request.condition}`
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      (!place || request.location === place),
  )

  return (
    <main className="page-main">
      <div className="page-intro container">
        <div>
          <span className="eyebrow">Buyer requests</span>
          <h1>What are businesses looking for?</h1>
          <p>Review demonstration sourcing requirements and find materials buyers need.</p>
        </div>
        <Link className="button button-solid" to="/buyer-dashboard/requirement">
          <Plus size={16} /> Post a requirement
        </Link>
      </div>
      <div className="container">
        <div className="request-tools">
          <div className="field-with-icon">
            <Search size={17} />
            <input
              placeholder="Search material or buyer"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="select-shell">
            <MapPin size={15} />
            <select value={place} onChange={(e) => setPlace(e.target.value)}>
              <option value="">All locations</option>
              {locations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={15} />
          </div>
        </div>
        <div className="request-list">
          {visible.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
        {visible.length === 0 && (
          <EmptyState
            icon={<ClipboardList />}
            title="No requests found"
            text="Try another material or location."
            action={
              <Button
                variant="outline-dark"
                onClick={() => {
                  setQuery('')
                  setPlace('')
                }}
              >
                Clear filters
              </Button>
            }
          />
        )}
        <p className="demo-disclaimer">
          <CircleHelp size={15} /> Buyer profiles and sourcing details are illustrative demo records.
        </p>
      </div>
    </main>
  )
}
