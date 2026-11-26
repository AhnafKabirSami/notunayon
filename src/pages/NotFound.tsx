import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { buttonClasses } from '../components/ui/buttonStyles.ts'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="flex min-h-[65vh] items-center bg-canvas pt-[54px] pb-[85px] max-md:pt-[38px] max-md:pb-[60px]">
      <div className="mx-auto w-[min(1190px,calc(100%-64px))] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
        <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
          {t('notFound.eyebrow')}
        </span>
        <h1 className="mt-2.5 mb-[9px] max-w-[760px] font-serif text-[clamp(36px,4vw,52px)] leading-[1.08] font-medium tracking-[-0.05em] text-ink">
          {t('notFound.title')}
        </h1>
        <p className="text-[13px] leading-[1.7] text-muted">{t('notFound.text')}</p>
        <div className="mt-[22px] flex gap-[9px] max-md:flex-col max-md:items-start">
          <Link className={buttonClasses({ variant: 'solid' })} to="/">
            {t('notFound.home')} <ArrowRight size={16} />
          </Link>
          <Link className={buttonClasses({ variant: 'outline-dark' })} to="/marketplace">
            {t('notFound.browse')}
          </Link>
        </div>
      </div>
    </main>
  )
}
