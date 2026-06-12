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

const fadeEls = document.querySelectorAll(".video-card, .path-card, .recurso-group, .blog-card, .section-header, .sugerencias-form, .ip-tool, .security-checklist");

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

const heroTypewriter = document.getElementById("hero-typewriter");

if (heroTypewriter) {
  const phrases = (heroTypewriter.dataset.phrases || "")
    .split("|")
    .map((phrase) => phrase.trim())
    .filter(Boolean);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (phrases.length && !reduceMotion) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeNext = () => {
      const currentPhrase = phrases[phraseIndex];
      heroTypewriter.textContent = currentPhrase.slice(0, charIndex);

      if (!deleting && charIndex < currentPhrase.length) {
        charIndex += 1;
        window.setTimeout(typeNext, 58);
        return;
      }

      if (!deleting && charIndex >= currentPhrase.length) {
        deleting = true;
        window.setTimeout(typeNext, 1450);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex -= 1;
        window.setTimeout(typeNext, 32);
        return;
      }

      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      window.setTimeout(typeNext, 260);
    };

    heroTypewriter.textContent = "";
    typeNext();
  }
}
const heroCmdForm = document.getElementById("hero-cmd-form");
const heroCmdInput = document.getElementById("hero-cmd-input");
const heroCmdOutput = document.getElementById("hero-cmd-output");

if (heroCmdForm && heroCmdInput && heroCmdOutput) {
  const responses = {
    help: "Comandos: help, ip, dns, puertos, phishing, malware, vpn, redes, wireshark, hash, firewall, videos, whoami, clear.",
    ip: "IP pública: dirección con la que sales a Internet. Sirve para identificar tu conexión de forma aproximada.",
    dns: "DNS traduce nombres como cibersinhumo.es a direcciones IP que los equipos pueden entender.",
    puertos: "Los puertos son puertas lógicas de comunicación. Por ejemplo: 80 HTTP, 443 HTTPS, 22 SSH.",
    phishing: "Phishing: engaño para robar datos. Revisa enlace, remitente, urgencia y faltas raras.",
    malware: "Malware es software malicioso: troyanos, spyware, ransomware, keyloggers y más.",
    vpn: "Una VPN cifra tu conexión y oculta tu IP a la web final, pero no te vuelve invulnerable.",
    redes: "Empieza por IP, DNS, puertos y paquetes. Luego Wireshark empieza a tener sentido.",
    wireshark: "Wireshark permite ver paquetes de red. Es como mirar el tráfico que viaja por tu conexión.",
    hash: "Un hash es una huella digital de datos. Si el archivo cambia, su hash también cambia.",
    firewall: "Un firewall filtra conexiones permitidas o bloqueadas según reglas de seguridad.",
    videos: "Abre la sección Vídeos y empieza por la ruta 'No sé nada de ciber'.",
    whoami: "Usuario: principiante curioso con permisos para aprender.",
  };

  const addCmdLine = (html) => {
    const line = document.createElement("p");
    line.innerHTML = html;
    heroCmdOutput.appendChild(line);
    heroCmdOutput.scrollTop = heroCmdOutput.scrollHeight;
  };

  heroCmdForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = heroCmdInput.value.trim();
    if (!value) return;
    const command = value.toLowerCase();
    heroCmdInput.value = "";

    if (command === "clear" || command === "cls") {
      heroCmdOutput.innerHTML = "<p>Consola limpia. Escribe <strong>help</strong> para ver comandos.</p>";
      return;
    }

    addCmdLine(`<span class="cmd-ok">C:\Users\Yoel&gt;</span> ${value}`);
    addCmdLine(responses[command] || `<span class="cmd-error">'${value}' no se reconoce.</span> Prueba con <strong>help</strong>.`);
  });
}

const learningRoutes = {
  principiante: {
    tag: "ruta 01",
    title: "No sé nada de ciber",
    desc: "Empieza por lo esencial: amenazas comunes, hábitos seguros y conceptos base.",
    filterOrder: ["Introducción", "Ataques", "Historia", "Privacidad", "Todos"],
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
        title: "WannaCry: qué fue y por qué marcó la historia",
        category: "Historia",
        type: "youtube",
        url: "https://youtu.be/a4BePy8pXfA",
        thumbnailUrl: "https://i.ytimg.com/vi/a4BePy8pXfA/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/a4BePy8pXfA/mqdefault.jpg",
        badge: "Nuevo",
        description: "Qué fue WannaCry, por qué se volvió tan famoso y qué enseñó sobre la ciberseguridad moderna."
      },
      {
        title: "Pakenham y los USB: qué pasó",
        category: "Historia",
        type: "youtube",
        url: "https://youtu.be/CIIkmf8C9NI",
        thumbnailUrl: "https://i.ytimg.com/vi/CIIkmf8C9NI/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/CIIkmf8C9NI/mqdefault.jpg",
        badge: "Nuevo",
        description: "Caso real explicado de forma sencilla: qué pasó en Pakenham con los USB y qué lecciones deja."
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
        title: "DDoS: qué es y cómo funciona",
        category: "Ataques",
        type: "youtube",
        url: "https://youtu.be/4p54sndQGYU",
        thumbnailUrl: "https://i.ytimg.com/vi/4p54sndQGYU/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/4p54sndQGYU/mqdefault.jpg",
        badge: "Nuevo",
        description: "Qué es un ataque DDoS, cómo puede saturar una web o servicio y ejemplos para entenderlo fácil.",
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
        title: "Ransomware: qué es y cómo funciona",
        category: "Ataques",
        type: "youtube",
        url: "https://youtu.be/aD9RRjgCsW4",
        thumbnailUrl: "https://i.ytimg.com/vi/aD9RRjgCsW4/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/aD9RRjgCsW4/mqdefault.jpg",
        badge: "Nuevo",
        description: "Qué es un ransomware, cómo puede cifrar archivos y por qué puede bloquear tus datos.",
        resources: [
          {
            label: "Diapositivas PDF",
            url: "recursos/diapositivas-ransomware.pdf"
          },
          {
            label: "Animación Ransomware",
            url: "recursos/animacion-ransomware.html"
          }
        ]
      },
      {
        title: "MITM: qué es un ataque del intermediario",
        category: "Ataques",
        type: "youtube",
        url: "https://youtu.be/qZityrltI0k",
        thumbnailUrl: "https://i.ytimg.com/vi/qZityrltI0k/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/qZityrltI0k/mqdefault.jpg",
        badge: "Nuevo",
        description: "Qué es un ataque Man-in-the-Middle y cómo un intermediario puede espiar o modificar una comunicación.",
        resources: [
          {
            label: "Diapositivas PDF",
            url: "recursos/diapositivas-mitm.pdf"
          },
          {
            label: "Animación MITM",
            url: "recursos/animacion-mitm.html"
          }
        ]
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
    title: "Aplicar la teoría a la práctica",
    desc: "Herramientas, pruebas guiadas y pequeños laboratorios para aprender haciendo.",
    filterOrder: ["Intro", "Pruebas prácticas", "Redes", "Contraseñas", "Análisis", "Todos"],
    videos: [
      {
        title: "Máquinas virtuales y VirtualBox: intro al laboratorio",
        category: "Intro",
        type: "youtube",
        url: "https://youtu.be/bL8H_mR0BFw",
        thumbnailUrl: "https://i.ytimg.com/vi/bL8H_mR0BFw/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/bL8H_mR0BFw/mqdefault.jpg",
        badge: "Nuevo",
        description: "Qué es una máquina virtual, para qué sirve en ciberseguridad y cómo empezar con VirtualBox."
      },
      {
        title: "Escaneo de puertos: qué hay abierto y por qué importa",
        category: "Pruebas prácticas",
        type: "placeholder"
      },
      {
        title: "Wireshark: mirar el tráfico de red sin perderte",
        category: "Redes",
        type: "placeholder"
      },
      {
        title: "John the Ripper: cómo se prueban contraseñas",
        category: "Contraseñas",
        type: "placeholder"
      },
      {
        title: "Mini laboratorio: practicar sin liarla en tu ordenador",
        category: "Pruebas prácticas",
        type: "placeholder"
      }
    ]
  },
  sistema: {
    tag: "ruta 03",
    title: "Entender informática para entender ciber",
    desc: "Conceptos de informática que luego se aplican a redes, análisis, sistemas y seguridad.",
    filterOrder: ["Redes", "Web", "Sistemas", "Conceptos", "Todos"],
    videos: [
      {
        title: "IPs: IPv4, IPv6, públicas y privadas",
        category: "Redes",
        type: "youtube",
        url: "https://youtu.be/eGTbt5cqBXA",
        thumbnailUrl: "https://i.ytimg.com/vi/eGTbt5cqBXA/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/eGTbt5cqBXA/mqdefault.jpg",
        badge: "Nuevo",
        description: "Introducción clara a las direcciones IP: IPv4, IPv6, públicas, privadas, fijas y dinámicas.",
        resources: [
          {
            label: "Presentación PDF",
            url: "recursos/presentacion-ip.pdf"
          }
        ]
      },
      {
        title: "VPN: qué son y cuándo sirven",
        category: "Redes",
        type: "youtube",
        url: "https://youtu.be/I6KqB5QsIGo",
        thumbnailUrl: "https://i.ytimg.com/vi/I6KqB5QsIGo/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/I6KqB5QsIGo/mqdefault.jpg",
        badge: "Nuevo",
        description: "Qué es una VPN, cuándo aporta privacidad y qué cosas no soluciona por sí sola.",
        resources: [
          {
            label: "Diapositivas PDF",
            url: "recursos/diapositivas-vpn.pdf"
          }
        ]
      },
      {
        title: "Qué pasa cuando entras en una web",
        category: "Web",
        type: "youtube",
        url: "https://youtu.be/pjC6xG8Ncpg",
        thumbnailUrl: "https://i.ytimg.com/vi/pjC6xG8Ncpg/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/pjC6xG8Ncpg/mqdefault.jpg",
        badge: "Nuevo",
        description: "Qué ocurre desde que escribes una dirección web hasta que la página carga en tu navegador."
      },
      {
        title: "Qué es la deep web: desmitificándola",
        category: "Web",
        type: "youtube",
        url: "https://youtu.be/loFOXBIBABk",
        thumbnailUrl: "https://i.ytimg.com/vi/loFOXBIBABk/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/loFOXBIBABk/mqdefault.jpg",
        badge: "Nuevo",
        description: "Explicación sencilla de los conceptos web que ayudan a entender mejor la ciberseguridad."
      },
      {
        title: "Sistemas operativos: procesos, permisos y archivos",
        category: "Sistemas",
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
const searchDesc = document.getElementById("search-desc");
const searchVideoGrid = document.getElementById("search-video-grid");
const searchChips = document.querySelectorAll("[data-search-chip]");
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

if (searchBack && searchInput) {
  searchBack.addEventListener("click", () => {
    searchInput.value = "";
    closeSearch();
  });
}

if (searchChips.length && searchInput) {
  searchChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      searchInput.value = chip.dataset.searchChip;
      renderSearchResults();
      searchInput.focus();
    });
  });
}

const sugerenciasForm = document.getElementById("sugerencias-form");

if (sugerenciasForm) {
  const suggestionText = sugerenciasForm.querySelector('textarea[name="mensaje"]');
  const emailInput = sugerenciasForm.querySelector('input[name="correo"]');
  const generateEmailButton = document.getElementById("generate-email-btn");
  const suggestionCount = document.getElementById("suggestion-count");
  const suggestionLiveText = document.getElementById("suggestion-live-text");

  if (suggestionText) {
    suggestionText.addEventListener("input", () => {
      const length = suggestionText.value.trim().length;
      if (suggestionCount) suggestionCount.textContent = length.toString();
      if (suggestionLiveText) {
        suggestionLiveText.textContent = length
          ? "Idea detectada. Preparando señal para enviar..."
          : "Esperando tu idea...";
      }
    });
  }

  if (generateEmailButton && emailInput) {
    generateEmailButton.addEventListener("click", () => {
      const randomId = Math.random().toString(36).slice(2, 8);
      emailInput.value = `anon-${randomId}@alias.cibersinhumo.es`;
      emailInput.dispatchEvent(new Event("input", { bubbles: true }));
      if (suggestionLiveText) {
        suggestionLiveText.textContent = "Alias generado. Puedes enviar sin dar tu correo real.";
      }
    });
  }

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

const checkIpButton = document.getElementById("check-ip-btn");
const ipStatus = document.getElementById("ip-status");
const ipCountryVisual = document.getElementById("ip-country-visual");
const ipGlobe = document.getElementById("ip-globe");
const ipFields = document.querySelectorAll("[data-ip-field]");
const securityChecks = document.querySelectorAll("[data-security-check]");
const securityScore = document.getElementById("security-score");
const securityScoreLabel = document.getElementById("security-score-label");
const securityProgressBar = document.getElementById("security-progress-bar");
const securityCheckStatus = document.getElementById("security-check-status");
const resetSecurityChecks = document.getElementById("reset-security-checks");
let ipGlobeData = null;
let ipMarker = null;
let ipRotX = -0.12;
let ipRotY = 0.35;
let ipDragging = false;
let ipLastX = 0;
let ipLastY = 0;

function updateSecurityChecklist() {
  if (!securityChecks.length) return;

  const checked = [...securityChecks].filter((item) => item.checked).length;
  const total = securityChecks.length;
  const percent = Math.round((checked / total) * 100);

  if (securityScore) securityScore.textContent = checked.toString();
  if (securityProgressBar) securityProgressBar.style.width = `${percent}%`;

  let label = "Nivel inicial";
  let status = "Empieza marcando lo que ya haces.";

  if (checked >= total) {
    label = "Blindaje muy sólido";
    status = "Muy bien. Tienes la base bastante cubierta.";
  } else if (checked >= 6) {
    label = "Muy buen nivel";
    status = "Vas fuerte. Te quedan pocos ajustes para cerrar lo básico.";
  } else if (checked >= 3) {
    label = "Base en progreso";
    status = "Buen comienzo. Sigue completando puntos clave.";
  } else if (checked > 0) {
    label = "Primeras defensas";
    status = "Ya has empezado. Cada punto reduce superficie de riesgo.";
  }

  if (securityScoreLabel) securityScoreLabel.textContent = label;
  if (securityCheckStatus) securityCheckStatus.textContent = status;
}

if (securityChecks.length) {
  securityChecks.forEach((item) => item.addEventListener("change", updateSecurityChecklist));
  if (resetSecurityChecks) {
    resetSecurityChecks.addEventListener("click", () => {
      securityChecks.forEach((item) => {
        item.checked = false;
      });
      updateSecurityChecklist();
    });
  }
  updateSecurityChecklist();
}

function setIpField(name, value) {
  const field = document.querySelector(`[data-ip-field="${name}"]`);
  if (field) field.textContent = value || "--";
}

function ipNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeCountryName(value) {
  const countryMap = {
    ES: "España",
    US: "Estados Unidos",
    GB: "Reino Unido",
    FR: "Francia",
    DE: "Alemania",
    IT: "Italia",
    PT: "Portugal",
    MX: "México",
    AR: "Argentina",
    CO: "Colombia",
    CL: "Chile",
    PE: "Perú",
    BR: "Brasil"
  };

  if (!value) return value;
  const cleanValue = String(value).trim();
  return countryMap[cleanValue.toUpperCase()] || cleanValue;
}

function normalizeProviderName(value) {
  if (!value) return value;
  const cleanValue = String(value).trim();
  return /telefonica|telefónica/i.test(cleanValue) ? "Movistar" : cleanValue;
}

function normalizeIpData(data, providerName) {
  if (!data || data.success === false || data.status === "fail" || data.error) return null;

  const loc = typeof data.loc === "string" ? data.loc.split(",").map(Number) : [];
  const latitude = ipNumber(data.latitude ?? data.lat ?? loc[0]);
  const longitude = ipNumber(data.longitude ?? data.lon ?? loc[1]);
  const timezone = typeof data.timezone === "object" ? data.timezone.id : data.timezone;
  const provider = data.connection?.isp || data.connection?.org || data.org || data.isp || data.organization_name || data.asn?.name;
  const country = data.country || data.country_name || data.country_code;

  return {
    ip: data.ip || data.query,
    provider: normalizeProviderName(provider),
    country: normalizeCountryName(country),
    city: data.city,
    region: data.region || data.regionName,
    timezone,
    latitude,
    longitude,
    source: providerName
  };
}

async function fetchWithTimeout(url, timeout = 6500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchIpInfo() {
  const providers = [
    { name: "ipwho.is", url: "https://ipwho.is/?fields=success,message,ip,country,city,region,latitude,longitude,connection,timezone" },
    { name: "ipapi.co", url: "https://ipapi.co/json/" },
    { name: "geojs.io", url: "https://get.geojs.io/v1/ip/geo.json" }
  ];

  let lastError = null;

  for (const provider of providers) {
    try {
      const data = await fetchWithTimeout(provider.url);
      const normalized = normalizeIpData(data, provider.name);
      if (normalized?.ip) return normalized;
      lastError = new Error(data?.message || `Respuesta no v?lida de ${provider.name}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("No se pudo consultar la IP");
}

function ipLatLonTo3D(lat, lon, r) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta)
  };
}

function ipProject(point, width, height, r) {
  const cosX = Math.cos(ipRotX);
  const sinX = Math.sin(ipRotX);
  const cosY = Math.cos(ipRotY);
  const sinY = Math.sin(ipRotY);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;
  const y2 = point.y * cosX + z1 * sinX;
  const z2 = -point.y * sinX + z1 * cosX;

  return {
    x: width / 2 + x1,
    y: height / 2 - y2,
    z: z2,
    visible: z2 > -r * 0.08
  };
}

function drawIpPolygon(ctx, coords, width, height, r) {
  ctx.beginPath();
  let started = false;

  coords.forEach((coord) => {
    const projected = ipProject(ipLatLonTo3D(coord[1], coord[0], r * 1.002), width, height, r);
    if (!projected.visible) {
      started = false;
      return;
    }
    if (!started) {
      ctx.moveTo(projected.x, projected.y);
      started = true;
    } else {
      ctx.lineTo(projected.x, projected.y);
    }
  });

  if (started) ctx.stroke();
}

function drawIpCountries(ctx, width, height, r) {
  if (!ipGlobeData) return;

  ctx.strokeStyle = "rgba(0, 255, 136, 0.34)";
  ctx.lineWidth = 0.7;

  ipGlobeData.features.forEach((feature) => {
    const geometry = feature.geometry;
    if (!geometry) return;

    if (geometry.type === "Polygon") {
      geometry.coordinates.forEach((ring) => drawIpPolygon(ctx, ring, width, height, r));
    }

    if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach((polygon) => {
        polygon.forEach((ring) => drawIpPolygon(ctx, ring, width, height, r));
      });
    }
  });
}

function drawIpGrid(ctx, width, height, r) {
  ctx.strokeStyle = "rgba(0, 255, 136, 0.16)";
  ctx.lineWidth = 0.6;

  for (let lat = -60; lat <= 60; lat += 30) {
    ctx.beginPath();
    let started = false;
    for (let lon = -180; lon <= 180; lon += 6) {
      const projected = ipProject(ipLatLonTo3D(lat, lon, r), width, height, r);
      if (!projected.visible) started = false;
      else if (!started) {
        ctx.moveTo(projected.x, projected.y);
        started = true;
      } else {
        ctx.lineTo(projected.x, projected.y);
      }
    }
    ctx.stroke();
  }

  for (let lon = -150; lon <= 180; lon += 30) {
    ctx.beginPath();
    let started = false;
    for (let lat = -85; lat <= 85; lat += 5) {
      const projected = ipProject(ipLatLonTo3D(lat, lon, r), width, height, r);
      if (!projected.visible) started = false;
      else if (!started) {
        ctx.moveTo(projected.x, projected.y);
        started = true;
      } else {
        ctx.lineTo(projected.x, projected.y);
      }
    }
    ctx.stroke();
  }
}

function drawIpMarker(ctx, width, height, r) {
  if (!ipMarker) return;

  const projected = ipProject(ipLatLonTo3D(ipMarker.lat, ipMarker.lon, r * 1.04), width, height, r);
  if (!projected.visible) return;

  ctx.beginPath();
  ctx.arc(projected.x, projected.y, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#00ff88";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(projected.x, projected.y, 16, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 255, 136, 0.62)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(projected.x, projected.y + 7);
  ctx.lineTo(projected.x, projected.y + 28);
  ctx.strokeStyle = "rgba(0, 255, 136, 0.52)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function renderIpGlobe() {
  if (!ipGlobe) return;

  const ctx = ipGlobe.getContext("2d");
  const rect = ipGlobe.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(240, Math.floor(rect.width || 320));
  const height = Math.max(240, Math.floor(rect.height || 320));
  const r = Math.min(width, height) * 0.43;

  if (ipGlobe.width !== Math.floor(width * dpr) || ipGlobe.height !== Math.floor(height * dpr)) {
    ipGlobe.width = Math.floor(width * dpr);
    ipGlobe.height = Math.floor(height * dpr);
    ipGlobe.style.width = `${width}px`;
    ipGlobe.style.height = `${height}px`;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.save();

  const gradient = ctx.createRadialGradient(width * 0.36, height * 0.28, r * 0.08, width / 2, height / 2, r);
  gradient.addColorStop(0, "rgba(120, 255, 184, 0.18)");
  gradient.addColorStop(0.62, "rgba(0, 255, 136, 0.08)");
  gradient.addColorStop(1, "rgba(2, 8, 5, 0.96)");

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.clip();

  drawIpGrid(ctx, width, height, r);
  drawIpCountries(ctx, width, height, r);
  drawIpMarker(ctx, width, height, r);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 255, 136, 0.45)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

function focusIpGlobe(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
  ipMarker = { lat, lon };
  ipRotX = Math.max(-0.95, Math.min(0.95, -lat * Math.PI / 180));
  ipRotY = (lon + 90) * Math.PI / 180;
  renderIpGlobe();
}

async function loadIpGlobeMap() {
  if (!ipGlobe) return;

  try {
    const topology = await fetchWithTimeout("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json", 9000);

    if (!window.topojson) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    ipGlobeData = window.topojson.feature(topology, topology.objects.countries);
    renderIpGlobe();
  } catch (error) {
    console.error("Error cargando globo IP:", error);
    renderIpGlobe();
  }
}

if (ipGlobe) {
  ipGlobe.addEventListener("pointerdown", (event) => {
    ipDragging = true;
    ipLastX = event.clientX;
    ipLastY = event.clientY;
    ipGlobe.setPointerCapture?.(event.pointerId);
  });

  ipGlobe.addEventListener("pointermove", (event) => {
    if (!ipDragging) return;
    const dx = event.clientX - ipLastX;
    const dy = event.clientY - ipLastY;
    ipLastX = event.clientX;
    ipLastY = event.clientY;
    ipRotY += dx * 0.01;
    ipRotX = Math.max(-0.9, Math.min(0.9, ipRotX + dy * 0.01));
    renderIpGlobe();
  });

  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    ipGlobe.addEventListener(eventName, () => {
      ipDragging = false;
    });
  });

  window.addEventListener("resize", renderIpGlobe);
  renderIpGlobe();
  loadIpGlobeMap();
}

if (checkIpButton && ipFields.length) {
  checkIpButton.addEventListener("click", async () => {
    checkIpButton.disabled = true;
    if (ipStatus) ipStatus.textContent = "Consultando tu IP pública...";

    try {
      const data = await fetchIpInfo();

      setIpField("ip", data.ip);
      setIpField("provider", data.provider);
      setIpField("country", data.country);
      setIpField("city", data.city);
      setIpField("region", data.region);
      setIpField("timezone", data.timezone);

      if (ipCountryVisual) ipCountryVisual.textContent = data.country || "Ubicación detectada";
      focusIpGlobe(data.latitude, data.longitude);
      if (ipStatus) ipStatus.textContent = `Datos aproximados según la IP pública de tu conexión. Fuente: ${data.source}.`;
    } catch (error) {
      console.error("Error consultando IP:", error);
      if (ipStatus) ipStatus.textContent = "No se pudo consultar la IP ahora mismo. Puede ser un bloqueo de red, navegador o proveedor externo.";
    } finally {
      checkIpButton.disabled = false;
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
    }, 450);
  }, 2100);
});
