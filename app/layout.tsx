import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ria • Portfolio",
  description: "Carrd-style personal site.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark-pattern min-h-screen">
        {children}
      </body>
    </html>
  );
}

