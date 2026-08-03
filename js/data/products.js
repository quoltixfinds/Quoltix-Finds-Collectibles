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
    id: 'QF-CM-001',
    categorySlug: 'car-miniatures',
    name: 'Mahindra Thar (1:32)',
    sku: 'QF-CM-001',
    image: 'Media/Products/QF-CM-01.jpeg',
    affiliateLink: 'https://link.amazon/B0cWnTO7m',
    addedAt: '2026-08-03'
  },
];
