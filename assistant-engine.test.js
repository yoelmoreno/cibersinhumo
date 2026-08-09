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
  const context = {
    console,
    Date,
    localStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, String(value)),
      removeItem: (key) => storage.delete(key),
      clear: () => storage.clear(),
    },
    getRoadmapProgress: () => ({ completed: [] }),
    saveRoadmapProgress: () => {},
    openRoadmapRoute: () => {},
    addAssistantMessage: () => {},
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
  return { engine: context.__cshAssistantEngine, storage };
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

const sqlInjection = assertRecommendation("quiero SQL Injection pero no se que es HTTP", "topic-176", "SQL Injection concreto");
assert.strictEqual(sqlInjection.availability, "pending", "SQL Injection pendiente pero respetado");

const pentesting = decide("Se IP, router, puertos, TCP y UDP. Quiero pentesting.");
assert.notStrictEqual(pentesting.recommendedNodeId, "topic-69", "si ya sabe puertos, no repetir puertos");
assert.ok(["topic-154", "topic-155"].includes(pentesting.recommendedNodeId), "pentesting salta a siguiente paso practico");

const kaliNoNetworks = decide("He usado Kali pero no entiendo redes");
assert.ok(
  kaliNoNetworks.type === "diagnostic" || kaliNoNetworks.recommendedNodeId === "topic-53",
  "Kali sin redes no debe saltar a hacking avanzado"
);

const graph = loadAssistantEngine().engine.validateAssistantKnowledgeGraph();
assert.deepStrictEqual(Array.from(graph.duplicateIds), [], "sin ids duplicados en roadmap");
assert.deepStrictEqual(Array.from(graph.missingPrerequisites), [], "sin prerequisitos imposibles");

console.log("Assistant engine tests passed");

