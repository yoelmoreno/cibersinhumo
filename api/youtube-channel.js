const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");

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

    const videosUrl = `${YOUTUBE_API}/search?part=snippet&channelId=${encodeURIComponent(resolvedChannelId)}&order=date&maxResults=3&type=video&key=${encodeURIComponent(key)}`;
    const videosResponse = await fetch(videosUrl);
    const videosJson = await videosResponse.json();
    const latestVideos = (videosJson.items || []).map((item) => ({
      id: item.id?.videoId,
      title: item.snippet?.title || "Vídeo de Ciber Sin Humo",
      url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      thumbnail: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || null
    })).filter((video) => video.id && video.url && !video.url.endsWith("undefined"));

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

    return res.status(200).json({
      configured: true,
      title: channelData.snippet?.title || "Ciber Sin Humo",
      subscribers: channelData.statistics?.subscriberCount || null,
      videos: channelData.statistics?.videoCount || null,
      views: channelData.statistics?.viewCount || null,
      latestVideos,
      featuredComments
    });
  } catch (error) {
    return res.status(200).json({ configured: false, reason: "request_failed" });
  }
};
