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
import { useApp } from '../context/useApp.js'
import { formatPrice } from '../utils.js'
import AnalyticsView from '../components/dashboard/AnalyticsView.jsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashPageHeader from '../components/dashboard/DashPageHeader.jsx'
import ListingForm from '../components/dashboard/ListingForm.jsx'
import MessageDemo from '../components/dashboard/MessageDemo.jsx'
import OffersTable from '../components/dashboard/OffersTable.jsx'
import ProfileSettings from '../components/dashboard/ProfileSettings.jsx'
import TransactionsTable from '../components/dashboard/TransactionsTable.jsx'
import InlineNotice from '../components/ui/InlineNotice.jsx'
import MiniChart from '../components/ui/MiniChart.jsx'
import StatCard from '../components/ui/StatCard.jsx'

function SellerOverview({ listings, offers }) {
  return (
    <>
      <DashPageHeader
        eyebrow="Overview"
        title="Good morning, producer."
        text="Here’s an overview of your demo marketplace activity."
        action={
          <Link className="button button-solid" to="/seller-dashboard/create-listing">
            <Plus size={16} /> Add a listing
          </Link>
        }
      />
      <div className="stats-grid">
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
      <div className="dashboard-two-col">
        <section className="dash-panel">
          <div className="panel-title">
            <div>
              <h2>Recent offers</h2>
              <p>Latest activity on your materials</p>
            </div>
            <Link to="/seller-dashboard/offers">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <OffersTable rows={offers.slice(0, 4)} compact />
        </section>
        <section className="dash-panel">
          <div className="panel-title">
            <div>
              <h2>Listing performance</h2>
              <p>Views across the past seven days</p>
            </div>
            <span className="demo-tag">DEMO</span>
          </div>
          <MiniChart />
          <div className="chart-foot">
            <span>Listing views</span>
            <b>
              218 <small>sample</small>
            </b>
          </div>
        </section>
      </div>
      <div className="dash-panel quick-actions">
        <div className="panel-title">
          <div>
            <h2>Quick actions</h2>
            <p>Keep your marketplace presence up to date.</p>
          </div>
        </div>
        <div>
          <Link to="/seller-dashboard/create-listing">
            <Plus /> <b>Create a listing</b>
            <span>Add another material to your catalog.</span>
          </Link>
          <Link to="/seller-dashboard/listings">
            <Package /> <b>Manage listings</b>
            <span>Review active supply and updates.</span>
          </Link>
          <Link to="/seller-dashboard/offers">
            <HandCoins /> <b>Review offers</b>
            <span>Respond to buyer interest.</span>
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
          <Link className="button button-solid" to="/seller-dashboard/create-listing">
            <Plus size={16} /> Create listing
          </Link>
        }
      />
      {notice && <InlineNotice text={notice} />}
      <div className="table-card">
        <div className="table-toolbar">
          <b>{ownListings.length} listings</b>
          <div className="field-with-icon">
            <Search size={15} />
            <input placeholder="Search my listings" />
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Location</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ownListings.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link className="table-primary" to={`/marketplace/${item.id}`}>
                      {item.name}
                    </Link>
                    <small>{item.seller}</small>
                  </td>
                  <td>{item.location}</td>
                  <td>
                    {item.quantity} {item.quantityUnit}
                  </td>
                  <td>{formatPrice(item.price, item.unit)}</td>
                  <td>
                    <span
                      className={`status-chip ${item.paused ? 'status-pending' : 'status-active'}`}
                    >
                      {item.paused ? 'Paused' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        title="Edit listing"
                        onClick={() => {
                          setNotice(`Edit demo opened for ${item.name}.`)
                          nav(`/seller-dashboard/create-listing?id=${item.id}`)
                        }}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        title={item.paused ? 'Activate listing' : 'Pause listing'}
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
