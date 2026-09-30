import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const COLLECTION_QUERY = `*[_type == "collection" && slug.current == $slug][0]{
  title,
  description,
  "coverImageUrl": coverImage.asset->url,
  teas[]->{
    _id,
    name,
    description,
    price,
    "imageUrl": image.asset->url,
    category->{ title }
  }
}`;

type Tea = {
  _id: string;
  name: string;
  description?: string | null;
  price?: number | null;
  imageUrl?: string | null;
  category?: { title: string } | null;
};

type CollectionData = {
  title: string;
  description?: string | null;
  coverImageUrl?: string | null;
  teas?: Tea[] | null;
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let data: CollectionData | null = null;
  try {
    data = await client.fetch<CollectionData>(COLLECTION_QUERY, { slug });
  } catch {
    // fall through to notFound
  }

  if (!data) notFound();

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-72 bg-stone-900 md:h-96">
        {data.coverImageUrl ? (
          <Image
            src={data.coverImageUrl}
            alt={data.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-900" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{data.title}</h1>
          {data.description && (
            <p className="mt-4 max-w-xl text-base text-white/75">{data.description}</p>
          )}
        </div>
      </div>

      {/* Products grid */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        {data.teas && data.teas.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.teas.map((tea) => (
              <div
                key={tea._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-100 bg-stone-50 transition hover:shadow-md"
              >
                <div className="relative aspect-square bg-stone-200">
                  {tea.imageUrl ? (
                    <Image
                      src={tea.imageUrl}
                      alt={tea.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-300 to-stone-400" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {tea.category && (
                    <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                      {tea.category.title}
                    </p>
                  )}
                  <h3 className="mt-1 font-semibold text-stone-900">{tea.name}</h3>
                  {tea.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-stone-500">
                      {tea.description}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {tea.price != null && (
                      <span className="font-bold text-stone-900">
                        €{tea.price.toFixed(2)}
                      </span>
                    )}
                    <button className="rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-stone-700">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-stone-400">
            <p className="text-lg">No teas in this collection yet.</p>
            <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-stone-900 underline">
              Browse all catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
