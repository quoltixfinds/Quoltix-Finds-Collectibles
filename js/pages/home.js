window.Pages = window.Pages || {};

window.Pages.Home = function Home() {
  const categories = DataStore.getCategories();
  const totalProducts = DataStore.getProducts().length;

  const html = `
    <section class="hero" aria-label="Introduction">
      <div class="hero-inner">
        <p class="eyebrow">A discovery layer for collectors</p>
        <h1 class="hero-title">
          Find the piece.<br />
          <span class="outline-text">We'll point the way.</span>
        </h1>
        <p class="hero-sub">
          Quoltix Finds curates the collectibles worth owning — no checkout, no clutter.
          Browse a category, hit <em>View</em>, and we hand you off to where it's sold.
        </p>
        <div id="ticker-slot"></div>
        <div class="hero-stats">
          <div><strong>${categories.length}</strong><span>${categories.length === 1 ? 'Category' : 'Categories'}</span></div>
          <div><strong>${totalProducts}</strong><span>Pieces indexed</span></div>
          <div><strong>0%</strong><span>Checkout friction</span></div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="categories-heading">
      <div class="section-head">
        <h2 id="categories-heading">Browse categories</h2>
        <p>Every category below is generated straight from the catalog — pick one to start exploring.</p>
      </div>
      <div class="category-grid" id="category-grid"></div>
    </section>

    <section class="section" aria-labelledby="trending-all-heading">
      <div class="section-head">
        <h2 id="trending-all-heading">Trending across Quoltix Finds</h2>
        <p>The newest pieces added, pulled from every category.</p>
      </div>
      <div id="trending-all-slot"></div>
    </section>

    <section class="section about-section" aria-labelledby="about-heading">
      <div class="about-grid">
        <div class="about-statement">
          <p class="eyebrow">Why Quoltix Finds exists</p>
          <h2 id="about-heading">We're not a store.<br />We're a filter.</h2>
          <p>
            Collectible marketplaces are noisy — endless listings, inconsistent quality, zero taste.
            Quoltix Finds does the sorting for you: every piece here was chosen, not crawled. We surface
            it, you decide, and one tap sends you straight to the retailer who actually sells it.
          </p>
        </div>
        <ul class="about-pillars">
          <li>
            <h3>Curated, not crawled</h3>
            <p>A human eye picks every casting, figure, and finish before it ever reaches this page.</p>
          </li>
          <li>
            <h3>Independent by design</h3>
            <p>We link out to the retailer — no listings hosted, no inventory, no middleman markup.</p>
          </li>
          <li>
            <h3>Zero checkout friction</h3>
            <p>Browse, hit View, done. The transaction happens where it always has — on their site.</p>
          </li>
        </ul>
      </div>
    </section>
  `;

  const element = Utils.fromHTML(`<div class="page page-home">${html}</div>`);
  const grid = element.querySelector('#category-grid');

  element
    .querySelector('#ticker-slot')
    .appendChild(Marquee.create(['CURATE', 'DISCOVER', 'COLLECT', 'REPEAT']));

  const trendingAll = DataStore.sortByNewest(DataStore.getProducts()).slice(0, 8);
  const trendingAllGrid = ProductGrid.create(trendingAll, {
    badge: 'New',
    emptyText: 'Nothing trending yet — check back soon.'
  });
  element.querySelector('#trending-all-slot').appendChild(trendingAllGrid.element);

  if (categories.length === 0) {
    grid.appendChild(Utils.fromHTML('<p class="grid-empty-inline">No categories yet — check back soon.</p>'));
  } else {
    categories.forEach((category) => grid.appendChild(CategoryCard.create(category)));
  }

  return {
    element,
    title: 'Quoltix Finds — Curated Collectibles Discovery',
    description:
      'Quoltix Finds is a curated discovery platform for collectibles — browse by category and get pointed straight to the source.'
  };
};
