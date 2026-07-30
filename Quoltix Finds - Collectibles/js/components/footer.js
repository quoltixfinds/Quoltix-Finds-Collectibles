/**
 * FOOTER (persistent)
 * -------------------
 * Rendered once into #app-footer. Category links are generated from
 * DataStore so the footer stays in sync automatically.
 */
window.Footer = (function () {
  function render() {
    const categories = DataStore.getCategories();
    const year = new Date().getFullYear();

    const links = categories
      .map((c) => `<li><a href="#/category/${Utils.escapeHTML(c.slug)}">${Utils.escapeHTML(c.name)}</a></li>`)
      .join('');

    const html = `
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <p>Quoltix Finds is a curated discovery platform for collectibles. We don't sell anything —
            we spotlight it, and point you to where it lives.</p>
          </div>

          <div class="footer-col">
            <h4>Categories</h4>
            <ul>${links || '<li>Coming soon</li>'}</ul>
          </div>

          <div class="footer-col">
            <h4>Quoltix Finds</h4>
            <ul>
              <li><a href="#/">Home</a></li>
              <li><a href="#/" data-scroll-top="true">Back to top</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© ${year} Quoltix Finds. All product links are affiliate links; we may earn a commission.</p>
          <p class="footer-disclaimer">Not an online store — a discovery layer for collectors.</p>
        </div>
      </div>
    `;

    return Utils.fromHTML(`<footer class="site-footer" role="contentinfo">${html}</footer>`);
  }

  return { render };
})();
