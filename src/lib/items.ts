import { ListingType, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { mockItems } from "@/data/mock-items";
import { filterItems } from "@/lib/filter-items";

export type SearchParams = {
  query?: string;
  city?: string;
  category?: string;
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "priceLow" | "priceHigh";
};

function orderBy(sort?: SearchParams["sort"]): Prisma.ItemOrderByWithRelationInput {
  if (sort === "priceLow") return { rentPricePerDay: "asc" };
  if (sort === "priceHigh") return { rentPricePerDay: "desc" };
  return { createdAt: "desc" };
}

export async function getBrowseItems(params: SearchParams) {
  try {
    const where: Prisma.ItemWhereInput = {
      status: "ACTIVE",
      ...(params.city ? { locationCity: { equals: params.city, mode: "insensitive" } } : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.listingType ? { listingType: params.listingType } : {}),
      ...(params.query
        ? {
            OR: [
              { title: { contains: params.query, mode: "insensitive" } },
              { tags: { hasSome: [params.query.toLowerCase()] } }
            ]
          }
        : {}),
      ...(params.minPrice !== undefined || params.maxPrice !== undefined
        ? {
            rentPricePerDay: {
              ...(params.minPrice !== undefined ? { gte: params.minPrice } : {}),
              ...(params.maxPrice !== undefined ? { lte: params.maxPrice } : {})
            }
          }
        : {})
    };

    return await prisma.item.findMany({
      where,
      include: { owner: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: orderBy(params.sort)
    });
  } catch {
    return filterItems(mockItems, params);
  }
}

export async function getItemById(id: string) {
  try {
    return await prisma.item.findUnique({
      where: { id },
      include: {
        owner: true,
        availability: { orderBy: { startDate: "asc" } },
        reviews: { include: { author: true }, orderBy: { createdAt: "desc" } }
      }
    });
  } catch {
    return mockItems.find((item) => item.id === id) ?? null;
  }
}

export async function getSimilarItems(category: string, excludeId: string) {
  try {
    return await prisma.item.findMany({
      where: { category, id: { not: excludeId }, status: "ACTIVE" },
      include: { owner: { select: { id: true, name: true, avatarUrl: true } } },
      take: 3,
      orderBy: { createdAt: "desc" }
    });
  } catch {
    return mockItems.filter((item) => item.category === category && item.id !== excludeId).slice(0, 3);
  }
}
