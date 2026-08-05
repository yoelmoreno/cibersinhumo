const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const chars = "01#$%&ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
        title: "Intro Ciber Sin Humo",
        category: "Introducción",
        type: "youtube",
        url: "https://youtu.be/BbOSYx6WNMs",
        thumbnailUrl: "https://i.ytimg.com/vi/BbOSYx6WNMs/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/BbOSYx6WNMs/hqdefault.jpg",
        badge: "Intro",
        description: "Vídeo de introducción para empezar por la primera carpeta de la ruta principiante.",
        resources: []
      },
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
        title: "Ataques típicos: ejemplos y cómo reconocerlos",
        category: "Ataques",
        type: "youtube",
        url: "https://youtu.be/ESWsMfTj7oM",
        thumbnailUrl: "https://i.ytimg.com/vi/ESWsMfTj7oM/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/ESWsMfTj7oM/mqdefault.jpg",
        badge: "Nuevo",
        description: "Repaso sencillo de ataques habituales para aprender a identificarlos y entender cómo funcionan."
      },
    ]
  },
  privacidad: {
    tag: "ruta 02",
    title: "Aplicar la teoría a la práctica",
    desc: "Herramientas, pruebas guiadas y pequeños laboratorios para aprender haciendo.",
    filterOrder: ["Intro", "Pruebas prácticas", "Redes", "Contraseñas", "Análisis", "Otros", "Todos"],
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
        title: "Abrí la terminal de Linux y parecía una casa abandonada",
        category: "Intro",
        type: "youtube",
        url: "https://youtu.be/3t8Esks_Idg",
        thumbnailUrl: "https://i.ytimg.com/vi/3t8Esks_Idg/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/3t8Esks_Idg/mqdefault.jpg",
        badge: "Nuevo",
        description: "Primer contacto con la terminal de Linux: comandos básicos, estructura y cómo empezar sin perderte."
      },
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
        title: "Tu móvil tiene matrícula: así funcionan las direcciones MAC",
        category: "Redes",
        type: "youtube",
        url: "https://youtu.be/BLKqTM585WM",
        thumbnailUrl: "https://i.ytimg.com/vi/BLKqTM585WM/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/BLKqTM585WM/mqdefault.jpg",
        badge: "Nuevo",
        description: "Explicación sencilla de qué es una dirección MAC, para qué sirve y por qué identifica a tus dispositivos en una red."
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
        title: "Conceptos web para entender ciberseguridad",
        category: "Web",
        type: "youtube",
        url: "https://youtu.be/0-Qw8mUtL84",
        thumbnailUrl: "https://i.ytimg.com/vi/0-Qw8mUtL84/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/0-Qw8mUtL84/mqdefault.jpg",
        badge: "Nuevo",
        description: "Explicación sencilla de conceptos web importantes para entender mejor la ciberseguridad."
      },
      {
        title: "Cómo funciona una web por dentro",
        category: "Web",
        type: "youtube",
        url: "https://youtu.be/IsmWOCmjz44",
        thumbnailUrl: "https://i.ytimg.com/vi/IsmWOCmjz44/hqdefault.jpg",
        thumbnailFallback: "https://i.ytimg.com/vi/IsmWOCmjz44/mqdefault.jpg",
        badge: "Nuevo",
        description: "Explicación sencilla para entender mejor cómo funcionan las páginas web y qué partes intervienen."
      },
    ]
  }
};

learningRoutes.privacidad.videos = [
  ...learningRoutes.privacidad.videos.filter((video) => video.type !== "placeholder"),
  {
    title: "Así te investigan sin hackearte: OSINT y metadatos",
    category: "Pruebas prácticas",
    type: "youtube",
    url: "https://youtu.be/xM_I3vHrprA",
    thumbnailUrl: "https://i.ytimg.com/vi/xM_I3vHrprA/hqdefault.jpg",
    thumbnailFallback: "https://i.ytimg.com/vi/xM_I3vHrprA/mqdefault.jpg",
    badge: "Nuevo",
    description: "Prueba práctica para entender cómo se puede investigar información pública sin hackear nada."
  },
  {
    title: "¿Qué hacer si un virus roba todas tus contraseñas?",
    category: "Otros",
    type: "youtube",
    url: "https://youtu.be/FzjM9Imdb8Q",
    thumbnailUrl: "https://i.ytimg.com/vi/FzjM9Imdb8Q/hqdefault.jpg",
    thumbnailFallback: "https://i.ytimg.com/vi/FzjM9Imdb8Q/mqdefault.jpg",
    badge: "Nuevo",
    description: "Qué hacer si un malware roba contraseñas, qué pasos tomar y cómo reducir el daño después de una infección."
  }
];

Object.values(learningRoutes).forEach((route) => {
  route.videos = route.videos.filter((video) => video.type !== "placeholder");
  if (Array.isArray(route.filterOrder)) {
    route.filterOrder = route.filterOrder.filter((category) =>
      category === "Todos" || route.videos.some((video) => video.category === category)
    );
  }
});

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



const channelSuggestionForms = document.querySelectorAll(".channel-suggestion-form");

channelSuggestionForms.forEach((form) => {
  const emailInput = form.querySelector('input[name="correo"]');
  const messageInput = form.querySelector('textarea[name="mensaje"]');
  const aliasButton = form.querySelector(".channel-alias-btn");
  const status = form.querySelector(".channel-suggestion-status");

  aliasButton?.addEventListener("click", () => {
    const randomId = Math.random().toString(36).slice(2, 8);
    if (emailInput) emailInput.value = `anon-${randomId}@alias.cibersinhumo.es`;
    if (status) status.textContent = "Alias generado.";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const destino = form.dataset.email || "mantislabs.es@gmail.com";
    const correo = (emailInput?.value || "No indicado").trim();
    const mensaje = (messageInput?.value || "").trim();

    if (!mensaje) {
      if (status) status.textContent = "Escribe una idea antes de enviarla.";
      return;
    }

    const subject = "Idea para el siguiente vídeo";
    const body = [
      "Nueva idea para el siguiente vídeo desde Ciber Sin Humo",
      "",
      `Correo: ${correo || "No indicado"}`,
      "",
      "Idea:",
      mensaje
    ].join("\n");

    const endpoint = form.dataset.endpoint;
    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, mensaje, subject })
        });
        if (!response.ok) throw new Error("No enviado");
        if (status) status.textContent = "Idea enviada. Gracias.";
        form.reset();
        return;
      } catch (error) {
        if (status) status.textContent = "No se pudo enviar directo. Abro correo.";
      }
    }

    const mailtoUrl = `mailto:${destino}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = [
      "https://mail.google.com/mail/?view=cm&fs=1",
      `to=${encodeURIComponent(destino)}`,
      `su=${encodeURIComponent(subject)}`,
      `body=${encodeURIComponent(body)}`
    ].join("&");

    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = mailtoUrl;
    } else {
      const gmailWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");
      if (!gmailWindow) window.location.href = mailtoUrl;
    }

    if (status) status.textContent = "Se abrirá tu correo con la idea preparada.";
  });
});

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

  const localLatestVideos = [
    {
      url: "https://www.youtube.com/watch?v=BbOSYx6WNMs",
      thumbnail: "https://i.ytimg.com/vi/BbOSYx6WNMs/hqdefault.jpg",
      category: "Intro",
      title: "Intro Ciber Sin Humo",
    },
    {
      url: "https://www.youtube.com/watch?v=3t8Esks_Idg",
      thumbnail: "https://i.ytimg.com/vi/3t8Esks_Idg/hqdefault.jpg",
      category: "Linux",
      title: "Abrí la terminal de Linux y parecía una casa abandonada",
    },
    {
      url: "https://www.youtube.com/watch?v=BLKqTM585WM",
      thumbnail: "https://i.ytimg.com/vi/BLKqTM585WM/hqdefault.jpg",
      category: "Redes",
      title: "Tu móvil tiene matrícula: así funcionan las direcciones MAC",
    },
  ];

  localLatestVideos.unshift({
    url: "https://www.youtube.com/watch?v=xM_I3vHrprA",
    thumbnail: "https://i.ytimg.com/vi/xM_I3vHrprA/hqdefault.jpg",
    category: "OSINT",
    title: "Así te investigan sin hackearte: OSINT y metadatos",
  });
  localLatestVideos.length = Math.min(localLatestVideos.length, 3);

  const renderLatestVideos = (videos) => {
    if (!latestEl || !Array.isArray(videos) || !videos.length) return;
    latestEl.innerHTML = videos.slice(0, 3).map((video) => `
      <a class="latest-video-card" href="${escapeHtml(video.url)}" target="_blank" rel="noopener">
        <img src="${escapeHtml(video.thumbnail || "logo-cibersinhumo-transparent.png?v=1")}" alt="Portada del video" loading="lazy">
        <span><small>${escapeHtml(video.category || "YouTube")}</small><strong>${escapeHtml(video.title)}</strong></span>
      </a>
    `).join("");
  };

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
      lastError = new Error(data?.message || `Respuesta no válida de ${provider.name}`);
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
(() => {
  const splash = document.getElementById("splash");
  if (!splash) return;

  const releaseSplash = window.releaseCiberSplash || (() => {
    splash.classList.add("hidden");
    setTimeout(() => {
      splash.style.display = "none";
      splash.setAttribute("aria-hidden", "true");
    }, 520);
  });

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(releaseSplash, 2300);
  }, { once: true });

  window.addEventListener("load", () => {
    setTimeout(releaseSplash, 900);
  }, { once: true });

  setTimeout(releaseSplash, 3600);
})();


const glossaryTerms = [
  { name: "IP", category: "Redes", icon: "IP", definition: "Direccion que identifica un dispositivo o conexion dentro de una red.", simple: "Es como la direccion postal de un equipo en Internet o en tu red local.", example: "Una web ve tu IP publica cuando te conectas a ella.", related: ["DNS", "Router", "Subred"] },
  { name: "VPN", category: "Privacidad", icon: "VPN", definition: "Conexion cifrada que envia tu trafico a traves de un servidor intermedio.", simple: "Es un tunel privado entre tu dispositivo e Internet.", example: "En una Wi-Fi publica, una VPN puede anadir una capa extra de privacidad.", related: ["Proxy", "Cifrado", "IP"] },
  { name: "DNS", category: "Redes", icon: "DNS", definition: "Sistema que traduce nombres de dominio a direcciones IP.", simple: "Convierte cibersinhumo.es en la direccion que entiende la red.", example: "Cuando escribes una web, tu equipo pregunta al DNS donde esta.", related: ["Dominio", "IP", "URL"] },
  { name: "Dominio", category: "Web", icon: "DOM", definition: "Nombre legible que apunta a un recurso de Internet.", simple: "Es el nombre facil de recordar de una web.", example: "cibersinhumo.es es un dominio.", related: ["DNS", "URL", "Servidor"] },
  { name: "URL", category: "Web", icon: "URL", definition: "Direccion completa de un recurso en Internet.", simple: "Es la ruta exacta para llegar a una pagina o archivo.", example: "https://cibersinhumo.es/recursos", related: ["HTTPS", "Dominio", "Navegador"] },
  { name: "HTTP", category: "Web", icon: "HTTP", definition: "Protocolo usado para transferir paginas web.", simple: "La forma en la que navegador y servidor hablan.", example: "Una pagina antigua puede cargar por HTTP sin cifrado.", related: ["HTTPS", "Servidor", "Cliente"] },
  { name: "HTTPS", category: "Web", icon: "TLS", definition: "Version cifrada de HTTP que protege la comunicacion.", simple: "HTTP con candado.", example: "Evita que alguien lea facilmente lo que envias a una web.", related: ["HTTP", "Cifrado", "Certificado"] },
  { name: "Puerto", category: "Redes", icon: "443", definition: "Numero que identifica un servicio dentro de un dispositivo.", simple: "Como una puerta concreta por la que entra un tipo de trafico.", example: "443 suele usarse para HTTPS y 22 para SSH.", related: ["Firewall", "Nmap", "Servidor"] },
  { name: "Firewall", category: "Seguridad", icon: "FW", definition: "Sistema que filtra conexiones segun reglas.", simple: "Decide que trafico entra y que trafico se bloquea.", example: "Puede bloquear conexiones entrantes a puertos peligrosos.", related: ["Puerto", "Router", "Red local"] },
  { name: "Router", category: "Redes", icon: "RTR", definition: "Dispositivo que conecta redes y dirige el trafico.", simple: "El aparato que reparte Internet en casa.", example: "Tu router conecta tu red local con Internet.", related: ["IP", "Wi-Fi", "Red local"] },
  { name: "Servidor", category: "Web", icon: "SRV", definition: "Equipo o servicio que entrega recursos a clientes.", simple: "El ordenador que responde cuando visitas una web.", example: "Un servidor web envia HTML, CSS y JS al navegador.", related: ["Cliente", "HTTP", "Dominio"] },
  { name: "Cliente", category: "Web", icon: "CLI", definition: "Dispositivo o programa que solicita recursos a un servidor.", simple: "Tu navegador cuando pide una pagina.", example: "Chrome actua como cliente al cargar una web.", related: ["Servidor", "Navegador", "HTTP"] },
  { name: "Wi-Fi", category: "Redes", icon: "WIFI", definition: "Tecnologia para conectar dispositivos sin cables a una red.", simple: "Internet sin cable dentro de casa, clase o cafeteria.", example: "Una Wi-Fi publica puede ser menos segura que tu red de casa.", related: ["Router", "VPN", "Red local"] },
  { name: "Red local", category: "Redes", icon: "LAN", definition: "Conjunto de dispositivos conectados dentro de un entorno cercano.", simple: "La red de tu casa o instituto.", example: "Tu movil y tu portatil pueden estar en la misma LAN.", related: ["Router", "IP", "MAC Address"] },
  { name: "Phishing", category: "Ataques", icon: "PH", definition: "Engano que intenta robar datos haciendose pasar por alguien fiable.", simple: "Un mensaje falso para que piques.", example: "Un correo que imita a tu banco y pide iniciar sesion.", related: ["Ingenieria social", "Credential stuffing", "2FA"] },
  { name: "Malware", category: "Malware", icon: "MW", definition: "Software creado para causar dano, espiar o tomar control.", simple: "Programa malicioso.", example: "Un archivo descargado que roba informacion del equipo.", related: ["Virus", "Troyano", "Spyware"] },
  { name: "Troyano", category: "Malware", icon: "TR", definition: "Malware que se disfraza de programa legitimo.", simple: "Parece normal, pero trae sorpresa.", example: "Un falso juego que instala una puerta trasera.", related: ["Backdoor", "Malware", "Payload"] },
  { name: "Ransomware", category: "Malware", icon: "R$", definition: "Malware que cifra archivos y pide un rescate.", simple: "Secuestra tus archivos.", example: "WannaCry cifraba sistemas vulnerables y pedia dinero.", related: ["Cifrado", "Malware", "Backup"] },
  { name: "Spyware", category: "Malware", icon: "SPY", definition: "Software que espia actividad o recopila datos sin permiso.", simple: "Te observa sin que lo sepas.", example: "Puede intentar acceder a camara, microfono o historial.", related: ["Keylogger", "Malware", "Privacidad"] },
  { name: "Keylogger", category: "Malware", icon: "KEY", definition: "Herramienta que registra pulsaciones del teclado.", simple: "Apunta lo que escribes.", example: "Puede capturar contrasenas si no hay protecciones.", related: ["Spyware", "2FA", "Malware"] },
  { name: "DDoS", category: "Ataques", icon: "DOS", definition: "Ataque que satura un servicio con muchas peticiones.", simple: "Demasiado trafico hasta tumbar una web.", example: "Una botnet enviando solicitudes a la vez.", related: ["Botnet", "Servidor", "Firewall"] },
  { name: "Vulnerabilidad", category: "Seguridad", icon: "VUL", definition: "Debilidad que puede ser aprovechada para atacar un sistema.", simple: "Un fallo de seguridad.", example: "Una version antigua con un bug explotable.", related: ["CVE", "Exploit", "Zero-day"] },
  { name: "CVE", category: "Seguridad", icon: "CVE", definition: "Identificador publico de una vulnerabilidad conocida.", simple: "El DNI de un fallo de seguridad.", example: "CVE-2021-44228 identifica Log4Shell.", related: ["Vulnerabilidad", "Exploit", "Patch"] },
  { name: "Exploit", category: "Ataques", icon: "EXP", definition: "Codigo o tecnica que aprovecha una vulnerabilidad.", simple: "La forma de usar un fallo para conseguir algo.", example: "Un exploit puede ejecutar codigo en un servidor vulnerable.", related: ["Vulnerabilidad", "Payload", "CVE"] },
  { name: "Payload", category: "Ataques", icon: "PAY", definition: "Parte de un ataque que realiza la accion final.", simple: "Lo que el ataque quiere ejecutar.", example: "Abrir una shell o descargar malware.", related: ["Exploit", "Backdoor", "Malware"] },
  { name: "Ingenieria social", category: "Ataques", icon: "SOC", definition: "Manipulacion de personas para conseguir informacion o acceso.", simple: "Atacar a la persona, no al ordenador.", example: "Hacerse pasar por soporte tecnico para pedir credenciales.", related: ["Phishing", "2FA", "OSINT"] },
  { name: "Fuerza bruta", category: "Ataques", icon: "BR", definition: "Probar muchas combinaciones hasta acertar.", simple: "Intentar contrasenas una tras otra.", example: "Probar miles de claves contra un login mal protegido.", related: ["Contrasena segura", "2FA", "Hash"] },
  { name: "Zero-day", category: "Seguridad", icon: "0D", definition: "Vulnerabilidad desconocida o sin parche disponible.", simple: "Un fallo que aun no esta arreglado.", example: "Un atacante lo usa antes de que el fabricante publique solucion.", related: ["CVE", "Exploit", "Vulnerabilidad"] },
  { name: "Contrasena segura", category: "Privacidad", icon: "PWD", definition: "Clave larga, unica y dificil de adivinar.", simple: "Una clave que no reutilizas y que no es obvia.", example: "Usar un gestor para crear contrasenas diferentes.", related: ["2FA", "Hash", "Fuerza bruta"] },
  { name: "2FA", category: "Privacidad", icon: "2FA", definition: "Segundo factor para verificar tu identidad.", simple: "Algo mas aparte de la contrasena.", example: "Codigo temporal en una app autenticadora.", related: ["MFA", "Phishing", "Contrasena segura"] },
  { name: "Hash", category: "Conceptos", icon: "#", definition: "Huella digital calculada a partir de datos.", simple: "Un resumen unico de un archivo o texto.", example: "Si cambia un archivo, cambia su hash.", related: ["Contrasena segura", "Cifrado", "Integridad"] },
  { name: "Cifrado", category: "Privacidad", icon: "ENC", definition: "Proceso para transformar datos y que no se lean sin clave.", simple: "Convertir informacion en algo ilegible para terceros.", example: "HTTPS cifra lo que envias a una web.", related: ["HTTPS", "VPN", "Token"] },
  { name: "Cookie", category: "Web", icon: "CK", definition: "Dato pequeno que una web guarda en tu navegador.", simple: "Una nota que la web deja para recordarte.", example: "Puede mantener tu sesion iniciada.", related: ["Sesion", "Privacidad", "Token"] },
  { name: "Sesion", category: "Web", icon: "SES", definition: "Estado que mantiene a un usuario identificado en una web.", simple: "La web recuerda que eres tu durante un rato.", example: "Cerrar sesion invalida ese estado.", related: ["Cookie", "Token", "HTTPS"] },
  { name: "Proxy", category: "Privacidad", icon: "PX", definition: "Intermediario entre tu dispositivo y el destino.", simple: "Una parada intermedia antes de llegar a la web.", example: "Un proxy puede cambiar la IP que ve un servicio.", related: ["VPN", "Tor", "IP"] },
  { name: "Tor", category: "Privacidad", icon: "TOR", definition: "Red que enruta trafico por varios nodos para mejorar anonimato.", simple: "Varias capas antes de llegar al destino.", example: "Se usa para acceder a servicios onion.", related: ["Deep Web", "Dark Web", "Anonimato"] },
  { name: "Deep Web", category: "Web", icon: "DW", definition: "Contenido no indexado por buscadores normales.", simple: "Internet que Google no lista.", example: "Tu correo o una zona privada de una plataforma.", related: ["Dark Web", "Tor", "Navegador"] },
  { name: "Dark Web", category: "Web", icon: "ON", definition: "Parte de la web que requiere redes o herramientas especificas.", simple: "Sitios que no se abren con navegacion normal.", example: "Servicios .onion accesibles desde Tor.", related: ["Tor", "Deep Web", "Anonimato"] },
  { name: "API", category: "Web", icon: "API", definition: "Interfaz para que aplicaciones se comuniquen entre ellas.", simple: "Una forma ordenada de pedir datos a un servicio.", example: "Una app del tiempo consulta una API meteorologica.", related: ["Servidor", "Token", "HTTP"] },
  { name: "SQL Injection", category: "Ataques", icon: "SQL", definition: "Ataque que inserta consultas SQL maliciosas.", simple: "Enganar a una base de datos desde un formulario.", example: "Un login vulnerable que acepta codigo SQL en el usuario.", related: ["Web", "Payload", "Vulnerabilidad"] },
  { name: "XSS", category: "Ataques", icon: "XSS", definition: "Inyeccion de scripts en paginas web vistas por usuarios.", simple: "Meter JavaScript donde no deberia ejecutarse.", example: "Un comentario que ejecuta codigo en el navegador de otros.", related: ["Cookie", "Payload", "Web"] },
  { name: "OSINT", category: "Investigacion", icon: "OS", definition: "Obtencion de informacion desde fuentes abiertas.", simple: "Investigar con datos publicos.", example: "Buscar metadatos, perfiles o dominios expuestos.", related: ["Metadatos", "Ingenieria social", "Dominio"] },
  { name: "Nmap", category: "Herramientas", icon: "NMAP", definition: "Herramienta para descubrir equipos, puertos y servicios.", simple: "Sirve para ver que hay abierto en una red.", example: "nmap -sV puede identificar servicios activos.", related: ["Puerto", "Red local", "Firewall"] },
  { name: "Wireshark", category: "Herramientas", icon: "WS", definition: "Analizador de paquetes de red.", simple: "Permite ver el trafico que pasa por una conexion.", example: "Puedes observar consultas DNS o conexiones HTTP.", related: ["Paquete", "Protocolo", "Red local"] }
];

const glossaryGrid = document.getElementById("glossary-grid");
const glossarySearch = document.getElementById("glossary-search");
const glossaryDetail = document.getElementById("glossary-detail");
const glossaryPickButtons = document.querySelectorAll("[data-glossary-pick]");
const glossaryBlock = document.getElementById("glosario-ciber");
const glossaryToggle = document.querySelector("[data-glossary-toggle]");

const normalizeGlossary = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const findGlossaryTerm = (name) => glossaryTerms.find((term) => normalizeGlossary(term.name) === normalizeGlossary(name));

const renderGlossaryDetail = (term) => {
  if (!term || !glossaryDetail) return;
  document.getElementById("glossary-detail-icon").textContent = term.icon;
  document.getElementById("glossary-detail-category").textContent = term.category;
  document.getElementById("glossary-detail-title").textContent = term.name;
  document.getElementById("glossary-detail-definition").textContent = term.definition;
  document.getElementById("glossary-detail-simple").textContent = term.simple;
  document.getElementById("glossary-detail-example").textContent = term.example;
  const related = document.getElementById("glossary-related");
  related.innerHTML = term.related.map((item) => `<button type="button" data-related-term="${item}">${item}</button>`).join("");
  document.querySelectorAll(".glossary-term-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.term === term.name);
  });
};

const renderGlossaryCards = () => {
  if (!glossaryGrid) return;
  const query = normalizeGlossary(glossarySearch?.value.trim() || "");
  const terms = glossaryTerms.filter((term) => {
    const haystack = normalizeGlossary([term.name, term.category, term.definition, term.simple, term.related.join(" ")].join(" "));
    return !query || haystack.includes(query);
  });
  glossaryGrid.innerHTML = terms.length ? terms.map((term) => `
    <button type="button" class="glossary-term-card" data-term="${term.name}">
      <span class="glossary-card-category">${term.category}</span>
      <span class="glossary-card-icon">${term.icon}</span>
      <h4>${term.name}</h4>
      <p>${term.simple}</p>
    </button>
  `).join("") : `<div class="video-empty">No hay conceptos con esa busqueda.</div>`;
  if (terms.length) renderGlossaryDetail(terms[0]);
};

if (glossaryGrid) {
  renderGlossaryCards();
  glossaryGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-term]");
    if (!card) return;
    renderGlossaryDetail(findGlossaryTerm(card.dataset.term));
  });
}

if (glossarySearch) glossarySearch.addEventListener("input", renderGlossaryCards);

glossaryPickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    glossarySearch.value = button.dataset.glossaryPick;
    renderGlossaryCards();
    glossarySearch.focus();
  });
});

if (glossaryBlock && glossaryToggle) {
  const mobileGlossaryQuery = window.matchMedia("(max-width: 640px)");

  const setGlossaryMobileState = () => {
    if (mobileGlossaryQuery.matches) {
      glossaryBlock.classList.add("is-mobile-compact");
      glossaryBlock.classList.remove("is-open");
      glossaryToggle.setAttribute("aria-expanded", "false");
      glossaryToggle.querySelector("span").textContent = "Ver glosario de terminos";
      glossaryToggle.querySelector("strong").textContent = "+";
    } else {
      glossaryBlock.classList.remove("is-mobile-compact", "is-open");
      glossaryToggle.setAttribute("aria-expanded", "true");
    }
  };

  glossaryToggle.addEventListener("click", () => {
    const isOpen = glossaryBlock.classList.toggle("is-open");
    glossaryToggle.setAttribute("aria-expanded", String(isOpen));
    glossaryToggle.querySelector("span").textContent = isOpen ? "Ocultar glosario" : "Ver glosario de terminos";
    glossaryToggle.querySelector("strong").textContent = isOpen ? "-" : "+";
  });

  setGlossaryMobileState();
  if (mobileGlossaryQuery.addEventListener) {
    mobileGlossaryQuery.addEventListener("change", setGlossaryMobileState);
  } else if (mobileGlossaryQuery.addListener) {
    mobileGlossaryQuery.addListener(setGlossaryMobileState);
  }
}

document.addEventListener("click", (event) => {
  const related = event.target.closest("[data-related-term]");
  if (!related || !glossarySearch) return;
  glossarySearch.value = related.dataset.relatedTerm;
  renderGlossaryCards();
});

document.querySelectorAll(".blog-article").forEach((article) => {
  const title = article.querySelector(".blog-title");
  if (!title || article.querySelector(".blog-read-toggle")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "blog-read-toggle";
  button.setAttribute("aria-expanded", "false");
  button.textContent = "Leer articulo";
  article.appendChild(button);

  button.addEventListener("click", () => {
    const isOpen = article.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.textContent = isOpen ? "Cerrar articulo" : "Leer articulo";
  });
});


const formatCompactNumber = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  return new Intl.NumberFormat("es-ES", { notation: "compact", maximumFractionDigits: 1 }).format(number);
};

const escapeHtml = (value) => String(value || "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const MONTH_LABELS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function normalizeSubscriberPoints(points, liveSubscribers) {
  const normalized = Array.isArray(points)
    ? points
        .map((point) => ({
          date: String(point.date || ""),
          subscribers: Number(point.subscribers)
        }))
        .filter((point) => /^\d{4}-\d{2}-\d{2}$/.test(point.date) && Number.isFinite(point.subscribers))
    : [];

  if (Number.isFinite(Number(liveSubscribers))) {
    const today = new Date().toISOString().slice(0, 10);
    const existing = normalized.find((point) => point.date === today);
    if (existing) existing.subscribers = Number(liveSubscribers);
    else normalized.push({ date: today, subscribers: Number(liveSubscribers) });
  }

  return normalized.sort((a, b) => a.date.localeCompare(b.date));
}

function buildMonthlySubscriberPoints(points) {
  const byMonth = new Map();
  points.forEach((point) => {
    const monthKey = point.date.slice(0, 7);
    byMonth.set(monthKey, point);
  });
  return [...byMonth.values()].slice(-6);
}

function renderSubscriberChart(points, liveSubscribers) {
  const chart = document.getElementById("youtube-subs-chart");
  const line = document.getElementById("subs-chart-line");
  const area = document.getElementById("subs-chart-area");
  const dot = document.getElementById("subs-chart-dot");
  const axis = document.getElementById("subs-chart-axis");
  const note = document.getElementById("subs-chart-note");
  const status = document.getElementById("youtube-chart-status");
  const yAxis = document.querySelector(".chart-y-axis");
  if (!chart || !line || !area || !dot || !axis) return;

  const monthlyPoints = buildMonthlySubscriberPoints(normalizeSubscriberPoints(points, liveSubscribers));
  if (!monthlyPoints.length) {
    chart.classList.add("is-pending");
    line.setAttribute("d", "M18 92 H202");
    area.setAttribute("d", "");
    dot.setAttribute("cx", "202");
    dot.setAttribute("cy", "92");
    const currentMonth = MONTH_LABELS[new Date().getMonth()];
    axis.innerHTML = `<span>${currentMonth}</span>`;
    if (status) status.textContent = "pendiente";
    if (yAxis) yAxis.innerHTML = "<span>50</span><span>40</span><span>30</span><span>20</span><span>0</span>";
    if (note) note.textContent = "";
    return;
  }

  chart.classList.remove("is-pending");
  const min = 0;
  const rawMax = Math.max(...monthlyPoints.map((point) => point.subscribers), 1);
  const max = Math.max(10, Math.ceil(rawMax / 10) * 10);
  const spread = Math.max(max - min, 1);
  const left = 18;
  const right = 202;
  const top = 24;
  const bottom = 94;
  const width = right - left;
  if (yAxis) {
    const steps = [max, Math.round(max * 0.75), Math.round(max * 0.5), Math.round(max * 0.25), 0];
    yAxis.innerHTML = steps.map((value) => `<span>${value}</span>`).join("");
  }

  const coords = monthlyPoints.map((point, index) => {
    const x = monthlyPoints.length === 1 ? right : left + (width * index) / (monthlyPoints.length - 1);
    const y = bottom - ((point.subscribers - min) / spread) * (bottom - top);
    return { ...point, x, y };
  });

  const path = coords.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const areaPath = `${path} L${coords[coords.length - 1].x.toFixed(1)} 108 L${coords[0].x.toFixed(1)} 108 Z`;
  line.setAttribute("d", path);
  area.setAttribute("d", areaPath);
  dot.setAttribute("cx", coords[coords.length - 1].x.toFixed(1));
  dot.setAttribute("cy", coords[coords.length - 1].y.toFixed(1));
  axis.innerHTML = coords.map((point) => {
    const date = new Date(`${point.date}T00:00:00`);
    return `<span>${MONTH_LABELS[date.getMonth()]}</span>`;
  }).join("");
  if (status) status.textContent = `${coords[coords.length - 1].subscribers} subs`;
  if (note) note.textContent = "";
}

async function loadSubscriberHistory(liveSubscribers) {
  try {
    const response = await fetch(`/data/youtube-subs-history.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("historial no disponible");
    const history = await response.json();
    renderSubscriberChart(history.points, liveSubscribers);
  } catch (error) {
    renderSubscriberChart([], liveSubscribers);
  }
}

const MIN_VISIBLE_SUBSCRIBERS = 95;

async function initYoutubeChannelPanel() {
  const subsEl = document.getElementById("youtube-subs-count");
  const spotlightSubsEl = document.getElementById("youtube-subs-spotlight");
  const statusEl = document.getElementById("youtube-subs-status");
  const latestEl = document.getElementById("youtube-latest-videos");
  const latestStatus = document.getElementById("youtube-latest-status");
  if (!statusEl) return;

  const localLatestVideos = [
    {
      url: "https://www.youtube.com/watch?v=FzjM9Imdb8Q",
      thumbnail: "https://i.ytimg.com/vi/FzjM9Imdb8Q/hqdefault.jpg",
      category: "Otros",
      title: "¿Qué hacer si un virus roba todas tus contraseñas?"
    },
    {
      url: "https://www.youtube.com/watch?v=xM_I3vHrprA",
      thumbnail: "https://i.ytimg.com/vi/xM_I3vHrprA/hqdefault.jpg",
      category: "OSINT",
      title: "Así te investigan sin hackearte: OSINT y metadatos"
    },
    {
      url: "https://www.youtube.com/watch?v=3t8Esks_Idg",
      thumbnail: "https://i.ytimg.com/vi/3t8Esks_Idg/hqdefault.jpg",
      category: "Linux",
      title: "Abrí la terminal de Linux y parecía una casa abandonada"
    },
    {
      url: "https://www.youtube.com/watch?v=BLKqTM585WM",
      thumbnail: "https://i.ytimg.com/vi/BLKqTM585WM/hqdefault.jpg",
      category: "Redes",
      title: "Tu móvil tiene matrícula: así funcionan las direcciones MAC"
    }
  ];

  const renderLatestVideos = (videos) => {
    if (!latestEl || !Array.isArray(videos) || !videos.length) return;
    latestEl.innerHTML = videos.slice(0, 3).map((video) => `
      <a class="latest-video-card" href="${escapeHtml(video.url)}" target="_blank" rel="noopener">
        <img src="${escapeHtml(video.thumbnail || "logo-cibersinhumo-transparent.png?v=1")}" alt="Portada del video" loading="lazy">
        <span><small>${escapeHtml(video.category || "YouTube")}</small><strong>${escapeHtml(video.title)}</strong></span>
      </a>
    `).join("");
  };

  let liveSubscribers = null;

  try {
    const response = await fetch(`/api/youtube-channel?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("api no disponible");
    const data = await response.json();
    if (!data.configured) throw new Error("api sin configurar");

    if (data.subscribers) {
      liveSubscribers = Math.max(Number(data.subscribers), MIN_VISIBLE_SUBSCRIBERS);
      if (subsEl) subsEl.textContent = formatCompactNumber(liveSubscribers);
      if (spotlightSubsEl) spotlightSubsEl.textContent = formatCompactNumber(liveSubscribers);
      statusEl.textContent = "Comunidad de Ciber Sin Humo.";
    }

    if (Array.isArray(data.latestVideos) && data.latestVideos.length) {
      renderLatestVideos(data.latestVideos);
      if (latestStatus) latestStatus.textContent = "YouTube sync";
    }
  } catch (error) {
    if (subsEl) subsEl.textContent = "--";
    if (spotlightSubsEl) spotlightSubsEl.textContent = String(MIN_VISIBLE_SUBSCRIBERS);
    statusEl.textContent = "Comunidad de Ciber Sin Humo.";
    renderLatestVideos(localLatestVideos);
    if (latestStatus) latestStatus.textContent = "modo local";
  }

  loadSubscriberHistory(liveSubscribers);
}

initYoutubeChannelPanel();
