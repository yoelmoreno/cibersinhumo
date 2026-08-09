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

const roadmapRoutes = [
  {
    "id": "informatica-base",
    "level": "Nivel 0",
    "title": "Inform\u00e1tica base",
    "description": "Hardware, sistemas, archivos, procesos y conceptos m\u00ednimos para no empezar a ciegas.",
    "icon": "base",
    "topics": [
      {
        "id": "topic-1",
        "number": 1,
        "title": "Qu\u00e9 es hardware y software?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es hardware y software?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-2",
        "number": 2,
        "title": "Qu\u00e9 es un sistema operativo?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un sistema operativo?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-3",
        "number": 3,
        "title": "Windows, Linux y macOS: qu\u00e9 diferencia hay?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Windows, Linux y macOS: qu\u00e9 diferencia hay?",
        "tags": [
          "Linux",
          "Redes"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-4",
        "number": 4,
        "title": "Qu\u00e9 es un archivo y que es una carpeta?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un archivo y que es una carpeta?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-5",
        "number": 5,
        "title": "Qu\u00e9 es una extensi\u00f3n de archivo?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una extensi\u00f3n de archivo?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-6",
        "number": 6,
        "title": "Qu\u00e9 es un programa?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un programa?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-7",
        "number": 7,
        "title": "Qu\u00e9 es un proceso?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un proceso?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-8",
        "number": 8,
        "title": "Qu\u00e9 significa ejecutar un programa?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa ejecutar un programa?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-9",
        "number": 9,
        "title": "Qu\u00e9 es el kernel?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es el kernel?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-10",
        "number": 10,
        "title": "Qu\u00e9 son los bits y los bytes?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son los bits y los bytes?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-11",
        "number": 11,
        "title": "Binario y hexadecimal: por qu\u00e9 aparecen en inform\u00e1tica?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Binario y hexadecimal: por qu\u00e9 aparecen en inform\u00e1tica?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-12",
        "number": 12,
        "title": "Qu\u00e9 es la memoria RAM y para qu\u00e9 sirve?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es la memoria RAM y para qu\u00e9 sirve?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-13",
        "number": 13,
        "title": "Qu\u00e9 es un ejecutable y en qu\u00e9 se diferencia de un script?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un ejecutable y en qu\u00e9 se diferencia de un script?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-14",
        "number": 14,
        "title": "Qu\u00e9 es una variable de entorno?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una variable de entorno?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-15",
        "number": 15,
        "title": "Qu\u00e9 son los logs y por qu\u00e9 importan en ciberseguridad?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son los logs y por qu\u00e9 importan en ciberseguridad?",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      }
    ]
  },
  {
    "id": "linux-sistemas",
    "level": "Nivel 1",
    "title": "Linux, terminal y sistemas",
    "description": "Terminal, Linux, permisos, paquetes, virtualizaci\u00f3n y primeras herramientas del entorno t\u00e9cnico.",
    "icon": "terminal",
    "topics": [
      {
        "id": "topic-16",
        "number": 16,
        "title": "Qu\u00e9 es Linux?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Linux?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-17",
        "number": 17,
        "title": "Qu\u00e9 diferencia hay entre Windows y Linux?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 diferencia hay entre Windows y Linux?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-18",
        "number": 18,
        "title": "Qu\u00e9 es una distribuci\u00f3n de Linux?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una distribuci\u00f3n de Linux?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-19",
        "number": 19,
        "title": "Ubuntu, Debian, Kali, Parrot... por qu\u00e9 existen tantos Linux?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Ubuntu, Debian, Kali, Parrot... por qu\u00e9 existen tantos Linux?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-20",
        "number": 20,
        "title": "Qu\u00e9 es una terminal?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una terminal?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-21",
        "number": 21,
        "title": "Qu\u00e9 es un emulador de terminal?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un emulador de terminal?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-22",
        "number": 22,
        "title": "Terminal vs shell: son lo mismo?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Terminal vs shell: son lo mismo?",
        "tags": [
          "Linux",
          "Pentesting"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-23",
        "number": 23,
        "title": "Qu\u00e9 es una shell?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una shell?",
        "tags": [
          "Linux",
          "Pentesting"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-24",
        "number": 24,
        "title": "Qu\u00e9 es Bash?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Bash?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-25",
        "number": 25,
        "title": "Qu\u00e9 es un comando o instruccion?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un comando o instruccion?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-26",
        "number": 26,
        "title": "Comandos b\u00e1sicos de Linux",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/3t8Esks_Idg",
        "thumbnail": "https://i.ytimg.com/vi/3t8Esks_Idg/hqdefault.jpg",
        "summary": "Primer contacto con comandos b\u00e1sicos de Linux y uso real de la terminal.",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-27",
        "number": 27,
        "title": "C\u00f3mo moverte por Linux: rutas, carpetas y archivos",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: C\u00f3mo moverte por Linux: rutas, carpetas y archivos",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-28",
        "number": 28,
        "title": "Ruta absoluta vs ruta relativa",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Ruta absoluta vs ruta relativa",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-29",
        "number": 29,
        "title": "Qu\u00e9 es el sistema de archivos de Linux?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es el sistema de archivos de Linux?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-30",
        "number": 30,
        "title": "Qu\u00e9 significan /, /home, /etc, /var y /tmp?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significan /, /home, /etc, /var y /tmp?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-31",
        "number": 31,
        "title": "Qu\u00e9 son los permisos en Linux?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son los permisos en Linux?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-32",
        "number": 32,
        "title": "Qu\u00e9 significa chmod?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa chmod?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-33",
        "number": 33,
        "title": "Qu\u00e9 es sudo?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es sudo?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-34",
        "number": 34,
        "title": "Qu\u00e9 es el usuario root?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es el usuario root?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-35",
        "number": 35,
        "title": "Qu\u00e9 son los procesos en Linux?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son los procesos en Linux?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-36",
        "number": 36,
        "title": "Qu\u00e9 son stdin, stdout y stderr?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son stdin, stdout y stderr?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-37",
        "number": 37,
        "title": "Qu\u00e9 son las tuber\u00edas | y las redirecci\u00f3nes > en Linux?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son las tuber\u00edas | y las redirecci\u00f3nes > en Linux?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-38",
        "number": 38,
        "title": "Qu\u00e9 es instalar un paquete?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es instalar un paquete?",
        "tags": [
          "Linux",
          "Redes"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-39",
        "number": 39,
        "title": "Qu\u00e9 es un repositorio de software?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un repositorio de software?",
        "tags": [
          "Linux",
          "Redes"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-40",
        "number": 40,
        "title": "apt: como instala programas Linux",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: apt: como instala programas Linux",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-41",
        "number": 41,
        "title": "Qu\u00e9 es una m\u00e1quina virtual?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/bL8H_mR0BFw",
        "thumbnail": "https://i.ytimg.com/vi/bL8H_mR0BFw/hqdefault.jpg",
        "summary": "Qu\u00e9 es una m\u00e1quina virtual y por qu\u00e9 sirve para crear laboratorios seguros.",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-42",
        "number": 42,
        "title": "VirtualBox explicado desde cero",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: VirtualBox explicado desde cero",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-43",
        "number": 43,
        "title": "M\u00e1quina virtual vs contenedor: qu\u00e9 cambia?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: M\u00e1quina virtual vs contenedor: qu\u00e9 cambia?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-44",
        "number": 44,
        "title": "Qu\u00e9 es Kali Linux?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Kali Linux?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-45",
        "number": 45,
        "title": "Qu\u00e9 es Parrot OS?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Parrot OS?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-46",
        "number": 46,
        "title": "Kali vs Parrot: cu\u00e1l uso?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Kali vs Parrot: cu\u00e1l uso?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-47",
        "number": 47,
        "title": "CMD vs PowerShell: qu\u00e9 diferencia hay?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: CMD vs PowerShell: qu\u00e9 diferencia hay?",
        "tags": [
          "Linux",
          "Pentesting"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-48",
        "number": 48,
        "title": "Qu\u00e9 es PowerShell?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es PowerShell?",
        "tags": [
          "Linux",
          "Pentesting"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      },
      {
        "id": "topic-49",
        "number": 49,
        "title": "Qu\u00e9 es SSH y para qu\u00e9 sirve?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es SSH y para qu\u00e9 sirve?",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 1",
        "route": "Linux, terminal y sistemas"
      }
    ]
  },
  {
    "id": "redes-desde-cero",
    "level": "Nivel 2",
    "title": "Redes desde cero",
    "description": "IP, MAC, puertos, DNS, protocolos y todo lo necesario para entender c\u00f3mo se comunican los equipos.",
    "icon": "network",
    "topics": [
      {
        "id": "topic-50",
        "number": 50,
        "title": "Qu\u00e9 es una red?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una red?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-51",
        "number": 51,
        "title": "Qu\u00e9 es Internet realmente?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Internet realmente?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-52",
        "number": 52,
        "title": "LAN, WAN y WLAN",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: LAN, WAN y WLAN",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-53",
        "number": 53,
        "title": "Qu\u00e9 es una direcci\u00f3n IP?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/eGTbt5cqBXA",
        "thumbnail": "https://i.ytimg.com/vi/eGTbt5cqBXA/hqdefault.jpg",
        "summary": "Direcciones IP explicadas desde cero.",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-54",
        "number": 54,
        "title": "IP p\u00fablica vs IP privada",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/eGTbt5cqBXA",
        "thumbnail": "https://i.ytimg.com/vi/eGTbt5cqBXA/hqdefault.jpg",
        "summary": "Diferencia entre IP p\u00fablica e IP privada dentro de una red.",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-55",
        "number": 55,
        "title": "IPv4 vs IPv6",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/eGTbt5cqBXA",
        "thumbnail": "https://i.ytimg.com/vi/eGTbt5cqBXA/hqdefault.jpg",
        "summary": "Comparaci\u00f3n sencilla entre IPv4 e IPv6.",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-56",
        "number": 56,
        "title": "Qu\u00e9 es una direcci\u00f3n MAC?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/BLKqTM585WM",
        "thumbnail": "https://i.ytimg.com/vi/BLKqTM585WM/hqdefault.jpg",
        "summary": "La direcci\u00f3n MAC como identificador dentro de una red local.",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-57",
        "number": 57,
        "title": "IP vs MAC",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: IP vs MAC",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-58",
        "number": 58,
        "title": "Qu\u00e9 es un router?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un router?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-59",
        "number": 59,
        "title": "Qu\u00e9 es una puerta de enlace o gateway?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una puerta de enlace o gateway?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-60",
        "number": 60,
        "title": "Qu\u00e9 es una m\u00e1scara de subred?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una m\u00e1scara de subred?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-61",
        "number": 61,
        "title": "Qu\u00e9 significa CIDR, por ejemplo /24?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa CIDR, por ejemplo /24?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-62",
        "number": 62,
        "title": "Qu\u00e9 es subnetting y para qu\u00e9 sirve?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es subnetting y para qu\u00e9 sirve?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-63",
        "number": 63,
        "title": "Qu\u00e9 es DHCP?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es DHCP?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-64",
        "number": 64,
        "title": "Qu\u00e9 es NAT?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es NAT?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-65",
        "number": 65,
        "title": "Qu\u00e9 es localhost y 127.0.0.1?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es localhost y 127.0.0.1?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-66",
        "number": 66,
        "title": "Qu\u00e9 es un paquete de red?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un paquete de red?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-67",
        "number": 67,
        "title": "Qu\u00e9 significa cliente y servidor?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa cliente y servidor?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-68",
        "number": 68,
        "title": "Qu\u00e9 es un socket?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un socket?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-69",
        "number": 69,
        "title": "Qu\u00e9 es un puerto?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "",
        "thumbnail": "https://i.ytimg.com/vi/pjC6xG8Ncpg/hqdefault.jpg",
        "summary": "Puertos como puertas l\u00f3gicas de comunicaci\u00f3n entre servicios.",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-70",
        "number": 70,
        "title": "Qu\u00e9 es un protocolo?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un protocolo?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-71",
        "number": 71,
        "title": "TCP vs UDP",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: TCP vs UDP",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-72",
        "number": 72,
        "title": "Qu\u00e9 ocurre cuando haces ping?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 ocurre cuando haces ping?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-73",
        "number": 73,
        "title": "Qu\u00e9 es ICMP?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es ICMP?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-74",
        "number": 74,
        "title": "Qu\u00e9 es ARP?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es ARP?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-75",
        "number": 75,
        "title": "Qu\u00e9 es DNS?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es DNS?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-76",
        "number": 76,
        "title": "Qu\u00e9 son los registros DNS (A, AAAA, MX, CNAME...)?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son los registros DNS (A, AAAA, MX, CNAME...)?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-77",
        "number": 77,
        "title": "Qu\u00e9 ocurre cuando escribes google.com y pulsas Enter?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 ocurre cuando escribes google.com y pulsas Enter?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-78",
        "number": 78,
        "title": "Modelo TCP/IP explicado facil",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Modelo TCP/IP explicado facil",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-79",
        "number": 79,
        "title": "Modelo OSI explicado sin humo",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Modelo OSI explicado sin humo",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-80",
        "number": 80,
        "title": "Qu\u00e9 es una VPN?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/I6KqB5QsIGo",
        "thumbnail": "https://i.ytimg.com/vi/I6KqB5QsIGo/hqdefault.jpg",
        "summary": "Qu\u00e9 protege una VPN, cu\u00e1ndo sirve y cu\u00e1ndo no.",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-81",
        "number": 81,
        "title": "Qu\u00e9 es un firewall?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un firewall?",
        "tags": [
          "Redes desde cero"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-82",
        "number": 82,
        "title": "Qu\u00e9 es un proxy?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un proxy?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-83",
        "number": 83,
        "title": "Proxy vs VPN",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Proxy vs VPN",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      },
      {
        "id": "topic-84",
        "number": 84,
        "title": "Qu\u00e9 es un reverse proxy?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un reverse proxy?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 2",
        "route": "Redes desde cero"
      }
    ]
  },
  {
    "id": "como-funciona-web",
    "level": "Nivel 3",
    "title": "C\u00f3mo funciona la web",
    "description": "Navegador, servidor, HTTP, cookies, APIs y la base que despu\u00e9s se aplica al hacking web.",
    "icon": "web",
    "topics": [
      {
        "id": "topic-85",
        "number": 85,
        "title": "Qu\u00e9 es una p\u00e1gina web?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una p\u00e1gina web?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-86",
        "number": 86,
        "title": "Qu\u00e9 es un navegador?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un navegador?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-87",
        "number": 87,
        "title": "Qu\u00e9 es un servidor web?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un servidor web?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-88",
        "number": 88,
        "title": "Cliente vs servidor aplicado a una web",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Cliente vs servidor aplicado a una web",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-89",
        "number": 89,
        "title": "Qu\u00e9 es un dominio?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un dominio?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-90",
        "number": 90,
        "title": "Dominio vs direcci\u00f3n IP",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Dominio vs direcci\u00f3n IP",
        "tags": [
          "Redes",
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-91",
        "number": 91,
        "title": "Qu\u00e9 es una URL?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una URL?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-92",
        "number": 92,
        "title": "HTTP explicado desde cero",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: HTTP explicado desde cero",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-93",
        "number": 93,
        "title": "HTTP vs HTTPS",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: HTTP vs HTTPS",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-94",
        "number": 94,
        "title": "Qu\u00e9 es TLS y qu\u00e9 protege realmente?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es TLS y qu\u00e9 protege realmente?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-95",
        "number": 95,
        "title": "Qu\u00e9 es un certificado HTTPS?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un certificado HTTPS?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-96",
        "number": 96,
        "title": "Qu\u00e9 es una petici\u00f3n HTTP?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una petici\u00f3n HTTP?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-97",
        "number": 97,
        "title": "GET vs POST",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: GET vs POST",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-98",
        "number": 98,
        "title": "Qu\u00e9 son las cabeceras HTTP?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son las cabeceras HTTP?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-99",
        "number": 99,
        "title": "Qu\u00e9 significan 200, 301, 403, 404, 500...?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significan 200, 301, 403, 404, 500...?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-100",
        "number": 100,
        "title": "Qu\u00e9 es HTML?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es HTML?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-101",
        "number": 101,
        "title": "Qu\u00e9 es CSS?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es CSS?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-102",
        "number": 102,
        "title": "Qu\u00e9 es JavaScript?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es JavaScript?",
        "tags": [
          "Redes",
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-103",
        "number": 103,
        "title": "Qu\u00e9 son las cookies?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "",
        "thumbnail": "https://i.ytimg.com/vi/IsmWOCmjz44/hqdefault.jpg",
        "summary": "Cookies explicadas como parte de c\u00f3mo funciona una web.",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-104",
        "number": 104,
        "title": "Qu\u00e9 es una sesi\u00f3n?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una sesi\u00f3n?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-105",
        "number": 105,
        "title": "C\u00f3mo sabe una web que has iniciado sesi\u00f3n?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: C\u00f3mo sabe una web que has iniciado sesi\u00f3n?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-106",
        "number": 106,
        "title": "Qu\u00e9 es una API?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una API?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-107",
        "number": 107,
        "title": "Qu\u00e9 es JSON y por qu\u00e9 aparece tanto en APIs?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es JSON y por qu\u00e9 aparece tanto en APIs?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-108",
        "number": 108,
        "title": "Frontend vs backend",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Frontend vs backend",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      },
      {
        "id": "topic-109",
        "number": 109,
        "title": "Qu\u00e9 es una base de datos?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una base de datos?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 3",
        "route": "C\u00f3mo funciona la web"
      }
    ]
  },
  {
    "id": "fundamentos-ciber",
    "level": "Nivel 4",
    "title": "Fundamentos de ciberseguridad",
    "description": "Amenazas, vulnerabilidades, malware, phishing, cifrado y h\u00e1bitos de seguridad explicados sin humo.",
    "icon": "shield",
    "topics": [
      {
        "id": "topic-110",
        "number": 110,
        "title": "Qu\u00e9 significa realmente ciberseguridad?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa realmente ciberseguridad?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-111",
        "number": 111,
        "title": "Confidencialidad, integridad y disponibilidad: la tr\u00edada CIA",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Confidencialidad, integridad y disponibilidad: la tr\u00edada CIA",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-112",
        "number": 112,
        "title": "Qu\u00e9 significa autenticarte?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa autenticarte?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-113",
        "number": 113,
        "title": "Autenticaci\u00f3n vs autorizaci\u00f3n",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Autenticaci\u00f3n vs autorizaci\u00f3n",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-114",
        "number": 114,
        "title": "Qu\u00e9 es el principio de m\u00ednimo privilegio?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es el principio de m\u00ednimo privilegio?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-115",
        "number": 115,
        "title": "Qu\u00e9 es una vulnerabilidad?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una vulnerabilidad?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-116",
        "number": 116,
        "title": "Vulnerabilidad vs exploit",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Vulnerabilidad vs exploit",
        "tags": [
          "Ataques"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-117",
        "number": 117,
        "title": "Qu\u00e9 es un CVE?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un CVE?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-118",
        "number": 118,
        "title": "Qu\u00e9 es un parche de seguridad?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un parche de seguridad?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-119",
        "number": 119,
        "title": "Qu\u00e9 es un zero-day?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un zero-day?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-120",
        "number": 120,
        "title": "Qu\u00e9 es malware?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es malware?",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-121",
        "number": 121,
        "title": "Virus vs gusano vs troyano",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Virus vs gusano vs troyano",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-122",
        "number": 122,
        "title": "Qu\u00e9 es phishing?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/6_L84s6Jn4s",
        "thumbnail": "phishing-cover.jpg?v=2",
        "summary": "C\u00f3mo reconocer phishing y evitar caer en enlaces falsos.",
        "tags": [
          "Ataques"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-123",
        "number": 123,
        "title": "Qu\u00e9 es ingenier\u00eda social?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/6_L84s6Jn4s",
        "thumbnail": "phishing-cover.jpg?v=2",
        "summary": "La ingenier\u00eda social detr\u00e1s de muchos enga\u00f1os digitales.",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-124",
        "number": 124,
        "title": "Qu\u00e9 es un troyano?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/KnIAbzji1EM",
        "thumbnail": "troyano-cover.jpg?v=1",
        "summary": "Troyanos explicados con demo visual.",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-125",
        "number": 125,
        "title": "Qu\u00e9 es spyware?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/0Tlr-gDakCs",
        "thumbnail": "spyware-cover.jpg?v=1",
        "summary": "Spyware y acceso a c\u00e1maras explicado con ejemplos.",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-126",
        "number": 126,
        "title": "Qu\u00e9 es un keylogger?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/dY1H9PCTYyM",
        "thumbnail": "keylogger-cover.jpg?v=1",
        "summary": "Keyloggers y robo de teclas explicado de forma pr\u00e1ctica.",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-127",
        "number": 127,
        "title": "Qu\u00e9 es ransomware?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/aD9RRjgCsW4",
        "thumbnail": "https://i.ytimg.com/vi/aD9RRjgCsW4/hqdefault.jpg",
        "summary": "Ransomware y cifrado de archivos explicado paso a paso.",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-128",
        "number": 128,
        "title": "Qu\u00e9 es un ataque DDoS?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/4p54sndQGYU",
        "thumbnail": "https://i.ytimg.com/vi/4p54sndQGYU/hqdefault.jpg",
        "summary": "Ataques DDoS explicados sin complicarlo.",
        "tags": [
          "Ataques"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-129",
        "number": 129,
        "title": "Qu\u00e9 es un ataque Man-in-the- Middle (MITM)?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/qZityrltI0k",
        "thumbnail": "https://i.ytimg.com/vi/qZityrltI0k/hqdefault.jpg",
        "summary": "Ataque Man-in-the-Middle y el papel del intermediario.",
        "tags": [
          "Ataques"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-130",
        "number": 130,
        "title": "Qu\u00e9 es un infostealer?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un infostealer?",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-131",
        "number": 131,
        "title": "Qu\u00e9 es fuerza bruta?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es fuerza bruta?",
        "tags": [
          "Ataques"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-132",
        "number": 132,
        "title": "Qu\u00e9 es un ataque de diccionario?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un ataque de diccionario?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-133",
        "number": 133,
        "title": "Qu\u00e9 es un hash?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un hash?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-134",
        "number": 134,
        "title": "Hash vs cifrado",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Hash vs cifrado",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-135",
        "number": 135,
        "title": "Qu\u00e9 es el cifrado?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es el cifrado?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-136",
        "number": 136,
        "title": "Cifrado sim\u00e9trico vs asim\u00e9trico",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Cifrado sim\u00e9trico vs asim\u00e9trico",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-137",
        "number": 137,
        "title": "Qu\u00e9 son una clave p\u00fablica y una clave privada?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son una clave p\u00fablica y una clave privada?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-138",
        "number": 138,
        "title": "C\u00f3mo se almacenan las contrase\u00f1as?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: C\u00f3mo se almacenan las contrase\u00f1as?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-139",
        "number": 139,
        "title": "Qu\u00e9 es 2FA?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es 2FA?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-140",
        "number": 140,
        "title": "Qu\u00e9 es un gestor de contrase\u00f1as?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un gestor de contrase\u00f1as?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-141",
        "number": 141,
        "title": "Qu\u00e9 son las passkeys?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son las passkeys?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-142",
        "number": 142,
        "title": "Qu\u00e9 es un sandbox?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un sandbox?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-143",
        "number": 143,
        "title": "Qu\u00e9 es un indicador de compromiso (IOC)?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un indicador de compromiso (IOC)?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-144",
        "number": 144,
        "title": "Qu\u00e9 es un actor de amenazas?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un actor de amenazas?",
        "tags": [
          "Fundamentos de ciberseguridad"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      },
      {
        "id": "topic-145",
        "number": 145,
        "title": "ClickFix: el CAPTCHA que consigue que ejecutes malware",
        "status": "preparing",
        "statusLabel": "En preparaci\u00f3n",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: ClickFix: el CAPTCHA que consigue que ejecutes malware",
        "tags": [
          "Linux",
          "Malware"
        ],
        "level": "Nivel 4",
        "route": "Fundamentos de ciberseguridad"
      }
    ]
  },
  {
    "id": "hacking-pentesting",
    "level": "Nivel 5",
    "title": "Primeros pasos en hacking y pentesting",
    "description": "Reconocimiento, OSINT, Nmap, Wireshark, shells, laboratorios y mentalidad de pentesting \u00e9tico.",
    "icon": "target",
    "topics": [
      {
        "id": "topic-146",
        "number": 146,
        "title": "Qu\u00e9 significa hacking?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa hacking?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-147",
        "number": 147,
        "title": "White Hat, Grey Hat, Black Hat y Green Hat",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "",
        "thumbnail": "",
        "summary": "Roles y sombreros dentro de la seguridad ofensiva y defensiva.",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-148",
        "number": 148,
        "title": "Qu\u00e9 es pentesting?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es pentesting?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-149",
        "number": 149,
        "title": "Pentesting vs ciberdelincuencia",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Pentesting vs ciberdelincuencia",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-150",
        "number": 150,
        "title": "Qu\u00e9 es reconocimiento?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es reconocimiento?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-151",
        "number": 151,
        "title": "Reconocimiento pasivo vs activo",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Reconocimiento pasivo vs activo",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-152",
        "number": 152,
        "title": "Qu\u00e9 es OSINT?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/xM_I3vHrprA",
        "thumbnail": "https://i.ytimg.com/vi/xM_I3vHrprA/hqdefault.jpg",
        "summary": "OSINT y metadatos sin hackear a nadie.",
        "tags": [
          "Redes",
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-153",
        "number": 153,
        "title": "Qu\u00e9 es enumeraci\u00f3n?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es enumeraci\u00f3n?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-154",
        "number": 154,
        "title": "Qu\u00e9 significa escanear una red?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa escanear una red?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-155",
        "number": 155,
        "title": "Qu\u00e9 es Nmap?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Nmap?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-156",
        "number": 156,
        "title": "Tu primer escaneo con Nmap",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Tu primer escaneo con Nmap",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-157",
        "number": 157,
        "title": "Qu\u00e9 significa que un puerto est\u00e9 abierto, cerrado o filtrado?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa que un puerto est\u00e9 abierto, cerrado o filtrado?",
        "tags": [
          "Redes",
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-158",
        "number": 158,
        "title": "Qu\u00e9 es Wireshark?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Wireshark?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-159",
        "number": 159,
        "title": "C\u00f3mo ver un paquete con Wireshark",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: C\u00f3mo ver un paquete con Wireshark",
        "tags": [
          "Redes",
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-160",
        "number": 160,
        "title": "Qu\u00e9 es una shell? aplicada al pentesting",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una shell? aplicada al pentesting",
        "tags": [
          "Linux",
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-161",
        "number": 161,
        "title": "Qu\u00e9 significa obtener una shell?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa obtener una shell?",
        "tags": [
          "Linux",
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-162",
        "number": 162,
        "title": "Qu\u00e9 es una reverse shell?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una reverse shell?",
        "tags": [
          "Linux",
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-163",
        "number": 163,
        "title": "Reverse shell vs bind shell",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Reverse shell vs bind shell",
        "tags": [
          "Linux",
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-164",
        "number": 164,
        "title": "Qu\u00e9 es escalar privilegios?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es escalar privilegios?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-165",
        "number": 165,
        "title": "Qu\u00e9 es una wordlist?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una wordlist?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-166",
        "number": 166,
        "title": "Qu\u00e9 es un diccionario de contrase\u00f1as?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un diccionario de contrase\u00f1as?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-167",
        "number": 167,
        "title": "Qu\u00e9 es TryHackMe?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es TryHackMe?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-168",
        "number": 168,
        "title": "Qu\u00e9 es Hack The Box?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Hack The Box?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-169",
        "number": 169,
        "title": "Qu\u00e9 es una CTF?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una CTF?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-170",
        "number": 170,
        "title": "Qu\u00e9 es Metasploit?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Metasploit?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-171",
        "number": 171,
        "title": "Qu\u00e9 es Git y por qu\u00e9 se usa tanto en ciberseguridad?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Git y por qu\u00e9 se usa tanto en ciberseguridad?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      },
      {
        "id": "topic-172",
        "number": 172,
        "title": "Qu\u00e9 es GitHub y como usarlo sin liarte?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es GitHub y como usarlo sin liarte?",
        "tags": [
          "Pentesting"
        ],
        "level": "Nivel 5",
        "route": "Primeros pasos en hacking y pentesting"
      }
    ]
  },
  {
    "id": "hacking-web",
    "level": "Nivel 6",
    "title": "Hacking web",
    "description": "Burp Suite, peticiones HTTP, SQL Injection, XSS, CSRF, sesiones y OWASP desde cero.",
    "icon": "bug",
    "topics": [
      {
        "id": "topic-173",
        "number": 173,
        "title": "Qu\u00e9 es Burp Suite?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Burp Suite?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-174",
        "number": 174,
        "title": "C\u00f3mo interceptar una petici\u00f3n HTTP",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: C\u00f3mo interceptar una petici\u00f3n HTTP",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-175",
        "number": 175,
        "title": "Qu\u00e9 es SQL?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es SQL?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-176",
        "number": 176,
        "title": "Qu\u00e9 es una SQL Injection?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una SQL Injection?",
        "tags": [
          "Web",
          "Ataques"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-177",
        "number": 177,
        "title": "Qu\u00e9 es XSS?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es XSS?",
        "tags": [
          "Web",
          "Ataques"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-178",
        "number": 178,
        "title": "Qu\u00e9 es CSRF?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es CSRF?",
        "tags": [
          "Web",
          "Ataques"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-179",
        "number": 179,
        "title": "Qu\u00e9 es IDOR?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es IDOR?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-180",
        "number": 180,
        "title": "Qu\u00e9 significa Directory Traversal?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa Directory Traversal?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-181",
        "number": 181,
        "title": "Qu\u00e9 es Command Injection?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Command Injection?",
        "tags": [
          "Web",
          "Ataques"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-182",
        "number": 182,
        "title": "Qu\u00e9 significa subir un archivo malicioso?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 significa subir un archivo malicioso?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-183",
        "number": 183,
        "title": "Qu\u00e9 son las vulnerabilidades de autenticaci\u00f3n?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 son las vulnerabilidades de autenticaci\u00f3n?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-184",
        "number": 184,
        "title": "C\u00f3mo funciona el secuestro de sesi\u00f3n?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: C\u00f3mo funciona el secuestro de sesi\u00f3n?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-185",
        "number": 185,
        "title": "Qu\u00e9 es una cookie de sesi\u00f3n y por qu\u00e9 es tan valiosa?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una cookie de sesi\u00f3n y por qu\u00e9 es tan valiosa?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-186",
        "number": 186,
        "title": "Qu\u00e9 es CORS?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es CORS?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-187",
        "number": 187,
        "title": "Qu\u00e9 es una Content Security Policy (CSP)?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una Content Security Policy (CSP)?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-188",
        "number": 188,
        "title": "Qu\u00e9 es SSRF?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es SSRF?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-189",
        "number": 189,
        "title": "Qu\u00e9 es una vulnerabilidad de subida de archivos?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es una vulnerabilidad de subida de archivos?",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      },
      {
        "id": "topic-190",
        "number": 190,
        "title": "OWASP Top 10 explicado desde cero",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: OWASP Top 10 explicado desde cero",
        "tags": [
          "Web"
        ],
        "level": "Nivel 6",
        "route": "Hacking web"
      }
    ]
  },
  {
    "id": "casos-reales",
    "level": "Nivel 7",
    "title": "Herramientas, ataques y casos reales",
    "description": "Casos reales, historias, herramientas, malware y actualidad para conectar teor\u00eda con mundo real.",
    "icon": "case",
    "topics": [
      {
        "id": "topic-191",
        "number": 191,
        "title": "Shodan: buscador de dispositivos conectados a Internet",
        "status": "preparing",
        "statusLabel": "En preparaci\u00f3n",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Shodan: buscador de dispositivos conectados a Internet",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-192",
        "number": 192,
        "title": "Deep Web y Onion",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/loFOXBIBABk",
        "thumbnail": "https://i.ytimg.com/vi/loFOXBIBABk/hqdefault.jpg",
        "summary": "Deep Web y Onion desmitificados.",
        "tags": [
          "Web"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-193",
        "number": 193,
        "title": "WannaCry",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/a4BePy8pXfA",
        "thumbnail": "https://i.ytimg.com/vi/a4BePy8pXfA/hqdefault.jpg",
        "summary": "WannaCry explicado como caso hist\u00f3rico.",
        "tags": [
          "Herramientas"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-194",
        "number": 194,
        "title": "El USB encontrado/enviado como ataque",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/CIIkmf8C9NI",
        "thumbnail": "https://i.ytimg.com/vi/CIIkmf8C9NI/hqdefault.jpg",
        "summary": "El USB como vector de ataque explicado con caso.",
        "tags": [
          "Herramientas"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-195",
        "number": 195,
        "title": "QR Phishing",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/pjC6xG8Ncpg",
        "thumbnail": "https://i.ytimg.com/vi/pjC6xG8Ncpg/hqdefault.jpg",
        "summary": "QR phishing y riesgos al escanear c\u00f3digos QR.",
        "tags": [
          "Ataques"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-196",
        "number": 196,
        "title": "Caso real: el troyano que rob\u00f3 contrase\u00f1as y cambi\u00f3 ajustes",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/FzjM9Imdb8Q",
        "thumbnail": "https://i.ytimg.com/vi/FzjM9Imdb8Q/hqdefault.jpg",
        "summary": "Qu\u00e9 hacer si un virus roba tus contrase\u00f1as.",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-197",
        "number": 197,
        "title": "Analizando un ataque real de forma sencilla",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/xM_I3vHrprA",
        "thumbnail": "https://i.ytimg.com/vi/xM_I3vHrprA/hqdefault.jpg",
        "summary": "An\u00e1lisis pr\u00e1ctico de informaci\u00f3n p\u00fablica y metadatos.",
        "tags": [
          "Herramientas"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-198",
        "number": 198,
        "title": "Red 764: caso real explicado de forma sencilla",
        "status": "preparing",
        "statusLabel": "En preparaci\u00f3n",
        "url": "https://youtu.be/g3WsvKOQ_GE",
        "thumbnail": "https://i.ytimg.com/vi/g3WsvKOQ_GE/hqdefault.jpg",
        "summary": "Red 764 explicada como caso real de actualidad.",
        "tags": [
          "Herramientas"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-199",
        "number": 199,
        "title": "ClickFix como caso real: el falso CAPTCHA",
        "status": "preparing",
        "statusLabel": "En preparaci\u00f3n",
        "url": "",
        "thumbnail": "",
        "summary": "ClickFix y falsos CAPTCHA como caso real en preparaci\u00f3n.",
        "tags": [
          "Linux"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-200",
        "number": 200,
        "title": "SIM swapping",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: SIM swapping",
        "tags": [
          "Herramientas"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-201",
        "number": 201,
        "title": "Passkeys: vamos a dejar de usar contrase\u00f1as?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Passkeys: vamos a dejar de usar contrase\u00f1as?",
        "tags": [
          "Herramientas"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-202",
        "number": 202,
        "title": "Secuestro de sesi\u00f3n: robar una cuenta sin saber la contrase\u00f1a",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Secuestro de sesi\u00f3n: robar una cuenta sin saber la contrase\u00f1a",
        "tags": [
          "Herramientas"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-203",
        "number": 203,
        "title": "Infostealers: el malware que roba tus credenciales",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Infostealers: el malware que roba tus credenciales",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-204",
        "number": 204,
        "title": "Puede una extensi\u00f3n de Chrome robarte informaci\u00f3n?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Puede una extensi\u00f3n de Chrome robarte informaci\u00f3n?",
        "tags": [
          "Redes"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-205",
        "number": 205,
        "title": "Malvertising: anuncios que terminan en malware",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Malvertising: anuncios que terminan en malware",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-206",
        "number": 206,
        "title": "Qu\u00e9 es un supply-chain attack?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un supply-chain attack?",
        "tags": [
          "Herramientas"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-207",
        "number": 207,
        "title": "Ataques con c\u00f3digos QR: m\u00e1s all\u00e1 del phishing",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Ataques con c\u00f3digos QR: m\u00e1s all\u00e1 del phishing",
        "tags": [
          "Ataques"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-208",
        "number": 208,
        "title": "Qu\u00e9 hace realmente un antivirus?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 hace realmente un antivirus?",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-209",
        "number": 209,
        "title": "C\u00f3mo detecta Windows Defender un malware?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: C\u00f3mo detecta Windows Defender un malware?",
        "tags": [
          "Malware"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      },
      {
        "id": "topic-210",
        "number": 210,
        "title": "Qu\u00e9 ocurre despu\u00e9s de que un atacante consigue acceso?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 ocurre despu\u00e9s de que un atacante consigue acceso?",
        "tags": [
          "Herramientas"
        ],
        "level": "Nivel 7",
        "route": "Herramientas, ataques y casos reales"
      }
    ]
  },
  {
    "id": "defensa-siguiente-paso",
    "level": "Nivel 8",
    "title": "Defensa y siguiente paso",
    "description": "Blue Team, SOC, SIEM, EDR, hardening, respuesta a incidentes y siguientes pasos profesionales.",
    "icon": "defense",
    "topics": [
      {
        "id": "topic-211",
        "number": 211,
        "title": "Blue Team vs Red Team vs Purple Team",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Blue Team vs Red Team vs Purple Team",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-212",
        "number": 212,
        "title": "Qu\u00e9 es un SOC?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un SOC?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-213",
        "number": 213,
        "title": "Qu\u00e9 hace un analista SOC?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 hace un analista SOC?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-214",
        "number": 214,
        "title": "Qu\u00e9 es un SIEM?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un SIEM?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-215",
        "number": 215,
        "title": "Qu\u00e9 es un EDR?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un EDR?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-216",
        "number": 216,
        "title": "Antivirus vs EDR",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Antivirus vs EDR",
        "tags": [
          "Malware",
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-217",
        "number": 217,
        "title": "Qu\u00e9 es hardening?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es hardening?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-218",
        "number": 218,
        "title": "Por qu\u00e9 las copias de seguridad son una medida de ciberseguridad?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Por qu\u00e9 las copias de seguridad son una medida de ciberseguridad?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-219",
        "number": 219,
        "title": "Qu\u00e9 es la segmentaci\u00f3n de red?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es la segmentaci\u00f3n de red?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-220",
        "number": 220,
        "title": "Qu\u00e9 es detecci\u00f3n y respuesta a incidentes?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es detecci\u00f3n y respuesta a incidentes?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-221",
        "number": 221,
        "title": "Qu\u00e9 es forense digital?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es forense digital?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-222",
        "number": 222,
        "title": "Qu\u00e9 es threat intelligence?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es threat intelligence?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-223",
        "number": 223,
        "title": "Qu\u00e9 es un honeypot?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es un honeypot?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      },
      {
        "id": "topic-224",
        "number": 224,
        "title": "Qu\u00e9 es Zero Trust?",
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
        "summary": "Tema del roadmap para aprender: Qu\u00e9 es Zero Trust?",
        "tags": [
          "Defensa"
        ],
        "level": "Nivel 8",
        "route": "Defensa y siguiente paso"
      }
    ]
  }
];

const roadmapStorageKey = "ciber-sin-humo-roadmap-progress";
const roadmapRoutesContainer = document.getElementById("roadmap-routes");
const roadmapView = document.getElementById("roadmap-view");
const roadmapPath = document.getElementById("roadmap-path");
const roadmapDetail = document.getElementById("roadmap-detail");
const roadmapBack = document.getElementById("roadmap-back");
const roadmapRouteLevel = document.getElementById("roadmap-route-level");
const roadmapRouteTitle = document.getElementById("roadmap-route-title");
const roadmapRouteDesc = document.getElementById("roadmap-route-desc");
const roadmapSearch = document.getElementById("roadmap-search");
const roadmapSearchResults = document.getElementById("roadmap-search-results");
const roadmapExploreGrid = document.getElementById("roadmap-explore-grid");
const roadmapContinue = document.getElementById("roadmap-continue");
const assistantForm = document.getElementById("roadmap-assistant-form");
const assistantInput = document.getElementById("roadmap-assistant-input");
const assistantOutput = document.getElementById("roadmap-assistant-output");
let activeRoadmapRoute = null;

function loadRoadmapProgress() {
  try { return JSON.parse(localStorage.getItem(roadmapStorageKey) || "{}"); }
  catch { return {}; }
}

function saveRoadmapProgress(progress) {
  localStorage.setItem(roadmapStorageKey, JSON.stringify(progress));
}

function getRoadmapProgress() {
  const progress = loadRoadmapProgress();
  progress.completed = Array.isArray(progress.completed) ? progress.completed : [];
  return progress;
}

function allRoadmapTopics() {
  return roadmapRoutes.flatMap((route) => route.topics.map((topic, index) => ({ ...topic, routeId: route.id, routeTitle: route.title, routeDescription: route.description, index })));
}

function routeStats(route) {
  const total = route.topics.length;
  const published = route.topics.filter((topic) => topic.status === "published").length;
  const preparing = route.topics.filter((topic) => topic.status === "preparing").length;
  const pending = total - published - preparing;
  const completed = route.topics.filter((topic) => getRoadmapProgress().completed.includes(topic.id)).length;
  return { total, published, preparing, pending, completed, percent: total ? Math.round((completed / total) * 100) : 0 };
}

function renderRoadmapRoutes() {
  if (!roadmapRoutesContainer) return;
  const totalRoutes = Math.max(roadmapRoutes.length, 1);
  roadmapRoutesContainer.innerHTML = roadmapRoutes.map((route, index) => {
    const order = index + 1;
    const stats = routeStats(route);
    return `
      <button class="roadmap-route-card roadmap-planet-card planet-${((order - 1) % 9) + 1}" style="--planet-delay:${order * -0.38}s" type="button" data-roadmap-route="${route.id}" data-orbit-index="${index}" data-orbit-total="${totalRoutes}">
        <span class="roadmap-route-num">${String(order).padStart(2, "0")}</span>
        <span class="roadmap-planet" aria-hidden="true"><i></i></span>
        <strong>${route.title}</strong>
        <span>${route.description}</span>
        <div class="route-meter"><i style="width:${Math.max(stats.percent, stats.published ? 8 : 0)}%"></i></div>
        <div class="route-stats-line">
          <small>${stats.total} temas</small>
          <small>${stats.published} publicados</small>
          <small>${stats.preparing} en preparación</small>
        </div>
      </button>
    `;
  }).join("");
  if (document.getElementById("videos")?.classList.contains("is-roadmap-open")) startRoadmapSolarSystem();
}

let roadmapSolarFrame = null;

function updateRoadmapSolarSystem(timestamp = 0) {
  const videosSection = document.getElementById("videos");
  const shell = roadmapRoutesContainer;
  if (!videosSection?.classList.contains("is-roadmap-open") || !shell) {
    roadmapSolarFrame = null;
    return;
  }

  const cards = Array.from(shell.querySelectorAll(".roadmap-planet-card"));
  const rect = shell.getBoundingClientRect();
  const total = Math.max(cards.length, 1);
  const maxRadiusX = Math.max(260, rect.width * 0.38);
  const maxRadiusY = Math.max(120, Math.min(rect.height * 0.24, 230));

  cards.forEach((card, index) => {
    const order = Number(card.dataset.orbitIndex || index);
    const lane = 0.36 + (order / Math.max(total - 1, 1)) * 0.66;
    const speed = 0.000055 + ((total - order) * 0.000007);
    const angle = (order / total) * Math.PI * 2 + timestamp * speed;
    const x = Math.cos(angle) * maxRadiusX * lane;
    const y = Math.sin(angle) * maxRadiusY * lane - 4;
    const depth = (Math.sin(angle) + 1) / 2;
    const scale = 0.74 + depth * 0.34;

    card.style.setProperty("--orbit-x", x.toFixed(1));
    card.style.setProperty("--orbit-y", y.toFixed(1));
    card.style.setProperty("--planet-scale", scale.toFixed(3));
    card.style.setProperty("--planet-alpha", (0.72 + depth * 0.28).toFixed(2));
    card.style.zIndex = String(Math.round(30 + depth * 80));
  });

  roadmapSolarFrame = window.requestAnimationFrame(updateRoadmapSolarSystem);
}

function startRoadmapSolarSystem() {
  if (roadmapSolarFrame) return;
  roadmapSolarFrame = window.requestAnimationFrame(updateRoadmapSolarSystem);
}

function stopRoadmapSolarSystem() {
  if (!roadmapSolarFrame) return;
  window.cancelAnimationFrame(roadmapSolarFrame);
  roadmapSolarFrame = null;
}
function openRoadmapRoute(routeId, focusTopicId = null) {
  const route = roadmapRoutes.find((item) => item.id === routeId);
  if (!route || !roadmapView || !roadmapPath) return;
  activeRoadmapRoute = route;
  roadmapRouteLevel.textContent = route.level;
  roadmapRouteTitle.textContent = route.title;
  roadmapRouteDesc.textContent = route.description;
  roadmapView.hidden = false;
  renderRoadmapPath(route);
  const topic = focusTopicId ? route.topics.find((item) => item.id === focusTopicId) : route.topics.find((item) => item.status === "published") || route.topics[0];
  if (topic) selectRoadmapTopic(topic.id);
  roadmapView.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderRoadmapPath(route) {
  const progress = getRoadmapProgress();
  roadmapPath.innerHTML = route.topics.map((topic, index) => {
    const done = progress.completed.includes(topic.id);
    const side = index % 2 === 0 ? "left" : "right";
    return `
      <button class="roadmap-node is-${topic.status} ${done ? "is-completed" : ""} is-${side}" type="button" data-topic-id="${topic.id}">
        <span class="node-core">${done ? "✓" : topic.number}</span>
        <span class="node-copy">
          <small>${topic.statusLabel}</small>
          <strong>${topic.title}</strong>
        </span>
      </button>
    `;
  }).join("");
}


function getYoutubeVideoId(url) {
  const value = String(url || "");
  const match = value.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : "";
}

function getYoutubeThumbnail(topic) {
  const explicit = topic.thumbnail || topic.thumbnailUrl;
  if (explicit) return explicit;
  const id = getYoutubeVideoId(topic.url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
}

function formatYoutubeDate(value) {
  if (!value) return "Fecha pendiente";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

function formatYoutubeDuration(value) {
  if (!value) return "Duración pendiente";
  const iso = String(value);
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return iso;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

let youtubeMetaPromise = null;
let youtubeMetaById = new Map();

async function loadYoutubeVideoMeta() {
  if (youtubeMetaById.size) return youtubeMetaById;
  if (!youtubeMetaPromise) {
    youtubeMetaPromise = fetch(`/api/youtube-channel?ts=${Date.now()}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        const videos = Array.isArray(data?.allVideos) ? data.allVideos : Array.isArray(data?.latestVideos) ? data.latestVideos : [];
        youtubeMetaById = new Map(videos.map((video) => [video.id, video]));
        return youtubeMetaById;
      })
      .catch(() => youtubeMetaById);
  }
  return youtubeMetaPromise;
}

function renderTopicVideoPreview(topic, meta = null) {
  if (!topic.url) return "";
  const id = getYoutubeVideoId(topic.url);
  const thumbnail = meta?.thumbnail || getYoutubeThumbnail(topic);
  const title = meta?.title || topic.title;
  const published = topic.publishedAt || meta?.publishedAt || "";
  const duration = topic.duration || meta?.duration || "";
  return `
    <a class="topic-video-preview" href="${topic.url}" target="_blank" rel="noopener" data-video-id="${id}">
      <span class="topic-video-frame">
        ${thumbnail ? `<img src="${thumbnail}" alt="Portada de ${title}" loading="lazy">` : `<span class="topic-video-placeholder">${topic.number}</span>`}
        <span class="topic-video-play" aria-hidden="true"></span>
        <span class="topic-video-duration" data-video-duration>${formatYoutubeDuration(duration)}</span>
      </span>
      <span class="topic-video-copy">
        <small>Vídeo publicado</small>
        <strong data-video-title>${title}</strong>
        <em data-video-date>${formatYoutubeDate(published)}</em>
      </span>
    </a>
  `;
}

async function hydrateTopicVideoMeta(topic) {
  const id = getYoutubeVideoId(topic.url);
  if (!id || !roadmapDetail) return;
  const meta = (await loadYoutubeVideoMeta()).get(id);
  const card = roadmapDetail.querySelector(`.topic-video-preview[data-video-id="${id}"]`);
  if (!meta || !card) return;
  const img = card.querySelector("img");
  const title = card.querySelector("[data-video-title]");
  const date = card.querySelector("[data-video-date]");
  const duration = card.querySelector("[data-video-duration]");
  if (img && meta.thumbnail) img.src = meta.thumbnail;
  if (title && meta.title) title.textContent = meta.title;
  if (date) date.textContent = formatYoutubeDate(topic.publishedAt || meta.publishedAt);
  if (duration) duration.textContent = formatYoutubeDuration(topic.duration || meta.duration);
}


function selectRoadmapTopic(topicId) {
  const topic = allRoadmapTopics().find((item) => item.id === topicId);
  if (!topic || !roadmapDetail) return;
  document.querySelectorAll(".roadmap-node").forEach((node) => node.classList.toggle("is-current", node.dataset.topicId === topicId));
  const route = roadmapRoutes.find((item) => item.id === topic.routeId);
  const prev = route?.topics[topic.index - 1];
  const next = route?.topics[topic.index + 1];
  const progress = getRoadmapProgress();
  const done = progress.completed.includes(topic.id);
  roadmapDetail.innerHTML = `
    <span class="section-tag">${topic.route} · ${topic.level}</span>
    <h3>${topic.title}</h3>
    <div class="topic-status-row">
      <span class="topic-pill is-${topic.status}">${topic.statusLabel}</span>
      <span>Tema ${topic.number} de 224</span>
    </div>
    ${renderTopicVideoPreview(topic)}
    <p>${topic.summary}</p>
    <div class="topic-tags">${topic.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    <div class="topic-nav-mini">
      <small>Anterior: ${prev ? prev.title : "Inicio de ruta"}</small>
      <small>Siguiente: ${next ? next.title : "Fin de ruta"}</small>
    </div>
    <div class="topic-actions">
      ${topic.url ? `<a class="btn btn-primary" href="${topic.url}" target="_blank" rel="noopener">Ver vídeo</a>` : `<span class="btn btn-secondary is-disabled">${topic.status === "preparing" ? "En preparación" : "Próximamente"}</span>`}
      <button class="btn btn-secondary" type="button" data-toggle-topic="${topic.id}">${done ? "Marcar pendiente" : "Marcar completado"}</button>
    </div>
  `;
  const p = getRoadmapProgress();
  p.lastTopicId = topic.id;
  p.lastRouteId = topic.routeId;
  saveRoadmapProgress(p);
  renderContinueCard();
  hydrateTopicVideoMeta(topic);
}

function toggleTopic(topicId) {
  const progress = getRoadmapProgress();
  progress.completed = progress.completed.includes(topicId) ? progress.completed.filter((id) => id !== topicId) : [...progress.completed, topicId];
  saveRoadmapProgress(progress);
  if (activeRoadmapRoute) renderRoadmapPath(activeRoadmapRoute);
  selectRoadmapTopic(topicId);
  renderRoadmapRoutes();
}

function renderContinueCard() {
  if (!roadmapContinue) return;
  const progress = getRoadmapProgress();
  if (!progress.lastTopicId || !progress.lastRouteId) { roadmapContinue.hidden = true; return; }
  const topic = allRoadmapTopics().find((item) => item.id === progress.lastTopicId);
  const route = roadmapRoutes.find((item) => item.id === progress.lastRouteId);
  if (!topic || !route) { roadmapContinue.hidden = true; return; }
  const stats = routeStats(route);
  roadmapContinue.hidden = false;
  roadmapContinue.innerHTML = `
    <div>
      <span class="section-tag">continúa donde lo dejaste</span>
      <h3>${topic.routeTitle}</h3>
      <p>${stats.completed} / ${stats.total} temas completados · Siguiente punto: ${topic.title}</p>
    </div>
    <button class="btn btn-primary" type="button" data-continue-route="${topic.routeId}" data-continue-topic="${topic.id}">Continuar</button>
  `;
}

function normalizeRoadmapText(value) {
  return (value || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function renderRoadmapSearch() {
  if (!roadmapSearch || !roadmapSearchResults) return;
  const query = normalizeRoadmapText(roadmapSearch.value.trim());
  if (!query) { roadmapSearchResults.hidden = true; roadmapSearchResults.innerHTML = ""; return; }
  const terms = query.split(/\s+/).filter(Boolean);
  const results = allRoadmapTopics().filter((topic) => {
    const text = normalizeRoadmapText([topic.title, topic.routeTitle, topic.summary, topic.statusLabel, ...topic.tags].join(" "));
    return terms.every((term) => text.includes(term));
  }).slice(0, 12);
  roadmapSearchResults.hidden = false;
  roadmapSearchResults.innerHTML = results.length ? results.map((topic) => `
    <button type="button" data-search-topic="${topic.id}" data-search-route="${topic.routeId}">
      <span class="topic-pill is-${topic.status}">${topic.statusLabel}</span>
      <strong>${topic.title}</strong>
      <small>${topic.routeTitle}</small>
    </button>
  `).join("") : `<p>No hay resultados en el roadmap. Prueba con Linux, redes, phishing, Nmap o web.</p>`;
}

function analyzeAssistantIntent(text) {
  const normalized = normalizeRoadmapText(text);
  const words = normalized.split(/\s+/).filter(Boolean);
  const isGreeting = /^(hola|hey|buenas|buenos dias|buenas tardes|buenas noches|que tal|holaa)\b/.test(normalized);
  const isThanks = /\b(gracias|perfecto|vale|ok|genial|guay|muchas gracias)\b/.test(normalized);
  const asksHelp = /\b(ayuda|por donde empiezo|empezar|no se|perdido|perdida|recomienda|recomiendame|ruta|aprender)\b/.test(normalized);
  const asksDefinition = /\b(que es|que son|explica|explicame|como funciona|para que sirve|diferencia|diferencias)\b/.test(normalized);

  const topics = [
    { key: "phishing", terms: ["phishing", "correo falso", "email falso", "suplantacion"], answer: "El phishing es un engaño para que entregues datos, contraseñas o dinero creyendo que hablas con una entidad real. Mira remitente, enlaces, urgencia artificial y páginas de inicio de sesión raras.", route: "fundamentos-ciber" },
    { key: "troyanos", terms: ["troyano", "trojano", "malware", "virus", "infectado"], answer: "Un troyano es malware disfrazado de algo legítimo. Lo peligroso es que tú lo ejecutas pensando que es normal y por detrás puede robar datos, abrir puertas o descargar más amenazas.", route: "fundamentos-ciber" },
    { key: "spyware", terms: ["spyware", "camara", "keylogger", "teclado", "espiar"], answer: "El spyware intenta vigilar lo que haces: cámara, teclado, pantalla, navegación o archivos. Se combate con permisos mínimos, descargas fiables, actualizaciones y revisando comportamientos raros.", route: "fundamentos-ciber" },
    { key: "ransomware", terms: ["ransomware", "cifrado", "rescate", "archivos bloqueados"], answer: "El ransomware cifra archivos y pide dinero por recuperarlos. La defensa de verdad son copias de seguridad, actualizaciones y mucho cuidado con adjuntos o programas sospechosos.", route: "fundamentos-ciber" },
    { key: "ip", terms: ["ip", "direccion ip", "publica", "privada"], answer: "Una IP es una dirección para identificar dispositivos o redes. La pública te representa en Internet; la privada funciona dentro de tu red local, como la de casa.", route: "redes-desde-cero" },
    { key: "mac", terms: ["mac", "direccion mac", "wifi"], answer: "La dirección MAC identifica una tarjeta de red dentro de una red local. No es tu IP: la MAC trabaja más cerca del hardware y se usa para comunicarse dentro de la LAN.", route: "redes-desde-cero" },
    { key: "puertos", terms: ["puerto", "puertos", "nmap", "escaneo"], answer: "Los puertos son puertas lógicas por donde un equipo ofrece servicios. Por ejemplo, una web suele usar 80 o 443. Escanear puertos sirve para ver qué servicios están expuestos.", route: "hacking-pentesting" },
    { key: "vpn", terms: ["vpn", "privacidad", "tunel"], answer: "Una VPN cifra tu conexión hasta un servidor intermedio y oculta tu IP real frente a muchas webs. Ayuda en WiFi públicas y privacidad, pero no te hace anónimo ni evita un phishing.", route: "como-funciona-web" },
    { key: "linux", terms: ["linux", "kali", "terminal", "comandos", "bash"], answer: "Linux es muy usado en ciber porque da control, herramientas y una terminal potente. Si empiezas, aprende carpetas, permisos, procesos, red y comandos básicos antes de ir a herramientas avanzadas.", route: "linux-sistemas" },
    { key: "web", terms: ["web", "internet", "http", "https", "dns", "cookie", "deep web"], answer: "La web funciona por capas: el navegador pregunta DNS, conecta con un servidor, usa HTTP/HTTPS y recibe HTML, CSS y JavaScript. Entender eso ayuda muchísimo para ciber web.", route: "como-funciona-web" },
    { key: "osint", terms: ["osint", "metadatos", "investigar", "shodan"], answer: "OSINT es obtener información usando fuentes abiertas: buscadores, redes, metadatos, registros públicos o herramientas como Shodan. La clave es hacerlo con ética y contexto.", route: "casos-reales" },
  ];
  const matched = topics.filter((topic) => topic.terms.some((term) => normalized.includes(term)));
  return { normalized, words, isGreeting, isThanks, asksHelp, asksDefinition, matched };
}

function getRouteRecommendation(routeId, preferredTopicKey = "") {
  const route = roadmapRoutes.find((item) => item.id === routeId) || roadmapRoutes[0];
  const topic = route.topics.find((item) => item.status === "published" && normalizeRoadmapText(item.title).includes(preferredTopicKey))
    || route.topics.find((item) => item.status === "published")
    || route.topics[0];
  return { route, topic };
}

function recommendTopicFromText(text) {
  const intent = analyzeAssistantIntent(text);
  if (intent.matched.length) return getRouteRecommendation(intent.matched[0].route, intent.matched[0].key);
  const normalized = intent.normalized;
  const intentGroups = [
    { terms: ["cero", "principiante", "no se", "empezar", "perdido"], route: "informatica-base" },
    { terms: ["linux", "terminal", "bash", "kali"], route: "linux-sistemas" },
    { terms: ["red", "redes", "ip", "dns", "puerto", "wifi", "mac"], route: "redes-desde-cero" },
    { terms: ["web", "http", "html", "api", "cookie"], route: "como-funciona-web" },
    { terms: ["phishing", "malware", "ransomware", "ataque", "ciberseguridad"], route: "fundamentos-ciber" },
    { terms: ["pentesting", "hacking", "nmap", "wireshark", "osint"], route: "hacking-pentesting" },
    { terms: ["sql", "xss", "burp", "inyeccion", "hacking web"], route: "hacking-web" },
    { terms: ["caso", "real", "shodan", "deep web", "qr"], route: "casos-reales" },
    { terms: ["defensa", "blue", "soc", "siem", "edr"], route: "defensa-siguiente-paso" },
  ];
  const match = intentGroups.find((group) => group.terms.some((term) => normalized.includes(term)));
  return getRouteRecommendation(match?.route || "informatica-base");
}

function buildAssistantReply(text) {
  const intent = analyzeAssistantIntent(text);
  if (intent.isGreeting && intent.words.length <= 4) {
    return `<span class="assistant-name">Mantis Assistant</span><p>¡Hola! Soy la mantis de Ciber Sin Humo. Puedes preguntarme cosas tipo <strong>qué es una IP</strong>, <strong>cómo funciona el phishing</strong>, <strong>por dónde empezar</strong> o <strong>qué vídeo ver primero</strong>.</p>`;
  }
  if (intent.isThanks && intent.words.length <= 5) {
    return `<span class="assistant-name">Mantis Assistant</span><p>De nada. Cuando quieras, dime un tema y te lo explico sin humo: redes, malware, web, Linux, privacidad o ataques.</p>`;
  }
  if (intent.matched.length) {
    const main = intent.matched[0];
    const { route, topic } = getRouteRecommendation(main.route, main.key);
    const intro = intent.asksDefinition ? main.answer : `${main.answer} Si quieres verlo con ejemplos, te recomiendo esta parte del roadmap.`;
    return `<span class="assistant-name">Mantis Assistant</span><p>${intro}</p><p>Ruta recomendada: <strong>${route.title}</strong>. Primer paso útil: <strong>${topic.title}</strong>.</p><button type="button" class="assistant-route-link" data-assistant-route="${route.id}" data-assistant-topic="${topic.id}">Abrir esta ruta</button>`;
  }
  if (intent.asksHelp || intent.asksDefinition) {
    const { route, topic } = recommendTopicFromText(text);
    return `<span class="assistant-name">Mantis Assistant</span><p>Por cómo lo planteas, te llevaría a <strong>${route.title}</strong>. Ahí puedes avanzar sin saltarte base y ver ejemplos reales cuando toque.</p><p>Empieza por <strong>${topic.title}</strong>. Si quieres, pregúntame también el concepto concreto y te lo explico aquí antes de abrir el vídeo.</p><button type="button" class="assistant-route-link" data-assistant-route="${route.id}" data-assistant-topic="${topic.id}">Abrir esta ruta</button>`;
  }
  return `<span class="assistant-name">Mantis Assistant</span><p>Te leo, pero necesito un poco más de contexto para no mandarte a una ruta al azar. Prueba con algo como: <strong>quiero aprender redes</strong>, <strong>explícame phishing</strong>, <strong>qué es una VPN</strong> o <strong>quiero practicar con herramientas</strong>.</p>`;
}

function replayAssistantIntro() {
  if (!assistantOutput) return;
  assistantOutput.innerHTML = "";
  assistantOutput.dataset.initialized = "true";
  addAssistantMessage(`<span class="assistant-name">Mantis Assistant</span><p>Hola, soy la mantis de Ciber Sin Humo. Dime qué quieres aprender, qué tema te lía o qué vídeo estás buscando, y te oriento paso a paso.</p><p class="assistant-hint">Prueba: “no sé nada de redes”, “explícame VPN” o “quiero practicar con herramientas”.</p>`, "bot");
}

function handleAssistantPrompt(text) {
  addAssistantMessage(`<p>${text}</p>`, "user");
  addAssistantMessage(buildAssistantReply(text), "bot");
  const { route, topic } = recommendTopicFromText(text);
  const progress = getRoadmapProgress();
  progress.recommendedRouteId = route.id;
  progress.recommendedTopicId = topic.id;
  saveRoadmapProgress(progress);
}

function renderExploreVideos() {
  if (!roadmapExploreGrid) return;
  const published = allRoadmapTopics().filter((topic) => topic.status === "published").slice(0, 12);
  roadmapExploreGrid.innerHTML = published.map((topic) => `
    <article class="roadmap-video-card">
      <div class="roadmap-video-thumb">
        ${topic.thumbnail ? `<img src="${topic.thumbnail}" alt="Portada de ${topic.title}" loading="lazy">` : `<span>${topic.number}</span>`}
      </div>
      <span class="video-category">${topic.routeTitle}</span>
      <h3>${topic.title}</h3>
      <p>${topic.summary}</p>
      ${topic.url ? `<a href="${topic.url}" target="_blank" rel="noopener">Ver vídeo</a>` : `<button type="button" data-search-topic="${topic.id}" data-search-route="${topic.routeId}">Ver nodo</button>`}
    </article>
  `).join("");
}

if (roadmapRoutesContainer) {
  renderRoadmapRoutes();
  renderExploreVideos();
  renderContinueCard();
  roadmapRoutesContainer.addEventListener("click", (event) => {
    const card = event.target.closest("[data-roadmap-route]");
    if (card) openRoadmapRoute(card.dataset.roadmapRoute);
  });
  roadmapPath?.addEventListener("click", (event) => {
    const node = event.target.closest("[data-topic-id]");
    if (node) selectRoadmapTopic(node.dataset.topicId);
  });
  roadmapDetail?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-toggle-topic]");
    if (button) toggleTopic(button.dataset.toggleTopic);
  });
  roadmapBack?.addEventListener("click", () => {
    roadmapView.hidden = true;
    activeRoadmapRoute = null;
    document.getElementById("roadmap-panels")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  roadmapSearch?.addEventListener("input", renderRoadmapSearch);
  document.querySelectorAll("[data-roadmap-chip]").forEach((chip) => chip.addEventListener("click", () => {
    roadmapSearch.value = chip.dataset.roadmapChip;
    renderRoadmapSearch();
    roadmapSearch.focus();
  }));
  roadmapSearchResults?.addEventListener("click", (event) => {
    const item = event.target.closest("[data-search-topic]");
    if (item) openRoadmapRoute(item.dataset.searchRoute, item.dataset.searchTopic);
  });
  document.addEventListener("click", (event) => {
    const item = event.target.closest("[data-continue-route], [data-assistant-route]");
    if (item) {
      const panels = document.getElementById("roadmap-panels");
      const videosSection = document.getElementById("videos");
      panels?.classList.add("is-open");
      videosSection?.classList.add("is-roadmap-open");
      openRoadmapRoute(item.dataset.continueRoute || item.dataset.assistantRoute, item.dataset.continueTopic || item.dataset.assistantTopic);
    }
  });
  const openRoadmapScreen = () => {
    const panels = document.getElementById("roadmap-panels");
    const videosSection = document.getElementById("videos");
    panels?.classList.add("is-open");
    videosSection?.classList.add("is-roadmap-open");
    document.body.classList.add("roadmap-fullscreen-mode");
    roadmapView.hidden = true;
    activeRoadmapRoute = null;
    videosSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    startRoadmapSolarSystem();
  };

  const closeRoadmapScreen = () => {
    const panels = document.getElementById("roadmap-panels");
    const videosSection = document.getElementById("videos");
    panels?.classList.remove("is-open");
    videosSection?.classList.remove("is-roadmap-open");
    document.body.classList.remove("roadmap-fullscreen-mode");
    roadmapView.hidden = true;
    activeRoadmapRoute = null;
    stopRoadmapSolarSystem();
    videosSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.querySelectorAll("[data-roadmap-scroll]").forEach((button) => button.addEventListener("click", openRoadmapScreen));
  document.querySelectorAll("[data-roadmap-chat-back]").forEach((button) => button.addEventListener("click", closeRoadmapScreen));
  assistantForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = assistantInput.value.trim();
    if (!text) return;
    assistantInput.value = "";
    handleAssistantPrompt(text);
  });
  document.querySelectorAll("[data-assistant-prompt]").forEach((button) => button.addEventListener("click", () => handleAssistantPrompt(button.dataset.assistantPrompt)));

  if (assistantOutput && !assistantOutput.dataset.initialized) {
    window.setTimeout(replayAssistantIntro, 260);
  }
}

const learningRoutes = Object.fromEntries(roadmapRoutes.map((route) => [route.id, {
  tag: route.level,
  title: route.title,
  desc: route.description,
  filterOrder: ["Todos", ...new Set(route.topics.flatMap((topic) => topic.tags))],
  videos: route.topics.filter((topic) => topic.status === "published").map((topic) => ({
    title: topic.title,
    category: topic.tags[0] || route.title,
    type: topic.url ? "youtube" : "placeholder",
    url: topic.url,
    thumbnailUrl: topic.thumbnail,
    badge: topic.statusLabel,
    description: topic.summary
  }))
}]));

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
    url: "https://www.youtube.com/watch?v=g3WsvKOQ_GE",
    thumbnail: "https://i.ytimg.com/vi/g3WsvKOQ_GE/hqdefault.jpg",
    category: "Noticias",
    title: "Red 764, qué es y por qué preocupa",
  });

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

const MIN_VISIBLE_SUBSCRIBERS = 97;

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
function letterizeSectionTitle(sectionId) {
  const section = document.getElementById(sectionId);
  const title = section?.querySelector(".section-title");
  if (!section || !title) return;

  if (title.dataset.letterized !== "true") {
    const text = title.textContent || "";
    title.textContent = "";
    title.classList.add("channel-title-letters");
    title.dataset.letterized = "true";
    Array.from(text).forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "title-letter";
      span.style.setProperty("--i", String(index));
      span.textContent = char === " " ? "\u00a0" : char;
      title.appendChild(span);
    });
  }

  const replay = () => {
    section.classList.remove("is-title-visible");
    void section.offsetWidth;
    section.classList.add("is-title-visible");
  };

  if (!("IntersectionObserver" in window)) { replay(); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) replay();
      else section.classList.remove("is-title-visible");
    });
  }, { threshold: 0.32 });
  observer.observe(section);
}

function initVideoSectionReplay() {
  const section = document.getElementById("videos");
  if (!section || !assistantOutput || !("IntersectionObserver" in window)) return;
  let lastReplay = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || section.classList.contains("is-roadmap-open")) return;
      const now = Date.now();
      if (now - lastReplay < 1200) return;
      lastReplay = now;
      replayAssistantIntro();
    });
  }, { threshold: 0.48 });
  observer.observe(section);
}

letterizeSectionTitle("canal");
letterizeSectionTitle("videos");
initVideoSectionReplay();

