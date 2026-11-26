import { useState, type ReactNode } from 'react'
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
    <div className="min-h-screen bg-[#f5f7f4] text-[#252e28] dark:bg-[#111915] dark:text-[#edf4ef]">
      <aside
        className={`fixed inset-y-0 left-0 z-15 flex w-[245px] flex-col border-r border-[#e5eae3] bg-white px-[14px] pt-5 pb-[13px] max-[1000px]:w-[220px] max-md:z-30 max-md:w-[min(280px,85vw)] max-md:transition-transform max-md:duration-200 dark:border-[#34463a] dark:bg-[#1b3024] ${
          menuOpen
            ? 'max-md:translate-x-0 max-md:shadow-[20px_0_40px_rgba(0,0,0,0.12)]'
            : 'max-md:-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#eef0ed] px-2 pb-[19px] dark:border-[#34463a]">
          <Logo compact />
          <button
            className="hidden h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-[#536157] hover:bg-[#eef2ed] max-md:inline-grid dark:text-[#b2beb5] dark:hover:bg-[#223128]"
            onClick={() => setMenuOpen(false)}
          >
            <X size={19} />
          </button>
        </div>
        <div className="px-[9px] pt-[18px] pb-2 text-[9px] font-[720] tracking-[0.09em] text-[#939c93] uppercase dark:text-[#b2beb5]">
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
                    ? 'bg-[#edf3eb] font-[680] text-[#2c5e3a] dark:bg-[#223128] dark:text-[#dbe8df]'
                    : 'text-[#637067] hover:bg-[#f4f7f2] hover:text-[#345b3e] dark:text-[#b2beb5] dark:hover:bg-[#223128] dark:hover:text-[#edf4ef]'
                }`
              }
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
          {!isAdmin && (
            <button
              className="mt-[5px] flex min-h-[39px] items-center gap-[11px] rounded-[3px] border-0 bg-transparent px-2.5 text-left text-[11px] text-[#637067] hover:bg-[#faf2ef] hover:text-[#8e4e44] dark:text-[#b2beb5] dark:hover:bg-[#223128]"
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
            className="flex items-center gap-[7px] px-[9px] text-[10px] text-[#738177] dark:text-[#b2beb5]"
          >
            <ArrowLeft size={16} /> {t('common.backToPublic')}
          </Link>
          <button
            type="button"
            className="my-2 inline-grid h-[34px] w-[34px] place-items-center rounded-[4px] border border-[#dfe7dc] bg-[#f2f5ef] text-[#173b2d] hover:bg-[#e7eee4] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
            onClick={toggleTheme}
            aria-label={themeAriaLabel}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="flex items-center gap-2 border-t border-[#edf0ec] px-1.5 py-[9px] dark:border-[#34463a]">
            <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-[#e7efe4] text-[9px] font-bold text-[#466e4d] dark:bg-[#223128] dark:text-[#a6c5ab]">
              {isAdmin ? 'AD' : isBuyer ? 'BU' : 'SE'}
            </span>
            <div className="min-w-0 flex-1">
              <b className="block truncate text-[9px] text-[#445349] dark:text-[#edf4ef]">
                {isAdmin ? 'Demo administrator' : t('dashboard.demoUser')}
              </b>
              <small className="mt-[3px] block truncate text-[8px] text-[#929c92] dark:text-[#b2beb5]">
                {type} · prototype
              </small>
            </div>
            <MoreHorizontal size={17} className="text-[#89958b]" />
          </div>
        </div>
      </aside>
      <div className="ml-[245px] min-h-screen max-[1000px]:ml-[220px] max-md:ml-0">
        <header className="sticky top-0 z-10 flex h-[58px] items-center justify-between border-b border-[#e7ebe6] bg-white/95 px-7 backdrop-blur-[10px] max-[1000px]:px-5 max-md:h-[53px] max-md:px-[13px] dark:border-[#34463a] dark:bg-[#1a261f]">
          <button
            className="mr-[5px] hidden h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-[#536157] hover:bg-[#eef2ed] max-md:inline-grid dark:text-[#b2beb5] dark:hover:bg-[#223128]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open dashboard menu"
          >
            <Menu />
          </button>
          <div className="flex items-center gap-2 text-[10px] text-[#748078] max-md:flex-1 max-md:gap-1 max-md:text-[8px] dark:text-[#b2beb5]">
            {title}
            <ChevronRight size={14} />{' '}
            <span className="font-[650] text-[#39483e] dark:text-[#edf4ef]">{activeMenuLabel}</span>
          </div>
          <div className="flex items-center gap-[15px] max-md:gap-2">
            <button
              type="button"
              className="h-[34px] min-w-[62px] rounded-[4px] border border-[#dfe7dc] bg-[#f2f5ef] px-[9px] text-[11px] font-bold whitespace-nowrap text-[#173b2d] hover:bg-[#e7eee4] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
              onClick={() => changeWebsiteLanguage(i18n.resolvedLanguage === 'bn' ? 'en' : 'bn')}
            >
              {i18n.resolvedLanguage === 'bn' ? 'English' : 'বাংলা'}
            </button>
            <button
              type="button"
              className="inline-grid h-[34px] w-[34px] place-items-center rounded-[4px] border border-[#dfe7dc] bg-[#f2f5ef] text-[#173b2d] hover:bg-[#e7eee4] dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]"
              onClick={toggleTheme}
              aria-label={themeAriaLabel}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <span className="inline-flex w-fit items-center gap-[7px] rounded-[3px] bg-[#edf2eb] px-2 py-[5px] text-[9px] font-[750] tracking-[0.095em] text-[#6a775f] max-md:text-[7px] dark:bg-[#223128] dark:text-[#dfe9e2]">
              <i className="inline-block h-1.5 w-1.5 rounded-full bg-[#69a17a]" />{' '}
              {t('common.demoMode')}
            </span>
            <button
              aria-label={t('common.notifications')}
              className="relative inline-grid h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-[#536157] hover:bg-[#eef2ed] max-md:hidden dark:bg-[#223128] dark:text-[#dfe9e2]"
            >
              <Bell size={18} />
              <i className="absolute top-1.5 right-[7px] h-[5px] w-[5px] rounded-full border border-white bg-[#be7552]" />
            </button>
            <Link
              className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-[#e7efe4] text-[9px] font-bold text-[#466e4d] dark:bg-[#223128] dark:text-[#a6c5ab]"
              to="/"
            >
              {isAdmin ? 'AD' : isBuyer ? 'BU' : 'SE'}
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-[1420px] px-7 pt-[25px] pb-[55px] max-[1000px]:px-5 max-md:px-[13px] max-md:pt-4 max-md:pb-[38px] dark:bg-[#111915]">
          {showNotice && !isAdmin && (
            <div className="mb-5 flex items-center gap-[9px] rounded-[3px] border border-[#dce8d6] bg-[#edf3e9] px-3 py-2.5 text-[9px] leading-[1.5] text-[#5f715f] max-md:mb-3.5 max-md:items-start dark:border-[#3a4d40] dark:bg-[#223128] dark:text-[#dfe9e2]">
              <CircleHelp size={17} className="shrink-0" />
              <span>
                <b>{t('dashboard.demoNotice')}</b> — {t('dashboard.demoNoticeText')}
              </span>
              <button
                onClick={() => setShowNotice(false)}
                aria-label={t('common.close')}
                className="ml-auto grid h-7 w-7 shrink-0 place-items-center border-0 bg-transparent text-[#718071] dark:text-[#b2beb5]"
              >
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
