import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import Logo from './Logo.jsx'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-about">
          <Logo light footerBrand />
          <p>{t('footer.tagline')}</p>
          <div className="social-row">
            <a href="mailto:xyz@gmail.com" aria-label={t('common.email') || 'Email'}>
              <Mail size={17} />
            </a>

            <a href="tel:+8801700000000" aria-label={t('common.phone') || 'Phone'}>
              <Phone size={17} />
            </a>

            <Link to="/contact" aria-label={t('common.contact')}>
              <MessageCircle size={17} />
            </Link>
          </div>
        </div>

        <div>
          <h4>{t('common.marketplace')}</h4>
          <Link to="/marketplace">{t('footer.browse')}</Link>
          <Link to="/requests">{t('footer.requests')}</Link>
          <Link to="/register">{t('common.listByProduct')}</Link>
          <Link to="/logistics">{t('footer.transport')}</Link>
        </div>

        <div>
          <h4>{t('common.company') || t('common.about')}</h4>
          <Link to="/about">{t('common.about')} Notunayon</Link>
          <Link to="/how-it-works">{t('common.howItWorks')}</Link>
          <Link to="/contact">{t('common.contact')}</Link>
          <Link to="/login">{t('common.login')}</Link>
        </div>

        <div className="footer-contact">
          <h4>{t('footer.getInTouch')}</h4>
          <p>{t('footer.question')}</p>
          <a href="mailto:xyz@gmail.com">xyz@gmail.com</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>{t('footer.copyright')}</span>
      </div>
    </footer>
  )
}

export default Footer
