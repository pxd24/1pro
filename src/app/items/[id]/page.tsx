import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ItemCard } from "@/components/item-card";
import { getItemById, getSimilarItems } from "@/lib/items";

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = await getItemById(params.id);
  if (!item) notFound();

  const similarItems = await getSimilarItems(item.category, item.id);

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-xl bg-muted">
          <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <Badge>{item.listingType}</Badge>
          </div>
          <p className="text-muted-foreground">{item.description}</p>
          <p className="text-sm">Condition: <strong>{item.condition}</strong></p>
          <p className="text-sm">City: <strong>{item.locationCity}</strong></p>
          <p className="text-lg font-semibold">{item.rentPricePerDay ? `$${Number(item.rentPricePerDay)}/day` : "Trade only"}</p>

          <Card>
            <p className="font-medium">Owner</p>
            <p>{item.owner.name}</p>
            <p className="text-sm text-muted-foreground">Member since {new Date(item.owner.createdAt).getFullYear()}</p>
          </Card>

          <div className="flex gap-3">
            <Button>Request rental</Button>
            <Button className="bg-slate-800 hover:bg-slate-900">Propose trade</Button>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Availability</h2>
        {"availability" in item && item.availability.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {item.availability.map((slot) => (
              <li key={slot.id} className="rounded-md border p-3">
                {new Date(slot.startDate).toLocaleDateString()} - {new Date(slot.endDate).toLocaleDateString()} {slot.notes ? `· ${slot.notes}` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Availability info will be shared during request confirmation.</p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Similar items</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {similarItems.map((similar) => (
            <ItemCard key={similar.id} item={similar} />
          ))}
        </div>
      </section>
    </div>
  );
}
