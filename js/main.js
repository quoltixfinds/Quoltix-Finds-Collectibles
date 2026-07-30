/**
 * APP BOOTSTRAP
 * -------------
 * Mounts the persistent Navbar and Footer exactly once, then hands
 * control to the Router, which only ever touches #app-content.
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const navbarSlot = document.getElementById('app-navbar');
    const footerSlot = document.getElementById('app-footer');

    navbarSlot.appendChild(Navbar.render());
    footerSlot.appendChild(Footer.render());

    Router.init();
  });
})();
