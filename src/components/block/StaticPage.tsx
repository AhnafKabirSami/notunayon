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
    <main className="page-main static-page">
      <div className="static-hero container">
        <div className="static-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className="static-image">
          <img
            src={photo(image, 1200)}
            alt="Bangladesh agriculture and natural resources"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <span>Notunayon · Demo prototype</span>
        </div>
      </div>
      <div className="container static-content">{children}</div>
    </main>
  )
}
