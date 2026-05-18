/* ============================================================
   SYSTENGER · interactividad
   - i18n live switch (es / en / pt)
   - hero slider (autoplay + progreso)
   - scroll reveal
   - contadores
   - header shrink en scroll
   - mobile menu
   ============================================================ */

(function () {
  const STORAGE_KEY = "systenger.lang";
  const SUPPORTED = ["es", "en", "pt"];
  const DEFAULT_LANG = "es";

  /* ---------------- i18n ---------------- */
  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    const dict = window.I18N[lang];
    const meta = window.I18N_META[lang];

    document.documentElement.lang = meta.lang;
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const spec = el.getAttribute("data-i18n-attr"); // e.g. "aria-label:nav.home"
      spec.split(",").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (dict[key] != null) el.setAttribute(attr, dict[key]);
      });
    });

    document.querySelectorAll("[data-lang]").forEach((el) => {
      el.classList.toggle("is-active", el.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initLangSwitch() {
    document.querySelectorAll("[data-lang]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        applyLang(el.getAttribute("data-lang"));
      });
    });
    let saved = DEFAULT_LANG;
    try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) {}
    applyLang(saved);
  }

  /* ---------------- hero slider ---------------- */
  function initHero() {
    const slides = document.querySelectorAll(".hero-slide");
    const bgs = document.querySelectorAll(".hero-bg");
    const fill = document.querySelector(".hero-bar .fill");
    const counter = document.querySelector(".hero-counter");
    if (!slides.length) return;

    const TICK = 60;
    const DURATION = 5400;
    let idx = 0;
    let elapsed = 0;

    function show(i) {
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      bgs.forEach((b, k) => b.classList.toggle("is-active", k === i));
      if (counter) {
        const pad = (n) => String(n).padStart(2, "0");
        counter.textContent = `${pad(i + 1)} / ${pad(slides.length)}`;
      }
      elapsed = 0;
      if (fill) fill.style.width = "0%";
    }
    show(0);

    setInterval(() => {
      elapsed += TICK;
      if (fill) fill.style.width = Math.min(100, (elapsed / DURATION) * 100) + "%";
      if (elapsed >= DURATION) {
        idx = (idx + 1) % slides.length;
        show(idx);
      }
    }, TICK);
  }

  /* ---------------- scroll reveal ---------------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------------- contadores ---------------- */
  function initCounters() {
    /* placeholders se mantienen como [XX] / #1. La animación queda
       lista para cuando reemplaces los valores con números reales:
       agrega data-target="120" al .counter para animar a 120.       */
    const counters = document.querySelectorAll(".counter[data-target]");
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseFloat(el.getAttribute("data-target"));
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1600;
      const start = performance.now();
      const startVal = 0;
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(startVal + (target - startVal) * eased);
        el.textContent = val.toLocaleString() + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => io.observe(c));
  }

  /* ---------------- header shrink ---------------- */
  function initHeader() {
    const header = document.querySelector("[data-header]");
    if (!header) return;
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------------- mobile menu ---------------- */
  function initMobileMenu() {
    const openBtn = document.querySelector("[data-open-menu]");
    const closeBtn = document.querySelector("[data-close-menu]");
    const panel = document.querySelector("[data-mobile-panel]");
    if (!openBtn || !panel) return;
    const open = () => {
      panel.classList.add("is-open");
      document.body.classList.add("no-scroll");
    };
    const close = () => {
      panel.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
    };
    openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* ---------------- year ---------------- */
  function initYear() {
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------------- page transition veil ---------------- */
  function initPageTransitions() {
    const veil = document.getElementById("__page-veil");
    if (!veil) return;

    // Fade veil out on page load (reveals content)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        veil.classList.add("is-hidden");
      });
    });

    // Fade veil in before navigating away
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.includes("://") ||
        a.getAttribute("target") === "_blank"
      ) return;
      e.preventDefault();
      veil.classList.remove("is-hidden");
      veil.classList.add("is-leaving");
      setTimeout(() => { window.location.href = href; }, 360);
    });
  }

  /* ---------------- init ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initPageTransitions();
    initLangSwitch();
    initHero();
    initReveal();
    initCounters();
    initHeader();
    initMobileMenu();
    initYear();
  });
})();
