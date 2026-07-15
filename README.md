# Quoltix Finds — Collectibles Discovery

A vanilla HTML/CSS/JS single-page app for discovering collectibles and
handing visitors off to affiliate links. No frameworks, no build step —
open `index.html` (ideally through a local server, see below) and it runs.

## Running it

Because the app loads data/JS as separate `<script>` files, open it through
a local server rather than double-clicking the file (browsers restrict some
features on `file://`):

```bash
cd quoltix-finds
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Architecture

```
index.html            → app shell: #app-navbar, #app-content, #app-footer
css/styles.css         → entire design system (grayscale tokens, dark/light)
js/data/
  categories.js        → ALL categories — add new categories here
  products.js           → ALL products — add new products here
js/core/
  utils.js             → DOM/string helpers
  dataStore.js         → data access layer (search, sort, lookups)
  router.js            → hash-based SPA router (#/…), back/forward support
js/components/         → reusable, framework-free UI pieces:
  navbar.js, footer.js (persistent), productCard.js, categoryCard.js,
  searchBar.js, productGrid.js (progressive loading), loading.js (skeletons/spinner)
js/pages/               → one file per route, each returns { element, title, cleanup }
  home.js, category.js, redirect.js, notFound.js
js/main.js             → bootstraps navbar/footer once, starts the router
```

### How rendering works

`index.html` mounts the Navbar and Footer **once**. The Router only ever
replaces the contents of `#app-content`, so navigation never causes a full
page reload and the Navbar/Footer stay persistent. Routes are read from
`location.hash`, so back/forward buttons work natively via the
`hashchange`/`popstate` events.

### Adding a new category (the only thing required)

1. Open `js/data/categories.js` and add an object:
   ```js
   { slug: 'action-figures', name: 'Action Figures', tagline: '…', description: '…', image: '…' }
   ```
2. Open `js/data/products.js` and add products with `categorySlug: 'action-figures'`.

That's it — the homepage category grid, the Products nav dropdown, the
footer links, and the new category's page (header, search, trending, all
products, progressive loading) all appear automatically. No HTML or other
JS needs to change.

### Data → API later

`DataStore` (js/core/dataStore.js) is the only place that reads
`window.APP_DATA`. To swap the static arrays for a real backend, change the
functions in that one file to `fetch()` calls — nothing else in the app
touches the data directly.

### Design system

Strictly grayscale, tokenized in `css/styles.css` as CSS custom properties,
swapped automatically for dark mode using `prefers-color-scheme`. Product
and category photography is forced through `filter: grayscale(1)` so any
source image stays on-theme. Typography: Space Grotesk (display), Inter
(body), JetBrains Mono (SKUs / utility labels — a nod to catalog codes).
