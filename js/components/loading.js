/**
 * LOADING STATES (reusable)
 * -------------------------
 * Skeleton grid used while a section's data is "loading" (kept brief since
 * data is local, but this is where a future API call's loading state would
 * hook in) and a spinner used on the redirect page.
 */
window.Loading = (function () {
  function skeletonGrid(count = 4) {
    const cards = Array.from({ length: count })
      .map(
        () => `
        <div class="skeleton-card" aria-hidden="true">
          <div class="skeleton-media"></div>
          <div class="skeleton-line w-70"></div>
          <div class="skeleton-line w-40"></div>
        </div>`
      )
      .join('');

    return Utils.fromHTML(`<div class="product-grid skeleton-grid">${cards}</div>`);
  }

  function spinner(label = 'Loading') {
    return Utils.fromHTML(`
      <div class="spinner" role="status" aria-live="polite">
        <span class="spinner-ring" aria-hidden="true"></span>
        <span class="spinner-label">${Utils.escapeHTML(label)}</span>
      </div>
    `);
  }

  return { skeletonGrid, spinner };
})();
