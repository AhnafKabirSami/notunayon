const locations = ['Rajshahi', 'Bogura', 'Rangpur', 'Dinajpur', 'Mymensingh', 'Gazipur', 'Cumilla', 'Jashore', 'Natore', 'Dhaka', 'Kushtia', 'রাজশাহী', 'বগুড়া', 'রংপুর', 'দিনাজপুর', 'ময়মনসিংহ', 'গাজীপুর', 'কুমিল্লা', 'যশোর', 'নাটোর', 'ঢাকা', 'কুষ্টিয়া']

export function createConversationContext() {
  return { material: null, quantity: null, location: null, priceLimit: null, application: null, language: 'en' }
}

export function mergeConversationContext(previous = {}, message = '', detectedLanguage) {
  const context = { ...createConversationContext(), ...previous }
  const lower = String(message).toLowerCase()

  const materialPatterns = [
    ['Cattle manure', ['cattle manure', 'cow manure', 'cow dung', 'গোবর সার', 'gobor', 'গোবর']],
    ['Poultry litter', ['poultry litter', 'chicken litter', 'poultry waste', 'murgir litter', 'পোল্ট্রি লিটার']],
    ['Rice husk', ['rice husk', 'rice hull', 'dhaner tush', 'ধানের তুষ', 'ধানের তুষ']],
    ['Rice straw', ['rice straw', 'paddy straw', 'dhaner khor', 'ধানের খড়']],
    ['Wheat straw', ['wheat straw', 'gom er khor', 'গমের খড়']],
    ['Coconut husk', ['coconut husk', 'coconut coir', 'coconut fibre', 'নারকেল']],
    ['Fish Processing By-product', ['fish processing', 'fish by-product', 'fish waste', 'মাছের বর্জ্য']],
  ]
  for (const [name, aliases] of materialPatterns) {
    if (aliases.some((alias) => lower.includes(alias))) {
      context.material = name
      break
    }
  }

  for (const location of locations) {
    if (lower.includes(location.toLowerCase())) {
      context.location = location
      break
    }
  }

  const quantityMatch = lower.match(/(?:around|about|approximately|প্রায়|लगभग)?\s*(\d+(?:\.\d+)?)\s*(tonnes?|tons?|mt|ton|kg|কেজি|টন)\b/)
  if (quantityMatch) {
    context.quantity = `${quantityMatch[1]} ${quantityMatch[2]}`
  }

  const priceMatch = lower.match(/(?:under|below|less than|বরং কম|দামে কম)\s*(\d+(?:\.\d+)?)\s*(?:৳|taka|bdt|\/?kg)?/)
  if (priceMatch) context.priceLimit = Number(priceMatch[1])

  if (detectedLanguage) context.language = detectedLanguage
  return context
}
