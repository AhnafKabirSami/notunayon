import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, CircleHelp, ClipboardList, MapPin, Plus, Search } from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import { locations } from '../data/mockData.ts'
import RequestCard from '../components/block/RequestCard.tsx'
import Button from '../components/ui/Button.tsx'
import { buttonClasses } from '../components/ui/buttonStyles.ts'
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
    <main className="min-h-[65vh] bg-canvas pt-[54px] pb-[85px] max-md:pt-[38px] max-md:pb-[60px]">
      <div className="mx-auto mb-8 flex w-[min(1190px,calc(100%-64px))] items-end justify-between gap-[22px] max-[1000px]:w-[min(100%-42px,850px)] max-md:mb-[22px] max-md:w-[calc(100%-36px)] max-md:flex-col max-md:items-start max-[420px]:w-[calc(100%-28px)]">
        <div>
          <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
            Buyer requests
          </span>
          <h1 className="my-2.5 mb-[9px] max-w-[760px] font-serif text-[clamp(36px,4vw,52px)] leading-[1.08] font-medium tracking-[-0.05em] text-ink max-md:text-[38px]">
            What are businesses looking for?
          </h1>
          <p className="m-0 text-[13px] leading-[1.7] text-muted max-md:text-[11px]">
            Review active sourcing requirements and find materials buyers need.
          </p>
        </div>
        <Link
          className={buttonClasses({ variant: 'solid', className: 'shrink-0' })}
          to="/buyer-dashboard/requirement"
        >
          <Plus size={16} /> Post a requirement
        </Link>
      </div>
      <div className="mx-auto w-[min(1190px,calc(100%-64px))] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
        <div className="mb-[19px] flex gap-2.5 max-md:flex-col">
          <div className="relative flex flex-1 items-center">
            <Search size={17} className="absolute left-[11px] text-subtle" />
            <input
              placeholder="Search material or buyer"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-[42px] w-full rounded-[3px] border border-input-border bg-input pr-3 pl-[34px] text-[11px] text-ink outline-none placeholder:text-placeholder"
            />
          </div>
          <div className="relative flex w-[220px] items-center rounded-[3px] bg-surface max-md:w-full">
            <MapPin size={15} className="pointer-events-none absolute left-[9px] text-subtle" />
            <select
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="h-[39px] w-full appearance-none rounded-[3px] border border-input-border bg-input pr-[31px] pl-[30px] text-[10px] text-ink-soft outline-none"
            >
              <option value="">All locations</option>
              {locations.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-2.5 text-subtle"
            />
          </div>
        </div>
        <div className="grid gap-[9px]">
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
        <p className="mt-5 mb-0 flex items-start gap-[7px] text-[10px] leading-[1.7] text-subtle">
          <CircleHelp size={15} className="mt-px shrink-0" /> Contact buyers directly via their
          active requirements or post a matching supply listing.
        </p>
      </div>
    </main>
  )
}
