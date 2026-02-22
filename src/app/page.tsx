import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-10">
        <h1 className="text-4xl font-bold">Rent or trade unused items in your neighborhood.</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">SwapRent helps you monetize what you own and discover what you need nearby, safely and quickly.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/browse" className="rounded-md bg-blue-600 px-5 py-2.5 text-white">Browse items</Link>
          <Link href="/list-item" className="rounded-md border px-5 py-2.5">List an item</Link>
        </div>
      </section>
    </div>
  );
}
