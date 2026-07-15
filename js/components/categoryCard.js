/**
 * CATEGORY CARD (reusable)
 * ------------------------
 * Used on the homepage to present each category from DataStore.
 */
window.CategoryCard = (function () {
  function create(category) {
    const count = DataStore.getCategoryProductCount(category.slug);

    const html = `
      <a class="category-card" href="#/category/${Utils.escapeHTML(category.slug)}">
        <div class="category-media">
          <img src="${Utils.escapeHTML(category.image)}" alt="${Utils.escapeHTML(category.name)}" loading="lazy" />
        </div>
        <div class="category-body">
          <div class="category-heading">
            <h3>${Utils.escapeHTML(category.name)}</h3>
            <span class="category-count">${count} piece${count === 1 ? '' : 's'}</span>
          </div>
          <p>${Utils.escapeHTML(category.tagline)}</p>
          <span class="category-link">
            Explore category
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
      </a>
    `;

    return Utils.fromHTML(html);
  }

  return { create };
})();
