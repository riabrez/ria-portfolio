"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b border-zinc-800 py-4">
            <div className="mx-auto max-w-5xl flex items-center justify-between px-4">
                {/* Left side - logo / name */}
                <Link href="/" className="text-sm tracking-[0.35em] uppercase text-zinc-200">
                    ria.dev
                </Link>

                {/* Right side - nav links */}
                <div className="flex gap-6 text-sm text-zinc-400">
                    <Link href="/about" className="hover:text-white transition">About</Link>
                    <Link href="/projects" className="hover:text-white transition">Projects</Link>
                    <Link href="/contact" className="hover:text-white transition">Contact</Link>
                </div>
            </div>
        </nav>
    );
}
