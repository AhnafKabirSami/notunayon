import type { ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Logo from './Logo.tsx'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-[calc(100vh-105px)] grid-cols-[0.95fr_1.05fr] max-md:min-h-[calc(100vh-93px)] max-md:grid-cols-1">
      <div className="relative flex min-h-[650px] flex-col justify-between overflow-hidden bg-[#173b2d] px-[clamp(35px,6vw,90px)] py-10 text-white max-md:hidden dark:bg-[#17241d]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(10,36,25,.89), rgba(11,39,26,.36)), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85")',
          }}
        />
        <div className="relative z-[1] self-start">
          <Logo light />
        </div>
        <div className="relative z-[1] max-w-[450px] pt-20 pb-8">
          <span className="text-[10px] font-[760] tracking-[0.13em] text-[#c4d3bc] uppercase">
            Agriculture · exchange · opportunity
          </span>
          <h2 className="my-[13px] font-serif text-[38px] leading-[1.13] font-medium tracking-[-0.035em] text-white">
            Give good materials another place to grow.
          </h2>
          <p className="text-[12px] leading-[1.7] text-[#d1ddd1]">
            Explore a local demonstration marketplace connecting Bangladesh’s agricultural producers
            and businesses.
          </p>
          <div className="mt-5 grid gap-2.5 text-[10px] text-[#e0eadf]">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#bbd0af]" /> Explore sample supply
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#bbd0af]" /> Test a local marketplace flow
            </span>
          </div>
        </div>
      </div>
      <section className="m-auto flex w-full max-w-[650px] flex-col justify-center px-[clamp(32px,5vw,78px)] py-[55px] max-md:w-[min(550px,100%)] max-md:px-[22px] max-md:py-[34px] dark:bg-[#111915]">
        <div className="mb-7 hidden max-md:block">
          <Logo />
        </div>
        {children}
        <div className="mt-[27px] border-t border-[#e9ede8] pt-[13px] text-center text-[9px] leading-[1.5] text-[#9aa39b] dark:border-[#34463a]">
          By continuing, you’re using a frontend demonstration. No production account is created.
        </div>
      </section>
    </main>
  )
}
