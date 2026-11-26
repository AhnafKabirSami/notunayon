import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import Logo from './Logo.tsx'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-forest-deep pt-[49px] text-footer-text">
      <div className="mx-auto grid w-[min(1190px,calc(100%-64px))] grid-cols-[1.5fr_1fr_1fr_1.3fr] gap-[45px] pb-[39px] max-[1000px]:w-[min(100%-42px,850px)] max-[1000px]:gap-[25px] max-md:w-[calc(100%-36px)] max-md:grid-cols-2 max-md:gap-x-5 max-md:gap-y-[27px] max-[420px]:w-[calc(100%-28px)] max-[420px]:gap-x-3 max-[420px]:gap-y-[22px]">
        <div className="max-md:col-span-2">
          <Logo light footerBrand />
          <p className="my-[15px] max-w-[280px] text-[11px] leading-[1.7] text-footer-muted">
            {t('footer.tagline')}
          </p>
          <div className="flex gap-[7px]">
            <a
              href="mailto:xyz@gmail.com"
              aria-label={t('common.email') || 'Email'}
              className="grid h-[30px] w-[30px] place-items-center rounded-[3px] bg-white/[0.08] text-footer-social hover:bg-white/[0.16]"
            >
              <Mail size={17} />
            </a>

            <a
              href="tel:+8801700000000"
              aria-label={t('common.phone') || 'Phone'}
              className="grid h-[30px] w-[30px] place-items-center rounded-[3px] bg-white/[0.08] text-footer-social hover:bg-white/[0.16]"
            >
              <Phone size={17} />
            </a>

            <Link
              to="/contact"
              aria-label={t('common.contact')}
              className="grid h-[30px] w-[30px] place-items-center rounded-[3px] bg-white/[0.08] text-footer-social hover:bg-white/[0.16]"
            >
              <MessageCircle size={17} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start gap-[9px] max-[420px]:min-w-0">
          <h4 className="mt-1 mb-1.5 text-[11px] font-[670] tracking-[0.015em] text-footer-heading">
            {t('common.marketplace')}
          </h4>
          <Link
            to="/marketplace"
            className="text-[10px] text-footer-link hover:text-white max-[420px]:text-[9px]"
          >
            {t('footer.browse')}
          </Link>
          <Link
            to="/requests"
            className="text-[10px] text-footer-link hover:text-white max-[420px]:text-[9px]"
          >
            {t('footer.requests')}
          </Link>
          <Link
            to="/register"
            className="text-[10px] text-footer-link hover:text-white max-[420px]:text-[9px]"
          >
            {t('common.listByProduct')}
          </Link>
          <Link
            to="/logistics"
            className="text-[10px] text-footer-link hover:text-white max-[420px]:text-[9px]"
          >
            {t('footer.transport')}
          </Link>
        </div>

        <div className="flex flex-col items-start gap-[9px] max-[420px]:min-w-0">
          <h4 className="mt-1 mb-1.5 text-[11px] font-[670] tracking-[0.015em] text-footer-heading">
            {t('common.company') || t('common.about')}
          </h4>
          <Link
            to="/about"
            className="text-[10px] text-footer-link hover:text-white max-[420px]:text-[9px]"
          >
            {t('common.about')} Notunayon
          </Link>
          <Link
            to="/how-it-works"
            className="text-[10px] text-footer-link hover:text-white max-[420px]:text-[9px]"
          >
            {t('common.howItWorks')}
          </Link>
          <Link
            to="/contact"
            className="text-[10px] text-footer-link hover:text-white max-[420px]:text-[9px]"
          >
            {t('common.contact')}
          </Link>
          <Link
            to="/login"
            className="text-[10px] text-footer-link hover:text-white max-[420px]:text-[9px]"
          >
            {t('common.login')}
          </Link>
        </div>

        <div className="flex flex-col items-start gap-[9px] max-[420px]:min-w-0">
          <h4 className="mt-1 mb-1.5 text-[11px] font-[670] tracking-[0.015em] text-footer-heading">
            {t('footer.getInTouch')}
          </h4>
          <p className="m-0 text-[10px] text-footer-muted">{t('footer.question')}</p>
          <a
            href="mailto:xyz@gmail.com"
            className="text-[10px] text-footer-link hover:text-white max-[420px]:text-[9px]"
          >
            xyz@gmail.com
          </a>
        </div>
      </div>

      <div className="mx-auto flex w-[min(1190px,calc(100%-64px))] justify-between gap-5 border-t border-white/[0.12] py-[15px] pb-[17px] text-[9px] text-footer-subtle max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:flex-col max-md:gap-[7px] max-md:text-[10px] max-[420px]:w-[calc(100%-28px)]">
        <span>{t('footer.copyright')}</span>
      </div>
    </footer>
  )
}
