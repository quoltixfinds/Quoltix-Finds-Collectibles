/**
 * NAVBAR (persistent)
 * -------------------
 * Rendered once into #app-navbar and never re-created on route changes.
 * The "Products" dropdown is generated entirely from DataStore.getCategories(),
 * so a new category automatically appears here with zero extra code.
 */
window.Navbar = (function () {
  let rootEl = null;

  function render() {
    const categories = DataStore.getCategories();

    const dropdownItems = categories
      .map(
        (c) => `
        <li>
          <a href="#/category/${Utils.escapeHTML(c.slug)}" class="dropdown-link" data-slug="${Utils.escapeHTML(c.slug)}">
            ${Utils.escapeHTML(c.name)}
          </a>
        </li>`
      )
      .join('');

    const html = `
      <div class="nav-inner">
        <a href="#/" class="brand" aria-label="Quoltix Finds home">
          <span class="brand-text">Quoltix Finds <em>- Collectibles</em></span>
        </a>

        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-menu">
          <span></span><span></span><span></span>
        </button>

        <nav class="nav-menu" id="nav-menu" aria-label="Primary">
          <a href="#/" class="nav-link" data-route="home">Home</a>

          <div class="nav-dropdown" id="products-dropdown">
            <button class="nav-link nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false" id="products-trigger">
              Products
              <svg class="chev" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <ul class="dropdown-menu" id="products-menu" role="menu">
              ${dropdownItems || '<li class="dropdown-empty">No categories yet</li>'}
            </ul>
          </div>

          <div id="theme-toggle-slot"></div>
        </nav>
      </div>
    `;

    rootEl = Utils.fromHTML(`<header class="navbar" role="banner">${html}</header>`);
    rootEl.querySelector('#theme-toggle-slot').appendChild(ThemeToggle.create());
    bindEvents(rootEl);
    return rootEl;
  }

  function bindEvents(root) {
    const toggle = root.querySelector('#nav-toggle');
    const menu = root.querySelector('#nav-menu');
    const trigger = root.querySelector('#products-trigger');
    const dropdown = root.querySelector('#products-dropdown');

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.classList.toggle('is-open', isOpen);
    });

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-open');
      }
    });

    // Close mobile menu / dropdown after navigating.
    root.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-open');
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /** Highlight current section in the nav (called by router after each render). */
  function setActiveRoute(route) {
    if (!rootEl) return;
    rootEl.querySelectorAll('.nav-link, .dropdown-link').forEach((el) => el.classList.remove('is-active'));

    if (route.name === 'home') {
      rootEl.querySelector('[data-route="home"]')?.classList.add('is-active');
    } else if (route.name === 'category') {
      rootEl.querySelector(`.dropdown-link[data-slug="${route.params.slug}"]`)?.classList.add('is-active');
    }
  }

  return { render, setActiveRoute };
})();
