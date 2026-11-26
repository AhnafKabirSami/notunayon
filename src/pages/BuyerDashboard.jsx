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
import { useApp } from '../context/useApp.js'
import { calculateDemoMatches } from '../utils/matching.js'
import AnalyticsView from '../components/dashboard/AnalyticsView.jsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashPageHeader from '../components/dashboard/DashPageHeader.jsx'
import MarketplaceEmbedded from '../components/dashboard/MarketplaceEmbedded.jsx'
import MessageDemo from '../components/dashboard/MessageDemo.jsx'
import OffersTable from '../components/dashboard/OffersTable.jsx'
import ProfileSettings from '../components/dashboard/ProfileSettings.jsx'
import RecommendationsView, { RecommendationRow } from '../components/dashboard/RecommendationsView.jsx'
import RequirementForm from '../components/dashboard/RequirementForm.jsx'
import TransactionsTable from '../components/dashboard/TransactionsTable.jsx'
import StatCard from '../components/ui/StatCard.jsx'

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
          <Link className="button button-solid" to="/buyer-dashboard/requirement">
            <Plus size={16} /> Post a requirement
          </Link>
        }
      />
      <div className="stats-grid">
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
      <div className="dashboard-two-col">
        <div className="dash-panel">
          <div className="panel-title">
            <div>
              <h2>Suggested materials</h2>
              <p>Explore sample listings in the marketplace.</p>
            </div>
            <Link to="/buyer-dashboard/recommendations">
              See matches <ArrowRight size={15} />
            </Link>
          </div>
          <div className="compact-recommendations">
            {recommendations.map((match) => (
              <RecommendationRow key={match.listing.id} match={match} />
            ))}
          </div>
        </div>
        <div className="dash-panel">
          <div className="panel-title">
            <div>
              <h2>Quick actions</h2>
              <p>Continue your sourcing work.</p>
            </div>
          </div>
          <div className="buyer-quick">
            <Link to="/buyer-dashboard/browse">
              <Search />
              Browse materials <ArrowRight size={14} />
            </Link>
            <Link to="/buyer-dashboard/requirement">
              <Plus />
              Post a requirement <ArrowRight size={14} />
            </Link>
            <Link to="/buyer-dashboard/offers">
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
                  <Link className="text-link" to="/marketplace">
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
