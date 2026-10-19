// R&SVP – Hio Ridge: the one script. Menu dialog, the home bar after scroll, one reveal, the year,
// the inquiry form's prefill and a client-side check. No dependencies. Everything works without it.
(function () {
  "use strict";
  var d = document;

  // Year
  d.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  // Menu: a dialog with a focus trap. Esc closes; focus returns to the Menu button.
  var openBtn = d.querySelector("[data-menu-open]");
  var menu = d.getElementById("menu");
  if (openBtn && menu) {
    var closeBtn = menu.querySelector("[data-menu-close]");
    var focusables = function () { return Array.prototype.slice.call(menu.querySelectorAll("a[href], button")); };
    var open = function () { menu.hidden = false; openBtn.setAttribute("aria-expanded", "true"); d.body.style.overflow = "hidden"; closeBtn.focus(); };
    var close = function () { menu.hidden = true; openBtn.setAttribute("aria-expanded", "false"); d.body.style.overflow = ""; openBtn.focus(); };
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    menu.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    menu.querySelectorAll("a[href]").forEach(function (a) { a.addEventListener("click", function () { menu.hidden = true; d.body.style.overflow = ""; }); });
  }

  // Home bar: transparent over the hero, paper after 80px. One writer, a pure function of scrollY.
  var bar = d.querySelector("[data-bar]");
  if (bar && d.body.classList.contains("home")) {
    var ticking = false;
    var apply = function () { bar.classList.toggle("is-scrolled", window.scrollY > 80); ticking = false; };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }, { passive: true });
    apply();
  }

  // Reveal: section headings fade up once, when they arrive.
  var reveals = d.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Lightbox: one <dialog>, fed by the gallery buttons. Arrow keys move, Esc closes (native), focus returns.
  var lb = d.querySelector("[data-lightbox]");
  var items = Array.prototype.slice.call(d.querySelectorAll(".gal-item"));
  if (lb && items.length && typeof lb.showModal === "function") {
    var img = lb.querySelector("img"), cur = 0, opener = null;
    var show = function (i) { cur = (i + items.length) % items.length; img.src = items[cur].getAttribute("data-full"); img.alt = items[cur].getAttribute("data-alt"); };
    items.forEach(function (btn, i) { btn.addEventListener("click", function () { opener = btn; show(i); lb.showModal(); }); });
    lb.querySelector("[data-lb-close]").addEventListener("click", function () { lb.close(); });
    lb.querySelector("[data-lb-prev]").addEventListener("click", function () { show(cur - 1); });
    lb.querySelector("[data-lb-next]").addEventListener("click", function () { show(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") show(cur + 1); if (e.key === "ArrowLeft") show(cur - 1); });
    lb.addEventListener("close", function () { img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="; if (opener) opener.focus(); });
  }

  // Inquiry form: prefill the type from ?type=, check required fields, announce errors.
  var form = d.querySelector("form.form");
  if (form) {
    var type = new URLSearchParams(location.search).get("type");
    var sel = form.querySelector("#f-type");
    if (type && sel && sel.querySelector('option[value="' + type + '"]')) sel.value = type;
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      var bad = [];
      form.querySelectorAll("[required]").forEach(function (el) {
        var ok = el.value.trim() !== "" && (el.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
        el.setAttribute("aria-invalid", ok ? "false" : "true");
        if (!ok) bad.push(el);
      });
      if (bad.length) {
        e.preventDefault();
        status.hidden = false;
        status.textContent = bad.length === 1 ? "Please fill in " + bad[0].labels[0].firstChild.textContent.trim().toLowerCase() + "." : "Please fill in your name and a valid email address.";
        bad[0].focus();
        return;
      }
      status.hidden = true;
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = "Sending";
    });
    form.querySelectorAll("[required]").forEach(function (el) { el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true" && el.value.trim()) el.setAttribute("aria-invalid", "false"); }); });
  }
})();
