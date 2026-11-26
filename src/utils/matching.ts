import { recommendationsSeed } from '../data/mockData.ts'
import type { Listing, MatchResult } from '../types/index.ts'

export const demoMatchWeights = {
  material: 0.35,
  location: 0.25,
  quantity: 0.2,
  price: 0.15,
  condition: 0.05,
} as const

type MatchFactor = keyof typeof demoMatchWeights

const demoDistances: Record<string, number> = {
  Rajshahi: 250,
  Gazipur: 18,
  Dinajpur: 310,
  Bogura: 185,
}

const matchRequest = {
  material: 'rice husk',
  acceptableCategories: ['Rice by-products', 'Crop residues'],
  minimumQuantity: 1,
  targetQuantity: 5,
  maxPrice: 24,
  location: 'Gazipur',
}

export function calculateDemoMatches(listings: Listing[]): MatchResult[] {
  return recommendationsSeed
    .map(({ listingId }) => listings.find((listing) => listing.id === listingId))
    .filter(
      (listing): listing is Listing =>
        Boolean(listing) &&
        !listing!.paused &&
        matchRequest.acceptableCategories.includes(listing!.category) &&
        listing!.quantity >= matchRequest.minimumQuantity,
    )
    .map((listing) => {
      const exactMaterial = listing.name.toLowerCase().includes(matchRequest.material)
      const distance = demoDistances[listing.location] ?? 250
      const quantityScore = listing.quantity <= matchRequest.targetQuantity ? 100 : 75
      const priceScore =
        listing.price <= matchRequest.maxPrice
          ? 100
          : Math.max(0, 100 - ((listing.price - matchRequest.maxPrice) / matchRequest.maxPrice) * 100)
      const conditionScore = /dry|baled/i.test(listing.condition) ? 100 : 55
      const scores: Record<MatchFactor, number> = {
        material: exactMaterial ? 100 : listing.category === 'Rice by-products' ? 78 : 58,
        location: Math.max(0, 100 - distance / 6),
        quantity: quantityScore,
        price: priceScore,
        condition: conditionScore,
      }
      const score = Math.round(
        (Object.entries(demoMatchWeights) as Array<[MatchFactor, number]>).reduce(
          (total, [factor, weight]) => total + scores[factor] * weight,
          0,
        ),
      )
      const reasons = [
        exactMaterial
          ? 'Exact material match'
          : listing.category === 'Rice by-products'
            ? 'Related rice by-product'
            : 'Related crop-residue category',
        distance < 50 ? 'Near delivery location' : 'Regional sourcing option',
        quantityScore === 100 ? 'Available quantity fits target' : 'Larger volume available',
        priceScore === 100 ? 'Within target price' : 'Price needs discussion',
        conditionScore === 100 ? 'Dry condition listed' : 'Condition to confirm',
      ]
      return { listing, distance: `${distance} km`, score, reasons }
    })
    .sort((a, b) => b.score - a.score)
}
