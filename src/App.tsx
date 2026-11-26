import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppProvider.tsx'
import { useApp } from './context/useApp.ts'
import PublicLayout from './components/block/PublicLayout.tsx'
import Chatbot from './components/chatbot/Chatbot.tsx'
import About from './pages/About.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import BuyerDashboard from './pages/BuyerDashboard.tsx'
import Contact from './pages/Contact.tsx'
import Home from './pages/Home.tsx'
import HowItWorks from './pages/HowItWorks.tsx'
import ListingDetails from './pages/ListingDetails.tsx'
import Login from './pages/Login.tsx'
import Logistics from './pages/Logistics.tsx'
import Marketplace from './pages/Marketplace.tsx'
import NotFound from './pages/NotFound.tsx'
import Register from './pages/Register.tsx'
import Requests from './pages/Requests.tsx'
import SellerDashboard from './pages/SellerDashboard.tsx'
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
