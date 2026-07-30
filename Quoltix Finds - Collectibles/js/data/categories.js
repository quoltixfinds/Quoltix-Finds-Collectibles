/**
 * CATEGORIES DATA SOURCE
 * ----------------------
 * This is the ONLY place a new category needs to be registered.
 * Everything else — homepage cards, the Products nav dropdown, category
 * routes, and category pages — is generated dynamically from this array.
 *
 * To add a category in the future:
 *   1. Add an object below with a unique `slug`.
 *   2. Add products in js/data/products.js that reference that `slug`
 *      as their `categorySlug`.
 * No other file needs to change.
 *
 * Shape:
 * {
 *   slug: string            // unique, URL-safe, used for routing
 *   name: string            // display name
 *   tagline: string         // short one-liner for category card
 *   description: string     // longer description for category header
 *   image: string           // FALLBACK ONLY — used if the category has no
 *                           // products yet. Once it has products, the card
 *                           // and header automatically use a real product's
 *                           // photo instead (see DataStore.getCategoryImage).
 * }
 */

window.APP_DATA = window.APP_DATA || {};

window.APP_DATA.categories = [
  {
    slug: 'car-miniatures',
    name: 'Car Miniatures',
    tagline: 'Die-cast icons, scaled down, hyped up.',
    description:
      'Pocket-sized legends — from JDM cult classics to grid-winning supercars. Every casting hand-picked for detail, weight, and shelf presence.',
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1200&auto=format&fit=crop'
  }
];
