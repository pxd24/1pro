import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getBrowseItems } from "@/lib/items";

const searchSchema = z.object({
  query: z.string().optional(),
  city: z.string().optional(),
  category: z.string().optional(),
  listingType: z.enum(["RENT", "TRADE", "BOTH"]).optional(),
  sort: z.enum(["newest", "priceLow", "priceHigh"]).optional()
});

export async function GET(request: NextRequest) {
  const parsed = searchSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams.entries()));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid search filters", details: parsed.error.flatten() }, { status: 400 });
  }

  const items = await getBrowseItems(parsed.data);
  return NextResponse.json({ items });
}
