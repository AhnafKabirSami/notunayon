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
    <div className="filter-group">
      <label>{title}</label>
      <div className="select-shell">
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {translateCategories ? marketplaceLabel(t, option, { type: 'category' }) : option}
            </option>
          ))}
        </select>
        <ChevronDown size={16} />
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
    <main className="page-main marketplace-page">
      <div className="page-intro container">
        <div>
          <span className="eyebrow">{t('marketplace.eyebrow')}</span>
          <h1>{t('marketplace.title')}</h1>
          <p>{t('marketplace.intro')}</p>
        </div>
        <Link className="button button-solid" to="/register">
          {t('common.listByProduct')} <Plus size={17} />
        </Link>
      </div>
      <div className="container">
        <div className="market-search">
          <SearchBox
            key={location.search}
            initialValue={query}
            onSearch={(value) => setSearchParams(value ? { q: value } : {})}
            compact
          />
          <span className="market-demo">
            <ShieldCheck size={15} /> {t('common.demoListingsOnly')}
          </span>
        </div>
        <div className="market-layout">
          <aside className={`filter-sidebar ${filtersOpen ? 'filters-open' : ''}`}>
            <div className="filter-head">
              <h3>
                <SlidersHorizontal size={17} /> {t('common.filters')}
              </h3>
              <button className="text-small" onClick={clear}>
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
            <div className="filter-group">
              <label>{t('marketplace.priceRange')}</label>
              <div className="range-fields">
                <input
                  aria-label={t('common.price')}
                  type="number"
                  placeholder={t('marketplace.min')}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span>—</span>
                <input
                  aria-label={t('common.price')}
                  type="number"
                  placeholder={t('marketplace.max')}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="filter-group">
              <label>{t('marketplace.minimumQuantity')}</label>
              <div className="select-shell">
                <select value={minQty} onChange={(e) => setMinQty(e.target.value)}>
                  <option value="">{t('common.anyQuantity')}</option>
                  <option value="1">1 MT or more</option>
                  <option value="2">2 MT or more</option>
                  <option value="5">5 MT or more</option>
                </select>
                <ChevronDown size={16} />
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
            <button className="button button-solid filter-apply" onClick={() => setFiltersOpen(false)}>
              {t('marketplace.showListings', { count: result.length })}
            </button>
          </aside>
          <section className="market-results">
            <div className="results-toolbar">
              <div>
                <button
                  className="mobile-filter-trigger"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter size={16} /> {t('common.filters')}{' '}
                  {activeCount > 0 && <span>{activeCount}</span>}
                </button>
                <p>
                  <strong>{result.length}</strong>{' '}
                  {t('common.noResults') === 'কোনো ফল নেই'
                    ? 'টি উপকরণ পাওয়া গেছে'
                    : 'materials found'}
                </p>
              </div>
              <div className="result-controls">
                <div className="select-shell sort-select">
                  <ArrowDownUp size={15} />
                  <select
                    aria-label={t('common.sort')}
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                  >
                    <option value="recommended">{t('marketplace.recommended')}</option>
                    <option value="price-low">{t('marketplace.priceLow')}</option>
                    <option value="price-high">{t('marketplace.priceHigh')}</option>
                    <option value="quantity">{t('marketplace.quantityHigh')}</option>
                  </select>
                  <ChevronDown size={15} />
                </div>
                <div className="view-switch">
                  <button
                    aria-label={t('common.gridView')}
                    className={!listView ? 'active' : ''}
                    onClick={() => setListView(false)}
                  >
                    ▦
                  </button>
                  <button
                    aria-label={t('common.listView')}
                    className={listView ? 'active' : ''}
                    onClick={() => setListView(true)}
                  >
                    ☷
                  </button>
                </div>
              </div>
            </div>
            {(query || activeCount > 0) && (
              <div className="active-filters">
                {query && (
                  <button onClick={() => setSearchParams({})}>
                    “{query}” <X size={13} />
                  </button>
                )}
                {activeCount > 0 && (
                  <button onClick={clear}>
                    Clear {activeCount} filters <X size={13} />
                  </button>
                )}
              </div>
            )}
            {result.length ? (
              <div className={`listing-grid ${listView ? 'listing-list-view' : ''}`}>
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
            <p className="demo-disclaimer">
              <CircleHelp size={15} /> {t('marketplace.demoDisclaimer')}
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
