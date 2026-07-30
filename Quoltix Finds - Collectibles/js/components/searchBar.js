/**
 * SEARCH BAR (reusable)
 * ---------------------
 * Fires `onSearch(query)` (debounced) as the user types, and immediately
 * when cleared, so the parent page can restore its original layout.
 */
window.SearchBar = (function () {
  function create({ placeholder = 'Search…', onSearch }) {
    const html = `
      <div class="search-bar">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="7" cy="7" r="5.25" stroke="currentColor" stroke-width="1.4" fill="none"/>
          <path d="M11 11l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <input
          type="search"
          class="search-input"
          placeholder="${Utils.escapeHTML(placeholder)}"
          aria-label="${Utils.escapeHTML(placeholder)}"
        />
        <button class="search-clear" type="button" aria-label="Clear search" hidden>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </div>
    `;

    const el = Utils.fromHTML(html);
    const input = el.querySelector('.search-input');
    const clearBtn = el.querySelector('.search-clear');

    const debounced = Utils.debounce((val) => onSearch(val), 200);

    input.addEventListener('input', () => {
      clearBtn.hidden = input.value.length === 0;
      debounced(input.value);
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.hidden = true;
      onSearch('');
      input.focus();
    });

    return el;
  }

  return { create };
})();
