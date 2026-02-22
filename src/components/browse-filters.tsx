"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BrowseFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams(searchParams);

    ["query", "city", "category", "listingType", "sort"].forEach((key) => {
      const value = String(formData.get(key) || "").trim();
      if (value) params.set(key, value);
      else params.delete(key);
    });

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-5">
      <Input name="query" placeholder="Search title or tag" defaultValue={searchParams.get("query") ?? ""} />
      <Input name="city" placeholder="City" defaultValue={searchParams.get("city") ?? ""} />
      <Input name="category" placeholder="Category" defaultValue={searchParams.get("category") ?? ""} />
      <Input name="listingType" placeholder="RENT / TRADE / BOTH" defaultValue={searchParams.get("listingType") ?? ""} />
      <div className="flex gap-2">
        <Input name="sort" placeholder="newest" defaultValue={searchParams.get("sort") ?? "newest"} />
        <Button type="submit">Apply</Button>
      </div>
    </form>
  );
}
