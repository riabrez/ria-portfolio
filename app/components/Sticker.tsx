"use client";

import Image from "next/image";

export default function Sticker() {
  return (
    <div
      className="
        pointer-events-none
        fixed md:absolute
        bottom-6 md:bottom-[150px]
        right-4 md:right-[240px]
        z-[999]
        stickerbob
      "
    >
      <Image
        src="/sticker.jpg"   
        alt="Ria sticker"
        width={352}
        height={352}
        className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.35)]"
        priority
      />
    </div>
  );
}
