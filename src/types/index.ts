export type Language = 'en' | 'bn'
export type ChatLanguage = Language | 'bn-en'
export type Theme = 'light' | 'dark'
export type UserRole = 'buyer' | 'seller'
export type DashboardRole = UserRole | 'admin'

export interface DemoUser {
  name: string
  type: UserRole
}

export interface Listing {
  id: string
  name: string
  category: string
  price: number
  unit: string
  quantity: number
  quantityUnit: string
  seller: string
  location: string
  condition: string
  availability: string
  frequency: string
  minimum: number
  description: string
  image: string
  color: string
  tags: string[]
  paused?: boolean
}

export interface BuyerRequest {
  id: string
  material: string
  category: string
  quantity: string
  location: string
  budget: string
  buyer: string
  date: string
  condition: string
  deliveryDate?: string
  requirements?: string
}

export type OfferStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Countered'

export interface Offer {
  id: string
  buyer: string
  material: string
  price: number
  quantity: string
  message: string
  date: string
  status: OfferStatus
}

export interface TransactionRecord {
  id: string
  buyer: string
  material: string
  quantity: string
  amount: string
  date: string
  status: string
}

export interface SeedUser {
  name: string
  type: string
  location: string
  status: string
}

export interface MatchResult {
  listing: Listing
  distance: string
  score: number
  reasons: string[]
}

export interface ChatLink {
  label: string
  href: string
}

export interface ChatMessageItem {
  id: string
  role: 'user' | 'assistant'
  text: string
  links?: ChatLink[]
  timestamp: string
}

export interface ConversationContext {
  material: string | null
  quantity: string | null
  location: string | null
  priceLimit: number | null
  application: string | null
  language: ChatLanguage
}

export interface ChatbotReply {
  text: string
  links?: ChatLink[]
  context: ConversationContext
}
