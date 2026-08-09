const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";
const MIN_VISIBLE_SUBSCRIBERS = 97;

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const handle = (process.env.YOUTUBE_CHANNEL_HANDLE || "@cibersinhumo").replace(/^@/, "");

  if (!key) {
    return res.status(200).json({ configured: false, reason: "missing_api_key" });
  }

  try {
    let resolvedChannelId = channelId;
    let channelData = null;

    if (resolvedChannelId) {
      const channelUrl = `${YOUTUBE_API}/channels?part=snippet,statistics&id=${encodeURIComponent(resolvedChannelId)}&key=${encodeURIComponent(key)}`;
      const channelResponse = await fetch(channelUrl);
      const channelJson = await channelResponse.json();
      channelData = channelJson.items?.[0] || null;
    } else {
      const handleUrl = `${YOUTUBE_API}/channels?part=snippet,statistics&forHandle=${encodeURIComponent(handle)}&key=${encodeURIComponent(key)}`;
      const handleResponse = await fetch(handleUrl);
      const handleJson = await handleResponse.json();
      channelData = handleJson.items?.[0] || null;
      resolvedChannelId = channelData?.id;
    }

    if (!channelData || !resolvedChannelId) {
      return res.status(200).json({ configured: false, reason: "channel_not_found" });
    }

    const videosUrl = `${YOUTUBE_API}/search?part=snippet&channelId=${encodeURIComponent(resolvedChannelId)}&order=date&maxResults=12&type=video&key=${encodeURIComponent(key)}`;
    const videosResponse = await fetch(videosUrl);
    const videosJson = await videosResponse.json();
    const allVideos = (videosJson.items || []).map((item) => ({
      id: item.id?.videoId,
      title: item.snippet?.title || "Vídeo de Ciber Sin Humo",
      url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || null
    })).filter((video) => video.id && video.url && !video.url.endsWith("undefined"));

    const normalizeTitle = (value) => String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const addCategory = (video) => {
      const title = normalizeTitle(video.title);
      if (title.includes("sombrero")) return { ...video, category: "Roles en ciber", title: "Sombreros en ciberseguridad: quien ataca, quien defiende y quien aprende" };
      if (title.includes("osint") || title.includes("metadato")) return { ...video, category: "OSINT" };
      if (title.includes("virus") || title.includes("contrasena") || title.includes("contrasenas")) return { ...video, category: "Otros" };
      if (title.includes("cookie")) return { ...video, category: "Cookies" };
      if (title.includes("qr") || title.includes("qrishing")) return { ...video, category: "QR Phishing" };
      if (title.includes("puerto")) return { ...video, category: "Puertos" };
      return { ...video, category: "YouTube" };
    };

    const latestVideos = allVideos.slice(0, 3).map(addCategory);

    const featuredComments = [];
    for (const video of latestVideos.slice(0, 3)) {
      if (featuredComments.length >= 3) break;
      const commentsUrl = `${YOUTUBE_API}/commentThreads?part=snippet&videoId=${encodeURIComponent(video.id)}&maxResults=2&order=relevance&textFormat=plainText&key=${encodeURIComponent(key)}`;
      const commentsResponse = await fetch(commentsUrl);
      if (!commentsResponse.ok) continue;
      const commentsJson = await commentsResponse.json();
      for (const item of commentsJson.items || []) {
        const top = item.snippet?.topLevelComment?.snippet;
        if (!top?.textOriginal || !top?.authorDisplayName) continue;
        featuredComments.push({
          author: top.authorDisplayName,
          text: top.textOriginal.slice(0, 180),
          videoUrl: video.url
        });
        if (featuredComments.length >= 3) break;
      }
    }

    const subscriberCount = Number(channelData.statistics?.subscriberCount || 0);

    return res.status(200).json({
      configured: true,
      title: channelData.snippet?.title || "Ciber Sin Humo",
      subscribers: Math.max(subscriberCount, MIN_VISIBLE_SUBSCRIBERS),
      videos: channelData.statistics?.videoCount || null,
      views: channelData.statistics?.viewCount || null,
      latestVideos,
      featuredComments
    });
  } catch (error) {
    return res.status(200).json({ configured: false, reason: "request_failed" });
  }
};
