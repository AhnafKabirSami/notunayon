import { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  HandCoins,
  Package,
  Pause,
  Pencil,
  Play,
  Plus,
  Search,
  Trash2,
  Wallet,
} from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import type { Listing, Offer } from '../types/index.ts'
import { formatPrice } from '../utils.ts'
import AnalyticsView from '../components/dashboard/AnalyticsView.tsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.tsx'
import DashPageHeader from '../components/dashboard/DashPageHeader.tsx'
import ListingForm from '../components/dashboard/ListingForm.tsx'
import MessageDemo from '../components/dashboard/MessageDemo.tsx'
import OffersTable from '../components/dashboard/OffersTable.tsx'
import ProfileSettings from '../components/dashboard/ProfileSettings.tsx'
import TransactionsTable from '../components/dashboard/TransactionsTable.tsx'
import { buttonClasses } from '../components/ui/buttonStyles.ts'
import InlineNotice from '../components/ui/InlineNotice.tsx'
import MiniChart from '../components/ui/MiniChart.tsx'
import StatCard from '../components/ui/StatCard.tsx'

function SellerOverview({ listings, offers }: { listings: Listing[]; offers: Offer[] }) {
  return (
    <>
      <DashPageHeader
        eyebrow="Overview"
        title="Good morning, producer."
        text="Here’s an overview of your demo marketplace activity."
        action={
          <Link
            className={buttonClasses({
              variant: 'solid',
              className: 'shrink-0 min-h-[39px] text-[10px] max-md:min-h-[35px]',
            })}
            to="/seller-dashboard/create-listing"
          >
            <Plus size={16} /> Add a listing
          </Link>
        }
      />
      <div className="mb-4 grid grid-cols-4 gap-3 max-md:mb-2.5 max-md:grid-cols-2 max-md:gap-2">
        <StatCard
          icon={<Package />}
          label="Total listings"
          value={listings.length}
          trend="In demo marketplace"
        />
        <StatCard
          icon={<CheckCircle2 />}
          label="Active listings"
          value={listings.filter((item) => !item.paused).length}
          trend="Illustrative data"
        />
        <StatCard
          icon={<HandCoins />}
          label="Pending offers"
          value={offers.filter((item) => item.status === 'Pending').length}
          trend="Review required"
        />
        <StatCard
          icon={<Wallet />}
          label="Demo earnings"
          value="৳46,500"
          trend="Illustrative only"
        />
      </div>
      <div className="mt-3.5 grid grid-cols-2 gap-3.5 max-md:mt-[9px] max-md:grid-cols-1 max-md:gap-[9px]">
        <section className="min-w-0 rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]">
          <div className="mb-[15px] flex items-start justify-between gap-2.5">
            <div>
              <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-ink">
                Recent offers
              </h2>
              <p className="m-0 text-[9px] leading-[1.7] text-muted">
                Latest activity on your materials
              </p>
            </div>
            <Link
              to="/seller-dashboard/offers"
              className="inline-flex items-center gap-1 text-[9px] font-[650] whitespace-nowrap text-link"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <OffersTable rows={offers.slice(0, 4)} compact />
        </section>
        <section className="min-w-0 rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]">
          <div className="mb-[15px] flex items-start justify-between gap-2.5">
            <div>
              <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-ink">
                Listing performance
              </h2>
              <p className="m-0 text-[9px] leading-[1.7] text-muted">
                Views across the past seven days
              </p>
            </div>
            <span className="inline-flex items-center gap-[5px] rounded-[2px] bg-surface-warm px-[7px] py-[5px] text-[8px] font-[760] tracking-[0.06em] text-pending">
              DEMO
            </span>
          </div>
          <MiniChart />
          <div className="flex justify-between border-t border-line-soft pt-2.5 text-[9px] text-muted">
            <span>Listing views</span>
            <b className="text-ink-soft">
              218 <small className="text-[8px] font-[450] text-subtle">sample</small>
            </b>
          </div>
        </section>
      </div>
      <div className="mt-3.5 min-w-0 rounded-[3px] border border-line bg-surface p-[17px] max-md:p-[13px]">
        <div className="mb-[15px] flex items-start justify-between gap-2.5">
          <div>
            <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-ink">
              Quick actions
            </h2>
            <p className="m-0 text-[9px] leading-[1.7] text-muted">
              Keep your marketplace presence up to date.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 max-md:grid-cols-1">
          <Link
            to="/seller-dashboard/create-listing"
            className="grid grid-cols-[30px_1fr] gap-x-2 gap-y-1 border border-line-soft bg-surface-tint-soft p-3 [&>svg]:row-span-2 [&>svg]:w-[19px] [&>svg]:text-eyebrow"
          >
            <Plus /> <b className="text-[9px] text-ink-soft">Create a listing</b>
            <span className="text-[8px] text-muted">Add another material to your catalog.</span>
          </Link>
          <Link
            to="/seller-dashboard/listings"
            className="grid grid-cols-[30px_1fr] gap-x-2 gap-y-1 border border-line-soft bg-surface-tint-soft p-3 [&>svg]:row-span-2 [&>svg]:w-[19px] [&>svg]:text-eyebrow"
          >
            <Package /> <b className="text-[9px] text-ink-soft">Manage listings</b>
            <span className="text-[8px] text-muted">Review active supply and updates.</span>
          </Link>
          <Link
            to="/seller-dashboard/offers"
            className="grid grid-cols-[30px_1fr] gap-x-2 gap-y-1 border border-line-soft bg-surface-tint-soft p-3 [&>svg]:row-span-2 [&>svg]:w-[19px] [&>svg]:text-eyebrow"
          >
            <HandCoins /> <b className="text-[9px] text-ink-soft">Review offers</b>
            <span className="text-[8px] text-muted">Respond to buyer interest.</span>
          </Link>
        </div>
      </div>
    </>
  )
}

function SellerListings() {
  const { listings, setListings } = useApp()
  const [notice, setNotice] = useState('')
  const nav = useNavigate()
  const ownListings = listings.slice(0, 8)

  return (
    <>
      <DashPageHeader
        eyebrow="Seller workspace"
        title="My listings"
        text="Manage materials you’ve added to this demonstration marketplace."
        action={
          <Link
            className={buttonClasses({
              variant: 'solid',
              className: 'shrink-0 min-h-[39px] text-[10px] max-md:min-h-[35px]',
            })}
            to="/seller-dashboard/create-listing"
          >
            <Plus size={16} /> Create listing
          </Link>
        }
      />
      {notice && <InlineNotice text={notice} className="mb-3" />}
      <div className="overflow-hidden rounded-[3px] border border-line bg-surface">
        <div className="flex items-center justify-between gap-3 border-b border-line-soft px-3.5 py-3 max-md:flex-col max-md:items-start">
          <b className="text-[10px] text-ink-soft">{ownListings.length} listings</b>
          <div className="relative flex w-[200px] flex-none items-center max-md:w-full">
            <Search size={15} className="absolute left-[11px] text-subtle" />
            <input
              placeholder="Search my listings"
              className="h-8 w-full rounded-[3px] border border-input-border bg-input pr-3 pl-[34px] text-[9px] text-ink outline-none"
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[670px] border-collapse text-left">
            <thead>
              <tr>
                {['Material', 'Location', 'Quantity', 'Price', 'Status', 'Actions'].map((head) => (
                  <th
                    key={head}
                    className="bg-surface-subtle px-3 py-2.5 text-[8px] font-bold tracking-[0.04em] whitespace-nowrap text-muted uppercase"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ownListings.map((item) => (
                <tr key={item.id}>
                  <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                    <Link
                      className="font-[650] text-ink-soft hover:text-link"
                      to={`/marketplace/${item.id}`}
                    >
                      {item.name}
                    </Link>
                    <small className="mt-1 block max-w-[225px] truncate text-[8px] text-subtle">
                      {item.seller}
                    </small>
                  </td>
                  <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                    {item.location}
                  </td>
                  <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                    {item.quantity} {item.quantityUnit}
                  </td>
                  <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                    {formatPrice(item.price, item.unit)}
                  </td>
                  <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                    <span
                      className={`inline-flex rounded-[2px] px-1.5 py-1 text-[8px] whitespace-nowrap ${
                        item.paused ? 'bg-surface-warm text-pending' : 'bg-surface-tint text-chip-text'
                      }`}
                    >
                      {item.paused ? 'Paused' : 'Active'}
                    </span>
                  </td>
                  <td className="border-t border-line-soft px-3 py-[11px] align-middle text-[9px] text-muted">
                    <div className="flex gap-1">
                      <button
                        title="Edit listing"
                        className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-line bg-surface-tint-soft text-muted hover:border-eyebrow hover:text-link"
                        onClick={() => {
                          setNotice(`Edit demo opened for ${item.name}.`)
                          nav(`/seller-dashboard/create-listing?id=${item.id}`)
                        }}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        title={item.paused ? 'Activate listing' : 'Pause listing'}
                        className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-line bg-surface-tint-soft text-muted hover:border-eyebrow hover:text-link"
                        onClick={() => {
                          setListings((rows) =>
                            rows.map((row) =>
                              row.id === item.id ? { ...row, paused: !row.paused } : row,
                            ),
                          )
                          setNotice(
                            `${item.name} ${item.paused ? 'activated' : 'paused'} in this local demo.`,
                          )
                        }}
                      >
                        {item.paused ? <Play size={15} /> : <Pause size={15} />}
                      </button>
                      <button
                        title="Delete listing"
                        className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-line bg-surface-tint-soft text-muted hover:border-eyebrow hover:text-link"
                        onClick={() => {
                          setListings((rows) => rows.filter((row) => row.id !== item.id))
                          setNotice(`${item.name} removed from the local demo.`)
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default function SellerDashboard() {
  const { listings, offers, setOffers } = useApp()
  const currentOffers = offers.slice(0, 6)

  return (
    <DashboardLayout type="seller">
      <Routes>
        <Route path="create-listing" element={<ListingForm />} />
        <Route path="listings" element={<SellerListings />} />
        <Route
          path="offers"
          element={
            <>
              <DashPageHeader
                eyebrow="Seller workspace"
                title="Offers received"
                text="Review and respond to local demonstration offers."
              />
              <OffersTable rows={currentOffers} setOffers={setOffers} seller />
            </>
          }
        />
        <Route path="messages" element={<MessageDemo />} />
        <Route
          path="transactions"
          element={
            <>
              <DashPageHeader
                eyebrow="Seller workspace"
                title="Transactions"
                text="A sample record of completed and in-progress exchanges."
              />
              <TransactionsTable />
            </>
          }
        />
        <Route path="analytics" element={<AnalyticsView type="seller" />} />
        <Route path="profile" element={<ProfileSettings type="seller" />} />
        <Route path="*" element={<SellerOverview listings={listings} offers={currentOffers} />} />
      </Routes>
    </DashboardLayout>
  )
}
