/**
 * PRODUCT GRID (reusable)
 * -----------------------
 * Renders a list of products into a responsive grid with progressive
 * ("load more") pagination. Re-usable for trending strips, full category
 * listings, and search results alike.
 *
 * options:
 *   pageSize   number of items revealed per batch (default 8)
 *   emptyText  message shown when `products` is empty
 *   showMore   whether to paginate at all (trending sections pass false)
 *   badge      optional label (e.g. "New") stamped on every card in this grid
 */
window.ProductGrid = (function () {
  function create(products, options = {}) {
    const { pageSize = 8, emptyText = 'No products found.', showMore = true, badge = null } = options;

    const wrapper = Utils.fromHTML(`
      <div class="grid-wrapper">
        <div class="product-grid" role="list"></div>
        <div class="grid-empty" hidden>
          <p>${Utils.escapeHTML(emptyText)}</p>
        </div>
        <div class="grid-more-wrap">
          <button class="explore-more-btn" type="button" hidden>
            Explore More
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
    `);

    const gridEl = wrapper.querySelector('.product-grid');
    const emptyEl = wrapper.querySelector('.grid-empty');
    const moreBtn = wrapper.querySelector('.explore-more-btn');

    let visibleCount = 0;
    let currentProducts = [];

    function renderBatch() {
      const nextSlice = currentProducts.slice(visibleCount, visibleCount + pageSize);
      nextSlice.forEach((product, i) => {
        const card = ProductCard.create(product, { badge });
        card.style.setProperty('--stagger', i);
        card.classList.add('card-enter');
        gridEl.appendChild(card);
        requestAnimationFrame(() => card.classList.add('card-enter-active'));
      });
      visibleCount += nextSlice.length;
      updateMoreButton();
    }

    function updateMoreButton() {
      const hasMore = visibleCount < currentProducts.length;
      moreBtn.hidden = !showMore || !hasMore;
    }

    function setProducts(products) {
      currentProducts = products;
      visibleCount = 0;
      Utils.clear(gridEl);
      emptyEl.hidden = currentProducts.length !== 0;
      gridEl.hidden = currentProducts.length === 0;
      if (currentProducts.length > 0) renderBatch();
      else moreBtn.hidden = true;
    }

    moreBtn.addEventListener('click', () => {
      moreBtn.classList.add('is-loading');
      setTimeout(() => {
        renderBatch();
        moreBtn.classList.remove('is-loading');
      }, 260);
    });

    setProducts(products);

    return { element: wrapper, setProducts };
  }

  return { create };
})();
