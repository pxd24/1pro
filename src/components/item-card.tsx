import Link from "next/link";
import Image from "next/image";
import { ListingType } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type ItemCardProps = {
  item: {
    id: string;
    title: string;
    images: string[];
    locationCity: string;
    listingType: ListingType;
    rentPricePerDay: number | null | { toString: () => string };
  };
};

export function ItemCard({ item }: ItemCardProps) {
  const price = item.rentPricePerDay ? Number(item.rentPricePerDay).toFixed(0) : null;

  return (
    <Card className="overflow-hidden p-0">
      <Link href={`/items/${item.id}`}>
        <div className="relative h-44 w-full bg-muted">
          <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold">{item.title}</h3>
            <Badge>{item.listingType}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{item.locationCity}</p>
          <p className="font-medium">{price ? `$${price}/day` : "Trade only"}</p>
        </div>
      </Link>
    </Card>
  );
}
