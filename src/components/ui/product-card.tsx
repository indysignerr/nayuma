"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/shopify/format";
import { ACCENT_BG, categoryLabel } from "@/lib/accent";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addLine } = useCart();
  const defaultVariant = product.variants[0];

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
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addLine(product, defaultVariant);
            }}
            aria-label={`Ajouter ${product.title} au panier`}
            className="absolute bottom-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-ink text-cream opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 hover:bg-gold-dark"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </Link>
      <div className="mt-3 flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-wider text-ink-soft">{categoryLabel(product.universe, product.type)}</p>
        <Link href={`/produits/${product.handle}`} className="font-display text-lg leading-snug hover:text-gold-dark transition-colors">
          {product.title}
        </Link>
        <div className="flex items-center gap-1 text-xs text-ink-soft">
          <Star className="size-3 fill-gold text-gold" />
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
        <p className="text-sm font-medium mt-0.5">
          {formatMoney(defaultVariant.price)}
          {defaultVariant.weight !== "Unique" && <span className="text-ink-soft"> / {defaultVariant.weight}</span>}
        </p>
      </div>
    </div>
  );
}
