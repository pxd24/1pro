import { ListingType } from "@prisma/client";

export type BrowseFilter = {
  query?: string;
  city?: string;
  category?: string;
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
};

export function filterItems<T extends { title: string; tags: string[]; category: string; locationCity: string; listingType: ListingType; rentPricePerDay: number | null }>(items: T[], filters: BrowseFilter) {
  return items.filter((item) => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const hit = item.title.toLowerCase().includes(q) || item.tags.some((tag) => tag.toLowerCase().includes(q));
      if (!hit) return false;
    }
    if (filters.city && item.locationCity.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.category && item.category !== filters.category) return false;
    if (filters.listingType && item.listingType !== filters.listingType) return false;
    if (filters.minPrice !== undefined && (item.rentPricePerDay ?? 0) < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && (item.rentPricePerDay ?? 0) > filters.maxPrice) return false;
    return true;
  });
}
