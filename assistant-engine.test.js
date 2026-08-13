const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

function loadAssistantEngine() {
  const src = fs.readFileSync("script.js", "utf8");
  const roadmapStart = src.indexOf("const roadmapRoutes = [");
  const roadmapEnd = src.indexOf("const roadmapRoutesContainer");
  const assistantStart = src.indexOf("const assistantKnowledgeState");
  const assistantEnd = src.indexOf("function escapeAssistantHtml");

  if (roadmapStart < 0 || roadmapEnd < 0 || assistantStart < 0 || assistantEnd < 0) {
    throw new Error("No se pudieron localizar los bloques del roadmap/asistente en script.js");
  }

  const storage = new Map();
  const progress = { completed: [] };
  const context = {
    console,
    Date,
    window: {
      setTimeout: (fn) => fn(),
    },
    escapeAssistantHtml: (value) => String(value || "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char])),
    localStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key),
      clear: () => storage.clear(),
    },
    getRoadmapProgress: () => ({ ...progress, completed: [...(progress.completed || [])] }),
    saveRoadmapProgress: (next) => Object.assign(progress, next, { completed: [...(next.completed || [])] }),
    openRoadmapRoute: () => {},
    addAssistantMessage: (content, type = "bot") => context.__messages.push({ content, type }),
    __messages: [],
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(
    src.slice(roadmapStart, roadmapEnd) +
      `\nfunction allRoadmapTopics() { return roadmapRoutes.flatMap((route) => route.topics.map((topic, index) => ({ ...topic, routeId: route.id, routeTitle: route.title, routeDescription: route.description, index }))); }\n` +
      `function normalizeRoadmapText(value) { return (value || "").toString().toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, ""); }\n` +
      src.slice(assistantStart, assistantEnd),
    context
  );
  return { engine: context.__cshAssistantEngine, storage, progress, messages: context.__messages };
}

function assistantFunctionDuplicates() {
  const src = fs.readFileSync("script.js", "utf8");
  const assistantStart = src.indexOf("const assistantKnowledgeState");
  const assistantEnd = src.indexOf("function escapeAssistantHtml");
  const assistantSrc = src.slice(assistantStart, assistantEnd);
  const re = /^\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/gm;
  const seen = new Map();
  let match;
  while ((match = re.exec(assistantSrc))) {
    if (!seen.has(match[1])) seen.set(match[1], 0);
    seen.set(match[1], seen.get(match[1]) + 1);
  }
  return [...seen.entries()].filter(([, count]) => count > 1).map(([name]) => name);
}

function decide(input, profile = {}) {
  const { engine, storage } = loadAssistantEngine();
  storage.clear();
  return engine.makeAssistantDecision(input, { profile });
}

function assertRecommendation(input, expectedTopicId, message) {
  const decision = decide(input);
  assert.strictEqual(decision.type, "recommendation", `${message}: debe recomendar`);
  assert.strictEqual(decision.recommendedNodeId, expectedTopicId, `${message}: tema recomendado`);
  return decision;
}

assert.strictEqual(decide("hola").type, "smalltalk", "saludo simple");
assertRecommendation("No se absolutamente nada de ciber", "topic-1", "principiante absoluto");
assertRecommendation("quiero aprender phishing", "topic-122", "phishing directo");
assertRecommendation("Quiero aprender puertos", "topic-69", "puertos directo");
assertRecommendation("quiero aprender sobre maquinas virtuales", "topic-41", "maquinas virtuales directo");

const sqlInjection = assertRecommendation("quiero SQL Injection pero no se que es HTTP", "topic-92", "SQL Injection exige base HTTP");
assert.strictEqual(sqlInjection.reason, "first_unsatisfied_prerequisite", "SQL Injection respeta prerequisitos explícitos");

const vpnAnswer = decide("explícame qué es una VPN");
assert.strictEqual(vpnAnswer.type, "concept_answer", "VPN responde concepto antes de mandar a ruta");
assert.strictEqual(vpnAnswer.recommendedNodeId, "topic-80", "VPN mantiene enlace al punto correcto");

const pentesting = decide("Se IP, router, puertos, TCP y UDP. Quiero pentesting.");
assert.notStrictEqual(pentesting.recommendedNodeId, "topic-69", "si ya sabe puertos, no repetir puertos");
assert.ok(["topic-154", "topic-155"].includes(pentesting.recommendedNodeId), "pentesting salta a siguiente paso practico");

const kaliNoNetworks = decide("He usado Kali pero no entiendo redes");
assert.ok(
  kaliNoNetworks.type === "diagnostic" || kaliNoNetworks.recommendedNodeId === "topic-53",
  "Kali sin redes no debe saltar a hacking avanzado"
);

const phishing = decide("quiero aprender phishing");
assert.strictEqual(phishing.recommendedNodeId, "topic-122", "phishing nunca debe caer a hardware por defecto");

const noNmapEngine = loadAssistantEngine().engine;
const noNmapIntent = noNmapEngine.parseAssistantIntent("No quiero Nmap todavia, quiero aprender redes");
const noNmapYet = noNmapEngine.makeAssistantDecision("No quiero Nmap todavia, quiero aprender redes");
assert.notStrictEqual(noNmapIntent.goal, "pentesting", "negación de Nmap no debe activar pentesting");
assert.ok(["topic-1", "topic-53"].includes(noNmapYet.recommendedNodeId), "redes sin base clara cae en base o redes, no en herramienta");

const linuxIntent = decide("He usado Kali pero quiero aprender Linux");
assert.strictEqual(linuxIntent.recommendedNodeId, "topic-26", "Kali con objetivo Linux va a Linux, no a redes o hardware");

const httpEngine = loadAssistantEngine().engine;
const httpIntent = httpEngine.parseAssistantIntent("Quiero hacking web, pero antes necesito aprender HTTP");
const httpBeforeWeb = httpEngine.makeAssistantDecision("Quiero hacking web, pero antes necesito aprender HTTP");
assert.strictEqual(httpBeforeWeb.recommendedNodeId, "topic-92", "objetivo inmediato HTTP antes de hacking web");
assert.strictEqual(httpIntent.finalGoal, "web_hacking", "mantiene hacking web como objetivo final");

const typoPentesting = loadAssistantEngine().engine.parseAssistantIntent("quiero aprnder pentestin y de linuz se poco");
assert.strictEqual(typoPentesting.goal, "pentesting", "corrige typos de aprender/pentesting/linux");

const defenseInstead = loadAssistantEngine().engine.parseAssistantIntent("Realmente no quiero hacking web, prefiero defensa");
assert.strictEqual(defenseInstead.goal, "defense", "contraste y negación priorizan defensa");

{
  const { engine, progress, messages } = loadAssistantEngine();
  progress.recommendedTopicId = "topic-1";
  const same = engine.makeAssistantDecision("por donde sigo");
  assert.strictEqual(same.recommendedNodeId, "topic-1", "continuar mantiene recomendación pendiente");
}

{
  const { engine, progress, messages } = loadAssistantEngine();
  const profile = engine.applyAssistantChecklistSelection("networking", ["ip", "router", "ports"]);
  assert.strictEqual(engine.getAssistantConceptState(profile, "ip"), "known", "checklist marca múltiples conocidos");
  assert.strictEqual(engine.getAssistantConceptState(profile, "dns"), "unknown", "checklist deja como desconocidos los no seleccionados");
  progress.completed = ["topic-1"];
  const migrated = engine.loadAssistantProfile();
  const next = engine.makeAssistantDecision("por donde sigo", { profile: migrated });
  assert.notStrictEqual(next.recommendedNodeId, "topic-1", "un tema completado no se recomienda otra vez al continuar");
}

{
  const { engine } = loadAssistantEngine();
  const profile = {};
  engine.updateProfileFromText(profile, "Sé IP y DNS pero no puertos");
  assert.ok(engine.getAssistantConceptMastery(profile, "ip") >= 62, "IP queda como conocida");
  assert.ok(engine.getAssistantConceptMastery(profile, "dns") >= 62, "DNS queda como conocida");
  assert.strictEqual(engine.getAssistantConceptState(profile, "ports"), "unknown", "puertos queda como desconocido");
}

{
  const { engine } = loadAssistantEngine();
  const profile = engine.applyAssistantChecklistSelection("networking", { ip: "known", dns: "uncertain", ports: "unknown", tcp_udp: "confident" });
  assert.strictEqual(engine.getAssistantConceptState(profile, "ip"), "known", "checklist por nivel marca conocido");
  assert.strictEqual(engine.getAssistantConceptState(profile, "dns"), "uncertain", "checklist por nivel marca me suena");
  assert.strictEqual(engine.getAssistantConceptState(profile, "ports"), "unknown", "checklist por nivel marca no");
  assert.strictEqual(engine.getAssistantConceptState(profile, "tcp_udp"), "confident", "checklist por nivel marca lo uso");
}

const graph = loadAssistantEngine().engine.validateAssistantKnowledgeGraph();
assert.deepStrictEqual(Array.from(graph.duplicateIds), [], "sin ids duplicados en roadmap");
assert.deepStrictEqual(Array.from(graph.missingPrerequisites), [], "sin prerequisitos imposibles");
assert.deepStrictEqual(assistantFunctionDuplicates(), [], "sin funciones duplicadas dentro del asistente");

{
  const { engine, progress } = loadAssistantEngine();
  const first = engine.makeAssistantDecision("No se absolutamente nada de ciber");
  const button = {
    textContent: "Esto ya me lo sé",
    disabled: false,
    dataset: { assistantAction: "known" },
    setAttribute(name, value) { this[name] = value; },
  };
  engine.handleAssistantCorrectionAction("known", button);
  assert.strictEqual(button.disabled, false, "el botón se recupera tras marcar conocido");
  assert.strictEqual(progress.completed.filter((id) => id === first.recommendedNodeId).length, 1, "topic completado una sola vez");
  assert.notStrictEqual(progress.recommendedTopicId, first.recommendedNodeId, "no recomienda el mismo topic tras marcar conocido");
  const profile = engine.loadAssistantProfile();
  assert.ok(engine.getAssistantConceptMastery(profile, "computer_basics") >= 88, "mastery actualizado por progreso");
}

{
  const { engine, progress } = loadAssistantEngine();
  engine.makeAssistantDecision("No se absolutamente nada de ciber");
  const button = {
    textContent: "Esto ya me lo sé",
    disabled: false,
    dataset: { assistantAction: "known" },
    setAttribute(name, value) { this[name] = value; },
  };
  engine.handleAssistantCorrectionAction("known", button);
  engine.handleAssistantCorrectionAction("known", button);
  assert.strictEqual(progress.completed.filter((id) => id === "topic-1").length, 1, "doble click no duplica completed");
}

{
  const { engine, progress, messages } = loadAssistantEngine();
  progress.recommendedTopicId = "topic-1";
  progress.recommendedRouteId = "route-zero";
  const button = {
    textContent: "Esto ya me lo sé",
    disabled: false,
    dataset: { assistantAction: "known" },
    setAttribute(name, value) { this[name] = value; },
  };
  engine.handleAssistantCorrectionAction("known", button);
  assert.strictEqual(progress.completed.filter((id) => id === "topic-1").length, 1, "tras refresh reconstruye y completa la recomendación");
  assert.notStrictEqual(progress.recommendedTopicId, "topic-1", "tras refresh avanza a un siguiente paso válido");
  assert.ok(
    !messages.some((message) => /No he podido procesar esa accion|No he podido procesar esa acción|No he podido actualizar/.test(message.content)),
    "known no debe mostrar error generico al avanzar"
  );
}

console.log("Assistant engine tests passed");

