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
    return <p className="text-sm text-[#233025]/60">loading…</p>;
  }

  // if API told us what’s wrong
  if (!isSingleTrack(data) && data.error) {
    return (
      <p className="text-xs text-red-700/80 bg-red-50 border border-red-100 rounded-md p-2">
        {data.error}
      </p>
    );
  }

  // old shape
  if (isSingleTrack(data)) {
    if (!data.playing) {
      return <p className="text-sm text-[#233025]/70">nothing playing 💭</p>;
    }

    return (
      <a
        href={data.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-2 text-sm text-[#233025]/90 hover:underline"
      >
        {data.image && (
          <img
            src={data.image}
            alt={data.title ?? "album"}
            className="w-10 h-10 rounded-md border border-[#cdd8cc] object-cover"
          />
        )}
        <div>
          <p className="font-semibold leading-tight">{data.title}</p>
          <p className="text-xs text-[#233025]/60 leading-tight">
            {data.artist}
          </p>
        </div>
      </a>
    );
  }

  // new shape
  const now = data.now;
  const recent = data.recent ?? [];

  if (!now && recent.length === 0) {
    return <p className="text-sm text-[#233025]/70">nothing playing 💭</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {now && (
        <div className="flex items-center justify-between gap-3">
          <div>

            <p className="text-sm font-semibold text-[#233025]">
              {now.title}
            </p>
            <p className="text-xs text-[#233025]/70">{now.artist}</p>
          </div>
          {now.image ? (
            <img
              src={now.image}
              alt={now.title ?? ""}
              className="w-12 h-12 rounded-lg object-cover border border-[#cdd8cc]"
            />
          ) : null}
        </div>
      )}

      {recent.length > 0 && (
        <div className="pt-2 border-t border-[#cdd8cc]/70">
          <p className="text-xs mb-2 text-[#233025]/55">recently played</p>
          <ul className="space-y-1.5">
            {recent.slice(0, 3).map((track, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-4 text-[10px] text-[#233025]/40">
                  {i + 1}.
                </span>
                <div className="flex-1">
                  <p className="text-sm leading-tight text-[#233025]">
                    {track.title}
                  </p>
                  <p className="text-[11px] text-[#233025]/60">
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
