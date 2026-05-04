window.addEventListener("load", () => {
  const canvas = document.getElementById("globo");
  const ctx = canvas.getContext("2d");
  const wrapper = canvas.parentElement;

  function resize() {
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const getR = () => Math.min(canvas.width, canvas.height) * 0.42;
  let rotX = 0, rotY = 0;
  let dragging = false, lastX, lastY, velY = 0.002;
  let geoData = null;

  canvas.addEventListener("mousedown", e => { dragging = true; lastX = e.clientX; lastY = e.clientY; velY = 0; });
  canvas.addEventListener("mousemove", e => {
    if (!dragging) return;
    velY = (e.clientX - lastX) * 0.005;
    rotY += velY;
    rotX += (e.clientY - lastY) * 0.005;
    rotX = Math.max(-Math.PI/2.5, Math.min(Math.PI/2.5, rotX));
    lastX = e.clientX; lastY = e.clientY;
  });
  canvas.addEventListener("mouseup", () => dragging = false);
  canvas.addEventListener("mouseleave", () => dragging = false);

  function latLonTo3D(lat, lon, r) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lon + 180) * Math.PI / 180;
      return {
        x: -r * Math.sin(phi) * Math.cos(theta),
        y:  r * Math.cos(phi),
        z:  r * Math.sin(phi) * Math.sin(theta)
      };
    
  }

  function project(p, r) {
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
  
    // Primero rotar en Y (longitud)
    const x1 =  p.x * cosY - p.z * sinY;
    const z1 =  p.x * sinY + p.z * cosY;
  
    // Luego rotar en X (latitud)
    const y2 =  p.y * cosX + z1 * sinX;
    const z2 = -p.y * sinX + z1 * cosX;
  
    return {
      x: canvas.width  / 2 + x1,
      y: canvas.height / 2 - y2,
      z: z2,
      visible: z2 > 0
    };
  }
  

  function drawPolygon(coords, r) {
    ctx.beginPath();
    let started = false;
    for (let i = 0; i < coords.length; i++) {
      const p3d = latLonTo3D(coords[i][1], coords[i][0], r * 1.001);
      const p = project(p3d, r);
      if (!p.visible) { started = false; continue; }
      if (!started) { ctx.moveTo(p.x, p.y); started = true; }
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = "rgba(0,255,136,0.35)";
    ctx.lineWidth = 0.6;
    ctx.stroke();
    ctx.fillStyle = "rgba(0,255,136,0.04)";
    ctx.fill();
  }

  function drawGeoJSON(r) {
    if (!geoData) return;
    geoData.features.forEach(feature => {
      const geom = feature.geometry;
      if (!geom) return;
      if (geom.type === "Polygon") {
        geom.coordinates.forEach(ring => drawPolygon(ring, r));
      } else if (geom.type === "MultiPolygon") {
        geom.coordinates.forEach(poly => poly.forEach(ring => drawPolygon(ring, r)));
      }
    });
  }

  const countries = [
    { lat: 40.4,  lon: -3.7   },
    { lat: 37.0,  lon: -95.7  },
    { lat: 55.7,  lon: 37.6   },
    { lat: 35.8,  lon: 104.1  },
    { lat: 51.1,  lon: 10.4   },
    { lat: -14.2, lon: -51.9  },
    { lat: 20.5,  lon: 78.9   },
    { lat: 55.3,  lon: -3.4   },
    { lat: 46.2,  lon: 2.2    },
    { lat: 40.3,  lon: 127.5  },
    { lat: 36.2,  lon: 138.2  },
    { lat: -25.2, lon: 133.7  },
    { lat: 56.1,  lon: -106.3 },
    { lat: 23.6,  lon: -102.5 },
    { lat: 41.8,  lon: 12.5   },
    { lat: 9.0,   lon: 8.6    },
    { lat: 64.0,  lon: 26.0   },
    { lat: 60.0,  lon: 10.0   },
    { lat: 52.0,  lon: 20.0   },
    { lat: 48.0,  lon: 16.0   },
    { lat: 40.0,  lon: 22.0   },
    { lat: 39.0,  lon: 35.0   },
    { lat: 31.0,  lon: 35.0   },
    { lat: 24.0,  lon: 45.0   },
    { lat: 35.0,  lon: 51.0   },
    { lat: 33.0,  lon: 44.0   },
    { lat: 1.0,   lon: 38.0   },
    { lat: -26.0, lon: 28.0   },
    { lat: 30.0,  lon: 31.0   },
    { lat: -34.0, lon: -64.0  },
    { lat: -13.0, lon: -76.0  },
    { lat: 4.0,   lon: -74.0  },
    { lat: 14.0,  lon: 101.0  },
    { lat: 3.0,   lon: 108.0  },
    { lat: 37.0,  lon: 127.0  },
    { lat: 1.0,   lon: 104.0  },
    { lat: 48.0,  lon: 31.0   },
    { lat: 25.0,  lon: 51.0   },
    { lat: 15.0,  lon: 32.0   },
    { lat: -4.0,  lon: 15.0   },
  ];

  const attackColors = {
    ransomware: "#ff4444",
    phishing:   "#ff9900",
    malware:    "#00ff88",
    ddos:       "#00aaff"
  };
  const attackTypes = Object.keys(attackColors);
  let attacks = [];

  function generateAttack() {
    const from = countries[Math.floor(Math.random() * countries.length)];
    let to;
    do { to = countries[Math.floor(Math.random() * countries.length)]; } while (to === from);
    attacks.push({
      from, to,
      type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
      progress: 0,
      speed: 0.002 + Math.random() * 0.004
    });
  }

  for (let i = 0; i < 6000; i++) generateAttack();
  setInterval(generateAttack, 250);

  function drawGlobe() {
    const r = getR();
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clip al círculo del globo — nada sale fuera
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    // Glow interior
    const grad = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r);
    grad.addColorStop(0, "rgba(0,255,136,0.07)");
    grad.addColorStop(1, "rgba(0,10,5,0.95)");
    ctx.fillStyle = grad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

    // Grid
    for (let i = 0; i <= 100; i++) {
      const lat = -90 + 10 * i;
      ctx.beginPath();
      let first = true;
      for (let j = 0; j <= 82; j++) {
        const p = project(latLonTo3D(lat, -180 + 5 * j, r), r);
        if (!p.visible) { first = true; continue; }
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        first = false;
      }
      ctx.strokeStyle = "rgba(0,255,136,0.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
    for (let i = 0; i <= 62; i++) {
      const lon = -180 + 10 * i;
      ctx.beginPath();
      let first = true;
      for (let j = 0; j <= 62; j++) {
        const p = project(latLonTo3D(-90 + 5 * j, lon, r), r);
        if (!p.visible) { first = true; continue; }
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        first = false;
      }
      ctx.strokeStyle = "rgba(0,255,136,0.06)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Países
    drawGeoJSON(r);

    // Puntos
    countries.forEach(c => {
      const p = project(latLonTo3D(c.lat, c.lon, r), r);
      if (!p.visible) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,255,136,0.08)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,255,136,0.9)";
      ctx.fill();
    });

    // Ataques
    attacks = attacks.filter(a => a.progress <= 1);
    attacks.forEach(a => {
      a.progress += a.speed;
      const t = a.progress;
      const fp = project(latLonTo3D(a.from.lat, a.from.lon, r), r);
      const tp = project(latLonTo3D(a.to.lat, a.to.lon, r), r);
      if (!fp.visible || !tp.visible) return;
      const mx = (fp.x + tp.x) / 2;
      const my = (fp.y + tp.y) / 2 - r * 0.4;
      const x = (1-t)*(1-t)*fp.x + 2*(1-t)*t*mx + t*t*tp.x;
      const y = (1-t)*(1-t)*fp.y + 2*(1-t)*t*my + t*t*tp.y;
      const color = attackColors[a.type];

      ctx.beginPath();
      ctx.moveTo(fp.x, fp.y);
      ctx.quadraticCurveTo(mx, my, x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.7 * (1 - t * 0.3);
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    ctx.restore();

    // Borde exterior del globo
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,255,136,0.3)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function animate() {
    if (!dragging) {
      rotY += velY;
      if (Math.abs(velY) < 0.001) velY = 0.002;
    }
    drawGlobe();
    requestAnimationFrame(animate);
  }

  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
    .then(r => r.json())
    .then(topology => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js";
      script.onload = () => {
        geoData = topojson.feature(topology, topology.objects.countries);
        animate();
      };
      document.head.appendChild(script);
    })
    .catch(() => animate());


  // NOTICIAS RSS EN TIEMPO REAL
async function cargarNoticias() {
  const rssUrl = "https://feeds.feedburner.com/TheHackersNews";
  const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== "ok") throw new Error("Error RSS");

    const panel = document.getElementById("noticias-burbujas");
    panel.innerHTML = "";

    const tipos = ["ransomware", "phishing", "malware", "ddos"];
    const tiposNombre = ["Ransomware", "Phishing", "Malware", "DDoS"];

    data.items.forEach((item, i) => {
      const tipo = tipos[i % tipos.length];
      const nombre = tiposNombre[i % tiposNombre.length];
      const fecha = new Date(item.pubDate);
      const hace = tiempoRelativo(fecha);

      const burbuja = document.createElement("div");
      burbuja.className = "burbuja";
      burbuja.innerHTML = `
        <div class="burbuja-tag ${tipo}">${nombre}</div>
        <p class="burbuja-texto">${item.title}</p>
        <div class="burbuja-meta">
          <span class="burbuja-tiempo">${hace}</span>
        </div>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="burbuja-link">Leer fuente original →</a>
      `;
      panel.appendChild(burbuja);
    });

  } catch (error) {
    console.error("Error cargando noticias:", error);
    // Si falla mantiene las noticias estáticas del HTML
  }
}

const noticiasContenedor = document.getElementById("noticias-burbujas");
const NEWS_URL = "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews";

function tiempoRelativo(fecha) {
  const ahora = new Date();
  const diff = Math.floor((ahora - fecha) / 1000 / 60);
  if (diff < 60) return `hace ${diff} min`;
  if (diff < 1440) return `hace ${Math.floor(diff/60)} h`;
  return `hace ${Math.floor(diff/1440)} días`;
}

cargarNoticias();
setInterval(cargarNoticias, 300000);

async function cargarNoticiasReales() {
  if (!noticiasContenedor) return;

  try {
    const res = await fetch(NEWS_URL);
    const data = await res.json();

    noticiasContenedor.innerHTML = "";

    data.items.slice(0, 5).forEach((n) => {
      const div = document.createElement("div");
      div.className = "burbuja clickable";

      div.innerHTML = `
        <div class="burbuja-tag">The Hacker News</div>
        <p class="burbuja-texto">${n.title}</p>
        <div class="burbuja-meta">
          <span class="burbuja-tiempo">${formatearFechaNoticia(n.pubDate)}</span>
        </div>
        <a href="${n.link}" target="_blank" rel="noopener noreferrer" class="burbuja-link">Más información →</a>
      `;

      noticiasContenedor.appendChild(div);
    });
  } catch (error) {
    console.error("Error cargando noticias:", error);
  }
}

function formatearFechaNoticia(fecha) {
  const d = new Date(fecha);
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short"
  });
}

cargarNoticiasReales();
});