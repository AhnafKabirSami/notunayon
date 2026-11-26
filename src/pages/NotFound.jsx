import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="page-main not-found">
      <div className="container">
        <span className="eyebrow">{t('notFound.eyebrow')}</span>
        <h1>{t('notFound.title')}</h1>
        <p>{t('notFound.text')}</p>
        <div>
          <Link className="button button-solid" to="/">
            {t('notFound.home')} <ArrowRight size={16} />
          </Link>
          <Link className="button button-outline-dark" to="/marketplace">
            {t('notFound.browse')}
          </Link>
        </div>
      </div>
    </main>
  )
}
