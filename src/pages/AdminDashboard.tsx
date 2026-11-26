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
      <div className="mb-4 grid grid-cols-4 gap-3 max-md:mb-2.5 max-md:grid-cols-2 max-md:gap-2">
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
      <div className="mt-3.5 grid grid-cols-2 gap-3.5 max-md:mt-[9px] max-md:grid-cols-1 max-md:gap-[9px]">
        <div className="min-w-0 rounded-[3px] border border-[#e5eae4] bg-white p-[17px] max-md:p-[13px] dark:border-[#34463a] dark:bg-[#1a261f]">
          <div className="mb-[15px] flex items-start justify-between gap-2.5">
            <div>
              <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-[#252e28] dark:text-[#edf4ef]">
                Recent profiles
              </h2>
              <p className="m-0 text-[9px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
                Sample buyer and seller accounts
              </p>
            </div>
            <Link
              to="/admin/users"
              className="inline-flex items-center gap-1 text-[9px] font-[650] whitespace-nowrap text-[#55765c] dark:text-[#dbe8df]"
            >
              View users <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid">
            {users.slice(0, 3).map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 border-b border-[#edf0ec] py-[9px] dark:border-[#34463a]"
              >
                <i className="grid h-[29px] w-[29px] place-items-center rounded-full bg-[#edf3eb] text-[#65816b] dark:bg-[#223128] dark:text-[#a6c5ab]">
                  <UserRound size={17} />
                </i>
                <span className="flex-1">
                  <b className="block text-[8px] text-[#536157] dark:text-[#edf4ef]">
                    {item.name}
                  </b>
                  <small className="mt-[3px] block text-[7px] text-[#98a198] dark:text-[#b2beb5]">
                    {item.type} · {item.location}
                  </small>
                </span>
                <span className="inline-flex rounded-[2px] bg-[#f6f2e7] px-1.5 py-1 text-[8px] whitespace-nowrap text-[#867544] dark:bg-[#223128] dark:text-[#dfe9e2]">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-[3px] border border-[#e5eae4] bg-white p-[17px] max-md:p-[13px] dark:border-[#34463a] dark:bg-[#1a261f]">
          <div className="mb-[15px] flex items-start justify-between gap-2.5">
            <div>
              <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-[#252e28] dark:text-[#edf4ef]">
                Listing activity
              </h2>
              <p className="m-0 text-[9px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
                Illustrative listing distribution
              </p>
            </div>
          </div>
          <MiniChart />
          <div className="flex justify-between border-t border-[#edf0ec] pt-2.5 text-[9px] text-[#838e84] dark:border-[#34463a] dark:text-[#b2beb5]">
            <span>Sample active listings</span>
            <b className="text-[#46564a] dark:text-[#edf4ef]">
              {listings.filter((item) => !item.paused).length}
            </b>
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
      <div className="overflow-hidden rounded-[3px] border border-[#e5eae4] bg-white dark:border-[#34463a] dark:bg-[#1a261f]">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[670px] border-collapse text-left">
            <thead>
              <tr>
                {['Business / user', 'Account type', 'Location', 'Status', 'Actions'].map(
                  (head) => (
                    <th
                      key={head}
                      className="bg-[#fbfcfa] px-3 py-2.5 text-[8px] font-bold tracking-[0.04em] whitespace-nowrap text-[#8a948b] uppercase dark:border-[#34463a] dark:bg-[#1a261f] dark:text-[#b2beb5]"
                    >
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={item.name}>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] font-[650] text-[#44584a] dark:border-[#34463a] dark:text-[#edf4ef]">
                    {item.name}
                    <small className="mt-1 block max-w-[225px] truncate text-[8px] font-normal text-[#9aa29a] dark:text-[#b2beb5]">
                      Demo profile #{index + 1}
                    </small>
                  </td>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    {item.type}
                  </td>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    {item.location}
                  </td>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    <span className="inline-flex rounded-[2px] bg-[#f6f2e7] px-1.5 py-1 text-[8px] whitespace-nowrap text-[#867544] dark:bg-[#223128] dark:text-[#dfe9e2]">
                      {item.status}
                    </span>
                  </td>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    <div className="flex gap-1">
                      <button
                        title="Approve demo profile"
                        className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-[#e8ece6] bg-[#f5f7f4] text-[#65746a] hover:border-[#a4baa4] hover:text-[#315e3d] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
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
                        className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-[#e8ece6] bg-[#f5f7f4] text-[#65746a] hover:border-[#a4baa4] hover:text-[#315e3d] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
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
                        className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-[#e8ece6] bg-[#f5f7f4] text-[#65746a] hover:border-[#a4baa4] hover:text-[#315e3d] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
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
      <div className="overflow-hidden rounded-[3px] border border-[#e5eae4] bg-white dark:border-[#34463a] dark:bg-[#1a261f]">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[670px] border-collapse text-left">
            <thead>
              <tr>
                {['Material', 'Seller', 'Location', 'Quantity', 'Price', 'Actions'].map((head) => (
                  <th
                    key={head}
                    className="bg-[#fbfcfa] px-3 py-2.5 text-[8px] font-bold tracking-[0.04em] whitespace-nowrap text-[#8a948b] uppercase dark:border-[#34463a] dark:bg-[#1a261f] dark:text-[#b2beb5]"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map((item) => (
                <tr key={item.id}>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    <Link
                      className="font-[650] text-[#44584a] hover:text-[#2f7048] dark:text-[#edf4ef]"
                      to={`/marketplace/${item.id}`}
                    >
                      {marketplaceLabel(t, item.name, { id: item.id })}
                    </Link>
                  </td>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    {item.seller}
                  </td>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    {item.location}
                  </td>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    {item.quantity} {item.quantityUnit}
                  </td>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    {formatPrice(item.price)}
                  </td>
                  <td className="border-t border-[#f0f2ef] px-3 py-[11px] align-middle text-[9px] text-[#68756b] dark:border-[#34463a] dark:text-[#b2beb5]">
                    <div className="flex gap-1">
                      <button
                        className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-[#e8ece6] bg-[#f5f7f4] text-[#65746a] hover:border-[#a4baa4] hover:text-[#315e3d] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
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
                        className="grid h-[26px] w-[27px] place-items-center rounded-[2px] border border-[#e8ece6] bg-[#f5f7f4] text-[#65746a] hover:border-[#a4baa4] hover:text-[#315e3d] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
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
      <div className="grid grid-cols-3 gap-2.5 max-md:grid-cols-2">
        {categories.map((category, index) => (
          <div
            key={category}
            className="flex flex-col items-start border border-[#e5eae4] bg-white p-[15px] dark:border-[#34463a] dark:bg-[#1a261f]"
          >
            <span className="text-[9px] text-[#96a493]">0{index + 1}</span>
            <b className="mt-[11px] mb-1 text-[10px] text-[#46564a] dark:text-[#edf4ef]">
              {marketplaceLabel(t, category, { type: 'category' })}
            </b>
            <small className="text-[8px] text-[#929c92] dark:text-[#b2beb5]">
              {listings.filter((item) => item.category === category).length} sample listings
            </small>
            <button
              className="mt-3 inline-flex items-center gap-[5px] border-0 bg-[#f0f5ee] px-[7px] py-1.5 text-[8px] text-[#5a735f] dark:bg-[#223128] dark:text-[#dfe9e2]"
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
              <div className="min-w-0 rounded-[3px] border border-[#e5eae4] bg-white p-[17px] max-md:p-[13px] dark:border-[#34463a] dark:bg-[#1a261f]">
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
              <div className="max-w-[560px] min-w-0 rounded-[3px] border border-[#e5eae4] bg-white p-[17px] max-md:p-[13px] dark:border-[#34463a] dark:bg-[#1a261f]">
                <Settings size={25} className="text-[#618064]" />
                <h3 className="mt-3 mb-[5px] text-[13px] font-semibold tracking-[-0.035em] text-[#252e28] dark:text-[#edf4ef]">
                  Demo platform configuration
                </h3>
                <p className="mb-3 text-[10px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
                  Authentication, permissions, listings, and all sample records are frontend-only.
                  No admin controls or data persist to a server.
                </p>
                <label className="flex items-center gap-1.5 text-[9px] text-[#6d796f] dark:text-[#b2beb5]">
                  <input type="checkbox" defaultChecked disabled className="accent-[#4c7953]" /> Show
                  demonstration labels
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
