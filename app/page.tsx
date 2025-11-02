"use client";

import Image from "next/image";
import { useState } from "react";
import NowPlaying from "./components/NowPlaying";
import Sticker from "./components/Sticker";

const TABS = ["about", "projects", "links"];

const PROJECTS = [
  {
    name: "Personal Portfolio",
    role: "Design & Development · Next.js, Tailwind",
    desc: "A custom-built personal portfolio (this website!) developed from scratch with Next.js and Tailwind. It features a minimalist dark-mode layout, tabbed navigation, subtle animations, and a live Last.fm integration — all designed to showcase my frontend and UI design skills.",
    link: "https://github.com/riabrez/ria-portfolio",
    year: "2025",
  },
  {
    name: "UniDFood – Student Food Spot Finder",
    role: "Coursework · Django, HTML, CSS, JavaScript",
    desc: "A collaborative web app built for the Web App Development course at UofG. I focused on the frontend, designing responsive Django templates and refining page layouts for login, reviews, and meetups.",
    link: "https://github.com/riabrez/UnidFood",
    year: "2024",
  },
];



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
              className={`px-4 py-2 rounded-t-xl text-sm capitalize border transition ${active === tab
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
            <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
              {/* LEFT COLUMN */}
              <div className="w-full lg:max-w-[340px] lg:flex lg:flex-col lg:justify-between">
                {/* photo */}
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

                {/* info card */}
                <div className="mt-3 lg:mt-4 bg-[#101010]/70 rounded-md p-3 text-xs text-[#e5e5e5] border border-[#2a2a2a] backdrop-blur">
                  <p className="font-semibold text-sm">Maria Brzezinska</p>
                  <p className="text-[#cbd5f5]">Software Engineering • UofG</p>
                  <p className="mt-1 text-[0.65rem] text-[#9ca3af]">
                    Glasgow · open to projects 💌
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex-1 space-y-4">
                {/* about box */}
                <div className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-5 space-y-3">
                  <p className="text-sm font-bold text-[#d4d4d4]">About me</p>
                  <h1 className="text-2xl md:text-3xl font-semibold text-white floating glowtext">
                    Hey, I&apos;m Ria
                  </h1>
                  <p className="text-sm text-[#d1d5db]/80 leading-relaxed">
                    I&apos;m Ria – a third-year Software Engineering student at the University of Glasgow
                    with a focus on frontend and full-stack development. I love creating clean, user-friendly
                    web applications and exploring new technologies.
                  </p>
                  <p className="text-sm text-[#9ca3af]">
                    Currently exploring React, Next.js, and TypeScript. Always eager to learn and take on new
                    challenges!
                  </p>
                </div>

                {/* bottom two cards */}
                <div className="grid sm:grid-cols-2 gap-3 items-stretch">
                  {/* modules */}
                  <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-3 flex flex-col h-full">
                    <p className="text-xs font-semibold text-white mb-1">
                      current modules 📚
                    </p>
                    <ol className="text-sm text-[#d4d4d4] space-y-1 mt-1">
                      <li>• Algorithmics</li>
                      <li>• Systems Programming</li>
                      <li>• HCSDE</li>
                      <li>• Data Fundamentals</li>
                      <li>• Professional Software Development</li>
                    </ol>
                  </div>

                  {/* now playing */}
                  <div className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-3 flex flex-col h-full">
                    <p className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
                      now playing 🧠
                    </p>
                    <div className="flex-1 min-h-0">
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
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-[#a1a1aa]">
                  projects
                </p>
                <p className="text-[11px] text-[#6b7280]">
                  {PROJECTS.length} total
                </p>
              </div>

              {/* cards */}
              <div className="grid md:grid-cols-2 gap-5">
                {PROJECTS.map((project) => (
                  <div
                    key={project.name}
                    className="bg-[#161616] border border-[#2a2a2a] rounded-xl p-5 flex flex-col gap-3 hover:border-[#3b82f6]/60 transition min-h-[230px] md:min-h-[250px]"
                  >
                    {/* top: title + link */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white leading-tight">
                          {project.name}
                        </p>
                        <p className="text-[11px] text-[#9ca3af] leading-tight mt-1">
                          {project.role}
                        </p>
                      </div>
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#93c5fd] text-xs hover:underline shrink-0"
                        >
                          GitHub ↗
                        </a>
                      ) : null}
                    </div>

                    {/* description */}
                    <p className="text-[12.5px] text-[#d1d5db]/80 leading-relaxed">
                      {project.desc}
                    </p>

                    {/* footer */}
                    <div className="flex items-center gap-2 mt-auto pt-2">
                      <span className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full bg-[#0f172a]/30 text-[10px] text-[#bfdbfe]">
                        {project.year}
                      </span>
                      <span className="text-[10px] text-[#525252]">
                        • updated recently
                      </span>
                    </div>
                  </div>
                ))}
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
