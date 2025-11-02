import "./globals.css";

export const metadata = {
  title: "Ria | Portfolio",
  description: "Personal website built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-zinc-950">
      <body className="min-h-screen text-zinc-100">
        <div className="mx-auto max-w-5xl px-4">
          <main className="py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
