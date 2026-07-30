/**
 * THEME TOGGLE (reusable)
 * -----------------------
 * Site defaults to dark mode. The toggle flips `data-theme` on <html>
 * between "dark" and "light" and remembers the visitor's choice.
 * The very first paint is handled by an inline script in <head> (see
 * index.html) so there's no flash of the wrong theme before this file
 * even loads.
 */
window.ThemeToggle = (function () {
  const STORAGE_KEY = 'quoltix-theme';

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* storage unavailable — theme just won't persist across visits */
    }
  }

  function create() {
    const html = `
      <button class="theme-toggle" type="button" aria-label="Switch to light mode" aria-pressed="false">
        <span class="theme-toggle-icon theme-icon-moon" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 20 20"><path d="M17.5 12.5A7.5 7.5 0 018 3a1 1 0 00-1.1 1.35A6.5 6.5 0 1016.15 13.6 1 1 0 0017.5 12.5z" fill="currentColor"/></svg>
        </span>
        <span class="theme-toggle-icon theme-icon-sun" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 20 20"><circle cx="10" cy="10" r="4" fill="currentColor"/><g stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M10 1.6v2.2M10 16.2v2.2M18.4 10h-2.2M3.8 10H1.6M15.9 4.1l-1.55 1.55M5.65 14.35L4.1 15.9M15.9 15.9l-1.55-1.55M5.65 5.65L4.1 4.1"/></g></svg>
        </span>
      </button>
    `;

    const el = Utils.fromHTML(html);

    function sync() {
      const theme = getTheme();
      const goingTo = theme === 'dark' ? 'light' : 'dark';
      el.setAttribute('aria-pressed', String(theme === 'light'));
      el.setAttribute('aria-label', `Switch to ${goingTo} mode`);
      el.classList.toggle('is-light', theme === 'light');
    }

    el.addEventListener('click', () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
      sync();
    });

    sync();
    return el;
  }

  return { create, getTheme, setTheme };
})();
