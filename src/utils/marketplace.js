import { listingsSeed, offersSeed, requestsSeed, transactionsSeed } from '../data/mockData.js'

const demoProductNamesById = Object.fromEntries([
  ...listingsSeed.map(({ id, name }) => [id, name]),
  ...requestsSeed.map(({ id, material }) => [id, material]),
  ...offersSeed.map(({ id, material }) => [id, material]),
  ...transactionsSeed.map(({ id, material }) => [id, material]),
])

export const photo = (id, width = 900) =>
  `https://images.unsplash.com/${id.startsWith('photo-') ? id : `photo-${id}`}?auto=format&fit=crop&w=${width}&q=82`

export function marketplaceLabel(t, value, { type = 'product', id, fixed = false } = {}) {
  if (type === 'category') return t(`marketplace.categories.${value}`, { defaultValue: value })
  const seededName = id ? demoProductNamesById[id] : undefined
  const productName = fixed ? value : seededName === value ? seededName : null
  return productName ? t(`marketplace.products.${productName}`, { defaultValue: value }) : value
}
