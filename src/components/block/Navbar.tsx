import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Moon, Plus, Sun, X } from 'lucide-react'
import { useApp } from '../../context/useApp.ts'
import { changeWebsiteLanguage } from '../../i18n/i18n.ts'
import { useTheme } from '../../theme/useTheme.ts'
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
    <header className="site-header">
      <div className="topline">
        <span>{t('nav.topline')}</span>
        <span className="demo-pill">
          {t('nav.demoPlatform')} · {t('common.sampleData')}
        </span>
      </div>

      <div className="nav-wrap container">
        <Logo />

        <button
          className="mobile-menu icon-button"
          aria-label={t('nav.toggle')}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`main-nav ${open ? 'nav-open' : ''}`}>
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
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
            className="nav-language"
            onClick={toggleLanguage}
            aria-label={i18n.resolvedLanguage === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
          >
            {i18n.resolvedLanguage === 'bn' ? 'English' : 'বাংলা'}
          </button>

          <Link className="nav-login" to={user ? `/${user.type}-dashboard` : '/login'}>
            {user ? user.name.split(' ')[0] : t('common.login')}
          </Link>

          <Link className="button button-small button-solid" to="/register">
            <Plus size={16} />
            {t('common.listByProduct')}
          </Link>
        </div>
      </div>
    </header>
  )
}
