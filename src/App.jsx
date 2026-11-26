import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppProvider.jsx'
import { useApp } from './context/useApp.js'
import PublicLayout from './components/block/PublicLayout.jsx'
import Chatbot from './components/chatbot/Chatbot.jsx'
import About from './pages/About.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import BuyerDashboard from './pages/BuyerDashboard.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import ListingDetails from './pages/ListingDetails.jsx'
import Login from './pages/Login.jsx'
import Logistics from './pages/Logistics.jsx'
import Marketplace from './pages/Marketplace.jsx'
import NotFound from './pages/NotFound.jsx'
import Register from './pages/Register.jsx'
import Requests from './pages/Requests.jsx'
import SellerDashboard from './pages/SellerDashboard.jsx'
import './index.css'

function AppRoutes() {
  const { listings } = useApp()

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/marketplace" element={<PublicLayout><Marketplace /></PublicLayout>} />
        <Route path="/marketplace/:id" element={<PublicLayout><ListingDetails /></PublicLayout>} />
        <Route path="/requests" element={<PublicLayout><Requests /></PublicLayout>} />
        <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/logistics" element={<PublicLayout><Logistics /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/seller-dashboard/*" element={<SellerDashboard />} />
        <Route path="/buyer-dashboard/*" element={<BuyerDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
      <Chatbot listings={listings} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}
