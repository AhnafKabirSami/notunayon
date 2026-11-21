import { filterListings, formatPrice } from '../../utils.js'

const materialGuidance = [
  {
    keywords: ['rice husk', 'rice hull', 'husk'],
    response: 'Rice husk is a rice-milling by-product that can be useful as a biomass, bedding, or processing input depending on a buyer’s needs. Check the listing details and discuss handling directly with the supplier.',
  },
  {
    keywords: ['cattle manure', 'cow manure', 'cow dung', 'manure'],
    response: 'Cattle manure is commonly sought as an input for composting and soil improvement. If you’re selling, describe its condition, available quantity, collection location, and supply schedule in your listing.',
  },
  {
    keywords: ['poultry litter', 'chicken litter', 'poultry waste'],
    response: 'Poultry litter is a farm by-product that buyers may source for composting or other agricultural uses. Its condition and handling can vary, so review supplier details and agree on collection requirements before arranging a purchase.',
  },
  {
    keywords: ['rice straw', 'paddy straw', 'straw'],
    response: 'Rice straw is a seasonal crop residue that may suit uses such as feed, bedding, or biomass, depending on its condition and the buyer’s requirements. Listings can note whether it is loose, baled, or dry.',
  },
  {
    keywords: ['coconut husk', 'coconut coir', 'coconut fibre'],
    response: 'Coconut husk can be a source of natural fibre and other processing materials. Check whether a listing is raw or sorted, and confirm the quantity and collection arrangements with the supplier.',
  },
]

const normalize = (value) => value.toLowerCase().replace(/[^\p{L}\p{N}\s৳]/gu, ' ').replace(/\s+/g, ' ').trim()
const containsAny = (text, words) => words.some((word) => text.includes(word))

function supplierResponse(question, listings) {
  const searchTerms = question
    .replace(/\b(find|show|search|look(?:ing)?|for|me|some|suppliers?|seller|sellers|available|near|around|in|at|where|can i|get|source|material|materials|please|listings?)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const matches = filterListings(listings, searchTerms || question).slice(0, 3)

  if (!matches.length) {
    return {
      text: 'I couldn’t find a close match in the current sample listings. Try a material name or district, or open the marketplace to browse all demonstration supply.',
      links: [{ label: 'Browse marketplace', href: '/marketplace' }],
    }
  }

  return {
    text: `Here ${matches.length === 1 ? 'is a sample listing' : 'are sample listings'} that may fit. These are demonstration records, so confirm supply and terms directly with the seller.`,
    links: matches.map((listing) => ({
      label: `${listing.name} · ${listing.location} · ${formatPrice(listing.price, listing.unit)} · ${listing.quantity} ${listing.quantityUnit}`,
      href: `/marketplace/${listing.id}`,
    })),
  }
}

export function getDemoResponse(message, listings) {
  const question = normalize(message)

  if (containsAny(question, ['find', 'supplier', 'suppliers', 'where can i', 'available near', 'looking for', 'search'])) {
    return supplierResponse(question, listings)
  }

  if (containsAny(question, ['sell', 'selling', 'list', 'producer', 'by product', 'byproduct'])) {
    const material = materialGuidance.find(({ keywords }) => containsAny(question, keywords))
    const materialAdvice = material
      ? ` For ${material.keywords[0]}, include whether it is raw, dried, or composted, along with quantity and pickup location.`
      : ''
    return {
      text: `To sell an agricultural by-product, create a seller demo profile and add a listing with the material, quantity and unit, price, condition, availability, and location.${materialAdvice} Listings in this prototype stay in your browser.`,
      links: [{ label: 'Create a seller profile', href: '/register' }, { label: 'How listing works', href: '/how-it-works' }],
    }
  }

  const material = materialGuidance.find(({ keywords }) => containsAny(question, keywords))
  if (material) {
    const listing = filterListings(listings, material.keywords[0])[0]
    return {
      text: material.response,
      links: listing
        ? [{ label: `See ${listing.name} in ${listing.location}`, href: `/marketplace/${listing.id}` }]
        : [{ label: 'Browse marketplace', href: '/marketplace' }],
    }
  }

  if (containsAny(question, ['offer', 'make an offer', 'negotiate', 'contact seller'])) {
    return {
      text: 'Open a material listing and choose “Make an offer” to enter a price, quantity, and message. This frontend demo records the offer locally; it does not contact a seller or process a transaction.',
      links: [{ label: 'Browse materials', href: '/marketplace' }],
    }
  }

  if (containsAny(question, ['marketplace', 'navigate', 'browse', 'page', 'website'])) {
    return {
      text: 'You can browse materials, open a listing for details, explore current buyer requests, or learn how the marketplace works. All listings and request details are illustrative.',
      links: [
        { label: 'Browse materials', href: '/marketplace' },
        { label: 'Buyer requests', href: '/requests' },
        { label: 'How it works', href: '/how-it-works' },
      ],
    }
  }

  if (containsAny(question, ['notunayon', 'purpose', 'what do you do', 'what is this', 'how does it work', 'how it works'])) {
    return {
      text: 'Notunayon is a marketplace concept that helps agricultural producers and businesses discover potential uses for by-products. The prototype demonstrates local listings, buyer requests, and supplier conversations for Bangladesh.',
      links: [{ label: 'About Notunayon', href: '/about' }, { label: 'How it works', href: '/how-it-works' }],
    }
  }

  return {
    text: 'I’m Notu AI, a frontend demonstration assistant. I can help with sample material listings, selling by-products, offers, and navigating Notunayon. Try a suggested question or ask about a material and location.',
    links: [{ label: 'Browse marketplace', href: '/marketplace' }],
  }
}
