"use client";

import { Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useCustomerMode } from "@/lib/customer-mode";
import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CompanyFields } from "@/components/cart/company-fields";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    openCart,
    lines,
    subtotal,
    subtotalHT,
    freeShippingThreshold,
    remainingForFreeShipping,
    hasUnavailableLines,
    checkout,
    checkingOut,
    checkoutError,
  } = useCart();
  const { isPro } = useCustomerMode();

  const progress = Math.min(100, ((freeShippingThreshold - remainingForFreeShipping) / freeShippingThreshold) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetContent side="right" className="w-full sm:max-w-md gap-0 bg-cream-card">
        <SheetHeader className="border-b border-cream-line px-5 py-4">
          <SheetTitle className="font-display text-2xl">Votre panier</SheetTitle>
        </SheetHeader>

        {lines.length > 0 && (
          <div className="px-5 py-4 border-b border-cream-line">
            <p className="text-xs text-ink-soft mb-2" aria-live="polite">
              {remainingForFreeShipping > 0 ? (
                <>
                  Plus que{" "}
                  <strong className="text-ink">
                    {formatter.format(remainingForFreeShipping)}
                    {isPro && " TTC"}
                  </strong>{" "}
                  pour la livraison offerte
                </>
              ) : (
                <span className="text-tea-green font-medium">Livraison offerte débloquée ✓</span>
              )}
            </p>
            <div
              role="progressbar"
              aria-label="Progression vers la livraison offerte"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              className="h-1.5 w-full rounded-full bg-cream-deep overflow-hidden"
            >
              <div className="h-full bg-gold-dark transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-sm text-ink-soft py-8 text-center">Votre panier est vide pour l&apos;instant.</p>
          ) : (
            <>
              <ul className="flex flex-col gap-5">
                {lines.map((line) => (
                  <CartLineItem key={line.variantId} line={line} onNavigate={closeCart} />
                ))}
              </ul>
              <CompanyFields idPrefix="drawer" className="mt-6 pt-5 border-t border-cream-line" />
            </>
          )}
        </div>

        <SheetFooter className="border-t border-cream-line px-5 py-4 gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-soft">{isPro ? "Sous-total HT" : "Sous-total"}</span>
            <span className="font-display text-xl">{formatter.format(isPro ? subtotalHT : subtotal)}</span>
          </div>
          {isPro && <p className="-mt-2 text-right text-xs text-ink-soft">soit {formatter.format(subtotal)} TTC</p>}
          {checkoutError && (
            <p role="alert" className="text-xs text-terracotta">
              {checkoutError}
            </p>
          )}
          <Button
            size="lg"
            disabled={lines.length === 0 || checkingOut || hasUnavailableLines}
            onClick={checkout}
            className="w-full rounded-sm gap-2 min-h-11"
          >
            <Lock className="size-4" /> {checkingOut ? "Redirection..." : "Passer commande"}
          </Button>
          <button
            type="button"
            onClick={closeCart}
            className="min-h-11 text-xs text-center text-ink-soft hover:text-ink underline underline-offset-4"
          >
            Continuer mes achats
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
