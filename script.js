const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ@#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(0).map(() => Math.random() * -100);

function drawMatrix() {
  ctx.fillStyle = "rgba(4, 10, 6, 0.07)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const y = drops[i] * fontSize;

    if (drops[i] > 0) {
      ctx.fillStyle = drops[i] % 3 === 0 ? "#00ff88" : "#00994d";
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
      ctx.fillText(char, i * fontSize, y);
    }

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += 0.5;
  }
}

window.addEventListener("resize", () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(0).map(() => Math.random() * -100);
});

setInterval(drawMatrix, 50);

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if (sections.length && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {      
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");

          const href = link.getAttribute("href");
          if (href === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach((section) => observer.observe(section));
}

const catCards = document.querySelectorAll(".category-card");
if (catCards.length) {
  catCards.forEach((card) => {
    card.addEventListener("click", () => {
      catCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
}

const fadeEls = document.querySelectorAll(".video-card, .path-card, .recurso-group, .blog-card, .section-header, .sugerencias-form");

if (fadeEls.length) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  fadeEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    fadeObserver.observe(el);
  });
}
const learningRoutes = {
  principiante: {
    tag: "ruta 01",
    title: "No sé nada de ciber",
    desc: "Empieza por lo esencial: amenazas comunes, hábitos seguros y conceptos base.",
    filterOrder: ["Introducción", "Ataques", "Privacidad", "Todos"],
    videos: [
      {
        title: "Introducción al canal",
        category: "Introducción",
        type: "youtube",
        url: "https://www.youtube.com/watch?v=lEinvhz9fLc&list=PLje9tFGVK-hBtHHm_V-BXeegZdTTVCCP5&index=2",
        thumbnailUrl: "https://i.ytimg.com/vi/lEinvhz9fLc/maxresdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/lEinvhz9fLc/hqdefault.jpg",
        badge: "Nuevo",
        description: "Presentación del canal, enfoque de la web y primeros conceptos de ciberseguridad sin humo.",
        resources: [
          {
            label: "Presentación PDF",
            url: "recursos/presentacion-ciberseguridad-intro.pdf"
          }
        ]
      },
      {
        title: "Phishing: qué es y cómo evitarlo",
        category: "Ataques",
        type: "youtube",
        url: "https://youtu.be/6_L84s6Jn4s",
        thumbnailUrl: "phishing-cover.jpg?v=2",
        thumbnailFallback: "https://i.ytimg.com/vi/6_L84s6Jn4s/hqdefault.jpg",
        badge: "Nuevo",
        description: "Qué es el phishing, cómo reconocer correos falsos y qué señales revisar antes de hacer clic.",
        resources: [
          {
            label: "MADPhisher",
            url: "https://github.com/SajidIbnNayeem/MadPhisher/blob/main/MadPhisher.sh"
          },
          {
            label: "Ejemplos Malwarebytes",
            url: "https://www.malwarebytes.com/es/cybersecurity/basics/phishing-email"
          }
        ]
      },
      {
        title: "Troyanos: qué son y cómo evitarlos",
        category: "Ataques",
        type: "youtube",
        url: "https://youtu.be/KnIAbzji1EM",
        thumbnailUrl: "troyano-cover.jpg?v=1",
        thumbnailFallback: "https://i.ytimg.com/vi/KnIAbzji1EM/hqdefault.jpg",
        badge: "Nuevo",
        description: "Explicación de qué es un troyano y una demo visual para entender cómo puede ocultarse una amenaza.",
        resources: [
          {
            label: "Diapositivas PDF",
            url: "recursos/diapositivas-troyanos-ciberseguridad.pdf"
          },
          {
            label: "Demo Pacman",
            url: "recursos/demo-troyano-pacman.html"
          }
        ]
      },
      {
        title: "Spyware: acceso a cámaras y cómo evitarlo",
        category: "Ataques",
        type: "youtube",
        url: "https://youtu.be/0Tlr-gDakCs",
        thumbnailUrl: "spyware-cover.jpg?v=1",
        thumbnailFallback: "https://i.ytimg.com/vi/0Tlr-gDakCs/hqdefault.jpg",
        badge: "Nuevo",
        description: "Cómo el spyware puede abusar del acceso a cámaras y qué medidas tomar para reducir riesgos.",
        resources: [
          {
            label: "HackCCTV",
            url: "https://github.com/mohammadmahdi-termux/hackCCTV"
          },
          {
            label: "Diapositivas PDF",
            url: "recursos/diapositivas-spyware-camaras.pdf"
          }
        ]
      },
      {
        title: "Spyware: keyloggers y robo de teclas",
        category: "Ataques",
        type: "youtube",
        url: "https://youtu.be/dY1H9PCTYyM",
        thumbnailUrl: "keylogger-cover.jpg?v=1",
        thumbnailFallback: "https://i.ytimg.com/vi/dY1H9PCTYyM/hqdefault.jpg",
        badge: "Nuevo",
        description: "Cómo funcionan los keyloggers, qué pueden registrar y qué señales ayudan a protegerte.",
        resources: [
          {
            label: "Diapositivas PDF",
            url: "recursos/diapositivas-keylogger.pdf"
          },
          {
            label: "Animación Keylogger",
            url: "recursos/animacion-keylogger.html"
          }
        ]
      },
      {
        title: "DDoS: ataques que tumban servicios",
        category: "Ataques",
        type: "placeholder",
        description: "Próximo vídeo sobre ataques de denegación de servicio y cómo saturan una web o servicio.",
        resources: [
          {
            label: "Diapositivas PDF",
            url: "recursos/diapositivas-ddos-ciber-sin-humo.pdf"
          },
          {
            label: "Animación DDoS",
            url: "recursos/animacion-ddos.html"
          }
        ]
      },
      {
        title: "MITM: el ataque del intermediario",
        category: "Ataques",
        type: "placeholder"
      },
      {
        title: "Ransomware: cuando secuestran tus archivos",
        category: "Ataques",
        type: "placeholder"
      },
      {
        title: "Contraseñas seguras sin complicarte",
        category: "Privacidad",
        type: "placeholder"
      }
    ]
  },
  privacidad: {
    tag: "ruta 02",
    title: "Quiero mejorar mi privacidad",
    desc: "Reduce exposición, mejora tus cuentas y entiende qué datos dejas por Internet.",
    videos: [
      {
        title: "Privacidad digital: por dónde empezar",
        category: "Privacidad",
        type: "placeholder"
      },
      {
        title: "VPN: cuándo sí y cuándo no sirven",
        category: "Privacidad",
        type: "placeholder"
      },
      {
        title: "Cómo proteger tu móvil en 10 minutos",
        category: "Móvil",
        type: "placeholder"
      }
    ]
  },
  sistema: {
    tag: "ruta 03",
    title: "Quiero entender cómo funciona todo esto",
    desc: "Una ruta para conectar redes, web, OSINT, herramientas y amenazas reales.",
    videos: [
      {
        title: "Cómo viaja una petición por Internet",
        category: "Redes",
        type: "placeholder"
      },
      {
        title: "Qué pasa cuando entras en una web",
        category: "Conceptos",
        type: "placeholder"
      },
      {
        title: "OSINT básico: buscar información pública",
        category: "OSINT",
        type: "placeholder"
      }
    ]
  }
};

const learningPaths = document.getElementById("learning-paths");
const routeView = document.getElementById("route-view");
const routeBack = document.getElementById("route-back");
const routeTag = document.getElementById("route-tag");
const routeTitle = document.getElementById("route-title");
const routeDesc = document.getElementById("route-desc");
const routeFilters = document.getElementById("route-filters");
const routeVideoGrid = document.getElementById("route-video-grid");
const searchView = document.getElementById("search-view");
const searchBack = document.getElementById("search-back");
const searchInput = document.getElementById("video-search");
const searchClear = document.getElementById("video-search-clear");
const searchDesc = document.getElementById("search-desc");
const searchVideoGrid = document.getElementById("search-video-grid");
let activeRoute = null;
let activeFilter = "Todos";

function videoMedia(video) {
  if (video.thumbnailUrl && video.url) {
    return `
      <a class="video-thumb-link" href="${video.url}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${video.title}">
        <img class="video-thumb-img" src="${video.thumbnailUrl}" alt="Portada de ${video.title}" loading="lazy"${video.thumbnailFallback ? ` onerror="this.onerror=null;this.src='${video.thumbnailFallback}'"` : ""}>
        <span class="video-play-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><polygon points="7,4 19,12 7,20"/></svg></span>
      </a>
    `;
  }

  if (video.type === "youtube" && video.embedUrl) {
    return `<iframe class="video-embed" src="${video.embedUrl}" title="${video.title}" allowfullscreen loading="lazy"></iframe>`;
  }

  if (video.type === "tiktok" && video.embedUrl) {
    return `<iframe class="video-embed" src="${video.embedUrl}" title="${video.title}" allowfullscreen loading="lazy"></iframe>`;
  }

  return `<div class="video-placeholder"><span>Próximamente</span></div>`;
}

function videoResources(video) {
  if (!video.resources || !video.resources.length) return "";

  return `
    <div class="video-resources" aria-label="Recursos del vídeo">
      <span class="video-resources-label">Recursos</span>
      <div class="video-resource-links">
        ${video.resources.map((resource) => `
          <a href="${resource.url}" target="_blank" rel="noopener noreferrer">${resource.label}</a>
        `).join("")}
      </div>
    </div>
  `;
}

function renderVideoCards(videos) {
  return videos.length ? videos.map((video) => `
    <article class="video-card" data-cat="${video.category}">
      <div class="video-thumb">
        ${videoMedia(video)}
        ${video.duration ? `<div class="video-duration">${video.duration}</div>` : ""}
        ${video.badge ? `<div class="video-badge">${video.badge}</div>` : ""}
      </div>
      <div class="video-hover-info">
        <span class="video-category">${video.category}</span>
        <h3 class="video-title">${video.url ? `<a href="${video.url}" target="_blank" rel="noopener noreferrer">${video.title}</a>` : video.title}</h3>
        ${video.description ? `<p class="video-desc">${video.description}</p>` : ""}
        ${videoResources(video)}
      </div>
    </article>
  `).join("") : `<div class="video-empty">Todavía no hay vídeos en esta categoría.</div>`;
}

function renderRouteVideos() {
  if (!activeRoute || !routeVideoGrid) return;

  const videos = activeRoute.videos.filter((video) => activeFilter === "Todos" || video.category === activeFilter);
  routeVideoGrid.innerHTML = renderVideoCards(videos);
}

function renderRouteFilters() {
  if (!activeRoute || !routeFilters) return;

  const routeCategories = [...new Set(activeRoute.videos.map((video) => video.category))];
  const preferredOrder = activeRoute.filterOrder || ["Todos", "Ataques", "Introducción", "Conceptos", "Privacidad", "Móvil", "Redes", "OSINT"];
  const orderedCategories = preferredOrder.includes("Todos")
    ? preferredOrder
    : ["Todos", ...preferredOrder];
  const categories = [
    ...orderedCategories.filter((category) => category === "Todos" || routeCategories.includes(category) || activeRoute.filterOrder?.includes(category)),
    ...routeCategories.filter((category) => !orderedCategories.includes(category))
  ];
  routeFilters.innerHTML = categories.map((category) => `
    <button class="filter-chip ${category === activeFilter ? "active" : ""}" type="button" data-filter="${category}">${category}</button>
  `).join("");
}

function openRoute(routeKey) {
  activeRoute = learningRoutes[routeKey];
  activeFilter = activeRoute?.filterOrder?.find((category) => category !== "Todos") || "Todos";
  if (!activeRoute || !learningPaths || !routeView) return;

  if (searchView) searchView.hidden = true;
  if (searchInput) searchInput.value = "";
  routeTag.textContent = activeRoute.tag;
  routeTitle.textContent = activeRoute.title;
  routeDesc.textContent = activeRoute.desc;
  learningPaths.classList.add("is-hidden");
  routeView.hidden = false;
  renderRouteFilters();
  renderRouteVideos();
}

if (learningPaths && routeView) {
  learningPaths.querySelectorAll("[data-route]").forEach((card) => {
    card.addEventListener("click", () => openRoute(card.dataset.route));
  });
}

document.querySelectorAll("[data-open-route]").forEach((button) => {
  button.addEventListener("click", () => openRoute(button.dataset.openRoute));
});

if (routeBack && learningPaths && routeView) {
  routeBack.addEventListener("click", () => {
    routeView.hidden = true;
    if (searchView) searchView.hidden = true;
    learningPaths.classList.remove("is-hidden");
    activeRoute = null;
  });
}

if (routeFilters) {
  routeFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    renderRouteFilters();
    renderRouteVideos();
  });
}

function normalizeSearch(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getAllVideos() {
  return Object.entries(learningRoutes).flatMap(([routeKey, route]) =>
    route.videos.map((video) => ({
      ...video,
      routeKey,
      routeTitle: route.title
    }))
  );
}

function getVideoSearchText(video) {
  return normalizeSearch([
    video.title,
    video.category,
    video.description,
    video.type === "placeholder" ? "proximamente próximo pendiente" : "video publicado youtube",
    video.routeTitle,
    ...(video.resources || []).flatMap((resource) => [resource.label, resource.url])
  ].filter(Boolean).join(" "));
}

function closeSearch() {
  if (searchView) searchView.hidden = true;
  if (learningPaths) learningPaths.classList.remove("is-hidden");
  if (routeView) routeView.hidden = true;
  activeRoute = null;
}

function renderSearchResults() {
  if (!searchInput || !searchView || !searchVideoGrid || !learningPaths) return;

  const query = normalizeSearch(searchInput.value.trim());
  if (!query) {
    closeSearch();
    return;
  }

  const terms = query.split(/\s+/).filter(Boolean);
  const results = getAllVideos().filter((video) => {
    const text = getVideoSearchText(video);
    return terms.every((term) => text.includes(term));
  });

  learningPaths.classList.add("is-hidden");
  if (routeView) routeView.hidden = true;
  searchView.hidden = false;
  if (searchDesc) {
    searchDesc.textContent = results.length
      ? `${results.length} resultado${results.length === 1 ? "" : "s"} para "${searchInput.value.trim()}".`
      : `No hay resultados para "${searchInput.value.trim()}".`;
  }
  searchVideoGrid.innerHTML = results.length
    ? renderVideoCards(results)
    : `<div class="video-empty">No hay resultados. Prueba con phishing, spyware, PDF, ataques o recursos.</div>`;
}

if (searchInput) {
  searchInput.addEventListener("input", renderSearchResults);
}

if (searchClear && searchInput) {
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    closeSearch();
  });
}

if (searchBack && searchInput) {
  searchBack.addEventListener("click", () => {
    searchInput.value = "";
    closeSearch();
  });
}

const sugerenciasForm = document.getElementById("sugerencias-form");

if (sugerenciasForm) {
  sugerenciasForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(sugerenciasForm);
    const destino = sugerenciasForm.dataset.email || "contenido@cibersinhumo.com";
    const status = document.getElementById("sugerencias-status");
    const nombre = (formData.get("nombre") || "Anónimo").toString().trim();
    const correo = (formData.get("correo") || "No indicado").toString().trim();
    const tipo = (formData.get("tipo") || "Sugerencia").toString().trim();
    const mensaje = (formData.get("mensaje") || "").toString().trim();

    if (!mensaje) {
      if (status) status.textContent = "Escribe una sugerencia antes de enviarla.";
      return;
    }

    const subject = `Sugerencia de contenido: ${tipo}`;
    const body = [
      "Nueva sugerencia desde Ciber Sin Humo",
      "",
      `Nombre: ${nombre || "Anónimo"}`,
      `Correo: ${correo || "No indicado"}`,
      `Tipo: ${tipo}`,
      "",
      "Sugerencia:",
      mensaje
    ].join("\n");

    const mailtoUrl = `mailto:${destino}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const gmailUrl = [
      "https://mail.google.com/mail/?view=cm&fs=1",
      `to=${encodeURIComponent(destino)}`,
      `su=${encodeURIComponent(subject)}`,
      `body=${encodeURIComponent(body)}`
    ].join("&");

    if (isMobile) {
      window.location.href = mailtoUrl;
    } else {
      const gmailWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");

      if (!gmailWindow) {
        window.location.href = mailtoUrl;
      }
    }

    if (status) {
      status.textContent = "Se abrirá tu app de correo con la sugerencia preparada para enviar.";
    }
  });
}

function loadGoogleTagManager(gtmId) {
  if (!gtmId || window.mantisGtmLoaded) return;

  window.mantisGtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js"
  });

  const firstScript = document.getElementsByTagName("script")[0];
  const gtmScript = document.createElement("script");
  gtmScript.async = true;
  gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
  firstScript.parentNode.insertBefore(gtmScript, firstScript);
}

function ensureCookieBanner() {
  let banner = document.getElementById("cookie-banner");
  if (banner) return banner;

  banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.id = "cookie-banner";
  banner.hidden = true;
  banner.innerHTML = `
    <div>
      <strong>Cookies</strong>
      <p>Usamos cookies técnicas y, si aceptas, Google Tag Manager/Analytics para medir visitas y mejorar el contenido. Puedes aceptar o rechazar las cookies no necesarias.</p>
    </div>
    <div class="cookie-actions">
      <button type="button" class="btn btn-secondary" data-cookie-action="reject">Rechazar</button>
      <button type="button" class="btn btn-primary" data-cookie-action="accept">Aceptar</button>
    </div>
  `;
  document.body.appendChild(banner);
  return banner;
}

const cookieBannerEnabled = document.body.dataset.cookieBanner === "enabled";
const gtmId = document.body.dataset.gtmId;

if (cookieBannerEnabled) {
  const cookieBanner = ensureCookieBanner();
  const cookieChoice = localStorage.getItem("mantis_cookie_choice");

  function showCookieBanner() {
    cookieBanner.hidden = false;
    cookieBanner.classList.add("is-visible");
  }

  if (cookieChoice === "accept") {
    loadGoogleTagManager(gtmId);
  } else if (!cookieChoice) {
    showCookieBanner();
  }

  cookieBanner.querySelectorAll("[data-cookie-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.cookieAction || "reject";
      localStorage.setItem("mantis_cookie_choice", choice);
      cookieBanner.classList.remove("is-visible");
      cookieBanner.hidden = true;

      if (choice === "accept") {
        loadGoogleTagManager(gtmId);
      }
    });
  });

  document.querySelectorAll("[data-open-cookie-settings]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem("mantis_cookie_choice");
      showCookieBanner();
    });
  });
}
/* Splash screen */
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  if (!splash) return;

  setTimeout(() => {
    splash.classList.add("hidden");

    setTimeout(() => {
      splash.style.display = "none";
    }, 600);
  }, 3000);
});
