"use client";

import Image from "next/image";
import { useState } from "react";
import NowPlaying from "./components/NowPlaying";
import Sticker from "./components/Sticker";

const TABS = ["about", "projects", "links"];

export default function Page() {
  const [active, setActive] = useState("about");

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-[#111111] rounded-[1.75rem] border border-[#1f1f1f] shadow-[0_14px_0_#000000]/70 overflow-hidden">
        {/* stitched top bar */}
        <div className="bg-stitch-dark border-b border-[#1f1f1f] px-5 py-2 flex items-center justify-between text-[11px] text-[#e5e5e5]/85">
          <span className="font-semibold">riabrez</span>
          <span className="opacity-55">
            last updated: {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* fake URL bar */}
        <div className="bg-[#0f0f0f] border-b border-[#222]/70 px-5 py-2 flex gap-2 items-center text-[11px]">
          <span className="w-3 h-3 rounded-full bg-[#ef6b6b]" />
          <span className="w-3 h-3 rounded-full bg-[#f5c26b]" />
          <span className="w-3 h-3 rounded-full bg-[#7de0a7]" />
          <div className="flex-1 bg-[#151515] border border-[#222] rounded-full px-3 py-1 text-[#9ca3af] mx-2">
            https://riabrez.dev
          </div>
          <button className="text-[#a3a3a3] text-[10px] px-2">🔍</button>
        </div>

        {/* tab buttons */}
        <div className="flex gap-2 px-4 pt-3 pb-1 overflow-x-auto bg-[#181818] border-b border-[#1f1f1f]">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-2 rounded-t-xl text-sm capitalize border transition ${
                active === tab
                  ? "bg-[#151515] border-[#2b2b2b] text-white shadow-[0_2px_0_#111111]"
                  : "bg-[#111111] border-transparent text-[#a1a1aa] hover:bg-[#151515]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* tab content area */}
        <div className="p-6 md:p-8 bg-[#151515] min-h-[590px] max-h-[605px] overflow-y-auto rounded-b-[1.75rem] scrollbar-thin scrollbar-thumb-[#2b2b2b] scrollbar-track-transparent">
          {/* ABOUT TAB */}
          {active === "about" && (
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* left photo + card */}
              <div className="flex-shrink-0 w-full max-w-[350px]">
                <div className="w-full aspect-square max-h-[350px] rounded-[1.25rem] bg-[#0a0a0a] border border-[#2a2a2a] overflow-hidden">
                  <Image
                    src="/portfolio.jpg"
                    alt="Photo of Ria"
                    width={350}
                    height={350}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="mt-3 bg-[#101010]/70 rounded-md p-3 text-xs text-[#e5e5e5] border border-[#2a2a2a] backdrop-blur">
                  <p className="font-semibold text-sm">Maria Brzezinska</p>
                  <p className="text-[#cbd5f5]">Software Engineering • UofG</p>
                  <p className="mt-1 text-[0.65rem] text-[#9ca3af]">
                    Glasgow · open to projects 💌
                  </p>
                </div>
              </div>

              {/* right about text */}
              <div className="flex-1 space-y-4">
                <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-5 space-y-3">
                  {/* <p className="text-sm font-bold text-[#d4d4d4]">About me</p> */}
                  <h1 className="text-2xl md:text-3xl font-semibold text-white floating shadow glowtext">
                    Hey, I&apos;m Ria
                  </h1>
                  <p className="text-sm text-[#d1d5db]/80 leading-relaxed">
                    I'm Ria - a third-year Software Engineering student at the University of Glasgow with a focus on frontend and full-stack development.
                    I love creating clean, user-friendly web applications and exploring new technologies. When I'm not coding, you can find 
                    me playing around with music software or writing film reviews.

                  </p>
                  <p className="text-sm text-[#9ca3af]">
                    Currently exploring React, Next.js, and TypeScript. Always eager to learn and take on new challenges!
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* modules card */}
                  <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-3">
                    <p className="text-xs font-semibold text-white mb-1">
                      current modules 📚
                    </p>
                    <br></br>
                    <ol className="text-sm text-[#d4d4d4] space-y-1 mt-1 leading-loose">
                      <li>• Algorithmics</li>
                      <li>• Systems Programming</li>
                      <li>• HCSDE</li>
                      <li>• Data Fundamentals</li>
                      <li>• Professional Software Development</li>
                    </ol>
                  </div>

                  {/* now playing card */}
                  <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-3 flex flex-col min-h-[190px]">
                    <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
                      now playing <span className="text-[10px]">💡</span>
                    </p>
                    <div className="flex-1">
                      <NowPlaying />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {active === "projects" && (
            <div className="space-y-4">
              <p className="text-xs uppercase text-[#a1a1aa] tracking-wide">
                projects
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-4">
                  <p className="text-sm font-semibold text-white mb-1">
                    placeholder
                  </p>
                  <p className="text-xs text-[#a1a1aa]">placeholder</p>
                </div>
                <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-4">
                  <p className="text-sm font-semibold text-white mb-1">
                    placeholder
                  </p>
                  <p className="text-xs text-[#a1a1aa]">placeholder</p>
                </div>
                <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-4">
                  <p className="text-sm font-semibold text-white mb-1">
                    placeholder
                  </p>
                  <p className="text-xs text-[#a1a1aa]">placeholder</p>
                </div>
              </div>
            </div>
          )}

          {/* LINKS TAB */}
          {active === "links" && (
            <div className="space-y-4">
              <p className="text-xs uppercase text-[#a1a1aa]">
                links / socials
              </p>
              <div className="flex flex-wrap gap-2">
                {["GitHub", "LinkedIn", "Instagram", "Email"].map((item) => (
                  <button
                    key={item}
                    className="bg-[#111111] border border-dashed border-[#2a2a2a] rounded-md px-3 py-1 text-[11px] text-[#e5e5e5] hover:bg-[#171717]"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-4 text-sm text-[#d4d4d4]">
                Placeholder
              </div>
            </div>
          )}
        </div>
      </div>
      {/* sticker floating on the right */}
      <Sticker />
    </div>
  );
}
