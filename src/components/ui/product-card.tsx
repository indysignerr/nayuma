"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/shopify/types";
import { Price } from "@/components/ui/price";
import { ACCENT_BG, categoryLabel } from "@/lib/accent";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addLine } = useCart();
  const defaultVariant = product.variants[0];
  const image = product.images[0];

  return (
    <div className={cn("group relative flex flex-col", className)}>
      <Link href={`/produits/${product.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-sm bg-cream-card border border-cream-line">
          <span className={cn("absolute inset-x-0 top-0 h-1 z-10", ACCENT_BG[product.accent])} aria-hidden />
          {product.fineTea && (
            <span className="absolute top-3 left-3 z-10 bg-ink text-cream text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm">
              Fine Tea
            </span>
          )}
          {image && (
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {defaultVariant && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                addLine(product, defaultVariant);
              }}
              aria-label={`Ajouter ${product.title} au panier`}
              className="absolute bottom-3 right-3 z-10 flex size-11 items-center justify-center rounded-full bg-ink text-cream transition-all duration-300 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 hover:bg-gold-dark"
            >
              <Plus className="size-4" />
            </button>
          )}
        </div>
      </Link>
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-wider text-ink-soft">{categoryLabel(product)}</p>
        <Link href={`/produits/${product.handle}`} className="font-display text-lg leading-snug hover:text-gold-dark transition-colors">
          {product.title}
        </Link>
        {defaultVariant && (
          <p className="text-sm font-medium mt-0.5">
            <Price amount={defaultVariant.price.amount} vatRate={product.vatRate} />
            {defaultVariant.title !== "Default Title" && <span className="text-ink-soft"> / {defaultVariant.title}</span>}
          </p>
        )}
      </div>
    </div>
  );
}
