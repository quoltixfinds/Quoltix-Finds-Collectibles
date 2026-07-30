/**
 * PRODUCT CARD (reusable)
 * -----------------------
 * Renders exactly the fields the brief requires: image, name, SKU, View button.
 * The View button navigates to the internal redirect route, which then
 * forwards the visitor to the product's affiliate link.
 */
window.ProductCard = (function () {
  function create(product, options = {}) {
    const { badge = null } = options;

    const html = `
      <article class="product-card" data-id="${Utils.escapeHTML(product.id)}">
        <div class="product-media">
          ${badge ? `<span class="product-badge">${Utils.escapeHTML(badge)}</span>` : ''}
          <img
            src="${Utils.escapeHTML(product.image)}"
            alt="${Utils.escapeHTML(product.name)}"
            loading="lazy"
            width="400" height="400"
          />
        </div>
        <div class="product-body">
          <h3 class="product-name">${Utils.escapeHTML(product.name)}</h3>
          <p class="product-sku">SKU <span>${Utils.escapeHTML(product.sku)}</span></p>
          <a class="view-btn" href="#/redirect/${Utils.escapeHTML(product.id)}" aria-label="View ${Utils.escapeHTML(product.name)}">
            View
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
      </article>
    `;

    return Utils.fromHTML(html);
  }

  return { create };
})();
