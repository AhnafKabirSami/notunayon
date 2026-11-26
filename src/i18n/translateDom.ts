import type { Language } from '../types/index.ts'

const phrases: Array<[string, string]> = [
  ['Good morning, producer.', 'শুভ সকাল, উৎপাদক।'],
  ['Good morning, sourcing team.', 'শুভ সকাল, সংগ্রহ দল।'],
  ['Marketplace at a glance.', 'মার্কেটপ্লেস এক নজরে।'],
  ['Here’s an overview of your demo marketplace activity.', 'আপনার ডেমো মার্কেটপ্লেস কার্যকলাপের সংক্ষিপ্ত বিবরণ।'],
  ['Manage materials you’ve added to this demonstration marketplace.', 'এই ডেমো মার্কেটপ্লেসে আপনার যোগ করা উপকরণ পরিচালনা করুন।'],
  ['Offers received', 'প্রাপ্ত অফার'],
  ['Offers submitted through the demo marketplace will appear here.', 'ডেমো মার্কেটপ্লেসে পাঠানো অফার এখানে দেখা যাবে।'],
  ['A small interactive messaging demo. Messages stay in this page state only.', 'একটি ছোট ইন্টারঅ্যাক্টিভ বার্তা ডেমো। বার্তা শুধু এই পৃষ্ঠায় থাকবে।'],
  ['Write a demo message…', 'ডেমো বার্তা লিখুন…'],
  ['Send', 'পাঠান'],
  ['Today · demonstration thread', 'আজ · প্রদর্শনী বার্তা'],
  ['Basic information', 'মৌলিক তথ্য'],
  ['Demo user profile', 'ডেমো ব্যবহারকারী প্রোফাইল'],
  ['Full name', 'পূর্ণ নাম'],
  ['Business name', 'ব্যবসার নাম'],
  ['Email', 'ইমেইল'],
  ['Phone', 'ফোন'],
  ['Location', 'স্থান'],
  ['Business type', 'ব্যবসার ধরন'],
  ['Industry', 'শিল্প'],
  ['Save local changes', 'স্থানীয় পরিবর্তন সংরক্ষণ'],
  ['Profile updated in this local demo.', 'এই স্থানীয় ডেমোতে প্রোফাইল হালনাগাদ হয়েছে।'],
  ['Create listing', 'তালিকা তৈরি করুন'],
  ['Edit listing', 'তালিকা সম্পাদনা'],
  ['My listings', 'আমার তালিকা'],
  ['Material', 'উপকরণ'],
  ['Quantity', 'পরিমাণ'],
  ['Price', 'দাম'],
  ['Status', 'অবস্থা'],
  ['Actions', 'কর্ম'],
  ['Active', 'সক্রিয়'],
  ['Paused', 'স্থগিত'],
  ['Search my listings', 'আমার তালিকা খুঁজুন'],
  ['Recent offers', 'সাম্প্রতিক অফার'],
  ['Latest activity on your materials', 'আপনার উপকরণের সাম্প্রতিক কার্যকলাপ'],
  ['View all', 'সব দেখুন'],
  ['Listing performance', 'তালিকা কার্যকারিতা'],
  ['Views across the past seven days', 'গত সাত দিনের দর্শন'],
  ['DEMO', 'ডেমো'],
  ['Listing views', 'তালিকা দর্শন'],
  ['Quick actions', 'দ্রুত কাজ'],
  ['Keep your marketplace presence up to date.', 'আপনার মার্কেটপ্লেস উপস্থিতি হালনাগাদ রাখুন।'],
  ['Add a listing', 'তালিকা যোগ করুন'],
  ['Manage listings', 'তালিকা পরিচালনা'],
  ['Review offers', 'অফার যাচাই'],
  ['Create a listing', 'তালিকা তৈরি করুন'],
  ['Transactions', 'লেনদেন'],
  ['Analytics', 'পরিসংখ্যান'],
  ['Messages', 'বার্তা'],
  ['Profile', 'প্রোফাইল'],
  ['Overview', 'সারসংক্ষেপ'],
  ['Browse materials', 'উপকরণ দেখুন'],
  ['Post a requirement', 'প্রয়োজন পোস্ট করুন'],
  ['My offers', 'আমার অফার'],
  ['Purchase history', 'ক্রয় ইতিহাস'],
  ['AI recommendations', 'AI সুপারিশ'],
  ['Users', 'ব্যবহারকারী'],
  ['Business verification', 'ব্যবসা যাচাই'],
  ['Categories', 'বিভাগ'],
  ['Buyer requests', 'ক্রেতার প্রয়োজন'],
  ['Reports', 'রিপোর্ট'],
  ['Settings', 'সেটিংস'],
  ['Log out', 'প্রস্থান'],
  ['Back to public site', 'পাবলিক সাইটে ফিরুন'],
  ['Notifications', 'বিজ্ঞপ্তি'],
  ['Open dashboard menu', 'ড্যাশবোর্ড মেনু খুলুন'],
  ['Dismiss notice', 'বিজ্ঞপ্তি বন্ধ করুন'],
  ['Frontend demonstration', 'ফ্রন্টএন্ড ডেমো'],
  ['Post a sourcing requirement', 'একটি সংগ্রহ প্রয়োজন পোস্ট করুন'],
  ['Describe what you’re looking for to create a local demo buyer request.', 'স্থানীয় ডেমো ক্রেতা প্রয়োজন তৈরি করতে আপনি কী খুঁজছেন তা লিখুন।'],
  ['Requirement posted.', 'প্রয়োজন পোস্ট হয়েছে।'],
  ['Your request is now listed in the local buyer requests demo.', 'আপনার প্রয়োজন স্থানীয় ক্রেতা প্রয়োজন ডেমোতে যুক্ত হয়েছে।'],
  ['View buyer requests', 'ক্রেতার প্রয়োজন দেখুন'],
  ['Material required *', 'প্রয়োজনীয় উপকরণ *'],
  ['Quantity *', 'পরিমাণ *'],
  ['Target price (৳ / kg)', 'লক্ষ্য দাম (৳ / কেজি)'],
  ['Delivery location', 'ডেলিভারির স্থান'],
  ['Required condition', 'প্রয়োজনীয় অবস্থা'],
  ['Delivery date', 'ডেলিভারি তারিখ'],
  ['Additional requirements', 'অতিরিক্ত প্রয়োজন'],
  ['Post demo requirement', 'ডেমো প্রয়োজন পোস্ট করুন'],
  ['No offers yet', 'এখনও কোনো অফার নেই'],
  ['No requests found', 'কোনো প্রয়োজন পাওয়া যায়নি'],
  ['Try another material or location.', 'অন্য উপকরণ বা স্থান দিয়ে চেষ্টা করুন।'],
  ['Clear filters', 'ফিল্টার মুছুন'],
  ['No open reports', 'খোলা কোনো রিপোর্ট নেই'],
  ['This prototype has no submitted user reports.', 'এই প্রোটোটাইপে কোনো ব্যবহারকারী রিপোর্ট জমা হয়নি।'],
  ['Demo platform configuration', 'ডেমো প্ল্যাটফর্ম কনফিগারেশন'],
  ['Profile settings', 'প্রোফাইল সেটিংস'],
  ['Update a local demonstration profile. No data leaves this browser.', 'স্থানীয় ডেমো প্রোফাইল হালনাগাদ করুন। কোনো তথ্য ব্রাউজারের বাইরে যায় না।'],
  ['Make a clear listing', 'পরিষ্কার তালিকা তৈরি করুন'],
  ['Fields marked with * are required.', '* চিহ্নিত ঘরগুলো আবশ্যক।'],
  ['Material details', 'উপকরণের বিস্তারিত'],
  ['Material category *', 'উপকরণের বিভাগ *'],
  ['Material name *', 'উপকরণের নাম *'],
  ['Available quantity *', 'উপলব্ধ পরিমাণ *'],
  ['Listed price (৳) *', 'তালিকাভুক্ত দাম (৳) *'],
  ['Minimum order quantity (kg)', 'ন্যূনতম অর্ডার (কেজি)'],
  ['Upload an image from this device', 'এই ডিভাইস থেকে ছবি আপলোড করুন'],
  ['Image preview only; not uploaded to a server.', 'শুধু ছবি প্রিভিউ; সার্ভারে আপলোড হচ্ছে না।'],
  ['Publish demo listing', 'ডেমো তালিকা প্রকাশ করুন'],
  ['Save changes', 'পরিবর্তন সংরক্ষণ'],
  ['Cancel', 'বাতিল'],
  ['More', 'আরও'],
  ['View details', 'বিস্তারিত দেখুন'],
  ['Delivery', 'ডেলিভারি'],
  ['Discuss with seller', 'বিক্রেতার সঙ্গে আলোচনা করুন'],
  ['Make an offer', 'অফার দিন'],
  ['Contact seller', 'বিক্রেতার সঙ্গে যোগাযোগ'],
  ['Saved listing', 'সংরক্ষিত তালিকা'],
  ['Save listing', 'তালিকা সংরক্ষণ'],
  ['About this material', 'এই উপকরণ সম্পর্কে'],
  ['Material overview', 'উপকরণের সংক্ষিপ্ত বিবরণ'],
  ['Specifications provided by seller', 'বিক্রেতার দেওয়া বিস্তারিত'],
  ['Listed by', 'তালিকাকার'],
  ['Back to marketplace', 'মার্কেটপ্লেসে ফিরুন'],
]

const reverse = new Map(phrases.map(([en, bn]) => [bn, en]))
const forward = new Map(phrases)
const ignoreSelectors =
  'input, textarea, select, option, script, style, [contenteditable="true"], .listing-title, .listing-seller, .listing-category, .listing-meta, .listing-tags, .detail-main, .request-primary'

export function applyDomLanguage(language: string | undefined): void {
  if (typeof document === 'undefined') return
  const dictionary = language === 'bn' ? forward : reverse
  const root = document.body
  if (!root) return

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes: Node[] = []
  while (walker.nextNode()) nodes.push(walker.currentNode)

  for (const node of nodes) {
    const parent = node.parentElement
    if (!parent || parent.closest(ignoreSelectors)) continue
    const value = node.nodeValue?.trim()
    if (!value) continue
    const translated = dictionary.get(value)
    if (translated && node.nodeValue) {
      node.nodeValue = node.nodeValue.replace(value, translated)
    }
  }
}

let observer: MutationObserver | null = null
export function startDomTranslationObserver(getLanguage: () => string | undefined): void {
  if (typeof MutationObserver === 'undefined' || observer) return
  observer = new MutationObserver(() => applyDomLanguage(getLanguage()))
  observer.observe(document.body, { childList: true, subtree: true, characterData: true })
}

export type { Language }
