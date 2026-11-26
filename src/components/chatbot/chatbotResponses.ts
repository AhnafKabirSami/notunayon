import type { ChatbotReply, ChatLanguage, ChatLink, ConversationContext, Listing } from '../../types/index.ts'
import { formatPrice } from '../../utils.ts'
import { findAgriculturalKnowledge } from './agriculturalKnowledge.ts'
import { mergeConversationContext } from './conversationContext.ts'
import { detectLanguage } from './language.ts'

const normalize = (value: string): string =>
  String(value || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s৳]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const containsAny = (text: string, words: string[]): boolean =>
  words.some((word) => text.includes(word))

function listingMatches(
  listings: Listing[],
  material: string | null,
  location: string | null,
  priceLimit: number | null,
  quantity: string | null,
): Listing[] {
  let matches = listings.filter((listing) => !listing.paused)
  if (material) {
    const materialText = normalize(
      `${material} ${material === 'Cattle manure' ? 'cow dung gobor' : ''}`,
    )
    matches = matches.filter((listing) => {
      const listingText = normalize(`${listing.name} ${listing.category} ${listing.description}`)
      return (
        normalize(material)
          .split(' ')
          .some((term) => listingText.includes(term)) ||
        materialText
          .split(' ')
          .some((term) => term.length > 3 && listingText.includes(term))
      )
    })
  }
  if (location) {
    const englishLocation =
      location === 'রাজশাহী'
        ? 'Rajshahi'
        : location === 'বগুড়া'
          ? 'Bogura'
          : location === 'রংপুর'
            ? 'Rangpur'
            : location === 'দিনাজপুর'
              ? 'Dinajpur'
              : location === 'ময়মনসিংহ'
                ? 'Mymensingh'
                : location === 'গাজীপুর'
                  ? 'Gazipur'
                  : location === 'কুমিল্লা'
                    ? 'Cumilla'
                    : location === 'যশোর'
                      ? 'Jashore'
                      : location === 'নাটোর'
                        ? 'Natore'
                        : location === 'ঢাকা'
                          ? 'Dhaka'
                          : location === 'কুষ্টিয়া'
                            ? 'Kushtia'
                            : location
    matches = matches.filter(
      (listing) => normalize(listing.location) === normalize(englishLocation),
    )
  }
  if (priceLimit) matches = matches.filter((listing) => Number(listing.price) <= priceLimit)
  if (quantity) {
    const quantityMatch = quantity.match(/(\d+(?:\.\d+)?)\s*(mt|tonnes?|tons?|ton|kg|কেজি|টন)/i)
    if (quantityMatch) {
      const amount = Number(quantityMatch[1])
      const unit = quantityMatch[2].toLowerCase()
      const requestedMt = ['mt', 'tonne', 'tonnes', 'ton', 'টন'].includes(unit)
        ? amount
        : amount / 1000
      const listingMt = (listing: Listing) =>
        listing.quantityUnit?.toLowerCase() === 'kg'
          ? Number(listing.quantity) / 1000
          : Number(listing.quantity)
      matches = matches.filter((listing) => listingMt(listing) >= requestedMt)
    }
  }
  return matches
}

function marketplaceSearch(
  listings: Listing[],
  context: ConversationContext,
  language: ChatLanguage,
): { text: string; links: ChatLink[] } | null {
  if (!context.material) return null

  const matches = listingMatches(
    listings,
    context.material,
    context.location,
    context.priceLimit,
    context.quantity,
  )
  const locationText = context.location ? ` in ${context.location}` : ''
  const quantityText = context.quantity ? ` for approximately ${context.quantity}` : ''

  if (!matches.length) {
    if (language === 'bn') {
      return {
        text: `বর্তমান মার্কেটপ্লেস তালিকা${locationText}-এ ${context.material}-এর কোনো মিল পাওয়া যায়নি।`,
        links: [{ label: 'মার্কেটপ্লেস দেখুন', href: '/marketplace' }],
      }
    }
    if (language === 'bn-en') {
      return {
        text: `Current marketplace listings-e ${context.material}${locationText}${quantityText} er matching listing ekhon pawa jayni.`,
        links: [{ label: 'Browse marketplace', href: '/marketplace' }],
      }
    }
    return {
      text: `I couldn't find a matching ${context.material} listing${locationText}${quantityText} in the current marketplace listings.`,
      links: [{ label: 'Browse marketplace', href: '/marketplace' }],
    }
  }

  const resultLinks = matches.slice(0, 3).map((listing) => ({
    label: `${listing.name} · ${listing.location} · ${formatPrice(listing.price, listing.unit)} · ${listing.quantity} ${listing.quantityUnit}`,
    href: `/marketplace/${listing.id}`,
  }))

  if (language === 'bn') {
    return {
      text: `মার্কেটপ্লেসে ${context.material}${locationText}-এর জন্য ${matches.length === 1 ? 'একটি মিল পাওয়া গেছে' : `${matches.length}টি মিল পাওয়া গেছে`}। বিস্তারিত পরিমাণ ও দাম নিচের তালিকায় দেখুন:`,
      links: resultLinks,
    }
  }
  if (language === 'bn-en') {
    return {
      text: `Marketplace-e ${context.material}${locationText}${quantityText} er jonno ${matches.length === 1 ? 'ekti' : `${matches.length}ti`} matching listing pawa geche. Niche quantity ebong listed price dekhte paren:`,
      links: resultLinks,
    }
  }
  return {
    text: `I found ${matches.length === 1 ? 'a matching listing' : `${matches.length} matching listings`} for ${context.material}${locationText}${quantityText}. See available quantities and listed prices below:`,
    links: resultLinks,
  }
}

function contextAwareResponse(
  message: string,
  context: ConversationContext,
  listings: Listing[],
  language: ChatLanguage,
): { text: string; links: ChatLink[] } | null {
  const lower = normalize(message)
  const askingQuantity = containsAny(lower, ['how much', 'cost', 'price', 'কত', 'দাম', 'kichu'])
  const askingAvailability = containsAny(lower, [
    'available',
    'availability',
    'find',
    'search',
    'supplier',
    'suppliers',
    'stock',
    'looking for',
    'pawa jabe',
    'ache',
    'pawa jay',
    'খুঁজ',
    'পাওয়া',
    'পাব',
    'পাওয়া যাবে',
    'উপলব্ধ',
    'আছে',
    'যাবে',
  ])

  if (askingQuantity && context.material) {
    const matches = listingMatches(
      listings,
      context.material,
      context.location,
      context.priceLimit,
      context.quantity,
    )
    if (matches.length) {
      const priceLines = matches
        .slice(0, 3)
        .map(
          (listing) =>
            `${listing.name}: ${formatPrice(listing.price, listing.unit)} (${listing.quantity} ${listing.quantityUnit})`,
        )
      if (language === 'bn') {
        return {
          text: `মার্কেটপ্লেসে ${context.material}-এর তালিকাভুক্ত দাম:\n${priceLines.join('\n')}\nবিক্রেতার সঙ্গে সরাসরি আলোচনা সাপেক্ষে দাম নির্ধারিত হয়।`,
          links: matches.slice(0, 3).map((listing) => ({
            label: `Listing · ${listing.location}`,
            href: `/marketplace/${listing.id}`,
          })),
        }
      }
      if (language === 'bn-en') {
        return {
          text: `Marketplace-e ${context.material}-er listed price:\n${priceLines.join('\n')}\nSeller-er sathe kotha bole final dam thik kora jabe.`,
          links: matches.slice(0, 3).map((listing) => ({
            label: `Listing · ${listing.location}`,
            href: `/marketplace/${listing.id}`,
          })),
        }
      }
      return {
        text: `Current marketplace listings show these prices for ${context.material}:\n${priceLines.join('\n')}\nFinal terms can be confirmed directly with the seller.`,
        links: matches.slice(0, 3).map((listing) => ({
          label: `Listing · ${listing.location}`,
          href: `/marketplace/${listing.id}`,
        })),
      }
    }
    return {
      text:
        language === 'bn'
          ? `এই মুহূর্তে মার্কেটপ্লেসে ${context.material}-এর জন্য কোনো মিল পাওয়া যায়নি।`
          : `There is no active listing for ${context.material} right now. You can browse other categories or post a buyer request.`,
      links: [{ label: 'Browse marketplace', href: '/marketplace' }],
    }
  }

  if (askingAvailability && context.material) return marketplaceSearch(listings, context, language)
  return null
}

export function getDemoResponse(
  message: string,
  listings: Listing[],
  previousContext: Partial<ConversationContext> = {},
): ChatbotReply {
  const raw = String(message || '').trim()
  const detected = detectLanguage(raw, previousContext.language)
  const language: ChatLanguage =
    detected === 'bn' ? 'bn' : previousContext.language === 'bn' ? 'bn' : detected
  const context = mergeConversationContext(previousContext, raw, detected)
  const lower = normalize(raw)

  if (!raw || lower.length < 2) {
    return {
      text:
        language === 'bn'
          ? 'আপনার বার্তাটি একটু পরিষ্কার করে লিখুন। আমি ঠিক বুঝতে পারছি না।'
          : 'Could you add a little more detail? I’m not sure what you mean yet.',
      context,
    }
  }
  if (containsAny(lower, ['asdfgh', 'qwerty', 'random', 'blah', 'test test'])) {
    return { text: 'I couldn’t understand that as a clear question. Could you rephrase it?', context }
  }

  if (containsAny(lower, ['idiot', 'stupid', 'shut up', 'hate you', 'boka', 'মূর্খ'])) {
    return {
      text:
        language === 'bn'
          ? 'আমরা কথা চালিয়ে যেতে পারি। আপনার প্রশ্নটি স্পষ্টভাবে লিখুন।'
          : 'I can keep the conversation respectful. Please tell me what you need help with.',
      context,
    }
  }

  if (containsAny(lower, ['tell me a joke', 'joke', 'funny', 'মজা'])) {
    return {
      text:
        language === 'bn'
          ? 'একটি ছোট জোক: চাষির গরু কেন কম্পিউটার কিনল? সোশ্যাল আগর—মানে, ফসলের আগাছার সঙ্গে তাল মিলাতে! 😉'
          : 'Why did the scarecrow get promoted? He was outstanding in his field.',
      context,
    }
  }

  if (
    /^(hi|hello|hey)(?:[!?.\s]|$)/.test(lower) ||
    containsAny(lower, ['good morning', 'good evening', 'kemon acho', 'kemon acen', 'hi tonu'])
  ) {
    return { text: language === 'bn' ? 'হাই! কেমন আছেন?' : 'Hey! How are you doing?', context }
  }

  if (containsAny(lower, ['how are you', 'kemon acho', 'kemon acen', 'কেমন আছেন'])) {
    return {
      text:
        language === 'bn'
          ? 'আমি ভালো আছি, ধন্যবাদ। আজ আপনি কিভাবে সাহায্য চান?'
          : 'I’m doing well, thanks. What would you like to talk about?',
      context,
    }
  }

  if (containsAny(lower, ['thanks', 'thank you', 'dhonnobad', 'ধন্যবাদ'])) {
    return { text: language === 'bn' ? 'আপনাকেও ধন্যবাদ।' : 'You’re welcome!', context }
  }

  if (/^(okay|ok|alright|ঠিক আছে|আচ্ছা|okay tonu)\.?$/.test(lower)) {
    return {
      text:
        language === 'bn'
          ? 'আচ্ছা! লাগলে আবার বলুন।'
          : 'Alright! Let me know if you need anything.',
      context,
    }
  }

  if (containsAny(lower, ['what are you doing', 'ki korcho', 'কি করছ'])) {
    return {
      text:
        language === 'bn'
          ? 'আমি আপনার সঙ্গে কথা বলছি এবং উপযুক্তভাবে সাহায্য করার চেষ্টা করছি।'
          : 'I’m here chatting with you. What would you like to talk about?',
      context,
    }
  }

  if (containsAny(lower, ['what is tonu ai', 'who are you', 'tonu ai', 'tonu'])) {
    return {
      text:
        language === 'bn'
          ? 'আমি তনু AI, Notunayon-এর মার্কেটপ্লেস সহকারী। আমি আপনাকে কৃষিজ উপ-বর্জ্য খুঁজে পেতে, দাম ও উপলব্ধতা জানতে এবং সাইটে নেভিগেট করতে সাহায্য করি।'
          : 'I’m Tonu AI, Notunayon’s marketplace assistant. I can help you find agricultural by-products, check availability and listed prices, and navigate the platform.',
      context,
    }
  }

  if (containsAny(lower, ['capital of france', 'france capital'])) {
    return { text: 'Paris is the capital of France.', context }
  }
  if (containsAny(lower, ['weather', 'temperature', 'forecast', 'বৃষ্টি', 'আবহাওয়া'])) {
    return {
      text:
        language === 'bn'
          ? 'আমি মার্কেটপ্লেস সংক্রান্ত প্রশ্নে সাহায্য করতে পারি; লাইভ আবহাওয়া তথ্য আমার কাছে নেই।'
          : 'I don’t have access to live weather forecasts right now, though I can help you find materials and suppliers.',
      context,
    }
  }

  if (
    containsAny(lower, [
      'what is notunayon',
      'tell me about notunayon',
      'notunayon কি',
      'notunayon purpose',
      'how does notunayon work',
      'how it works',
    ])
  ) {
    return {
      text:
        language === 'bn'
          ? 'Notunayon একটি কৃষি উপকরণ ও উপ-বর্জ্য মার্কেটপ্লেস। এটি উৎপাদকদের তালিকা এবং ক্রেতাদের প্রয়োজনকে একত্রিত করে ফসলজ উপাদানের পুনর্ব্যবহার সহজ করে।'
          : 'Notunayon is an agricultural by-product marketplace that connects producers with businesses looking for reusable agricultural materials across Bangladesh.',
      links: [
        { label: 'About Notunayon', href: '/about' },
        { label: 'How it works', href: '/how-it-works' },
      ],
      context,
    }
  }

  const contextual = contextAwareResponse(raw, context, listings, language)
  if (contextual) return { ...contextual, context }

  if (
    context.material &&
    containsAny(String(raw).toLowerCase(), [
      'available',
      'availability',
      'find',
      'search',
      'supplier',
      'stock',
      'looking for',
      'pawa',
      'ache',
      'পাওয়া',
      'পাব',
      'উপলব্ধ',
      'আছে',
      'যাবে',
    ])
  ) {
    const availability = marketplaceSearch(listings, context, language)
    if (availability) return { ...availability, context }
  }

  if (context.material && containsAny(lower, ['i need', 'looking for', 'want', 'chai', 'dorkar'])) {
    if (!containsAny(lower, ['available', 'availability', 'supplier', 'পাওয়া', 'উপলব্ধ'])) {
      return {
        text:
          language === 'bn'
            ? `আপনার প্রয়োজন বোঝা যাচ্ছে: ${context.quantity ? `${context.quantity} ` : ''}${context.material}। ${context.location ? 'কোন নির্দিষ্ট অবস্থা বা প্রয়োগ আছে?' : 'কোন জায়গার কাছাকাছি খুঁজছেন?'}`
            : `Got it — you need ${context.quantity ? `${context.quantity} of ` : ''}${context.material}. ${context.location ? 'Is there a preferred condition or application?' : 'Which location should I search near?'}`,
        context,
      }
    }
  }

  if (
    context.quantity &&
    !context.material &&
    containsAny(lower, ['tonne', 'tonnes', 'ton', 'mt', 'kg', 'টন', 'কেজি'])
  ) {
    return {
      text:
        language === 'bn'
          ? `পরিমাণটি বোঝা গেছে: ${context.quantity}। কোন উপাদানটি প্রয়োজন?`
          : `Got it, around ${context.quantity}. Which material are you looking for?`,
      context,
    }
  }

  if (
    context.quantity &&
    context.material &&
    /\b\d+(?:\.\d+)?\b/.test(lower) &&
    containsAny(lower, ['tonne', 'tonnes', 'ton', 'mt', 'kg', 'টন', 'কেজি'])
  ) {
    return {
      text:
        language === 'bn'
          ? `পরিমাণটা বুঝেছি: প্রায় ${context.quantity} ${context.material}। কোন জায়গার কাছাকাছি খুঁজতে চান?`
          : `Understood — you’re looking for around ${context.quantity} of ${context.material}. Which location should I search near?`,
      context,
    }
  }

  const knowledge = findAgriculturalKnowledge(raw)
  if (knowledge) {
    const askingUse = containsAny(lower, ['used for', 'use', 'uses', 'application', 'ব্যবহার', 'কাজে'])
    const heading = knowledge.name
    if (language === 'bn') {
      return {
        text: `${knowledge.bnName} কী এবং এটি কীভাবে ব্যবহৃত হয়?\n${knowledge.bnExplanation}${askingUse ? '\nমূল ব্যবহার: নিরাপদ প্রক্রিয়াকরণ, মাটির উন্নয়ন বা নির্দিষ্ট শিল্প প্রয়োজনে ব্যবহার। সঠিক উপযোগিতা অবশ্যই গুণগত মান ও পরিবেশ দেখে নির্ধারণ করতে হবে।' : ''}`,
        links: [{ label: `${context.location || 'মার্কেটপ্লেস'}ে তালিকা দেখুন`, href: '/marketplace' }],
        context,
      }
    }
    if (language === 'bn-en') {
      return {
        text: `${knowledge.name}\n${knowledge.explanation}\nBanglish-e summary: Safe composting/processing ebong moisture, contamination, intended application check na kore use suggestion dewa thik noy.`,
        links: [{ label: `Browse ${heading} listings`, href: '/marketplace' }],
        context,
      }
    }
    return {
      text: `${heading}\n${knowledge.explanation}`,
      links: [{ label: `Browse ${heading} listings`, href: '/marketplace' }],
      context,
    }
  }

  if (containsAny(lower, ['sell', 'selling', 'list', 'পণ্য বিক্রি', 'বিক্রি'])) {
    const materialText = context.material
      ? ` For ${context.material}, include whether it is raw, dried, composted, or processed.`
      : ''
    return {
      text:
        language === 'bn'
          ? `বিক্রি করতে চাইলে seller অ্যাকাউন্ট তৈরি করে উপাদান, পরিমাণ, একক, দাম, অবস্থা, অবস্থান ও উপলব্ধতার তথ্য দিন।${context.material ? ` ${context.material}-এর জন্য পরিচ্ছন্নতা ও সংরক্ষণ সম্পর্কিত তথ্যও দিন।` : ''}`
          : `To sell an agricultural by-product, create a seller account and add a listing with the material, quantity and unit, price, condition, availability, and location.${materialText}`,
      links: [
        { label: 'Create a seller account', href: '/register' },
        { label: 'How listing works', href: '/how-it-works' },
      ],
      context,
    }
  }

  if (containsAny(lower, ['offer', 'make an offer', 'negotiate', 'অফার'])) {
    return {
      text:
        language === 'bn'
          ? 'যেকোনো উপকরণের তালিকা খুলে “Make an offer” বেছে দাম, পরিমাণ এবং বার্তা পাঠান।'
          : 'Open a material listing and choose “Make an offer” to enter your proposed price, quantity, and message for the seller.',
      links: [{ label: 'Browse materials', href: '/marketplace' }],
      context,
    }
  }

  if (containsAny(lower, ['marketplace', 'browse', 'navigate', 'page', 'মার্কেটপ্লেস', 'পেজ'])) {
    return {
      text:
        language === 'bn'
          ? 'মার্কেটপ্লেস থেকে উপাদান দেখুন, লিস্টিংয়ের বিস্তারিত পড়ুন, buyer requests দেখুন বা কীভাবে কাজ করে তা জানুন।'
          : 'You can browse materials, open a listing for full details, explore buyer requests, or learn how the marketplace works.',
      links: [
        { label: 'Browse materials', href: '/marketplace' },
        { label: 'Buyer requests', href: '/requests' },
        { label: 'How it works', href: '/how-it-works' },
      ],
      context,
    }
  }

  if (containsAny(lower, ['where', 'what', 'who', 'why', 'which', 'কোথায়', 'কেন', 'কী'])) {
    return {
      text:
        language === 'bn'
          ? 'আমি মার্কেটপ্লেসের উপাদান, অবস্থান, দাম বা ব্যবহারের বিষয়গুলোতে সবচেয়ে ভালো সাহায্য করতে পারি। অনুগ্রহ করে আরও নির্দিষ্ট প্রশ্ন করুন।'
          : 'I can help best with questions about agricultural materials, locations, pricing, or marketplace tasks. Could you ask more specifically?',
      context,
    }
  }

  return {
    text:
      language === 'bn'
        ? 'আপনি কী জানতে চেয়েছেন তা একটু ভিন্নভাবে বলুন। আমি উপাদান, দাম ও উপলব্ধ লিস্টিং এবং Notunayon নেভিগেশন সম্পর্কে সহায়তা করতে পারি।'
        : 'Could you rephrase that? I can help with agricultural materials, listing availability and prices, selling by-products, offers, and marketplace navigation.',
    context,
  }
}
