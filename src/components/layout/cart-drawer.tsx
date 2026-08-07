"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export function CartDrawer() {
  const { isOpen, closeCart, openCart, lines, subtotal, freeShippingThreshold, remainingForFreeShipping, updateQuantity, removeLine } =
    useCart();

  const progress = Math.min(100, ((freeShippingThreshold - remainingForFreeShipping) / freeShippingThreshold) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetContent side="right" className="w-full sm:max-w-md gap-0 bg-cream-card">
        <SheetHeader className="border-b border-cream-line px-5 py-4">
          <SheetTitle className="font-display text-2xl">Votre panier</SheetTitle>
        </SheetHeader>

        <div className="px-5 py-4 border-b border-cream-line">
          <p className="text-xs text-ink-soft mb-2">
            {remainingForFreeShipping > 0 ? (
              <>
                Plus que <strong className="text-ink">{formatter.format(remainingForFreeShipping)}</strong> pour la
                livraison offerte
              </>
            ) : (
              <span className="text-tone-sauge font-medium">Livraison offerte débloquée ✓</span>
            )}
          </p>
          <div className="h-1.5 w-full rounded-full bg-cream-deep overflow-hidden">
            <div
              className="h-full bg-gold-dark transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-ink-soft py-8 text-center">Votre panier est vide pour l&apos;instant.</p>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((line) => (
                <li key={line.variantId} className="flex gap-3">
                  <div className="size-16 shrink-0 rounded overflow-hidden bg-cream border border-cream-line">
                    <Image src={line.image} alt={line.title} width={64} height={64} className="size-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">{line.title}</p>
                      <button
                        onClick={() => removeLine(line.variantId)}
                        aria-label={`Retirer ${line.title} du panier`}
                        className="text-ink-soft hover:text-terracotta transition-colors shrink-0"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <p className="text-xs text-ink-soft mt-0.5">{line.format}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-cream-line rounded">
                        <button
                          onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
                          aria-label="Diminuer la quantité"
                          className="size-7 flex items-center justify-center hover:bg-cream-deep transition-colors"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{line.quantity}</span>
                        <button
                          onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
                          aria-label="Augmenter la quantité"
                          className="size-7 flex items-center justify-center hover:bg-cream-deep transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-medium">{formatter.format(line.unitAmount * line.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <SheetFooter className="border-t border-cream-line px-5 py-4 gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">Sous-total</span>
            <span className="font-display text-xl">{formatter.format(subtotal)}</span>
          </div>
          <Button asChild size="lg" disabled={lines.length === 0} className="w-full rounded-sm">
            <Link href="/panier">Passer commande</Link>
          </Button>
          <button onClick={closeCart} className="text-xs text-center text-ink-soft hover:text-ink underline underline-offset-4">
            Continuer mes achats
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
