/**
 * Shared utility helpers. Kept dependency-free on purpose.
 */
window.Utils = (function () {
  /** Create a DOM element from an HTML string (single root element expected). */
  function fromHTML(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  /** Escape user-provided text before interpolating into innerHTML. */
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = String(str ?? '');
    return div.innerHTML;
  }

  /** Debounce a function by `wait` ms. */
  function debounce(fn, wait = 250) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  /** Slugify text for use in ids/classes. */
  function slugify(str) {
    return String(str)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  /** Human readable relative-ish date, e.g. "Jul 12, 2026". */
  function formatDate(isoString) {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  /** Empty a node efficiently. */
  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  return { fromHTML, escapeHTML, debounce, slugify, formatDate, clear };
})();
