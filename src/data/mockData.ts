import type { BuyerRequest, Listing, Offer, SeedUser, TransactionRecord } from '../types/index.ts'

export const listingsSeed: Listing[] = [
  { id: 'rice-husk-rajshahi', name: 'Rice Husk', category: 'Rice by-products', price: 8, unit: 'kg', quantity: 5, quantityUnit: 'MT', seller: 'Padma Agro Mills', location: 'Rajshahi', condition: 'Dry, mill-fresh', availability: 'Available now', frequency: 'Weekly', minimum: 500, description: 'Clean rice husk collected directly from our milling line. Stored under cover and available for regular collection.', image: '/products/rice-husk.jpg', color: '#b98a46', tags: ['Biomass', 'Rice mill'] },
  { id: 'cattle-manure-bogura', name: 'Cattle Manure', category: 'Animal manure', price: 5, unit: 'kg', quantity: 2, quantityUnit: 'MT', seller: 'Green Pasture Dairy', location: 'Bogura', condition: 'Composted', availability: 'Available now', frequency: 'Monthly', minimum: 250, description: 'Farm-collected cattle manure, composted on site. Buyers arrange pickup; larger monthly volumes can be discussed.', image: '/products/cattle-manure.jpg', color: '#74553b', tags: ['Compost input', 'Farm sourced'] },
  { id: 'poultry-litter-rangpur', name: 'Poultry Litter', category: 'Poultry waste', price: 12, unit: 'kg', quantity: 3, quantityUnit: 'MT', seller: 'Northfield Poultry', location: 'Rangpur', condition: 'Sun-dried', availability: 'Available this week', frequency: 'Bi-weekly', minimum: 500, description: 'Sun-dried poultry litter from a small commercial farm. Sampling and collection can be coordinated before an order.', image: '/products/poultry-litter.jpg', color: '#9a6f45', tags: ['Dried', 'Farm sourced'] },
  { id: 'rice-straw-dinajpur', name: 'Rice Straw', category: 'Crop residues', price: 6, unit: 'kg', quantity: 4, quantityUnit: 'MT', seller: 'Dinajpur Harvest Co-op', location: 'Dinajpur', condition: 'Baled, field-dry', availability: 'Harvest season', frequency: 'Seasonal', minimum: 1, description: 'Baled rice straw gathered after harvest. Suitable for feed, bedding, and biomass uses depending on buyer requirements.', image: '/products/rice-straw.jpg', color: '#b7a05c', tags: ['Baled', 'Seasonal'] },
  { id: 'coconut-husk-jashore', name: 'Coconut Husk', category: 'Coconut by-products', price: 15, unit: 'kg', quantity: 1, quantityUnit: 'MT', seller: 'Jashore Fibre Works', location: 'Jashore', condition: 'Raw, sorted', availability: 'Available now', frequency: 'Monthly', minimum: 100, description: 'Sorted coconut husk from a local processing unit. Smaller batches can be arranged for first-time buyers.', image: '/products/coconut-husk.jpg', color: '#94704a', tags: ['Fibre', 'Sorted'] },
  { id: 'wheat-straw-natore', name: 'Wheat Straw', category: 'Crop residues', price: 7, unit: 'kg', quantity: 2, quantityUnit: 'MT', seller: 'Natore Grain Collective', location: 'Natore', condition: 'Dry, loose', availability: 'Available now', frequency: 'Seasonal', minimum: 1, description: 'Dry wheat straw from the latest collection. Stored in a covered farm shed with loading access for local trucks.', image: '/products/wheat-straw.jpg', color: '#b8a564', tags: ['Dry', 'Farm sourced'] },
  { id: 'rice-bran-gazipur', name: 'Rice Bran', category: 'Rice by-products', price: 22, unit: 'kg', quantity: 8, quantityUnit: 'MT', seller: 'Meghna Rice Processing', location: 'Gazipur', condition: 'Freshly milled', availability: 'Available now', frequency: 'Weekly', minimum: 1, description: 'Freshly milled rice bran from a processing facility. Regular supply conversations welcome.', image: '/products/rice-bran.jpg', color: '#b18f55', tags: ['Rice mill', 'Regular supply'] },
  { id: 'maize-stover-mymensingh', name: 'Maize Stover', category: 'Crop residues', price: 6, unit: 'kg', quantity: 6, quantityUnit: 'MT', seller: 'Brahmaputra Crop Partners', location: 'Mymensingh', condition: 'Field-dry, chopped', availability: 'Available this week', frequency: 'Seasonal', minimum: 500, description: 'Chopped, field-dried maize stover available near the main road for convenient loading.', image: '/products/maize-stover.jpg', color: '#928243', tags: ['Chopped', 'Field collected'] },
  { id: 'fish-byproduct-cumilla', name: 'Fish Processing By-product', category: 'Other agricultural residues', price: 10, unit: 'kg', quantity: 1.5, quantityUnit: 'MT', seller: 'Comilla Fresh Processors', location: 'Cumilla', condition: 'Fresh, covered bins', availability: 'By arrangement', frequency: 'Weekly', minimum: 200, description: 'By-products from a small fish-processing line. Collection windows are coordinated directly with the seller.', image: '/products/fish-byproduct.jpg', color: '#71817a', tags: ['By arrangement', 'Processing'] },
  { id: 'mustard-stalk-jashore', name: 'Mustard Stalk', category: 'Crop residues', price: 4, unit: 'kg', quantity: 3, quantityUnit: 'MT', seller: 'Rural Roots Network', location: 'Jashore', condition: 'Air-dried', availability: 'Harvest season', frequency: 'Seasonal', minimum: 1, description: 'Air-dried mustard stalks collected from nearby farms after harvest.', image: '/products/mustard-stalk.jpg', color: '#9c9150', tags: ['Air-dried', 'Seasonal'] },
  { id: 'sugarcane-bagasse-kushtia', name: 'Sugarcane Bagasse', category: 'Other agricultural residues', price: 5, unit: 'kg', quantity: 10, quantityUnit: 'MT', seller: 'Kushtia Agro Energy Co-op', location: 'Kushtia', condition: 'Moist, fresh', availability: 'Available now', frequency: 'Weekly', minimum: 2, description: 'Fresh bagasse from a local processing cooperative. Pickup timing should be agreed in advance.', image: '/products/sugarcane-bagasse.jpg', color: '#857c54', tags: ['Processing', 'Bulk'] },
  { id: 'paddy-straw-bogura', name: 'Paddy Straw', category: 'Crop residues', price: 5, unit: 'kg', quantity: 7, quantityUnit: 'MT', seller: 'Shibganj Farm Collective', location: 'Bogura', condition: 'Baled, dry', availability: 'Available now', frequency: 'Seasonal', minimum: 1, description: 'Baled paddy straw gathered from nearby farms. Loading is available at the collection point.', image: '/products/paddy-straw.jpg', color: '#ad995b', tags: ['Baled', 'Farm sourced'] },
  { id: 'rice-straw-rangpur', name: 'Rice Straw', category: 'Crop residues', price: 6, unit: 'kg', quantity: 3, quantityUnit: 'MT', seller: 'Rangpur Harvest Circle', location: 'Rangpur', condition: 'Baled, dry', availability: 'Available now', frequency: 'Seasonal', minimum: 1, description: 'Baled rice straw gathered from the Rangpur harvest. Collection timing and loading can be arranged with the producer.', image: '/products/rice-straw-2.jpg', color: '#a8985a', tags: ['Baled', 'Seasonal'] },
  { id: 'poultry-litter-gaibandha', name: 'Poultry Litter', category: 'Poultry waste', price: 11, unit: 'kg', quantity: 5, quantityUnit: 'MT', seller: 'Teesta Poultry Cooperative', location: 'Rangpur', condition: 'Dry, farm-collected', availability: 'Available this week', frequency: 'Monthly', minimum: 500, description: 'Five tonnes of farm-collected poultry litter available this week. Buyers can discuss collection and transport directly.', image: '/products/poultry-litter-2.jpg', color: '#98714c', tags: ['Farm sourced', 'Bulk'] },
]

export const requestsSeed: BuyerRequest[] = [
  { id: 'req-01', material: 'Rice Husk', category: 'Rice by-products', quantity: '10 MT / month', location: 'Gazipur', budget: '৳7–9 / kg', buyer: 'EcoBoard Bangladesh', date: '2 hours ago', condition: 'Dry, consistent supply' },
  { id: 'req-02', material: 'Composted Cattle Manure', category: 'Animal manure', quantity: '3 MT', location: 'Dhaka', budget: 'Negotiable', buyer: 'Mrittika Organics', date: 'Yesterday', condition: 'Composted, covered transport' },
  { id: 'req-03', material: 'Rice Straw', category: 'Crop residues', quantity: '5 MT', location: 'Rangpur', budget: '৳5–7 / kg', buyer: 'GreenFlame Bioenergy', date: '1 day ago', condition: 'Baled and field-dry' },
  { id: 'req-04', material: 'Poultry Litter', category: 'Poultry waste', quantity: '2 MT / month', location: 'Mymensingh', budget: 'Negotiable', buyer: 'Shobuj Krishi Inputs', date: '3 days ago', condition: 'Dried, recent collection' },
  { id: 'req-05', material: 'Coconut Husk', category: 'Coconut by-products', quantity: '1 MT', location: 'Jashore', budget: 'Up to ৳16 / kg', buyer: 'Natural Fibre Studio', date: '4 days ago', condition: 'Sorted, no synthetic material' },
  { id: 'req-06', material: 'Maize Stover', category: 'Crop residues', quantity: '8 MT', location: 'Bogura', budget: 'Negotiable', buyer: 'Prakriti Feed Partners', date: '5 days ago', condition: 'Chopped, dry preferred' },
]

export const offersSeed: Offer[] = [
  { id: 'OFF-2401', buyer: 'Mrittika Organics', material: 'Rice Husk', price: 7.5, quantity: '1 MT', message: 'Can collect this week. Is the material stored under cover?', date: 'Today', status: 'Pending' },
  { id: 'OFF-2396', buyer: 'GreenFlame Bioenergy', material: 'Rice Straw', price: 6, quantity: '2 MT', message: 'We can arrange a truck from Dinajpur.', date: 'Yesterday', status: 'Pending' },
  { id: 'OFF-2388', buyer: 'Shobuj Krishi Inputs', material: 'Cattle Manure', price: 5, quantity: '500 kg', message: 'Please share a convenient pickup window.', date: '2 days ago', status: 'Accepted' },
  { id: 'OFF-2381', buyer: 'EcoBoard Bangladesh', material: 'Rice Husk', price: 8, quantity: '3 MT', message: 'Looking for a recurring monthly supplier.', date: '3 days ago', status: 'Countered' },
  { id: 'OFF-2376', buyer: 'Prakriti Feed Partners', material: 'Wheat Straw', price: 6.5, quantity: '1 MT', message: 'Can you share a batch inspection photo before confirming?', date: '5 days ago', status: 'Pending' },
  { id: 'OFF-2364', buyer: 'North Bengal Compost', material: 'Poultry Litter', price: 11, quantity: '1 MT', message: 'We can collect directly from the farm.', date: '1 week ago', status: 'Rejected' },
]

export const transactionsSeed: TransactionRecord[] = [
  { id: 'NT-2026-041', buyer: 'Mrittika Organics', material: 'Rice Husk', quantity: '1 MT', amount: '৳7,500', date: '18 Nov 2026', status: 'Completed' },
  { id: 'NT-2026-039', buyer: 'GreenFlame Bioenergy', material: 'Rice Straw', quantity: '2 MT', amount: '৳12,000', date: '12 Nov 2026', status: 'In progress' },
  { id: 'NT-2026-034', buyer: 'Shobuj Krishi Inputs', material: 'Cattle Manure', quantity: '500 kg', amount: '৳2,500', date: '06 Nov 2026', status: 'Completed' },
  { id: 'NT-2026-028', buyer: 'EcoBoard Bangladesh', material: 'Rice Husk', quantity: '3 MT', amount: '৳24,000', date: '28 Oct 2026', status: 'Completed' },
  { id: 'NT-2026-021', buyer: 'Prakriti Feed Partners', material: 'Wheat Straw', quantity: '1 MT', amount: '৳6,500', date: '19 Oct 2026', status: 'Completed' },
]

export const usersSeed: SeedUser[] = [
  { name: 'Padma Agro Mills', type: 'Seller', location: 'Rajshahi', status: 'Verified' },
  { name: 'Mrittika Organics', type: 'Buyer', location: 'Dhaka', status: 'Active' },
  { name: 'Green Pasture Dairy', type: 'Seller', location: 'Bogura', status: 'Pending review' },
  { name: 'EcoBoard Bangladesh', type: 'Buyer', location: 'Gazipur', status: 'Active' },
]

export const categories: string[] = [
  'Animal manure',
  'Poultry waste',
  'Rice by-products',
  'Crop residues',
  'Coconut by-products',
  'Other agricultural residues',
]

export const locations: string[] = [
  'Rajshahi',
  'Bogura',
  'Rangpur',
  'Dinajpur',
  'Mymensingh',
  'Gazipur',
  'Cumilla',
  'Jashore',
  'Natore',
  'Dhaka',
  'Kushtia',
]

export const recommendationsSeed: Array<{ listingId: string }> = [
  { listingId: 'rice-husk-rajshahi' },
  { listingId: 'rice-bran-gazipur' },
  { listingId: 'rice-straw-dinajpur' },
  { listingId: 'paddy-straw-bogura' },
]
