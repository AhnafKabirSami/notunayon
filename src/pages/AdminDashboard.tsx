import { useState, type Dispatch, type SetStateAction } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Check,
  CircleHelp,
  ClipboardList,
  Eye,
  Package,
  Pencil,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  UserRound,
  Users,
  Wheat,
  X,
} from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import { categories, usersSeed } from '../data/mockData.ts'
import type { Listing, SeedUser } from '../types/index.ts'
import { formatPrice } from '../utils.ts'
import { marketplaceLabel } from '../utils/marketplace.ts'
import RequestCard from '../components/block/RequestCard.tsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.tsx'
import DashPageHeader from '../components/dashboard/DashPageHeader.tsx'
import TransactionsTable from '../components/dashboard/TransactionsTable.tsx'
import EmptyState from '../components/ui/EmptyState.tsx'
import InlineNotice from '../components/ui/InlineNotice.tsx'
import MiniChart from '../components/ui/MiniChart.tsx'
import StatCard from '../components/ui/StatCard.tsx'

function AdminOverview({ listings, users }: { listings: Listing[]; users: SeedUser[] }) {
  return (
    <>
      <DashPageHeader
        eyebrow="Admin overview"
        title="Marketplace at a glance."
        text="A compact overview of illustrative users, listings, and exchange activity."
      />
      <div className="stats-grid">
        <StatCard icon={<Users />} label="Total users" value="42" trend="Sample profiles" />
        <StatCard icon={<ShoppingBag />} label="Buyers" value="24" trend="Illustrative" />
        <StatCard icon={<Wheat />} label="Sellers" value="18" trend="Illustrative" />
        <StatCard
          icon={<Package />}
          label="Active listings"
          value={listings.filter((item) => !item.paused).length}
          trend="Local demo data"
        />
        <StatCard
          icon={<ShieldCheck />}
          label="Pending verifications"
          value="3"
          trend="Sample records"
        />
        <StatCard icon={<ClipboardList />} label="Transactions" value="5" trend="Demo only" />
      </div>
      <div className="dashboard-two-col">
        <div className="dash-panel">
          <div className="panel-title">
            <div>
              <h2>Recent profiles</h2>
              <p>Sample buyer and seller accounts</p>
            </div>
            <Link to="/admin/users">
              View users <ArrowRight size={15} />
            </Link>
          </div>
          <div className="admin-user-list">
            {users.slice(0, 3).map((item) => (
              <div key={item.name}>
                <i>
                  <UserRound size={17} />
                </i>
                <span>
                  <b>{item.name}</b>
                  <small>
                    {item.type} · {item.location}
                  </small>
                </span>
                <span className="status-chip status-pending">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dash-panel">
          <div className="panel-title">
            <div>
              <h2>Listing activity</h2>
              <p>Illustrative listing distribution</p>
            </div>
          </div>
          <MiniChart />
          <div className="chart-foot">
            <span>Sample active listings</span>
            <b>{listings.filter((item) => !item.paused).length}</b>
          </div>
        </div>
      </div>
    </>
  )
}

function AdminUsers({
  users,
  setUsers,
  title,
}: {
  users: SeedUser[]
  setUsers: Dispatch<SetStateAction<SeedUser[]>>
  title: string
}) {
  const [message, setMessage] = useState('')

  return (
    <>
      <DashPageHeader
        eyebrow="Admin demonstration"
        title={title}
        text="Review sample marketplace profiles and update demo status."
      />
      <div className="table-card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Business / user</th>
                <th>Account type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={item.name}>
                  <td className="table-primary">
                    {item.name}
                    <small>Demo profile #{index + 1}</small>
                  </td>
                  <td>{item.type}</td>
                  <td>{item.location}</td>
                  <td>
                    <span className="status-chip status-pending">{item.status}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        title="Approve demo profile"
                        onClick={() => {
                          setUsers((rows) =>
                            rows.map((user, i) =>
                              i === index ? { ...user, status: 'Approved demo' } : user,
                            ),
                          )
                          setMessage(`${item.name} approved in local demo.`)
                        }}
                      >
                        <Check size={15} />
                      </button>
                      <button
                        title="Reject demo profile"
                        onClick={() => {
                          setUsers((rows) =>
                            rows.map((user, i) =>
                              i === index ? { ...user, status: 'Declined demo' } : user,
                            ),
                          )
                          setMessage(`${item.name} declined in local demo.`)
                        }}
                      >
                        <X size={15} />
                      </button>
                      <button
                        title="View demo profile"
                        onClick={() => setMessage(`Viewing sample profile for ${item.name}.`)}
                      >
                        <Eye size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {message && <InlineNotice text={message} />}
      </div>
    </>
  )
}

function AdminListings({
  listings,
  setListings,
}: {
  listings: Listing[]
  setListings: Dispatch<SetStateAction<Listing[]>>
}) {
  const { t } = useTranslation()
  const [message, setMessage] = useState('')

  return (
    <>
      <DashPageHeader
        eyebrow="Admin demonstration"
        title="Marketplace listings"
        text="Review sample material records or remove one from this browser demo."
      />
      <div className="table-card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Seller</th>
                <th>Location</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link className="table-primary" to={`/marketplace/${item.id}`}>
                      {marketplaceLabel(t, item.name, { id: item.id })}
                    </Link>
                  </td>
                  <td>{item.seller}</td>
                  <td>{item.location}</td>
                  <td>
                    {item.quantity} {item.quantityUnit}
                  </td>
                  <td>{formatPrice(item.price)}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() =>
                          setMessage(
                            `Viewing listing ${marketplaceLabel(t, item.name, { id: item.id })}.`,
                          )
                        }
                        title="View listing"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => {
                          setListings((rows) => rows.filter((row) => row.id !== item.id))
                          setMessage(
                            `${marketplaceLabel(t, item.name, { id: item.id })} removed from demo.`,
                          )
                        }}
                        title="Remove listing"
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
        {message && <InlineNotice text={message} />}
      </div>
    </>
  )
}

function AdminCategories({ listings }: { listings: Listing[] }) {
  const { t } = useTranslation()
  const [message, setMessage] = useState('')

  return (
    <>
      <DashPageHeader
        eyebrow="Admin demonstration"
        title="Material categories"
        text="Categories used across the mock marketplace."
      />
      <div className="admin-category-grid">
        {categories.map((category, index) => (
          <div key={category}>
            <span>0{index + 1}</span>
            <b>{marketplaceLabel(t, category, { type: 'category' })}</b>
            <small>
              {listings.filter((item) => item.category === category).length} sample listings
            </small>
            <button
              onClick={() =>
                setMessage(
                  `${marketplaceLabel(t, category, { type: 'category' })} selected for demo editing.`,
                )
              }
            >
              <Pencil size={14} /> Edit label
            </button>
          </div>
        ))}
      </div>
      {message && <InlineNotice text={message} />}
    </>
  )
}

export default function AdminDashboard() {
  const { listings, setListings, requests } = useApp()
  const [users, setUsers] = useState<SeedUser[]>(usersSeed)

  return (
    <DashboardLayout type="admin">
      <Routes>
        <Route
          path="users"
          element={<AdminUsers users={users} setUsers={setUsers} title="Users" />}
        />
        <Route
          path="verification"
          element={<AdminUsers users={users} setUsers={setUsers} title="Business verification" />}
        />
        <Route
          path="listings"
          element={<AdminListings listings={listings} setListings={setListings} />}
        />
        <Route path="categories" element={<AdminCategories listings={listings} />} />
        <Route
          path="requests"
          element={
            <>
              <DashPageHeader
                eyebrow="Admin demonstration"
                title="Buyer requests"
                text="Sample sourcing requirements posted by businesses."
              />
              {requests.map((item) => (
                <RequestCard key={item.id} request={item} />
              ))}
            </>
          }
        />
        <Route
          path="transactions"
          element={
            <>
              <DashPageHeader
                eyebrow="Admin demonstration"
                title="Transactions"
                text="Illustrative sample transaction records. No payments are processed."
              />
              <TransactionsTable />
            </>
          }
        />
        <Route
          path="reports"
          element={
            <>
              <DashPageHeader
                eyebrow="Admin demonstration"
                title="Reports"
                text="A demonstration view for content and activity reports."
              />
              <div className="dash-panel">
                <EmptyState
                  icon={<CircleHelp />}
                  title="No open reports"
                  text="This prototype has no submitted user reports."
                />
              </div>
            </>
          }
        />
        <Route
          path="settings"
          element={
            <>
              <DashPageHeader
                eyebrow="Admin demonstration"
                title="Settings"
                text="Prototype settings are intentionally not connected to a production service."
              />
              <div className="dash-panel settings-demo">
                <Settings size={25} />
                <h3>Demo platform configuration</h3>
                <p>
                  Authentication, permissions, listings, and all sample records are frontend-only.
                  No admin controls or data persist to a server.
                </p>
                <label>
                  <input type="checkbox" defaultChecked disabled /> Show demonstration labels
                </label>
              </div>
            </>
          }
        />
        <Route path="*" element={<AdminOverview listings={listings} users={users} />} />
      </Routes>
    </DashboardLayout>
  )
}
