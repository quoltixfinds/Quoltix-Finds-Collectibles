/**
 * DATA ACCESS LAYER
 * -----------------
 * Every part of the app reads data through here instead of touching
 * window.APP_DATA directly. That means the storage backend can later
 * change (e.g. a real API / CMS) by editing only this file.
 */
window.DataStore = (function () {
  function getCategories() {
    return [...(window.APP_DATA.categories || [])];
  }

  function getCategoryBySlug(slug) {
    return getCategories().find((c) => c.slug === slug) || null;
  }

  function getProducts() {
    return [...(window.APP_DATA.products || [])];
  }

  function getProductsByCategory(slug) {
    return getProducts().filter((p) => p.categorySlug === slug);
  }

  function getProductById(id) {
    return getProducts().find((p) => p.id === id) || null;
  }

  function sortByNewest(products) {
    return [...products].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  }

  /** Count of products in a category — used on homepage/category cards. */
  function getCategoryProductCount(slug) {
    return getProductsByCategory(slug).length;
  }

  /**
   * The image shown for a category (card + header) — always pulled from a
   * real product's photo already in the database rather than a separate
   * stock image, so it's automatically accurate and never goes stale.
   * Uses the newest product in the category; falls back to the category's
   * own `image` field only if it has no products yet.
   */
  function getCategoryImage(slug) {
    const products = sortByNewest(getProductsByCategory(slug));
    if (products.length > 0) return products[0].image;
    const category = getCategoryBySlug(slug);
    return category ? category.image : null;
  }

  /** Simple search across name + SKU, case-insensitive. */
  function searchProducts(products, query) {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
    );
  }

  return {
    getCategories,
    getCategoryBySlug,
    getProducts,
    getProductsByCategory,
    getProductById,
    sortByNewest,
    getCategoryProductCount,
    getCategoryImage,
    searchProducts
  };
})();
