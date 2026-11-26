import { useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  BarChart3,
  Bell,
  Boxes,
  ChevronRight,
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
  type LucideIcon,
} from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import { changeWebsiteLanguage } from '../../i18n/i18n.ts'
import { useTheme } from '../../theme/useTheme.ts'
import type { DashboardRole } from '../../types/index.ts'
import Logo from '../block/Logo.tsx'

type MenuEntry = [label: string, to: string, Icon: LucideIcon]

export default function DashboardLayout({
  type,
  children,
}: {
  type: DashboardRole
  children: ReactNode
}) {
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

  const menus: MenuEntry[] = isSeller
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
    <div className="min-h-screen bg-surface-alt text-ink">
      <aside
        className={`fixed inset-y-0 left-0 z-15 flex w-[245px] flex-col border-r border-line bg-surface px-[14px] pt-5 pb-[13px] max-[1000px]:w-[220px] max-md:z-30 max-md:w-[min(280px,85vw)] max-md:transition-transform max-md:duration-200 ${
          menuOpen
            ? 'max-md:translate-x-0 max-md:shadow-[20px_0_40px_rgba(0,0,0,0.12)]'
            : 'max-md:-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line-soft px-2 pb-[19px]">
          <Logo compact />
          <button
            className="hidden h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-muted hover:bg-surface-tint max-md:inline-grid"
            onClick={() => setMenuOpen(false)}
          >
            <X size={19} />
          </button>
        </div>
        <div className="px-[9px] pt-[18px] pb-2 text-[9px] font-[720] tracking-[0.09em] text-subtle uppercase">
          {title}
        </div>
        <nav className="grid gap-[3px]">
          {menus.map(([label, to, Icon]) => (
            <NavLink
              key={to}
              end={to === `/${type}-dashboard` || to === '/admin'}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex min-h-[39px] items-center gap-[11px] rounded-[3px] px-2.5 text-[11px] ${
                  isActive
                    ? 'bg-surface-tint font-[680] text-link'
                    : 'text-muted hover:bg-surface-tint-soft hover:text-link'
                }`
              }
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
          {!isAdmin && (
            <button
              className="mt-[5px] flex min-h-[39px] items-center gap-[11px] rounded-[3px] border-0 bg-transparent px-2.5 text-left text-[11px] text-muted hover:bg-danger-soft hover:text-danger"
              onClick={logout}
            >
              <LogOut size={17} />
              <span>{t('common.logout')}</span>
            </button>
          )}
        </nav>
        <div className="mt-auto grid gap-[13px]">
          <Link
            to="/"
            className="flex items-center gap-[7px] px-[9px] text-[10px] text-muted"
          >
            <ArrowLeft size={16} /> {t('common.backToPublic')}
          </Link>
          <button
            type="button"
            className="my-2 inline-grid h-[34px] w-[34px] place-items-center rounded-[4px] border border-line bg-surface-tint text-accent hover:bg-surface-tint-hover"
            onClick={toggleTheme}
            aria-label={themeAriaLabel}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="flex items-center gap-2 border-t border-line-soft px-1.5 py-[9px]">
            <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-surface-tint text-[9px] font-bold text-eyebrow">
              {isAdmin ? 'AD' : isBuyer ? 'BU' : 'SE'}
            </span>
            <div className="min-w-0 flex-1">
              <b className="block truncate text-[9px] text-ink-soft">
                {isAdmin ? 'Administrator' : t('dashboard.demoUser')}
              </b>
              <small className="mt-[3px] block truncate text-[8px] text-subtle">
                {type} account
              </small>
            </div>
            <MoreHorizontal size={17} className="text-subtle" />
          </div>
        </div>
      </aside>
      <div className="ml-[245px] min-h-screen max-[1000px]:ml-[220px] max-md:ml-0">
        <header className="sticky top-0 z-10 flex h-[58px] items-center justify-between border-b border-line bg-surface/95 px-7 backdrop-blur-[10px] max-[1000px]:px-5 max-md:h-[53px] max-md:px-[13px]">
          <button
            className="mr-[5px] hidden h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-muted hover:bg-surface-tint max-md:inline-grid"
            onClick={() => setMenuOpen(true)}
            aria-label="Open dashboard menu"
          >
            <Menu />
          </button>
          <div className="flex items-center gap-2 text-[10px] text-muted max-md:flex-1 max-md:gap-1 max-md:text-[8px]">
            {title}
            <ChevronRight size={14} />{' '}
            <span className="font-[650] text-ink">{activeMenuLabel}</span>
          </div>
          <div className="flex items-center gap-[15px] max-md:gap-2">
            <button
              type="button"
              className="h-[34px] min-w-[62px] rounded-[4px] border border-line bg-surface-tint px-[9px] text-[11px] font-bold whitespace-nowrap text-accent hover:bg-surface-tint-hover"
              onClick={() => changeWebsiteLanguage(i18n.resolvedLanguage === 'bn' ? 'en' : 'bn')}
            >
              {i18n.resolvedLanguage === 'bn' ? 'English' : 'বাংলা'}
            </button>
            <button
              type="button"
              className="inline-grid h-[34px] w-[34px] place-items-center rounded-[4px] border border-line bg-surface-tint text-accent hover:bg-surface-tint-hover"
              onClick={toggleTheme}
              aria-label={themeAriaLabel}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              aria-label={t('common.notifications')}
              className="relative inline-grid h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-muted hover:bg-surface-tint max-md:hidden"
            >
              <Bell size={18} />
              <i className="absolute top-1.5 right-[7px] h-[5px] w-[5px] rounded-full border border-white bg-notify-dot" />
            </button>
            <Link
              className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-surface-tint text-[9px] font-bold text-eyebrow"
              to="/"
            >
              {isAdmin ? 'AD' : isBuyer ? 'BU' : 'SE'}
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-[1420px] bg-canvas px-7 pt-[25px] pb-[55px] max-[1000px]:px-5 max-md:px-[13px] max-md:pt-4 max-md:pb-[38px]">
          {children}
        </main>
      </div>
    </div>
  )
}
