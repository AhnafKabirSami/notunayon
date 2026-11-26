import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, MapPin } from 'lucide-react'
import { marketplaceLabel } from '../../utils/marketplace.ts'

const spots = [
  { city: 'Rangpur', x: 52, y: 14, amount: '3 listings', ochre: false },
  { city: 'Dinajpur', x: 37, y: 22, amount: '2 listings', ochre: true },
  { city: 'Bogura', x: 48, y: 39, amount: '4 listings', ochre: false },
  { city: 'Rajshahi', x: 25, y: 46, amount: '2 listings', ochre: false },
  { city: 'Mymensingh', x: 67, y: 39, amount: '3 listings', ochre: true },
  { city: 'Gazipur', x: 64, y: 54, amount: '5 listings', ochre: false },
  { city: 'Cumilla', x: 85, y: 67, amount: '1 listing', ochre: true },
  { city: 'Jashore', x: 32, y: 76, amount: '2 listings', ochre: false },
]

export default function SupplyMap() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="grid min-h-[405px] grid-cols-[35%_65%] overflow-hidden rounded-[5px] border border-line bg-surface-tint-soft max-md:grid-cols-1">
      <div className="flex flex-col items-start justify-center p-[39px] max-md:px-6 max-md:pt-6 max-md:pb-2">
        <span className="inline-flex items-center gap-[7px] text-[9px] font-[760] tracking-[0.11em] text-eyebrow">
          <MapPin size={15} /> DEMONSTRATION SUPPLY AREAS
        </span>
        <h3 className="mt-[18px] mb-[9px] font-serif text-[29px] leading-[1.16] font-medium tracking-[-0.035em] text-ink max-md:mt-2.5 max-md:text-[24px]">
          Local by-products, across regions.
        </h3>
        <p className="m-0 text-[12px] leading-[1.7] text-muted max-md:text-[11px]">
          Explore sample collection areas and material types. Locations and counts are illustrative.
        </p>
        <div className="my-[23px] grid gap-[11px] text-[10px] text-muted max-md:my-[13px] max-md:grid-cols-[repeat(3,auto)] max-md:gap-2 max-[420px]:grid-cols-2">
          <span className="flex items-center gap-[9px] max-md:text-[8px]">
            <i className="inline-block h-[7px] w-[7px] rounded-full bg-sage-pin" /> Farm supply
          </span>
          <span className="flex items-center gap-[9px] max-md:text-[8px]">
            <i className="inline-block h-[7px] w-[7px] rounded-full bg-ochre-dot" /> Mill &
            processing
          </span>
          <span className="flex items-center gap-[9px] max-md:text-[8px]">
            <i className="inline-block h-[7px] w-[7px] rounded-full bg-chart-highlight" />{' '}
            {marketplaceLabel(t, 'Crop residues', { type: 'category' })}
          </span>
        </div>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-[7px] text-[12px] font-[680] text-link hover:text-link-hover max-md:mb-[13px]"
        >
          Browse all locations <ArrowRight size={16} />
        </Link>
      </div>
      <div className="relative min-h-[405px] overflow-hidden bg-surface-map max-md:min-h-[340px]">
        <div
          className="absolute inset-0 opacity-[0.43]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(141,162,140,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(141,162,140,.16) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <svg
          className="absolute top-1/2 left-1/2 max-h-[94%] w-[310px] -translate-x-1/2 -translate-y-1/2 max-md:w-[275px]"
          viewBox="0 0 330 370"
          aria-label="Stylized map of Bangladesh"
          role="img"
        >
          <path
            d="M140 15 179 28 210 23 218 46 248 50 259 72 251 98 277 117 267 137 293 153 276 179 288 202 268 215 281 236 265 257 246 264 244 294 226 310 213 336 189 326 171 345 152 329 133 344 118 323 94 331 82 310 62 313 68 290 47 282 54 259 34 245 45 226 29 208 47 189 42 167 60 151 54 130 75 119 69 98 88 86 83 63 100 48 101 29 120 31Z"
            className="fill-sage-fill stroke-sage-stroke stroke-2"
          />
          <path
            d="M81 177 125 193 156 185 190 205 232 199 M113 88 138 122 131 155 M169 45 175 91 199 119 191 152 216 177 M72 250 119 258 157 239 192 254 234 242"
            className="fill-none stroke-sage-river stroke-[4] [stroke-linecap:round]"
          />
        </svg>
        {spots.map((spot) => (
          <button
            key={spot.city}
            className="group absolute z-[2] flex items-center gap-1.5 border-0 bg-transparent p-0 text-left"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            title={`${spot.city} · ${spot.amount}`}
            onClick={() => navigate(`/marketplace?q=${encodeURIComponent(spot.city)}`)}
          >
            <span className="grid h-[21px] w-[21px] shrink-0 place-items-center rounded-full border border-white bg-sage-pin/30 shadow-[0_1px_5px_rgba(31,71,45,0.1)] transition group-hover:scale-[1.12]">
              <i
                className={`h-2 w-2 rounded-full ${
                  spot.ochre
                    ? 'bg-ochre-pin shadow-[0_0_0_3px_rgba(188,142,77,0.18)]'
                    : 'bg-sage-pin shadow-[0_0_0_3px_rgba(75,138,93,0.19)]'
                }`}
              />
            </span>
            <span className="block rounded-[3px] border border-line bg-surface/[0.92] px-[7px] py-[5px] text-[9px] font-[740] text-ink shadow-[0_2px_6px_rgba(43,70,46,0.08)]">
              {spot.city}
              <small className="mt-0.5 block text-[8px] font-medium text-muted">
                {spot.amount}
              </small>
            </span>
          </button>
        ))}
        <span className="absolute right-[15px] bottom-[13px] bg-surface/85 px-2 py-1.5 text-[9px] text-muted">
          Illustrative supply map
        </span>
      </div>
    </div>
  )
}
