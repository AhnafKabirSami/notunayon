export interface KnowledgeItem {
  names: string[]
  name: string
  bnName: string
  explanation: string
  bnExplanation: string
}

export const agriculturalKnowledge: KnowledgeItem[] = [
  {
    names: ['cattle manure', 'cow manure', 'cow dung', 'gobor', 'gobor sar', 'গোবর সার', 'গোবর'],
    name: 'Cattle manure',
    bnName: 'গোবর সার',
    explanation:
      'Cattle manure is organic material from cattle. After proper composting, it can improve soil organic matter and support soil biological activity. It may also be used as a biogas feedstock. Handling should include covered storage, appropriate composting, and protection from runoff; suitability depends on moisture, contamination, and the target application.',
    bnExplanation:
      'গোবর সার গবাদি পশুর বর্জ্যজাত জৈব উপাদান। সঠিক কম্পোস্ট করার পর এটি মাটির জৈব পদার্থ ও মৃত্তিকা জীবনী শক্তি বাড়াতে সহায়তা করতে পারে; কিছু ক্ষেত্রে বায়োগ্যাসেও ব্যবহার করা যায়। আর্দ্রতা, দূষণ, সংরক্ষণ এবং ব্যবহারের ধরণ দেখে নিতে হবে।',
  },
  {
    names: ['poultry litter', 'chicken litter', 'poultry waste', 'kobutor litter', 'murgir litter'],
    name: 'Poultry litter',
    bnName: 'পোল্ট্রি লিটার',
    explanation:
      'Poultry litter is the bedding and waste mixture collected from poultry housing. It is not identical to pure poultry manure, and composition varies by bedding material, feed, moisture, and cleaning method. It may be composted or processed for soil-related uses, but handling, contamination, and application requirements should be checked before use.',
    bnExplanation:
      'পোল্ট্রি লিটার মুরগির ঘরের বিছানাসহ সংগ্রহ করা মিশ্র বর্জ্য। এটি বিশুদ্ধ মুরগির গোবর নয়; বিছানার উপাদান, আর্দ্রতা এবং সংগ্রহ পদ্ধতির ওপর গুণাগুণ নির্ভর করে। মাটির কাজে ব্যবহারের আগে কম্পোস্ট বা প্রক্রিয়াকরণ এবং স্বাস্থ্য ঝুঁকি বিবেচনা করা জরুরি।',
  },
  {
    names: ['rice husk', 'rice hull', 'husk', 'dhaner tush', 'ধানের তুষ'],
    name: 'Rice husk',
    bnName: 'ধানের তুষ',
    explanation:
      'Rice husk is the hard outer covering removed during rice milling. It is used for biomass energy, briquettes, bedding, insulation, ash products, and as a lower-nutrient soil or growing-medium component after proper processing. Moisture, dust, storage, and the receiving buyer’s specifications matter.',
    bnExplanation:
      'ধানের তুষ চাল মিলিংয়ের সময় বের হওয়া শক্ত বাইরের আবরণ। এর তুলনামূলক কম পুষ্টিসার রয়েছে। বায়োমাস, ব্রিকেট, বিছানা, ইন্সুলেশন ও নির্দিষ্ট প্রক্রিয়াজাত উপাদানে এটি ব্যবহৃত হয়। আর্দ্রতা, ধুলা এবং সংরক্ষণ বিবেচনা করা জরুরি।',
  },
  {
    names: ['rice straw', 'paddy straw', 'dhaner khor', 'ধানের খড়'],
    name: 'Rice straw',
    bnName: 'ধানের খড়',
    explanation:
      'Rice straw is the dry stalk material remaining after rice harvest. It can be baled for bedding, mulch, compost feedstock, or biomass use, depending on contamination and moisture. Suitability for animal feed must be assessed separately and should not be assumed.',
    bnExplanation:
      'ধানের খড় কাটার পর অবশিষ্ট শুষ্ক পরগাছা। বেল করে বিছানা, মালচ, কম্পোস্ট বা বায়োমাসে ব্যবহার করা হতে পারে। পশু খাদ্য হিসেবে ব্যবহারের ক্ষেত্রে আলাদাভাবে নিরাপত্তা ও উপযোগিতা যাচাই করা উচিত।',
  },
  {
    names: ['wheat straw', 'gom er khor', 'গমের খড়'],
    name: 'Wheat straw',
    bnName: 'গমের খড়',
    explanation:
      'Wheat straw is the dry stalk residue remaining after wheat harvest. It is mainly used for bedding, mulch, composting, and biomass after bale or moisture checks. It should be assessed separately from grain or straw for feed use.',
    bnExplanation:
      'গমের খড় কাটার পর অবশিষ্ট শুষ্ক কান্ড। বিছানা, মালচ, কম্পোস্ট বা বায়োমাস হিসেবে ব্যবহার হতে পারে। খাদ্য হিসেবে ব্যবহারের আগে গুণমান ও নিরাপত্তা আলাদাভাবে যাচাই করতে হবে।',
  },
  {
    names: ['coconut husk', 'coconut coir', 'coconut fibre', 'narikel husk', 'নারকেল তুষ'],
    name: 'Coconut husk',
    bnName: 'নারকেলের ছালা',
    explanation:
      'Coconut husk is the fibrous outer covering of a coconut. It can be used for coir fibre, growing media, mulching, and processing products. Raw husk, fibre, and coconut shell are distinct materials and should not be grouped together for technical or market searches.',
    bnExplanation:
      'নারকেলের ছালা নারকেলের বাইরের তন্তুযুক্ত আবরণ। কায়ার, চারা উৎপাদনের মাধ্যম, মালচ বা প্রক্রিয়াজাত উপাদান হিসেবে ব্যবহার হতে পারে। এটি নারকেলের খোলসের মতো নয়।',
  },
  {
    names: ['fish processing', 'fish by-product', 'fish waste', 'mach er waste', 'মাছের বর্জ্য'],
    name: 'Fish-processing by-products',
    bnName: 'মাছ প্রক্রিয়াজাত বর্জ্য',
    explanation:
      'Fish-processing by-products may include heads, viscera, scales, frames, and processing wash residues. They should be separated and stored safely because moisture and decomposition can create odor and contamination risks. Processing, handling, and intended use determine whether they are suitable.',
    bnExplanation:
      'মাছের মাথা, পেটের অংশ, আঁশ, কাঁটা ও প্রক্রিয়াজাত ধোয়া পানি মাছ প্রক্রিয়াকরণ বর্জ্যের অংশ হতে পারে। আর্দ্রতা ও পচনের কারণে দুর্গন্ধ ও দূষণের ঝুঁকি থাকে; সংরক্ষণ ও ব্যবহারের আগে উপাদানগুলো আলাদা করে যাচাই করা প্রয়োজন।',
  },
  {
    names: ['crop residue', 'crop residues', 'fasol er obosisto', 'ফসলের অবশেষ'],
    name: 'Crop residues',
    bnName: 'ফসলের অবশেষ',
    explanation:
      'Crop residues are leftover stems, leaves, husks, or stalks after harvesting or processing. Common uses include composting, mulching, bedding, biomass, and some processing applications. The source crop, contamination, moisture, and handling determine suitability.',
    bnExplanation:
      'ফসলের অবশিষ্ট কান্ড, পাতা, তুষ বা খড়। প্রক্রিয়াকরণ, আর্দ্রতা ও দূষণের ওপর নির্ভর করে কম্পোস্ট, মালচ, বিছানা বা বায়োমাস হিসেবে ব্যবহার হতে পারে।',
  },
]

export function findAgriculturalKnowledge(question: string): KnowledgeItem | undefined {
  const text = String(question || '').toLowerCase()
  return agriculturalKnowledge.find((item) => item.names.some((name) => text.includes(name)))
}
