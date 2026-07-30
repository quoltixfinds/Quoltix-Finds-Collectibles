window.Pages = window.Pages || {};

window.Pages.Redirect = function Redirect(productId) {
  const product = DataStore.getProductById(productId);

  if (!product) {
    const html = `
      <section class="redirect-page">
        <div class="redirect-card">
          <h1>We lost this one</h1>
          <p>That product doesn't exist anymore, or the link is out of date.</p>
          <a class="view-btn" href="#/">Back to Quoltix Finds</a>
        </div>
      </section>
    `;
    return { element: Utils.fromHTML(`<div class="page page-redirect">${html}</div>`), title: 'Not found' };
  }

  const html = `
    <section class="redirect-page">
      <div class="redirect-card">
        <div class="redirect-media">
          <img src="${Utils.escapeHTML(product.image)}" alt="${Utils.escapeHTML(product.name)}" />
        </div>
        <p class="eyebrow">Taking you to the source</p>
        <h1>${Utils.escapeHTML(product.name)}</h1>
        <p class="redirect-sub">You're being redirected to the retailer for this item. Quoltix Finds is a discovery
        platform — the sale itself happens on their site.</p>
        <div id="spinner-slot"></div>
        <a class="redirect-fallback" id="continue-now" href="${Utils.escapeHTML(product.affiliateLink)}" rel="nofollow sponsored noopener">
          Continue now
        </a>
        <a class="breadcrumb" href="#/category/${Utils.escapeHTML(product.categorySlug)}">← Back to category</a>
      </div>
    </section>
  `;

  const element = Utils.fromHTML(`<div class="page page-redirect">${html}</div>`);
  element.querySelector('#spinner-slot').appendChild(Loading.spinner('Redirecting…'));

  const timeoutId = setTimeout(() => {
    window.location.href = product.affiliateLink;
  }, 1400);

  return {
    element,
    title: `Redirecting to ${product.name}`,
    cleanup: () => clearTimeout(timeoutId)
  };
};
