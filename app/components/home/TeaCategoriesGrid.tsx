import Image from "next/image";
import Link from "next/link";
import { categoryImage, getCategory } from "@/lib/categories";

const CATEGORIES = [
  {
    badge: "Klasikinė",
    badgeClass: "bg-racing-green-dark",
    eyebrow: "Black Tea Collection",
    title: "Juodoji arbata",
    href: "/shop?kategorija=juodoji",
    image: getCategory("juodoji")?.image,
    body: "Tradiciniai English Breakfast, Ceylon, Darjeeling ir Assam mišiniai. Turtingas, aromatingas kūnas ir gintarinė spalva.",
  },
  {
    badge: "Gaivi & Aromatinga",
    badgeClass: "bg-surface-tint",
    eyebrow: "Green Tea Selection",
    title: "Žalioji arbata",
    href: "/shop?kategorija=zalioji",
    image: getCategory("zalioji")?.image,
    body: "Gryna žalioji arbata, Jasmine Romance, Green Tea Mint. Gaivus, švelniai gėliškas poskonis svečių poilsiui ir SPA ritualams.",
  },
  {
    badge: "Be Kofeino",
    badgeClass: "bg-secondary",
    eyebrow: "Herbal & Fruit Infusions",
    title: "Žolelių ir vaisių arbatos",
    href: "/shop?kategorija=zoleliu",
    image: getCategory("zoleliu")?.image,
    body: "Natūralios ramunėlių, pipirmėčių, miško uogų ir citrinžolės kompozicijos be kofeino vakaro poilsiui ir svečių savijautai.",
  },
  {
    badge: "Britų Paveldas",
    badgeClass: "bg-racing-green-dark",
    eyebrow: "Earl Grey & Heritage",
    title: "Earl Grey & Britų klasika",
    href: "/shop?kategorija=visos&paieska=Earl%20Grey",
    // Not a catalog category, so the photo is referenced directly
    image: categoryImage("earl1.png"),
    body: "Legendinė Earl Grey su tikru bergamočių aliejumi, English Tea No. 1 ir išskirtinės Royal Tea serijos prestižiniams viešbučiams.",
  },
];

export default function TeaCategoriesGrid() {
  return (
    <section className="w-full bg-surface-container px-margin-mobile py-space-xl lg:px-margin-desktop">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-space-xl">
        <div className="flex flex-col gap-space-md md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-space-xs">
            <span className="font-sans text-label-sm font-bold uppercase tracking-widest text-secondary">
              MEISTRIŠKAI SUDERINTI SKONIAI
            </span>
            <h2 className="font-serif text-headline-lg-mobile text-primary lg:text-headline-lg">
              Aukščiausios rūšies arbatos rūšys HoReCa
            </h2>
          </div>
          <div className="flex items-center gap-space-xs rounded-lg bg-surface px-space-md py-space-xs font-sans text-body-sm text-charcoal-muted shadow-xs">
            <span className="material-symbols-outlined text-antique-gold-bright text-[18px]" aria-hidden="true">info</span>
            <span>Didmeninės kainos teikiamos pagal individualią užklausą</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-gutter-lg md:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group flex flex-col overflow-hidden rounded-xl bg-surface shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-surface-container-high to-primary-container">
                {category.image && (
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                )}
                <span className={`absolute left-3 top-3 z-10 rounded px-2 py-0.5 font-sans text-label-sm uppercase text-parchment-deep ${category.badgeClass}`}>
                  {category.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-space-sm p-space-md">
                <span className="font-sans text-label-sm font-semibold uppercase text-secondary">
                  {category.eyebrow}
                </span>
                <h3 className="font-serif text-headline-sm text-primary">{category.title}</h3>
                <p className="font-sans text-body-sm text-on-surface-variant line-clamp-3">
                  {category.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
