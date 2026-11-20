export const formatPrice = (price, unit = 'kg') => `৳${Number(price).toLocaleString('en-BD')} / ${unit}`

export const filterListings = (listings, query = '') => {
  const normalized = query.toLowerCase().replace(/[৳,]/g, ' ')
  const priceMatch = normalized.match(/(?:under|below|less than)\s*(\d+(?:\.\d+)?)/)
  const quantityMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(mt|tonnes?|kg)\b/)
  const priceLimit = priceMatch ? Number(priceMatch[1]) : null
  const quantity = quantityMatch ? Number(quantityMatch[1]) : null
  const quantityUnit = quantityMatch?.[2]
  const terms = normalized.replace(/(?:under|below|less than)\s*\d+(?:\.\d+)?\s*(?:\/\s*kg)?/g, ' ')
    .replace(/\d+(?:\.\d+)?\s*(?:mt|tonnes?|kg)\b/g, ' ')
    .split(/[\s/]+/).filter(Boolean)
  return listings.filter((listing) => {
    if (listing.paused) return false
    const text = `${listing.name} ${listing.category} ${listing.location} ${listing.seller} ${listing.condition} ${listing.description}`.toLowerCase()
    const locationTerms = normalized.match(/(?:near|in)\s+([a-z]+(?:\s+[a-z]+)?)/)
    const locationMatches = !locationTerms || listing.location.toLowerCase().includes(locationTerms[1].trim())
    const quantityInMt = quantity === null ? null : quantityUnit === 'kg' ? quantity / 1000 : quantity
    return terms.every((term) => {
      if (['near', 'in', 'available', 'less', 'than'].includes(term)) return true
      if (term === 'cow' || term === 'cows') return text.includes('cattle')
      if (term === 'manure' && text.includes('cattle')) return true
      return text.includes(term)
    }) && locationMatches && (priceLimit === null || listing.price <= priceLimit) && (quantityInMt === null || listing.quantity >= quantityInMt)
  })
}
