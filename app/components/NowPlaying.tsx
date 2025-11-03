"use client";

import { useEffect, useState } from "react";

type Track = {
  playing?: boolean;
  title?: string;
  artist?: string;
  image?: string;
  url?: string;
};

type ApiData =
  | Track
  | {
      now?: Track | null;
      recent?: Track[];
      error?: string;
    };

function isSingleTrack(data: ApiData): data is Track {
  return typeof (data as Track).playing === "boolean";
}

export default function NowPlaying() {
  const [data, setData] = useState<ApiData | null>(null);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/now-playing");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setData({
          now: null,
          recent: [],
          error: "could not reach /api/now-playing",
        });
      }
    }

    fetchTrack();
    const id = setInterval(fetchTrack, 30000);
    return () => clearInterval(id);
  }, []);

  // loading
  if (!data) {
    return <p className="text-sm text-[#9ca3af]">loading…</p>;
  }

  // api error
  if (!isSingleTrack(data) && data.error) {
    return (
      <p className="text-xs text-red-400/90 bg-red-500/10 border border-red-500/30 rounded-md p-2">
        {data.error}
      </p>
    );
  }

  // old shape
  if (isSingleTrack(data)) {
    if (!data.playing) {
      return <p className="text-sm text-[#9ca3af]">nothing playing 💭</p>;
    }

    return (
      <a
        href={data.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-sm text-white hover:underline"
      >
        {data.image && (
          <img
            src={data.image}
            alt={data.title ?? "album"}
            className="w-10 h-10 rounded-md border border-[#2a2a2a] object-cover"
          />
        )}
        <div>
          <p className="font-semibold leading-tight">{data.title}</p>
          <p className="text-xs text-[#9ca3af] leading-tight">{data.artist}</p>
        </div>
      </a>
    );
  }

  // new shape
  const now = data.now;
  const recent = data.recent ?? [];

  let displayNow: Track | null = now && now.title ? now : null;
  let displayRecent = [...recent];

  // 💭 if not playing anything, use the most recent as fallback and remove it from recents
  if (!displayNow && recent.length > 0) {
    displayNow = recent[0];
    displayRecent = recent.slice(1);
  }

  if (!displayNow && recent.length === 0) {
    return <p className="text-sm text-[#9ca3af]">nothing playing 💭</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* current / substitute track */}
      {displayNow && (
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white leading-tight">
              {displayNow.title}
            </p>
            <p className="text-xs text-[#9ca3af] leading-tight">
              {displayNow.artist}
            </p>
          </div>
          {displayNow.image ? (
            <img
              src={displayNow.image}
              alt={displayNow.title ?? ""}
              className="w-12 h-12 rounded-lg object-cover border border-[#2a2a2a]"
            />
          ) : null}
        </div>
      )}

      {/* recently played list */}
      {displayRecent.length > 0 && (
        <div className="pt-2 border-t border-[#2a2a2a]/80">
          <p className="text-[11px] mb-2 text-[#a1a1aa] uppercase tracking-wide">
            recently played
          </p>
          <ul className="space-y-1.5">
            {displayRecent
              .slice(0, now && now.title ? 3 : 4) 
              .map((track, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-4 text-[10px] text-[#525252]">
                    {i + 1}.
                  </span>
                  <div className="flex-1">
                    <p className="text-[12px] leading-tight text-[#e5e7eb] hover:text-[#93c5fd] transition">
                      {track.title}
                    </p>
                    <p className="text-[10px] text-[#6b7280] leading-tight">
                      {track.artist}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
