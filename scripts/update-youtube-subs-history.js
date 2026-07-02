const fs = require("fs");
const path = require("path");

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";
const root = path.resolve(__dirname, "..");
const historyPath = path.join(root, "data", "youtube-subs-history.json");

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function readHistory() {
  if (!fs.existsSync(historyPath)) {
    return { updatedAt: new Date().toISOString(), points: [] };
  }
  return JSON.parse(fs.readFileSync(historyPath, "utf8"));
}

function writeHistory(history) {
  fs.mkdirSync(path.dirname(historyPath), { recursive: true });
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2) + "\n", "utf8");
}

async function fetchChannelStats() {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const handle = (process.env.YOUTUBE_CHANNEL_HANDLE || "@cibersinhumo").replace(/^@/, "");

  if (!key) throw new Error("Missing YOUTUBE_API_KEY");

  const params = channelId
    ? `id=${encodeURIComponent(channelId)}`
    : `forHandle=${encodeURIComponent(handle)}`;
  const url = `${YOUTUBE_API}/channels?part=statistics&${params}&key=${encodeURIComponent(key)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`YouTube API error ${response.status}`);
  const data = await response.json();
  const item = data.items && data.items[0];
  const subscribers = Number(item && item.statistics && item.statistics.subscriberCount);
  if (!Number.isFinite(subscribers)) throw new Error("Subscriber count not found");
  return subscribers;
}

async function main() {
  const subscribers = await fetchChannelStats();
  const date = todayIsoDate();
  const history = readHistory();
  const points = Array.isArray(history.points) ? history.points : [];
  const existing = points.find((point) => point.date === date);

  if (existing) {
    existing.subscribers = subscribers;
    existing.source = "youtube";
  } else {
    points.push({ date, subscribers, source: "youtube" });
  }

  points.sort((a, b) => a.date.localeCompare(b.date));
  history.updatedAt = new Date().toISOString();
  history.points = points.slice(-370);
  writeHistory(history);
  console.log(`Saved ${subscribers} subscribers for ${date}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
