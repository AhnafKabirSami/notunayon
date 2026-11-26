import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sprout } from 'lucide-react'

interface LogoProps {
  light?: boolean
  footerBrand?: boolean
  compact?: boolean
}

export default function Logo({ light = false, footerBrand = false, compact = false }: LogoProps) {
  const { t } = useTranslation()

  return (
    <Link
      to="/"
      className={`inline-flex shrink-0 items-center gap-[9px] ${
        light ? 'text-[#f3f7f2]' : 'text-[#173b2d] dark:text-[#a6c5ab]'
      }`}
      aria-label="Notunayon home"
    >
      <span
        className={`grid place-items-center rounded-[10px_10px_10px_3px] ${
          compact ? 'h-[34px] w-[34px]' : 'h-[38px] w-[38px] max-md:h-[34px] max-md:w-[34px]'
        } ${
          light
            ? 'bg-[#dbe8da] text-[#173b2d]'
            : 'bg-[#173b2d] text-white dark:bg-[#1b3024]'
        }`}
      >
        <Sprout size={22} strokeWidth={2.2} />
      </span>

      <span className="flex flex-col leading-[1.08] tracking-[-0.04em]">
        <b
          className={
            compact
              ? 'text-[18px] font-[760]'
              : 'text-[20px] font-[760] max-md:text-[18px]'
          }
        >
          {footerBrand ? t('footer.brandName') : 'notunayon'}
        </b>
        {!footerBrand && (
          <small
            className={`mt-1 text-[10px] tracking-[0.08em] ${
              light ? 'text-[#a7b9a7]' : 'text-[#77877b] dark:text-[#b2beb5]'
            }`}
          >
            নতুনায়ন
          </small>
        )}
      </span>
    </Link>
  )
}
