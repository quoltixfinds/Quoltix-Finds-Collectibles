/**
 * PRODUCT GRID (reusable)
 * -----------------------
 * Renders a list of products into a responsive grid, with a staggered
 * entrance animation. Re-usable for trending strips, full category
 * listings, and search results alike. Renders every product it's given
 * immediately — no pagination / "load more" step.
 *
 * options:
 *   emptyText  message shown when `products` is empty
 *   badge      optional label (e.g. "New") stamped on every card in this grid
 */
window.ProductGrid = (function () {
  function create(products, options = {}) {
    const { emptyText = 'No products found.', badge = null } = options;

    const wrapper = Utils.fromHTML(`
      <div class="grid-wrapper">
        <div class="product-grid" role="list"></div>
        <div class="grid-empty" hidden>
          <p>${Utils.escapeHTML(emptyText)}</p>
        </div>
      </div>
    `);

    const gridEl = wrapper.querySelector('.product-grid');
    const emptyEl = wrapper.querySelector('.grid-empty');

    function setProducts(nextProducts) {
      Utils.clear(gridEl);
      emptyEl.hidden = nextProducts.length !== 0;
      gridEl.hidden = nextProducts.length === 0;

      nextProducts.forEach((product, i) => {
        const card = ProductCard.create(product, { badge });
        card.style.setProperty('--stagger', Math.min(i, 10));
        card.classList.add('card-enter');
        gridEl.appendChild(card);
        requestAnimationFrame(() => card.classList.add('card-enter-active'));
      });
    }

    setProducts(products);

    return { element: wrapper, setProducts };
  }

  return { create };
})();
