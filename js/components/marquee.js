/**
 * MARQUEE (reusable)
 * ------------------
 * A CSS-driven infinite ticker that never "runs dry" on wide screens.
 * It renders one copy of the items to measure their width, then works out
 * how many copies are needed to comfortably exceed the viewport, builds
 * two identical halves from that count, and animates translateX(-50%) —
 * so the loop is seamless no matter how wide the browser window is.
 */
window.Marquee = (function () {
  function create(items, options = {}) {
    const { speed = 60 } = options; // pixels per second, roughly

    const wrapper = Utils.fromHTML(`
      <div class="hero-ticker" aria-hidden="true">
        <div class="ticker-track"></div>
      </div>
    `);
    const track = wrapper.querySelector('.ticker-track');

    function buildSet() {
      return items.map((label) => `<span>${Utils.escapeHTML(label)}</span><span>·</span>`).join('');
    }

    // Measure one set off-screen first.
    const probe = document.createElement('div');
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.whiteSpace = 'nowrap';
    probe.className = 'ticker-track';
    probe.innerHTML = buildSet();
    document.body.appendChild(probe);
    const setWidth = probe.getBoundingClientRect().width || 400;
    document.body.removeChild(probe);

    const viewportWidth = Math.max(window.innerWidth, document.documentElement.clientWidth || 0, 1600);
    // Enough copies so ONE half alone already exceeds the viewport width.
    const copiesPerHalf = Math.max(2, Math.ceil(viewportWidth / setWidth) + 1);

    const halfHTML = buildSet().repeat(copiesPerHalf);
    track.innerHTML = halfHTML + halfHTML; // two identical halves → seamless -50% loop

    const totalHalfWidth = setWidth * copiesPerHalf;
    const duration = Math.max(12, totalHalfWidth / speed);
    track.style.animationDuration = `${duration}s`;

    return wrapper;
  }

  return { create };
})();
