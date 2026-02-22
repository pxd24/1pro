import { describe, expect, it } from "vitest";
import { ListingType } from "@prisma/client";
import { filterItems } from "@/lib/filter-items";

const items = [
  { title: "Camera", tags: ["photo"], category: "Electronics", locationCity: "Austin", listingType: ListingType.BOTH, rentPricePerDay: 20 },
  { title: "Tent", tags: ["camping"], category: "Outdoors", locationCity: "Denver", listingType: ListingType.RENT, rentPricePerDay: 12 }
];

describe("filterItems", () => {
  it("filters by city and query", () => {
    const result = filterItems(items, { city: "Austin", query: "camera" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Camera");
  });
});
