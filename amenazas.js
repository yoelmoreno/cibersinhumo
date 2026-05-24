window.addEventListener("load", () => {
  const canvas = document.getElementById("globo");
  const ctx = canvas.getContext("2d");
  const wrapper = canvas.parentElement;
  const noticiasContenedor = document.getElementById("noticias-burbujas");
  const activityCount = document.getElementById("activity-count");
  const threatSource = document.getElementById("threat-source");

  const feedSources = [
    { name: "The Hacker News", rss: "https://feeds.feedburner.com/TheHackersNews" },
    { name: "BleepingComputer", rss: "https://www.bleepingcomputer.com/feed/" },
    { name: "KrebsOnSecurity", rss: "https://krebsonsecurity.com/feed/" },
    { name: "SecurityWeek", rss: "https://www.securityweek.com/feed/" }
  ];

  const isMobile = () => window.matchMedia("(max-width: 700px)").matches;

  function resize() {
    const dpr = isMobile() ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(wrapper.clientWidth * dpr);
    canvas.height = Math.floor(wrapper.clientHeight * dpr);
    canvas.style.width = `${wrapper.clientWidth}px`;
    canvas.style.height = `${wrapper.clientHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const width = () => wrapper.clientWidth;
  const height = () => wrapper.clientHeight;
  const getR = () => Math.min(width(), height()) * 0.41;
  let rotX = -0.12;
  let rotY = 0.45;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let velY = 0.0015;
  let geoData = null;
  let attacks = [];
  let newsEvents = [];
  let liveIndex = 0;

  const locations = [
    { name: "España", lat: 40.4, lon: -3.7, aliases: ["spain", "spanish", "españa"] },
    { name: "EE. UU.", lat: 37.0, lon: -95.7, aliases: ["u.s.", "us ", "usa", "america", "american", "united states"] },
    { name: "Reino Unido", lat: 55.3, lon: -3.4, aliases: ["uk", "britain", "british", "united kingdom"] },
    { name: "Alemania", lat: 51.1, lon: 10.4, aliases: ["germany", "german"] },
    { name: "Francia", lat: 46.2, lon: 2.2, aliases: ["france", "french"] },
    { name: "Italia", lat: 41.8, lon: 12.5, aliases: ["italy", "italian"] },
    { name: "Rusia", lat: 55.7, lon: 37.6, aliases: ["russia", "russian"] },
    { name: "China", lat: 35.8, lon: 104.1, aliases: ["china", "chinese"] },
    { name: "Japón", lat: 36.2, lon: 138.2, aliases: ["japan", "japanese"] },
    { name: "Corea", lat: 37.0, lon: 127.0, aliases: ["korea", "korean"] },
    { name: "India", lat: 20.5, lon: 78.9, aliases: ["india", "indian"] },
    { name: "Brasil", lat: -14.2, lon: -51.9, aliases: ["brazil", "brazilian"] },
    { name: "México", lat: 23.6, lon: -102.5, aliases: ["mexico", "mexican"] },
    { name: "Canadá", lat: 56.1, lon: -106.3, aliases: ["canada", "canadian"] },
    { name: "Australia", lat: -25.2, lon: 133.7, aliases: ["australia", "australian"] },
    { name: "Singapur", lat: 1.0, lon: 104.0, aliases: ["singapore"] },
    { name: "Irán", lat: 35.0, lon: 51.0, aliases: ["iran", "iranian"] },
    { name: "Ucrania", lat: 48.0, lon: 31.0, aliases: ["ukraine", "ukrainian"] },
    { name: "Oriente Medio", lat: 25.0, lon: 45.0, aliases: ["middle east", "saudi", "qatar", "uae"] },
    { name: "África", lat: 1.0, lon: 20.0, aliases: ["africa", "african"] }
  ];

  const attackColors = {
    ransomware: "#ff4444",
    phishing: "#ff9900",
    spyware: "#b6ff00",
    malware: "#00ff88",
    ddos: "#00aaff",
    exploit: "#b56cff"
  };

  const attackLabels = {
    ransomware: "Ransomware",
    phishing: "Phishing",
    spyware: "Spyware",
    malware: "Malware",
    ddos: "DDoS",
    exploit: "Exploit"
  };

  function latLonTo3D(lat, lon, r) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;
    return {
      x: -r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.cos(phi),
      z: r * Math.sin(phi) * Math.sin(theta)
    };
  }

  function project(p) {
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = p.x * cosY - p.z * sinY;
    const z1 = p.x * sinY + p.z * cosY;
    const y2 = p.y * cosX + z1 * sinX;
    const z2 = -p.y * sinX + z1 * cosX;
    return {
      x: width() / 2 + x1,
      y: height() / 2 - y2,
      z: z2,
      visible: z2 > -getR() * 0.08
    };
  }

  function drawPolygon(coords, r) {
    ctx.beginPath();
    let started = false;
    coords.forEach((coord) => {
      const p = project(latLonTo3D(coord[1], coord[0], r * 1.002));
      if (!p.visible) {
        started = false;
        return;
      }
      if (!started) {
        ctx.moveTo(p.x, p.y);
        started = true;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    });
    ctx.strokeStyle = "rgba(0,255,136,0.28)";
    ctx.lineWidth = 0.55;
    ctx.stroke();
    ctx.fillStyle = "rgba(0,255,136,0.025)";
    ctx.fill();
  }

  function drawGeoJSON(r) {
    if (!geoData) return;
    geoData.features.forEach((feature) => {
      const geom = feature.geometry;
      if (!geom) return;
      if (geom.type === "Polygon") {
        geom.coordinates.forEach((ring) => drawPolygon(ring, r));
      } else if (geom.type === "MultiPolygon") {
        geom.coordinates.forEach((poly) => poly.forEach((ring) => drawPolygon(ring, r)));
      }
    });
  }

  function classifyThreat(text) {
    const value = text.toLowerCase();
    if (/ransom|encrypt|extortion/.test(value)) return "ransomware";
    if (/phish|credential|login|scam/.test(value)) return "phishing";
    if (/spy|camera|keylog|surveillance|stalker/.test(value)) return "spyware";
    if (/ddos|botnet|traffic flood/.test(value)) return "ddos";
    if (/zero-day|0-day|vulnerability|exploit|cve|patch/.test(value)) return "exploit";
    return "malware";
  }

  function inferLocation(text, fallbackIndex = 0) {
    const value = text.toLowerCase();
    const match = locations.find((loc) => loc.aliases.some((alias) => value.includes(alias)));
    return match || locations[fallbackIndex % locations.length];
  }

  function createAttack(event = null, initialProgress = 0) {
    const type = event ? event.type : Object.keys(attackColors)[Math.floor(Math.random() * Object.keys(attackColors).length)];
    const from = event ? event.from : locations[Math.floor(Math.random() * locations.length)];
    let to = event ? event.to : locations[Math.floor(Math.random() * locations.length)];
    if (from === to) {
      to = locations[(locations.indexOf(from) + 5) % locations.length];
    }
    const mobileBoost = isMobile() ? 2.7 : 1;
    attacks.push({
      from,
      to,
      type,
      progress: initialProgress,
      speed: (0.003 + Math.random() * 0.003) * mobileBoost,
      pulse: 0.6 + Math.random() * 0.8
    });
    const maxAttacks = isMobile() ? 42 : 56;
    if (attacks.length > maxAttacks) {
      attacks.splice(0, attacks.length - maxAttacks);
    }
  }

  function seedDemoTraffic() {
    const count = isMobile() ? 36 : 38;
    for (let i = 0; i < count; i++) {
      createAttack(null, Math.random() * (isMobile() ? 0.92 : 0.74));
    }
  }

  function drawGrid(r) {
    for (let lat = -80; lat <= 80; lat += 10) {
      ctx.beginPath();
      let first = true;
      for (let lon = -180; lon <= 180; lon += 4) {
        const p = project(latLonTo3D(lat, lon, r));
        if (!p.visible) {
          first = true;
          continue;
        }
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        first = false;
      }
      ctx.strokeStyle = lat === 0 ? "rgba(0,255,136,0.16)" : "rgba(0,255,136,0.055)";
      ctx.lineWidth = lat === 0 ? 0.9 : 0.45;
      ctx.stroke();
    }

    for (let lon = -180; lon <= 180; lon += 15) {
      ctx.beginPath();
      let first = true;
      for (let lat = -85; lat <= 85; lat += 4) {
        const p = project(latLonTo3D(lat, lon, r));
        if (!p.visible) {
          first = true;
          continue;
        }
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        first = false;
      }
      ctx.strokeStyle = "rgba(0,255,136,0.05)";
      ctx.lineWidth = 0.45;
      ctx.stroke();
    }
  }

  function drawAttack(a, r) {
    a.progress += a.speed;
    const t = Math.min(a.progress, 1);
    const fp = project(latLonTo3D(a.from.lat, a.from.lon, r));
    const tp = project(latLonTo3D(a.to.lat, a.to.lon, r));
    if (!fp.visible && !tp.visible) return;

    const color = attackColors[a.type] || attackColors.malware;
    const mx = (fp.x + tp.x) / 2;
    const my = (fp.y + tp.y) / 2 - r * (0.22 + a.pulse * 0.12);
    const x = (1 - t) * (1 - t) * fp.x + 2 * (1 - t) * t * mx + t * t * tp.x;
    const y = (1 - t) * (1 - t) * fp.y + 2 * (1 - t) * t * my + t * t * tp.y;

    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(fp.x, fp.y);
    ctx.quadraticCurveTo(mx, my, x, y);
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.72 * (1 - t * 0.25);
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 3.4 + Math.sin(t * Math.PI) * 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.95;
    ctx.fill();

    if (t > 0.82) {
      ctx.beginPath();
      ctx.arc(tp.x, tp.y, 8 + (t - 0.82) * 42, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = Math.max(0, 1 - t) * 4;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawGlobe() {
    const r = getR();
    const cx = width() / 2;
    const cy = height() / 2;
    ctx.clearRect(0, 0, width(), height());

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    const grad = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, r * 0.1, cx, cy, r);
    grad.addColorStop(0, "rgba(0,255,136,0.13)");
    grad.addColorStop(0.48, "rgba(0,60,34,0.15)");
    grad.addColorStop(1, "rgba(0,8,5,0.98)");
    ctx.fillStyle = grad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

    drawGrid(r);
    drawGeoJSON(r);

    locations.forEach((loc) => {
      const p = project(latLonTo3D(loc.lat, loc.lon, r));
      if (!p.visible) return;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,255,136,0.08)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,255,136,0.9)";
      ctx.fill();
    });

    attacks = attacks.filter((a) => a.progress <= 1);
    attacks.forEach((a) => drawAttack(a, r));
    ctx.restore();

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0,255,136,0.42)";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "rgba(0,255,136,0.45)";
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function animate() {
    if (!dragging) {
      rotY += velY;
      if (Math.abs(velY) < 0.001) velY = 0.0015;
    }
    drawGlobe();
    requestAnimationFrame(animate);
  }

  function pointerStart(x, y) {
    dragging = true;
    lastX = x;
    lastY = y;
    velY = 0;
  }

  function pointerMove(x, y) {
    if (!dragging) return;
    velY = (x - lastX) * 0.005;
    rotY += velY;
    rotX += (y - lastY) * 0.005;
    rotX = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotX));
    lastX = x;
    lastY = y;
  }

  canvas.addEventListener("pointerdown", (e) => {
    pointerStart(e.clientX, e.clientY);
    canvas.setPointerCapture?.(e.pointerId);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    e.preventDefault();
    pointerMove(e.clientX, e.clientY);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    canvas.addEventListener(eventName, (e) => {
      dragging = false;
      if (e && canvas.hasPointerCapture?.(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    });
  });
  canvas.addEventListener("touchstart", (e) => {
    if (!e.touches.length) return;
    e.preventDefault();
    pointerStart(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });
  canvas.addEventListener("touchmove", (e) => {
    if (!e.touches.length) return;
    e.preventDefault();
    pointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });
  canvas.addEventListener("touchend", () => dragging = false);
  canvas.addEventListener("touchcancel", () => dragging = false);

  function tiempoRelativo(fecha) {
    const ahora = new Date();
    const diff = Math.floor((ahora - fecha) / 1000 / 60);
    if (diff < 60) return `hace ${Math.max(diff, 1)} min`;
    if (diff < 1440) return `hace ${Math.floor(diff / 60)} h`;
    return `hace ${Math.floor(diff / 1440)} días`;
  }

  function formatearFechaNoticia(fecha) {
    return new Date(fecha).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  }

  function normalizeFeedItem(item, sourceName) {
    return {
      title: item.title || "Amenaza detectada en fuente abierta",
      link: item.link || "#",
      pubDate: item.pubDate || item.published || item.created || new Date().toISOString(),
      source: sourceName
    };
  }

  async function fetchFeed(source) {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.rss)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!Array.isArray(data.items)) return [];
    return data.items.slice(0, 8).map((item) => normalizeFeedItem(item, source.name));
  }

  function mergeFeedItems(feedGroups) {
    const seen = new Set();
    return feedGroups
      .flat()
      .filter((item) => {
        const key = item.title.toLowerCase().replace(/\s+/g, " ").trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  }

  function renderNews(items) {
    if (!noticiasContenedor) return;
    noticiasContenedor.innerHTML = "";
    items.slice(0, 9).forEach((item, index) => {
      const type = classifyThreat(item.title);
      const location = inferLocation(item.title, index);
      const div = document.createElement("div");
      div.className = "burbuja clickable";
      div.innerHTML = `
        <div class="burbuja-tag ${type}">${attackLabels[type]}</div>
        <p class="burbuja-texto">${item.title}</p>
        <div class="burbuja-meta">
          <span class="burbuja-pais">${item.source || location.name}</span>
          <span class="burbuja-tiempo">${item.pubDate ? tiempoRelativo(new Date(item.pubDate)) : formatearFechaNoticia(new Date())}</span>
        </div>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="burbuja-link">Fuente original →</a>
      `;
      noticiasContenedor.appendChild(div);
    });
  }

  async function loadThreatFeed() {
    if (threatSource) threatSource.textContent = "conectando fuentes...";
    try {
      const feedGroups = await Promise.allSettled(feedSources.map(fetchFeed));
      const items = mergeFeedItems(feedGroups
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value)
      );
      if (!items.length) throw new Error("Feed vacío");

      newsEvents = items.slice(0, 24).map((item, index) => {
        const type = classifyThreat(item.title);
        const to = inferLocation(item.title, index);
        const from = locations[(index * 5 + 3) % locations.length];
        return { type, from, to, title: item.title, link: item.link, source: item.source };
      });

      renderNews(items);
      if (activityCount) activityCount.textContent = String(newsEvents.length);
      if (threatSource) threatSource.textContent = `${feedSources.length} fuentes abiertas + visualización estimada`;
      newsEvents.slice(0, 12).forEach((event) => createAttack(event));
    } catch (error) {
      console.error("Error cargando feed de amenazas:", error);
      if (threatSource) threatSource.textContent = "modo visual estimado";
      if (activityCount) activityCount.textContent = "sim";
      if (noticiasContenedor) {
        renderNews([
          { title: "Campañas recientes de malware y phishing detectadas en fuentes abiertas", link: "https://thehackernews.com", pubDate: new Date().toISOString(), source: "The Hacker News" },
          { title: "Explotación de vulnerabilidades críticas sigue siendo una vía común de ataque", link: "https://www.securityweek.com", pubDate: new Date().toISOString(), source: "SecurityWeek" }
        ]);
      }
    }
  }

  seedDemoTraffic();
  setInterval(() => {
    if (newsEvents.length) {
      createAttack(newsEvents[liveIndex % newsEvents.length]);
      liveIndex += 1;
    } else {
      createAttack();
    }
  }, isMobile() ? 260 : 700);

  fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
    .then((r) => r.json())
    .then((topology) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js";
      script.onload = () => {
        geoData = topojson.feature(topology, topology.objects.countries);
      };
      document.head.appendChild(script);
    })
    .catch((error) => console.error("Error cargando mapa:", error));

  animate();
  if (isMobile()) {
    setTimeout(loadThreatFeed, 1800);
  } else {
    loadThreatFeed();
  }
  setInterval(loadThreatFeed, 300000);
});
