import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  HandCoins,
  Recycle,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Truck,
  Wheat,
} from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import { marketplaceLabel } from '../utils/marketplace.ts'
import EnquiryForm from '../components/block/EnquiryForm.tsx'
import ListingCard from '../components/block/ListingCard.tsx'
import MatchingPreview from '../components/block/MatchingPreview.tsx'
import SearchBox from '../components/block/SearchBox.tsx'
import SupplyMap from '../components/block/SupplyMap.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'

export default function Home() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { listings } = useApp()

  const examples =
    i18n.resolvedLanguage === 'bn'
      ? [
          'রাজশাহীর ধানের তুষ',
          '৩০ টাকার নিচে গরুর গোবর',
          'পোল্ট্রি লিটার, ৫ টন',
          'রংপুরের ধানের খড়',
        ]
      : [
          'Rice husk near Rajshahi',
          'Cow manure under ৳30/kg',
          'Poultry litter, 5 tonnes',
          'Rice straw in Rangpur',
        ]

  const fresh = listings.filter((item) => !item.paused).slice(0, 6)

  const processSteps: Array<[ReactNode, string, string, string]> = [
    [
      <ClipboardList />,
      '01',
      'Producers list',
      'Describe your by-product, quantity, condition, and collection location.',
    ],
    [
      <Search />,
      '02',
      'Buyers discover',
      'Search listings and compare materials from producers in different regions.',
    ],
    [
      <HandCoins />,
      '03',
      'Offers are discussed',
      'Send a local demo offer and discuss quantity, pricing, and delivery.',
    ],
    [
      <Truck />,
      '04',
      'Arrange the exchange',
      'Buyer and seller coordinate collection or transport directly.',
    ],
  ]

  return (
    <main>
      <section className="hero">
        <div className="hero-photo" role="img" aria-label="Lush green farmland in Bangladesh" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">
              <span className="kicker-dot" /> {t('home.kicker')}
            </span>
            <h1>{t('home.title')}</h1>
            <p>{t('home.subtitle')}</p>
            <div className="hero-ctas">
              <Link className="button button-light" to="/marketplace">
                {t('home.findMaterials')} <ArrowRight size={17} />
              </Link>
              <Link className="button button-outline-light" to="/register">
                {t('home.listByProducts')}
              </Link>
            </div>
          </div>
          <div className="hero-search-panel">
            <div className="search-panel-label">
              <span>
                <Sparkles size={16} /> Smart material search
              </span>
              <small>Demo experience</small>
            </div>
            <SearchBox
              onSearch={(query) =>
                navigate(`/marketplace${query ? `?q=${encodeURIComponent(query)}` : ''}`)
              }
            />
            <div className="search-suggestions">
              <span>Try</span>
              {examples.map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(`/marketplace?q=${encodeURIComponent(item)}`)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="hero-footnote">
            <span>
              <ShieldCheck size={16} /> Local listings and supplier discovery
            </span>
            <span>Illustrative marketplace data</span>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-inner">
          <span>Connecting Bangladesh’s</span>
          <div>
            <Wheat size={18} /> Producers
          </div>
          <div>
            <Recycle size={18} /> Circular businesses
          </div>
          <div>
            <Truck size={18} /> Local logistics
          </div>
          <div>
            <Sprout size={18} /> Resource innovators
          </div>
        </div>
      </section>

      <section className="section discovery-section" id="discover">
        <div className="container">
          <SectionHeading
            eyebrow="Find supply around you"
            title="A better way to source local materials."
            text="Explore sample supply areas and discover agricultural by-products across Bangladesh."
            action={
              <Link className="text-link" to="/marketplace">
                Explore marketplace <ArrowRight size={16} />
              </Link>
            }
          />
          <SupplyMap />
        </div>
      </section>

      <section className="section split-opportunity">
        <div className="container opportunity-grid">
          <article className="opportunity-card producer-card">
            <span className="op-icon">
              <Wheat size={24} />
            </span>
            <span className="eyebrow">For producers</span>
            <h2>Turn your by-products into income.</h2>
            <p>
              Connect farm, mill, and processing residues with businesses looking for practical local
              supply.
            </p>
            <div className="material-pills">
              <span>{marketplaceLabel(t, 'Rice Husk', { fixed: true })}</span>
              <span>{marketplaceLabel(t, 'Cattle Manure', { fixed: true })}</span>
              <span>{marketplaceLabel(t, 'Poultry Litter', { fixed: true })}</span>
              <span>{marketplaceLabel(t, 'Crop residues', { type: 'category' })}</span>
            </div>
            <Link className="button button-solid" to="/register">
              List your by-products <ArrowRight size={17} />
            </Link>
            <div className="opportunity-watermark">
              <Sprout size={150} />
            </div>
          </article>
          <article className="opportunity-card buyer-card">
            <span className="op-icon">
              <Boxes size={24} />
            </span>
            <span className="eyebrow">For buyers</span>
            <h2>Find the right material for your business.</h2>
            <p>
              Compare available materials by type, quantity, price, location, condition, and supply
              schedule.
            </p>
            <ul className="check-list">
              <li>
                <Check size={16} /> Browse locally listed supply
              </li>
              <li>
                <Check size={16} /> Compare suppliers and quantities
              </li>
              <li>
                <Check size={16} /> Start a direct conversation
              </li>
            </ul>
            <Link className="button button-outline-dark" to="/marketplace">
              Browse materials <ArrowRight size={17} />
            </Link>
          </article>
        </div>
      </section>

      <section className="section listings-section" id="listings">
        <div className="container">
          <SectionHeading
            eyebrow="Fresh on the market"
            title="By-products with new potential."
            text="A selection of recent sample listings from producers around the country."
            action={
              <Link className="text-link" to="/marketplace">
                View all materials <ArrowRight size={16} />
              </Link>
            }
          />
          <div className="listing-grid">
            {fresh.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
          <p className="demo-disclaimer">
            <CircleHelp size={15} /> Prices and availability are illustrative demo data, not verified
            market quotations.
          </p>
        </div>
      </section>

      <section className="request-band">
        <div className="container request-band-inner">
          <div>
            <span className="eyebrow">Buyer requests</span>
            <h2>Searching for a material that isn’t listed?</h2>
            <p>See what businesses are sourcing or post a requirement of your own.</p>
          </div>
          <Link className="button button-light" to="/requests">
            Explore buyer requests <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section process-section" id="how-it-works">
        <div className="container">
          <SectionHeading
            eyebrow="Straightforward by design"
            title="A simple path from supply to use."
            text="Notunayon helps people find one another. Buyers and sellers agree on the details directly."
          />
          <div className="step-grid">
            {processSteps.map(([icon, no, title, text]) => (
              <div className="step-card" key={no}>
                <div className="step-icon">{icon}</div>
                <span className="step-number">{no}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="matching-section">
        <div className="container matching-grid">
          <div className="matching-copy">
            <span className="eyebrow">Thoughtful supplier discovery</span>
            <h2>Find promising material matches, faster.</h2>
            <p>
              Explore suppliers based on material fit, location, available quantity, listed price,
              and condition. Recommendations are a frontend demonstration—not a live AI service.
            </p>
            <Link className="text-link" to="/buyer-dashboard/recommendations">
              Explore matching preview <ArrowRight size={16} />
            </Link>
          </div>
          <MatchingPreview />
        </div>
      </section>

      <section className="section sourcing-section">
        <div className="container sourcing-grid">
          <div className="sourcing-copy">
            <span className="eyebrow">Supply desk</span>
            <h2>Need help sourcing for your business?</h2>
            <p>
              Share what your team is looking for. Our sourcing request demo helps organize your
              material, volume, and delivery needs.
            </p>
            <div className="sourcing-benefits">
              <span>
                <CheckCircle2 size={18} /> Share your volume and location
              </span>
              <span>
                <CheckCircle2 size={18} /> Describe your quality preferences
              </span>
              <span>
                <CheckCircle2 size={18} /> Receive a local confirmation
              </span>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>

      <section className="logistics-teaser">
        <div className="container logistics-teaser-inner">
          <div className="logistics-image" />
          <div className="logistics-copy">
            <span className="eyebrow">Moving resources forward</span>
            <h2>Local logistics can connect supply with demand.</h2>
            <p>
              Transport providers can support collection, consolidation, and delivery between
              agricultural producers and material buyers.
            </p>
            <Link className="button button-outline-dark" to="/logistics">
              Explore logistics <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="impact-section">
        <div className="container">
          <div className="impact-head">
            <span className="eyebrow">An early-stage idea with room to grow</span>
            <h2>Better use starts with better connections.</h2>
            <p>Illustrative demonstration figures for this frontend prototype.</p>
          </div>
          <div className="impact-stats">
            {[
              ['12', 'Sample listings'],
              ['5.2 MT', 'Illustrative materials exchanged'],
              ['18', 'Demo producer profiles'],
              ['24', 'Demo buyer profiles'],
            ].map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
