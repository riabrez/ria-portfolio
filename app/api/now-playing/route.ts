import { NextResponse } from "next/server";

export async function GET() {
  const user = process.env.LASTFM_USER;
  const key = process.env.LASTFM_API_KEY;

  if (!user || !key) {
    return NextResponse.json({ error: "Missing env vars", now: null, recent: [] });
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      user
    )}&api_key=${key}&format=json&limit=4`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data?.error) {
      return NextResponse.json({
        error: `Last.fm returned ${res.status} ${data?.message ?? ""}`.trim(),
        now: null,
        recent: [],
      });
    }

    const tracks = data?.recenttracks?.track ?? [];
    if (!tracks.length) {
      return NextResponse.json({ now: null, recent: [] });
    }

    const [first, ...rest] = tracks;
    const nowPlaying = first?.["@attr"]?.nowplaying === "true" ? {
      playing: true,
      title: first.name,
      artist: first.artist?.["#text"] ?? "",
      image: first.image?.[first.image.length - 1]?.["#text"],
      url: first.url,
    } : null;

    const recent = (nowPlaying ? rest : tracks).map((t: { name: any; artist: { [x: string]: any; }; image: string | any[]; url: any; }) => ({
      title: t.name,
      artist: t.artist?.["#text"] ?? "",
      image: t.image?.[t.image.length - 1]?.["#text"],
      url: t.url,
    }));

    return NextResponse.json({ now: nowPlaying, recent });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Fetch failed", now: null, recent: [] });
  }
}
