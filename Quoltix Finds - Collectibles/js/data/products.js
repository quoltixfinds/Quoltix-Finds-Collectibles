/**
 * PRODUCTS DATA SOURCE
 * --------------------
 * Every product on the site lives here. Nothing about products is
 * hardcoded into HTML — cards, grids, search, trending and sorting are
 * all derived from this array at runtime.
 *
 * Shape:
 * {
 *   id: string              // unique product id
 *   categorySlug: string    // must match a categories.js `slug`
 *   name: string            // product name
 *   sku: string             // stock keeping unit / catalog code
 *   image: string           // product image URL
 *   affiliateLink: string   // destination the redirect page sends users to
 *   addedAt: string         // ISO date — drives "newest first" & trending
 * }
 *
 * Scaling to hundreds/thousands of products only means appending more
 * objects here (or swapping this static array for a fetch() call to an
 * API later — the rest of the app already treats data as async-ready
 * via getProducts()).
 */

window.APP_DATA = window.APP_DATA || {};

window.APP_DATA.products = [
  {
    id: 'cm-001',
    categorySlug: 'car-miniatures',
    name: 'Nissan Skyline GT-R R34 — Midnight Purple',
    sku: 'QX-CM-1001',
    image: 'https://images.unsplash.com/photo-1594502184342-2543bd7e0ca6?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/skyline-r34',
    addedAt: '2026-07-12'
  },
  {
    id: 'cm-002',
    categorySlug: 'car-miniatures',
    name: 'Toyota Supra MK4 — Widebody Kit',
    sku: 'QX-CM-1002',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/supra-mk4',
    addedAt: '2026-07-10'
  },
  {
    id: 'cm-003',
    categorySlug: 'car-miniatures',
    name: 'Porsche 911 GT3 RS — Track Edition',
    sku: 'QX-CM-1003',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/porsche-gt3rs',
    addedAt: '2026-07-09'
  },
  {
    id: 'cm-004',
    categorySlug: 'car-miniatures',
    name: 'Lamborghini Countach — Retro Series',
    sku: 'QX-CM-1004',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/countach-retro',
    addedAt: '2026-07-08'
  },
  {
    id: 'cm-005',
    categorySlug: 'car-miniatures',
    name: 'Ford Mustang Mach 1 — Heritage Green',
    sku: 'QX-CM-1005',
    image: 'https://images.unsplash.com/photo-1547245324-d777c6f05e80?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/mustang-mach1',
    addedAt: '2026-07-06'
  },
  {
    id: 'cm-006',
    categorySlug: 'car-miniatures',
    name: 'Mazda RX-7 FD — Initial D Tribute',
    sku: 'QX-CM-1006',
    image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/rx7-fd',
    addedAt: '2026-07-05'
  },
  {
    id: 'cm-007',
    categorySlug: 'car-miniatures',
    name: 'BMW M3 E30 — Cup Racer',
    sku: 'QX-CM-1007',
    image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/bmw-e30',
    addedAt: '2026-07-03'
  },
  {
    id: 'cm-008',
    categorySlug: 'car-miniatures',
    name: 'Ferrari F40 — Rosso Corsa',
    sku: 'QX-CM-1008',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/ferrari-f40',
    addedAt: '2026-07-01'
  },
  {
    id: 'cm-009',
    categorySlug: 'car-miniatures',
    name: 'Honda NSX Type R — Championship White',
    sku: 'QX-CM-1009',
    image: 'https://images.unsplash.com/photo-1619976215249-990246ba62cf?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/nsx-typer',
    addedAt: '2026-06-28'
  },
  {
    id: 'cm-010',
    categorySlug: 'car-miniatures',
    name: 'Subaru Impreza WRX STI — Rally Livery',
    sku: 'QX-CM-1010',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/wrx-sti',
    addedAt: '2026-06-24'
  },
  {
    id: 'cm-011',
    categorySlug: 'car-miniatures',
    name: 'Chevrolet Corvette C8 — Carbon Flash',
    sku: 'QX-CM-1011',
    image: 'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/corvette-c8',
    addedAt: '2026-06-20'
  },
  {
    id: 'cm-012',
    categorySlug: 'car-miniatures',
    name: 'Mercedes-AMG GT — Black Series',
    sku: 'QX-CM-1012',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/amg-gt-black',
    affiliate2: null,
    addedAt: '2026-06-15'
  },
  {
    id: 'cm-013',
    categorySlug: 'car-miniatures',
    name: 'Datsun 240Z — Vintage Restoration',
    sku: 'QX-CM-1013',
    image: 'https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/datsun-240z',
    addedAt: '2026-06-10'
  },
  {
    id: 'cm-014',
    categorySlug: 'car-miniatures',
    name: 'Audi Quattro S1 — Rallye Group B',
    sku: 'QX-CM-1014',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/audi-quattro-s1',
    addedAt: '2026-06-04'
  },
  {
    id: 'cm-015',
    categorySlug: 'car-miniatures',
    name: 'Volkswagen Golf Mk2 GTI — Classic Red',
    sku: 'QX-CM-1015',
    image: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/golf-mk2-gti',
    addedAt: '2026-05-29'
  },
  {
    id: 'cm-016',
    categorySlug: 'car-miniatures',
    name: 'McLaren F1 — Gulf Livery',
    sku: 'QX-CM-1016',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/mclaren-f1-gulf',
    addedAt: '2026-05-20'
  },
  {
    id: 'cm-017',
    categorySlug: 'car-miniatures',
    name: 'Toyota AE86 Trueno — Panda Edition',
    sku: 'QX-CM-1017',
    image: 'https://images.unsplash.com/photo-1518987048-93e29699e79a?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/ae86-trueno',
    addedAt: '2026-05-12'
  },
  {
    id: 'cm-018',
    categorySlug: 'car-miniatures',
    name: 'Dodge Charger R/T — Muscle Classic',
    sku: 'QX-CM-1018',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop',
    affiliateLink: 'https://example.com/affiliate/dodge-charger-rt',
    addedAt: '2026-05-01'
  }
];
