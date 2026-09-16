"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart, type CartLine } from "@/lib/cart-context";
import { VAT_FOOD } from "@/lib/b2b";
import { sizedImageUrl } from "@/lib/shopify/format";
import { Price } from "@/components/ui/price";
import { cn } from "@/lib/utils";

/** Ligne de panier partagée entre le tiroir et la page /panier. */
export function CartLineItem({
  line,
  size = "compact",
  onNavigate,
}: {
  line: CartLine;
  size?: "compact" | "large";
  onNavigate?: () => void;
}) {
  const { updateQuantity, removeLine } = useCart();
  const large = size === "large";
  const unavailable = line.available === false;

  return (
    <li className={cn("flex", large ? "gap-4 py-6" : "gap-3")}>
      <Link
        href={`/produits/${line.productHandle}`}
        onClick={onNavigate}
        tabIndex={-1}
        aria-hidden
        className={cn(
          "shrink-0 rounded overflow-hidden border border-cream-line",
          large ? "size-24 bg-cream-card" : "size-16 bg-cream",
          unavailable && "opacity-50"
        )}
      >
        {line.image && (
          <Image
            src={sizedImageUrl(line.image, large ? 200 : 140)}
            alt=""
            width={large ? 96 : 64}
            height={large ? 96 : 64}
            className="size-full object-cover"
          />
        )}
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/produits/${line.productHandle}`}
              onClick={onNavigate}
              className={cn("block leading-tight hover:text-gold-dark transition-colors", large ? "font-medium" : "text-sm font-medium")}
            >
              {line.title}
            </Link>
            <p className={cn("text-ink-soft mt-0.5", large ? "text-sm" : "text-xs")}>{line.variantTitle}</p>
            {unavailable && (
              <p className="text-xs text-terracotta mt-1">Plus disponible : retirez-le pour continuer.</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeLine(line.variantId)}
            aria-label={`Retirer ${line.title} du panier`}
            className="-mr-3 -mt-3 size-11 shrink-0 flex items-center justify-center text-ink-soft hover:text-terracotta transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mt-2">
          <div className="flex items-center border border-cream-line rounded">
            <button
              type="button"
              onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
              aria-label={line.quantity === 1 ? `Retirer ${line.title} du panier` : "Diminuer la quantité"}
              className="size-11 flex items-center justify-center hover:bg-cream-deep transition-colors"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
              <span className="sr-only">Quantité : </span>
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
              disabled={unavailable}
              aria-label="Augmenter la quantité"
              className="size-11 flex items-center justify-center hover:bg-cream-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="size-3" />
            </button>
          </div>
          <Price
            amount={line.unitAmount * line.quantity}
            vatRate={line.vatRate ?? VAT_FOOD}
            className={cn("font-medium", !large && "text-sm")}
          />
        </div>
      </div>
    </li>
  );
}
