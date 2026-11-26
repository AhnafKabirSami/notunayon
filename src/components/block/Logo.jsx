import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sprout } from 'lucide-react'

function Logo({ light = false, footerBrand = false }) {
  const { t } = useTranslation()

  return (
    <Link
      to="/"
      className={`brand ${light ? 'brand-light' : ''}`}
      aria-label="Notunayon home"
    >
      <span className="brand-icon">
        <Sprout size={22} strokeWidth={2.2} />
      </span>

      <span className="brand-type">
        <b>{footerBrand ? t('footer.brandName') : 'notunayon'}</b>
        {!footerBrand && <small>নতুনায়ন</small>}
      </span>
    </Link>
  )
}

export default Logo
