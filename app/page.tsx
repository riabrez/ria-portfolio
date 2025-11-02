"use client";

import { useState, useEffect } from "react";

const TABS = ["about", "projects", "links"];

// little client component to show Last.fm
function NowPlaying() {
  const [track, setTrack] = useState<null | {
    playing: boolean;
    title?: string;
    artist?: string;
    image?: string;
    url?: string;
  }>(null);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/now-playing");
        const data = await res.json();
        setTrack(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTrack();
    const id = setInterval(fetchTrack, 30000); // refresh every 30s
    return () => clearInterval(id);
  }, []);

  if (!track) {
    return <p className="text-sm text-[#233025]/60">loading…</p>;
  }

  if (!track.playing) {
    return <p className="text-sm text-[#233025]/70">nothing playing 💭</p>;
  }

  return (
    <a
      href={track.url}
      target="_blank"
      className="flex items-center gap-2 text-sm text-[#233025]/90 hover:underline"
    >
      {track.image ? (
        <img
          src={track.image}
          alt="album"
          className="w-9 h-9 rounded-md border border-[#cdd8cc]"
        />
      ) : null}
      <div>
        <p className="font-semibold leading-tight">{track.title}</p>
        <p className="text-xs text-[#233025]/60 leading-tight">
          {track.artist}
        </p>
      </div>
    </a>
  );
}

export default function Page() {
  const [active, setActive] = useState("about");

  return (
    <div className="w-full max-w-5xl bg-[#ecf1ea] rounded-[1.75rem] border-[3px] border-[#3f5b42] shadow-[0_12px_0_#263a2a] overflow-hidden">
      {/* stitched top bar */}
      <div className="bg-stitch border-b-[3px] border-[#3f5b42] px-5 py-2 flex items-center justify-between text-[11px] text-[#233025]">
        <span className="font-semibold">riabrez</span>
        <span className="opacity-60">
          last updated: {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* fake URL bar */}
      <div className="bg-[#ecf1ea] border-b border-[#3f5b42]/30 px-5 py-2 flex gap-2 items-center text-[11px]">
        <span className="w-3 h-3 rounded-full bg-[#ef6b6b]" />
        <span className="w-3 h-3 rounded-full bg-[#ffdb6e]" />
        <span className="w-3 h-3 rounded-full bg-[#7de0a7]" />
        <div className="flex-1 bg-white/70 border border-[#3f5b42]/15 rounded-full px-3 py-1 text-[#233025]/70 mx-2">
          https://riabrez.dev
        </div>
        <button className="text-[#233025]/50 text-[10px] px-2">🔍</button>
      </div>

      {/* tab buttons */}
      <div className="flex gap-2 px-4 pt-3 overflow-x-auto bg-[#dbe4d5]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-t-xl text-sm capitalize border-[2px] transition ${
              active === tab
                ? "bg-[#ecf1ea] border-[#3f5b42] text-[#233025]"
                : "bg-[#cdd8cc] border-transparent text-[#233025]/70 hover:bg-[#dbe4d5]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* tab content area */}
      <div className="p-5 md:p-7 bg-[#ecf1ea] min-h-[520px] max-h-[520px] overflow-y-auto rounded-b-[1.75rem] scrollbar-thin scrollbar-thumb-[#3f5b42]/40 scrollbar-track-transparent">
        {/* ABOUT TAB */}
        {active === "about" && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* left photo */}
            <div className="flex-shrink-0 w-full max-w-[350px]">
              <div className="w-full aspect-square max-h-[350px] rounded-[1.25rem] bg-[#cdd8cc] border-[3px] border-[#3f5b42] overflow-hidden flex items-center justify-center">
                <span className="text-[12px] text-[#233025]/60 text-center px-3">
                  your photo here
                </span>
              </div>
              <div className="mt-3 bg-white/80 rounded-md p-3 text-xs text-[#233025] border border-[#3f5b42]/15">
                <p className="font-semibold text-sm">Maria Brzezinska</p>
                <p>Software Engineering • UofG</p>
                <p className="mt-1 text-[0.65rem] text-[#233025]/70">
                  Glasgow · open to projects 💌
                </p>
              </div>
            </div>

            {/* right about text */}
            <div className="flex-1 space-y-4">
              <div className="bg-[#f6f8f5] border-[2px] border-[#cdd8cc] rounded-2xl p-5 space-y-3">
                <p className="text-sm font-bold text-[#3f5b42]">
                  About me
                </p>
                <h1 className="text-2xl md:text-3xl font-semibold text-[#233025]">
                  Hey, I&apos;m Ria
                </h1>
                <p className="text-sm text-[#233025]/90 leading-relaxed">
                  lorem ipssum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-sm text-[#233025]/80">
                  loren ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-[#f6f8f5] border-[2px] border-[#cdd8cc] rounded-xl p-3">
                  <p className="text-xs font-semibold text-[#233025] mb-1">
                    current modules 📚
                  </p>
                  <ol className="text-sm text-[#233025]/90 space-y-1 mt-1">
                    <li>• Algorithmics</li>
                    <li>• Systems Programming</li>
                    <li>• HCSDE</li>
                    <li>• Data Fundamentals</li>
                    <li>• Professional Software Development</li>
                  </ol>
                </div>
                <div className="bg-[#f6f8f5] border-[2px] border-[#cdd8cc] rounded-xl p-3">
                  <p className="text-xs font-semibold text-[#233025] mb-1">
                    now playing 🎧
                  </p>
                  {/* actual Last.fm component */}
                  <NowPlaying />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {active === "projects" && (
          <div className="space-y-4">
            <p className="text-xs uppercase text-[#3f5b42]">projects</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#f6f8f5] border-[2px] border-[#cdd8cc] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#233025] mb-1">
                  placeholder
                </p>
                <p className="text-xs text-[#233025]/80">placeholder</p>
              </div>
              <div className="bg-[#f6f8f5] border-[2px] border-[#cdd8cc] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#233025] mb-1">
                  placeholder
                </p>
                <p className="text-xs text-[#233025]/80">placeholder</p>
              </div>
              <div className="bg-[#f6f8f5] border-[2px] border-[#cdd8cc] rounded-xl p-4">
                <p className="text-sm font-semibold text-[#233025] mb-1">
                  placeholder
                </p>
                <p className="text-xs text-[#233025]/80">placeholder</p>
              </div>
            </div>
          </div>
        )}

        {/* LINKS TAB */}
        {active === "links" && (
          <div className="space-y-4">
            <p className="text-xs uppercase text-[#3f5b42]">
              links / socials
            </p>
            <div className="flex flex-wrap gap-2">
              {["GitHub", "LinkedIn", "Instagram", "Email"].map((item) => (
                <button
                  key={item}
                  className="bg-[#ecf1ea] border-[2px] border-dashed border-[#3f5b42]/40 rounded-md px-3 py-1 text-[11px] text-[#233025] hover:bg-[#e4ebe4]"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="bg-[#f6f8f5] border-[2px] border-[#cdd8cc] rounded-xl p-4 text-sm text-[#233025]/85">
              Placeholder
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
