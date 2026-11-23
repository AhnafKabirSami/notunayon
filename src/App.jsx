import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  ArrowDownUp, ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, Bell, Boxes,
  Check, CheckCircle2, ChevronDown, ChevronRight, CircleHelp, ClipboardList,
  Filter, Heart, Menu, MessageCircle, Package, Plus, Search, Send, ShieldCheck,
  SlidersHorizontal, Sprout, Truck, UserRound, Users, X, MapPin, Wheat, HandCoins,
  BriefcaseBusiness, Recycle, Sparkles, Mail, Phone, LayoutDashboard, Settings, Eye,
  Pencil, Trash2, Pause, Play, LogOut, MoreHorizontal, FileText, TrendingUp, Wallet, ShoppingBag,
  CalendarDays, ImagePlus, RotateCcw,
  Sun, Moon,
} from 'lucide-react'
import { categories, listingsSeed, locations, offersSeed, requestsSeed, transactionsSeed, usersSeed } from './data/mockData'
import { filterListings, formatPrice } from './utils'
import { calculateDemoMatches } from './utils/matching'
import Chatbot from './components/chatbot/Chatbot.jsx'
import { changeWebsiteLanguage } from './i18n/i18n.js'
import { useTheme } from './theme/useTheme.js'
import './index.css'

const AppContext = createContext(null)
const useApp = () => useContext(AppContext)
const photo = (id, width = 900) => `https://images.unsplash.com/${id.startsWith('photo-') ? id : `photo-${id}`}?auto=format&fit=crop&w=${width}&q=82`
const demoProductNamesById = Object.fromEntries([
  ...listingsSeed.map(({ id, name }) => [id, name]),
  ...requestsSeed.map(({ id, material }) => [id, material]),
  ...offersSeed.map(({ id, material }) => [id, material]),
  ...transactionsSeed.map(({ id, material }) => [id, material]),
])

function marketplaceLabel(t, value, { type = 'product', id, fixed = false } = {}) {
  if (type === 'category') return t(`marketplace.categories.${value}`, { defaultValue: value })
  const seededName = id ? demoProductNamesById[id] : undefined
  const productName = fixed ? value : seededName === value ? seededName : null
  return productName ? t(`marketplace.products.${productName}`, { defaultValue: value }) : value
}

function App() {
  const { i18n } = useTranslation()
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage === 'bn' ? 'bn' : 'en'
  }, [i18n.resolvedLanguage])
  const [listings, setListings] = useState(() => {
    try { return [...listingsSeed, ...(JSON.parse(localStorage.getItem('notunayon-listings') || '[]'))] } catch { return listingsSeed }
  })
  const [offers, setOffers] = useState(offersSeed)
  const [requests, setRequests] = useState(requestsSeed)
  const [saved, setSaved] = useState([])
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('notunayon-demo-user') || 'null') } catch { return null }
  })
  useEffect(() => {
    localStorage.setItem('notunayon-listings', JSON.stringify(listings.filter((item) => !listingsSeed.some((seed) => seed.id === item.id))))
  }, [listings])
  const store = useMemo(() => ({ listings, setListings, offers, setOffers, requests, setRequests, saved, setSaved, user, setUser }), [listings, offers, requests, saved, user])
  return <BrowserRouter><AppContext.Provider value={store}><Routes>
    <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
    <Route path="/marketplace" element={<PublicLayout><Marketplace /></PublicLayout>} />
    <Route path="/marketplace/:id" element={<PublicLayout><ListingDetails /></PublicLayout>} />
    <Route path="/requests" element={<PublicLayout><RequestsPage /></PublicLayout>} />
    <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
    <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
    <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
    <Route path="/logistics" element={<PublicLayout><Logistics /></PublicLayout>} />
    <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
    <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
    <Route path="/seller-dashboard/*" element={<Dashboard type="seller" />} />
    <Route path="/buyer-dashboard/*" element={<Dashboard type="buyer" />} />
    <Route path="/admin/*" element={<Dashboard type="admin" />} />
    <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
  </Routes><Chatbot listings={listings} /></AppContext.Provider></BrowserRouter>
}

function Logo({ light = false }) {
  return <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Notunayon home">
    <span className="brand-icon"><Sprout size={22} strokeWidth={2.2} /></span>
    <span className="brand-type"><b>notunayon</b><small>নতুনায়ন</small></span>
  </Link>
}

function PublicLayout({ children }) {
  return <><Navbar />{children}<Footer /></>
}

function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const { user } = useApp()
  const links = [[t('common.home'), '/'], [t('common.marketplace'), '/marketplace'], [t('common.howItWorks'), '/how-it-works'], [t('common.about'), '/about'], [t('common.contact'), '/contact'], [t('common.register'), '/register']]
  const toggleLanguage = () => changeWebsiteLanguage(i18n.resolvedLanguage === 'bn' ? 'en' : 'bn')
  return <header className="site-header">
    <div className="topline"><span>{t('nav.topline')}</span><span className="demo-pill">{t('nav.demoPlatform')} · {t('common.sampleData')}</span></div>
    <div className="nav-wrap container">
      <Logo />
      <button className="mobile-menu icon-button" aria-label={t('nav.toggle')} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={`main-nav ${open ? 'nav-open' : ''}`}>
        {links.map(([label, to]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
      </nav>
      <div className="nav-actions">
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? (i18n.resolvedLanguage === 'bn' ? 'লাইট থিমে যান' : 'Switch to light theme') : (i18n.resolvedLanguage === 'bn' ? 'ডার্ক থিমে যান' : 'Switch to dark theme')} title={theme === 'dark' ? (i18n.resolvedLanguage === 'bn' ? 'লাইট থিম' : 'Light theme') : (i18n.resolvedLanguage === 'bn' ? 'ডার্ক থিম' : 'Dark theme')}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button type="button" className="nav-language" onClick={toggleLanguage} aria-label={i18n.resolvedLanguage === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}>
          {i18n.resolvedLanguage === 'bn' ? 'English' : 'বাংলা'}
        </button>
        <Link className="nav-login" to={user ? `/${user.type}-dashboard` : '/login'}>{user ? user.name.split(' ')[0] : t('common.login')}</Link>
        <Link className="button button-small button-solid" to="/register"><Plus size={16} /> {t('common.listByProduct')}</Link>
      </div>
    </div>
  </header>
}

function Footer() {
  const { t } = useTranslation()
  return <footer className="footer">
    <div className="container footer-main">
      <div className="footer-about"><Logo light /><p>{t('footer.tagline')}</p><div className="social-row"><a href="mailto:hello@notunayon.example" aria-label={t('common.email') || 'Email'}><Mail size={17} /></a><a href="tel:+8801700000000" aria-label={t('common.phone') || 'Phone'}><Phone size={17} /></a><a href="/contact" aria-label={t('common.contact')}><MessageCircle size={17} /></a></div></div>
      <div><h4>{t('common.marketplace')}</h4><Link to="/marketplace">{t('footer.browse')}</Link><Link to="/requests">{t('footer.requests')}</Link><Link to="/register">{t('common.listByProduct')}</Link><Link to="/logistics">{t('footer.transport')}</Link></div>
      <div><h4>{t('common.company') || t('common.about')}</h4><Link to="/about">{t('common.about')} Notunayon</Link><Link to="/how-it-works">{t('common.howItWorks')}</Link><Link to="/contact">{t('common.contact')}</Link><Link to="/login">{t('common.login')}</Link></div>
      <div className="footer-contact"><h4>{t('footer.getInTouch')}</h4><p>{t('footer.question')}</p><a href="mailto:hello@notunayon.example">hello@notunayon.example</a><p className="footer-note">{t('footer.prototypeContact')}</p></div>
    </div>
    <div className="container footer-bottom"><span>{t('footer.copyright')}</span><span>{t('footer.illustrative')}</span></div>
  </footer>
}

function Button({ children, variant = 'solid', className = '', ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>
}

function SectionHeading({ eyebrow, title, text, action }) {
  return <div className="section-heading">
    <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
    {action}
  </div>
}

function SearchBox({ initialValue = '', onSearch, compact = false }) {
  const { t } = useTranslation()
  const [value, setValue] = useState(initialValue)
  function submit(e) { e.preventDefault(); onSearch(value.trim()) }
  return <form className={`search-box ${compact ? 'search-compact' : ''}`} onSubmit={submit}>
    <Search size={20} className="search-icon" />
    <input aria-label={t('home.searchMaterials')} placeholder={t('home.searchPlaceholder')} value={value} onChange={(e) => setValue(e.target.value)} />
    {value && <button className="search-clear" type="button" aria-label={t('common.clear')} onClick={() => { setValue(''); onSearch('') }}><X size={16} /></button>}
    <Button type="submit"><Search size={17} /> {t('home.searchMaterials')}</Button>
  </form>
}

function Home() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { listings } = useApp()
  const examples = i18n.resolvedLanguage === 'bn'
    ? ['রাজশাহীর ধানের তুষ', '৩০ টাকার নিচে গরুর গোবর', 'পোল্ট্রি লিটার, ৫ টন', 'রংপুরের ধানের খড়']
    : ['Rice husk near Rajshahi', 'Cow manure under ৳30/kg', 'Poultry litter, 5 tonnes', 'Rice straw in Rangpur']
  const fresh = listings.filter((item) => !item.paused).slice(0, 6)
  return <>
    <main>
      <section className="hero">
        <div className="hero-photo" role="img" aria-label="Lush green farmland in Bangladesh" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker"><span className="kicker-dot" /> {t('home.kicker')}</span>
            <h1>{t('home.title')}</h1>
            <p>{t('home.subtitle')}</p>
            <div className="hero-ctas"><Link className="button button-light" to="/marketplace">{t('home.findMaterials')} <ArrowRight size={17} /></Link><Link className="button button-outline-light" to="/register">{t('home.listByProducts')}</Link></div>
          </div>
          <div className="hero-search-panel">
            <div className="search-panel-label"><span><Sparkles size={16} /> Smart material search</span><small>Demo experience</small></div>
            <SearchBox onSearch={(query) => navigate(`/marketplace${query ? `?q=${encodeURIComponent(query)}` : ''}`)} />
            <div className="search-suggestions"><span>Try</span>{examples.map((item) => <button key={item} onClick={() => navigate(`/marketplace?q=${encodeURIComponent(item)}`)}>{item}</button>)}</div>
          </div>
          <div className="hero-footnote"><span><ShieldCheck size={16} /> Local listings and supplier discovery</span><span>Illustrative marketplace data</span></div>
        </div>
      </section>

      <section className="trust-strip"><div className="container trust-inner"><span>Connecting Bangladesh’s</span><div><Wheat size={18} /> Producers</div><div><Recycle size={18} /> Circular businesses</div><div><Truck size={18} /> Local logistics</div><div><Sprout size={18} /> Resource innovators</div></div></section>

      <section className="section discovery-section" id="discover">
        <div className="container">
          <SectionHeading eyebrow="Find supply around you" title="A better way to source local materials." text="Explore sample supply areas and discover agricultural by-products across Bangladesh." action={<Link className="text-link" to="/marketplace">Explore marketplace <ArrowRight size={16} /></Link>} />
          <SupplyMap />
        </div>
      </section>

      <section className="section split-opportunity">
        <div className="container opportunity-grid">
          <article className="opportunity-card producer-card"><span className="op-icon"><Wheat size={24} /></span><span className="eyebrow">For producers</span><h2>Turn your by-products into income.</h2><p>Connect farm, mill, and processing residues with businesses looking for practical local supply.</p><div className="material-pills"><span>{marketplaceLabel(t, 'Rice Husk', { fixed: true })}</span><span>{marketplaceLabel(t, 'Cattle Manure', { fixed: true })}</span><span>{marketplaceLabel(t, 'Poultry Litter', { fixed: true })}</span><span>{marketplaceLabel(t, 'Crop residues', { type: 'category' })}</span></div><Link className="button button-solid" to="/register">List your by-products <ArrowRight size={17} /></Link><div className="opportunity-watermark"><Sprout size={150} /></div></article>
          <article className="opportunity-card buyer-card"><span className="op-icon"><Boxes size={24} /></span><span className="eyebrow">For buyers</span><h2>Find the right material for your business.</h2><p>Compare available materials by type, quantity, price, location, condition, and supply schedule.</p><ul className="check-list"><li><Check size={16} /> Browse locally listed supply</li><li><Check size={16} /> Compare suppliers and quantities</li><li><Check size={16} /> Start a direct conversation</li></ul><Link className="button button-outline-dark" to="/marketplace">Browse materials <ArrowRight size={17} /></Link></article>
        </div>
      </section>

      <section className="section listings-section" id="listings"><div className="container">
        <SectionHeading eyebrow="Fresh on the market" title="By-products with new potential." text="A selection of recent sample listings from producers around the country." action={<Link className="text-link" to="/marketplace">View all materials <ArrowRight size={16} /></Link>} />
        <div className="listing-grid">{fresh.map((item) => <ListingCard key={item.id} listing={item} />)}</div>
        <p className="demo-disclaimer"><CircleHelp size={15} /> Prices and availability are illustrative demo data, not verified market quotations.</p>
      </div></section>

      <section className="request-band"><div className="container request-band-inner"><div><span className="eyebrow">Buyer requests</span><h2>Searching for a material that isn’t listed?</h2><p>See what businesses are sourcing or post a requirement of your own.</p></div><Link className="button button-light" to="/requests">Explore buyer requests <ArrowRight size={17} /></Link></div></section>

      <section className="section process-section" id="how-it-works"><div className="container"><SectionHeading eyebrow="Straightforward by design" title="A simple path from supply to use." text="Notunayon helps people find one another. Buyers and sellers agree on the details directly." />
        <div className="step-grid">{[
          [<ClipboardList />, '01', 'Producers list', 'Describe your by-product, quantity, condition, and collection location.'],
          [<Search />, '02', 'Buyers discover', 'Search listings and compare materials from producers in different regions.'],
          [<HandCoins />, '03', 'Offers are discussed', 'Send a local demo offer and discuss quantity, pricing, and delivery.'],
          [<Truck />, '04', 'Arrange the exchange', 'Buyer and seller coordinate collection or transport directly.'],
        ].map(([icon, no, title, text]) => <div className="step-card" key={no}><div className="step-icon">{icon}</div><span className="step-number">{no}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </div></section>

      <section className="matching-section"><div className="container matching-grid"><div className="matching-copy"><span className="eyebrow">Thoughtful supplier discovery</span><h2>Find promising material matches, faster.</h2><p>Explore suppliers based on material fit, location, available quantity, listed price, and condition. Recommendations are a frontend demonstration—not a live AI service.</p><Link className="text-link" to="/buyer-dashboard/recommendations">Explore matching preview <ArrowRight size={16} /></Link></div><MatchingPreview /></div></section>

      <section className="section sourcing-section"><div className="container sourcing-grid"><div className="sourcing-copy"><span className="eyebrow">Supply desk</span><h2>Need help sourcing for your business?</h2><p>Share what your team is looking for. Our sourcing request demo helps organize your material, volume, and delivery needs.</p><div className="sourcing-benefits"><span><CheckCircle2 size={18} /> Share your volume and location</span><span><CheckCircle2 size={18} /> Describe your quality preferences</span><span><CheckCircle2 size={18} /> Receive a local confirmation</span></div></div><EnquiryForm /></div></section>

      <section className="logistics-teaser"><div className="container logistics-teaser-inner"><div className="logistics-image" /><div className="logistics-copy"><span className="eyebrow">Moving resources forward</span><h2>Local logistics can connect supply with demand.</h2><p>Transport providers can support collection, consolidation, and delivery between agricultural producers and material buyers.</p><Link className="button button-outline-dark" to="/logistics">Explore logistics <ArrowRight size={17} /></Link></div></div></section>

      <section className="impact-section"><div className="container"><div className="impact-head"><span className="eyebrow">An early-stage idea with room to grow</span><h2>Better use starts with better connections.</h2><p>Illustrative demonstration figures for this frontend prototype.</p></div><div className="impact-stats">{[['12', 'Sample listings'], ['5.2 MT', 'Illustrative materials exchanged'], ['18', 'Demo producer profiles'], ['24', 'Demo buyer profiles']].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div></section>
    </main>
  </>
}

function SupplyMap() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const spots = [
    { city: 'Rangpur', x: 52, y: 14, amount: '3 listings' }, { city: 'Dinajpur', x: 37, y: 22, amount: '2 listings' },
    { city: 'Bogura', x: 48, y: 39, amount: '4 listings' }, { city: 'Rajshahi', x: 25, y: 46, amount: '2 listings' },
    { city: 'Mymensingh', x: 67, y: 39, amount: '3 listings' }, { city: 'Gazipur', x: 64, y: 54, amount: '5 listings' },
    { city: 'Cumilla', x: 85, y: 67, amount: '1 listing' }, { city: 'Jashore', x: 32, y: 76, amount: '2 listings' },
  ]
  return <div className="supply-map-card"><div className="map-copy"><span className="map-label"><MapPin size={15} /> DEMONSTRATION SUPPLY AREAS</span><h3>Local by-products, across regions.</h3><p>Explore sample collection areas and material types. Locations and counts are illustrative.</p><div className="map-legend"><span><i className="legend-dot green" /> Farm supply</span><span><i className="legend-dot ochre" /> Mill & processing</span><span><i className="legend-dot sage" /> {marketplaceLabel(t, 'Crop residues', { type: 'category' })}</span></div><Link to="/marketplace" className="text-link">Browse all locations <ArrowRight size={16} /></Link></div><div className="map-visual"><div className="map-grid" /><svg className="map-outline" viewBox="0 0 330 370" aria-label="Stylized map of Bangladesh" role="img"><path d="M140 15 179 28 210 23 218 46 248 50 259 72 251 98 277 117 267 137 293 153 276 179 288 202 268 215 281 236 265 257 246 264 244 294 226 310 213 336 189 326 171 345 152 329 133 344 118 323 94 331 82 310 62 313 68 290 47 282 54 259 34 245 45 226 29 208 47 189 42 167 60 151 54 130 75 119 69 98 88 86 83 63 100 48 101 29 120 31Z" className="map-land" /><path d="M81 177 125 193 156 185 190 205 232 199 M113 88 138 122 131 155 M169 45 175 91 199 119 191 152 216 177 M72 250 119 258 157 239 192 254 234 242" className="map-river" /></svg>
    {spots.map((spot, index) => <button key={spot.city} className={`map-pin pin-${index}`} style={{ left: `${spot.x}%`, top: `${spot.y}%` }} title={`${spot.city} · ${spot.amount}`} onClick={() => navigate(`/marketplace?q=${encodeURIComponent(spot.city)}`)}><span className="pin-dot"><i /></span><span className="pin-label">{spot.city}<small>{spot.amount}</small></span></button>)}
    <span className="map-demo-tag">Illustrative supply map</span></div></div>
}

function ListingCard({ listing, horizontal = false }) {
  const { t } = useTranslation()
  const { saved, setSaved } = useApp()
  const isSaved = saved.includes(listing.id)
  return <article className={`listing-card ${horizontal ? 'listing-horizontal' : ''}`}>
    <Link to={`/marketplace/${listing.id}`} className="listing-image" style={{ backgroundColor: listing.color }}><img src={photo(listing.image, 650)} alt={marketplaceLabel(t, listing.name, { id: listing.id })} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} /><span className="listing-category">{marketplaceLabel(t, listing.category, { type: 'category' })}</span><button className={`save-button ${isSaved ? 'is-saved' : ''}`} type="button" aria-label={isSaved ? t('common.save') : t('marketplace.save')} onClick={(e) => { e.preventDefault(); setSaved(isSaved ? saved.filter((id) => id !== listing.id) : [...saved, listing.id]) }}><Heart size={17} fill={isSaved ? 'currentColor' : 'none'} /></button></Link>
    <div className="listing-body"><div className="listing-title-row"><Link className="listing-title" to={`/marketplace/${listing.id}`}>{marketplaceLabel(t, listing.name, { id: listing.id })}</Link><strong>{formatPrice(listing.price, listing.unit)}</strong></div><span className="listing-seller">{listing.seller}</span><div className="listing-meta"><span><MapPin size={14} />{listing.location}</span><span><Package size={14} />{listing.quantity} {listing.quantityUnit}</span></div><div className="listing-tags"><span>{listing.condition}</span><span>{listing.availability}</span></div><Link className="listing-link" to={`/marketplace/${listing.id}`}>{t('common.view')} {t('common.more')} <ArrowUpRight size={15} /></Link></div>
  </article>
}

function Marketplace() {
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
  const [sort, setSort] = useState('recommended')
  const [listView, setListView] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const result = useMemo(() => {
    let rows = filterListings(listings, query).filter((item) => (!category || item.category === category) && (!place || item.location === place) && (!condition || item.condition === condition) && (!availability || item.availability === availability) && (!minPrice || item.price >= Number(minPrice)) && (!maxPrice || item.price <= Number(maxPrice)) && (!minQty || item.quantity >= Number(minQty)))
    if (sort === 'price-low') rows = [...rows].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') rows = [...rows].sort((a, b) => b.price - a.price)
    if (sort === 'quantity') rows = [...rows].sort((a, b) => b.quantity - a.quantity)
    return rows
  }, [listings, query, category, place, condition, availability, minPrice, maxPrice, minQty, sort])
  const clear = () => { setSearchParams({}); setCategory(''); setPlace(''); setCondition(''); setAvailability(''); setMinPrice(''); setMaxPrice(''); setMinQty('') }
  const activeCount = [category, place, condition, availability, minPrice, maxPrice, minQty].filter(Boolean).length
  return <main className="page-main marketplace-page"><div className="page-intro container"><div><span className="eyebrow">{t('marketplace.eyebrow')}</span><h1>{t('marketplace.title')}</h1><p>{t('marketplace.intro')}</p></div><Link className="button button-solid" to="/register">{t('common.listByProduct')} <Plus size={17} /></Link></div>
    <div className="container"><div className="market-search"><SearchBox key={location.search} initialValue={query} onSearch={(value) => setSearchParams(value ? { q: value } : {})} compact /><span className="market-demo"><ShieldCheck size={15} /> {t('common.demoListingsOnly')}</span></div>
      <div className="market-layout"><aside className={`filter-sidebar ${filtersOpen ? 'filters-open' : ''}`}><div className="filter-head"><h3><SlidersHorizontal size={17} /> {t('common.filters')}</h3><button className="text-small" onClick={clear}>{t('common.clearAll')}</button></div>
        <FilterSelect title={t('marketplace.materialCategory')} value={category} onChange={setCategory} options={categories} placeholder={t('common.allCategories')} translateCategories />
        <FilterSelect title={t('common.location')} value={place} onChange={setPlace} options={locations} placeholder={t('common.allLocations')} />
        <div className="filter-group"><label>{t('marketplace.priceRange')}</label><div className="range-fields"><input aria-label={t('common.price')} type="number" placeholder={t('marketplace.min')} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} /><span>—</span><input aria-label={t('common.price')} type="number" placeholder={t('marketplace.max')} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} /></div></div>
        <div className="filter-group"><label>{t('marketplace.minimumQuantity')}</label><div className="select-shell"><select value={minQty} onChange={(e) => setMinQty(e.target.value)}><option value="">{t('common.anyQuantity')}</option><option value="1">1 MT or more</option><option value="2">2 MT or more</option><option value="5">5 MT or more</option></select><ChevronDown size={16} /></div></div>
        <FilterSelect title={t('common.condition')} value={condition} onChange={setCondition} options={[...new Set(listings.map((item) => item.condition))]} placeholder={t('common.anyCondition')} />
        <FilterSelect title={t('common.availability')} value={availability} onChange={setAvailability} options={[...new Set(listings.map((item) => item.availability))]} placeholder={t('common.anyAvailability')} />
        <button className="button button-solid filter-apply" onClick={() => setFiltersOpen(false)}>{t('marketplace.showListings', { count: result.length })}</button>
      </aside>
      <section className="market-results"><div className="results-toolbar"><div><button className="mobile-filter-trigger" onClick={() => setFiltersOpen(!filtersOpen)}><Filter size={16} /> {t('common.filters')} {activeCount > 0 && <span>{activeCount}</span>}</button><p><strong>{result.length}</strong> {t('common.noResults') === 'কোনো ফল নেই' ? 'টি উপকরণ পাওয়া গেছে' : 'materials found'}</p></div><div className="result-controls"><div className="select-shell sort-select"><ArrowDownUp size={15} /><select aria-label={t('common.sort')} value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">{t('marketplace.recommended')}</option><option value="price-low">{t('marketplace.priceLow')}</option><option value="price-high">{t('marketplace.priceHigh')}</option><option value="quantity">{t('marketplace.quantityHigh')}</option></select><ChevronDown size={15} /></div><div className="view-switch"><button aria-label={t('common.gridView')} className={!listView ? 'active' : ''} onClick={() => setListView(false)}>▦</button><button aria-label={t('common.listView')} className={listView ? 'active' : ''} onClick={() => setListView(true)}>☷</button></div></div></div>
        {(query || activeCount > 0) && <div className="active-filters">{query && <button onClick={() => setSearchParams({})}>“{query}” <X size={13} /></button>}{activeCount > 0 && <button onClick={clear}>Clear {activeCount} filters <X size={13} /></button>}</div>}
        {result.length ? <div className={`listing-grid ${listView ? 'listing-list-view' : ''}`}>{result.map((item) => <ListingCard key={item.id} listing={item} horizontal={listView} />)}</div> : <EmptyState icon={<Search />} title={t('marketplace.noMatchTitle')} text={t('marketplace.noMatchText')} action={<Button onClick={clear}>{t('common.clearFilters')} <RotateCcw size={15} /></Button>} />}
        <p className="demo-disclaimer"><CircleHelp size={15} /> {t('marketplace.demoDisclaimer')}</p>
      </section></div></div>
  </main>
}

function FilterSelect({ title, value, onChange, options, placeholder, translateCategories = false }) {
  const { t } = useTranslation()
  return <div className="filter-group"><label>{title}</label><div className="select-shell"><select value={value} onChange={(e) => onChange(e.target.value)}><option value="">{placeholder}</option>{options.map((option) => <option key={option} value={option}>{translateCategories ? marketplaceLabel(t, option, { type: 'category' }) : option}</option>)}</select><ChevronDown size={16} /></div></div>
}

function ListingDetails() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { listings, saved, setSaved } = useApp()
  const [offerOpen, setOfferOpen] = useState(false)
  const [modalMode, setModalMode] = useState('offer')
  const listing = listings.find((item) => item.id === id)
  if (!listing) return <main className="page-main"><div className="container"><EmptyState icon={<Package />} title={t('marketplace.listingUnavailable')} text={t('marketplace.listingUnavailableText')} action={<Link className="button button-solid" to="/marketplace">{t('marketplace.back')}</Link>} /></div></main>
  const isSaved = saved.includes(id)
  const similar = listings.filter((item) => item.id !== id && item.category === listing.category).slice(0, 3)
  return <main className="page-main detail-page"><div className="container"><Link className="back-link" to="/marketplace"><ArrowLeft size={16} /> Back to marketplace</Link><div className="detail-layout"><div className="detail-main"><div className="detail-image" style={{ backgroundColor: listing.color }}><img src={photo(listing.image, 1200)} alt={marketplaceLabel(t, listing.name, { id: listing.id })} onError={(e) => { e.currentTarget.style.display = 'none' }} /><span className="demo-image-label">Demonstration listing image</span></div><div className="detail-section"><span className="eyebrow">About this material</span><h2>Material overview</h2><p>{listing.description}</p></div><div className="detail-section"><span className="eyebrow">Listing information</span><h2>Specifications provided by seller</h2><div className="spec-grid"><Spec title="Condition" value={listing.condition} /><Spec title="Availability" value={listing.availability} /><Spec title="Supply frequency" value={listing.frequency} /><Spec title="Minimum order" value={`${listing.minimum.toLocaleString('en-BD')} kg`} /><Spec title="Pickup location" value={listing.location} /><Spec title="Delivery" value="Discuss with seller" /></div><p className="quality-note"><CircleHelp size={15} /> Listing details are provided for demonstration; Notunayon does not verify material quality.</p></div><div className="detail-section seller-card"><div className="seller-avatar"><Sprout /></div><div><span className="eyebrow">Listed by</span><h3>{listing.seller}</h3><p><MapPin size={14} /> {listing.location}, Bangladesh · Demo business profile</p></div><BadgeCheck size={21} className="seller-check" /></div></div>
      <aside className="detail-sidebar"><span className="detail-category">{marketplaceLabel(t, listing.category, { type: 'category' })}</span><h1>{marketplaceLabel(t, listing.name, { id: listing.id })}</h1><div className="detail-price">{formatPrice(listing.price, listing.unit)} <span>listed price</span></div><div className="detail-quantity"><Package size={17} /> {listing.quantity} {listing.quantityUnit} available</div><div className="detail-location"><MapPin size={17} /> {listing.location}, Bangladesh</div><span className="availability-chip"><i /> {listing.availability}</span><div className="detail-actions"><Button onClick={() => { setModalMode('offer'); setOfferOpen(true) }}><HandCoins size={17} /> Make an offer</Button><Button variant="outline-dark" onClick={() => { setModalMode('contact'); setOfferOpen(true) }}><MessageCircle size={17} /> Contact seller</Button><button className={`save-detail ${isSaved ? 'is-saved' : ''}`} onClick={() => setSaved(isSaved ? saved.filter((item) => item !== id) : [...saved, id])}><Heart size={17} fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved listing' : 'Save listing'}</button></div><div className="secure-note"><ShieldCheck size={17} /><span><b>Demo marketplace</b><br />No payments or transactions are processed here.</span></div></aside></div>
      {similar.length > 0 && <section className="similar-listings"><SectionHeading eyebrow="Similar materials" title="Explore related listings" /><div className="listing-grid">{similar.map((item) => <ListingCard key={item.id} listing={item} />)}</div></section>}</div>{offerOpen && <OfferModal listing={listing} mode={modalMode} open={offerOpen} close={() => setOfferOpen(false)} />}</main>
}

function Spec({ title, value }) { return <div className="spec-item"><span>{title}</span><strong>{value}</strong></div> }

function OfferModal({ listing, mode, open, close }) {
  const { t } = useTranslation()
  const { setOffers } = useApp()
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  if (!open) return null
  function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (mode === 'contact') {
      if (!data.get('message')?.toString().trim()) { setError('Add a short message to continue.'); return }
      setDone(true); setError(''); return
    }
    if (!data.get('price') || !data.get('quantity')) { setError('Enter an offer price and required quantity.'); return }
    setOffers((items) => [{ id: `OFF-${Date.now().toString().slice(-5)}`, buyer: 'Demo Buyer', material: listing.name, price: Number(data.get('price')), quantity: `${data.get('quantity')} ${data.get('unit')}`, message: data.get('message') || 'No message provided.', date: 'Just now', status: 'Pending' }, ...items])
    setDone(true); setError('')
  }
  return <Modal title={done ? (mode === 'contact' ? 'Message prepared' : 'Offer sent') : mode === 'contact' ? `Contact ${listing.seller}` : `Make an offer for ${marketplaceLabel(t, listing.name, { id: listing.id })}`} close={close}>{done ? <SuccessState title={mode === 'contact' ? 'Your message is ready.' : 'Your offer is ready.'} text={mode === 'contact' ? 'This local demonstration prepared a message. The seller has not been contacted.' : 'This local demonstration has added the offer to the buyer and seller demo views.'} close={close} /> : <form className="form-stack" onSubmit={submit}><p className="form-help">This is a local demo. No real seller will be contacted.</p>{mode === 'contact' ? <Field label="Message to seller" name="message" as="textarea" placeholder="Ask a question about this material" required /> : <><Field label={`Your price (৳ / ${listing.unit})`} name="price" type="number" min="1" defaultValue={listing.price} required /><div className="form-row"><Field label="Required quantity" name="quantity" type="number" min="1" placeholder="e.g. 500" required /><SelectField label="Unit" name="unit" options={['kg', 'MT']} /></div><Field label="Message to seller" name="message" as="textarea" placeholder="Share your pickup or sourcing requirements" /></>}<p className="form-error">{error}</p><div className="modal-actions"><Button variant="outline-dark" type="button" onClick={close}>Cancel</Button><Button type="submit"><Send size={16} /> {mode === 'contact' ? 'Prepare message' : 'Submit offer'}</Button></div></form>}</Modal>
}

function RequestsPage() {
  const { requests } = useApp()
  const [query, setQuery] = useState('')
  const [place, setPlace] = useState('')
  const visible = requests.filter((request) => (!query || `${request.material} ${request.buyer} ${request.condition}`.toLowerCase().includes(query.toLowerCase())) && (!place || request.location === place))
  return <main className="page-main"><div className="page-intro container"><div><span className="eyebrow">Buyer requests</span><h1>What are businesses looking for?</h1><p>Review demonstration sourcing requirements and find materials buyers need.</p></div><Link className="button button-solid" to="/buyer-dashboard/requirement"><Plus size={16} /> Post a requirement</Link></div><div className="container"><div className="request-tools"><div className="field-with-icon"><Search size={17} /><input placeholder="Search material or buyer" value={query} onChange={(e) => setQuery(e.target.value)} /></div><div className="select-shell"><MapPin size={15} /><select value={place} onChange={(e) => setPlace(e.target.value)}><option value="">All locations</option>{locations.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></div></div><div className="request-list">{visible.map((request) => <RequestCard key={request.id} request={request} />)}</div>{visible.length === 0 && <EmptyState icon={<ClipboardList />} title="No requests found" text="Try another material or location." action={<Button variant="outline-dark" onClick={() => { setQuery(''); setPlace('') }}>Clear filters</Button>} />}<p className="demo-disclaimer"><CircleHelp size={15} /> Buyer profiles and sourcing details are illustrative demo records.</p></div></main>
}

function RequestCard({ request }) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  return <article className={`request-card ${expanded ? 'request-expanded' : ''}`}><div className="request-card-main"><div className="request-icon"><Boxes size={21} /></div><div className="request-primary"><span className="request-category">{marketplaceLabel(t, request.category, { type: 'category' })}</span><h3>{marketplaceLabel(t, request.material, { id: request.id })}</h3><p>{request.buyer} <span>·</span> {request.date}</p></div><div className="request-detail"><span>Quantity</span><strong>{request.quantity}</strong></div><div className="request-detail"><span>Delivery location</span><strong><MapPin size={14} /> {request.location}</strong></div><div className="request-detail"><span>Expected price</span><strong>{request.budget}</strong></div><button className="button button-outline-dark request-view" onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide details' : 'View request'} <ChevronDown size={16} /></button></div>{expanded && <div className="request-extra"><span><b>Preferred condition:</b> {request.condition}{request.deliveryDate && <> · <b>Delivery date:</b> {request.deliveryDate}</>}{request.requirements && <> · <b>Additional needs:</b> {request.requirements}</>}</span><Link className="text-link" to="/login">Contact buyer <ArrowRight size={15} /></Link></div>}</article>
}

function HowItWorks() {
  const { t, i18n } = useTranslation()
  const steps = i18n.resolvedLanguage === 'bn'
    ? [['01','উপ-বর্জ্য তালিকাভুক্ত করুন','বিক্রেতা আছে কী, কোথায়, কত এবং কোন অবস্থায় তা জানান।'],['02','উপযুক্ত সরবরাহ খুঁজুন','ক্রেতা তালিকা ও ফিল্টার দেখে সম্ভাব্য উপকরণ খুঁজবে।'],['03','অফার আলোচনা করুন','ক্রেতা স্থানীয় ডেমো অফার পাঠাবে ও শর্ত আলোচনা হবে।'],['04','পরিবহন সমন্বয় করুন','ক্রেতা-বিক্রেতা সংগ্রহ বা পরিবহন সম্পর্কে সিদ্ধান্ত নেবে।']]
    : [['01','List a by-product','Sellers share what they have, where it is, and the condition and quantity they can supply.'],['02','Discover relevant supply','Buyers browse listings and use filters to find potential material matches.'],['03','Discuss an offer','A buyer submits a local demo offer; both sides can discuss the terms directly.'],['04','Coordinate delivery','The buyer and seller agree how pickup, transport, and any payment would work.']]
  return <StaticPage eyebrow={t('common.howItWorks')} title={t('home.processTitle')} intro={t('home.processText')} image="photo-1464226184884-fa280b87c399">
    <div className="journey-flow">{steps.map(([num, title, text]) => <article className="journey-step" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="two-callouts"><div><h3>{i18n.resolvedLanguage === 'bn' ? 'উৎপাদকদের জন্য' : 'For producers'}</h3><p>{i18n.resolvedLanguage === 'bn' ? 'অতিরিক্ত উপ-বর্জ্য নতুন ক্রেতাদের কাছে সহজে পৌঁছে দিন।' : 'Make surplus and by-products easier for new buyers to find.'}</p><Link className="text-link" to="/register">{i18n.resolvedLanguage === 'bn' ? 'ডেমো তালিকা শুরু করুন' : 'Start a demo listing'} <ArrowRight size={15} /></Link></div><div><h3>{i18n.resolvedLanguage === 'bn' ? 'ক্রেতাদের জন্য' : 'For buyers'}</h3><p>{i18n.resolvedLanguage === 'bn' ? 'স্থানীয় সরবরাহের বিকল্প তুলনা করুন ও প্রয়োজন পাঠান।' : 'Compare local supply options and send a sourcing request.'}</p><Link className="text-link" to="/marketplace">{t('footer.browse')} <ArrowRight size={15} /></Link></div></div>
  </StaticPage>
}

function About() {
  const { t, i18n } = useTranslation()
  const bn = i18n.resolvedLanguage === 'bn'
  return <StaticPage eyebrow={t('common.about')} title={bn ? 'কৃষিজ উপ-বর্জ্যের আরও উপযোগী ভবিষ্যৎ।' : 'A more useful future for agricultural by-products.'} intro={bn ? 'নতুনায়ন একটি বাজার ধারণা যা বাংলাদেশের কৃষি ব্যবস্থাকে কম ব্যবহার হওয়া সম্পদে সুযোগ দেখতে সহায়তা করে।' : 'Notunayon is a marketplace concept helping Bangladesh’s agricultural ecosystem see opportunity in resources that are often left underused.'} image="photo-1500382017468-9049fed747ef">
    <div className="story-grid"><div><span className="eyebrow">{bn ? 'সমস্যা' : 'The challenge'}</span><h2>{bn ? 'মূল্যবান উপকরণ খুঁজে পাওয়া ও পরিবহন দুটোই কঠিন হতে পারে।' : 'Valuable materials can be hard to find—and hard to move.'}</h2><p>{bn ? 'ধানের তুষ, খড়, গোবর ও প্রক্রিয়াকরণ বর্জ্য অনেক ব্যবসার দরকারি উপাদান হতে পারে। তবু উৎপাদক ও ব্যবহারকারী পরস্পরকে খুঁজে নাও পেতে পারেন।' : 'Farm and agro-industry by-products such as rice husk, straw, manure, and processing residues can be useful inputs for many businesses. Yet producers and potential users may not know how to reach each other.'}</p><p>{bn ? 'সরবরাহ স্থান, মৌসুম, গুণমান ও পরিমাণ অনুযায়ী বদলায়। পরিষ্কার তথ্য ও ব্যবহারিক আলোচনা সুযোগ দেখাতে সহায়তা করে।' : 'Supply can vary by location, season, quality, and quantity. Clear discovery and practical conversations can help participants explore opportunities without assuming that every material suits every use.'}</p></div><div className="mission-card"><Sprout size={28} /><span className="eyebrow">{bn ? 'আমাদের লক্ষ্য' : 'Our mission'}</span><h3>{bn ? 'কৃষিজ সম্পদ বিনিময়কে স্থানীয়, পরিষ্কার ও বৃত্তাকার করুন।' : 'Make agricultural resource exchange more discoverable, local, and circular.'}</h3><p>{bn ? 'প্রোটোটাইপের মূলনীতি: ব্যবহারিক সংযোগ, স্বচ্ছ তালিকা ও দায়িত্বশীল ব্যবহার।' : 'Prototype values: practical connections, transparent listings, and responsible material use.'}</p></div></div><div className="values-grid">{(bn ? [['পরিকল্পনায় বৃত্তাকার', 'দরকারি উপ-বর্জ্যের নতুন ব্যবহারের সুযোগ খুঁজে দিন।'], ['স্থানকে কেন্দ্র করে', 'আঞ্চলিক সরবরাহ ও পরিবহনকে খোঁজের অংশ করুন।'], ['পরিষ্কার তথ্য', 'ক্রেতা ও উৎপাদক ব্যবহারযোগ্য তালিকা দেখেন।']] : [['Circular by design', 'Help useful by-products find a potential next use.'], ['Grounded in place', 'Make regional supply and logistics part of discovery.'], ['Built for clarity', 'Give buyers and producers practical listing details to compare.']]).map(([title, text]) => <div key={title}><span className="value-mark"><Check size={17} /></span><h3>{title}</h3><p>{text}</p></div>)}</div>
  </StaticPage>
}

function StaticPage({ eyebrow, title, intro, image, children }) {
  return <main className="page-main static-page"><div className="static-hero container"><div className="static-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div><div className="static-image"><img src={photo(image, 1200)} alt="Bangladesh agriculture and natural resources" onError={(e) => { e.currentTarget.style.display = 'none' }} /><span>Notunayon · Demo prototype</span></div></div><div className="container static-content">{children}</div></main>
}

function Contact() {
  const { t, i18n } = useTranslation()
  const bn = i18n.resolvedLanguage === 'bn'
  const [sent, setSent] = useState(false)
  return <main className="page-main contact-page"><div className="page-intro container"><div><span className="eyebrow">{t('common.contact')}</span><h1>{bn ? 'ভালো উপকরণ সংযোগ নিয়ে কথা বলুন।' : 'Let’s talk about better material connections.'}</h1><p>{bn ? 'সরবরাহ, তালিকাভুক্তি বা পরিবহন নিয়ে প্রশ্ন? এই ডেমো ফর্মে বার্তা লিখুন।' : 'Questions about sourcing, listing, or logistics? Send a message through this frontend demo.'}</p></div></div><div className="container contact-grid"><div className="contact-info"><div className="contact-info-card"><Mail /><div><span>{t('auth.email')}</span><b>hello@notunayon.example</b><small>{bn ? 'প্রোটোটাইপের নমুনা যোগাযোগ' : 'Placeholder contact for prototype'}</small></div></div><div className="contact-info-card"><Phone /><div><span>{t('auth.phone')}</span><b>+880 1700-000000</b><small>{bn ? 'নমুনা ফোন নম্বর' : 'Placeholder contact for prototype'}</small></div></div><div className="contact-info-card"><MapPin /><div><span>{bn ? 'স্মূলে' : 'Based in'}</span><b>{bn ? 'বাংলাদেশ' : 'Bangladesh'}</b><small>{bn ? 'সারা দেশের কৃষি সম্প্রদায়ের জন্য' : 'Serving agricultural communities nationwide'}</small></div></div><div className="faq-card"><h3>{bn ? 'প্রায়শই জিজ্ঞাসিত' : 'Frequently asked'}</h3><details><summary>{bn ? 'তালিকাগুলো যাচাই করা কি?' : 'Are listings verified?'}</summary><p>{bn ? 'না। এই প্রোটোটাইপের সব তথ্য নমুনা।' : 'No. All supplier and material details on this prototype are sample information.'}</p></details><details><summary>{bn ? 'এখানে লেনদেন করা যাবে?' : 'Can I complete a transaction here?'}</summary><p>{bn ? 'না। পেমেন্ট বা আসল লেনদেন হচ্ছে না।' : 'No payments or real transactions are processed. Offers are frontend demonstrations.'}</p></details></div></div><div className="contact-form-card">{sent ? <SuccessState title={bn ? 'বার্তা পেয়েছি।' : 'Message received.'} text={bn ? 'নতুনায়ন ডেমো ফর্ম জমা হয়েছে। কোনো বার্তা সার্ভারে পাঠানো হয়নি।' : 'Thanks for trying the Notunayon contact demo. No message was sent to a server.'} /> : <form className="form-stack" onSubmit={(e) => { e.preventDefault(); setSent(true) }}><h2>{bn ? 'আমাদের কাছে লিখুন' : 'Send us a message'}</h2><p className="form-help">{bn ? 'চিহ্নিত ঘরগুলো এই ডেমোতে প্রয়োজন।' : 'Fields marked required are needed for this demo.'}</p><div className="form-row"><Field label={bn ? 'আপনার নাম' : 'Your name'} name="name" required /><Field label={bn ? 'ইমেইল' : 'Email address'} name="email" type="email" required /></div><Field label={bn ? 'কিসের বিষয়ে যোগাযোগ?' : 'I’m contacting about'} name="subject" as="select" options={bn ? ['উপকরণ সংগ্রহ','উপ-বর্জ্য তালিকা','ব্যবসায়িক অংশীদারিত্ব','পরিবহন ও সরবরাহ','অন্যান্য'] : ['Sourcing materials','Listing by-products','Business partnership','Transport and logistics','Other']} /><Field label={bn ? 'বার্তা' : 'Message'} name="message" as="textarea" required placeholder={bn ? 'আপনার প্রয়োজন সংক্ষেপে লিখুন' : 'Tell us a little about what you need'} /><Button type="submit">{bn ? 'বার্তা পাঠান' : 'Send message'} <ArrowRight size={17} /></Button></form>}</div></div></main>
}

function Logistics() {
  const [submitted, setSubmitted] = useState(false)
  return <main className="page-main logistics-page"><div className="logistics-hero"><div className="container logistics-hero-grid"><div><span className="eyebrow">Fleet & logistics</span><h1>Move materials from where they are to where they’re needed.</h1><p>Explore a demonstration opportunity for local transport partners to support agricultural material collection and delivery.</p><Link to="#partner-form" className="button button-light">Register transport interest <ArrowRight size={17} /></Link></div><div className="logistics-hero-image"><img src={photo('photo-1601584115197-04ecc0da31d7', 1100)} alt="Truck supporting agricultural logistics" onError={(e) => { e.currentTarget.style.display = 'none' }} /><span><Truck /> Local transport connections</span></div></div></div><div className="container logistics-content"><div className="logistics-benefits">{[['Collection', 'Coordinate local pickup from a farm, mill, or processor.'], ['Consolidation', 'Bring smaller volumes together where practical.'], ['Delivery', 'Help move materials to a buyer’s preferred location.']].map(([title, text]) => <article key={title}><span><Truck size={20} /></span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="partner-form" id="partner-form">{submitted ? <SuccessState title="Interest recorded." text="Your details have been saved only in this page demo. No transport partner was registered." /> : <form className="form-stack" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}><span className="eyebrow">Partner interest</span><h2>Tell us about your transport service.</h2><div className="form-row"><Field label="Contact name" name="name" required /><Field label="Business / fleet name" name="business" required /></div><div className="form-row"><Field label="Phone number" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" required /><Field label="Base location" name="location" required /></div><SelectField label="Vehicle type" name="vehicle" options={['Pickup / mini truck', 'Medium truck', 'Large truck', 'Other']} /><Field label="Service coverage" name="coverage" as="textarea" placeholder="Areas, typical loads, or scheduling details" /><Button type="submit">Register interest <ArrowRight size={17} /></Button><small className="form-help">Frontend demonstration only; no information is transmitted.</small></form>}</div></div></main>
}

function EnquiryForm() {
  const [sent, setSent] = useState(false)
  if (sent) return <div className="enquiry-card"><SuccessState title="Sourcing request saved." text="Your request is now a local frontend demonstration. No service is contacted." close={() => setSent(false)} /></div>
  return <form className="enquiry-card form-stack" onSubmit={(e) => { e.preventDefault(); setSent(true) }}><div className="enquiry-head"><span><BriefcaseBusiness size={19} /></span><div><b>Business sourcing enquiry</b><small>Tell us what your team needs</small></div></div><div className="form-row"><Field label="Full name" name="name" placeholder="Your name" required /><Field label="Company" name="company" placeholder="Business name" required /></div><div className="form-row"><Field label="Email" name="email" type="email" placeholder="you@company.com" required /><Field label="Phone" name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" required /></div><div className="form-row"><Field label="Delivery location" name="location" placeholder="District or area" required /><Field label="Material needed" name="material" placeholder="e.g. rice husk" required /></div><div className="form-row"><Field label="Monthly quantity" name="quantity" placeholder="e.g. 10 MT" required /><SelectField label="Service required" name="service" options={['Supplier discovery', 'Material sourcing', 'Pickup coordination', 'Other']} /></div><Field label="Additional requirements" name="notes" as="textarea" placeholder="Condition, schedule, or other details" /><Button type="submit">Request sourcing support <ArrowRight size={16} /></Button><small className="form-help">Demo form · your information is not sent to a server.</small></form>
}

function MatchingPreview() {
  const { t } = useTranslation()
  const { listings } = useApp()
  const rows = calculateDemoMatches(listings).slice(0, 3)
  return <div className="matching-preview"><div className="matching-preview-head"><div><span className="match-avatar"><Sparkles size={16} /></span><div><b>Supplier match preview</b><small>{marketplaceLabel(t, 'Rice Husk', { fixed: true })} · 1–5 MT · sample buyer</small></div></div><span className="preview-tag">DEMO</span></div>{rows.map(({ listing, score, distance, reasons }, index) => <Link className="match-row" to={`/marketplace/${listing.id}`} key={listing.id}><div className="match-rank">0{index + 1}</div><div className="match-info"><b>{listing.seller}</b><span>{marketplaceLabel(t, listing.name, { id: listing.id })} · {listing.location} · {distance}</span><small>{reasons[0]}</small></div><strong>{score}%<small>fit score</small></strong></Link>)}<p className="match-disclaimer">Illustrative scoring preview. Not a real AI prediction or validated performance measure.</p></div>
}

function Login() {
  const { t } = useTranslation()
  const { setUser } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [forgot, setForgot] = useState(false)
  function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (!data.get('identity') || !data.get('password')) { setError('Enter your email or phone and password.'); return }
    const account = { name: data.get('identity').toString().split('@')[0] || 'Demo User', type: 'buyer' }
    localStorage.setItem('notunayon-demo-user', JSON.stringify(account)); setUser(account)
    navigate('/buyer-dashboard')
  }
  return <AuthPage><div className="auth-form-head"><span className="eyebrow">{t('auth.loginEyebrow')}</span><h1>{t('auth.loginTitle')}</h1><p>{t('auth.loginText')}</p></div>{forgot ? <SuccessState title={t('auth.resetDemo')} text={t('auth.resetText')} close={() => setForgot(false)} /> : <form className="form-stack" onSubmit={submit}><Field label={t('auth.emailOrPhone')} name="identity" placeholder="you@example.com or +880 1XXX..." required /><PasswordField /><div className="remember-row"><label><input type="checkbox" name="remember" /> {t('auth.remember')}</label><button type="button" className="text-link" onClick={() => setForgot(true)}>{t('auth.forgot')}</button></div><p className="form-error">{error}</p><Button type="submit">{t('common.login')} <ArrowRight size={16} /></Button><p className="auth-foot">{t('auth.newHere')} <Link to="/register">{t('auth.createDemo')}</Link></p></form>}</AuthPage>
}

function Register() {
  const { t, i18n } = useTranslation()
  const { setUser } = useApp()
  const navigate = useNavigate()
  const [type, setType] = useState(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  function submit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) { setError(t('auth.requiredError')); return }
    const data = new FormData(form)
    const account = { name: data.get('name'), type }
    localStorage.setItem('notunayon-demo-user', JSON.stringify(account))
    setUser(account); setSuccess(true); setError('')
  }
  return <AuthPage><div className="auth-form-head"><span className="eyebrow">{t('auth.registerEyebrow')}</span><h1>{type ? t('auth.registerTitle') : t('auth.chooseOption')}</h1><p>{t('auth.registerText')}</p></div>{success ? <SuccessState title={t('auth.profileCreated')} text={t('auth.profileStored')} close={() => navigate(`/${type}-dashboard`)} /> : !type ? <div className="role-selection" role="radiogroup" aria-label={t('auth.chooseOption')}><button type="button" role="radio" aria-checked="false" className="role-card" onClick={() => setType('buyer')}><span className="role-card-icon"><ShoppingBag size={24} /></span><b>{t('common.buyer')}</b><span>{t('auth.buyerCardDescription')}</span><small>{t('auth.findUseful')}</small></button><button type="button" role="radio" aria-checked="false" className="role-card" onClick={() => setType('seller')}><span className="role-card-icon"><Wheat size={24} /></span><b>{t('common.seller')}</b><span>{t('auth.sellerCardDescription')}</span><small>{t('auth.supplyByProducts')}</small></button></div> : <form className="form-stack role-form" onSubmit={submit}><div className="role-switch-row"><div className="account-type-select" role="radiogroup" aria-label={t('auth.chooseOption')}><button type="button" role="radio" aria-checked={type === 'buyer'} className={type === 'buyer' ? 'selected' : ''} onClick={() => setType('buyer')}><ShoppingBag size={19} /><b>{t('common.buyer')}</b><small>{t('auth.findUseful')}</small></button><button type="button" role="radio" aria-checked={type === 'seller'} className={type === 'seller' ? 'selected' : ''} onClick={() => setType('seller')}><Wheat size={19} /><b>{t('common.seller')}</b><small>{t('auth.supplyByProducts')}</small></button></div><button type="button" className="text-link role-change" onClick={() => setType(type === 'buyer' ? 'seller' : 'buyer')}>{t('auth.changeRole')}</button></div><div className="form-row"><Field label={t('auth.fullName')} name="name" required /><Field label={type === 'seller' ? t('auth.farmBusiness') : t('auth.businessName')} name="business" required /></div><div className="form-row"><Field label={t('auth.email')} name="email" type="email" required /><Field label={t('auth.phone')} name="phone" type="tel" placeholder="+880 1XXX-XXXXXX" required /></div><div className="form-row"><Field label={t('auth.location')} name="location" placeholder={i18n.resolvedLanguage === 'bn' ? 'জেলা, বাংলাদেশ' : 'District, Bangladesh'} required /><Field label={t('auth.industry')} name="industry" placeholder={i18n.resolvedLanguage === 'bn' ? 'খামার, রাইস মিল…' : 'Compost, manufacturing…'} required /></div><PasswordField /><div className="form-group"><label>{type === 'seller' ? (i18n.resolvedLanguage === 'bn' ? 'যে উপকরণ সরবরাহ করবেন' : 'Materials you can supply') : t('auth.materialsInterest')}</label><input name="materials" placeholder={i18n.resolvedLanguage === 'bn' ? 'ধানের তুষ, গোবর…' : 'Crop residues, rice by-products…'} /></div><p className="form-error">{error}</p><Button type="submit">{type === 'buyer' ? t('auth.createBuyer') : t('auth.createSeller')} <ArrowRight size={16} /></Button><p className="auth-foot">{t('auth.already')} <Link to="/login">{t('common.login')}</Link></p><p className="form-help">{t('auth.noAccount')}</p></form>}</AuthPage>
}

function AuthPage({ children }) {
  return <main className="auth-page"><div className="auth-visual"><div className="auth-visual-bg" /><div className="auth-visual-content"><Logo light /><span className="eyebrow">Agriculture · exchange · opportunity</span><h2>Give good materials another place to grow.</h2><p>Explore a local demonstration marketplace connecting Bangladesh’s agricultural producers and businesses.</p><div className="auth-points"><span><CheckCircle2 size={17} /> Explore sample supply</span><span><CheckCircle2 size={17} /> Test a local marketplace flow</span></div></div></div><section className="auth-panel"><div className="auth-mobile-brand"><Logo /></div>{children}<div className="auth-legal">By continuing, you’re using a frontend demonstration. No production account is created.</div></section></main>
}

function PasswordField() {
  const { t, i18n } = useTranslation()
  const [shown, setShown] = useState(false)
  return <div className="form-group"><label htmlFor="password">{t('auth.password')}</label><div className="password-shell"><input id="password" type={shown ? 'text' : 'password'} name="password" minLength="6" placeholder={t('auth.passwordHint')} required /><button type="button" aria-label={shown ? (i18n.resolvedLanguage === 'bn' ? 'পাসওয়ার্ড লুকান' : 'Hide password') : (i18n.resolvedLanguage === 'bn' ? 'পাসওয়ার্ড দেখান' : 'Show password')} onClick={() => setShown(!shown)}><Eye size={16} /></button></div></div>
}

function Dashboard({ type }) {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const path = useLocation().pathname.replace(/\/+$/, '')
  const dashboardPath = type === 'admin' ? '/admin' : `/${type}-dashboard`
  const suffix = path.replace(dashboardPath, '') || '/'
  const { setUser } = useApp()
  const navigate = useNavigate()
  const isSeller = type === 'seller'
  const isBuyer = type === 'buyer'
  const isAdmin = type === 'admin'
  const title = isSeller ? t('dashboard.sellerWorkspace') : isBuyer ? t('dashboard.buyerWorkspace') : t('dashboard.adminDemo')
  const menus = isSeller
    ? [[t('dashboard.overview'), '/seller-dashboard', LayoutDashboard], [t('dashboard.myListings'), '/seller-dashboard/listings', Package], [t('dashboard.createListing'), '/seller-dashboard/create-listing', Plus], [t('dashboard.offersReceived'), '/seller-dashboard/offers', HandCoins], [t('dashboard.messages'), '/seller-dashboard/messages', MessageCircle], [t('dashboard.transactions'), '/seller-dashboard/transactions', ClipboardList], [t('dashboard.analytics'), '/seller-dashboard/analytics', BarChart3], [t('dashboard.profile'), '/seller-dashboard/profile', UserRound]]
    : isBuyer
      ? [[t('dashboard.overview'), '/buyer-dashboard', LayoutDashboard], [t('dashboard.browseMaterials'), '/buyer-dashboard/browse', Search], [t('dashboard.recommendations'), '/buyer-dashboard/recommendations', Sparkles], [t('dashboard.postRequirement'), '/buyer-dashboard/requirement', Plus], [t('dashboard.myOffers'), '/buyer-dashboard/offers', HandCoins], [t('dashboard.messages'), '/buyer-dashboard/messages', MessageCircle], [t('dashboard.purchaseHistory'), '/buyer-dashboard/history', ClipboardList], [t('dashboard.analytics'), '/buyer-dashboard/analytics', BarChart3], [t('dashboard.profile'), '/buyer-dashboard/profile', UserRound]]
      : [[t('dashboard.overview'), '/admin', LayoutDashboard], [t('dashboard.users'), '/admin/users', Users], [t('dashboard.verification'), '/admin/verification', ShieldCheck], [t('dashboard.myListings'), '/admin/listings', Package], [t('dashboard.categories'), '/admin/categories', Boxes], [t('dashboard.transactions'), '/admin/transactions', ClipboardList], [t('dashboard.buyerRequests'), '/admin/requests', FileText], [t('dashboard.reports'), '/admin/reports', BarChart3], [t('dashboard.analytics'), '/admin/analytics', TrendingUp], [t('dashboard.settings'), '/admin/settings', Settings]]
  const [menuOpen, setMenuOpen] = useState(false)
  const [showNotice, setShowNotice] = useState(!isAdmin)
  function logout() {
    localStorage.removeItem('notunayon-demo-user')
    setUser(null)
    navigate('/login')
  }
  return <div className="dashboard-app"><aside className={`dash-sidebar ${menuOpen ? 'dash-sidebar-open' : ''}`}><div className="dash-brand"><Logo /><button className="icon-button mobile-menu" onClick={() => setMenuOpen(false)}><X size={19} /></button></div><div className="workspace-label">{title}</div><nav>{menus.map(([label, to, Icon]) => <NavLink key={to} end={to === `/${type}-dashboard` || to === '/admin'} to={to} onClick={() => setMenuOpen(false)}><Icon size={18} /><span>{label}</span></NavLink>)}{!isAdmin && <button className="dash-logout" onClick={logout}><LogOut size={18} /><span>{t('common.logout')}</span></button>}</nav><div className="dash-sidebar-bottom"><Link to="/" className="dash-public-link"><ArrowLeft size={16} /> {t('common.backToPublic')}</Link><button type="button" className="theme-toggle dash-theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? (i18n.resolvedLanguage === 'bn' ? 'লাইট থিমে যান' : 'Switch to light theme') : (i18n.resolvedLanguage === 'bn' ? 'ডার্ক থিমে যান' : 'Switch to dark theme')}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button><div className="dash-user"><span>{isAdmin ? 'AD' : isBuyer ? 'BU' : 'SE'}</span><div><b>{isAdmin ? 'Demo administrator' : t('dashboard.demoUser')}</b><small>{type} · prototype</small></div><MoreHorizontal size={17} /></div></div></aside><div className="dash-main"><header className="dash-topbar"><button className="icon-button mobile-menu dash-menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open dashboard menu"><Menu /></button><div className="dash-breadcrumb">{title}<ChevronRight size={14} /> <span>{menus.find((item) => item[1] === `${dashboardPath}${suffix === '/' ? '' : suffix}`)?.[0] || (suffix === '/create-listing' ? t('dashboard.createListing') : t('dashboard.workspace'))}</span></div><div className="dash-top-actions"><button type="button" className="nav-language" onClick={() => changeWebsiteLanguage(i18n.resolvedLanguage === 'bn' ? 'en' : 'bn')}>{i18n.resolvedLanguage === 'bn' ? 'English' : 'বাংলা'}</button><button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? (i18n.resolvedLanguage === 'bn' ? 'লাইট থিমে যান' : 'Switch to light theme') : (i18n.resolvedLanguage === 'bn' ? 'ডার্ক থিমে যান' : 'Switch to dark theme')}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button><span className="demo-pill"><i /> {t('common.demoMode')}</span><button aria-label={t('common.notifications')} className="icon-button dash-notification"><Bell size={18} /><i /></button><Link className="dash-avatar" to="/">{isAdmin ? 'AD' : isBuyer ? 'BU' : 'SE'}</Link></div></header><main className="dash-content">{showNotice && !isAdmin && <div className="dashboard-notice"><CircleHelp size={17} /><span><b>{t('dashboard.demoNotice')}</b> — {t('dashboard.demoNoticeText')}</span><button onClick={() => setShowNotice(false)} aria-label={t('common.close')}><X size={15} /></button></div>}<DashboardContent type={type} suffix={suffix} /></main></div></div>
}

function DashboardContent({ type, suffix }) {
  if (type === 'seller') return <SellerContent suffix={suffix} />
  if (type === 'buyer') return <BuyerContent suffix={suffix} />
  return <AdminContent suffix={suffix} />
}

function DashPageHeader({ eyebrow, title, text, action }) { return <div className="dash-page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</div>{action}</div> }

function SellerContent({ suffix }) {
  const { listings, setListings, offers, setOffers } = useApp()
  const [notice, setNotice] = useState('')
  const nav = useNavigate()
  const currentOffers = offers.slice(0, 6)
  const ownListings = listings.slice(0, 8)
  if (suffix === '/create-listing') return <ListingForm />
  if (suffix === '/listings') return <><DashPageHeader eyebrow="Seller workspace" title="My listings" text="Manage materials you’ve added to this demonstration marketplace." action={<Link className="button button-solid" to="/seller-dashboard/create-listing"><Plus size={16} /> Create listing</Link>} />{notice && <InlineNotice text={notice} />}<div className="table-card"><div className="table-toolbar"><b>{ownListings.length} listings</b><div className="field-with-icon"><Search size={15} /><input placeholder="Search my listings" /></div></div><div className="table-scroll"><table><thead><tr><th>Material</th><th>Location</th><th>Quantity</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{ownListings.map((item) => <tr key={item.id}><td><Link className="table-primary" to={`/marketplace/${item.id}`}>{item.name}</Link><small>{item.seller}</small></td><td>{item.location}</td><td>{item.quantity} {item.quantityUnit}</td><td>{formatPrice(item.price, item.unit)}</td><td><span className={`status-chip ${item.paused ? 'status-pending' : 'status-active'}`}>{item.paused ? 'Paused' : 'Active'}</span></td><td><div className="table-actions"><button title="Edit listing" onClick={() => { setNotice(`Edit demo opened for ${item.name}.`); nav(`/seller-dashboard/create-listing?id=${item.id}`) }}><Pencil size={15} /></button><button title={item.paused ? 'Activate listing' : 'Pause listing'} onClick={() => { setListings((rows) => rows.map((row) => row.id === item.id ? { ...row, paused: !row.paused } : row)); setNotice(`${item.name} ${item.paused ? 'activated' : 'paused'} in this local demo.`) }}>{item.paused ? <Play size={15} /> : <Pause size={15} />}</button><button title="Delete listing" onClick={() => { setListings((rows) => rows.filter((row) => row.id !== item.id)); setNotice(`${item.name} removed from the local demo.`) }}><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div></div></>
  if (suffix === '/offers') return <><DashPageHeader eyebrow="Seller workspace" title="Offers received" text="Review and respond to local demonstration offers." /><OffersTable rows={currentOffers} setOffers={setOffers} seller /></>
  if (suffix === '/messages') return <MessageDemo />
  if (suffix === '/transactions') return <><DashPageHeader eyebrow="Seller workspace" title="Transactions" text="A sample record of completed and in-progress exchanges." /><TransactionsTable /></>
  if (suffix === '/analytics') return <Analytics type="seller" />
  if (suffix === '/profile') return <Profile type="seller" />
  return <SellerOverview listings={listings} offers={currentOffers} />
}

function SellerOverview({ listings, offers }) {
  return <><DashPageHeader eyebrow="Overview" title="Good morning, producer." text="Here’s an overview of your demo marketplace activity." action={<Link className="button button-solid" to="/seller-dashboard/create-listing"><Plus size={16} /> Add a listing</Link>} /><div className="stats-grid"><StatCard icon={<Package />} label="Total listings" value={listings.length} trend="In demo marketplace" /><StatCard icon={<CheckCircle2 />} label="Active listings" value={listings.filter((item) => !item.paused).length} trend="Illustrative data" /><StatCard icon={<HandCoins />} label="Pending offers" value={offers.filter((item) => item.status === 'Pending').length} trend="Review required" /><StatCard icon={<Wallet />} label="Demo earnings" value="৳46,500" trend="Illustrative only" /></div><div className="dashboard-two-col"><section className="dash-panel"><div className="panel-title"><div><h2>Recent offers</h2><p>Latest activity on your materials</p></div><Link to="/seller-dashboard/offers">View all <ArrowRight size={15} /></Link></div><OffersTable rows={offers.slice(0, 4)} compact /></section><section className="dash-panel"><div className="panel-title"><div><h2>Listing performance</h2><p>Views across the past seven days</p></div><span className="demo-tag">DEMO</span></div><MiniChart /><div className="chart-foot"><span>Listing views</span><b>218 <small>sample</small></b></div></section></div><div className="dash-panel quick-actions"><div className="panel-title"><div><h2>Quick actions</h2><p>Keep your marketplace presence up to date.</p></div></div><div><Link to="/seller-dashboard/create-listing"><Plus /> <b>Create a listing</b><span>Add another material to your catalog.</span></Link><Link to="/seller-dashboard/listings"><Package /> <b>Manage listings</b><span>Review active supply and updates.</span></Link><Link to="/seller-dashboard/offers"><HandCoins /> <b>Review offers</b><span>Respond to buyer interest.</span></Link></div></div></>
}

function ListingForm() {
  const { listings, setListings } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')
  const existing = listings.find((item) => item.id === id)
  const [preview, setPreview] = useState(existing?.image ? photo(existing.image, 500) : '')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formKey, setFormKey] = useState(0)
  function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name').toString().trim()
    const price = Number(data.get('price'))
    const quantity = Number(data.get('quantity'))
    if (!name || price <= 0 || quantity <= 0) { setError('Enter a material name, price, and positive quantity.'); return }
    const record = {
      ...(existing || {}), id: existing?.id || `demo-${Date.now()}`, name,
      category: data.get('category').toString(), price, unit: data.get('priceUnit').toString(),
      quantity, quantityUnit: data.get('quantityUnit').toString(), seller: data.get('business')?.toString() || 'Demo Farm Collective',
      location: data.get('location').toString(), condition: data.get('condition').toString(),
      availability: data.get('availability').toString(), frequency: data.get('frequency').toString(),
      minimum: Number(data.get('minimum')) || 1, description: data.get('description').toString(),
      image: existing?.image || 'photo-1464226184884-fa280b87c399', color: existing?.color || '#98764f', tags: ['Seller demo'],
    }
    setListings((rows) => existing ? rows.map((item) => item.id === existing.id ? record : item) : [record, ...rows])
    setSuccess(true); setError('')
  }
  return <><DashPageHeader eyebrow="Seller workspace" title={existing ? 'Edit listing' : 'Create a listing'} text="Add clear details so potential buyers can understand your available supply." /><div className="listing-form-layout">{success ? <div className="dash-panel listing-success"><SuccessState title={existing ? 'Listing updated.' : 'Your listing is live in the demo.'} text="The listing is now visible in the local marketplace and your seller workspace." close={() => navigate('/seller-dashboard/listings')} /><Button variant="outline-dark" onClick={() => { setSuccess(false); setFormKey((key) => key + 1) }}>Create another listing</Button></div> : <form key={formKey} className="dash-panel form-stack listing-form" onSubmit={submit}><div className="panel-title"><div><h2>Material details</h2><p>Fields marked with * are required.</p></div><span className="demo-tag">MOCK LISTING</span></div><div className="form-row"><SelectField label="Material category *" name="category" options={categories} defaultValue={existing?.category} required translateCategories /><Field label="Material name *" name="name" placeholder="e.g. Rice husk" defaultValue={existing?.name} required /></div><div className="form-row"><Field label="Farm / business name" name="business" placeholder="Your business name" defaultValue={existing?.seller} /><Field label="Description" name="description" placeholder="Describe the source and material details" defaultValue={existing?.description} /></div><div className="form-row"><Field label="Available quantity *" name="quantity" type="number" min="0.1" step="0.1" placeholder="e.g. 2" defaultValue={existing?.quantity} required /><SelectField label="Quantity unit" name="quantityUnit" options={['MT', 'tonnes', 'kg', 'bags']} defaultValue={existing?.quantityUnit} /></div><div className="form-row"><Field label="Listed price (৳) *" name="price" type="number" min="1" defaultValue={existing?.price} required /><SelectField label="Price unit" name="priceUnit" options={['kg', 'MT', 'bag']} defaultValue={existing?.unit || 'kg'} /></div><label className="check-option"><input name="negotiable" type="checkbox" defaultChecked /> Price is negotiable</label><div className="form-row"><SelectField label="Condition" name="condition" options={['Dry', 'Sun-dried', 'Freshly collected', 'Composted', 'Baled, dry', 'Raw, sorted', 'Other']} defaultValue={existing?.condition} /><Field label="Location *" name="location" placeholder="District or upazila" defaultValue={existing?.location} required /></div><div className="form-row"><SelectField label="Availability" name="availability" options={['Available now', 'Available this week', 'Harvest season', 'By arrangement']} defaultValue={existing?.availability || 'Available now'} /><SelectField label="Supply frequency" name="frequency" options={['One-time', 'Weekly', 'Monthly', 'Seasonal', 'By arrangement']} defaultValue={existing?.frequency || 'One-time'} /></div><Field label="Minimum order quantity (kg)" name="minimum" type="number" min="1" defaultValue={existing?.minimum || 1} /><div className="form-group"><label>Material image (optional)</label><label className="upload-box"><input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)) }} /><ImagePlus size={19} /><span>{preview ? 'Choose a different image' : 'Upload an image from this device'}</span><small>Image preview only; not uploaded to a server.</small></label>{preview && <img className="upload-preview" src={preview} alt="Listing preview" />}</div><p className="form-error">{error}</p><div className="form-actions"><Button variant="outline-dark" type="button" onClick={() => navigate('/seller-dashboard/listings')}>Cancel</Button><Button type="submit"><Check size={16} /> {existing ? 'Save changes' : 'Publish demo listing'}</Button></div></form>}<aside className="form-side-note"><span className="note-icon"><ShieldCheck /></span><h3>Make a clear listing</h3><p>Accurate details help buyers understand what you can supply. Do not include private information or unverified certification claims.</p><div className="side-note-row"><CheckCircle2 /> Include a specific location</div><div className="side-note-row"><CheckCircle2 /> Add condition and timing</div><div className="side-note-row"><CheckCircle2 /> Keep quantity and units clear</div><p className="form-help">Your listing appears in this local browser demo only.</p></aside></div></>
}

function OffersTable({ rows, setOffers, seller = false, compact = false }) {
  const { t } = useTranslation()
  const { setOffers: saveOffers } = useApp()
  const update = setOffers || saveOffers
  const [note, setNote] = useState('')
  if (!rows.length) return <EmptyState icon={<HandCoins />} title="No offers yet" text="Offers submitted through the demo marketplace will appear here." />
  return <div className={`table-card ${compact ? 'compact-table' : ''}`}><div className="table-scroll"><table><thead><tr><th>{seller ? 'Buyer' : 'Offer ID'}</th><th>Material</th><th>Price</th><th>Quantity</th><th>Date</th><th>Status / actions</th></tr></thead><tbody>{rows.map((offer) => <tr key={offer.id}><td className="table-primary">{seller ? offer.buyer : offer.id}<small>{offer.message}</small></td><td>{marketplaceLabel(t, offer.material, { id: offer.id })}</td><td>৳{offer.price} / kg</td><td>{offer.quantity}</td><td>{offer.date}</td><td><div className="offer-action-cell"><span className={`status-chip status-${offer.status.toLowerCase()}`}>{offer.status}</span>{seller && offer.status === 'Pending' && <div className="table-actions"><button title="Accept offer" onClick={() => { update((items) => items.map((item) => item.id === offer.id ? { ...item, status: 'Accepted' } : item)); setNote('Offer accepted in this local demo.') }}><Check size={14} /></button><button title="Reject offer" onClick={() => { update((items) => items.map((item) => item.id === offer.id ? { ...item, status: 'Rejected' } : item)); setNote('Offer rejected in this local demo.') }}><X size={14} /></button><button title="Counteroffer" onClick={() => { update((items) => items.map((item) => item.id === offer.id ? { ...item, status: 'Countered' } : item)); setNote('A counteroffer was recorded in this local demo.') }}><RotateCcw size={14} /></button></div>}</div></td></tr>)}</tbody></table></div>{note && <InlineNotice text={note} />}</div>
}

function BuyerContent({ suffix }) {
  const { offers } = useApp()
  if (suffix === '/browse') return <><DashPageHeader eyebrow="Buyer workspace" title="Browse materials" text="Explore the same sample listings available in the public marketplace." action={<Link className="text-link" to="/marketplace">Open full marketplace <ArrowUpRight size={15} /></Link>} /><MarketplaceEmbedded /></>
  if (suffix === '/recommendations') return <Recommendations />
  if (suffix === '/requirement') return <RequirementForm />
  if (suffix === '/offers') return <><DashPageHeader eyebrow="Buyer workspace" title="My offers" text="Offers submitted in this frontend demo." /><OffersTable rows={offers} /></>
  if (suffix === '/messages') return <MessageDemo />
  if (suffix === '/history') return <><DashPageHeader eyebrow="Buyer workspace" title="Purchase history" text="Sample transaction records from the marketplace demonstration." /><TransactionsTable buyer /></>
  if (suffix === '/analytics') return <Analytics type="buyer" />
  if (suffix === '/profile') return <Profile type="buyer" />
  return <BuyerOverview />
}

function BuyerOverview() {
  const { offers, saved, listings } = useApp()
  const recommendations = calculateDemoMatches(listings).slice(0, 3)
  return <><DashPageHeader eyebrow="Overview" title="Good morning, sourcing team." text="Your Notunayon buyer activity, gathered in one place." action={<Link className="button button-solid" to="/buyer-dashboard/requirement"><Plus size={16} /> Post a requirement</Link>} /><div className="stats-grid"><StatCard icon={<HandCoins />} label="Active offers" value={offers.filter((item) => item.status === 'Pending').length} trend="Awaiting response" /><StatCard icon={<CheckCircle2 />} label="Accepted offers" value={offers.filter((item) => item.status === 'Accepted').length} trend="Sample records" /><StatCard icon={<ShoppingBag />} label="Demo purchases" value="5" trend="Illustrative data" /><StatCard icon={<Heart />} label="Saved listings" value={saved.length} trend="This browser session" /></div><div className="dashboard-two-col"><div className="dash-panel"><div className="panel-title"><div><h2>Suggested materials</h2><p>Explore sample listings in the marketplace.</p></div><Link to="/buyer-dashboard/recommendations">See matches <ArrowRight size={15} /></Link></div><div className="compact-recommendations">{recommendations.map((match) => <RecommendationRow key={match.listing.id} match={match} />)}</div></div><div className="dash-panel"><div className="panel-title"><div><h2>Quick actions</h2><p>Continue your sourcing work.</p></div></div><div className="buyer-quick"><Link to="/buyer-dashboard/browse"><Search />Browse materials <ArrowRight size={14} /></Link><Link to="/buyer-dashboard/requirement"><Plus />Post a requirement <ArrowRight size={14} /></Link><Link to="/buyer-dashboard/offers"><HandCoins />Review my offers <ArrowRight size={14} /></Link></div></div></div></>
}

function MarketplaceEmbedded() {
  const { listings } = useApp()
  const [query, setQuery] = useState('')
  const rows = filterListings(listings, query).slice(0, 6)
  return <><SearchBox onSearch={setQuery} compact /><div className="listing-grid dash-listing-grid">{rows.map((item) => <ListingCard key={item.id} listing={item} />)}</div><Link className="button button-outline-dark" to="/marketplace">Open marketplace filters <ArrowRight size={16} /></Link></>
}

function Recommendations() {
  const { t } = useTranslation()
  const { listings } = useApp()
  const matches = calculateDemoMatches(listings)
  return <><DashPageHeader eyebrow="AI matching · demonstration preview" title="Supplier recommendations" text="A simple illustrative ranking that combines material, location, quantity, price, and condition fit." /><div className="matching-config"><div><span className="eyebrow">Sample buyer requirements</span><h3>{marketplaceLabel(t, 'Rice Husk', { fixed: true })} · 1–5 MT · Delivery near Gazipur</h3><p>Target price: ৳24/kg or less · Preferred condition: dry</p></div><span className="demo-tag"><Sparkles size={14} /> DEMONSTRATION PREVIEW</span></div><div className="weight-notice"><CircleHelp size={17} /><p><b>Illustrative matching weights:</b> material compatibility 35%, location proximity 25%, quantity 20%, price 15%, condition 5%. Hard requirements like material type and minimum quantity are filters, not score factors. These weights are not validated performance metrics.</p></div><div className="recommendation-list">{matches.map(({ listing, ...match }) => <RecommendationCard key={listing.id} listing={listing} match={match} />)}</div></>
}

function RecommendationCard({ listing, match }) {
  const { t } = useTranslation()
  return <article className="recommendation-card"><div className="recommendation-image" style={{ backgroundColor: listing.color }}><img src={photo(listing.image, 380)} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} /></div><div className="recommendation-copy"><span className="request-category">{marketplaceLabel(t, listing.category, { type: 'category' })}</span><h3>{marketplaceLabel(t, listing.name, { id: listing.id })}</h3><p>{listing.seller} · <MapPin size={14} /> {listing.location} <span>· {match.distance} (illustrative)</span></p><div className="recommendation-reasons">{match.reasons.map((reason) => <span key={reason}><Check size={13} /> {reason}</span>)}</div></div><div className="recommendation-score"><div>{match.score}<small>%</small></div><span>Compatibility<br />demo score</span><Link to={`/marketplace/${listing.id}`}>View listing <ArrowRight size={14} /></Link></div></article>
}

function RecommendationRow({ match }) {
  const { t } = useTranslation()
  const { listing, score, distance } = match
  return <Link className="recommendation-row" to={`/marketplace/${listing.id}`}><span className="row-material"><i style={{ backgroundColor: listing.color }}><Sprout size={17} /></i><span><b>{marketplaceLabel(t, listing.name, { id: listing.id })}</b><small>{listing.seller} · {distance}</small></span></span><strong>{score}% <small>demo match</small></strong></Link>
}

function RequirementForm() {
  const { requests, setRequests } = useApp()
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  function submit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const material = data.get('material').toString().trim()
    const quantity = data.get('quantity').toString().trim()
    if (!material || !quantity) { setError('Add a material and quantity to continue.'); return }
    setRequests([{ id: `req-${Date.now()}`, material, category: data.get('category').toString(), quantity: `${quantity} ${data.get('unit')}`, location: data.get('location').toString(), budget: data.get('price').toString() ? `Up to ৳${data.get('price')} / kg` : 'Negotiable', buyer: 'Demo buyer company', date: 'Just now', deliveryDate: data.get('date')?.toString(), requirements: data.get('notes')?.toString(), condition: data.get('condition').toString() || 'Flexible' }, ...requests]); setDone(true)
  }
  return <><DashPageHeader eyebrow="Buyer workspace" title="Post a sourcing requirement" text="Describe what you’re looking for to create a local demo buyer request." />{done ? <div className="dash-panel listing-success"><SuccessState title="Requirement posted." text="Your request is now listed in the local buyer requests demo." close={() => setDone(false)} /><Link className="button button-outline-dark" to="/requests">View buyer requests</Link></div> : <form className="dash-panel form-stack requirement-form" onSubmit={submit}><div className="form-row"><Field label="Material required *" name="material" placeholder="e.g. rice husk" required /><SelectField label="Material category" name="category" options={categories} translateCategories /></div><div className="form-row"><Field label="Quantity *" name="quantity" type="number" min="0.1" step="0.1" placeholder="e.g. 5" required /><SelectField label="Unit" name="unit" options={['MT', 'tonnes', 'kg']} /></div><div className="form-row"><Field label="Target price (৳ / kg)" name="price" type="number" min="1" placeholder="Optional" /><Field label="Delivery location" name="location" placeholder="District, Bangladesh" required /></div><div className="form-row"><Field label="Required condition" name="condition" placeholder="e.g. dry, sorted" /><Field label="Delivery date" name="date" type="date" /></div><Field label="Additional requirements" name="notes" as="textarea" placeholder="Share schedule, collection, or other details" /><p className="form-error">{error}</p><Button type="submit">Post demo requirement <ArrowRight size={16} /></Button><p className="form-help">The request is stored in this page state only. No suppliers are contacted.</p></form>}</>
}

function AdminContent({ suffix }) {
  const { t } = useTranslation()
  const { listings, setListings, requests } = useApp()
  const [users, setUsers] = useState(usersSeed)
  const [message, setMessage] = useState('')
  if (suffix === '/users' || suffix === '/verification') return <><DashPageHeader eyebrow="Admin demonstration" title={suffix === '/users' ? 'Users' : 'Business verification'} text="Review sample marketplace profiles and update demo status." /><div className="table-card"><div className="table-scroll"><table><thead><tr><th>Business / user</th><th>Account type</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead><tbody>{users.map((item, index) => <tr key={item.name}><td className="table-primary">{item.name}<small>Demo profile #{index + 1}</small></td><td>{item.type}</td><td>{item.location}</td><td><span className="status-chip status-pending">{item.status}</span></td><td><div className="table-actions"><button title="Approve demo profile" onClick={() => { setUsers((rows) => rows.map((user, i) => i === index ? { ...user, status: 'Approved demo' } : user)); setMessage(`${item.name} approved in local demo.`) }}><Check size={15} /></button><button title="Reject demo profile" onClick={() => { setUsers((rows) => rows.map((user, i) => i === index ? { ...user, status: 'Declined demo' } : user)); setMessage(`${item.name} declined in local demo.`) }}><X size={15} /></button><button title="View demo profile" onClick={() => setMessage(`Viewing sample profile for ${item.name}.`)}><Eye size={15} /></button></div></td></tr>)}</tbody></table></div>{message && <InlineNotice text={message} />}</div></>
  if (suffix === '/listings') return <><DashPageHeader eyebrow="Admin demonstration" title="Marketplace listings" text="Review sample material records or remove one from this browser demo." /><div className="table-card"><div className="table-scroll"><table><thead><tr><th>Material</th><th>Seller</th><th>Location</th><th>Quantity</th><th>Price</th><th>Actions</th></tr></thead><tbody>{listings.map((item) => <tr key={item.id}><td><Link className="table-primary" to={`/marketplace/${item.id}`}>{marketplaceLabel(t, item.name, { id: item.id })}</Link></td><td>{item.seller}</td><td>{item.location}</td><td>{item.quantity} {item.quantityUnit}</td><td>{formatPrice(item.price)}</td><td><div className="table-actions"><button onClick={() => setMessage(`Viewing listing ${marketplaceLabel(t, item.name, { id: item.id })}.`)} title="View listing"><Eye size={15} /></button><button onClick={() => { setListings((rows) => rows.filter((row) => row.id !== item.id)); setMessage(`${marketplaceLabel(t, item.name, { id: item.id })} removed from demo.`) }} title="Remove listing"><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div>{message && <InlineNotice text={message} />}</div></>
  if (suffix === '/categories') return <><DashPageHeader eyebrow="Admin demonstration" title="Material categories" text="Categories used across the mock marketplace." /><div className="admin-category-grid">{categories.map((category, index) => <div key={category}><span>0{index + 1}</span><b>{marketplaceLabel(t, category, { type: 'category' })}</b><small>{listings.filter((item) => item.category === category).length} sample listings</small><button onClick={() => setMessage(`${marketplaceLabel(t, category, { type: 'category' })} selected for demo editing.`)}><Pencil size={14} /> Edit label</button></div>)}</div>{message && <InlineNotice text={message} />}</>
  if (suffix === '/requests') return <><DashPageHeader eyebrow="Admin demonstration" title="Buyer requests" text="Sample sourcing requirements posted by businesses." />{requests.map((item) => <RequestCard key={item.id} request={item} />)}</>
  if (suffix === '/transactions') return <><DashPageHeader eyebrow="Admin demonstration" title="Transactions" text="Illustrative sample transaction records. No payments are processed." /><TransactionsTable /></>
  if (suffix === '/reports') return <><DashPageHeader eyebrow="Admin demonstration" title="Reports" text="A demonstration view for content and activity reports." /><div className="dash-panel"><EmptyState icon={<CircleHelp />} title="No open reports" text="This prototype has no submitted user reports." /></div></>
  if (suffix === '/settings') return <><DashPageHeader eyebrow="Admin demonstration" title="Settings" text="Prototype settings are intentionally not connected to a production service." /><div className="dash-panel settings-demo"><Settings size={25} /><h3>Demo platform configuration</h3><p>Authentication, permissions, listings, and all sample records are frontend-only. No admin controls or data persist to a server.</p><label><input type="checkbox" defaultChecked disabled /> Show demonstration labels</label></div></>
  return <><DashPageHeader eyebrow="Admin overview" title="Marketplace at a glance." text="A compact overview of illustrative users, listings, and exchange activity." /><div className="stats-grid"><StatCard icon={<Users />} label="Total users" value="42" trend="Sample profiles" /><StatCard icon={<ShoppingBag />} label="Buyers" value="24" trend="Illustrative" /><StatCard icon={<Wheat />} label="Sellers" value="18" trend="Illustrative" /><StatCard icon={<Package />} label="Active listings" value={listings.filter((item) => !item.paused).length} trend="Local demo data" /><StatCard icon={<ShieldCheck />} label="Pending verifications" value="3" trend="Sample records" /><StatCard icon={<ClipboardList />} label="Transactions" value="5" trend="Demo only" /></div><div className="dashboard-two-col"><div className="dash-panel"><div className="panel-title"><div><h2>Recent profiles</h2><p>Sample buyer and seller accounts</p></div><Link to="/admin/users">View users <ArrowRight size={15} /></Link></div><div className="admin-user-list">{users.slice(0, 3).map((item) => <div key={item.name}><i><UserRound size={17} /></i><span><b>{item.name}</b><small>{item.type} · {item.location}</small></span><span className="status-chip status-pending">{item.status}</span></div>)}</div></div><div className="dash-panel"><div className="panel-title"><div><h2>Listing activity</h2><p>Illustrative listing distribution</p></div></div><MiniChart /><div className="chart-foot"><span>Sample active listings</span><b>{listings.filter((item) => !item.paused).length}</b></div></div></div></>
}

function TransactionsTable({ buyer = false }) {
  const { t } = useTranslation()
  return <div className="table-card"><div className="table-scroll"><table><thead><tr><th>Transaction ID</th><th>{buyer ? 'Seller' : 'Buyer'}</th><th>Material</th><th>Quantity</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead><tbody>{transactionsSeed.map((item) => <tr key={item.id}><td className="table-primary">{item.id}<small>Demo record</small></td><td>{item.buyer}</td><td>{marketplaceLabel(t, item.material, { id: item.id })}</td><td>{item.quantity}</td><td>{item.amount}</td><td>{item.date}</td><td><span className={`status-chip ${item.status === 'Completed' ? 'status-active' : 'status-pending'}`}>{item.status}</span></td></tr>)}</tbody></table></div></div>
}

function Analytics({ type }) {
  const { t } = useTranslation()
  const buyer = type === 'buyer'
  return <><DashPageHeader eyebrow={`${type} workspace`} title={buyer ? 'Purchase analytics' : 'Listing analytics'} text="Illustrative activity charts. These numbers do not represent verified marketplace performance." /><div className="stats-grid"><StatCard icon={<Eye />} label="Listing views" value={buyer ? '84' : '218'} trend="Sample count" /><StatCard icon={<HandCoins />} label={buyer ? 'Offers sent' : 'Offers received'} value={buyer ? '12' : '18'} trend="Illustrative" /><StatCard icon={<TrendingUp />} label={buyer ? 'Spend this month' : 'Sales this month'} value="৳24,500" trend="Demo value" /><StatCard icon={<CalendarDays />} label="Active days" value="22" trend="Sample period" /></div><div className="dashboard-two-col"><div className="dash-panel"><div className="panel-title"><div><h2>{buyer ? 'Sourcing activity' : 'Listing views'}</h2><p>Last 7 days · illustrative data</p></div><span className="demo-tag">DEMO</span></div><MiniChart tall /><div className="chart-foot"><span>Week to date</span><b>{buyer ? '12 actions' : '218 views'}</b></div></div><div className="dash-panel"><div className="panel-title"><div><h2>Category breakdown</h2><p>Sample marketplace activity</p></div></div><div className="category-bars">{[['Rice by-products', 76], ['Crop residues', 58], ['Animal manure', 42], ['Poultry waste', 30]].map(([label, amount]) => <div key={label}><span>{marketplaceLabel(t, label, { type: 'category' })}</span><div><i style={{ width: `${amount}%` }} /></div><b>{amount}%</b></div>)}</div></div></div></>
}

function Profile({ type }) {
  const { user, setUser } = useApp()
  const [saved, setSaved] = useState(false)
  const account = user || { name: 'Demo User', type }
  return <><DashPageHeader eyebrow={`${type} workspace`} title="Profile settings" text="Update a local demonstration profile. No data leaves this browser." />{saved ? <InlineNotice text="Profile updated in this local demo." /> : null}<form className="dash-panel form-stack profile-form" onSubmit={(e) => { e.preventDefault(); const data = new FormData(e.currentTarget); const next = { ...account, name: data.get('name'), type }; localStorage.setItem('notunayon-demo-user', JSON.stringify(next)); setUser(next); setSaved(true) }}><div className="panel-title"><div><h2>Basic information</h2><p>Demo user profile</p></div><span className="demo-tag">LOCAL</span></div><div className="form-row"><Field label="Full name" name="name" defaultValue={account.name} required /><Field label="Business name" name="business" placeholder="Business or farm name" /></div><div className="form-row"><Field label="Email" name="email" type="email" placeholder="you@example.com" /><Field label="Phone" name="phone" placeholder="+880 1XXX-XXXXXX" /></div><div className="form-row"><Field label="Location" name="location" placeholder="District, Bangladesh" /><Field label={type === 'seller' ? 'Business type' : 'Industry'} name="businessType" placeholder="Choose your business type" /></div><Button type="submit"><Check size={16} /> Save local changes</Button></form></>
}

function MessageDemo() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const [messages, setMessages] = useState(['Hello, I’m interested in discussing your material listing.', 'Thanks for reaching out. We can discuss collection timing and available quantities.'])
  const [value, setValue] = useState('')
  const contacts = [['Mrittika Organics', 'Rice Husk', '10:24 AM'], ['GreenFlame Bioenergy', 'Rice Straw', 'Yesterday'], ['Shobuj Krishi Inputs', 'Cattle Manure', '18 Nov']]
  function send(e) { e.preventDefault(); if (!value.trim()) return; setMessages([...messages, value.trim()]); setValue('') }
  return <><DashPageHeader eyebrow="Workspace messages" title="Conversations" text="A small interactive messaging demo. Messages stay in this page state only." /><div className="message-app"><aside className="message-contacts"><div className="message-contacts-head"><h3>Messages</h3><button className="icon-button" title="New message" onClick={() => setActive(0)}><Plus size={16} /></button></div>{contacts.map(([name, material, time], index) => <button className={`contact-row ${active === index ? 'active' : ''}`} key={name} onClick={() => setActive(index)}><span className="contact-avatar">{name.slice(0, 1)}</span><span><b>{name}</b><small>{marketplaceLabel(t, material, { fixed: true })}</small></span><time>{time}</time></button>)}</aside><section className="message-thread"><div className="thread-head"><span className="contact-avatar">{contacts[active][0].slice(0, 1)}</span><div><b>{contacts[active][0]}</b><small>Regarding {marketplaceLabel(t, contacts[active][1], { fixed: true })} · demo contact</small></div><span className="online-demo"><i /> Demo thread</span></div><div className="message-history"><span className="date-separator">Today · demonstration thread</span>{messages.map((message, index) => <div className={`message-bubble ${index % 2 ? 'mine' : ''}`} key={`${message}-${index}`}><p>{message}</p><small>{index % 2 ? 'You' : contacts[active][0]} · {index ? '10:24 AM' : '10:20 AM'}</small></div>)}</div><form className="message-compose" onSubmit={send}><input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Write a demo message…" aria-label="Write a demo message" /><button className="button button-solid" type="submit"><Send size={16} /> Send</button></form></section></div></>
}

function StatCard({ icon, label, value, trend }) { return <div className="stat-card"><div className="stat-card-top"><span>{icon}</span><MoreHorizontal size={17} /></div><strong>{value}</strong><b>{label}</b><small>{trend}</small></div> }

function MiniChart({ tall = false }) {
  const heights = [30, 45, 37, 61, 50, 76, 62, 88, 59, 71, 48, 82]
  return <div className={`mini-chart ${tall ? 'chart-tall' : ''}`}><div className="chart-lines"><i /><i /><i /><i /></div><div className="chart-bars">{heights.map((height, index) => <span key={index} style={{ height: `${height}%` }} className={index === 7 ? 'highlight' : ''} />)}</div><div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div>
}

function EmptyState({ icon, title, text, action }) { return <div className="empty-state"><span>{icon}</span><h3>{title}</h3><p>{text}</p>{action}</div> }

function SuccessState({ title, text, close }) { return <div className="success-state"><span><Check size={22} /></span><h3>{title}</h3><p>{text}</p>{close && <button className="text-link" onClick={close}>Continue <ArrowRight size={15} /></button>}</div> }

function Modal({ title, close, children }) {
  useEffect(() => { function handle(e) { if (e.key === 'Escape') close() } window.addEventListener('keydown', handle); return () => window.removeEventListener('keydown', handle) }, [close])
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-heading"><div className="modal-head"><h2 id="modal-heading">{title}</h2><button className="icon-button" onClick={close} aria-label="Close dialog"><X /></button></div>{children}</section></div>
}

function Field({ label, name, type = 'text', placeholder, required = false, defaultValue, min, max, step, as, options }) {
  const id = `field-${name}`
  return <div className="form-group"><label htmlFor={id}>{label}</label>{as === 'textarea' ? <textarea id={id} name={name} placeholder={placeholder} required={required} defaultValue={defaultValue} rows="3" /> : as === 'select' ? <div className="select-shell"><select id={id} name={name} required={required}>{options?.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={15} /></div> : <input id={id} name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} min={min} max={max} step={step} />}</div>
}

function SelectField({ label, name, options, defaultValue, required = false, translateCategories = false }) {
  const { t } = useTranslation()
  return <div className="form-group"><label htmlFor={`field-${name}`}>{label}</label><div className="select-shell"><select id={`field-${name}`} name={name} defaultValue={defaultValue || options[0]} required={required}>{options.map((option) => <option key={option} value={option}>{translateCategories ? marketplaceLabel(t, option, { type: 'category' }) : option}</option>)}</select><ChevronDown size={15} /></div></div>
}

function InlineNotice({ text }) { return <div className="inline-notice"><CheckCircle2 size={17} /> {text}</div> }

function NotFound() {
  const { t } = useTranslation()
  return <main className="page-main not-found"><div className="container"><span className="eyebrow">{t('notFound.eyebrow')}</span><h1>{t('notFound.title')}</h1><p>{t('notFound.text')}</p><div><Link className="button button-solid" to="/">{t('notFound.home')} <ArrowRight size={16} /></Link><Link className="button button-outline-dark" to="/marketplace">{t('notFound.browse')}</Link></div></div></main>
}

export default App
