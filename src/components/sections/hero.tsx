import Image from "next/image";
import Link from "next/link";
import { Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getChristmasSelection } from "@/lib/shopify/products";
import { sizedImageUrl } from "@/lib/shopify/format";
import { ACCENT_BG, categoryLabel } from "@/lib/accent";
import { cn } from "@/lib/utils";

// Mosaïque 3×3 sans chevauchement : une grande photo (2×2), deux à droite, deux en bas, une tuile de marque.
const TILE_LAYOUT = [
  "col-start-1 row-start-1 col-span-2 row-span-2",
  "col-start-3 row-start-1",
  "col-start-3 row-start-2",
  "col-start-1 row-start-3",
  "col-start-2 row-start-3",
];

/** "N°73 - Fresh cherry - Infusion …" → "Fresh cherry" */
function shortTitle(title: string): string {
  return title.replace(/^N°\s*\d+\s*-?\s*/i, "").split(" - ")[0].trim();
}

export async function Hero() {
  const collage = await getChristmasSelection(TILE_LAYOUT.length);

  return (
    <section className="relative overflow-hidden mesh-gradient grain-overlay border-b border-cream-line">
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative z-[2]">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta mb-5">
            <Snowflake className="size-4" aria-hidden /> Collection de Noël
          </p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
            Les thés de Noël
            <br />
            <em className="not-italic text-gold-dark">sont arrivés</em>
          </h1>
          <p className="text-base text-ink-soft max-w-md leading-relaxed mb-8">
            Pomme, cannelle, amande, spéculoos, caramel : nos thés et infusions aux saveurs de fêtes, à servir tout
            l&apos;hiver dans votre établissement ou à offrir.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-sm px-8 min-h-11">
              <Link href="/thes-de-noel">Découvrir les thés de Noël</Link>
            </Button>
            <Link
              href="/collections/thes"
              className="inline-flex min-h-11 items-center text-sm underline underline-offset-4 text-gold-dark hover:text-ink transition-colors"
            >
              Toute la gamme
            </Link>
          </div>
        </div>

        {collage.length === TILE_LAYOUT.length && (
          <div className="relative z-[2] w-full max-w-[540px] md:ml-auto">
            {/* Cadre décalé : donne de la profondeur sans superposer les photos. */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-sm border border-gold/40 opacity-0 animate-fade-in"
              style={{ animationDelay: "650ms" }}
            />
            <div className="relative grid aspect-square grid-cols-3 grid-rows-3 gap-3 md:gap-4">
              {collage.map((product, i) => {
                const featured = i === 0;
                return (
                  <Link
                    key={product.handle}
                    href={`/produits/${product.handle}`}
                    aria-label={product.title}
                    className={cn(
                      "group relative block overflow-hidden rounded-sm bg-cream-deep opacity-0 animate-fade-up focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark",
                      TILE_LAYOUT[i]
                    )}
                    style={{ animationDelay: `${120 + i * 90}ms` }}
                  >
                    {/* Les photos Shopify montrent un plateau sur fond blanc : on zoome sur la texture du thé. */}
                    <Image
                      src={sizedImageUrl(product.images[0].url, featured ? 900 : 480)}
                      alt=""
                      fill
                      loading="eager"
                      fetchPriority={featured ? "high" : "auto"}
                      sizes={featured ? "(max-width: 768px) 66vw, 360px" : "(max-width: 768px) 33vw, 180px"}
                      className="object-cover scale-[1.4] transition-transform duration-700 ease-out group-hover:scale-[1.5]"
                    />
                    <span className={cn("absolute inset-x-0 top-0 z-10 h-1", ACCENT_BG[product.accent])} aria-hidden />
                    <span
                      className={cn(
                        "absolute bottom-2 left-2 z-10 max-w-[calc(100%-1rem)] rounded-sm bg-cream-card/95 text-ink shadow-sm",
                        featured
                          ? "bottom-3 left-3 max-w-[calc(100%-1.5rem)] px-3 py-2"
                          : "px-2 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:hidden"
                      )}
                    >
                      {featured && (
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-dark">
                          {categoryLabel(product)}
                        </span>
                      )}
                      <span className={cn("block truncate font-display leading-tight", featured ? "text-lg" : "text-xs")}>
                        {shortTitle(product.title)}
                      </span>
                    </span>
                  </Link>
                );
              })}

              <Link
                href="/thes-de-noel"
                className="col-start-3 row-start-3 flex flex-col justify-between rounded-sm bg-terracotta p-3 md:p-4 text-cream opacity-0 animate-fade-up hover:bg-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
                style={{ animationDelay: `${120 + TILE_LAYOUT.length * 90}ms` }}
              >
                <Snowflake className="size-5 text-gold-light" aria-hidden />
                <span>
                  <span className="block font-display text-xl md:text-2xl leading-none">Noël</span>
                  <span className="text-[11px] md:text-xs text-cream/80 leading-tight">Voir la collection →</span>
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
