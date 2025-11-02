import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ria • Portfolio",
  description: "Carrd-style personal site.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-green-pattern flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
