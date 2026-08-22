/* Theme toggle, shared by every page.
 *
 * The nav markup itself is written into each page rather than injected here:
 * a nav that appears only once JavaScript runs flashes on load and disappears
 * entirely if the module fails, and this site is meant to be readable either
 * way. This file only does the part that genuinely needs script. */
(function () {
  // Dark is the default; remember an explicit choice.
  if (localStorage.getItem("theme") === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }

  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    + 'stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3'
    + 'a7 7 0 0 0 9.8 9.8z"/></svg>';
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
    + 'stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/>'
    + '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2'
    + 'M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  function sync() {
    var btn = document.getElementById("theme");
    if (!btn) return;
    var light = document.documentElement.getAttribute("data-theme") === "light";
    // Show the theme you would switch *to*, which is the usual convention.
    btn.innerHTML = light ? MOON : SUN;
    btn.title = light ? "Switch to dark" : "Switch to light";
    btn.setAttribute("aria-label", btn.title);
  }

  function wire() {
    var btn = document.getElementById("theme");
    if (!btn) return;
    sync();
    btn.addEventListener("click", function () {
      var light = document.documentElement.getAttribute("data-theme") === "light";
      if (light) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
      sync();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire);
  } else {
    wire();
  }
})();
