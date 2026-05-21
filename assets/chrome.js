/* ============================================================
   SYSTENGER · chrome compartido
   Renderiza header + footer en cualquier página que tenga
   <div id="site-header"></div> y <div id="site-footer"></div>.

   Uso (al final del <body>):
     <div id="site-header"></div>
     ... contenido de la página ...
     <div id="site-footer"></div>
     <script src="/assets/image-slot.js"></script>
     <script src="/assets/chrome.js" data-page="about"></script>
     <script src="/assets/translations.js"></script>
     <script src="/assets/app.js"></script>

   data-page (en el <script>) acepta:
     home | about | metal | smartwall | industrial | processes | contact
   y activa el item correspondiente en el nav.
   ============================================================ */
(function () {
  // Anchor every nav href on the directory that contains this script,
  // not on absolute "/" — so navigation works both at the Vercel root
  // and inside the preview environment (which serves the project at a
  // non-root URL like /projects/<id>/).
  const SCRIPT_URL = (document.currentScript && document.currentScript.src) || '';
  const ROOT = SCRIPT_URL.replace(/\/assets\/chrome\.js(\?.*)?$/, '/') || '/';

  const PAGES = {
    home:        ROOT + "index.html",
    about:       ROOT + "sobre.html",
    metal:       ROOT + "unidades/estructuras-metalicas.html",
    smartwall:   ROOT + "unidades/smart-wall.html",
    industrial:  ROOT + "unidades/obras-industriales.html",
    processes:   ROOT + "procesos.html",
    facilities:  ROOT + "instalaciones.html",
    steel:       ROOT + "ventajas-del-acero.html",
    contact:     ROOT + "contacto.html",
  };

  const current = (document.currentScript && document.currentScript.dataset.page) || "home";

  const isActive = (k) => k === current ? "text-steel" : "";

  // Header: S monogram centralizado no meio da barra
  const LOGO_HEADER = `<img src="${ROOT}assets/img/s-clean.png" alt="Systenger" class="brand-s h-12 w-auto" />`;
  // Footer: bloco esquerdo da lockup oficial — S em cima, SYSTENGER e descritor embaixo (centralizado)
  const LOGO_FOOTER = `
    <div class="flex flex-col items-center text-center shrink-0 max-w-[180px]">
      <img src="${ROOT}assets/img/s-clean.png" alt="Systenger" class="brand-s h-14 w-auto" />
      <span class="text-white font-sans font-semibold tracking-[0.18em] text-[18px] leading-none mt-2">SYSTENGER</span>
      <span class="text-[10px] text-mut-dark/80 leading-tight mt-2" data-i18n="footer.descriptor">Construcción industrializada: precisa, segura y sin imprevistos.</span>
    </div>`;

  const HEADER_HTML = `
    <div id="__page-veil" aria-hidden="true"></div>
    <header data-header
            class="fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,padding] duration-300
                   bg-ink-1/0 backdrop-blur-0 [&.is-scrolled]:bg-ink-1/95 [&.is-scrolled]:backdrop-blur-md
                   border-b border-transparent [&.is-scrolled]:border-ink-4/60">
      <div class="max-w-8xl mx-auto px-6 lg:px-10">
        <div class="flex items-center justify-between h-20">

          <a href="${PAGES.home}" class="flex items-center" aria-label="Systenger - Inicio">
            ${LOGO_HEADER}
          </a>

          <nav class="hidden lg:flex items-center gap-0 flex-1 justify-center text-white">
            <a href="${PAGES.home}" class="nav-item px-2 py-2 text-[13px] hover:text-steel transition ${isActive("home")}" data-i18n="nav.home">Inicio</a>

            <div class="nav-item px-2 py-2 text-[13px] hover:text-steel transition cursor-default ${isActive("about")}">
              <span data-i18n="nav.institutional">Institucional</span>
              <svg class="inline -mt-1 ml-1 w-3 h-3" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.4"/></svg>
              <div class="nav-dropdown">
                <a href="${PAGES.about}" data-i18n="nav.institutional.about">Sobre Nosotros</a>
                <a href="${PAGES.about}#timeline" data-i18n="nav.institutional.timeline">Historia</a>
                <a href="${PAGES.about}#quality" data-i18n="nav.institutional.quality">Gestión de Calidad</a>
              </div>
            </div>

            <div class="nav-item px-2 py-2 text-[13px] hover:text-steel transition cursor-default ${["metal","smartwall","industrial"].includes(current) ? "text-steel" : ""}">
              <span data-i18n="nav.business">Unidades de Negocio</span>
              <svg class="inline -mt-1 ml-1 w-3 h-3" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.4"/></svg>
              <div class="nav-dropdown">
                <a href="${PAGES.metal}" data-i18n="nav.business.metal">Estructuras Metálicas</a>
                <a href="${PAGES.smartwall}" data-i18n="nav.business.smartwall">Fachadas Smart Wall</a>
                <a href="${PAGES.industrial}" data-i18n="nav.business.industrial">Obras Industriales</a>
              </div>
            </div>

            <a href="${PAGES.processes}" class="nav-item px-2 py-2 text-[13px] hover:text-steel transition ${isActive("processes")}" data-i18n="nav.processes">Procesos y Tecnología</a>
            <a href="${PAGES.facilities}" class="nav-item px-2 py-2 text-[13px] hover:text-steel transition ${isActive("facilities")}" data-i18n="nav.facilities">Instalaciones</a>
            <a href="${PAGES.steel}" class="nav-item px-2 py-2 text-[13px] hover:text-steel transition ${isActive("steel")}" data-i18n="nav.steel">Ventajas del Acero</a>
            <a href="${PAGES.contact}" class="nav-item px-2 py-2 text-[13px] hover:text-steel transition ${isActive("contact")}" data-i18n="nav.contact">Contacto</a>
          </nav>

          <div class="flex items-center gap-3 text-white">
            <a href="${PAGES.contact}" class="hidden md:inline-flex btn btn-primary" data-i18n="nav.quote">Solicitar Cotización</a>

            <button class="lg:hidden w-10 h-10 inline-flex items-center justify-center border border-ink-4/60" data-open-menu aria-label="Menu">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" stroke-width="1.5"/></svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="mobile-panel fixed inset-0 z-[60] bg-ink-1 text-white lg:hidden" data-mobile-panel>
      <div class="flex items-center justify-between px-6 h-20 border-b border-ink-4">
        <div class="font-bold tracking-[0.18em] text-sm">SYSTENGER</div>
        <button class="w-10 h-10 inline-flex items-center justify-center border border-ink-4" data-close-menu aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.5"/></svg>
        </button>
      </div>
      <nav class="px-6 py-8 flex flex-col gap-1 text-xl">
        <a href="${PAGES.home}" class="py-3 border-b border-ink-3" data-i18n="nav.home">Inicio</a>
        <a href="${PAGES.about}" class="py-3 border-b border-ink-3" data-i18n="nav.institutional.about">Sobre Nosotros</a>
        <a href="${PAGES.metal}" class="py-3 border-b border-ink-3" data-i18n="nav.business.metal">Estructuras Metálicas</a>
        <a href="${PAGES.smartwall}" class="py-3 border-b border-ink-3" data-i18n="nav.business.smartwall">Fachadas Smart Wall</a>
        <a href="${PAGES.industrial}" class="py-3 border-b border-ink-3" data-i18n="nav.business.industrial">Obras Industriales</a>
        <a href="${PAGES.processes}" class="py-3 border-b border-ink-3" data-i18n="nav.processes">Procesos y Tecnología</a>
        <a href="${PAGES.facilities}" class="py-3 border-b border-ink-3" data-i18n="nav.facilities">Instalaciones</a>
        <a href="${PAGES.steel}" class="py-3 border-b border-ink-3" data-i18n="nav.steel">Ventajas del Acero</a>
        <a href="${PAGES.contact}" class="py-3 border-b border-ink-3" data-i18n="nav.contact">Contacto</a>
      </nav>
      <div class="px-6 mt-4 flex items-center gap-2">
        <button class="lang-pill is-active" data-lang="es">ES</button>
        <button class="lang-pill" data-lang="en">EN</button>
        <button class="lang-pill" data-lang="pt">PT</button>
      </div>
    </div>`;

  const FOOTER_HTML = `
    <footer class="bg-ink-0 text-white">
      <div class="max-w-8xl mx-auto px-6 lg:px-10 py-20">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-ink-4">

          <div class="lg:col-span-4">
            <div class="flex items-stretch gap-5">
              ${LOGO_FOOTER}
              <div class="w-px bg-ink-4 self-stretch"></div>
              <div class="flex flex-col justify-center">
                <p class="text-white font-bold text-[22px] leading-[1.1] tracking-[-0.01em]" data-i18n="footer.tagline">Más rápido. Mejor. Sin sorpresas.</p>
                <p class="text-steel text-[13px] mt-3 leading-snug max-w-[26ch]" data-i18n="footer.subtagline">Industrializamos tu obra para maximizar tus resultados</p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-3">
            <div class="font-mono text-[11px] tracking-[0.18em] text-mut-dark mb-5 uppercase" data-i18n="footer.contact">Contacto</div>
            <ul class="space-y-3 text-sm">
              <li><a href="https://maps.app.goo.gl/2wHaBFnyYRKwtnqP8" target="_blank" rel="noopener" class="hover:text-steel transition" data-i18n="footer.address">Calle 7, San Francisco, Ciudad de Panamá</a></li>
              <li><a href="tel:+50730205532" class="hover:text-steel transition" data-i18n="footer.phone">+507 3020-5532</a></li>
              <li><a href="mailto:info@systenger.com" class="hover:text-steel transition" data-i18n="footer.email">info@systenger.com</a></li>
              <li><a href="mailto:comercial@systenger.com" class="hover:text-steel transition" data-i18n="footer.emailComercial">comercial@systenger.com</a></li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <div class="font-mono text-[11px] tracking-[0.18em] text-mut-dark mb-5 uppercase" data-i18n="footer.links">Enlaces</div>
            <ul class="space-y-3 text-sm">
              <li><a href="${PAGES.about}" class="hover:text-steel transition" data-i18n="nav.institutional.about">Sobre Nosotros</a></li>
              <li><a href="${PAGES.processes}" class="hover:text-steel transition" data-i18n="nav.processes">Procesos y Tecnología</a></li>
              <li><a href="${PAGES.contact}" class="hover:text-steel transition" data-i18n="footer.contactLink">Contacto</a></li>
            </ul>
          </div>

          <div class="lg:col-span-3">
            <div class="font-mono text-[11px] tracking-[0.18em] text-mut-dark mb-5 uppercase" data-i18n="footer.social">Seguinos</div>
            <div class="flex items-center gap-3 mb-8">
              <a href="https://twitter.com/Systenger" aria-label="Twitter" class="w-10 h-10 inline-flex items-center justify-center border border-ink-4 hover:border-steel hover:text-steel transition">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M10.5 0H12.7l-4.8 5.5L13.5 14H9.1L5.6 9.3 1.7 14H-.5l5.2-5.9L-1 0h4.5l3.2 4.3L10.5 0zm-.8 12.7h1.2L3.6 1.2H2.3l7.4 11.5z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" class="w-10 h-10 inline-flex items-center justify-center border border-ink-4 hover:border-steel hover:text-steel transition">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 5H0v9h3V5zm-1.5-4a1.7 1.7 0 100 3.5 1.7 1.7 0 000-3.5zM14 9.4c0-2.6-1.4-3.8-3.2-3.8-1.5 0-2.2.8-2.5 1.4V5H5.3v9h3V9c0-.8 0-1.7 1.2-1.7 1.1 0 1.2 1 1.2 1.7v5h3V9.4z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" class="w-10 h-10 inline-flex items-center justify-center border border-ink-4 hover:border-steel hover:text-steel transition">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="1" width="12" height="12" rx="3"/><circle cx="7" cy="7" r="3"/><circle cx="10.6" cy="3.4" r=".6" fill="currentColor"/></svg>
              </a>
            </div>

            <div class="font-mono text-[11px] tracking-[0.18em] text-mut-dark mb-3 uppercase" data-i18n="footer.language">Idioma</div>
            <div class="inline-flex items-center gap-1 border border-ink-4 px-1 py-1">
              <button class="lang-pill is-active" data-lang="es" aria-label="Español"><span class="inline-block mr-1.5">🇵🇦</span>ES</button>
              <button class="lang-pill" data-lang="en" aria-label="English"><span class="inline-block mr-1.5">🇺🇸</span>EN</button>
              <button class="lang-pill" data-lang="pt" aria-label="Português"><span class="inline-block mr-1.5">🇧🇷</span>PT</button>
            </div>
          </div>
        </div>

        <div class="pt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-xs text-mut-dark">
          <div data-i18n="footer.rights">© <span data-year>2026</span> Systenger. Todos los derechos reservados.</div>
          <div class="font-mono tracking-[0.12em]" data-i18n="footer.legal">Soluciones Estructurales para Obras Complejas</div>
        </div>
      </div>
    </footer>`;

  // Render synchronously (placeholders must exist before this script)
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.outerHTML = HEADER_HTML;
  if (f) f.outerHTML = FOOTER_HTML;
})();
