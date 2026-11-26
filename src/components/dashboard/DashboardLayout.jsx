import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  BarChart3,
  Bell,
  Boxes,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FileText,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import { useApp } from '../../context/useApp.js'
import { changeWebsiteLanguage } from '../../i18n/i18n.js'
import { useTheme } from '../../theme/useTheme.js'
import Logo from '../block/Logo.jsx'

export default function DashboardLayout({ type, children }) {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const path = useLocation().pathname.replace(/\/+$/, '')
  const dashboardPath = type === 'admin' ? '/admin' : `/${type}-dashboard`
  const suffix = path.replace(dashboardPath, '') || '/'
  const { setUser } = useApp()
  const navigate = useNavigate()

  const isSeller = type === 'seller'
  const isBuyer = type === 'buyer'
  const isAdmin = type === 'admin'
  const title = isSeller
    ? t('dashboard.sellerWorkspace')
    : isBuyer
      ? t('dashboard.buyerWorkspace')
      : t('dashboard.adminDemo')

  const menus = isSeller
    ? [
        [t('dashboard.overview'), '/seller-dashboard', LayoutDashboard],
        [t('dashboard.myListings'), '/seller-dashboard/listings', Package],
        [t('dashboard.createListing'), '/seller-dashboard/create-listing', Plus],
        [t('dashboard.offersReceived'), '/seller-dashboard/offers', HandCoins],
        [t('dashboard.messages'), '/seller-dashboard/messages', MessageCircle],
        [t('dashboard.transactions'), '/seller-dashboard/transactions', ClipboardList],
        [t('dashboard.analytics'), '/seller-dashboard/analytics', BarChart3],
        [t('dashboard.profile'), '/seller-dashboard/profile', UserRound],
      ]
    : isBuyer
      ? [
          [t('dashboard.overview'), '/buyer-dashboard', LayoutDashboard],
          [t('dashboard.browseMaterials'), '/buyer-dashboard/browse', Search],
          [t('dashboard.recommendations'), '/buyer-dashboard/recommendations', Sparkles],
          [t('dashboard.postRequirement'), '/buyer-dashboard/requirement', Plus],
          [t('dashboard.myOffers'), '/buyer-dashboard/offers', HandCoins],
          [t('dashboard.messages'), '/buyer-dashboard/messages', MessageCircle],
          [t('dashboard.purchaseHistory'), '/buyer-dashboard/history', ClipboardList],
          [t('dashboard.analytics'), '/buyer-dashboard/analytics', BarChart3],
          [t('dashboard.profile'), '/buyer-dashboard/profile', UserRound],
        ]
      : [
          [t('dashboard.overview'), '/admin', LayoutDashboard],
          [t('dashboard.users'), '/admin/users', Users],
          [t('dashboard.verification'), '/admin/verification', ShieldCheck],
          [t('dashboard.myListings'), '/admin/listings', Package],
          [t('dashboard.categories'), '/admin/categories', Boxes],
          [t('dashboard.transactions'), '/admin/transactions', ClipboardList],
          [t('dashboard.buyerRequests'), '/admin/requests', FileText],
          [t('dashboard.reports'), '/admin/reports', BarChart3],
          [t('dashboard.analytics'), '/admin/analytics', TrendingUp],
          [t('dashboard.settings'), '/admin/settings', Settings],
        ]

  const [menuOpen, setMenuOpen] = useState(false)
  const [showNotice, setShowNotice] = useState(!isAdmin)

  function logout() {
    localStorage.removeItem('notunayon-demo-user')
    setUser(null)
    navigate('/login')
  }

  const themeAriaLabel =
    theme === 'dark'
      ? i18n.resolvedLanguage === 'bn'
        ? 'লাইট থিমে যান'
        : 'Switch to light theme'
      : i18n.resolvedLanguage === 'bn'
        ? 'ডার্ক থিমে যান'
        : 'Switch to dark theme'

  const activeMenuLabel =
    menus.find((item) => item[1] === `${dashboardPath}${suffix === '/' ? '' : suffix}`)?.[0] ||
    (suffix === '/create-listing' ? t('dashboard.createListing') : t('dashboard.workspace'))

  return (
    <div className="dashboard-app">
      <aside className={`dash-sidebar ${menuOpen ? 'dash-sidebar-open' : ''}`}>
        <div className="dash-brand">
          <Logo />
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(false)}>
            <X size={19} />
          </button>
        </div>
        <div className="workspace-label">{title}</div>
        <nav>
          {menus.map(([label, to, Icon]) => (
            <NavLink
              key={to}
              end={to === `/${type}-dashboard` || to === '/admin'}
              to={to}
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
          {!isAdmin && (
            <button className="dash-logout" onClick={logout}>
              <LogOut size={18} />
              <span>{t('common.logout')}</span>
            </button>
          )}
        </nav>
        <div className="dash-sidebar-bottom">
          <Link to="/" className="dash-public-link">
            <ArrowLeft size={16} /> {t('common.backToPublic')}
          </Link>
          <button
            type="button"
            className="theme-toggle dash-theme-toggle"
            onClick={toggleTheme}
            aria-label={themeAriaLabel}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="dash-user">
            <span>{isAdmin ? 'AD' : isBuyer ? 'BU' : 'SE'}</span>
            <div>
              <b>{isAdmin ? 'Demo administrator' : t('dashboard.demoUser')}</b>
              <small>{type} · prototype</small>
            </div>
            <MoreHorizontal size={17} />
          </div>
        </div>
      </aside>
      <div className="dash-main">
        <header className="dash-topbar">
          <button
            className="icon-button mobile-menu dash-menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open dashboard menu"
          >
            <Menu />
          </button>
          <div className="dash-breadcrumb">
            {title}
            <ChevronRight size={14} /> <span>{activeMenuLabel}</span>
          </div>
          <div className="dash-top-actions">
            <button
              type="button"
              className="nav-language"
              onClick={() => changeWebsiteLanguage(i18n.resolvedLanguage === 'bn' ? 'en' : 'bn')}
            >
              {i18n.resolvedLanguage === 'bn' ? 'English' : 'বাংলা'}
            </button>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={themeAriaLabel}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <span className="demo-pill">
              <i /> {t('common.demoMode')}
            </span>
            <button aria-label={t('common.notifications')} className="icon-button dash-notification">
              <Bell size={18} />
              <i />
            </button>
            <Link className="dash-avatar" to="/">
              {isAdmin ? 'AD' : isBuyer ? 'BU' : 'SE'}
            </Link>
          </div>
        </header>
        <main className="dash-content">
          {showNotice && !isAdmin && (
            <div className="dashboard-notice">
              <CircleHelp size={17} />
              <span>
                <b>{t('dashboard.demoNotice')}</b> — {t('dashboard.demoNoticeText')}
              </span>
              <button onClick={() => setShowNotice(false)} aria-label={t('common.close')}>
                <X size={15} />
              </button>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
