import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ArrowRight, MapPin } from 'lucide-react'
import { marketplaceLabel } from '../../utils/marketplace.ts'

interface SupplySpot {
  city: string
  lat: number
  lng: number
  amount: string
  ochre: boolean
}

const spots: SupplySpot[] = [
  { city: 'Rangpur', lat: 25.7439, lng: 89.2752, amount: '3 listings', ochre: false },
  { city: 'Dinajpur', lat: 25.6217, lng: 88.6354, amount: '2 listings', ochre: true },
  { city: 'Bogura', lat: 24.8465, lng: 89.3773, amount: '4 listings', ochre: false },
  { city: 'Rajshahi', lat: 24.3745, lng: 88.6042, amount: '2 listings', ochre: false },
  { city: 'Mymensingh', lat: 24.7471, lng: 90.4203, amount: '3 listings', ochre: true },
  { city: 'Gazipur', lat: 23.9999, lng: 90.4203, amount: '5 listings', ochre: false },
  { city: 'Cumilla', lat: 23.4607, lng: 91.1809, amount: '1 listing', ochre: true },
  { city: 'Jashore', lat: 23.1664, lng: 89.2081, amount: '2 listings', ochre: false },
]

function createPinIcon(spot: SupplySpot): L.DivIcon {
  const wrapper = document.createElement('div')
  wrapper.className = 'flex items-center gap-1.5 whitespace-nowrap'

  const dotOuter = document.createElement('span')
  dotOuter.className =
    'grid h-[21px] w-[21px] shrink-0 place-items-center rounded-full border border-white bg-sage-pin/30 shadow-[0_1px_5px_rgba(31,71,45,0.2)]'

  const dotInner = document.createElement('i')
  dotInner.className = `h-2 w-2 rounded-full ${spot.ochre ? 'bg-ochre-pin' : 'bg-sage-pin'}`
  dotOuter.appendChild(dotInner)

  const label = document.createElement('span')
  label.className =
    'block rounded-[3px] border border-line bg-surface/[0.94] px-[7px] py-[4px] text-[9px] font-[740] leading-tight text-ink shadow-[0_2px_6px_rgba(43,70,46,0.12)]'
  label.textContent = spot.city

  const count = document.createElement('small')
  count.className = 'block text-[8px] font-medium text-muted'
  count.textContent = spot.amount
  label.appendChild(count)

  wrapper.appendChild(dotOuter)
  wrapper.appendChild(label)

  return L.divIcon({
    html: wrapper,
    className: '!bg-transparent !border-0',
    iconSize: [110, 32],
    iconAnchor: [10, 16],
    popupAnchor: [0, -14],
  })
}

function createPopupContent(spot: SupplySpot, onBrowse: (city: string) => void): HTMLElement {
  const container = document.createElement('div')
  container.className = 'min-w-[155px] font-sans text-ink'

  const title = document.createElement('div')
  title.className = 'text-[12px] font-bold text-ink'
  title.textContent = `${spot.city} · ${spot.amount}`

  const coords = document.createElement('div')
  coords.className = 'mt-0.5 text-[10px] text-muted'
  coords.textContent = `${spot.lat.toFixed(4)}° N, ${spot.lng.toFixed(4)}° E`

  const action = document.createElement('button')
  action.type = 'button'
  action.className =
    'mt-2 inline-flex items-center gap-1 border-0 bg-transparent p-0 text-[11px] font-[680] text-link hover:text-link-hover cursor-pointer'
  action.textContent = 'View listings →'
  action.addEventListener('click', () => onBrowse(spot.city))

  container.appendChild(title)
  container.appendChild(coords)
  container.appendChild(action)
  return container
}

export default function SupplyMap() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = mapContainerRef.current
    if (!container) return

    const map = L.map(container, {
      center: [24.45, 89.85],
      zoom: 8,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      scrollWheelZoom: false,
      attributionControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map)

    for (const spot of spots) {
      const marker = L.marker([spot.lat, spot.lng], {
        icon: createPinIcon(spot),
        title: `${spot.city} · ${spot.amount}`,
      }).addTo(map)

      marker.bindPopup(() =>
        createPopupContent(spot, (city) => navigate(`/marketplace?q=${encodeURIComponent(city)}`)),
      )
    }

    return () => {
      map.remove()
    }
  }, [navigate])

  return (
    <div className="grid min-h-[405px] grid-cols-[35%_65%] overflow-hidden rounded-[5px] border border-line bg-surface-tint-soft max-md:grid-cols-1">
      <div className="flex flex-col items-start justify-center p-[39px] max-md:px-6 max-md:pt-6 max-md:pb-2">
        <span className="inline-flex items-center gap-[7px] text-[9px] font-[760] tracking-[0.11em] text-eyebrow">
          <MapPin size={15} /> SUPPLY AREAS
        </span>
        <h3 className="mt-[18px] mb-[9px] font-serif text-[29px] leading-[1.16] font-medium tracking-[-0.035em] text-ink max-md:mt-2.5 max-md:text-[24px]">
          Local by-products, across regions.
        </h3>
        <p className="m-0 text-[12px] leading-[1.7] text-muted max-md:text-[11px]">
          Explore regional collection areas and available material types.
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
      <div className="relative isolate z-0 min-h-[405px] overflow-hidden bg-surface-map max-md:min-h-[340px]">
        <div
          ref={mapContainerRef}
          className="h-full min-h-[405px] w-full max-md:min-h-[340px]"
          aria-label="OpenStreetMap showing supply areas in Bangladesh"
        />
      </div>
    </div>
  )
}
