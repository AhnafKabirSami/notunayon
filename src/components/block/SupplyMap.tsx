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
    <div className="grid min-h-[405px] grid-cols-[35%_65%] overflow-hidden rounded-[5px] border border-[#e1e7de] bg-[#f4f6f0] max-md:grid-cols-1 dark:border-[#34463a] dark:bg-[#1a261f]">
      <div className="flex flex-col items-start justify-center p-[39px] max-md:px-6 max-md:pt-6 max-md:pb-2">
        <span className="inline-flex items-center gap-[7px] text-[9px] font-[760] tracking-[0.11em] text-[#708173] dark:text-[#a6c5ab]">
          <MapPin size={15} /> DEMONSTRATION SUPPLY AREAS
        </span>
        <h3 className="mt-[18px] mb-[9px] font-serif text-[29px] leading-[1.16] font-medium tracking-[-0.035em] text-[#252e28] max-md:mt-2.5 max-md:text-[24px] dark:text-[#edf4ef]">
          Local by-products, across regions.
        </h3>
        <p className="m-0 text-[12px] leading-[1.7] text-[#737c75] max-md:text-[11px] dark:text-[#b2beb5]">
          Explore sample collection areas and material types. Locations and counts are illustrative.
        </p>
        <div className="my-[23px] grid gap-[11px] text-[10px] text-[#59655d] max-md:my-[13px] max-md:grid-cols-[repeat(3,auto)] max-md:gap-2 max-[420px]:grid-cols-2 dark:text-[#b2beb5]">
          <span className="flex items-center gap-[9px] max-md:text-[8px]">
            <i className="inline-block h-[7px] w-[7px] rounded-full bg-[#4f8d62]" /> Farm supply
          </span>
          <span className="flex items-center gap-[9px] max-md:text-[8px]">
            <i className="inline-block h-[7px] w-[7px] rounded-full bg-[#bf8e4d]" /> Mill &
            processing
          </span>
          <span className="flex items-center gap-[9px] max-md:text-[8px]">
            <i className="inline-block h-[7px] w-[7px] rounded-full bg-[#879d75]" />{' '}
            {marketplaceLabel(t, 'Crop residues', { type: 'category' })}
          </span>
        </div>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-[7px] text-[12px] font-[680] text-[#285d41] hover:text-[#173b2d] max-md:mb-[13px] dark:text-[#dbe8df]"
        >
          Browse all locations <ArrowRight size={16} />
        </Link>
      </div>
      <div className="relative min-h-[405px] overflow-hidden bg-[#eaf0e8] max-md:min-h-[340px] dark:bg-[#152019]">
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
            className="fill-[#dce8d9] stroke-[#b5c9b5] stroke-2 dark:fill-[#223128] dark:stroke-[#3a4d40]"
          />
          <path
            d="M81 177 125 193 156 185 190 205 232 199 M113 88 138 122 131 155 M169 45 175 91 199 119 191 152 216 177 M72 250 119 258 157 239 192 254 234 242"
            className="fill-none stroke-[#b9d1cc] stroke-[4] [stroke-linecap:round] dark:stroke-[#3a4d40]"
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
            <span className="grid h-[21px] w-[21px] shrink-0 place-items-center rounded-full border border-white bg-[#488357]/[0.27] shadow-[0_1px_5px_rgba(31,71,45,0.1)] transition group-hover:scale-[1.12]">
              <i
                className={`h-2 w-2 rounded-full ${
                  spot.ochre
                    ? 'bg-[#bc8e4d] shadow-[0_0_0_3px_rgba(188,142,77,0.18)]'
                    : 'bg-[#4b8a5d] shadow-[0_0_0_3px_rgba(75,138,93,0.19)]'
                }`}
              />
            </span>
            <span className="block rounded-[3px] border border-[#c2d0be]/70 bg-white/[0.92] px-[7px] py-[5px] text-[9px] font-[740] text-[#344b3b] shadow-[0_2px_6px_rgba(43,70,46,0.08)] dark:border-[#3a4d40] dark:bg-[#1a261f]/95 dark:text-[#edf4ef]">
              {spot.city}
              <small className="mt-0.5 block text-[8px] font-medium text-[#758477] dark:text-[#b2beb5]">
                {spot.amount}
              </small>
            </span>
          </button>
        ))}
        <span className="absolute right-[15px] bottom-[13px] bg-white/80 px-2 py-1.5 text-[9px] text-[#647669] dark:bg-[#1a261f]/90 dark:text-[#b2beb5]">
          Illustrative supply map
        </span>
      </div>
    </div>
  )
}
