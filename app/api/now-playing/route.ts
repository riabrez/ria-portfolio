import { NextResponse } from "next/server";

const USER = "hyoseop"; 
const API_KEY = process.env.LASTFM_API_KEY; 

export async function GET() {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=1`,
    { next: { revalidate: 30 } } 
  );

  const data = await res.json();
  const track = data?.recenttracks?.track?.[0];

  if (!track) {
    return NextResponse.json({ playing: false });
  }

  return NextResponse.json({
    playing: track["@attr"]?.nowplaying === "true",
    title: track.name,
    artist: track.artist["#text"],
    album: track.album["#text"],
    image: track.image?.pop()?.["#text"],
    url: track.url,
  });
}
