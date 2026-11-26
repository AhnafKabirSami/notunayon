import type { TFunction } from 'i18next'
import { listingsSeed, offersSeed, requestsSeed, transactionsSeed } from '../data/mockData.ts'

const demoProductNamesById: Record<string, string> = Object.fromEntries([
  ...listingsSeed.map(({ id, name }) => [id, name]),
  ...requestsSeed.map(({ id, material }) => [id, material]),
  ...offersSeed.map(({ id, material }) => [id, material]),
  ...transactionsSeed.map(({ id, material }) => [id, material]),
])

export const photo = (id: string, width = 900): string =>
  `https://images.unsplash.com/${id.startsWith('photo-') ? id : `photo-${id}`}?auto=format&fit=crop&w=${width}&q=82`

interface MarketplaceLabelOptions {
  type?: 'product' | 'category'
  id?: string
  fixed?: boolean
}

export function marketplaceLabel(
  t: TFunction,
  value: string,
  { type = 'product', id, fixed = false }: MarketplaceLabelOptions = {},
): string {
  if (type === 'category') return t(`marketplace.categories.${value}`, { defaultValue: value })
  const seededName = id ? demoProductNamesById[id] : undefined
  const productName = fixed ? value : seededName === value ? seededName : null
  return productName ? t(`marketplace.products.${productName}`, { defaultValue: value }) : value
}
