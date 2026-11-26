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
import { useApp } from '../context/useApp.ts'
import { formatPrice } from '../utils.ts'
import { marketplaceLabel, photo } from '../utils/marketplace.ts'
import ListingCard from '../components/block/ListingCard.tsx'
import OfferModal from '../components/block/OfferModal.tsx'
import Button from '../components/ui/Button.tsx'
import { buttonClasses } from '../components/ui/buttonStyles.ts'
import EmptyState from '../components/ui/EmptyState.tsx'
import SectionHeading from '../components/ui/SectionHeading.tsx'

function Spec({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <span className="mb-1 block text-[9px] text-subtle">{title}</span>
      <strong className="block text-[11px] font-[620] text-ink-soft">{value}</strong>
    </div>
  )
}

export default function ListingDetails() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const { listings, saved, setSaved } = useApp()
  const [offerOpen, setOfferOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'offer' | 'contact'>('offer')

  const listing = listings.find((item) => item.id === id)
  if (!listing || !id) {
    return (
      <main className="min-h-[65vh] bg-canvas pt-[54px] pb-[85px] max-md:pt-[38px] max-md:pb-[60px]">
        <div className="mx-auto w-[min(1190px,calc(100%-64px))] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
          <EmptyState
            icon={<Package />}
            title={t('marketplace.listingUnavailable')}
            text={t('marketplace.listingUnavailableText')}
            action={
              <Link className={buttonClasses({ variant: 'solid' })} to="/marketplace">
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
    <main className="min-h-[65vh] bg-canvas pt-[31px] pb-[85px] max-md:pb-[60px]">
      <div className="mx-auto w-[min(1190px,calc(100%-64px))] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
        <Link
          className="mb-5 inline-flex items-center gap-[7px] text-[11px] text-muted hover:text-link"
          to="/marketplace"
        >
          <ArrowLeft size={16} /> Back to marketplace
        </Link>
        <div className="grid grid-cols-[minmax(0,1fr)_348px] items-start gap-[31px] max-md:grid-cols-1 max-md:gap-0">
          <div className="detail-main">
            <div
              className="relative h-[440px] overflow-hidden rounded-[4px] bg-media-fallback max-md:h-[300px]"
              style={{ backgroundColor: listing.color }}
            >
              <img
                src={photo(listing.image, 1200)}
                alt={marketplaceLabel(t, listing.name, { id: listing.id })}
                className="block h-full w-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="border-b border-line py-[25px]">
              <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
                About this material
              </span>
              <h2 className="my-2 text-[18px] font-semibold tracking-[-0.035em] text-ink">
                Material overview
              </h2>
              <p className="mb-0 max-w-[720px] text-[12px] leading-[1.7] text-muted">
                {listing.description}
              </p>
            </div>
            <div className="border-b border-line py-[25px]">
              <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
                Listing information
              </span>
              <h2 className="my-2 text-[18px] font-semibold tracking-[-0.035em] text-ink">
                Specifications provided by seller
              </h2>
              <div className="mt-5 grid grid-cols-3 gap-[18px] max-md:grid-cols-2 max-md:gap-[15px]">
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
              <p className="mt-[19px] mb-0 flex items-start gap-1.5 text-[9px] leading-[1.7] text-subtle">
                <CircleHelp size={15} className="shrink-0" /> Material specifications are provided
                directly by the seller; buyers are encouraged to confirm batch condition before
                pickup.
              </p>
            </div>
            <div className="flex items-center gap-[11px] border-b border-line py-[25px]">
              <div className="grid h-[43px] w-[43px] place-items-center rounded-full bg-surface-tint text-eyebrow">
                <Sprout />
              </div>
              <div>
                <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
                  Listed by
                </span>
                <h3 className="my-1 text-[13px] font-semibold tracking-[-0.035em] text-ink">
                  {listing.seller}
                </h3>
                <p className="m-0 flex items-center gap-1 text-[9px] leading-[1.7] text-muted">
                  <MapPin size={14} /> {listing.location}, Bangladesh · Verified seller
                </p>
              </div>
              <BadgeCheck size={21} className="ml-auto text-eyebrow" />
            </div>
          </div>
          <aside className="sticky top-[128px] rounded-[4px] border border-line bg-surface p-[22px] max-md:static max-md:row-start-1 max-md:mb-4 max-md:p-[17px]">
            <span className="text-[9px] tracking-[0.08em] text-muted uppercase">
              {marketplaceLabel(t, listing.category, { type: 'category' })}
            </span>
            <h1 className="mt-[9px] mb-4 font-serif text-[27px] font-medium tracking-[-0.035em] text-ink max-md:text-[25px]">
              {marketplaceLabel(t, listing.name, { id: listing.id })}
            </h1>
            <div className="text-[19px] font-[730] text-link max-md:text-[18px]">
              {formatPrice(listing.price, listing.unit)}{' '}
              <span className="mt-[3px] block text-[9px] font-[450] text-subtle">listed price</span>
            </div>
            <div className="mt-[15px] flex items-center gap-2 text-[11px] text-muted">
              <Package size={17} className="text-eyebrow" /> {listing.quantity}{' '}
              {listing.quantityUnit} available
            </div>
            <div className="mt-[15px] flex items-center gap-2 text-[11px] text-muted">
              <MapPin size={17} className="text-eyebrow" /> {listing.location}, Bangladesh
            </div>
            <span className="mt-[15px] inline-flex items-center gap-1.5 rounded-[3px] bg-surface-tint px-2 py-1.5 text-[9px] text-chip-text">
              <i className="h-1.5 w-1.5 rounded-full bg-sage-dot" /> {listing.availability}
            </span>
            <div className="mt-[19px] grid gap-2 max-md:grid-cols-2">
              <Button
                className="w-full"
                onClick={() => {
                  setModalMode('offer')
                  setOfferOpen(true)
                }}
              >
                <HandCoins size={17} /> Make an offer
              </Button>
              <Button
                variant="outline-dark"
                className="w-full"
                onClick={() => {
                  setModalMode('contact')
                  setOfferOpen(true)
                }}
              >
                <MessageCircle size={17} /> Contact seller
              </Button>
              <button
                className={`inline-flex min-h-[38px] items-center justify-center gap-[7px] border-0 bg-transparent text-[10px] max-md:col-span-2 ${
                  isSaved ? 'text-heart' : 'text-muted'
                }`}
                onClick={() =>
                  setSaved(isSaved ? saved.filter((item) => item !== id) : [...saved, id])
                }
              >
                <Heart size={17} fill={isSaved ? 'currentColor' : 'none'} />{' '}
                {isSaved ? 'Saved listing' : 'Save listing'}
              </button>
            </div>
            <div className="mt-[17px] flex gap-2 bg-surface-tint p-[11px] text-[9px] leading-[1.5] text-muted">
              <ShieldCheck size={17} className="shrink-0 text-eyebrow" />
              <span>
                <b className="text-ink-soft">Direct negotiation</b>
                <br />
                Agree on pricing, pickup, and payment directly with the seller.
              </span>
            </div>
          </aside>
        </div>
        {similar.length > 0 && (
          <section className="pt-[66px] max-md:pt-[45px]">
            <SectionHeading
              eyebrow="Similar materials"
              title="Explore related listings"
              titleClassName="!text-[30px]"
            />
            <div className="grid grid-cols-3 gap-[17px] max-[1000px]:grid-cols-2 max-md:gap-2.5">
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
