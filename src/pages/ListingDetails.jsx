import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  BadgeCheck,
  CircleHelp,
  HandCoins,
  Heart,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
  Sprout,
} from 'lucide-react'
import { useApp } from '../context/useApp.js'
import { formatPrice } from '../utils.js'
import { marketplaceLabel, photo } from '../utils/marketplace.js'
import ListingCard from '../components/block/ListingCard.jsx'
import OfferModal from '../components/block/OfferModal.jsx'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'

function Spec({ title, value }) {
  return (
    <div className="spec-item">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default function ListingDetails() {
  const { t } = useTranslation()
  const { id } = useParams()
  const { listings, saved, setSaved } = useApp()
  const [offerOpen, setOfferOpen] = useState(false)
  const [modalMode, setModalMode] = useState('offer')

  const listing = listings.find((item) => item.id === id)
  if (!listing) {
    return (
      <main className="page-main">
        <div className="container">
          <EmptyState
            icon={<Package />}
            title={t('marketplace.listingUnavailable')}
            text={t('marketplace.listingUnavailableText')}
            action={
              <Link className="button button-solid" to="/marketplace">
                {t('marketplace.back')}
              </Link>
            }
          />
        </div>
      </main>
    )
  }

  const isSaved = saved.includes(id)
  const similar = listings
    .filter((item) => item.id !== id && item.category === listing.category)
    .slice(0, 3)

  return (
    <main className="page-main detail-page">
      <div className="container">
        <Link className="back-link" to="/marketplace">
          <ArrowLeft size={16} /> Back to marketplace
        </Link>
        <div className="detail-layout">
          <div className="detail-main">
            <div className="detail-image" style={{ backgroundColor: listing.color }}>
              <img
                src={photo(listing.image, 1200)}
                alt={marketplaceLabel(t, listing.name, { id: listing.id })}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="demo-image-label">Demonstration listing image</span>
            </div>
            <div className="detail-section">
              <span className="eyebrow">About this material</span>
              <h2>Material overview</h2>
              <p>{listing.description}</p>
            </div>
            <div className="detail-section">
              <span className="eyebrow">Listing information</span>
              <h2>Specifications provided by seller</h2>
              <div className="spec-grid">
                <Spec title="Condition" value={listing.condition} />
                <Spec title="Availability" value={listing.availability} />
                <Spec title="Supply frequency" value={listing.frequency} />
                <Spec
                  title="Minimum order"
                  value={`${listing.minimum.toLocaleString('en-BD')} kg`}
                />
                <Spec title="Pickup location" value={listing.location} />
                <Spec title="Delivery" value="Discuss with seller" />
              </div>
              <p className="quality-note">
                <CircleHelp size={15} /> Listing details are provided for demonstration; Notunayon
                does not verify material quality.
              </p>
            </div>
            <div className="detail-section seller-card">
              <div className="seller-avatar">
                <Sprout />
              </div>
              <div>
                <span className="eyebrow">Listed by</span>
                <h3>{listing.seller}</h3>
                <p>
                  <MapPin size={14} /> {listing.location}, Bangladesh · Demo business profile
                </p>
              </div>
              <BadgeCheck size={21} className="seller-check" />
            </div>
          </div>
          <aside className="detail-sidebar">
            <span className="detail-category">
              {marketplaceLabel(t, listing.category, { type: 'category' })}
            </span>
            <h1>{marketplaceLabel(t, listing.name, { id: listing.id })}</h1>
            <div className="detail-price">
              {formatPrice(listing.price, listing.unit)} <span>listed price</span>
            </div>
            <div className="detail-quantity">
              <Package size={17} /> {listing.quantity} {listing.quantityUnit} available
            </div>
            <div className="detail-location">
              <MapPin size={17} /> {listing.location}, Bangladesh
            </div>
            <span className="availability-chip">
              <i /> {listing.availability}
            </span>
            <div className="detail-actions">
              <Button
                onClick={() => {
                  setModalMode('offer')
                  setOfferOpen(true)
                }}
              >
                <HandCoins size={17} /> Make an offer
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  setModalMode('contact')
                  setOfferOpen(true)
                }}
              >
                <MessageCircle size={17} /> Contact seller
              </Button>
              <button
                className={`save-detail ${isSaved ? 'is-saved' : ''}`}
                onClick={() =>
                  setSaved(isSaved ? saved.filter((item) => item !== id) : [...saved, id])
                }
              >
                <Heart size={17} fill={isSaved ? 'currentColor' : 'none'} />{' '}
                {isSaved ? 'Saved listing' : 'Save listing'}
              </button>
            </div>
            <div className="secure-note">
              <ShieldCheck size={17} />
              <span>
                <b>Demo marketplace</b>
                <br />
                No payments or transactions are processed here.
              </span>
            </div>
          </aside>
        </div>
        {similar.length > 0 && (
          <section className="similar-listings">
            <SectionHeading eyebrow="Similar materials" title="Explore related listings" />
            <div className="listing-grid">
              {similar.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </section>
        )}
      </div>
      {offerOpen && (
        <OfferModal
          listing={listing}
          mode={modalMode}
          open={offerOpen}
          close={() => setOfferOpen(false)}
        />
      )}
    </main>
  )
}
