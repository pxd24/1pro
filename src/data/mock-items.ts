import { ListingType } from "@prisma/client";

export const mockItems = [
  {
    id: "mock-1",
    title: "Canon DSLR Camera",
    description: "Perfect for trips and content creation.",
    category: "Electronics",
    condition: "Good",
    images: ["https://images.unsplash.com/photo-1519183071298-a2962be96f83"],
    locationCity: "Austin",
    listingType: ListingType.BOTH,
    rentPricePerDay: 24,
    tags: ["camera", "travel"],
    owner: { id: "u1", name: "Alice Carter", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" }
  },
  {
    id: "mock-2",
    title: "Cordless Power Drill",
    description: "Includes two batteries and charger.",
    category: "Tools",
    condition: "Like New",
    images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c"],
    locationCity: "Austin",
    listingType: ListingType.RENT,
    rentPricePerDay: 10,
    tags: ["diy", "home"],
    owner: { id: "u2", name: "Ben Lopez", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" }
  }
];
