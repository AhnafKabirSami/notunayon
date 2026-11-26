import type { ReactNode } from 'react'
import { photo } from '../../utils/marketplace.ts'

interface StaticPageProps {
  eyebrow: string
  title: string
  intro: string
  image: string
  children: ReactNode
}

export default function StaticPage({ eyebrow, title, intro, image, children }: StaticPageProps) {
  return (
    <main className="min-h-[65vh] bg-canvas pt-[54px] pb-[85px] max-md:pt-[38px] max-md:pb-[60px]">
      <div className="mx-auto grid w-[min(1190px,calc(100%-64px))] grid-cols-[1fr_0.85fr] items-center gap-[45px] border-b border-line pb-[47px] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:grid-cols-1 max-md:gap-[23px] max-md:pb-[29px] max-[420px]:w-[calc(100%-28px)]">
        <div>
          <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
            {eyebrow}
          </span>
          <h1 className="my-2.5 max-w-[760px] font-serif text-[clamp(38px,4.2vw,53px)] leading-[1.08] font-medium tracking-[-0.05em] text-ink max-md:text-[38px]">
            {title}
          </h1>
          <p className="mt-3 mb-0 max-w-[580px] text-[13px] leading-[1.7] text-muted">{intro}</p>
        </div>
        <div className="relative h-[295px] overflow-hidden rounded-[4px] bg-static-fallback max-md:h-[220px]">
          <img
            src={photo(image, 1200)}
            alt="Bangladesh agriculture and natural resources"
            className="block h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <span className="absolute right-2.5 bottom-2.5 bg-white/[0.88] px-2 py-1.5 text-[9px] text-forest-dark">
            Notunayon · Demo prototype
          </span>
        </div>
      </div>
      <div className="mx-auto w-[min(1190px,calc(100%-64px))] pt-[42px] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:pt-7 max-[420px]:w-[calc(100%-28px)]">
        {children}
      </div>
    </main>
  )
}
