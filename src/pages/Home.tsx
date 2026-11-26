import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardList,
  HandCoins,
  Recycle,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Truck,
  Wheat,
} from 'lucide-react'
import { useApp } from '../context/useApp.ts'
import { marketplaceLabel } from '../utils/marketplace.ts'
import EnquiryForm from '../components/block/EnquiryForm.tsx'
import ListingCard from '../components/block/ListingCard.tsx'
import MatchingPreview from '../components/block/MatchingPreview.tsx'
import SearchBox from '../components/block/SearchBox.tsx'
import SupplyMap from '../components/block/SupplyMap.tsx'
import { buttonClasses } from '../components/ui/buttonStyles.ts'
import SectionHeading from '../components/ui/SectionHeading.tsx'

export default function Home() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { listings } = useApp()

  const examples =
    i18n.resolvedLanguage === 'bn'
      ? [
          'রাজশাহীর ধানের তুষ',
          '৩০ টাকার নিচে গরুর গোবর',
          'পোল্ট্রি লিটার, ৫ টন',
          'রংপুরের ধানের খড়',
        ]
      : [
          'Rice husk near Rajshahi',
          'Cow manure under ৳30/kg',
          'Poultry litter, 5 tonnes',
          'Rice straw in Rangpur',
        ]

  const fresh = listings.filter((item) => !item.paused).slice(0, 6)

  const processSteps: Array<[ReactNode, string, string, string]> = [
    [
      <ClipboardList />,
      '01',
      'Producers list',
      'Describe your by-product, quantity, condition, and collection location.',
    ],
    [
      <Search />,
      '02',
      'Buyers discover',
      'Search listings and compare materials from producers in different regions.',
    ],
    [
      <HandCoins />,
      '03',
      'Offers are discussed',
      'Send a local demo offer and discuss quantity, pricing, and delivery.',
    ],
    [
      <Truck />,
      '04',
      'Arrange the exchange',
      'Buyer and seller coordinate collection or transport directly.',
    ],
  ]

  return (
    <main>
      <section className="relative min-h-[660px] overflow-hidden bg-hero-bg text-white max-md:min-h-[635px] max-[420px]:min-h-[670px]">
        <div
          className="absolute inset-0 scale-[1.015] bg-[center_52%] bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=88")',
          }}
          role="img"
          aria-label="Lush green farmland in Bangladesh"
        />
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background:
              'linear-gradient(90deg, rgba(10,38,27,.88) 0%, rgba(12,40,28,.76) 42%, rgba(14,39,30,.24) 100%), linear-gradient(0deg, rgba(11,33,25,.48), transparent 49%)',
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,20,13,.96), rgba(10,31,20,.76), rgba(10,31,20,.22))',
          }}
        />
        <div className="relative mx-auto flex min-h-[660px] w-[min(1190px,calc(100%-64px))] flex-col justify-center pt-[38px] pb-[49px] max-[1000px]:w-[min(100%-42px,850px)] max-md:min-h-[635px] max-md:w-[calc(100%-36px)] max-md:pt-7 max-md:pb-[35px] max-[420px]:min-h-[670px] max-[420px]:w-[calc(100%-28px)]">
          <div className="max-w-[680px] pb-[35px]">
            <span className="inline-flex items-center gap-[9px] text-[11px] font-[650] tracking-[0.075em] text-hero-kicker uppercase max-md:text-[9px]">
              <span className="h-[7px] w-[7px] rounded-full bg-hero-dot shadow-[0_0_0_4px_rgba(200,225,164,0.16)]" />{' '}
              {t('home.kicker')}
            </span>
            <h1 className="mt-[18px] mb-[17px] max-w-[670px] font-serif text-[clamp(43px,5.3vw,68px)] leading-[1.04] font-medium tracking-[-0.048em] text-white normal-case max-md:max-w-[580px] max-md:text-[clamp(43px,10vw,60px)] max-[420px]:text-[43px]">
              {t('home.title')}
            </h1>
            <p className="m-0 max-w-[540px] text-[16px] leading-[1.7] text-white/[0.82] max-md:text-[13px]">
              {t('home.subtitle')}
            </p>
            <div className="mt-[27px] flex flex-wrap gap-[11px]">
              <Link className={buttonClasses({ variant: 'light' })} to="/marketplace">
                {t('home.findMaterials')} <ArrowRight size={17} />
              </Link>
              <Link className={buttonClasses({ variant: 'outline-light' })} to="/register">
                {t('home.listByProducts')}
              </Link>
            </div>
          </div>
          <div className="w-[min(760px,100%)] rounded-[5px] border border-line bg-surface px-[18px] pt-[17px] pb-[14px] text-ink shadow-[0_15px_44px_rgba(0,0,0,0.19)] max-md:p-[13px] max-[420px]:mt-[3px]">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-[9px] text-[10px] font-[650] tracking-[0.075em] text-muted uppercase">
                <Sparkles size={16} className="text-ochre" /> Smart material search
              </span>
              <small className="text-[10px] text-subtle">Demo experience</small>
            </div>
            <SearchBox
              onSearch={(query) =>
                navigate(`/marketplace${query ? `?q=${encodeURIComponent(query)}` : ''}`)
              }
            />
            <div className="flex flex-wrap items-center gap-[7px] pt-3 max-md:gap-[5px]">
              <span className="mr-0.5 text-[10px] text-subtle">Try</span>
              {examples.map((item) => (
                <button
                  key={item}
                  className="rounded-[3px] border border-line bg-surface-tint px-2 py-[5px] text-[10px] text-chip-text hover:border-eyebrow hover:text-accent max-md:text-[8px]"
                  onClick={() => navigate(`/marketplace?q=${encodeURIComponent(item)}`)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 flex w-[min(760px,100%)] justify-between text-[10px] text-white/[0.72] max-md:text-[8px] max-[420px]:flex-col max-[420px]:items-start max-[420px]:gap-1.5">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={16} /> Local listings and supplier discovery
            </span>
            <span>Illustrative marketplace data</span>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-band">
        <div className="mx-auto flex min-h-[68px] w-[min(1190px,calc(100%-64px))] items-center justify-between gap-4 text-[11px] text-muted max-[1000px]:w-[min(100%-42px,850px)] max-md:min-h-auto max-md:w-[calc(100%-36px)] max-md:flex-wrap max-md:justify-start max-md:gap-x-[18px] max-md:gap-y-3 max-md:py-[15px] max-[420px]:w-[calc(100%-28px)]">
          <span className="tracking-[0.04em] max-md:w-full">Connecting Bangladesh’s</span>
          <div className="flex items-center gap-2 text-[12px] font-[620] text-ink-soft max-md:text-[10px]">
            <Wheat size={18} className="text-eyebrow" /> Producers
          </div>
          <div className="flex items-center gap-2 text-[12px] font-[620] text-ink-soft max-md:text-[10px]">
            <Recycle size={18} className="text-eyebrow" /> Circular businesses
          </div>
          <div className="flex items-center gap-2 text-[12px] font-[620] text-ink-soft max-md:text-[10px]">
            <Truck size={18} className="text-eyebrow" /> Local logistics
          </div>
          <div className="flex items-center gap-2 text-[12px] font-[620] text-ink-soft max-md:text-[10px]">
            <Sprout size={18} className="text-eyebrow" /> Resource innovators
          </div>
        </div>
      </section>

      <section className="bg-canvas py-[91px] max-md:py-[62px]" id="discover">
        <div className="mx-auto w-[min(1190px,calc(100%-64px))] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
          <SectionHeading
            eyebrow="Find supply around you"
            title="A better way to source local materials."
            text="Explore sample supply areas and discover agricultural by-products across Bangladesh."
            action={
              <Link
                className="inline-flex items-center gap-[7px] text-[12px] font-[680] text-link hover:text-link-hover max-md:mt-[18px] max-md:text-[10px] max-md:whitespace-nowrap max-[420px]:mt-3"
                to="/marketplace"
              >
                Explore marketplace <ArrowRight size={16} />
              </Link>
            }
          />
          <SupplyMap />
        </div>
      </section>

      <section className="bg-canvas pt-0.5 pb-[83px] max-md:pb-[55px]">
        <div className="mx-auto grid w-[min(1190px,calc(100%-64px))] grid-cols-2 gap-5 max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:grid-cols-1 max-md:gap-3 max-[420px]:w-[calc(100%-28px)]">
          <article className="relative min-h-[379px] overflow-hidden rounded-[5px] border border-line bg-surface-tint px-[35px] py-[34px] max-md:min-h-0 max-md:p-[25px]">
            <span className="mb-[25px] grid h-11 w-11 place-items-center rounded-[4px] bg-sage-fill text-eyebrow max-md:mb-4">
              <Wheat size={24} />
            </span>
            <span className="text-[9px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
              For producers
            </span>
            <h2 className="my-[9px] max-w-[410px] font-serif text-[32px] leading-[1.12] font-medium tracking-[-0.045em] text-ink max-md:text-[29px]">
              Turn your by-products into income.
            </h2>
            <p className="relative z-[1] mb-4 max-w-[430px] text-[12px] leading-[1.7] text-muted">
              Connect farm, mill, and processing residues with businesses looking for practical local
              supply.
            </p>
            <div className="my-4 mb-5 flex flex-wrap gap-1.5">
              {[
                marketplaceLabel(t, 'Rice Husk', { fixed: true }),
                marketplaceLabel(t, 'Cattle Manure', { fixed: true }),
                marketplaceLabel(t, 'Poultry Litter', { fixed: true }),
                marketplaceLabel(t, 'Crop residues', { type: 'category' }),
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-[3px] border border-line bg-surface/[0.82] px-[9px] py-1.5 text-[9px] text-chip-text"
                >
                  {pill}
                </span>
              ))}
            </div>
            <Link
              className={buttonClasses({ variant: 'solid', className: 'relative z-[1]' })}
              to="/register"
            >
              List your by-products <ArrowRight size={17} />
            </Link>
            <div className="absolute -right-[15px] -bottom-7 -rotate-[15deg] text-eyebrow/10">
              <Sprout size={150} />
            </div>
          </article>
          <article className="relative min-h-[379px] overflow-hidden rounded-[5px] border border-line bg-surface-sand px-[35px] py-[34px] max-md:min-h-0 max-md:p-[25px]">
            <span className="mb-[25px] grid h-11 w-11 place-items-center rounded-[4px] bg-ochre-soft text-ochre max-md:mb-4">
              <Boxes size={24} />
            </span>
            <span className="text-[9px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
              For buyers
            </span>
            <h2 className="my-[9px] max-w-[410px] font-serif text-[32px] leading-[1.12] font-medium tracking-[-0.045em] text-ink max-md:text-[29px]">
              Find the right material for your business.
            </h2>
            <p className="relative z-[1] mb-4 max-w-[430px] text-[12px] leading-[1.7] text-muted">
              Compare available materials by type, quantity, price, location, condition, and supply
              schedule.
            </p>
            <ul className="my-5 mb-6 grid list-none gap-[11px] p-0 text-[11px] text-muted">
              <li className="flex items-center gap-[9px]">
                <Check size={16} className="text-eyebrow" /> Browse locally listed supply
              </li>
              <li className="flex items-center gap-[9px]">
                <Check size={16} className="text-eyebrow" /> Compare suppliers and quantities
              </li>
              <li className="flex items-center gap-[9px]">
                <Check size={16} className="text-eyebrow" /> Start a direct conversation
              </li>
            </ul>
            <Link
              className={buttonClasses({ variant: 'outline-dark', className: 'relative z-[1]' })}
              to="/marketplace"
            >
              Browse materials <ArrowRight size={17} />
            </Link>
          </article>
        </div>
      </section>

      <section className="bg-surface-cream pt-[67px] pb-[91px] max-md:py-[62px]" id="listings">
        <div className="mx-auto w-[min(1190px,calc(100%-64px))] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
          <SectionHeading
            eyebrow="Fresh on the market"
            title="By-products with new potential."
            text="A selection of recent sample listings from producers around the country."
            action={
              <Link
                className="inline-flex items-center gap-[7px] text-[12px] font-[680] text-link hover:text-link-hover max-md:mt-[18px] max-md:text-[10px] max-md:whitespace-nowrap max-[420px]:mt-3"
                to="/marketplace"
              >
                View all materials <ArrowRight size={16} />
              </Link>
            }
          />
          <div className="grid grid-cols-3 gap-[17px] max-[1000px]:grid-cols-2 max-md:gap-2.5">
            {fresh.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
          <p className="mt-5 mb-0 flex items-start gap-[7px] text-[10px] leading-[1.7] text-subtle">
            <CircleHelp size={15} className="mt-px shrink-0" /> Prices and availability are
            illustrative demo data, not verified market quotations.
          </p>
        </div>
      </section>

      <section className="bg-forest-section py-[45px] text-white max-md:py-8">
        <div className="mx-auto flex w-[min(1190px,calc(100%-64px))] items-center justify-between gap-[22px] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:flex-col max-md:items-start max-[420px]:w-[calc(100%-28px)]">
          <div>
            <span className="text-[10px] font-[760] tracking-[0.13em] text-kicker-sage uppercase">
              Buyer requests
            </span>
            <h2 className="mt-[9px] mb-1 font-serif text-[28px] font-medium tracking-[-0.035em] text-white max-md:text-[25px]">
              Searching for a material that isn’t listed?
            </h2>
            <p className="m-0 text-[12px] leading-[1.7] text-white/[0.72]">
              See what businesses are sourcing or post a requirement of your own.
            </p>
          </div>
          <Link className={buttonClasses({ variant: 'light' })} to="/requests">
            Explore buyer requests <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="bg-canvas py-[91px] max-md:py-[62px]" id="how-it-works">
        <div className="mx-auto w-[min(1190px,calc(100%-64px))] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
          <SectionHeading
            eyebrow="Straightforward by design"
            title="A simple path from supply to use."
            text="Notunayon helps people find one another. Buyers and sellers agree on the details directly."
          />
          <div className="grid grid-cols-4 gap-4 pt-1 max-md:grid-cols-2 max-md:gap-[9px]">
            {processSteps.map(([icon, no, title, text]) => (
              <div
                className="relative min-h-[204px] border-t border-line bg-surface-subtle p-[22px] max-md:min-h-[183px] max-md:p-4"
                key={no}
              >
                <div className="grid h-[37px] w-[37px] place-items-center rounded-[4px] bg-surface-tint text-eyebrow [&>svg]:w-[19px]">
                  {icon}
                </div>
                <span className="absolute top-6 right-[22px] font-serif text-[14px] text-subtle">
                  {no}
                </span>
                <h3 className="mt-[25px] mb-1.5 text-[15px] font-[680] tracking-[-0.035em] text-ink max-md:mt-5">
                  {title}
                </h3>
                <p className="m-0 text-[11px] leading-[1.65] text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-band py-[75px] max-md:py-[58px]">
        <div className="mx-auto grid w-[min(1190px,calc(100%-64px))] grid-cols-[0.87fr_1.13fr] items-center gap-[55px] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:grid-cols-1 max-md:gap-[25px] max-[420px]:w-[calc(100%-28px)]">
          <div>
            <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
              Thoughtful supplier discovery
            </span>
            <h2 className="my-3 max-w-[425px] font-serif text-[clamp(31px,3vw,42px)] leading-[1.12] font-medium tracking-[-0.045em] text-ink max-md:max-w-[500px] max-md:text-[32px]">
              Find promising material matches, faster.
            </h2>
            <p className="mb-[18px] max-w-[440px] text-[12px] leading-[1.7] text-muted">
              Explore suppliers based on material fit, location, available quantity, listed price,
              and condition. Recommendations are a frontend demonstration—not a live AI service.
            </p>
            <Link
              className="inline-flex items-center gap-[7px] text-[12px] font-[680] text-link hover:text-link-hover"
              to="/buyer-dashboard/recommendations"
            >
              Explore matching preview <ArrowRight size={16} />
            </Link>
          </div>
          <MatchingPreview />
        </div>
      </section>

      <section className="bg-canvas py-[91px] max-md:py-[62px] max-md:pb-14">
        <div className="mx-auto grid w-[min(1190px,calc(100%-64px))] grid-cols-[0.82fr_1.18fr] items-start gap-16 max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:grid-cols-1 max-md:gap-[25px] max-[420px]:w-[calc(100%-28px)]">
          <div className="pt-[22px] max-md:pt-0">
            <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
              Supply desk
            </span>
            <h2 className="mt-2.5 mb-2.5 max-w-[410px] font-serif text-[clamp(31px,3vw,42px)] leading-[1.12] font-medium tracking-[-0.045em] text-ink max-md:max-w-[500px] max-md:text-[32px]">
              Need help sourcing for your business?
            </h2>
            <p className="mt-3 mb-5 max-w-[440px] text-[12px] leading-[1.7] text-muted">
              Share what your team is looking for. Our sourcing request demo helps organize your
              material, volume, and delivery needs.
            </p>
            <div className="grid gap-[11px] text-[11px] text-muted">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-eyebrow" /> Share your volume and location
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-eyebrow" /> Describe your quality
                preferences
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-eyebrow" /> Receive a local confirmation
              </span>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>

      <section className="bg-canvas pt-[30px] pb-20 max-md:pb-14">
        <div className="mx-auto grid w-[min(1190px,calc(100%-64px))] grid-cols-2 overflow-hidden rounded-[5px] border border-line bg-surface-tint-soft max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-md:grid-cols-1 max-[420px]:w-[calc(100%-28px)]">
          <div
            className="min-h-[350px] bg-cover bg-center max-md:min-h-[240px]"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=85")',
            }}
          />
          <div className="flex flex-col items-start justify-center p-[43px] max-md:p-[25px]">
            <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
              Moving resources forward
            </span>
            <h2 className="mt-2.5 mb-2.5 max-w-[440px] font-serif text-[clamp(31px,3vw,42px)] leading-[1.12] font-medium tracking-[-0.045em] text-ink max-md:text-[32px]">
              Local logistics can connect supply with demand.
            </h2>
            <p className="mb-[21px] max-w-[440px] text-[12px] leading-[1.7] text-muted">
              Transport providers can support collection, consolidation, and delivery between
              agricultural producers and material buyers.
            </p>
            <Link className={buttonClasses({ variant: 'outline-dark' })} to="/logistics">
              Explore logistics <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-band pt-[65px] pb-[74px]">
        <div className="mx-auto w-[min(1190px,calc(100%-64px))] max-[1000px]:w-[min(100%-42px,850px)] max-md:w-[calc(100%-36px)] max-[420px]:w-[calc(100%-28px)]">
          <div className="text-center">
            <span className="text-[10px] font-[760] tracking-[0.13em] text-eyebrow uppercase">
              An early-stage idea with room to grow
            </span>
            <h2 className="mt-[11px] mb-1.5 font-serif text-[34px] leading-[1.12] font-medium tracking-[-0.045em] text-ink max-[420px]:text-[28px]">
              Better use starts with better connections.
            </h2>
            <p className="m-0 text-[11px] leading-[1.7] text-muted">
              Illustrative demonstration figures for this frontend prototype.
            </p>
          </div>
          <div className="mt-[35px] grid grid-cols-4 border-y border-line max-md:grid-cols-2">
            {[
              ['12', 'Sample listings'],
              ['5.2 MT', 'Illustrative materials exchanged'],
              ['18', 'Demo producer profiles'],
              ['24', 'Demo buyer profiles'],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`flex flex-col items-center px-2.5 py-[22px] ${
                  index < 3 ? 'border-r border-line' : ''
                } ${index === 1 ? 'max-md:border-r-0' : ''} ${
                  index < 2 ? 'max-md:border-b max-md:border-line' : ''
                }`}
              >
                <strong className="font-serif text-[29px] font-medium text-accent">{value}</strong>
                <span className="mt-1 text-center text-[10px] text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
