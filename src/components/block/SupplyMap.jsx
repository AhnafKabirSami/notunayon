import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, MapPin } from 'lucide-react'
import { marketplaceLabel } from '../../utils/marketplace.js'

const spots = [
  { city: 'Rangpur', x: 52, y: 14, amount: '3 listings' },
  { city: 'Dinajpur', x: 37, y: 22, amount: '2 listings' },
  { city: 'Bogura', x: 48, y: 39, amount: '4 listings' },
  { city: 'Rajshahi', x: 25, y: 46, amount: '2 listings' },
  { city: 'Mymensingh', x: 67, y: 39, amount: '3 listings' },
  { city: 'Gazipur', x: 64, y: 54, amount: '5 listings' },
  { city: 'Cumilla', x: 85, y: 67, amount: '1 listing' },
  { city: 'Jashore', x: 32, y: 76, amount: '2 listings' },
]

export default function SupplyMap() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="supply-map-card">
      <div className="map-copy">
        <span className="map-label">
          <MapPin size={15} /> DEMONSTRATION SUPPLY AREAS
        </span>
        <h3>Local by-products, across regions.</h3>
        <p>Explore sample collection areas and material types. Locations and counts are illustrative.</p>
        <div className="map-legend">
          <span>
            <i className="legend-dot green" /> Farm supply
          </span>
          <span>
            <i className="legend-dot ochre" /> Mill & processing
          </span>
          <span>
            <i className="legend-dot sage" />{' '}
            {marketplaceLabel(t, 'Crop residues', { type: 'category' })}
          </span>
        </div>
        <Link to="/marketplace" className="text-link">
          Browse all locations <ArrowRight size={16} />
        </Link>
      </div>
      <div className="map-visual">
        <div className="map-grid" />
        <svg
          className="map-outline"
          viewBox="0 0 330 370"
          aria-label="Stylized map of Bangladesh"
          role="img"
        >
          <path
            d="M140 15 179 28 210 23 218 46 248 50 259 72 251 98 277 117 267 137 293 153 276 179 288 202 268 215 281 236 265 257 246 264 244 294 226 310 213 336 189 326 171 345 152 329 133 344 118 323 94 331 82 310 62 313 68 290 47 282 54 259 34 245 45 226 29 208 47 189 42 167 60 151 54 130 75 119 69 98 88 86 83 63 100 48 101 29 120 31Z"
            className="map-land"
          />
          <path
            d="M81 177 125 193 156 185 190 205 232 199 M113 88 138 122 131 155 M169 45 175 91 199 119 191 152 216 177 M72 250 119 258 157 239 192 254 234 242"
            className="map-river"
          />
        </svg>
        {spots.map((spot, index) => (
          <button
            key={spot.city}
            className={`map-pin pin-${index}`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            title={`${spot.city} · ${spot.amount}`}
            onClick={() => navigate(`/marketplace?q=${encodeURIComponent(spot.city)}`)}
          >
            <span className="pin-dot">
              <i />
            </span>
            <span className="pin-label">
              {spot.city}
              <small>{spot.amount}</small>
            </span>
          </button>
        ))}
        <span className="map-demo-tag">Illustrative supply map</span>
      </div>
    </div>
  )
}
