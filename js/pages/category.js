window.Pages = window.Pages || {};

window.Pages.Category = function Category(slug) {
  const category = DataStore.getCategoryBySlug(slug);

  if (!category) {
    return window.Pages.NotFound({
      message: `We couldn't find a category called "${slug}".`
    });
  }

  const allProducts = DataStore.sortByNewest(DataStore.getProductsByCategory(category.slug));
  const trendingProducts = allProducts.slice(0, 4);

  const html = `
    <section class="category-header">
      <div class="category-header-media">
        <img src="${Utils.escapeHTML(category.image)}" alt="" loading="lazy" />
      </div>
      <div class="category-header-body">
        <a href="#/" class="breadcrumb">← All categories</a>
        <h1>${Utils.escapeHTML(category.name)}</h1>
        <p>${Utils.escapeHTML(category.description)}</p>
        <span class="category-header-count">${allProducts.length} piece${allProducts.length === 1 ? '' : 's'} in this category</span>
      </div>
    </section>

    <section class="section search-section" aria-label="Search this category">
      <div id="search-slot"></div>
    </section>

    <section class="section" id="search-results-section" hidden aria-labelledby="results-heading">
      <div class="section-head">
        <h2 id="results-heading">Search results</h2>
        <p id="results-count"></p>
      </div>
      <div id="results-grid-slot"></div>
    </section>

    <section class="section" id="trending-section" aria-labelledby="trending-heading">
      <div class="section-head">
        <h2 id="trending-heading">Trending in ${Utils.escapeHTML(category.name)}</h2>
        <p>The most recently added pieces in this category.</p>
      </div>
      <div id="trending-grid-slot"></div>
    </section>

    <section class="section" id="all-products-section" aria-labelledby="all-heading">
      <div class="section-head">
        <h2 id="all-heading">All ${Utils.escapeHTML(category.name)}</h2>
        <p>Sorted newest first.</p>
      </div>
      <div id="all-grid-slot"></div>
    </section>
  `;

  const element = Utils.fromHTML(`<div class="page page-category">${html}</div>`);

  // Search bar
  const searchSlot = element.querySelector('#search-slot');
  const searchResultsSection = element.querySelector('#search-results-section');
  const resultsGridSlot = element.querySelector('#results-grid-slot');
  const resultsCount = element.querySelector('#results-count');
  const trendingSection = element.querySelector('#trending-section');
  const allProductsSection = element.querySelector('#all-products-section');

  let resultsGrid = null;

  function showBrowseLayout() {
    searchResultsSection.hidden = true;
    trendingSection.hidden = false;
    allProductsSection.hidden = false;
  }

  function showSearchLayout(query) {
    trendingSection.hidden = true;
    allProductsSection.hidden = true;
    searchResultsSection.hidden = false;

    const matches = DataStore.sortByNewest(DataStore.searchProducts(allProducts, query));
    resultsCount.textContent = `${matches.length} result${matches.length === 1 ? '' : 's'} for "${query}"`;

    if (!resultsGrid) {
      resultsGrid = ProductGrid.create(matches, {
        pageSize: 8,
        emptyText: `No pieces match "${query}". Try a different name or SKU.`
      });
      resultsGridSlot.appendChild(resultsGrid.element);
    } else {
      resultsGrid.setProducts(matches);
    }
  }

  const search = SearchBar.create({
    placeholder: `Search ${category.name} by name or SKU…`,
    onSearch: (query) => {
      const trimmed = query.trim();
      if (trimmed.length === 0) {
        showBrowseLayout();
      } else {
        showSearchLayout(trimmed);
      }
    }
  });
  searchSlot.appendChild(search);

  // Trending grid (no pagination — small, fixed set)
  const trendingGrid = ProductGrid.create(trendingProducts, {
    showMore: false,
    badge: 'New',
    emptyText: 'Nothing trending yet — check back soon.'
  });
  element.querySelector('#trending-grid-slot').appendChild(trendingGrid.element);

  // All products grid (progressive loading)
  const allGrid = ProductGrid.create(allProducts, {
    pageSize: 8,
    emptyText: 'No products in this category yet.'
  });
  element.querySelector('#all-grid-slot').appendChild(allGrid.element);

  if (allProducts.length === 0) {
    trendingSection.hidden = true;
  }

  return {
    element,
    title: category.name,
    description: category.description
  };
};
