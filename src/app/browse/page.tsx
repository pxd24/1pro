import { ListingType } from "@prisma/client";
import { BrowseFilters } from "@/components/browse-filters";
import { ItemCard } from "@/components/item-card";
import { getBrowseItems } from "@/lib/items";

type Props = {
  searchParams: {
    query?: string;
    city?: string;
    category?: string;
    listingType?: ListingType;
    sort?: "newest" | "priceLow" | "priceHigh";
  };
};

export default async function BrowsePage({ searchParams }: Props) {
  const items = await getBrowseItems(searchParams);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Browse items</h1>
        <p className="text-muted-foreground">Find local items to rent or trade.</p>
      </div>

      <BrowseFilters />

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">No items found. Try adjusting your filters.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
