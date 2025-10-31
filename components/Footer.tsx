export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 py-6 mt-10 text-xs text-zinc-500">
            <div className="mx-auto max-w-5xl px-4 flex justify-between">
                <p>© {new Date().getFullYear()} Ria. Built with Next.js & Tailwind.</p>
                <p>
                    <a
                        href="https://github.com/riabrez"
                        className="text-zinc-400 hover:text-amber-200 transition"
                    >
                        GitHub
                    </a>
                </p>
            </div>
        </footer>
    );
}
