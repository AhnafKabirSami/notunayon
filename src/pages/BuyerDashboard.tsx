import { Link, Route, Routes } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  HandCoins,
  Heart,
  Plus,
  Search,
  ShoppingBag,
} from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import { calculateDemoMatches } from '../utils/matching.ts'
import AnalyticsView from '../components/dashboard/AnalyticsView.tsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.tsx'
import DashPageHeader from '../components/dashboard/DashPageHeader.tsx'
import MarketplaceEmbedded from '../components/dashboard/MarketplaceEmbedded.tsx'
import MessageDemo from '../components/dashboard/MessageDemo.tsx'
import OffersTable from '../components/dashboard/OffersTable.tsx'
import ProfileSettings from '../components/dashboard/ProfileSettings.tsx'
import RecommendationsView, { RecommendationRow } from '../components/dashboard/RecommendationsView.tsx'
import RequirementForm from '../components/dashboard/RequirementForm.tsx'
import TransactionsTable from '../components/dashboard/TransactionsTable.tsx'
import { buttonClasses } from '../components/ui/buttonStyles.ts'
import StatCard from '../components/ui/StatCard.tsx'

function BuyerOverview() {
  const { offers, saved, listings } = useApp()
  const recommendations = calculateDemoMatches(listings).slice(0, 3)

  return (
    <>
      <DashPageHeader
        eyebrow="Overview"
        title="Good morning, sourcing team."
        text="Your Notunayon buyer activity, gathered in one place."
        action={
          <Link
            className={buttonClasses({
              variant: 'solid',
              className: 'shrink-0 min-h-[39px] text-[10px] max-md:min-h-[35px]',
            })}
            to="/buyer-dashboard/requirement"
          >
            <Plus size={16} /> Post a requirement
          </Link>
        }
      />
      <div className="mb-4 grid grid-cols-4 gap-3 max-md:mb-2.5 max-md:grid-cols-2 max-md:gap-2">
        <StatCard
          icon={<HandCoins />}
          label="Active offers"
          value={offers.filter((item) => item.status === 'Pending').length}
          trend="Awaiting response"
        />
        <StatCard
          icon={<CheckCircle2 />}
          label="Accepted offers"
          value={offers.filter((item) => item.status === 'Accepted').length}
          trend="Sample records"
        />
        <StatCard
          icon={<ShoppingBag />}
          label="Demo purchases"
          value="5"
          trend="Illustrative data"
        />
        <StatCard
          icon={<Heart />}
          label="Saved listings"
          value={saved.length}
          trend="This browser session"
        />
      </div>
      <div className="mt-3.5 grid grid-cols-2 gap-3.5 max-md:mt-[9px] max-md:grid-cols-1 max-md:gap-[9px]">
        <div className="min-w-0 rounded-[3px] border border-[#e5eae4] bg-white p-[17px] max-md:p-[13px] dark:border-[#34463a] dark:bg-[#1a261f]">
          <div className="mb-[15px] flex items-start justify-between gap-2.5">
            <div>
              <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-[#252e28] dark:text-[#edf4ef]">
                Suggested materials
              </h2>
              <p className="m-0 text-[9px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
                Explore sample listings in the marketplace.
              </p>
            </div>
            <Link
              to="/buyer-dashboard/recommendations"
              className="inline-flex items-center gap-1 text-[9px] font-[650] whitespace-nowrap text-[#55765c] dark:text-[#dbe8df]"
            >
              See matches <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid">
            {recommendations.map((match) => (
              <RecommendationRow key={match.listing.id} match={match} />
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-[3px] border border-[#e5eae4] bg-white p-[17px] max-md:p-[13px] dark:border-[#34463a] dark:bg-[#1a261f]">
          <div className="mb-[15px] flex items-start justify-between gap-2.5">
            <div>
              <h2 className="m-0 mb-[3px] text-[13px] font-bold tracking-[-0.02em] text-[#252e28] dark:text-[#edf4ef]">
                Quick actions
              </h2>
              <p className="m-0 text-[9px] leading-[1.7] text-[#737c75] dark:text-[#b2beb5]">
                Continue your sourcing work.
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <Link
              to="/buyer-dashboard/browse"
              className="flex items-center gap-2 border border-[#edf0ec] bg-[#f7f9f6] p-2.5 text-[9px] text-[#58685d] dark:border-[#34463a] dark:bg-[#223128] dark:text-[#edf4ef] [&>svg:first-child]:w-4 [&>svg:first-child]:text-[#598060] [&>svg:last-child]:ml-auto [&>svg:last-child]:w-3.5"
            >
              <Search />
              Browse materials <ArrowRight size={14} />
            </Link>
            <Link
              to="/buyer-dashboard/requirement"
              className="flex items-center gap-2 border border-[#edf0ec] bg-[#f7f9f6] p-2.5 text-[9px] text-[#58685d] dark:border-[#34463a] dark:bg-[#223128] dark:text-[#edf4ef] [&>svg:first-child]:w-4 [&>svg:first-child]:text-[#598060] [&>svg:last-child]:ml-auto [&>svg:last-child]:w-3.5"
            >
              <Plus />
              Post a requirement <ArrowRight size={14} />
            </Link>
            <Link
              to="/buyer-dashboard/offers"
              className="flex items-center gap-2 border border-[#edf0ec] bg-[#f7f9f6] p-2.5 text-[9px] text-[#58685d] dark:border-[#34463a] dark:bg-[#223128] dark:text-[#edf4ef] [&>svg:first-child]:w-4 [&>svg:first-child]:text-[#598060] [&>svg:last-child]:ml-auto [&>svg:last-child]:w-3.5"
            >
              <HandCoins />
              Review my offers <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default function BuyerDashboard() {
  const { offers } = useApp()

  return (
    <DashboardLayout type="buyer">
      <Routes>
        <Route
          path="browse"
          element={
            <>
              <DashPageHeader
                eyebrow="Buyer workspace"
                title="Browse materials"
                text="Explore the same sample listings available in the public marketplace."
                action={
                  <Link
                    className="inline-flex items-center gap-[7px] text-[12px] font-[680] text-[#285d41] hover:text-[#173b2d] dark:text-[#dbe8df]"
                    to="/marketplace"
                  >
                    Open full marketplace <ArrowUpRight size={15} />
                  </Link>
                }
              />
              <MarketplaceEmbedded />
            </>
          }
        />
        <Route path="recommendations" element={<RecommendationsView />} />
        <Route path="requirement" element={<RequirementForm />} />
        <Route
          path="offers"
          element={
            <>
              <DashPageHeader
                eyebrow="Buyer workspace"
                title="My offers"
                text="Offers submitted in this frontend demo."
              />
              <OffersTable rows={offers} />
            </>
          }
        />
        <Route path="messages" element={<MessageDemo />} />
        <Route
          path="history"
          element={
            <>
              <DashPageHeader
                eyebrow="Buyer workspace"
                title="Purchase history"
                text="Sample transaction records from the marketplace demonstration."
              />
              <TransactionsTable buyer />
            </>
          }
        />
        <Route path="analytics" element={<AnalyticsView type="buyer" />} />
        <Route path="profile" element={<ProfileSettings type="buyer" />} />
        <Route path="*" element={<BuyerOverview />} />
      </Routes>
    </DashboardLayout>
  )
}
