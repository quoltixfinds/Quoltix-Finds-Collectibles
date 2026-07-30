window.Pages = window.Pages || {};

window.Pages.NotFound = function NotFound(opts = {}) {
  const message = opts.message || "The page you're looking for doesn't exist.";

  const html = `
    <section class="not-found">
      <p class="not-found-code">404</p>
      <h1>Nothing here.</h1>
      <p>${Utils.escapeHTML(message)}</p>
      <a class="view-btn" href="#/">Back to Home</a>
    </section>
  `;

  return {
    element: Utils.fromHTML(`<div class="page page-not-found">${html}</div>`),
    title: 'Page not found'
  };
};
