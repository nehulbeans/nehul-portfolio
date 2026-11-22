import { NextResponse } from "next/server";

const username = process.env.LASTFM_USERNAME;
const apiKey = process.env.LASTFM_API_KEY;

export async function GET() {
  if (!username || !apiKey) {
    return NextResponse.json({ track: null });
  }

  try {
    const params = new URLSearchParams({
      method: "user.getrecenttracks",
      user: username,
      api_key: apiKey,
      format: "json",
      limit: "1",
    });

    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?${params}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      throw new Error(`Last.fm returned ${response.status}`);
    }

    const data = await response.json();
    const item = data.recenttracks?.track?.[0];

    if (!item) {
      return NextResponse.json({ track: null });
    }

    return NextResponse.json({
      track: {
        name: item.name,
        artist: item.artist?.["#text"] || item.artist?.name,
        album: item.album?.["#text"],
        albumImage:
          item.image?.find((image) => image.size === "extralarge")?.["#text"] ||
          item.image?.at(-1)?.["#text"] ||
          null,
        url: item.url,
        nowPlaying: item["@attr"]?.nowplaying === "true",
        playedAt: item.date
          ? Number(item.date.uts) * 1000
          : null,
      },
    });
  } catch (error) {
    console.error("Last.fm recent track error:", error);
    return NextResponse.json({ track: null }, { status: 500 });
  }
}
