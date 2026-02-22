import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwapRent",
  description: "Rent or trade unused items locally."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold text-blue-600">SwapRent</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/browse" className="hover:text-blue-600">Browse</Link>
              <Link href="/list-item" className="rounded-md bg-blue-600 px-3 py-1.5 text-white">List an item</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
