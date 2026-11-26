import { useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowDownUp,
  ChevronDown,
  CircleHelp,
  Filter,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import { categories, locations } from '../data/mockData.ts'
import { filterListings } from '../utils.ts'
import { marketplaceLabel } from '../utils/marketplace.ts'
import ListingCard from '../components/block/ListingCard.tsx'
import SearchBox from '../components/block/SearchBox.tsx'
import Button from '../components/ui/Button.tsx'
import { buttonClasses } from '../components/ui/buttonStyles.ts'
import EmptyState from '../components/ui/EmptyState.tsx'

interface FilterSelectProps {
  title: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder: string
  translateCategories?: boolean
}

function FilterSelect({
  title,
  value,
  onChange,
  options,
  placeholder,
  translateCategories = false,
}: FilterSelectProps) {
  const { t } = useTranslation()
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-[10px] font-[680] text-muted">{title}</label>
      <div className="relative flex items-center rounded-[3px] bg-surface">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[39px] w-full appearance-none rounded-[3px] border border-input-border bg-input pr-[31px] pl-2.5 text-[10px] text-ink-soft outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {translateCategories ? marketplaceLabel(t, option, { type: 'category' }) : option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-2.5 text-subtle"
        />
      </div>
    </div>
  )
}

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'quantity'

export default function Marketplace() {
  const { t } = useTranslation()
  const { listings } = useApp()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [category, setCategory] = useState('')
  const [place, setPlace] = useState('')
  const [condition, setCondition] = useState('')
  const [availability, setAvailability] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minQty, setMinQty] = useState('')
  const [sort, setSort] = useState<SortOption>('recommended')
  const [listView, setListView] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const result = useMemo(() => {
    let rows = filterListings(listings, query).filter(
      (item) =>
        (!category || item.category === category) &&
        (!place || item.location === place) &&
        (!condition || item.condition === condition) &&
        (!availability || item.availability === availability) &&
        (!minPrice || item.price >= Number(minPrice)) &&
        (!maxPrice || item.price <= Number(maxPrice)) &&
        (!minQty || item.quantity >= Number(minQty)),
    )
    if (sort === 'price-low') rows = [...rows].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') rows = [...rows].sort((a, b) => b.price - a.price)
    if (sort === 'quantity') rows = [...rows].sort((a, b) => b.quantity - a.quantity)
    return rows
  }, [listings, query, category, place, condition, availability, minPrice, maxPrice, minQty, sort])

  const clear = () => {
    setSearchParams({})
    setCategory('')
    setPlace('')
    setCondition('')
    setAvailability('')
    setMinPrice('')
    setMaxPrice('')
    setMinQty('')
  }

  const activeCount = [category, place, condition, availability, minPrice, maxPrice, minQty].filter(
    Boolean,
  ).length

  return (
    <main className="min-h-[65vh] bg-canvas pt-[54px] pb-[85px] max-md:pt-[38px] max-md:pb-[60px]">
      <div className="mx-auto mb-8 flex w-[min(1190px,calc(100%-64px))] items-end justify-between gap-[22px] max-[1000px]:w-[min(100%-42px,850px)] max-md:mb-[22px] max-md:w-[calc(100%-36px)] max-md:flex-col max-md:items-start max-[420px]:w-[calc(100%-28px)]">
        <div>
          <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
            {t('marketplace.eyebrow')}
          </span>
          <h1 className="my-2.5 mb-[9px] max-w-[760px] font-serif text-[clamp(36px,4vw,52px)] leading-[1.08] font-medium tracking-[-0.05em] text-ink max-md:text-[38px]">
            {t('marketplace.title')}
          </h1>
          <p className="m-0 text-[13px] leading-[1.7] text-muted max-md:text-[11px]">
            {t('marketplace.intro')}
          </p>
        </div>
        <Link className={buttonClasses({ variant: 'solid', className: 'shrink-0' })} to="/register">
          {t('common.listByProduct')} <Plus size={17} />
        </Link>
      </div>
      <div className="mx-auto w-[min(1190px,calc(100%-64px))] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
        <div className="mb-[27px] flex items-center gap-[15px] max-md:flex-col max-md:items-start max-md:gap-[9px]">
          <SearchBox
            key={location.search}
            initialValue={query}
            onSearch={(value) => setSearchParams(value ? { q: value } : {})}
            compact
            className="max-w-[820px] flex-1 max-md:w-full"
          />
          <span className="inline-flex items-center gap-1.5 text-[10px] whitespace-nowrap text-muted max-md:text-[9px]">
            <ShieldCheck size={15} className="text-eyebrow" /> {t('common.demoListingsOnly')}
          </span>
        </div>
        <div className="grid grid-cols-[235px_1fr] items-start gap-[25px] max-[1000px]:grid-cols-[205px_1fr] max-[1000px]:gap-[15px] max-md:block">
          <aside
            className={`rounded-[4px] border border-line bg-surface-subtle p-[17px] max-md:fixed max-md:inset-y-0 max-md:right-0 max-md:left-auto max-md:z-40 max-md:w-[min(330px,88vw)] max-md:overflow-y-auto max-md:p-[22px] max-md:shadow-[-10px_0_35px_rgba(0,0,0,0.14)] ${
              filtersOpen ? 'max-md:block' : 'max-md:hidden'
            }`}
          >
            <div className="mb-[17px] flex items-center justify-between border-line">
              <h3 className="m-0 flex items-center gap-[7px] text-[13px] font-semibold tracking-[-0.03em] text-ink">
                <SlidersHorizontal size={17} className="text-eyebrow" /> {t('common.filters')}
              </h3>
              <button
                className="border-0 bg-transparent p-0 text-[10px] text-link"
                onClick={clear}
              >
                {t('common.clearAll')}
              </button>
            </div>
            <FilterSelect
              title={t('marketplace.materialCategory')}
              value={category}
              onChange={setCategory}
              options={categories}
              placeholder={t('common.allCategories')}
              translateCategories
            />
            <FilterSelect
              title={t('common.location')}
              value={place}
              onChange={setPlace}
              options={locations}
              placeholder={t('common.allLocations')}
            />
            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] font-[680] text-muted">
                {t('marketplace.priceRange')}
              </label>
              <div className="flex items-center gap-1.5 text-[10px] text-subtle">
                <input
                  aria-label={t('common.price')}
                  type="number"
                  placeholder={t('marketplace.min')}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="h-[37px] w-1/2 min-w-0 rounded-[3px] border border-input-border bg-input px-[9px] text-[10px] text-ink outline-none"
                />
                <span>—</span>
                <input
                  aria-label={t('common.price')}
                  type="number"
                  placeholder={t('marketplace.max')}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="h-[37px] w-1/2 min-w-0 rounded-[3px] border border-input-border bg-input px-[9px] text-[10px] text-ink outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-1.5 block text-[10px] font-[680] text-muted">
                {t('marketplace.minimumQuantity')}
              </label>
              <div className="relative flex items-center rounded-[3px] bg-surface">
                <select
                  value={minQty}
                  onChange={(e) => setMinQty(e.target.value)}
                  className="h-[39px] w-full appearance-none rounded-[3px] border border-input-border bg-input pr-[31px] pl-2.5 text-[10px] text-ink-soft outline-none"
                >
                  <option value="">{t('common.anyQuantity')}</option>
                  <option value="1">1 MT or more</option>
                  <option value="2">2 MT or more</option>
                  <option value="5">5 MT or more</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-2.5 text-subtle"
                />
              </div>
            </div>
            <FilterSelect
              title={t('common.condition')}
              value={condition}
              onChange={setCondition}
              options={[...new Set(listings.map((item) => item.condition))]}
              placeholder={t('common.anyCondition')}
            />
            <FilterSelect
              title={t('common.availability')}
              value={availability}
              onChange={setAvailability}
              options={[...new Set(listings.map((item) => item.availability))]}
              placeholder={t('common.anyAvailability')}
            />
            <button
              className={buttonClasses({
                variant: 'solid',
                className: 'hidden w-full min-h-[39px] max-md:inline-flex',
              })}
              onClick={() => setFiltersOpen(false)}
            >
              {t('marketplace.showListings', { count: result.length })}
            </button>
          </aside>
          <section>
            <div className="mb-[13px] flex min-h-[42px] items-center justify-between max-[420px]:items-start max-[420px]:gap-2">
              <div className="flex items-center gap-[13px] max-md:gap-2">
                <button
                  className="hidden items-center gap-[5px] rounded-[3px] border-0 bg-surface-tint px-2 py-1.5 text-[9px] text-chip-text max-md:inline-flex"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter size={16} /> {t('common.filters')}{' '}
                  {activeCount > 0 && (
                    <span className="inline-grid h-[15px] w-[15px] place-items-center rounded-full bg-accent text-[8px] text-on-accent">
                      {activeCount}
                    </span>
                  )}
                </button>
                <p className="m-0 text-[11px] leading-[1.7] text-muted max-md:text-[9px]">
                  <strong className="text-ink">{result.length}</strong>{' '}
                  {t('common.noResults') === 'কোনো ফল নেই'
                    ? 'টি উপকরণ পাওয়া গেছে'
                    : 'materials found'}
                </p>
              </div>
              <div className="flex items-center gap-[9px] max-[420px]:gap-1">
                <div className="relative flex min-w-[190px] items-center rounded-[3px] bg-surface max-md:min-w-[155px] max-[420px]:min-w-[124px]">
                  <ArrowDownUp size={15} className="hidden" />
                  <select
                    aria-label={t('common.sort')}
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="h-9 w-full appearance-none rounded-[3px] border border-input-border bg-input pr-[31px] pl-2.5 text-[10px] text-ink-soft outline-none max-md:text-[8px]"
                  >
                    <option value="recommended">{t('marketplace.recommended')}</option>
                    <option value="price-low">{t('marketplace.priceLow')}</option>
                    <option value="price-high">{t('marketplace.priceHigh')}</option>
                    <option value="quantity">{t('marketplace.quantityHigh')}</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-2.5 text-subtle"
                  />
                </div>
                <div className="flex rounded-[3px] border border-line max-md:hidden">
                  <button
                    aria-label={t('common.gridView')}
                    className={`h-[33px] w-8 border-0 text-[17px] ${
                      !listView ? 'bg-surface-tint text-link' : 'bg-surface text-subtle'
                    }`}
                    onClick={() => setListView(false)}
                  >
                    ▦
                  </button>
                  <button
                    aria-label={t('common.listView')}
                    className={`h-[33px] w-8 border-0 text-[17px] ${
                      listView ? 'bg-surface-tint text-link' : 'bg-surface text-subtle'
                    }`}
                    onClick={() => setListView(true)}
                  >
                    ☷
                  </button>
                </div>
              </div>
            </div>
            {(query || activeCount > 0) && (
              <div className="mb-3 flex gap-[7px]">
                {query && (
                  <button
                    className="inline-flex items-center gap-[5px] rounded-[3px] border-0 bg-surface-tint px-[7px] py-[5px] text-[9px] text-chip-text"
                    onClick={() => setSearchParams({})}
                  >
                    “{query}” <X size={13} />
                  </button>
                )}
                {activeCount > 0 && (
                  <button
                    className="inline-flex items-center gap-[5px] rounded-[3px] border-0 bg-surface-tint px-[7px] py-[5px] text-[9px] text-chip-text"
                    onClick={clear}
                  >
                    Clear {activeCount} filters <X size={13} />
                  </button>
                )}
              </div>
            )}
            {result.length ? (
              <div
                className={`grid gap-[17px] max-md:gap-2.5 ${
                  listView ? 'grid-cols-1' : 'grid-cols-3 max-[1000px]:grid-cols-2'
                }`}
              >
                {result.map((item) => (
                  <ListingCard key={item.id} listing={item} horizontal={listView} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Search />}
                title={t('marketplace.noMatchTitle')}
                text={t('marketplace.noMatchText')}
                action={
                  <Button onClick={clear}>
                    {t('common.clearFilters')} <RotateCcw size={15} />
                  </Button>
                }
              />
            )}
            <p className="mt-5 mb-0 flex items-start gap-[7px] text-[10px] leading-[1.7] text-subtle">
              <CircleHelp size={15} className="mt-px shrink-0" /> {t('marketplace.demoDisclaimer')}
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
