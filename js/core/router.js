/**
 * ROUTER
 * ------
 * Minimal hash-based router. Hash routing is used (rather than the
 * History API) so the site works correctly when opened as static files
 * with no server-side rewrite rules configured, while still giving a
 * true SPA experience with working back/forward navigation.
 *
 * Routes:
 *   #/                          -> home page
 *   #/category/:slug            -> category page
 *   #/redirect/:productId       -> affiliate redirect page
 *   anything else               -> 404 page
 */
window.Router = (function () {
  const contentEl = () => document.getElementById('app-content');
  let currentCleanup = null;

  function parseHash() {
    let hash = window.location.hash || '#/';
    hash = hash.replace(/^#/, '');
    const parts = hash.split('/').filter(Boolean);

    if (parts.length === 0) return { name: 'home', params: {} };
    if (parts[0] === 'category' && parts[1]) return { name: 'category', params: { slug: parts[1] } };
    if (parts[0] === 'redirect' && parts[1]) return { name: 'redirect', params: { id: parts[1] } };
    return { name: 'not-found', params: {} };
  }

  async function render() {
    const el = contentEl();
    if (!el) return;

    // Run any teardown the previous page registered (timers, listeners…).
    if (typeof currentCleanup === 'function') {
      try { currentCleanup(); } catch (e) { /* no-op */ }
      currentCleanup = null;
    }

    const route = parseHash();

    // Fade-out, swap, fade-in — respects prefers-reduced-motion via CSS.
    el.classList.add('route-leaving');

    await wait(120);
    Utils.clear(el);

    let page;
    switch (route.name) {
      case 'home':
        page = window.Pages.Home();
        break;
      case 'category':
        page = window.Pages.Category(route.params.slug);
        break;
      case 'redirect':
        page = window.Pages.Redirect(route.params.id);
        break;
      default:
        page = window.Pages.NotFound();
    }

    el.appendChild(page.element);
    if (page.title) document.title = `${page.title} · Quoltix Finds`;
    if (page.description) setMetaDescription(page.description);
    currentCleanup = page.cleanup || null;

    el.classList.remove('route-leaving');
    el.classList.add('route-entering');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

    requestAnimationFrame(() => {
      el.classList.remove('route-entering');
    });

    Navbar.setActiveRoute(route);
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function setMetaDescription(text) {
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', text);
  }

  /** Programmatic navigation helper used by components (nav links, cards…). */
  function navigate(path) {
    if (window.location.hash === `#${path}`) {
      render();
    } else {
      window.location.hash = path;
    }
  }

  function init() {
    window.addEventListener('hashchange', render);
    window.addEventListener('popstate', render);
    render();
  }

  return { init, navigate, parseHash };
})();
