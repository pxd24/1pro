import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const reviewSchema = z.object({
  authorId: z.string().min(1),
  targetUserId: z.string().min(1),
  itemId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(3)
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const review = await prisma.review.create({ data: parsed.data });
  return NextResponse.json({ review }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const targetUserId = request.nextUrl.searchParams.get("targetUserId");
  if (!targetUserId) {
    return NextResponse.json({ error: "targetUserId is required" }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { targetUserId },
    include: { author: { select: { id: true, name: true, avatarUrl: true } } },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ reviews });
}
