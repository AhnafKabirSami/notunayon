import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe, Menu, Moon, Plus, Sun, X } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import { changeWebsiteLanguage } from '../../i18n/i18n.ts'
import { useTheme } from '../../theme/useTheme.ts'
import { buttonClasses } from '../ui/buttonStyles.ts'
import Logo from './Logo.tsx'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const { user } = useApp()

  const links: Array<[string, string]> = [
    [t('common.home'), '/'],
    [t('common.marketplace'), '/marketplace'],
    [t('common.howItWorks'), '/how-it-works'],
    [t('common.about'), '/about'],
    [t('common.contact'), '/contact'],
    [t('common.register'), '/register'],
  ]

  const toggleLanguage = () => {
    changeWebsiteLanguage(i18n.resolvedLanguage === 'bn' ? 'en' : 'bn')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/[0.97] backdrop-blur-md">
      {/* <div className="flex h-[29px] items-center justify-between bg-forest px-[max(32px,calc((100%-1190px)/2))] text-[10px] tracking-[0.045em] text-topline max-md:px-[18px] max-[420px]:px-3">
        <span className="max-md:truncate max-[420px]:max-w-[57%] max-[420px]:text-[8px]">
          {t('nav.topline')}
        </span>
      </div> */}

      <div className="mx-auto flex h-[76px] w-[min(1190px,calc(100%-64px))] items-center justify-between gap-[30px] max-[1000px]:w-[min(100%-42px,850px)] max-[1000px]:gap-[18px] max-md:h-16 max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)] max-[420px]:gap-2">
        <Logo />

        <button
          className="hidden h-9 w-9 place-items-center rounded-[4px] border-0 bg-transparent text-muted hover:bg-surface-tint max-md:ml-auto max-md:inline-grid"
          aria-label={t('nav.toggle')}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav
          className={`flex items-center gap-[27px] max-[1000px]:gap-[17px] max-md:absolute max-md:top-[93px] max-md:right-0 max-md:left-0 max-md:flex-col max-md:items-stretch max-md:gap-0 max-md:border-b max-md:border-line max-md:bg-surface max-md:px-[18px] max-md:pt-2 max-md:pb-3.5 max-md:shadow-[0_8px_16px_rgba(20,40,26,0.08)] ${
            open ? 'max-md:flex' : 'max-md:hidden'
          }`}
        >
          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `relative py-[29px] pb-[27px] text-[13px] font-[560] max-md:px-[3px] max-md:py-[11px] max-md:text-[12px] ${
                  isActive
                    ? 'text-link after:absolute after:inset-x-0 after:bottom-[17px] after:h-[2px] after:bg-sage-line after:content-[""] max-md:after:hidden'
                    : 'text-muted hover:text-link'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-[19px] max-[1000px]:gap-[11px] max-md:gap-[9px] max-[420px]:gap-1.5">
          <button
            type="button"
            className="inline-grid h-[34px] w-[34px] place-items-center rounded-[4px] border border-line bg-surface-tint text-accent hover:bg-surface-tint-hover max-md:h-8 max-md:w-8"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? i18n.resolvedLanguage === 'bn'
                  ? 'লাইট থিমে যান'
                  : 'Switch to light theme'
                : i18n.resolvedLanguage === 'bn'
                  ? 'ডার্ক থিমে যান'
                  : 'Switch to dark theme'
            }
            title={
              theme === 'dark'
                ? i18n.resolvedLanguage === 'bn'
                  ? 'লাইট থিম'
                  : 'Light theme'
                : i18n.resolvedLanguage === 'bn'
                  ? 'ডার্ক থিম'
                  : 'Dark theme'
            }
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            className="h-[34px] min-w-[62px] rounded-[4px] border border-line bg-surface-tint px-[9px] text-[11px] font-bold whitespace-nowrap text-accent hover:bg-surface-tint-hover"
            onClick={toggleLanguage}
            aria-label={i18n.resolvedLanguage === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
          >
            <Globe
              size={16}
              className="inline mr-1.5 -mt-0.5"
            />
            {i18n.resolvedLanguage === 'bn' ? 'বাং' : 'En'}
          </button>

          <Link
            className="text-[13px] font-[650] text-ink-soft max-md:text-[11px] max-[420px]:text-[9px]"
            to={user ? `/${user.type}-dashboard` : '/login'}
          >
            {user ? user.name.split(' ')[0] : t('common.login')}
          </Link>

          <Link
            className={buttonClasses({
              variant: 'solid',
              size: 'sm',
              className:
                'max-md:min-h-[35px] max-md:px-[9px] max-md:text-[9px] max-[420px]:text-[8px] max-[420px]:[&>svg]:hidden',
            })}
            to="/register"
          >
            <Plus size={16} />
            {t('common.listByProduct')}
          </Link>
        </div>
      </div>
    </header>
  )
}
