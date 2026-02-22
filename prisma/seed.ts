import { PrismaClient, ListingType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.request.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.review.deleteMany();
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();

  const [alice, ben] = await Promise.all([
    prisma.user.create({ data: { name: "Alice Carter", email: "alice@swaprent.dev", locationCity: "Austin", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" } }),
    prisma.user.create({ data: { name: "Ben Lopez", email: "ben@swaprent.dev", locationCity: "Austin", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" } })
  ]);

  await prisma.item.createMany({
    data: [
      {
        ownerId: alice.id,
        title: "Canon DSLR Camera",
        description: "Great for weekend trips and creator shoots.",
        category: "Electronics",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1519183071298-a2962be96f83"],
        locationCity: "Austin",
        listingType: ListingType.BOTH,
        rentPricePerDay: 24,
        deposit: 100,
        tradePreferences: "Mirrorless camera lens",
        tags: ["camera", "travel", "content"]
      },
      {
        ownerId: ben.id,
        title: "Mountain Bike - Trek",
        description: "Aluminum frame, tuned monthly.",
        category: "Sports",
        condition: "Like New",
        images: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e"],
        locationCity: "Austin",
        listingType: ListingType.RENT,
        rentPricePerDay: 18,
        deposit: 75,
        tags: ["bike", "outdoor"]
      }
    ]
  });
}

main().finally(async () => prisma.$disconnect());
