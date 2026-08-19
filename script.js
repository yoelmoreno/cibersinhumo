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

const fadeEls = document.querySelectorAll(".video-card, .path-card, .recurso-group, .blog-card, .section-header, .sugerencias-form, .ip-tool, .security-checklist, .labs-shell");

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
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/YfnVA5sx3pQ",
        "thumbnail": "https://i.ytimg.com/vi/YfnVA5sx3pQ/hqdefault.jpg",
        "summary": "Hardware y software explicados desde cero para entender la base de cualquier sistema.",
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
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/plaRNTudKPA",
        "thumbnail": "https://i.ytimg.com/vi/plaRNTudKPA/hqdefault.jpg",
        "summary": "Sistemas operativos explicados desde cero: qu\u00e9 hacen, por qu\u00e9 existen y c\u00f3mo conectan el hardware con los programas.",
        "tags": [
          "Inform\u00e1tica base"
        ],
        "level": "Nivel 0",
        "route": "Inform\u00e1tica base"
      },
      {
        "id": "topic-3",
        "number": 3,
        "title": "Todo lo que un principiante debería saber de Linux",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://www.youtube.com/watch?v=dp8vyvcoSMs",
        "thumbnail": "https://i.ytimg.com/vi/dp8vyvcoSMs/hqdefault.jpg",
        "summary": "Una introducción clara a Linux para entender qué es, por qué se usa tanto en informática y por qué aparece constantemente en ciberseguridad.",
        "tags": [
          "Informática base",
          "Linux"
        ],
        "level": "Nivel 0",
        "route": "Informática base"
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
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
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
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
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
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
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
        "title": "Qu\u00e9 pasa cuando entras en una web?",
        "status": "published",
        "statusLabel": "Publicado",
        "url": "https://youtu.be/pjC6xG8Ncpg",
        "thumbnail": "https://i.ytimg.com/vi/pjC6xG8Ncpg/hqdefault.jpg",
        "summary": "El viaje completo desde que escribes una URL hasta que la web aparece en pantalla.",
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
        "url": "https://youtu.be/IsmWOCmjz44",
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
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
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
        "status": "pending",
        "statusLabel": "Pendiente",
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
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
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
        "status": "pending",
        "statusLabel": "Pendiente",
        "url": "",
        "thumbnail": "",
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
        "status": "published",
        "statusLabel": "Publicado",
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
,
  {
    "id": "programacion-hacking",
    "level": "Nivel 10",
    "title": "Programacion orientada al hacking",
    "description": "Scripting, automatizacion y lenguajes utiles para entender herramientas, crear pruebas y leer codigo.",
    "icon": "code",
    "topics": []
  },
  {
    "id": "criptografia",
    "level": "Nivel 11",
    "title": "Criptografia sin humo",
    "description": "Hashes, cifrado, claves, certificados y conceptos criptograficos aplicados a seguridad real.",
    "icon": "crypto",
    "topics": []
  }
];

const roadmapExpansionRows = `
225|informatica-base|CPU, RAM y almacenamiento: como piensa un ordenador|CPU, memoria y almacenamiento explicados como base para entender rendimiento, procesos y ataques.|Informatica base,Hardware|cpu,memory,storage,computer_basics|computer_basics|1|
226|informatica-base|BIOS, UEFI y arranque: que pasa al encender el PC|El recorrido desde que pulsas el boton hasta que carga el sistema operativo.|Informatica base,Sistemas|boot,operating_systems|computer_basics|1|
227|informatica-base|Usuarios, permisos y administrador sin complicarlo|Por que existen cuentas, privilegios y permisos antes de hablar de root o sudo.|Informatica base,Permisos|permissions,operating_systems|operating_systems|1|
228|informatica-base|Virtualizacion: laboratorios seguros antes de tocar nada real|Que es una maquina virtual y por que es tan importante para practicar ciberseguridad con seguridad.|Informatica base,Labs|virtual_machines,labs|operating_systems|1|Crear una maquina virtual de pruebas y documentar que red usa.
229|programacion-hacking|Programacion para ciber: Python, Bash, C, JavaScript y SQL|Para que sirve cada lenguaje en ciber sin convertirlo en un curso entero de programacion.|Programacion,Informatica base|programming,python,bash,c_language,javascript,sql|computer_basics|2|
230|linux-sistemas|Servicios, demonios y procesos en segundo plano|Como funcionan los servicios que se quedan ejecutando en un sistema Linux.|Linux,Sistemas|services,linux|linux,terminal|2|Ver servicios activos y diferenciar proceso puntual de servicio persistente.
231|linux-sistemas|PATH, variables de entorno y configuracion del sistema|Por que un comando se encuentra, de donde salen las variables y como afecta al sistema.|Linux,Terminal|environment_variables,terminal|terminal|2|
232|linux-sistemas|Logs en Linux: mirar que ha pasado de verdad|Primer acercamiento a registros del sistema para investigar errores, accesos y actividad sospechosa.|Linux,Blue Team|logs,blue_team|linux,terminal|2|Buscar eventos basicos en logs y explicar que significan.
233|redes-desde-cero|Switch, punto de acceso, Ethernet y Wi-Fi|Las piezas reales de una red domestica o de laboratorio antes de capturar trafico.|Redes,Wi-Fi|switch,wifi,networking|networking|2|
234|redes-desde-cero|Capturar trafico: ver paquetes antes de analizarlos|Que significa capturar trafico y por que Wireshark ayuda a entender lo que viaja por la red.|Redes,Wireshark|wireshark,packet_capture|tcp_udp,dns|3|Capturar una consulta DNS y localizar origen, destino y protocolo.
235|redes-desde-cero|Wi-Fi publico: riesgos reales y que protege cada capa|Que puede pasar en una red publica y que papel tienen HTTPS, VPN y buenas practicas.|Redes,Privacidad|wifi,privacy,vpn|web_basics,vpn|2|
236|redes-desde-cero|Bluetooth, NFC e IoT: redes pequenas que tambien importan|Dispositivos cotidianos conectados, superficie de ataque y errores frecuentes.|Redes,IoT|iot,mobile_security,networking|networking|3|
237|como-funciona-web|Hosting, CDN y cache: por que una web carga rapido|Donde vive una web, como llega al navegador y por que se guarda contenido por el camino.|Web,Infraestructura|hosting,cdn,cache,web_basics|dns,http|3|
238|como-funciona-web|Peticion y respuesta completa: URL, parametros, headers y body|La anatomia de una peticion HTTP antes de aprender Burp o hacking web.|Web,HTTP|http_requests,headers,url|http|3|
239|como-funciona-web|Formularios, tokens y sesiones: como una web recuerda quien eres|Autenticacion, cookies, tokens y sesiones explicados desde el flujo de usuario.|Web,Sesiones|sessions,tokens,authentication|cookies,http_requests|3|
240|como-funciona-web|SQL desde cero antes de hablar de SQL Injection|Tablas, consultas y datos para entender por que una inyeccion SQL puede funcionar.|Web,Bases de datos|sql,databases|web_basics|3|
241|como-funciona-web|APIs REST, JSON y DevTools para entender aplicaciones modernas|Como hablan las aplicaciones web por dentro y como observarlo desde el navegador.|Web,APIs|api,json,devtools|http_requests,javascript|3|Abrir DevTools y localizar una peticion fetch o XHR sencilla.
242|fundamentos-ciber|Amenaza, riesgo, superficie y vector de ataque|Las palabras que ordenan cualquier problema de seguridad antes de hablar de herramientas.|Fundamentos,Riesgo|risk,threat_modeling,cybersecurity|cybersecurity|2|
243|fundamentos-ciber|CVE, CWE y CVSS: entender una vulnerabilidad publicada|Como se nombran, clasifican y priorizan vulnerabilidades reales.|Fundamentos,Vulnerabilidades|cve,cwe,cvss,vulnerabilities|vulnerabilities|3|
244|fundamentos-ciber|Payload, exploit y zero-day sin humo|Diferenciar fallo, tecnica, codigo que lo aprovecha y vulnerabilidad desconocida.|Fundamentos,Exploits|exploit,payload,zero_day|vulnerabilities|3|
245|fundamentos-ciber|Rootkit, RAT, botnet y backdoor: malware con persistencia|Familias y comportamientos de malware mas alla del virus clasico.|Malware|rootkit,rat,botnet,backdoor,malware|malware|3|
246|criptografia|Cifrar, codificar y hacer hash no es lo mismo|La diferencia practica entre ocultar, transformar y verificar datos.|Criptografia|cryptography,hashing,encoding,encryption|computer_basics|2|
247|criptografia|AES, RSA, firmas y certificados explicados sin matematicas|Criptografia simetrica, asimetrica y confianza digital aplicada a Internet.|Criptografia,Web|cryptography,certificates,tls|cryptography,http|3|
248|fundamentos-ciber|Privacidad cotidiana: cookies, trackers, Tor y VPN con sentido comun|Que protege cada herramienta y que no protege, sin vender magia.|Privacidad|privacy,trackers,tor,vpn,cookies|web_basics|2|
249|fundamentos-ciber|IA generativa y ciberseguridad: riesgos, usos y limites|LLMs, phishing con IA, prompt injection y automatizacion defensiva explicados con cabeza.|IA,Ciberseguridad|ai_security,prompt_injection,phishing|cybersecurity,web_basics|3|
250|hacking-pentesting|Metodologia de pentesting: de permiso a informe|Fases de un pentest etico: alcance, reconocimiento, explotacion controlada, evidencias e informe.|Pentesting,Metodologia|pentesting_methodology,reporting|pentesting|3|
251|hacking-pentesting|Enumeracion de servicios despues del escaneo|Que hacer con un puerto abierto: identificar version, servicio y posibles rutas de prueba.|Pentesting,Nmap|enumeration,network_scanning|nmap,ports|3|Partir de un resultado de Nmap y escribir hipotesis de enumeracion.
252|hacking-pentesting|Metasploit y exploits solo en laboratorio autorizado|Como entender frameworks de explotacion sin saltarse la parte legal ni la metodologia.|Pentesting,Labs|metasploit,exploit,labs|enumeration,vulnerabilities|4|
253|programacion-hacking|Scripts utiles para pentesting con Python y Bash|Automatizar tareas repetitivas sin depender siempre de herramientas cerradas.|Pentesting,Programacion|python,bash,automation,pentesting|programming,terminal|4|
254|hacking-web|IDOR y control de acceso roto|Cuando una aplicacion permite ver o modificar recursos que no deberias tocar.|Hacking web,OWASP|idor,access_control,web_hacking|http_requests,sessions|4|
255|hacking-web|File inclusion, path traversal y subidas de archivos|Errores comunes al manejar rutas, ficheros y archivos enviados por usuarios.|Hacking web,OWASP|file_inclusion,path_traversal,upload_vulnerabilities|web_basics,linux|4|
256|hacking-web|SSRF, XXE y SSTI: cuando el servidor hace cosas por ti|Vulnerabilidades donde el backend procesa entradas peligrosas o accede a recursos internos.|Hacking web,OWASP|ssrf,xxe,ssti,web_hacking|http_requests,backend|5|
257|hacking-web|JWT, seguridad de APIs y fallos de logica|Tokens, endpoints y errores de diseno que no siempre se ven con un escaner.|Hacking web,APIs|jwt,api_security,business_logic|api,sessions|5|
258|casos-reales|OSINT practico: dorks, usuarios, dominios y WHOIS|Como investigar informacion publica sin cruzar lineas legales ni eticas.|OSINT,Casos reales|osint,google_dorks,whois|web_basics|3|Localizar informacion publica de un dominio de laboratorio y documentar fuentes.
259|casos-reales|Metadatos, EXIF y busqueda inversa de imagenes|Que informacion puede esconder un archivo o una imagen y como revisarla.|OSINT,Metadatos|metadata,exif,reverse_image_search|osint|3|
260|casos-reales|Wayback Machine, filtraciones y OPSEC|Buscar huellas historicas, entender filtraciones y proteger tu propia exposicion.|OSINT,Privacidad|wayback,leaks,opsec,privacy|osint|3|
261|casos-reales|Analisis de malware: estatico vs dinamico|Dos formas de observar malware sin ejecutarlo a lo loco ni salir del laboratorio.|Malware,Analisis|malware_analysis,static_analysis,dynamic_analysis|malware,virtual_machines|4|
262|casos-reales|Hashes, Strings, VirusTotal y sandbox|Herramientas basicas para observar un archivo sospechoso con prudencia.|Malware,Herramientas|hashing,virustotal,sandbox,malware_analysis|malware_analysis,hashing|4|Analizar un archivo benigno de laboratorio con hashes y cadenas.
263|casos-reales|C2, persistencia y ofuscacion explicados desde un caso|Conceptos de malware avanzado explicados a nivel defensivo y educativo.|Malware,Casos reales|c2,persistence,obfuscation,malware|malware_analysis|4|
264|casos-reales|Android, APK, permisos, root y jailbreak|Seguridad movil explicada desde permisos, instalacion de apps y riesgos reales.|Mobile,Privacidad|mobile_security,android,apk,permissions|operating_systems,privacy|3|
265|casos-reales|Camaras IP, routers, Smart TV e IoT mal configurado|Dispositivos conectados que suelen fallar por exposicion, credenciales o configuracion.|IoT,Casos reales|iot,shodan,networking|networking,osint|3|
266|defensa-siguiente-paso|Logs, eventos y alertas: aprender a mirar senales|La base de la defensa: saber que ha pasado y donde buscar evidencias.|Blue Team,Defensa|logs,alerts,blue_team|logs,cybersecurity|3|
267|defensa-siguiente-paso|IOC, TTP y MITRE ATT&CK|Indicadores, comportamientos y mapas para entender como actua un atacante.|Blue Team,Threat Intel|ioc,ttp,mitre,threat_intelligence|cybersecurity|3|
268|defensa-siguiente-paso|IDS, IPS, EDR, XDR y SIEM: que hace cada herramienta|No memorizar siglas: entender que observa, bloquea o correlaciona cada sistema.|Blue Team,Herramientas|ids,ips,edr,xdr,siem|logs,networking|4|
269|defensa-siguiente-paso|Hardening, parches y gestion de vulnerabilidades|Reducir superficie de ataque antes de que llegue el incidente.|Defensa,Hardening|hardening,patching,vulnerability_management|vulnerabilities|3|
270|defensa-siguiente-paso|Incident Response: contener, erradicar y recuperar|Que hacer cuando ya ha pasado algo: ordenar la respuesta sin improvisar.|Blue Team,Incidentes|incident_response,containment,recovery|logs,malware|4|
271|defensa-siguiente-paso|Forense digital: evidencias, hashes y cadena de custodia|Como tratar evidencias sin romperlas ni perder su valor.|Forense,Defensa|forensics,evidence,chain_of_custody,hashing|logs,hashing|4|
272|defensa-siguiente-paso|Timeline, disco y memoria RAM en forense|Primer mapa de lo que se puede analizar en un equipo comprometido.|Forense,Sistemas|forensics,memory_forensics,disk_forensics|forensics,operating_systems|5|
273|defensa-siguiente-paso|Cloud Security: servidores, buckets, IAM y responsabilidad compartida|Conceptos minimos para entender seguridad en nube sin perderse en proveedores.|Cloud,Defensa|cloud_security,iam,shared_responsibility|networking,web_basics|4|
274|defensa-siguiente-paso|Profesiones en ciber: pentester, SOC, DFIR, AppSec, GRC y mas|Un mapa realista de salidas laborales para elegir camino sin humo.|Profesiones,Ciberseguridad|cyber_careers,cyber_roles|cybersecurity|2|
276|programacion-hacking|Por que los hackers necesitan saber programar?|Programar ayuda a automatizar, entender herramientas, leer exploits y crear pruebas propias en laboratorio.|Programacion,Hacking|programming,automation,pentesting|computer_basics|2|
277|programacion-hacking|Que lenguaje de programacion aprender para ciberseguridad?|Mapa rapido de Python, Bash, C, JavaScript y SQL segun el area de ciberseguridad.|Programacion,Roadmap|programming,python,bash,c_language,javascript,sql|computer_basics|2|
278|programacion-hacking|Python para hacking: por que se usa tanto?|Python como lenguaje practico para scripts, automatizacion, APIs y pequenas herramientas de seguridad.|Python,Programacion|python,automation,pentesting|programming|2|
279|programacion-hacking|Bash: automatizando Linux desde la terminal|Bash para unir comandos, automatizar tareas y trabajar mas rapido en sistemas Linux.|Bash,Linux|bash,terminal,automation|terminal,linux|3|
280|programacion-hacking|Por que C es tan importante en ciberseguridad?|C como base para entender memoria, binarios, sistemas y vulnerabilidades clasicas.|C,Programacion|c_language,memory,exploit|programming,computer_basics|3|
281|programacion-hacking|JavaScript para hackers: el lenguaje que ejecuta tu navegador|JavaScript explicado desde el punto de vista de la web, el navegador y la seguridad web.|JavaScript,Web|javascript,web_basics,web_hacking|web_basics|3|
282|programacion-hacking|SQL: el lenguaje detras de las bases de datos|SQL para entender como se consultan datos antes de hablar de SQL Injection.|SQL,Web|sql,databases|web_basics|3|
283|programacion-hacking|Tu primer script de ciberseguridad con Python|Crear un script sencillo para empezar a automatizar tareas sin complicarse.|Python,Labs|python,automation,labs|programming|3|Crear un script que lea una lista y muestre resultados ordenados.
284|programacion-hacking|Como crear un escaner de puertos sencillo con Python|Escaneo basico de puertos para entender sockets, tiempos de espera y servicios abiertos.|Python,Redes|python,ports,sockets,network_scanning|ports,python|4|Crear un escaner local contra un entorno propio.
285|programacion-hacking|Como hacer peticiones HTTP con Python|Usar Python para pedir una pagina, leer una respuesta y entender codigo de estado y headers.|Python,HTTP|python,http_requests,api|http_requests,python|3|
286|programacion-hacking|Sockets: como se comunican dos programas por Internet|Sockets explicados como la pieza base de muchas comunicaciones de red.|Redes,Programacion|sockets,networking,python|tcp_udp,programming|3|
287|programacion-hacking|Como automatizar tareas de ciberseguridad con Python|Automatizacion de tareas repetitivas como leer archivos, consultar APIs o procesar resultados.|Python,Automatizacion|python,automation,api|python|3|
288|programacion-hacking|Como leer y modificar un exploit escrito en Python|Entender un exploit publico a nivel educativo y adaptarlo solo a laboratorios autorizados.|Python,Exploits|python,exploit,pentesting|python,vulnerabilities|4|
289|programacion-hacking|Como analizar logs automaticamente con Python|Leer registros, filtrar patrones y detectar eventos interesantes con scripts sencillos.|Python,Blue Team|python,logs,blue_team|python,logs|4|Parsear un log de ejemplo y contar eventos por tipo.
290|programacion-hacking|Como crear una herramienta de linea de comandos|Argumentos, salida, errores y estructura basica de una herramienta propia.|Programacion,Terminal|programming,terminal,automation|python,terminal|3|
291|programacion-hacking|Que es una API y como interactuar con ella desde Python?|APIs vistas desde la practica: endpoint, respuesta JSON y automatizacion con Python.|Python,APIs|api,python,json,http_requests|http_requests,python|3|
292|programacion-hacking|Como funcionan los argumentos de un programa|Que son los parametros de entrada y por que importan al crear herramientas o explotar fallos.|Programacion,Terminal|programming,terminal|programming|2|
293|programacion-hacking|Compilado vs interpretado: C vs Python|Diferencia entre compilar y ejecutar scripts para entender binarios y lenguajes.|Programacion,C|c_language,python,programming|programming|3|
294|programacion-hacking|Que es realmente un puntero y por que importa en hacking?|Punteros explicados como direcciones de memoria antes de hablar de bugs de memoria.|C,Memoria|c_language,memory,exploit|c_language,memory|4|
295|programacion-hacking|Stack vs Heap explicado facil|Dos zonas de memoria clave para entender vulnerabilidades y ejecucion de programas.|C,Memoria|memory,c_language,exploit|c_language,memory|4|
296|programacion-hacking|Que es un Buffer Overflow?|Desbordamiento de buffer explicado de forma introductoria y segura.|C,Exploits|buffer_overflow,c_language,exploit|c_language,memory|5|
297|programacion-hacking|Por que C puede provocar vulnerabilidades de memoria?|Errores tipicos de memoria en C y por que lenguajes de bajo nivel requieren cuidado.|C,Memoria|c_language,memory,exploit|c_language,memory|4|
298|programacion-hacking|Variables no inicializadas: como pueden convertirse en una vulnerabilidad|Como un valor sin inicializar puede provocar comportamientos inesperados.|C,Memoria|c_language,memory,vulnerabilities|c_language|4|
299|programacion-hacking|Que es un segmentation fault?|Por que un programa puede fallar al acceder mal a memoria.|C,Memoria|c_language,memory|c_language,memory|4|
300|programacion-hacking|Que es la corrupcion de memoria?|Concepto base para entender fallos de memoria, crashes y explotacion avanzada.|C,Memoria|memory,c_language,exploit|c_language,memory|4|
301|programacion-hacking|Que es Assembly y por que aparece en hacking?|Introduccion a Assembly para saber por que aparece en reversing y explotacion.|Assembly,Reversing|assembly,reverse_engineering,c_language|c_language,memory|5|
302|programacion-hacking|Como encontrar informacion interesante leyendo codigo fuente|Leer codigo para descubrir rutas, claves mal guardadas, comentarios o logica sensible.|Programacion,OSINT|source_code,programming,osint|programming|3|
303|programacion-hacking|Que es un PoC de una vulnerabilidad?|Prueba de concepto explicada como demostracion controlada de un fallo.|Exploits,Programacion|poc,exploit,vulnerabilities|vulnerabilities|3|
304|programacion-hacking|De CVE a codigo: como funciona un exploit publico|Leer una vulnerabilidad publicada y entender como se traduce en una prueba tecnica.|Exploits,CVE|cve,exploit,poc|cve,programming|4|
305|criptografia|Que es la criptografia?|Base de la criptografia: proteger informacion usando matematicas, claves y protocolos.|Criptografia|cryptography|computer_basics|2|
306|criptografia|Cifrado vs hashing vs codificacion: no son lo mismo|Diferenciar cifrar, hashear y codificar con ejemplos simples.|Criptografia|cryptography,hashing,encoding,encryption|computer_basics|2|
307|criptografia|Que es Base64 y por que no es cifrado?|Base64 explicado como codificacion, no como proteccion real de datos.|Criptografia|encoding|computer_basics|2|
308|criptografia|El cifrado Cesar: asi empezo la criptografia|Un ejemplo historico sencillo para entender sustitucion y claves.|Criptografia|cryptography,encryption|cryptography|2|
309|criptografia|Que es una clave criptografica?|Que papel tiene una clave y por que protegerla es tan importante.|Criptografia|cryptography,encryption|cryptography|2|
310|criptografia|Cifrado simetrico explicado facil|Una misma clave para cifrar y descifrar, con ejemplos cotidianos.|Criptografia|cryptography,encryption|cryptography|2|
311|criptografia|Cifrado asimetrico explicado facil|Clave publica y privada explicadas sin matematicas imposibles.|Criptografia|cryptography,encryption|cryptography|3|
312|criptografia|Que diferencia hay entre clave publica y privada?|Como se usan las claves en HTTPS, SSH y firmas digitales.|Criptografia|cryptography,certificates|cryptography|3|
313|criptografia|AES: el cifrado que esta por todas partes|AES explicado como cifrado simetrico moderno usado en muchos sistemas.|Criptografia|cryptography,encryption|cryptography|3|
314|criptografia|RSA explicado sin matematicas imposibles|RSA como idea de clave publica y privada aplicada a comunicaciones seguras.|Criptografia|cryptography,certificates|cryptography|3|
315|criptografia|Que es un hash?|Huella digital de datos para verificar integridad y comparar informacion.|Criptografia|hashing|computer_basics|2|
316|criptografia|SHA-256: como crear una huella digital de un archivo|Usar SHA-256 para comprobar que un archivo no ha cambiado.|Criptografia,Labs|hashing|hashing|3|Calcular el hash de un archivo de prueba y comprobar cambios.
317|criptografia|Por que un hash no se puede descifrar?|Por que un hash no funciona como un cifrado reversible.|Criptografia|hashing,encryption|hashing|3|
318|criptografia|MD5: el algoritmo que ya no deberias usar|Por que algunos algoritmos se quedan obsoletos y que riesgos tienen.|Criptografia|hashing,vulnerabilities|hashing|3|
319|criptografia|Como guardan realmente las webs tus contrasenas?|Hashing de contrasenas, sal y buenas practicas a nivel conceptual.|Criptografia,Web|hashing,authentication,databases|hashing,web_basics|3|
320|criptografia|Que es un salt y por que protege las contrasenas?|El papel de la sal para dificultar ataques contra hashes de contrasenas.|Criptografia|hashing,authentication|hashing|3|
321|criptografia|Que son las Rainbow Tables?|Tablas precalculadas y por que el salt ayuda a frenarlas.|Criptografia|hashing,vulnerabilities|hashing|3|
322|criptografia|Fuerza bruta vs ataque de diccionario|Diferenciar dos ataques contra contrasenas y hashes.|Criptografia,Ataques|hashing,authentication|hashing|3|
323|criptografia|Como funciona HTTPS realmente?|HTTPS explicado como HTTP protegido por TLS y certificados.|Criptografia,Web|tls,certificates,http|http,cryptography|3|
324|criptografia|Que ocurre cuando aparece el candado del navegador?|El candado del navegador explicado: identidad, cifrado y limites reales.|Criptografia,Web|tls,certificates,web_basics|http,cryptography|3|
325|criptografia|Que es TLS?|TLS como protocolo que protege comunicaciones en Internet.|Criptografia,Web|tls,certificates|http,cryptography|3|
326|criptografia|Que es un certificado digital?|Certificados como forma de demostrar identidad en la web.|Criptografia,Web|certificates,tls|tls|3|
327|criptografia|Quien decide si un certificado es de confianza?|Cadena de confianza y autoridades reconocidas por el navegador.|Criptografia,Web|certificates,tls|certificates|3|
328|criptografia|Que es una Autoridad Certificadora?|El papel de las CA en HTTPS y certificados digitales.|Criptografia,Web|certificates,tls|certificates|3|
329|criptografia|Que es una firma digital?|Firmas digitales para verificar autoria e integridad.|Criptografia|cryptography,certificates|cryptography|3|
330|criptografia|Firma digital vs firma electronica|Diferencias practicas entre concepto tecnico y uso legal/cotidiano.|Criptografia|cryptography,certificates|cryptography|3|
331|criptografia|Como sabe tu ordenador que una actualizacion es legitima?|Firmas, certificados y confianza en actualizaciones de software.|Criptografia,Sistemas|cryptography,certificates,operating_systems|cryptography,operating_systems|4|
332|criptografia|Como funcionan las claves SSH?|Claves SSH, autenticacion y acceso seguro a servidores.|Criptografia,Linux|cryptography,ssh,authentication|linux,cryptography|3|
333|criptografia|Como funciona el cifrado de extremo a extremo?|E2EE explicado como proteccion entre emisor y receptor.|Criptografia,Privacidad|cryptography,privacy|cryptography|3|
334|criptografia|Puede WhatsApp leer tus mensajes? Cifrado de extremo a extremo|Que protege el cifrado de extremo a extremo y que metadatos pueden seguir existiendo.|Criptografia,Privacidad|cryptography,privacy|cryptography|3|
335|criptografia|Como se cifra un disco duro?|Cifrado de disco para proteger datos si pierdes el equipo.|Criptografia,Sistemas|cryptography,encryption,operating_systems|cryptography,operating_systems|3|
336|criptografia|Que hace BitLocker realmente?|BitLocker explicado como cifrado de disco integrado en Windows.|Criptografia,Sistemas|cryptography,encryption,operating_systems|cryptography,operating_systems|3|
337|criptografia|Como protege una VPN tus datos?|La parte criptografica de una VPN y que limites sigue teniendo.|Criptografia,Privacidad|cryptography,vpn,privacy|vpn,cryptography|3|
338|criptografia|Puede romperse un cifrado?|Ataques, implementaciones debiles, claves robadas y algoritmos obsoletos.|Criptografia|cryptography,vulnerabilities|cryptography|4|
339|criptografia|Que pasa si alguien roba tu clave privada?|Riesgos de robo de clave privada y por que se revocan certificados o accesos.|Criptografia|cryptography,certificates|cryptography|3|
340|criptografia|Por que reutilizar claves criptograficas puede ser peligroso?|Buenas practicas para no usar la misma clave donde no toca.|Criptografia|cryptography,encryption|cryptography|3|
341|criptografia|Que es un ataque Man-in-the-Middle y que papel juega la criptografia?|MITM visto desde certificados, TLS y confianza.|Criptografia,Ataques|mitm,cryptography,tls|mitm,cryptography|3|
342|criptografia|Podran los ordenadores cuanticos romper nuestras contrasenas?|Introduccion realista a computacion cuantica y criptografia actual.|Criptografia|cryptography,quantum|cryptography|4|
343|criptografia|Que es la criptografia post-cuantica?|Por que se preparan algoritmos resistentes a futuros ordenadores cuanticos.|Criptografia|cryptography,post_quantum|cryptography|4|
344|criptografia|Como comprobar que un archivo descargado no ha sido modificado|Verificacion de hashes para descargar archivos con mas seguridad.|Criptografia,Labs|hashing,security_habits|hashing|3|Comparar el hash publicado de un archivo con el hash local.`.trim().split("\n").map((row) => {
  const [number, routeId, title, summary, tags, concepts, prerequisites, difficulty, lab] = row.split("|");
  return { id: `topic-${number}`, number: Number(number), routeId, title, summary, tags: tags.split(","), concepts: concepts.split(","), prerequisites: prerequisites ? prerequisites.split(",").filter(Boolean) : [], difficulty: Number(difficulty), lab };
});

function applyRoadmapExpansion() {
  const cleanTitle = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  const topicKey = (routeId, title) => `${routeId}:${cleanTitle(title)}`;
  const existingTopics = new Set(roadmapRoutes.flatMap((route) =>
    (route.topics || []).map((topic) => topicKey(route.id, topic.title))
  ));

  roadmapExpansionRows.forEach((topic) => {
    const route = roadmapRoutes.find((item) => item.id === topic.routeId);
    if (!route) return;

    const key = topicKey(route.id, topic.title);
    if (existingTopics.has(key)) return;

    route.topics.push({
      id: topic.id,
      number: topic.number,
      title: topic.title,
      status: "pending",
      statusLabel: "Pendiente",
      url: "",
      thumbnail: "",
      summary: topic.summary,
      tags: topic.tags,
      level: route.level,
      route: route.title,
      lab: topic.lab || ""
    });
    existingTopics.add(key);
  });

  roadmapRoutes.forEach((route) => {
    route.topics.sort((a, b) => Number(a.number) - Number(b.number));
  });

  let globalTopicNumber = 1;
  roadmapRoutes.forEach((route) => {
    route.topics.forEach((topic) => {
      topic.number = globalTopicNumber;
      globalTopicNumber += 1;
    });
  });
}

applyRoadmapExpansion();

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
const labsGrid = document.getElementById("labs-grid");
const labPanel = document.getElementById("lab-panel");
const labContinue = document.getElementById("lab-continue");
let activeRoadmapRoute = null;
const roadmapStorageKey = "csh-roadmap-progress-v1";

function loadRoadmapProgress() {
  try { return JSON.parse(localStorage.getItem(roadmapStorageKey) || "{}"); }
  catch { return {}; }
}

function saveRoadmapProgress(progress) {
  try {
    localStorage.setItem(roadmapStorageKey, JSON.stringify(progress));
  } catch (error) {
    console.warn("Roadmap progress could not be saved", error);
  }
}

function getRoadmapProgress() {
  const progress = loadRoadmapProgress();
  progress.completed = Array.isArray(progress.completed) ? progress.completed : [];
  return progress;
}

function allRoadmapTopics() {
  return roadmapRoutes.flatMap((route) => route.topics.map((topic, index) => ({ ...topic, routeId: route.id, routeTitle: route.title, routeDescription: route.description, index })));
}

const labStorageKey = "csh-lab-progress-v1";
let activeLabLevel = "all";
let activeLabTopic = "all";

const cshLabs = [
  {
    id: "lab-ip-privada",
    number: "LAB 01",
    title: "Encuentra tu IP privada",
    difficulty: "Inicial",
    category: "Redes",
    duration: "5 min",
    routeTitle: "Redes desde cero",
    relatedConcepts: ["IP", "Redes", "Terminal"],
    objective: "Ver qué dirección usa tu equipo dentro de tu propia red local.",
    safetyNotice: "",
    requirements: ["Tu ordenador", "Una red Wi-Fi o cableada propia"],
    steps: [
      { title: "Abre una terminal", text: "En Windows puedes usar CMD o PowerShell. En Linux/macOS abre Terminal.", commands: [{ label: "Windows", code: "ipconfig" }, { label: "Linux/macOS", code: "ip addr" }] },
      { title: "Busca la dirección IPv4", text: "Normalmente empieza por 192.168, 10. o 172.16-31. Esa dirección solo sirve dentro de tu red.", commands: [] },
      { title: "Compárala con tu router", text: "La puerta de enlace suele ser tu router. Te ayuda a entender quién organiza tu red local.", commands: [] }
    ],
    questions: [
      { question: "¿Una IP privada identifica tu casa en Internet?", options: ["No, solo dentro de tu red local", "Sí, siempre es pública", "Solo si usas Wi-Fi"], answer: 0, feedback: "Exacto: la IP privada vive dentro de tu red. La pública es la que sale a Internet." },
      { question: "¿Qué comando usarías en Windows?", options: ["ipconfig", "chmod", "ls -la"], answer: 0, feedback: "Correcto. ipconfig te enseña la configuración de red en Windows." }
    ]
  },
  {
    id: "lab-ip-publica",
    number: "LAB 02",
    title: "Compara IP pública y privada",
    difficulty: "Inicial",
    category: "Redes",
    duration: "6 min",
    routeTitle: "Redes desde cero",
    relatedConcepts: ["IP", "VPN", "Privacidad"],
    objective: "Entender qué ve una web sobre tu conexión y qué no puede saber con seguridad.",
    safetyNotice: "",
    requirements: ["Tu navegador", "La sección Recursos de esta web"],
    steps: [
      { title: "Mira tu IP pública", text: "Entra en Recursos y usa el bloque de IP pública. Apunta país, ciudad aproximada y proveedor.", commands: [] },
      { title: "Compárala con tu IP privada", text: "La privada identifica tu equipo dentro de casa; la pública identifica tu salida a Internet.", commands: [{ label: "Windows", code: "ipconfig" }] },
      { title: "Piensa en la privacidad", text: "La ubicación suele ser aproximada. No es GPS, pero sí da pistas de proveedor y país.", commands: [] }
    ],
    questions: [
      { question: "¿La localización de una IP pública es exacta como un GPS?", options: ["No, es aproximada", "Sí, marca tu habitación", "Solo en móvil"], answer: 0, feedback: "Bien. La geolocalización por IP suele ser aproximada." },
      { question: "¿Tu proveedor puede aparecer con otro nombre comercial?", options: ["Sí, por ejemplo Telefónica/Movistar", "No, siempre exacto", "Solo en VPN"], answer: 0, feedback: "Eso es. A veces aparece el grupo empresarial y no la marca que ves en la factura." }
    ]
  },
  {
    id: "lab-mac",
    number: "LAB 03",
    title: "Localiza tu dirección MAC",
    difficulty: "Inicial",
    category: "Redes",
    duration: "7 min",
    routeTitle: "Redes desde cero",
    relatedConcepts: ["MAC", "Redes", "Wi-Fi"],
    objective: "Distinguir la dirección física de red de una IP.",
    safetyNotice: "",
    requirements: ["Tu ordenador", "Adaptador Wi-Fi o Ethernet"],
    steps: [
      { title: "Lista tus interfaces", text: "Cada tarjeta de red puede tener su propia MAC: Wi-Fi, Ethernet o adaptadores virtuales.", commands: [{ label: "Windows", code: "getmac /v" }, { label: "Linux", code: "ip link" }] },
      { title: "Identifica el formato", text: "Una MAC suele tener 6 bloques hexadecimales, por ejemplo AA-BB-CC-11-22-33.", commands: [] },
      { title: "Relaciona MAC e IP", text: "La MAC ayuda dentro de la red local; la IP permite enrutar comunicaciones.", commands: [{ label: "Windows", code: "arp -a" }] }
    ],
    questions: [
      { question: "¿Una MAC sirve para navegar por Internet de extremo a extremo?", options: ["No, se usa sobre todo en red local", "Sí, reemplaza a la IP", "Solo en páginas HTTPS"], answer: 0, feedback: "Correcto. La MAC opera en la red local; Internet se mueve con IPs." },
      { question: "¿Puede haber varias MAC en un mismo equipo?", options: ["Sí", "No", "Solo si es servidor"], answer: 0, feedback: "Exacto: cada interfaz de red puede tener una." }
    ]
  },
  {
    id: "lab-ping",
    number: "LAB 04",
    title: "Comprueba conectividad con ping",
    difficulty: "Inicial",
    category: "Redes",
    duration: "6 min",
    routeTitle: "Redes desde cero",
    relatedConcepts: ["Ping", "ICMP", "Latencia"],
    objective: "Usar ping para comprobar si un destino responde y medir latencia básica.",
    safetyNotice: "Haz pruebas contra tu router, dominios públicos conocidos o equipos propios. No lo uses para molestar a terceros.",
    requirements: ["Terminal", "Conexión a Internet"],
    steps: [
      { title: "Prueba tu router", text: "Cambia la IP por la puerta de enlace que viste en ipconfig.", commands: [{ label: "Windows/Linux", code: "ping 192.168.1.1" }] },
      { title: "Prueba un dominio", text: "Así ves que DNS y conectividad funcionan juntos.", commands: [{ label: "Windows/Linux", code: "ping cibersinhumo.es" }] },
      { title: "Lee la latencia", text: "El tiempo en ms te da una idea de cuánto tarda la respuesta.", commands: [] }
    ],
    questions: [
      { question: "¿Ping sirve para comprobar conectividad básica?", options: ["Sí", "No, solo borra archivos", "Solo instala paquetes"], answer: 0, feedback: "Correcto. Ping es una prueba sencilla de conectividad." },
      { question: "Si un equipo no responde a ping, ¿siempre está caído?", options: ["No, puede bloquear ICMP", "Sí, seguro", "Significa que no tiene IP"], answer: 0, feedback: "Bien visto. Muchos sistemas bloquean ICMP por seguridad." }
    ]
  },
  {
    id: "lab-dns",
    number: "LAB 05",
    title: "Resuelve dominios con nslookup",
    difficulty: "Inicial",
    category: "Redes",
    duration: "8 min",
    routeTitle: "Redes desde cero",
    relatedConcepts: ["DNS", "Dominio", "IP"],
    objective: "Ver cómo un nombre como cibersinhumo.es se traduce a direcciones IP.",
    safetyNotice: "",
    requirements: ["Terminal", "Conexión a Internet"],
    steps: [
      { title: "Consulta un dominio", text: "Observa qué servidor DNS responde y qué IP devuelve.", commands: [{ label: "Windows/Linux/macOS", code: "nslookup cibersinhumo.es" }] },
      { title: "Prueba un DNS público", text: "Puedes preguntar a Cloudflare para comparar respuestas.", commands: [{ label: "Windows/Linux/macOS", code: "nslookup cibersinhumo.es 1.1.1.1" }] },
      { title: "Interpreta el resultado", text: "DNS no descarga la web; solo ayuda a encontrar dónde está.", commands: [] }
    ],
    questions: [
      { question: "¿DNS convierte nombres en direcciones que entiende la red?", options: ["Sí", "No, cifra contraseñas", "Solo bloquea malware"], answer: 0, feedback: "Exacto. DNS es como una agenda de nombres para Internet." },
      { question: "¿nslookup ataca una web?", options: ["No, solo consulta DNS", "Sí, siempre", "Solo si usas Wi-Fi"], answer: 0, feedback: "Correcto. Es una consulta normal y útil para aprender." }
    ]
  },
  {
    id: "lab-tracert",
    number: "LAB 06",
    title: "Sigue una ruta con tracert",
    difficulty: "Inicial",
    category: "Redes",
    duration: "8 min",
    routeTitle: "Redes desde cero",
    relatedConcepts: ["Traceroute", "Rutas", "Redes"],
    objective: "Ver los saltos aproximados que sigue una conexión hasta un destino.",
    safetyNotice: "Úsalo con dominios públicos conocidos o infraestructura propia. Los resultados son aproximados y pueden variar.",
    requirements: ["Terminal", "Conexión a Internet"],
    steps: [
      { title: "Ejecuta la traza", text: "En Windows se llama tracert; en Linux y macOS suele ser traceroute.", commands: [{ label: "Windows", code: "tracert cibersinhumo.es" }, { label: "Linux/macOS", code: "traceroute cibersinhumo.es" }] },
      { title: "Cuenta los saltos", text: "Cada línea representa un salto intermedio, aunque algunos routers no responden.", commands: [] },
      { title: "Observa la latencia", text: "No lo uses como verdad absoluta: Internet cambia y algunos nodos ocultan datos.", commands: [] }
    ],
    questions: [
      { question: "¿Traceroute muestra una ruta aproximada?", options: ["Sí", "No, muestra contraseñas", "Solo sirve para editar DNS"], answer: 0, feedback: "Correcto. Es útil para entender caminos de red." },
      { question: "Si aparecen asteriscos, ¿significa necesariamente error grave?", options: ["No, puede que el salto no responda", "Sí, Internet está roto", "Significa malware"], answer: 0, feedback: "Eso es. Muchos routers no responden a estas pruebas." }
    ]
  },
  {
    id: "lab-linux-comandos",
    number: "LAB 07",
    title: "Primeros comandos de Linux",
    difficulty: "Inicial",
    category: "Linux",
    duration: "10 min",
    routeTitle: "Linux, terminal y sistemas",
    relatedConcepts: ["Linux", "Terminal", "Comandos"],
    objective: "Perderle miedo a la terminal con comandos que no rompen nada.",
    safetyNotice: "Evita comandos destructivos si no sabes qué hacen. En este lab no necesitas borrar ni modificar archivos importantes.",
    requirements: ["Linux, WSL o una terminal de práctica"],
    steps: [
      { title: "Comprueba dónde estás", text: "pwd muestra la carpeta actual.", commands: [{ label: "Linux", code: "pwd" }] },
      { title: "Lista archivos", text: "ls muestra el contenido; -la enseña más detalles y archivos ocultos.", commands: [{ label: "Linux", code: "ls -la" }] },
      { title: "Mira ayuda rápida", text: "man abre el manual de un comando. Sal con q.", commands: [{ label: "Linux", code: "man ls" }] }
    ],
    questions: [
      { question: "¿Qué hace pwd?", options: ["Muestra la ruta actual", "Borra una carpeta", "Cambia permisos"], answer: 0, feedback: "Correcto. pwd te ubica en el sistema de archivos." },
      { question: "¿Qué tecla suele cerrar man?", options: ["q", "F12", "Ctrl + Alt + Supr"], answer: 0, feedback: "Sí. q sale del manual." }
    ]
  },
  {
    id: "lab-linux-carpetas",
    number: "LAB 08",
    title: "Muévete por carpetas en Linux",
    difficulty: "Inicial",
    category: "Linux",
    duration: "12 min",
    routeTitle: "Linux, terminal y sistemas",
    relatedConcepts: ["Linux", "Carpetas", "Archivos"],
    objective: "Practicar rutas, carpetas y archivos sin perderte.",
    safetyNotice: "Trabaja dentro de una carpeta de pruebas para no tocar archivos importantes.",
    requirements: ["Linux, WSL o terminal de práctica"],
    steps: [
      { title: "Crea una carpeta de práctica", text: "mkdir crea carpetas. Usa nombres sencillos.", commands: [{ label: "Linux", code: "mkdir laboratorio-csh" }] },
      { title: "Entra y crea un archivo", text: "cd cambia de carpeta y touch crea un archivo vacío.", commands: [{ label: "Linux", code: "cd laboratorio-csh\ntouch notas.txt" }] },
      { title: "Vuelve atrás", text: "Dos puntos significan carpeta anterior.", commands: [{ label: "Linux", code: "cd .." }] }
    ],
    questions: [
      { question: "¿Qué comando cambia de carpeta?", options: ["cd", "pwd", "ping"], answer: 0, feedback: "Correcto. cd significa change directory." },
      { question: "¿Qué representa .. en una ruta?", options: ["La carpeta anterior", "Una contraseña oculta", "Un servidor DNS"], answer: 0, feedback: "Eso es. .. apunta al nivel anterior." }
    ]
  },
  {
    id: "lab-nmap-local",
    number: "LAB 09",
    title: "Escaneo seguro con Nmap",
    difficulty: "Intermedio",
    category: "Seguridad",
    duration: "15 min",
    routeTitle: "Primeros pasos en hacking y pentesting",
    relatedConcepts: ["Nmap", "Puertos", "Pentesting"],
    objective: "Entender qué es un escaneo de puertos usando tu propio equipo o un laboratorio autorizado.",
    safetyNotice: "Hazlo solo contra tu propio equipo, tu red doméstica o laboratorios donde tengas permiso. No escanees sistemas ajenos.",
    requirements: ["Nmap instalado", "Permiso sobre el objetivo"],
    steps: [
      { title: "Escanea localhost", text: "127.0.0.1 eres tú mismo. Es la forma más segura de empezar.", commands: [{ label: "Windows/Linux/macOS", code: "nmap 127.0.0.1" }] },
      { title: "Escanea pocos puertos", text: "Limitar puertos ayuda a entender el resultado sin ruido.", commands: [{ label: "Windows/Linux/macOS", code: "nmap -p 22,80,443 127.0.0.1" }] },
      { title: "Lee estados", text: "open significa que hay un servicio escuchando. closed o filtered no significan lo mismo.", commands: [] }
    ],
    questions: [
      { question: "¿Dónde es correcto practicar Nmap?", options: ["En sistemas propios o autorizados", "En cualquier web sin permiso", "Solo en redes públicas"], answer: 0, feedback: "Correcto. En ciberseguridad el permiso importa muchísimo." },
      { question: "¿Un puerto abierto implica siempre una vulnerabilidad?", options: ["No, solo indica un servicio accesible", "Sí, siempre", "Solo si es el 443"], answer: 0, feedback: "Bien. Un puerto abierto no es automáticamente un fallo." }
    ]
  },
  {
    id: "lab-http-headers",
    number: "LAB 10",
    title: "Mira cabeceras HTTP",
    difficulty: "Intermedio",
    category: "Web",
    duration: "12 min",
    routeTitle: "Cómo funciona la web",
    relatedConcepts: ["HTTP", "Web", "Cabeceras"],
    objective: "Ver qué información viaja en una respuesta web antes de hablar de seguridad web.",
    safetyNotice: "Consulta tus propias páginas o dominios públicos normales. No hagas automatizaciones agresivas.",
    requirements: ["Navegador o curl"],
    steps: [
      { title: "Abre DevTools", text: "En el navegador, F12 > Network/Red. Recarga una página y pincha una petición.", commands: [] },
      { title: "Prueba con curl", text: "-I pide solo cabeceras. Es útil para ver servidor, caché o tipo de contenido.", commands: [{ label: "Terminal", code: "curl -I https://cibersinhumo.es" }] },
      { title: "Busca cabeceras de seguridad", text: "Fíjate en Content-Type, Cache-Control, Strict-Transport-Security o Content-Security-Policy si aparecen.", commands: [] }
    ],
    questions: [
      { question: "¿HTTP headers son parte de la comunicación web?", options: ["Sí", "No, son archivos ocultos", "Solo existen en Wi-Fi"], answer: 0, feedback: "Exacto. Las cabeceras acompañan peticiones y respuestas." },
      { question: "¿curl -I descarga toda la página?", options: ["No, pide principalmente cabeceras", "Sí, siempre descarga vídeos", "Solo cambia DNS"], answer: 0, feedback: "Correcto. Es una forma limpia de inspeccionar cabeceras." }
    ]
  }
];

function labEscape(value) {
  return String(value || "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function loadLabProgress() {
  try {
    const progress = JSON.parse(localStorage.getItem(labStorageKey) || "{}");
    progress.labs = progress.labs && typeof progress.labs === "object" ? progress.labs : {};
    return progress;
  } catch {
    return { labs: {} };
  }
}

function saveLabProgress(progress) {
  localStorage.setItem(labStorageKey, JSON.stringify(progress));
}

function getLabState(labId, progress = loadLabProgress()) {
  const state = progress.labs[labId] || {};
  return {
    started: Boolean(state.started),
    completed: Boolean(state.completed),
    steps: Array.isArray(state.steps) ? state.steps : [],
    answers: state.answers && typeof state.answers === "object" ? state.answers : {},
    updatedAt: state.updatedAt || null
  };
}

function updateLabState(labId, updater) {
  const progress = loadLabProgress();
  const current = getLabState(labId, progress);
  const next = updater({ ...current, steps: [...current.steps], answers: { ...current.answers } }) || current;
  next.updatedAt = new Date().toISOString();
  progress.labs[labId] = next;
  progress.lastLabId = labId;
  saveLabProgress(progress);
  return next;
}

function labProgressPercent(lab) {
  const state = getLabState(lab.id);
  const total = lab.steps.length + lab.questions.length;
  const done = state.steps.length + Object.keys(state.answers).length;
  return total ? Math.round((done / total) * 100) : 0;
}

function filteredLabs() {
  return cshLabs.filter((lab) => {
    const byLevel = activeLabLevel === "all" || lab.difficulty === activeLabLevel;
    const byTopic = activeLabTopic === "all" || lab.category === activeLabTopic;
    return byLevel && byTopic;
  });
}

function renderLabContinue() {
  if (!labContinue) return;
  const progress = loadLabProgress();
  const lab = cshLabs.find((item) => item.id === progress.lastLabId);
  if (!lab) { labContinue.hidden = true; return; }
  const state = getLabState(lab.id, progress);
  if (state.completed) { labContinue.hidden = true; return; }
  labContinue.hidden = false;
  labContinue.innerHTML = `
    <div>
      <span class="section-tag">continúa practicando</span>
      <strong>${labEscape(lab.title)}</strong>
      <small>${labProgressPercent(lab)}% completado · ${labEscape(lab.routeTitle)}</small>
    </div>
    <button class="btn btn-primary" type="button" data-open-lab="${lab.id}">Continuar laboratorio</button>
  `;
}

function renderLabsGrid() {
  if (!labsGrid) return;
  const labs = filteredLabs();
  labsGrid.innerHTML = labs.length ? labs.map((lab) => {
    const state = getLabState(lab.id);
    const percent = labProgressPercent(lab);
    const status = state.completed ? "Completado" : state.started ? "En curso" : "Nuevo";
    return `
      <article class="lab-card${state.completed ? " is-completed" : ""}">
        <div class="lab-card-head">
          <span class="lab-number">${lab.number}</span>
          <span class="lab-status">${status}</span>
        </div>
        <h3>${labEscape(lab.title)}</h3>
        <p>${labEscape(lab.objective)}</p>
        <div class="lab-meta">
          <span>${labEscape(lab.difficulty)}</span>
          <span>${labEscape(lab.duration)}</span>
          <span>${labEscape(lab.category)}</span>
        </div>
        <div class="lab-progress-line"><i style="width:${percent}%"></i></div>
        <button class="btn btn-secondary" type="button" data-open-lab="${lab.id}">${state.started ? "Abrir práctica" : "Empezar"}</button>
      </article>
    `;
  }).join("") : `<p class="lab-empty">No hay laboratorios con ese filtro todavía.</p>`;
  renderLabContinue();
}

function renderLabQuestions(lab, state) {
  return lab.questions.map((question, questionIndex) => {
    const selected = Number(state.answers[questionIndex]);
    const hasAnswer = Number.isInteger(selected);
    const correct = selected === question.answer;
    return `
      <div class="lab-question">
        <strong>${labEscape(question.question)}</strong>
        <div class="lab-answer-grid">
          ${question.options.map((option, optionIndex) => `<button type="button" class="${hasAnswer && selected === optionIndex ? "is-selected" : ""}" data-lab-question="${questionIndex}" data-lab-answer="${optionIndex}">${labEscape(option)}</button>`).join("")}
        </div>
        ${hasAnswer ? `<p class="lab-feedback ${correct ? "is-correct" : "is-wrong"}">${correct ? labEscape(question.feedback) : `Casi. ${labEscape(question.feedback)}`}</p>` : ""}
      </div>
    `;
  }).join("");
}

function renderLabPanel(labId, shouldScroll = true) {
  if (!labPanel) return;
  const lab = cshLabs.find((item) => item.id === labId);
  if (!lab) return;
  const state = updateLabState(lab.id, (current) => ({ ...current, started: true }));
  const stepsDone = state.steps.length;
  const answersDone = Object.keys(state.answers).length;
  const canComplete = stepsDone === lab.steps.length && answersDone === lab.questions.length;
  labPanel.hidden = false;
  labPanel.innerHTML = `
    <div class="lab-panel-grid">
      <div class="lab-main">
        <div class="lab-detail-head">
          <span class="section-tag">${labEscape(lab.number)} · ${labEscape(lab.difficulty)} · ${labEscape(lab.duration)}</span>
          <h3>${labEscape(lab.title)}</h3>
          <p>${labEscape(lab.objective)}</p>
        </div>
        <div class="lab-related">
          <span>Ruta relacionada</span>
          <strong>${labEscape(lab.routeTitle)}</strong>
          <div>${lab.relatedConcepts.map((concept) => `<small>${labEscape(concept)}</small>`).join("")}</div>
        </div>
        ${lab.safetyNotice ? `<div class="lab-warning"><strong>Uso responsable</strong><p>${labEscape(lab.safetyNotice)}</p></div>` : ""}
        <div class="lab-steps">
          ${lab.steps.map((step, index) => `
            <label class="lab-step">
              <input type="checkbox" data-lab-step="${index}" ${state.steps.includes(index) ? "checked" : ""}>
              <span>
                <strong>${index + 1}. ${labEscape(step.title)}</strong>
                <em>${labEscape(step.text)}</em>
                ${step.commands?.length ? step.commands.map((command) => `<code class="lab-command"><small>${labEscape(command.label)}</small>${labEscape(command.code)}</code>`).join("") : ""}
              </span>
            </label>
          `).join("")}
        </div>
      </div>
      <aside class="lab-side">
        <span class="section-tag">mini test</span>
        ${renderLabQuestions(lab, state)}
        <button class="btn btn-primary lab-complete-btn" type="button" data-lab-complete="${lab.id}" ${canComplete ? "" : "disabled"}>${state.completed ? "Laboratorio completado" : "Completar laboratorio"}</button>
        ${canComplete ? `<p class="lab-final-note">Todo listo. Si completas el lab, se guardará en este navegador.</p>` : `<p class="lab-final-note">Marca todos los pasos y responde el mini test para completar.</p>`}
      </aside>
    </div>
  `;
  renderLabsGrid();
  if (shouldScroll) labPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function labsForTopic(topic) {
  if (!topic) return [];
  const haystack = normalizeRoadmapText([topic.title, topic.routeTitle, topic.summary, ...(topic.tags || [])].join(" "));
  return cshLabs.filter((lab) => {
    const labText = normalizeRoadmapText([lab.title, lab.category, lab.routeTitle, ...lab.relatedConcepts].join(" "));
    return lab.relatedConcepts.some((concept) => haystack.includes(normalizeRoadmapText(concept))) || haystack.includes(normalizeRoadmapText(lab.category)) || labText.includes(normalizeRoadmapText(topic.title));
  }).slice(0, 3);
}

function renderTopicLabs(labs) {
  if (!labs.length) return "";
  return `
    <div class="topic-lab-callout">
      <span class="section-tag">práctica disponible</span>
      ${labs.map((lab) => `<button type="button" data-open-lab="${lab.id}"><strong>${labEscape(lab.title)}</strong><small>${labEscape(lab.difficulty)} · ${labEscape(lab.duration)}</small></button>`).join("")}
    </div>
  `;
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
      <button class="roadmap-route-card roadmap-planet-card planet-${((order - 1) % 11) + 1}" style="--planet-delay:${order * -0.38}s" type="button" data-roadmap-route="${route.id}" data-orbit-index="${index}" data-orbit-total="${totalRoutes}">
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
let roadmapSolarStartedAt = 0;

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
  const radiusX = Math.max(260, Math.min(rect.width * 0.38, 690));
  const radiusY = Math.max(115, Math.min(rect.height * 0.24, 245));
  const angularSpeed = 0.000026;
  if (!roadmapSolarStartedAt) roadmapSolarStartedAt = timestamp;
  const elapsed = timestamp - roadmapSolarStartedAt;

  cards.forEach((card, index) => {
    const order = Number(card.dataset.orbitIndex || index);
    const baseAngle = Math.PI / 2 + (order / total) * Math.PI * 2;
    const angle = baseAngle + elapsed * angularSpeed;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    const depth = (Math.sin(angle) + 1) / 2;
    const scale = 0.78 + depth * 0.18;

    card.style.setProperty("--orbit-x", x.toFixed(1));
    card.style.setProperty("--orbit-y", y.toFixed(1));
    card.style.setProperty("--planet-scale", scale.toFixed(3));
    card.style.setProperty("--planet-alpha", (0.84 + depth * 0.16).toFixed(2));
    card.style.zIndex = String(Math.round(30 + depth * 80));
  });

  roadmapSolarFrame = window.requestAnimationFrame(updateRoadmapSolarSystem);
}

function startRoadmapSolarSystem() {
  if (roadmapSolarFrame) return;
  roadmapSolarStartedAt = 0;
  roadmapSolarFrame = window.requestAnimationFrame(updateRoadmapSolarSystem);
}

function stopRoadmapSolarSystem() {
  if (!roadmapSolarFrame) return;
  window.cancelAnimationFrame(roadmapSolarFrame);
  roadmapSolarFrame = null;
  roadmapSolarStartedAt = 0;
}
function openRoadmapRoute(routeId, focusTopicId = null) {
  const route = roadmapRoutes.find((item) => item.id === routeId);
  if (!route || !roadmapView || !roadmapPath) return;
  activeRoadmapRoute = route;
  roadmapRouteLevel.textContent = route.level;
  roadmapRouteTitle.textContent = route.title;
  roadmapRouteDesc.textContent = route.description;
  roadmapView.hidden = false;
  document.getElementById("videos")?.classList.add("is-route-detail-open");
  stopRoadmapSolarSystem();
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
    ${renderTopicLabs(labsForTopic(topic))}
    <div class="topic-nav-mini">
      <small>Anterior: ${prev ? prev.title : "Inicio de ruta"}</small>
      <small>Siguiente: ${next ? next.title : "Fin de ruta"}</small>
    </div>
    <div class="topic-actions">
      ${topic.url ? `<a class="btn btn-primary" href="${topic.url}" target="_blank" rel="noopener">Ver vídeo</a>` : `<span class="btn btn-secondary is-disabled">${topic.status === "preparing" ? "En preparación" : "Próximamente"}</span>`}
      <button class="btn btn-secondary roadmap-complete-btn" type="button" data-toggle-topic="${topic.id}" aria-pressed="${done ? "true" : "false"}">${done ? "Marcar como pendiente" : "Marcar como completado"}</button>
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
  const topic = allRoadmapTopics().find((item) => item.id === topicId);
  if (!topic) return;
  const progress = getRoadmapProgress();
  const completed = new Set(progress.completed);
  if (completed.has(topicId)) completed.delete(topicId);
  else completed.add(topicId);
  progress.completed = [...completed];
  progress.lastTopicId = topicId;
  progress.lastRouteId = topic.routeId;
  saveRoadmapProgress(progress);
  if (activeRoadmapRoute) renderRoadmapPath(activeRoadmapRoute);
  selectRoadmapTopic(topicId);
  renderRoadmapRoutes();
  renderContinueCard();
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
  const asksHelp = /\b(ayuda|por donde empiezo|empezar|no se|perdido|perdida|recomienda|recomiendame|ruta|aprender|estudiar|orientame|guiame)\b/.test(normalized);
  const asksDefinition = /\b(que es|que son|explica|explicame|como funciona|para que sirve|diferencia|diferencias|entiendo|entender)\b/.test(normalized);
  const wantsPractice = /\b(practicar|practica|herramienta|herramientas|laboratorio|lab|instalar|probar|hacerlo|junto a mi)\b/.test(normalized);
  const wantsVideo = /\b(video|videos|ver|youtube|clase|tutorial)\b/.test(normalized);
  return { normalized, words, isGreeting, isThanks, asksHelp, asksDefinition, wantsPractice, wantsVideo };
}

const assistantKnowledgeState = {
  unknown: 0,
  uncertain: 1,
  beginner: 2,
  known: 3,
  confident: 4,
};
const assistantProfileStorageKey = "ciber-sin-humo-knowledge-profile";
let assistantLastDecision = null;
let assistantPendingGoal = null;
let assistantPendingQuestion = null;

const assistantConceptAliases = {
  computer_basics: ["informatica", "ordenador", "hardware", "software", "base", "desde cero"],
  operating_systems: ["sistema operativo", "windows", "linux", "macos"],
  linux: ["linux", "kali", "parrot", "ubuntu", "debian"],
  terminal: ["terminal", "consola", "bash", "shell", "comandos"],
  virtual_machines: ["maquina virtual", "maquinas virtuales", "virtualbox", "vmware", "virtualizacion"],
  networking: ["red", "redes", "networking", "internet"],
  ip: ["ip", "direccion ip", "ipv4", "ipv6"],
  router: ["router", "gateway", "puerta de enlace"],
  mac: ["mac", "direccion mac"],
  ports: ["puerto", "puertos", "servicio", "servicios"],
  tcp_udp: ["tcp", "udp", "tcp udp", "tcp/udp"],
  dns: ["dns", "dominio", "dominios"],
  vpn: ["vpn", "red privada virtual"],
  http: ["http", "https"],
  web_basics: ["web", "pagina web", "navegador", "servidor", "cliente servidor"],
  http_requests: ["peticion http", "peticiones http", "request", "cabeceras"],
  get_post: ["get", "post", "get post"],
  cookies: ["cookie", "cookies"],
  sessions: ["sesion", "sesiones", "login"],
  sql: ["sql", "base de datos", "bases de datos"],
  cybersecurity: ["ciber", "ciberseguridad", "seguridad informatica"],
  phishing: ["phishing", "qr phishing", "qrishing", "correo falso", "suplantacion"],
  malware: ["malware", "virus", "troyano", "spyware", "keylogger", "ransomware"],
  pentesting: ["pentesting", "hacking etico", "nmap", "wireshark", "john", "burp", "kali"],
  osint: ["osint", "metadatos", "shodan", "investigar"],
  web_hacking: ["hacking web", "sql injection", "xss", "csrf", "owasp", "burp suite"],
};

const assistantTopicMetadata = {
  "topic-1": { conceptsTaught: ["computer_basics"], prerequisites: [], difficulty: 0 },
  "topic-3": { conceptsTaught: ["linux", "operating_systems"], prerequisites: ["computer_basics"], difficulty: 0 },
  "topic-16": { conceptsTaught: ["linux"], prerequisites: ["operating_systems"], difficulty: 1 },
  "topic-20": { conceptsTaught: ["terminal"], prerequisites: ["linux"], difficulty: 1 },
  "topic-26": { conceptsTaught: ["terminal", "linux"], prerequisites: ["linux"], difficulty: 1 },
  "topic-41": { conceptsTaught: ["virtual_machines"], prerequisites: ["operating_systems"], difficulty: 1 },
  "topic-50": { conceptsTaught: ["networking"], prerequisites: ["computer_basics"], difficulty: 1 },
  "topic-53": { conceptsTaught: ["networking", "ip"], prerequisites: ["computer_basics"], difficulty: 1 },
  "topic-54": { conceptsTaught: ["ip"], prerequisites: ["ip"], difficulty: 1 },
  "topic-55": { conceptsTaught: ["ip"], prerequisites: ["ip"], difficulty: 1 },
  "topic-56": { conceptsTaught: ["mac", "networking"], prerequisites: ["networking"], difficulty: 1 },
  "topic-58": { conceptsTaught: ["router"], prerequisites: ["ip"], difficulty: 1 },
  "topic-67": { conceptsTaught: ["web_basics"], prerequisites: ["networking"], difficulty: 1 },
  "topic-69": { conceptsTaught: ["ports"], prerequisites: ["ip", "router"], difficulty: 2 },
  "topic-71": { conceptsTaught: ["tcp_udp"], prerequisites: ["ports"], difficulty: 2 },
  "topic-75": { conceptsTaught: ["dns"], prerequisites: ["ip"], difficulty: 2 },
  "topic-80": { conceptsTaught: ["vpn"], prerequisites: ["ip", "web_basics"], difficulty: 2 },
  "topic-85": { conceptsTaught: ["web_basics"], prerequisites: ["networking"], difficulty: 2 },
  "topic-88": { conceptsTaught: ["web_basics"], prerequisites: ["networking"], difficulty: 2 },
  "topic-89": { conceptsTaught: ["dns"], prerequisites: ["ip"], difficulty: 2 },
  "topic-91": { conceptsTaught: ["web_basics"], prerequisites: ["dns"], difficulty: 2 },
  "topic-92": { conceptsTaught: ["http"], prerequisites: ["web_basics", "dns"], difficulty: 2 },
  "topic-96": { conceptsTaught: ["http_requests"], prerequisites: ["http"], difficulty: 2 },
  "topic-97": { conceptsTaught: ["get_post"], prerequisites: ["http_requests"], difficulty: 2 },
  "topic-100": { conceptsTaught: ["html"], prerequisites: ["web_basics"], difficulty: 2 },
  "topic-102": { conceptsTaught: ["javascript"], prerequisites: ["html"], difficulty: 2 },
  "topic-103": { conceptsTaught: ["cookies"], prerequisites: ["http"], difficulty: 2 },
  "topic-104": { conceptsTaught: ["sessions"], prerequisites: ["cookies", "http"], difficulty: 2 },
  "topic-175": { conceptsTaught: ["sql"], prerequisites: ["web_basics"], difficulty: 3 },
  "topic-176": { conceptsTaught: ["sql_injection", "web_hacking"], prerequisites: ["http_requests", "get_post", "sql"], difficulty: 4 },
  "topic-122": { conceptsTaught: ["phishing", "cybersecurity"], prerequisites: [], difficulty: 1 },
  "topic-123": { conceptsTaught: ["social_engineering", "cybersecurity"], prerequisites: ["phishing"], difficulty: 1 },
  "topic-124": { conceptsTaught: ["trojan", "malware"], prerequisites: ["cybersecurity"], difficulty: 1 },
  "topic-125": { conceptsTaught: ["spyware", "malware"], prerequisites: ["cybersecurity"], difficulty: 1 },
  "topic-126": { conceptsTaught: ["keylogger", "malware"], prerequisites: ["spyware"], difficulty: 1 },
  "topic-127": { conceptsTaught: ["ransomware", "malware"], prerequisites: ["malware"], difficulty: 2 },
  "topic-128": { conceptsTaught: ["ddos"], prerequisites: ["networking", "ip"], difficulty: 2 },
  "topic-129": { conceptsTaught: ["mitm"], prerequisites: ["networking", "http"], difficulty: 2 },
  "topic-147": { conceptsTaught: ["pentesting", "cyber_roles"], prerequisites: ["cybersecurity"], difficulty: 2 },
  "topic-152": { conceptsTaught: ["osint"], prerequisites: ["web_basics"], difficulty: 2 },
  "topic-154": { conceptsTaught: ["network_scanning", "pentesting"], prerequisites: ["ports", "tcp_udp"], difficulty: 3 },
  "topic-155": { conceptsTaught: ["nmap", "pentesting"], prerequisites: ["network_scanning", "ports", "tcp_udp"], difficulty: 3 },
  "topic-159": { conceptsTaught: ["wireshark"], prerequisites: ["tcp_udp", "dns"], difficulty: 3 },
  "topic-173": { conceptsTaught: ["burp"], prerequisites: ["http_requests", "get_post"], difficulty: 3 },
  "topic-192": { conceptsTaught: ["deep_web"], prerequisites: ["web_basics"], difficulty: 2 },
  "topic-193": { conceptsTaught: ["ransomware"], prerequisites: ["malware"], difficulty: 2 },
  "topic-195": { conceptsTaught: ["phishing"], prerequisites: ["phishing"], difficulty: 2 },
  "topic-196": { conceptsTaught: ["trojan", "malware"], prerequisites: ["trojan"], difficulty: 2 },
  "topic-197": { conceptsTaught: ["incident_analysis"], prerequisites: ["malware", "cybersecurity"], difficulty: 2 },
  "topic-211": { conceptsTaught: ["cyber_roles"], prerequisites: ["cybersecurity"], difficulty: 2 },
};

const assistantGoalTargets = {
  general_learning: ["topic-1"],
  continue_learning: [],
  linux: ["topic-26"],
  networking: ["topic-53"],
  web: ["topic-92"],
  cybersecurity: ["topic-122"],
  pentesting: ["topic-155"],
  web_hacking: ["topic-176"],
  sql_injection: ["topic-176"],
  phishing: ["topic-122"],
  malware: ["topic-124"],
  osint: ["topic-152"],
  vpn: ["topic-80"],
  linux_tools: ["topic-26"],
  virtual_machines: ["topic-41"],
  ip: ["topic-53"],
  mac: ["topic-56"],
  ports: ["topic-69"],
  dns: ["topic-75"],
  http: ["topic-92"],
  cookies: ["topic-103"],
  trojan: ["topic-124"],
  spyware: ["topic-125"],
  keylogger: ["topic-126"],
  ransomware: ["topic-127"],
  ddos: ["topic-128"],
  mitm: ["topic-129"],
  deep_web: ["topic-192"],
  defense: ["topic-211"],
};

const assistantDiagnosticBlocks = {
  general: ["computer_basics", "operating_systems", "networking", "cybersecurity"],
  networking: ["ip", "router", "ports", "tcp_udp", "dns"],
  web: ["web_basics", "dns", "http", "http_requests", "get_post", "cookies", "sessions", "sql"],
  pentesting: ["linux", "terminal", "ip", "router", "ports", "tcp_udp", "dns"],
  linux: ["linux", "terminal", "virtual_machines"],
  cybersecurity: ["cybersecurity", "phishing", "malware", "privacy"],
  osint: ["osint", "metadata", "shodan", "privacy"],
};

const assistantSpecificGoals = new Set([
  "virtual_machines", "ip", "mac", "ports", "dns", "http", "cookies", "sql_injection",
  "phishing", "vpn", "trojan", "spyware", "keylogger", "ransomware", "ddos", "mitm", "osint", "deep_web"
]);
function applyAssistantRoadmapExpansionKnowledge() {
  Object.assign(assistantConceptAliases, {
    programming: ["programacion", "programar", "codigo", "scripting", "python", "bash", "javascript", "sql", "lenguaje c"],
    cryptography: ["criptografia", "criptografía", "cifrado", "hash", "rsa", "aes", "certificado"],
    privacy: ["privacidad", "trackers", "tor", "vpn", "cookies", "rastro"],
    blue_team: ["blue team", "defensa", "soc", "siem", "edr", "alertas", "logs"],
    forensics: ["forense", "forensica", "evidencias", "cadena de custodia", "memoria ram"],
    cloud_security: ["cloud", "nube", "iam", "bucket", "servidores cloud"],
    mobile_security: ["android", "apk", "movil", "root", "jailbreak"],
    iot: ["iot", "camaras ip", "smart tv", "router", "dispositivos inteligentes"],
    ai_security: ["ia", "inteligencia artificial", "llm", "prompt injection", "chatgpt"],
    osint: [...assistantConceptAliases.osint, "dorks", "whois", "wayback", "exif", "busqueda inversa"],
    malware_analysis: ["analisis de malware", "virustotal", "sandbox", "strings", "analisis estatico", "analisis dinamico"],
    logs: ["logs", "registros", "eventos", "visor de eventos"],
    cve: ["cve", "cwe", "cvss", "vulnerabilidad publicada"],
    exploit: ["exploit", "payload", "zero day", "zero-day"],
    pentesting_methodology: ["metodologia de pentesting", "fases de pentesting", "informe de pentesting"],
    enumeration: ["enumeracion", "enumerar", "servicios abiertos"],
    metasploit: ["metasploit"],
    incident_response: ["respuesta a incidentes", "contencion", "erradicacion", "recuperacion"],
    web_hacking: [...assistantConceptAliases.web_hacking, "idor", "ssrf", "xxe", "ssti", "jwt", "api security", "path traversal"],
    cyber_careers: ["profesiones", "salidas laborales", "pentester", "dfir", "appsec", "grc", "soc"],
    sockets: ["socket", "sockets"],
    buffer_overflow: ["buffer overflow", "desbordamiento de buffer"],
    assembly: ["assembly", "ensamblador"],
    reverse_engineering: ["reversing", "ingenieria inversa", "ingeniería inversa"],
    source_code: ["codigo fuente", "leer codigo"],
    poc: ["poc", "prueba de concepto"],
    security_habits: ["comprobar archivo", "verificar descarga", "integridad"],
    ssh: ["ssh", "claves ssh"],
    quantum: ["cuantico", "cuantica", "cuántico", "cuántica"],
    post_quantum: ["post cuantica", "post-cuántica", "post cuantica"]
  });

  roadmapExpansionRows.forEach((topic) => {
    assistantTopicMetadata[topic.id] = {
      conceptsTaught: topic.concepts || [],
      prerequisites: topic.prerequisites || [],
      difficulty: topic.difficulty || 3
    };
  });

  Object.assign(assistantGoalTargets, {
    programming: ["topic-276"], python: ["topic-278"], bash: ["topic-279"], c_language: ["topic-280"], javascript: ["topic-281"], sql: ["topic-282"],
    privacy: ["topic-248"], cryptography: ["topic-305"], hashing: ["topic-315"], tls: ["topic-325"], certificates: ["topic-326"], ssh: ["topic-332"], cryptography: ["topic-305"], ai_security: ["topic-249"],
    blue_team: ["topic-266"], defense: ["topic-266"], forensics: ["topic-271"], cloud_security: ["topic-273"],
    iot: ["topic-265"], mobile_security: ["topic-264"], malware_analysis: ["topic-261"],
    idor: ["topic-254"], ssrf: ["topic-256"], jwt: ["topic-257"], api_security: ["topic-257"],
    cyber_careers: ["topic-274"], career_path: ["topic-275"]
  });

  Object.assign(assistantDiagnosticBlocks, {
    programming: ["programming", "python", "bash", "javascript", "sql"],
    privacy: ["privacy", "cookies", "vpn", "tor"],
    defense: ["logs", "blue_team", "siem", "incident_response", "forensics"],
    malware: ["malware", "trojan", "spyware", "ransomware", "malware_analysis"],
    cloud: ["networking", "web_basics", "cloud_security"],
    mobile: ["mobile_security", "permissions", "privacy", "iot"]
  });

  ["programming", "cryptography", "privacy", "blue_team", "forensics", "cloud_security", "mobile_security", "iot", "ai_security", "malware_analysis", "cyber_careers", "career_path"].forEach((goal) => assistantSpecificGoals.add(goal));
}

applyAssistantRoadmapExpansionKnowledge();

function getRoadmapNode(topicId) {
  const topic = allRoadmapTopics().find((item) => item.id === topicId);
  if (!topic) return null;
  const route = roadmapRoutes.find((item) => item.id === topic.routeId) || roadmapRoutes[0];
  const meta = assistantTopicMetadata[topic.id] || {};
  return {
    ...topic,
    route,
    sectionId: route.id,
    sectionTitle: route.title,
    conceptsTaught: meta.conceptsTaught || inferConceptsFromTopic(topic),
    prerequisites: meta.prerequisites || [],
    difficulty: meta.difficulty ?? (Number(String(topic.level || "0").replace(/\D/g, "")) || 1),
  };
}

function allRoadmapNodes() {
  return allRoadmapTopics().map((topic) => getRoadmapNode(topic.id)).filter(Boolean);
}

function inferConceptsFromTopic(topic) {
  const text = normalizeRoadmapText([topic.title, topic.summary, ...(topic.tags || [])].join(" "));
  return Object.entries(assistantConceptAliases)
    .filter(([, aliases]) => aliases.some((alias) => text.includes(normalizeRoadmapText(alias))))
    .map(([concept]) => concept);
}

function findTopicTeachingConcept(concept, preferPublished = false) {
  const nodes = allRoadmapNodes().filter((node) => node.conceptsTaught.includes(concept));
  const published = nodes.filter((node) => node.status === "published");
  if (preferPublished && published.length) return published[0];
  return nodes[0] || null;
}

function topicIsAvailable(node) {
  return node?.status === "published" && !!node.url;
}

function transitivePrerequisitesForNode(node, seen = new Set()) {
  const ordered = [];
  (node?.prerequisites || []).forEach((concept) => {
    if (seen.has(concept)) return;
    seen.add(concept);
    const teachingNode = findTopicTeachingConcept(concept, false);
    transitivePrerequisitesForNode(teachingNode, seen).forEach((item) => {
      if (!ordered.includes(item)) ordered.push(item);
    });
    ordered.push(concept);
  });
  return ordered;
}

function validateAssistantKnowledgeGraph() {
  const ids = new Set();
  const duplicateIds = [];
  allRoadmapTopics().forEach((topic) => { if (ids.has(topic.id)) duplicateIds.push(topic.id); ids.add(topic.id); });
  const missingPrerequisites = [];
  Object.entries(assistantTopicMetadata).forEach(([topicId, meta]) => {
    if (!getRoadmapNode(topicId)) missingPrerequisites.push(`topic_missing:${topicId}`);
    (meta.prerequisites || []).forEach((concept) => {
      if (!findTopicTeachingConcept(concept, false) && concept !== "html" && concept !== "javascript" && concept !== "sql_injection") missingPrerequisites.push(`${topicId}:${concept}`);
    });
  });
  return { duplicateIds, missingPrerequisites };
}

function firstPublishedOrPrepared(node) {
  return node || null;
}

function firstOpenTopicInRoute(routeId, profile = loadAssistantProfile()) {
  const progress = getRoadmapProgress();
  const route = roadmapRoutes.find((item) => item.id === routeId) || roadmapRoutes[0];
  if (!route?.topics?.length) return getRoadmapNode("topic-1");
  const completed = new Set(progress.completed || []);
  const firstPending = route.topics.find((topic) => {
    const node = getRoadmapNode(topic.id);
    const taught = node?.conceptsTaught || [];
    return !completed.has(topic.id) && !taught.every((concept) => assistantConceptKnown(profile, concept));
  });
  return getRoadmapNode((firstPending || route.topics[0]).id);
}

function firstOpenTopicAfter(node, profile = loadAssistantProfile()) {
  const progress = getRoadmapProgress();
  const route = roadmapRoutes.find((item) => item.id === node?.routeId) || node?.route;
  if (!route?.topics?.length || !node) return firstOpenTopicInRoute(roadmapRoutes[0]?.id, profile);
  const completed = new Set(progress.completed || []);
  const next = route.topics.find((topic) => {
    if (topic.number <= node.number || completed.has(topic.id)) return false;
    const nextNode = getRoadmapNode(topic.id);
    return !(nextNode?.conceptsTaught || []).every((concept) => assistantConceptKnown(profile, concept));
  });
  return next ? getRoadmapNode(next.id) : null;
}

function decisionFromSavedRecommendation() {
  const progress = getRoadmapProgress();
  const topicId = progress.recommendedTopicId || progress.lastTopicId;
  const node = getRoadmapNode(topicId);
  return node ? buildRecommendationResult(node, "saved_recommendation", 0.7, [], node) : null;
}

function assistantRouteButton(route, topic, label = "Abrir recomendación") {
  const topicAttr = topic?.id ? ` data-assistant-topic="${topic.id}"` : "";
  return `<button type="button" class="assistant-route-link" data-assistant-route="${route.id}"${topicAttr}>${label}</button>`;
}

function assistantCorrectionButtons() {
  return `<div class="assistant-actions"><button type="button" class="assistant-route-link" data-assistant-action="start">Empezar aquí</button><button type="button" class="assistant-route-link" data-assistant-action="known">Esto ya me lo sé</button><button type="button" class="assistant-route-link" data-assistant-action="earlier">Necesito empezar antes</button><button type="button" class="assistant-route-link" data-assistant-action="diagnose">Evaluar mejor mi nivel</button></div>`;
}

const ASSISTANT_DISPLAY_NAME = "Asistente de Ciber Sin Humo";

function assistantNameMarkup() {
  return `<span class="assistant-name">${ASSISTANT_DISPLAY_NAME}</span>`;
}

function recommendTopicFromText(text) {
  const decision = makeAssistantDecision(text, { forceRecommend: true });
  if (decision.type !== "recommendation") return { route: null, topic: null, decision };
  return { route: decision.route, topic: decision.topic, decision };
}

var assistantProfileVersion = 2;
var assistantMasteryByState = {
  unknown: 0,
  uncertain: 25,
  beginner: 42,
  known: 76,
  confident: 92,
};

function assistantStateFromMastery(mastery) {
  const value = Number(mastery) || 0;
  if (value >= 88) return "confident";
  if (value >= 65) return "known";
  if (value >= 35) return "beginner";
  if (value >= 15) return "uncertain";
  return "unknown";
}

function assistantMasteryFromState(state) {
  return assistantMasteryByState[state] ?? Number(state) ?? 0;
}

function assistantDefaultProfile() {
  return {
    version: assistantProfileVersion,
    goals: [],
    primaryGoal: null,
    experienceLevel: null,
    concepts: {},
    completedTopics: [],
    currentRoute: null,
    currentTopic: null,
    recommendedRoute: null,
    recommendedTopic: null,
    preferences: { practice: false, theory: false, videos: true, careful: true },
    conversation: { pendingGoal: null, pendingQuestion: null, lastDecision: null, diagnosticAnswers: [] },
    metrics: { messages: 0, updatedAt: Date.now() },
  };
}

function migrateAssistantProfile(rawProfile = {}) {
  const base = assistantDefaultProfile();
  const raw = rawProfile && typeof rawProfile === "object" ? rawProfile : {};
  const next = {
    ...base,
    ...raw,
    preferences: { ...base.preferences, ...(raw.preferences || {}) },
    conversation: { ...base.conversation, ...(raw.conversation || {}) },
    metrics: { ...base.metrics, ...(raw.metrics || {}) },
    concepts: {},
    completedTopics: Array.isArray(raw.completedTopics) ? [...new Set(raw.completedTopics)] : [],
    goals: Array.isArray(raw.goals) ? [...new Set(raw.goals)] : [],
    version: assistantProfileVersion,
  };

  Object.entries(raw.concepts || {}).forEach(([concept, value]) => {
    if (!value || typeof value !== "object") return;
    const mastery = Number.isFinite(Number(value.mastery)) ? Number(value.mastery) : assistantMasteryFromState(value.state || "unknown");
    next.concepts[concept] = {
      mastery: Math.max(0, Math.min(100, mastery)),
      confidence: Number.isFinite(Number(value.confidence)) ? Number(value.confidence) : 0.55,
      state: assistantStateFromMastery(mastery),
      source: value.source || "migration",
      evidence: Array.isArray(value.evidence) ? value.evidence.slice(-5) : [],
      updatedAt: value.updatedAt || Date.now(),
    };
  });

  if (raw.currentTopic && !next.recommendedTopic) next.recommendedTopic = raw.currentTopic;
  if (raw.recommendedTopicId && !next.recommendedTopic) next.recommendedTopic = raw.recommendedTopicId;
  return next;
}

function loadAssistantProfile() {
  try {
    const raw = JSON.parse(localStorage.getItem(assistantProfileStorageKey) || "{}");
    const migrated = migrateAssistantProfile(raw);
    if (raw.version !== assistantProfileVersion) saveAssistantProfile(migrated);
    return migrated;
  } catch (error) {
    return assistantDefaultProfile();
  }
}

function saveAssistantProfile(profile) {
  try {
    localStorage.setItem(assistantProfileStorageKey, JSON.stringify(migrateAssistantProfile(profile)));
  } catch (error) {}
}

function setAssistantConcept(profile, concept, stateOrMastery, source = "message", evidenceValue = "") {
  if (!concept) return;
  const migrated = migrateAssistantProfile(profile);
  Object.assign(profile, migrated);
  const current = profile.concepts[concept] || { mastery: 0, confidence: 0.25, evidence: [] };
  const incomingMastery = typeof stateOrMastery === "string" ? assistantMasteryFromState(stateOrMastery) : Number(stateOrMastery) || 0;
  const sourceWeight = source === "diagnostic" ? 0.8 : source === "progress" ? 0.9 : source === "correction" ? 0.85 : 0.55;
  const shouldReplaceDown = source === "diagnostic" || source === "correction";
  const weighted = shouldReplaceDown
    ? incomingMastery
    : Math.max(incomingMastery, Math.round((current.mastery * (1 - sourceWeight)) + (incomingMastery * sourceWeight)));
  const mastery = Math.max(0, Math.min(100, weighted));
  const evidence = [...(current.evidence || [])];
  if (evidenceValue) evidence.push({ source, text: evidenceValue, at: Date.now() });
  profile.concepts[concept] = {
    mastery,
    confidence: Math.max(current.confidence || 0, sourceWeight),
    state: assistantStateFromMastery(mastery),
    source,
    evidence: evidence.slice(-6),
    updatedAt: Date.now(),
  };
}

function getAssistantConceptMastery(profile, concept) {
  const migrated = migrateAssistantProfile(profile);
  return Number(migrated.concepts?.[concept]?.mastery) || 0;
}

function getAssistantConceptState(profile, concept) {
  return assistantStateFromMastery(getAssistantConceptMastery(profile, concept));
}

function assistantConceptKnown(profile, concept) {
  return getAssistantConceptMastery(profile, concept) >= 62;
}

function normalizeAssistantInput(input) {
  const corrections = [
    [/aprnder/g, "aprender"],
    [/aprenderr/g, "aprender"],
    [/pentestin\b/g, "pentesting"],
    [/pentestig\b/g, "pentesting"],
    [/linuz/g, "linux"],
    [/netwroking/g, "networking"],
    [/ciberseguridadd/g, "ciberseguridad"],
    [/sql inyection/g, "sql injection"],
    [/sql inyecion/g, "sql injection"],
    [/virutalbox/g, "virtualbox"],
    [/phising/g, "phishing"],
    [/phisihng/g, "phishing"],
    [/qrisihng/g, "qrishing"],
    [/maquinas virtuales/g, "maquina virtual"],
    [/m[aá]quina/g, "maquina"],
    [/direcciones mac/g, "direccion mac"],
    [/puertoss/g, "puertos"],
    [/wiresharck/g, "wireshark"],
    [/wire shark/g, "wireshark"],
    [/linus/g, "linux"],
    [/kalli/g, "kali"],
    [/sistema os i/g, "sistema osi"],
  ];
  let normalized = normalizeRoadmapText(input || "").replace(/[¿?¡!,.:;]/g, " ").replace(/\s+/g, " ").trim();
  corrections.forEach(([pattern, replacement]) => { normalized = normalized.replace(pattern, replacement); });
  return normalized;
}

function tokenizeAssistantText(input) {
  return normalizeAssistantInput(input).split(/\s+/).filter(Boolean);
}

function assistantEscapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assistantTextHasAlias(text, alias) {
  const normalized = normalizeAssistantInput(text);
  const cleanAlias = normalizeAssistantInput(alias);
  if (!cleanAlias) return false;
  const parts = cleanAlias.split(/\s+/).filter(Boolean);
  if (parts.length === 1 && parts[0].length <= 3) {
    return new RegExp(`(^|\\s)${assistantEscapeRegExp(parts[0])}(\\s|$)`).test(normalized);
  }
  return new RegExp(`(^|\\s)${parts.map(assistantEscapeRegExp).join("\\s+")}(\\s|$)`).test(normalized);
}

function splitAssistantClauses(normalized) {
  const marked = normalizeAssistantInput(normalized)
    .replace(/\b(sin embargo|en cambio|mas bien|realmente|prefiero|pero|aunque|antes|primero|todavia|despues|luego)\b/g, "|$1 ");
  return marked.split("|").map((part, index) => {
    const text = part.trim();
    const contrast = /^(pero|aunque|sin embargo|en cambio|mas bien|realmente|prefiero)\b/.test(text);
    const immediate = /^(antes|primero|todavia)\b/.test(text);
    const later = /^(despues|luego)\b/.test(text);
    return { text, index, contrast, immediate, later, weight: (contrast || immediate ? 1.45 : 1) * (later ? 0.72 : 1) };
  }).filter((part) => part.text);
}

function assistantClauseNegatesGoal(clause) {
  return /\b(no quiero|no me interesa|no busco|no necesito|todavia no quiero|no quiero aprender|no quiero meterme)\b/.test(clause);
}

function assistantAliasNegatedInClause(clause, aliases) {
  const text = normalizeAssistantInput(clause);
  return aliases.some((alias) => {
    const cleanAlias = normalizeAssistantInput(alias);
    const index = text.indexOf(cleanAlias);
    if (index < 0) return false;
    const before = text.slice(Math.max(0, index - 36), index);
    return /\b(no quiero|no me interesa|no busco|no necesito|todavia no quiero|no quiero aprender|no quiero meterme)\b/.test(before);
  });
}

function assistantClauseStatesUnknown(clause) {
  return /\b(no se|no entiendo|ni idea|nunca he usado|no conozco|no controlo|no tengo claro|se me dan fatal|me cuesta|me cuestan|se poco|llevo poco)\b/.test(clause);
}

function assistantClauseStatesKnown(clause) {
  return /\b(se bastante|se bien|lo entiendo|entiendo|controlo|domino|manejo|conozco|he usado|he utilizado|he probado|llevo bien|se usar|lo uso)\b/.test(clause)
    || /\bse\s+(ip|router|puertos|tcp|udp|dns|redes|linux|phishing|vpn|http|cookies|web)\b/.test(clause);
}

function assistantConceptStateInClause(clause, concept, fallback = {}) {
  const aliases = assistantConceptAliases[concept] || [concept];
  const text = normalizeAssistantInput(clause);
  const alias = aliases.find((item) => assistantTextHasAlias(text, item));
  if (!alias) return null;
  const cleanAlias = normalizeAssistantInput(alias);
  const index = text.indexOf(cleanAlias);
  const before = text.slice(Math.max(0, index - 44), index);
  const after = text.slice(index + cleanAlias.length, Math.min(text.length, index + cleanAlias.length + 52));
  const local = `${before} ${cleanAlias} ${after}`;
  if (/\b(no|ni|nunca|fatal|mal|no entiendo|no se|no controlo|no conozco)\b.{0,24}$/.test(before) || /^\s*.{0,18}\b(no entiendo|no se|fatal|mal)\b/.test(after)) return "unknown";
  if (/\b(me suena|me suenan|algo de|un poco|regular|se poco)\b/.test(local)) return "uncertain";
  if (/\b(se bastante|se bien|lo entiendo|entiendo|controlo|domino|manejo|conozco|he usado|he utilizado|he probado|se usar|lo uso)\b/.test(local) || /\bse\s+.{0,30}\b/.test(before + cleanAlias)) return "known";
  if (fallback.unknown) return "unknown";
  if (fallback.uncertain) return "uncertain";
  if (fallback.known) return "known";
  return null;
}

const assistantGoalEvidence = {
  sql_injection: ["sql injection", "sqli", "inyeccion sql"],
  web_hacking: ["hacking web", "burp", "xss", "csrf", "owasp"],
  pentesting: ["pentesting", "hacking etico", "nmap", "wireshark", "john", "laboratorio", "pruebas practicas"],
  networking: ["redes", "networking", "internet", "sistema osi"],
  linux: ["linux", "terminal", "bash", "shell", "comandos", "kali"],
  virtual_machines: ["maquina virtual", "virtualbox", "vmware", "virtualizacion"],
  web: ["web", "navegador", "servidor", "api", "pagina web"],
  cybersecurity: ["ciberseguridad", "seguridad informatica"],
  phishing: ["phishing", "qrishing", "qr phishing", "correo falso", "suplantacion"],
  malware: ["malware", "virus"],
  trojan: ["troyano", "trojan"],
  spyware: ["spyware", "camara", "camaras"],
  keylogger: ["keylogger"],
  ransomware: ["ransomware"],
  ddos: ["ddos", "denegacion de servicio"],
  mitm: ["mitm", "man in the middle", "intermediario"],
  osint: ["osint", "metadatos", "shodan", "investigar informacion"],
  vpn: ["vpn", "red privada virtual"],
  mac: ["direccion mac", "mac address"],
  ports: ["puerto", "puertos"],
  dns: ["dns", "dominio", "dominios"],
  http: ["http", "https"],
  cookies: ["cookie", "cookies"],
  deep_web: ["deep web", "dark web", "onion"],
  defense: ["defensa", "blue team", "seguridad defensiva", "proteger", "proteccion"],
};

function scoreAssistantGoals(normalized) {
  const clauses = splitAssistantClauses(normalized);
  const scores = new Map();
  const evidence = [];
  const negatedGoals = new Set();
  clauses.forEach((clause) => {
    Object.entries(assistantGoalEvidence).forEach(([goal, aliases]) => {
      const hits = aliases.filter((alias) => assistantTextHasAlias(clause.text, alias));
      if (!hits.length) return;
      const wants = /\b(quiero|aprender|empezar|practicar|estudiar|prefiero|necesito|me interesa|busco|gustaria)\b/.test(clause.text);
      const explicitGoal = hits.some((alias) => {
        const cleanAlias = assistantEscapeRegExp(normalizeAssistantInput(alias));
        return new RegExp(`\\b(quiero|prefiero|necesito|busco|me interesa|me gustaria|aprender|practicar)(?:\\s+\\w+){0,4}\\s+${cleanAlias}\\b`).test(clause.text);
      });
      const negated = assistantAliasNegatedInClause(clause.text, hits);
      const unknown = assistantClauseStatesUnknown(clause.text);
      const known = assistantClauseStatesKnown(clause.text);
      let score = hits.length * 0.32 * clause.weight;
      if (wants) score += 0.16 * clause.weight;
      if (explicitGoal) score += 0.5 * clause.weight;
      if (clause.immediate) score += 0.28;
      if (known && !explicitGoal) score -= 0.3 * clause.weight;
      if (unknown && wants) score += 0.12;
      if (negated) {
        score = -0.75 * clause.weight;
        negatedGoals.add(goal);
      }
      scores.set(goal, (scores.get(goal) || 0) + score);
      evidence.push({ goal, score, hits, clause: clause.text, negated, immediate: clause.immediate, later: clause.later });
    });
  });
  const candidates = [...scores.entries()]
    .filter(([, score]) => score > 0.12)
    .sort((a, b) => b[1] - a[1])
    .map(([intent, score]) => ({ intent, score: Math.min(1, Number(score.toFixed(2))), evidence: evidence.filter((item) => item.goal === intent) }));
  return { candidates, evidence, negatedGoals: [...negatedGoals] };
}

function conceptsInText(normalized) {
  const text = normalizeAssistantInput(normalized);
  const found = new Set();
  Object.entries(assistantConceptAliases).forEach(([concept, aliases]) => {
    if (aliases.some((alias) => assistantTextHasAlias(text, alias))) found.add(concept);
  });
  if (/\bsistema osi\b/.test(text)) found.add("networking");
  if (found.has("ports") || found.has("tcp_udp") || found.has("dns") || found.has("ip") || found.has("mac")) found.add("networking");
  if (found.has("http") || found.has("cookies") || found.has("sessions") || found.has("sql")) found.add("web_basics");
  if (found.has("trojan") || found.has("spyware") || found.has("keylogger") || found.has("ransomware")) found.add("malware");
  return [...found];
}

function matchAssistantGoal(normalized) {
  return scoreAssistantGoals(normalized).candidates[0]?.intent || "general_learning";
}

function parseAssistantIntent(input) {
  const normalized = normalizeAssistantInput(input);
  const words = normalized.split(/\s+/).filter(Boolean);
  const goalScoring = scoreAssistantGoals(normalized);
  const intentCandidates = goalScoring.candidates;
  const absoluteBeginner = /\b(no se nada|no tengo ni idea|desde cero|desde 0|empiezo de cero|empiezo desde cero|completamente nuevo|principiante absoluto|nunca he estudiado|no se absolutamente nada)\b/.test(normalized);
  const asksDefinition = /\b(que es|que son|explicame|explica|como funciona|para que sirve|dime que es)\b/.test(normalized);
  const learningRequest = /\b(quiero aprender|quiero empezar|aprender|estudiar|meterme|practicar|me gustaria aprender|por donde empiezo|donde deberia empezar)\b/.test(normalized);
  const continueLearning = /\b(por donde sigo|continuar|seguir|siguiente|que veo ahora|que toca ahora)\b/.test(normalized);
  const correctionKnown = /\b(eso ya me lo se|ya me lo se|esto ya lo se|ya lo entiendo|eso ya lo entiendo|ya controle eso)\b/.test(normalized);
  const easier = /\b(necesito empezar antes|empieza antes|mas basico|mas facil|no lo entiendo|me pierdo)\b/.test(normalized);
  const isGreeting = /^(hola|buenas|hey|ey|que tal|holaa)\b/.test(normalized);
  const isThanks = /\b(gracias|perfecto|vale gracias|genial gracias)\b/.test(normalized);
  const knowledgeEvidence = [];
  const knownConcepts = [];
  const unknownConcepts = [];
  const uncertainConcepts = [];
  splitAssistantClauses(normalized).forEach((partInfo) => {
    const part = partInfo.text;
    const concepts = conceptsInText(part);
    if (!concepts.length) return;
    const unknown = assistantClauseStatesUnknown(part);
    const known = assistantClauseStatesKnown(part);
    const uncertain = /\b(me suena|me suenan|mas o menos|regular|algo de|un poco|se poco)\b/.test(part);
    concepts.forEach((concept) => {
      const conceptState = assistantConceptStateInClause(part, concept, { unknown, known, uncertain });
      if (conceptState === "unknown") {
        unknownConcepts.push(concept);
        knowledgeEvidence.push({ concept, state: "unknown", mastery: 8, clause: part, source: "message", weight: partInfo.weight });
      } else if (conceptState === "uncertain") {
        uncertainConcepts.push(concept);
        knowledgeEvidence.push({ concept, state: "uncertain", mastery: 32, clause: part, source: "message", weight: partInfo.weight });
      } else if (conceptState === "known") {
        knownConcepts.push(concept);
        knowledgeEvidence.push({ concept, state: "known", mastery: /\b(uso|utilizo|manejo|domino|controlo)\b/.test(part) ? 82 : 68, clause: part, source: "message", weight: partInfo.weight });
      }
    });
  });
  let goal = intentCandidates[0]?.intent || "general_learning";
  if (goal === "general_learning" && unknownConcepts.length) {
    goal = unknownConcepts.find((concept) => assistantGoalTargets[concept]) || "general_learning";
  }
  if (continueLearning) goal = "continue_learning";
  const immediateGoal = intentCandidates.find((candidate) => candidate.evidence.some((item) => item.immediate))?.intent || goal;
  const deferredGoal = intentCandidates.find((candidate) => candidate.intent !== immediateGoal && candidate.evidence.some((item) => !item.immediate && !item.negated))?.intent;
  const finalGoal = intentCandidates.find((candidate) => candidate.evidence.some((item) => item.later))?.intent || deferredGoal || (goal !== immediateGoal ? goal : null);
  const preferences = {
    practice: /\b(practicar|practica|laboratorio|herramienta|herramientas|real|reto)\b/.test(normalized),
    theory: /\b(teoria|concepto|explicame|entender|base)\b/.test(normalized),
    stepByStep: /\b(paso a paso|no quiero saltarme nada|sin saltarme nada|con calma)\b/.test(normalized),
    fast: /\b(rapido|ir rapido|directo)\b/.test(normalized),
  };
  return {
    normalized,
    words,
    primaryIntent: goal,
    intentCandidates,
    goals: intentCandidates.map((candidate) => candidate.intent),
    finalGoal,
    immediateGoal,
    absoluteBeginner,
    asksDefinition,
    learningRequest,
    continueLearning,
    correctionKnown,
    easier,
    isGreeting,
    isThanks,
    knownConcepts: [...new Set(knownConcepts)],
    unknownConcepts: [...new Set(unknownConcepts)],
    uncertainConcepts: [...new Set(uncertainConcepts)],
    knowledgeEvidence,
    negatedConcepts: [...new Set([...goalScoring.negatedGoals, ...unknownConcepts])],
    mentionedConcepts: conceptsInText(normalized),
    preferences,
    goal,
    confidence: intentCandidates[0]?.score || (goal === "general_learning" && !absoluteBeginner ? 0.36 : 0.82),
  };
}

function updateProfileFromText(profile, input) {
  const intent = parseAssistantIntent(input);
  Object.assign(profile, migrateAssistantProfile(profile));
  profile.metrics.messages = (profile.metrics.messages || 0) + 1;
  profile.metrics.updatedAt = Date.now();
  if (intent.goal && intent.goal !== "continue_learning" && intent.goal !== "general_learning") {
    profile.primaryGoal = intent.goal;
    profile.goals = [...new Set([intent.goal, ...(profile.goals || [])])].slice(0, 8);
  }
  if (intent.finalGoal) profile.conversation.finalGoal = intent.finalGoal;
  if (intent.immediateGoal && intent.immediateGoal !== intent.goal) profile.conversation.immediateGoal = intent.immediateGoal;
  intent.knowledgeEvidence.forEach((item) => setAssistantConcept(profile, item.concept, item.mastery, "message", item.clause));
  if (!intent.absoluteBeginner && (intent.knownConcepts.includes("linux") || intent.knownConcepts.includes("terminal") || intent.knownConcepts.includes("virtual_machines"))) {
    setAssistantConcept(profile, "computer_basics", "known", "inference", "usa entorno técnico");
    setAssistantConcept(profile, "operating_systems", "known", "inference", "usa entorno técnico");
  }
  if (!intent.absoluteBeginner && (intent.knownConcepts.includes("networking") || intent.knownConcepts.includes("ip") || intent.knownConcepts.includes("router"))) {
    setAssistantConcept(profile, "computer_basics", "known", "inference", "conoce base de redes");
  }
  if (intent.absoluteBeginner) {
    profile.experienceLevel = "beginner";
    ["computer_basics", "networking", "linux", "web_basics", "cybersecurity"].forEach((concept) => setAssistantConcept(profile, concept, "unknown", "message", input));
  }
  if (intent.preferences.practice) profile.preferences.practice = true;
  if (intent.preferences.theory) profile.preferences.theory = true;
  return profile;
}

function applyProgressToProfile(profile) {
  Object.assign(profile, migrateAssistantProfile(profile));
  const progress = getRoadmapProgress();
  profile.completedTopics = [...new Set([...(profile.completedTopics || []), ...(progress.completed || [])])];
  profile.currentTopic = progress.lastTopicId || profile.currentTopic || null;
  profile.currentRoute = progress.lastRouteId || profile.currentRoute || null;
  profile.recommendedTopic = progress.recommendedTopicId || profile.recommendedTopic || null;
  profile.recommendedRoute = progress.recommendedRouteId || profile.recommendedRoute || null;
  profile.completedTopics.forEach((topicId) => {
    const node = getRoadmapNode(topicId);
    (node?.conceptsTaught || []).forEach((concept) => setAssistantConcept(profile, concept, "confident", "progress", topicId));
  });
  return profile;
}

function goalDiagnosticBlock(goal) {
  if (goal === "general_learning" || goal === "continue_learning") return "general";
  if (goal === "web_hacking" || goal === "sql_injection" || goal === "web" || goal === "cookies" || goal === "http" || goal === "deep_web") return "web";
  if (goal === "pentesting") return "pentesting";
  if (goal === "ports" || goal === "mac" || goal === "ip" || goal === "dns" || goal === "networking" || goal === "ddos" || goal === "mitm") return "networking";
  if (goal === "linux" || goal === "linux_tools" || goal === "virtual_machines") return "linux";
  if (goal === "osint") return "osint";
  if (goal === "phishing" || goal === "malware" || goal === "trojan" || goal === "spyware" || goal === "keylogger" || goal === "ransomware") return "cybersecurity";
  if (goal === "defense") return "cybersecurity";
  return "general";
}

assistantDiagnosticBlocks.general = ["computer_basics", "operating_systems", "networking", "cybersecurity"];
assistantDiagnosticBlocks.cybersecurity = ["cybersecurity", "phishing", "malware", "privacy"];
assistantDiagnosticBlocks.osint = ["osint", "metadata", "shodan", "privacy"];

function chooseDiagnosticQuestion(goal, profile) {
  const block = goalDiagnosticBlock(goal);
  const concepts = assistantDiagnosticBlocks[block] || [];
  const unknown = concepts.filter((concept) => !assistantConceptKnown(profile, concept));
  if (unknown.length >= Math.min(3, concepts.length)) {
    const textByBlock = {
      general: "Vamos a ubicar tu punto de partida real. Marca tu nivel en estas bases.",
      web: "Antes de enviarte a hacking web, marca qué base de Web tienes clara.",
      linux: "Para orientarte bien, marca qué controlas sobre Linux y entornos.",
      pentesting: "Para práctica y pentesting, necesito saber qué base técnica tienes.",
      osint: "Para OSINT, dime qué conceptos y herramientas te suenan ya.",
      cybersecurity: "Antes de elegir ataque concreto, marca qué conceptos de ciber ya entiendes.",
      networking: "Para no mandarte demasiado adelante, marca lo que tengas claro de redes.",
    };
    const text = textByBlock[block] || textByBlock.general;
    return { type: "checklist", block, text };
  }
  return null;
}

function missingPrerequisitesForNode(node, profile) {
  return transitivePrerequisitesForNode(node).filter((concept) => !assistantConceptKnown(profile, concept));
}

function firstMeaningfulMissingPrerequisite(node, profile) {
  const missing = missingPrerequisitesForNode(node, profile);
  return missing.find((concept) => findTopicTeachingConcept(concept, false)) || missing[0] || null;
}

function continueRecommendation(profile) {
  const step = getNextLearningStep(profile, getRoadmapProgress(), profile.conversation?.finalGoal || profile.primaryGoal);
  return buildRecommendationResult(step.node, step.reason, step.confidence, step.missing, step.target);
}

function targetNodesForGoal(goal) {
  const ids = assistantGoalTargets[goal] || assistantGoalTargets.general_learning;
  return ids.map(getRoadmapNode).filter(Boolean);
}

function pickBestTargetForGoal(goal, profile) {
  const targets = targetNodesForGoal(goal);
  if (!targets.length) return firstOpenTopicInRoute(roadmapRoutes[0]?.id, profile);
  return targets
    .map((node) => {
      const missing = missingPrerequisitesForNode(node, profile);
      const availableBonus = topicIsAvailable(node) ? 8 : 0;
      const progressPenalty = (getRoadmapProgress().completed || []).includes(node.id) ? 18 : 0;
      return { node, score: 100 - (missing.length * 10) + availableBonus - progressPenalty };
    })
    .sort((a, b) => b.score - a.score)[0].node;
}

function getNextLearningStep(profile = loadAssistantProfile(), progress = getRoadmapProgress(), finalGoal = null) {
  const safeProfile = applyProgressToProfile(profile || loadAssistantProfile());
  const safeProgress = progress || getRoadmapProgress();
  safeProgress.completed = Array.isArray(safeProgress.completed) ? [...new Set(safeProgress.completed)] : [];
  const completed = new Set(safeProgress.completed);
  const pendingId = safeProgress.recommendedTopicId || safeProfile.recommendedTopic;
  const pending = getRoadmapNode(pendingId);

  if (pending && !completed.has(pending.id)) {
    return {
      node: pending,
      target: pending,
      missing: missingPrerequisitesForNode(pending, safeProfile),
      reason: "saved_recommendation",
      confidence: 0.9,
    };
  }

  const goal = finalGoal && finalGoal !== "continue_learning" ? finalGoal : safeProfile.conversation?.finalGoal || safeProfile.primaryGoal;
  if (goal && goal !== "general_learning") {
    const target = pickBestTargetForGoal(goal, safeProfile);
    const missing = missingPrerequisitesForNode(target, safeProfile);
    const missingConcept = firstMeaningfulMissingPrerequisite(target, safeProfile);
    const node = missingConcept ? findTopicTeachingConcept(missingConcept, false) : target;
    if (node && !completed.has(node.id)) {
      return {
        node,
        target,
        missing,
        reason: missingConcept ? "final_goal_gap" : "final_goal_path",
        confidence: missingConcept ? 0.86 : 0.9,
      };
    }
    if (target && !completed.has(target.id)) {
      return { node: target, target, missing, reason: "target_ready", confidence: 0.9 };
    }
  }

  const last = getRoadmapNode(safeProgress.lastTopicId || safeProfile.currentTopic);
  if (last) {
    const next = firstOpenTopicAfter(last, safeProfile);
    if (next) {
      return {
        node: next,
        target: next,
        missing: missingPrerequisitesForNode(next, safeProfile),
        reason: "progress_next",
        confidence: 0.82,
      };
    }
  }

  const fallback = firstOpenTopicInRoute(roadmapRoutes[0]?.id, safeProfile);
  return {
    node: fallback,
    target: fallback,
    missing: missingPrerequisitesForNode(fallback, safeProfile),
    reason: "progress_empty",
    confidence: 0.64,
  };
}

function buildRecommendationResult(node, reason, confidence, missing = [], targetNode = null) {
  const safeNode = firstPublishedOrPrepared(node) || getRoadmapNode("topic-1");
  const route = roadmapRoutes.find((item) => item.id === safeNode.routeId) || safeNode.route;
  const progress = getRoadmapProgress();
  progress.recommendedRouteId = route.id;
  progress.recommendedTopicId = safeNode.id;
  try { saveRoadmapProgress(progress); } catch (error) {}
  const nextNodeIds = route.topics.filter((topic) => topic.number > safeNode.number).slice(0, 2).map((topic) => topic.id);
  return {
    type: "recommendation",
    recommendedNodeId: safeNode.id,
    originalNodeId: node?.id || safeNode.id,
    sectionId: route.id,
    reason,
    nextNodeIds,
    confidence,
    missingPrerequisites: missing,
    targetNodeId: targetNode?.id || safeNode.id,
    targetGoal: assistantPendingGoal,
    topic: safeNode,
    route,
    availability: topicIsAvailable(safeNode) ? "published" : safeNode.status,
  };
}

function assistantConceptAnswer(goal) {
  const answers = {
    vpn: "Una VPN crea un túnel cifrado entre tu dispositivo e Internet. Sirve para mejorar privacidad en redes públicas y ocultar tu IP real frente a webs, pero no te vuelve invisible ni evita phishing o malware.",
    phishing: "El phishing es un engaño para que entregues datos, contraseñas o dinero haciéndose pasar por una entidad fiable. La clave es revisar remitente, enlace, urgencia y contexto antes de tocar nada.",
    ports: "Un puerto es una puerta lógica por la que un servicio escucha conexiones. Por ejemplo, una web suele usar 80 o 443; entender puertos ayuda a leer escaneos y servicios abiertos.",
    mac: "La dirección MAC identifica una tarjeta de red dentro de una red local. No es lo mismo que la IP: la IP sirve para enrutar; la MAC funciona más cerca del dispositivo físico.",
    dns: "DNS traduce nombres como cibersinhumo.es a direcciones IP. Es como la agenda que permite que el navegador encuentre el servidor correcto.",
    http: "HTTP es el protocolo que usa el navegador para pedir recursos a una web. HTTPS añade cifrado para proteger la comunicación.",
    cookies: "Las cookies son pequeños datos que una web guarda en el navegador para recordar sesiones, preferencias o medición.",
    sql_injection: "SQL Injection ocurre cuando una web mete datos del usuario en una consulta SQL sin validarlos bien, permitiendo manipular la base de datos.",
  };
  return answers[goal] || "";
}

function makeAssistantDecision(input, options = {}) {
  const profile = applyProgressToProfile(options.profile || loadAssistantProfile());
  const intent = parseAssistantIntent(input);
  updateProfileFromText(profile, input);

  if (intent.isGreeting && intent.words.length <= 4) return { type: "smalltalk", profile, intent };
  if (intent.isThanks && intent.words.length <= 5) return { type: "thanks", profile, intent };

  if (intent.correctionKnown && assistantLastDecision?.topic) {
    const completed = completeAssistantTopicAndFindNext(assistantLastDecision);
    saveAssistantProfile(profile);
    if (completed) return buildRecommendationResult(completed, "progress_next", 0.92, missingPrerequisitesForNode(completed, profile), completed);
    return { type: "progress_done", profile, intent, topic: assistantLastDecision.topic, route: assistantLastDecision.route };
  }

  if (intent.continueLearning) {
    saveAssistantProfile(profile);
    return continueRecommendation(profile);
  }

  if (intent.absoluteBeginner) {
    assistantPendingGoal = "general_learning";
    profile.conversation.pendingGoal = assistantPendingGoal;
    saveAssistantProfile(profile);
    return buildRecommendationResult(firstOpenTopicInRoute(roadmapRoutes[0]?.id, profile), "absolute_beginner", 0.96, [], getRoadmapNode("topic-1"));
  }

  const currentGoal = intent.immediateGoal && intent.immediateGoal !== "general_learning" ? intent.immediateGoal : intent.goal;
  if (intent.finalGoal && intent.finalGoal !== currentGoal) profile.conversation.finalGoal = intent.finalGoal;
  assistantPendingGoal = currentGoal === "general_learning" ? (profile.primaryGoal || profile.conversation.finalGoal || "general_learning") : currentGoal;
  profile.conversation.pendingGoal = assistantPendingGoal;

  if (intent.goal === "general_learning" && !intent.learningRequest && !intent.asksDefinition && !options.forceRecommend) {
    saveAssistantProfile(profile);
    return {
      type: "clarify",
      profile,
      intent,
      question: "Cuéntame qué te interesa: redes, phishing, Linux, web, privacidad o herramientas. También puedes decirme si empiezas desde cero.",
    };
  }

  const target = pickBestTargetForGoal(assistantPendingGoal, profile);
  const missing = missingPrerequisitesForNode(target, profile);
  const directAnswer = intent.asksDefinition && !intent.learningRequest && !intent.unknownConcepts.length && assistantConceptAnswer(assistantPendingGoal);
  if (directAnswer) {
    saveAssistantProfile(profile);
    return {
      type: "concept_answer",
      answer: directAnswer,
      profile,
      intent,
      topic: target,
      route: target.route,
      recommendedNodeId: target.id,
      sectionId: target.route.id,
      availability: topicIsAvailable(target) ? "published" : target.status,
    };
  }

  const diagnostic = chooseDiagnosticQuestion(assistantPendingGoal, profile);
  if (diagnostic && !options.forceRecommend && missing.length >= 3 && assistantPendingGoal !== "pentesting" && !assistantSpecificGoals.has(assistantPendingGoal)) {
    assistantPendingQuestion = diagnostic;
    profile.conversation.pendingQuestion = diagnostic;
    saveAssistantProfile(profile);
    return { type: "diagnostic", question: diagnostic, profile, intent, confidence: 0.58 };
  }

  const explicitMissingConcept = intent.unknownConcepts.find((concept) => missing.includes(concept) && findTopicTeachingConcept(concept, false));
  const missingConcept = explicitMissingConcept || firstMeaningfulMissingPrerequisite(target, profile);
  const advancedGoalNeedsBase = ["sql_injection", "web_hacking", "pentesting", "mitm", "ddos"].includes(assistantPendingGoal);
  const shouldStartAtMissing = !!missingConcept && (!!explicitMissingConcept || (!intent.asksDefinition && (!assistantSpecificGoals.has(assistantPendingGoal) || advancedGoalNeedsBase)));
  const startNode = shouldStartAtMissing
    ? findTopicTeachingConcept(missingConcept, false)
    : target;
  const reason = shouldStartAtMissing ? "first_unsatisfied_prerequisite" : "target_ready";
  const result = buildRecommendationResult(startNode, reason, reason === "target_ready" ? 0.9 : 0.78, missing, target);
  profile.recommendedTopic = result.recommendedNodeId;
  profile.recommendedRoute = result.sectionId;
  profile.conversation.lastDecision = { topicId: result.recommendedNodeId, routeId: result.sectionId, reason: result.reason };
  saveAssistantProfile(profile);
  return result;
}

function applyAssistantChecklistSelection(block, selectedConcepts, profile = loadAssistantProfile()) {
  const concepts = assistantDiagnosticBlocks[block] || [];
  const selected = selectedConcepts && typeof selectedConcepts === "object" && !Array.isArray(selectedConcepts)
    ? null
    : new Set(selectedConcepts || []);
  concepts.forEach((concept) => {
    const level = selected ? (selected.has(concept) ? "known" : "unknown") : (selectedConcepts[concept] || "unknown");
    setAssistantConcept(profile, concept, level, "diagnostic", block);
  });
  profile.conversation.pendingQuestion = null;
  saveAssistantProfile(profile);
  return profile;
}

function handleAssistantCheckToggle(button) {
  const row = button.closest("[data-assistant-check-row]");
  if (!row) return;
  row.querySelectorAll("[data-assistant-check]").forEach((item) => {
    item.setAttribute("aria-pressed", "false");
    item.classList.remove("is-selected");
  });
  button.setAttribute("aria-pressed", "true");
  button.classList.add("is-selected");
}

function handleAssistantCheckPreset(button) {
  const checklist = button.closest("[data-assistant-checklist]");
  const level = button.dataset.assistantPresetLevel || "unknown";
  if (!checklist) return;
  checklist.querySelectorAll("[data-assistant-check-row]").forEach((row) => {
    const target = row.querySelector(`[data-assistant-level="${level}"]`);
    if (target) handleAssistantCheckToggle(target);
  });
}

function handleAssistantKnowledgeAction(button) {
  if (button.dataset.assistantBusy === "true") return;
  button.dataset.assistantBusy = "true";
  const profile = loadAssistantProfile();
  const state = button.dataset.knowledgeState || "known";
  const concept = button.dataset.assistantKnowledge;
  const block = button.dataset.assistantBlock;
  if (concept) setAssistantConcept(profile, concept, state, "diagnostic", button.textContent.trim());
  if (block) (assistantDiagnosticBlocks[block] || []).forEach((item) => setAssistantConcept(profile, item, state, "diagnostic", button.textContent.trim()));
  assistantPendingQuestion = null;
  saveAssistantProfile(profile);
  const goalText = assistantPendingGoal ? `quiero aprender ${assistantPendingGoal}` : "por donde sigo";
  addAssistantMessage(`<p>${escapeAssistantHtml(button.textContent.trim())}</p>`, "user");
  window.setTimeout(() => addAssistantMessage(buildAssistantReply(goalText), "bot"), 120);
}

function handleAssistantCheckConfirm(button) {
  if (button.dataset.assistantBusy === "true") return;
  button.dataset.assistantBusy = "true";
  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = "Analizando...";
  const block = button.dataset.assistantCheckConfirm;
  const checklist = button.closest("[data-assistant-checklist]");
  if (!block || !checklist) return;
  const levels = {};
  checklist.querySelectorAll("[data-assistant-check-row]").forEach((row) => {
    const concept = row.dataset.assistantCheckRow;
    const selected = row.querySelector("[data-assistant-check][aria-pressed='true']");
    if (concept) levels[concept] = selected?.dataset.assistantLevel || "unknown";
  });
  applyAssistantChecklistSelection(block, levels);
  assistantPendingQuestion = null;
  const levelLabels = { unknown: "No", uncertain: "Me suena", known: "Lo entiendo", confident: "Lo uso" };
  const response = Object.entries(levels)
    .map(([concept, level]) => `${assistantConceptLabel(concept)}: ${levelLabels[level] || level}`)
    .join(", ");
  const goalText = assistantPendingGoal ? `quiero aprender ${assistantPendingGoal}` : "por donde sigo";
  addAssistantMessage(`<p>Nivel marcado: ${escapeAssistantHtml(response || "sin selección")}.</p>`, "user");
  window.setTimeout(() => {
    button.dataset.assistantBusy = "false";
    button.disabled = false;
    button.textContent = originalText;
    addAssistantMessage(buildAssistantReply(goalText), "bot");
  }, 120);
}

function completeAssistantTopicAndFindNext(decision) {
  const currentTopic = decision?.topic || getRoadmapNode(decision?.recommendedNodeId);
  const route = decision?.route || roadmapRoutes.find((item) => item.id === currentTopic?.routeId);
  if (!currentTopic?.id || !route?.topics) return null;

  const progress = getRoadmapProgress();
  progress.completed = Array.isArray(progress.completed) ? progress.completed : [];
  progress.completed = [...new Set(progress.completed)];
  if (!progress.completed.includes(currentTopic.id)) progress.completed.push(currentTopic.id);
  progress.lastTopicId = currentTopic.id;
  progress.lastRouteId = route.id;

  const profile = loadAssistantProfile();
  profile.completedTopics = [...new Set([...(profile.completedTopics || []), currentTopic.id])];
  (currentTopic.conceptsTaught || []).forEach((concept) => setAssistantConcept(profile, concept, "confident", "progress", currentTopic.id));

  const finalGoal = profile.conversation?.finalGoal || decision?.targetGoal || assistantPendingGoal || profile.primaryGoal;
  const nextStep = getNextLearningStep(profile, progress, finalGoal);
  const nextNode = nextStep?.node && nextStep.node.id !== currentTopic.id ? nextStep.node : null;
  if (nextNode) {
    progress.recommendedRouteId = nextNode.route.id;
    progress.recommendedTopicId = nextNode.id;
    profile.recommendedRoute = nextNode.route.id;
    profile.recommendedTopic = nextNode.id;
  } else {
    delete progress.recommendedRouteId;
    delete progress.recommendedTopicId;
    profile.recommendedTopic = null;
    profile.recommendedRoute = null;
  }
  saveAssistantProfile(profile);
  saveRoadmapProgress(progress);
  if (typeof activeRoadmapRoute !== "undefined" && activeRoadmapRoute?.id === route.id) renderRoadmapPath(route);
  if (typeof renderRoadmapRoutes === "function") renderRoadmapRoutes();
  return nextNode;
}

function setAssistantControlBusy(control, busy, label = null) {
  if (!control) return;
  control.dataset.assistantBusy = busy ? "true" : "false";
  control.setAttribute("aria-busy", busy ? "true" : "false");
  if ("disabled" in control) control.disabled = !!busy;
  if (label !== null) {
    if (!control.dataset.assistantOriginalText) control.dataset.assistantOriginalText = control.textContent;
    control.textContent = busy ? label : control.dataset.assistantOriginalText;
    if (!busy) delete control.dataset.assistantOriginalText;
  }
}

function handleAssistantCorrectionAction(action, button = null) {
  if (button?.dataset.assistantBusy === "true") return;
  setAssistantControlBusy(button, true, action === "known" ? "Actualizando..." : null);

  try {
    if (!assistantLastDecision) assistantLastDecision = decisionFromSavedRecommendation();
    if (!assistantLastDecision) {
      addAssistantMessage(`${assistantNameMarkup()}<p>No tengo una recomendación activa que marcar. Dime el tema que quieres aprender y te coloco en el punto correcto.</p>`, "bot");
      setAssistantControlBusy(button, false, action === "known" ? "" : null);
      return;
    }

    const profile = loadAssistantProfile();
    if (action === "start") {
      const progress = getRoadmapProgress();
      progress.recommendedRouteId = assistantLastDecision.route.id;
      progress.recommendedTopicId = assistantLastDecision.topic.id;
      progress.lastRouteId = assistantLastDecision.route.id;
      progress.lastTopicId = assistantLastDecision.topic.id;
      saveRoadmapProgress(progress);
      openRoadmapRoute(assistantLastDecision.route.id, assistantLastDecision.topic.id);
      setAssistantControlBusy(button, false);
      return;
    }

    if (action === "known") {
      const currentDecision = assistantLastDecision;
      addAssistantMessage(`<p>Esto ya me lo sé.</p>`, "user");
      window.setTimeout(() => {
        let nextNode = null;
        try {
          nextNode = completeAssistantTopicAndFindNext(currentDecision);
          if (!nextNode) {
            addAssistantMessage(`${assistantNameMarkup()}<p>Perfecto, entonces no te hago perder tiempo con esto. Marco <strong>${escapeAssistantHtml(currentDecision.topic.title)}</strong> como completado. No veo más gaps claros hacia tu objetivo; dime otro tema o abre el roadmap para elegir el siguiente planeta.</p>`, "bot");
            return;
          }
          const nextProfile = loadAssistantProfile();
          const finalGoal = nextProfile.conversation?.finalGoal || currentDecision.targetGoal || assistantPendingGoal || nextProfile.primaryGoal;
          let nextStep = null;
          try {
            nextStep = getNextLearningStep(nextProfile, getRoadmapProgress(), finalGoal);
          } catch (stepError) {
            console.warn("[CSH Assistant] No se pudo recalcular el siguiente paso, uso fallback", stepError);
          }
          const recommended = (nextStep?.node && nextStep.node.id !== currentDecision.topic.id)
            ? nextStep.node
            : nextNode || firstOpenTopicAfter(currentDecision.topic, nextProfile) || firstOpenTopicInRoute(currentDecision.route?.id, nextProfile);
          if (!recommended || recommended.id === currentDecision.topic.id) {
            addAssistantMessage(`${assistantNameMarkup()}<p>Perfecto, marco <strong>${escapeAssistantHtml(currentDecision.topic.title)}</strong> como completado. No veo un paso posterior claro en esa ruta ahora mismo; puedes abrir el roadmap o decirme otro tema y te llevo a algo más avanzado.</p>`, "bot");
            return;
          }
          const nextDecision = buildRecommendationResult(recommended, nextStep?.reason || "progress_next", nextStep?.confidence || 0.9, nextStep?.missing || missingPrerequisitesForNode(recommended, nextProfile), nextStep?.target || recommended);
          assistantLastDecision = nextDecision;
          addAssistantMessage(renderAssistantRecommendation(nextDecision, `<p>Perfecto, entonces no te hago perder tiempo con esto. Marco <strong>${escapeAssistantHtml(currentDecision.topic.title)}</strong> como completado.</p><p>El siguiente paso que te conviene es:</p>`), "bot");
        } catch (error) {
          console.error("[CSH Assistant] Error en 'Esto ya me lo sé'", error);
          const nextProfile = loadAssistantProfile();
          const fallback = nextNode || firstOpenTopicAfter(currentDecision.topic, nextProfile) || firstOpenTopicInRoute(currentDecision.route?.id, nextProfile);
          if (fallback && fallback.id !== currentDecision.topic.id) {
            const fallbackDecision = buildRecommendationResult(fallback, "progress_next", 0.74, missingPrerequisitesForNode(fallback, nextProfile), fallback);
            assistantLastDecision = fallbackDecision;
            addAssistantMessage(renderAssistantRecommendation(fallbackDecision, `<p>Perfecto, marco <strong>${escapeAssistantHtml(currentDecision.topic.title)}</strong> como dominado. Si quieres algo más avanzado, el siguiente paso razonable es:</p>`), "bot");
          } else {
            addAssistantMessage(`${assistantNameMarkup()}<p>Perfecto, lo tomo como completado. Dime ahora qué quieres aprender y te llevo a un punto más avanzado.</p>`, "bot");
          }
        } finally {
          setAssistantControlBusy(button, false, action === "known" ? "" : null);
        }
      }, 120);
      return;
    }

    if (action === "earlier") {
      const missingConcept = firstMeaningfulMissingPrerequisite(assistantLastDecision.topic, profile) || assistantLastDecision.topic.prerequisites?.[0] || "computer_basics";
      setAssistantConcept(profile, missingConcept, "unknown", "correction", "Necesito empezar antes");
      saveAssistantProfile(profile);
      const node = findTopicTeachingConcept(missingConcept, false) || getRoadmapNode("topic-1");
      const nextDecision = buildRecommendationResult(node, "earlier_prerequisite", 0.88, missingPrerequisitesForNode(node, profile), assistantLastDecision.topic);
      assistantLastDecision = nextDecision;
      addAssistantMessage(`<p>Necesito empezar antes.</p>`, "user");
      window.setTimeout(() => {
        try {
          addAssistantMessage(renderAssistantRecommendation(nextDecision, "<p>Bien visto. Bajamos un escalón y reforzamos antes esto:</p>"), "bot");
        } finally {
          setAssistantControlBusy(button, false);
        }
      }, 120);
      return;
    }

    if (action === "diagnose") {
      const block = goalDiagnosticBlock(assistantPendingGoal || assistantLastDecision.targetGoal || "networking");
      assistantPendingQuestion = { type: "checklist", block, text: (chooseDiagnosticQuestion(assistantPendingGoal || assistantLastDecision.targetGoal || "networking", profile)?.text || "Vamos a ubicar tu base. Marca lo que controles.") };
      addAssistantMessage(`<p>Evaluar mejor mi nivel.</p>`, "user");
      window.setTimeout(() => {
        try {
          addAssistantMessage(`${assistantNameMarkup()}<p>${assistantPendingQuestion.text}</p>${renderAssistantChecklist(assistantPendingQuestion)}`, "bot");
        } finally {
          setAssistantControlBusy(button, false);
        }
      }, 120);
      return;
    }
    setAssistantControlBusy(button, false, action === "known" ? "" : null);
  } catch (error) {
    console.error("[CSH Assistant] Error en acción del asistente", error);
    addAssistantMessage(`${assistantNameMarkup()}<p>No he podido procesar esa acción. Inténtalo de nuevo.</p>`, "bot");
    setAssistantControlBusy(button, false, action === "known" ? "" : null);
  }
}

function renderAssistantRecommendation(decision, intro = "<p>Te recomiendo empezar por:</p>") {
  const { route, topic, reason, availability, missingPrerequisites } = decision;
  const isAvailable = availability === "published" && topic?.url;
  const prereqLabel = missingPrerequisites?.[0] ? assistantConceptLabel(missingPrerequisites[0]) : "";
  const why = reason === "absolute_beginner"
    ? "Si empiezas desde cero, lo mejor es construir base antes de tocar herramientas. Así entiendes qué haces y por qué."
    : reason === "first_unsatisfied_prerequisite" || reason === "earlier_prerequisite"
      ? `Tu objetivo tiene sentido, pero antes conviene reforzar <strong>${escapeAssistantHtml(prereqLabel)}</strong> para que no vayas a ciegas.`
      : reason === "saved_recommendation"
        ? "Mantengo el punto que tenías recomendado para que no saltes de tema sin querer."
        : "Es el punto que mejor encaja con lo que has pedido ahora.";
  const availabilityLine = isAvailable
    ? `Empieza por el vídeo <strong>${escapeAssistantHtml(topic.title)}</strong>.`
    : `El punto correcto es <strong>${escapeAssistantHtml(topic.title)}</strong>. Todavía está como <strong>${escapeAssistantHtml(topic.statusLabel || "pendiente")}</strong>, así que te lo enseño en el roadmap y puedes avanzar con el paso anterior disponible.`;
  return `${assistantNameMarkup()}${intro}<p><strong>${escapeAssistantHtml(route.title)}</strong><br><strong>${escapeAssistantHtml(topic.title)}</strong></p><p>${why}</p><p>${availabilityLine}</p>${assistantRouteButton(route, topic, isAvailable ? "Abrir vídeo/ruta" : "Abrir roadmap")}${assistantCorrectionButtons()}`;
}

function assistantConceptLabel(concept) {
  const labels = {
    computer_basics: "informática base",
    operating_systems: "sistemas operativos",
    linux: "Linux",
    terminal: "terminal",
    virtual_machines: "máquinas virtuales",
    networking: "redes",
    ip: "dirección IP",
    router: "router",
    mac: "dirección MAC",
    ports: "puertos",
    tcp_udp: "TCP y UDP",
    dns: "DNS",
    vpn: "VPN",
    http: "HTTP",
    web_basics: "web básica",
    http_requests: "peticiones HTTP",
    get_post: "GET y POST",
    cookies: "cookies",
    sessions: "sesiones",
    sql: "SQL",
    cybersecurity: "ciberseguridad básica",
    phishing: "phishing",
    malware: "malware",
    pentesting: "pentesting",
    osint: "OSINT",
    web_hacking: "hacking web",
    privacy: "privacidad",
    metadata: "metadatos",
    shodan: "Shodan",
  };
  return labels[concept] || String(concept || "").replace(/_/g, " ");
}

function renderAssistantChecklist(question) {
  const concepts = assistantDiagnosticBlocks[question.block] || [];
  const levels = [
    ["unknown", "No"],
    ["uncertain", "Me suena"],
    ["known", "Lo entiendo"],
    ["confident", "Lo uso"],
  ];
  const rows = concepts.map((concept) => {
    const label = assistantConceptLabel(concept);
    const buttons = levels.map(([level, text]) => {
      const selected = level === "unknown";
      return `<button type="button" class="assistant-check-level${selected ? " is-selected" : ""}" data-assistant-check="${concept}" data-assistant-level="${level}" aria-pressed="${selected ? "true" : "false"}">${text}</button>`;
    }).join("");
    return `<div class="assistant-check-row" data-assistant-check-row="${concept}"><span class="assistant-check-label">${escapeAssistantHtml(label)}</span><div class="assistant-check-levels" role="group" aria-label="${escapeAssistantHtml(label)}">${buttons}</div></div>`;
  }).join("");
  return `<div class="assistant-checklist assistant-checklist-levels" data-assistant-checklist="${question.block}">${rows}<div class="assistant-check-presets"><button type="button" class="assistant-route-link" data-assistant-check-preset="${question.block}" data-assistant-preset-level="unknown">No conozco ninguno</button><button type="button" class="assistant-route-link" data-assistant-check-preset="${question.block}" data-assistant-preset-level="known">Conozco casi todos</button></div><button type="button" class="assistant-route-link assistant-check-confirm" data-assistant-check-confirm="${question.block}">Confirmar nivel</button></div>`;
}

function buildAssistantReply(text) {
  const decision = makeAssistantDecision(text);
  if (decision.type === "recommendation") assistantLastDecision = decision;
  if (decision.type === "concept_answer") {
    assistantLastDecision = buildRecommendationResult(decision.topic, "concept_answer", 0.86, missingPrerequisitesForNode(decision.topic, decision.profile), decision.topic);
    return `${assistantNameMarkup()}<p>${escapeAssistantHtml(decision.answer)}</p><p>Si quieres verlo dentro del recorrido, te dejo el punto exacto del roadmap.</p>${assistantRouteButton(decision.route, decision.topic, "Ver en roadmap")}${assistantCorrectionButtons()}`;
  }
  if (decision.type === "smalltalk") return `${assistantNameMarkup()}<p>¡Hola! Soy el asistente de Ciber Sin Humo. Dime qué quieres aprender o qué se te atraganta y te coloco en el punto adecuado.</p>`;
  if (decision.type === "thanks") return `${assistantNameMarkup()}<p>De nada. Cuando quieras seguimos afinando tu ruta.</p>`;
  if (decision.type === "clarify") return `${assistantNameMarkup()}<p>${escapeAssistantHtml(decision.question)}</p>`;
  if (decision.type === "progress_done") return `${assistantNameMarkup()}<p>Perfecto, marco ese punto como dominado. Puedes pedirme otro objetivo o abrir el roadmap para elegir el siguiente planeta.</p>`;
  if (decision.type === "diagnostic") {
    return `${assistantNameMarkup()}<p>${escapeAssistantHtml(decision.question.text)}</p>${decision.question.type === "checklist" ? renderAssistantChecklist(decision.question) : `<div class="assistant-actions"><button type="button" class="assistant-route-link" data-assistant-knowledge="${decision.question.concept}" data-knowledge-state="known">Sí, lo controlo</button><button type="button" class="assistant-route-link" data-assistant-knowledge="${decision.question.concept}" data-knowledge-state="beginner">Lo he tocado poco</button><button type="button" class="assistant-route-link" data-assistant-knowledge="${decision.question.concept}" data-knowledge-state="unknown">No, empiezo ahí</button></div>`}`;
  }
  return renderAssistantRecommendation(decision);
}

if (typeof globalThis !== "undefined") {
  globalThis.__cshAssistantEngine = {
    makeAssistantDecision,
    parseAssistantIntent,
    updateProfileFromText,
    validateAssistantKnowledgeGraph,
    loadAssistantProfile,
    saveAssistantProfile,
    setAssistantConcept,
    getAssistantConceptState,
    getAssistantConceptMastery,
    applyAssistantChecklistSelection,
    migrateAssistantProfile,
    scoreAssistantGoals,
    goalDiagnosticBlock,
    getNextLearningStep,
    completeAssistantTopicAndFindNext,
    decisionFromSavedRecommendation,
    handleAssistantCorrectionAction,
  };
}
function escapeAssistantHtml(value) {
  return String(value || "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function assistantPlainTextFromHtml(content) {
  const parser = document.createElement("div");
  parser.innerHTML = content;
  return (parser.textContent || "").replace(/\s+/g, " ").trim();
}

function typeAssistantBubble(bubble, content, message) {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const plainText = assistantPlainTextFromHtml(content);
  if (reduceMotion || !plainText) {
    bubble.innerHTML = content;
    return;
  }

  message.classList.add("is-typing");
  bubble.textContent = "";

  let index = 0;
  const step = () => {
    bubble.textContent = plainText.slice(0, index);
    assistantOutput.scrollTop = assistantOutput.scrollHeight;
    index += 1;

    if (index <= plainText.length) {
      window.setTimeout(step, 12);
      return;
    }

    bubble.innerHTML = content;
    message.classList.remove("is-typing");
    assistantOutput.scrollTop = assistantOutput.scrollHeight;
  };

  step();
}

function addAssistantMessage(content, type = "bot") {
  if (!assistantOutput) return;
  const message = document.createElement("div");
  message.className = `assistant-message assistant-message-${type}`;
  const avatar = type === "user"
    ? `<div class="assistant-avatar assistant-avatar-user" aria-hidden="true">TÚ</div>`
    : `<div class="assistant-avatar assistant-avatar-bot" aria-hidden="true"><img src="logo-cibersinhumo-transparent.png?v=1" alt=""></div>`;
  message.innerHTML = `${avatar}<div class="assistant-bubble"></div>`;
  const bubble = message.querySelector(".assistant-bubble");
  if (type === "bot") {
    typeAssistantBubble(bubble, content, message);
  } else {
    bubble.innerHTML = content;
  }
  assistantOutput.appendChild(message);
  assistantOutput.scrollTop = assistantOutput.scrollHeight;
}
function replayAssistantIntro() {
  if (!assistantOutput) return;
  assistantOutput.innerHTML = "";
  assistantOutput.dataset.initialized = "true";
  addAssistantMessage(`${assistantNameMarkup()}<p>Hola, soy el asistente de Ciber Sin Humo. Dime qué quieres aprender, qué tema te lía o qué vídeo estás buscando, y te oriento paso a paso.</p><p class="assistant-hint">Prueba: “no sé nada de redes”, “explícame VPN” o “quiero practicar con herramientas”.</p>`, "bot");
}

function handleAssistantPrompt(text) {
  const cleanText = String(text || "").trim();
  if (!cleanText) return;
  addAssistantMessage(`<p>${escapeAssistantHtml(cleanText)}</p>`, "user");
  window.setTimeout(() => {
    let decision = null;
    let reply = "";
    try {
      reply = buildAssistantReply(cleanText);
      decision = assistantLastDecision;
    } catch (error) {
      console.warn("Roadmap assistant fallback", error);
      addAssistantMessage(`${assistantNameMarkup()}<p>Te leo, pero ahora mismo necesito que me lo digas con una palabra clave: redes, phishing, Linux, web, privacidad o herramientas.</p>`, "bot");
      return;
    }

    addAssistantMessage(reply, "bot");

    try {
      if (decision?.type === "recommendation" && decision.route && decision.topic) {
        const progress = getRoadmapProgress();
        progress.recommendedRouteId = decision.route.id;
        progress.recommendedTopicId = decision.topic.id;
        saveRoadmapProgress(progress);
      }
    } catch (error) {
      console.warn("Roadmap assistant progress save skipped", error);
    }
  }, 160);
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
    document.getElementById("videos")?.classList.remove("is-route-detail-open");
    activeRoadmapRoute = null;
    startRoadmapSolarSystem();
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
    const checklistConfirm = event.target.closest("[data-assistant-check-confirm]");
    if (checklistConfirm) {
      handleAssistantCheckConfirm(checklistConfirm);
      return;
    }
    const checklistPreset = event.target.closest("[data-assistant-check-preset]");
    if (checklistPreset) {
      handleAssistantCheckPreset(checklistPreset);
      return;
    }
    const checklistToggle = event.target.closest("[data-assistant-check]");
    if (checklistToggle) {
      handleAssistantCheckToggle(checklistToggle);
      return;
    }
    const knowledgeButton = event.target.closest("[data-assistant-knowledge], [data-assistant-block]");
    if (knowledgeButton) {
      handleAssistantKnowledgeAction(knowledgeButton);
      return;
    }
    const actionButton = event.target.closest("[data-assistant-action]");
    if (actionButton) {
      handleAssistantCorrectionAction(actionButton.dataset.assistantAction, actionButton);
      return;
    }
    const item = event.target.closest("[data-continue-route], [data-assistant-route]");
    if (item) {
      if (item.dataset.assistantBusy === "true") return;
      item.dataset.assistantBusy = "true";
      if ("disabled" in item) item.disabled = true;
      const panels = document.getElementById("roadmap-panels");
      const videosSection = document.getElementById("videos");
      panels?.classList.add("is-open");
      videosSection?.classList.add("is-roadmap-open");
      document.body.classList.add("roadmap-fullscreen-mode");
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
    videosSection?.classList.remove("is-route-detail-open");
    document.body.classList.remove("roadmap-fullscreen-mode");
    roadmapView.hidden = true;
    activeRoadmapRoute = null;
    stopRoadmapSolarSystem();
    videosSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  document.querySelectorAll("[data-roadmap-scroll]").forEach((button) => button.addEventListener("click", openRoadmapScreen));
  document.querySelectorAll("[data-hero-route]").forEach((button) => button.addEventListener("click", () => {
    const routeId = button.dataset.heroRoute;
    const panels = document.getElementById("roadmap-panels");
    const videosSection = document.getElementById("videos");
    panels?.classList.add("is-open");
    videosSection?.classList.add("is-roadmap-open");
    document.body.classList.add("roadmap-fullscreen-mode");
    videosSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => openRoadmapRoute(routeId), 220);
  }));
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

if (labsGrid && labPanel) {
  renderLabsGrid();

  document.querySelectorAll("[data-lab-filter]").forEach((button) => button.addEventListener("click", () => {
    activeLabLevel = button.dataset.labFilter || "all";
    document.querySelectorAll("[data-lab-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
    renderLabsGrid();
  }));

  document.querySelectorAll("[data-lab-topic]").forEach((button) => button.addEventListener("click", () => {
    const nextTopic = button.dataset.labTopic || "all";
    activeLabTopic = activeLabTopic === nextTopic ? "all" : nextTopic;
    document.querySelectorAll("[data-lab-topic]").forEach((item) => item.classList.toggle("is-active", activeLabTopic === item.dataset.labTopic));
    renderLabsGrid();
  }));

  document.addEventListener("click", (event) => {
    const openButton = event.target.closest("[data-open-lab]");
    if (openButton) {
      event.preventDefault();
      const labsSection = document.getElementById("laboratorios");
      labsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => renderLabPanel(openButton.dataset.openLab), 180);
    }
  });

  labPanel.addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-lab-step]");
    if (!checkbox) return;
    const lab = cshLabs.find((item) => labPanel.querySelector("[data-lab-complete]")?.dataset.labComplete === item.id);
    if (!lab) return;
    const stepIndex = Number(checkbox.dataset.labStep);
    updateLabState(lab.id, (current) => {
      const steps = checkbox.checked
        ? [...new Set([...current.steps, stepIndex])]
        : current.steps.filter((item) => item !== stepIndex);
      return { ...current, steps, completed: false };
    });
    renderLabPanel(lab.id, false);
  });

  labPanel.addEventListener("click", (event) => {
    const answer = event.target.closest("[data-lab-question][data-lab-answer]");
    if (answer) {
      const lab = cshLabs.find((item) => labPanel.querySelector("[data-lab-complete]")?.dataset.labComplete === item.id);
      if (!lab) return;
      updateLabState(lab.id, (current) => ({
        ...current,
        answers: { ...current.answers, [answer.dataset.labQuestion]: Number(answer.dataset.labAnswer) },
        completed: false
      }));
      renderLabPanel(lab.id, false);
      return;
    }

    const complete = event.target.closest("[data-lab-complete]");
    if (!complete || complete.disabled) return;
    updateLabState(complete.dataset.labComplete, (current) => ({ ...current, completed: true }));
    renderLabPanel(complete.dataset.labComplete, false);
  });
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
      url: "https://www.youtube.com/watch?v=YfnVA5sx3pQ",
      thumbnail: "https://i.ytimg.com/vi/YfnVA5sx3pQ/hqdefault.jpg",
      category: "Informática base",
      title: "Hardware y software: la base para empezar",
    },
    {
      url: "https://www.youtube.com/watch?v=g3WsvKOQ_GE",
      thumbnail: "https://i.ytimg.com/vi/g3WsvKOQ_GE/hqdefault.jpg",
      category: "Noticias",
      title: "Red 764, qué es y por qué preocupa",
    },
    {
      url: "https://www.youtube.com/watch?v=FzjM9Imdb8Q",
      thumbnail: "https://i.ytimg.com/vi/FzjM9Imdb8Q/hqdefault.jpg",
      category: "Otros",
      title: "¿Qué hacer si un virus roba todas tus contraseñas?",
    },
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

const MIN_VISIBLE_SUBSCRIBERS = 101;

async function initYoutubeChannelPanel() {
  const subsEl = document.getElementById("youtube-subs-count");
  const spotlightSubsEl = document.getElementById("youtube-subs-spotlight");
  const statusEl = document.getElementById("youtube-subs-status");
  const latestEl = document.getElementById("youtube-latest-videos");
  const latestStatus = document.getElementById("youtube-latest-status");
  if (!statusEl) return;

  const localLatestVideos = [
    {
      url: "https://www.youtube.com/watch?v=dp8vyvcoSMs",
      thumbnail: "https://i.ytimg.com/vi/dp8vyvcoSMs/hqdefault.jpg",
      category: "Informática base",
      title: "Todo lo que un principiante debería saber de Linux"
    },
    {
      url: "https://www.youtube.com/watch?v=plaRNTudKPA",
      thumbnail: "https://i.ytimg.com/vi/plaRNTudKPA/hqdefault.jpg",
      category: "Informática base",
      title: "Qué es un sistema operativo?"
    },
    {
      url: "https://www.youtube.com/watch?v=YfnVA5sx3pQ",
      thumbnail: "https://i.ytimg.com/vi/YfnVA5sx3pQ/hqdefault.jpg",
      category: "Informática base",
      title: "Hardware y software: la base para empezar"
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




