"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { SHOPIFY_AMOUNT_UNIT } from "@/lib/b2b";
import { STANDARD_SHIPPING_LABEL } from "@/lib/shipping";
import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CompanyFields } from "@/components/cart/company-fields";

const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export default function PanierPage() {
  const {
    lines,
    subtotalHT,
    subtotalTTC,
    remainingForFreeShipping,
    hasUnavailableLines,
    checkout,
    checkingOut,
    checkoutError,
  } = useCart();

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-16 min-h-[60vh]">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Votre panier</h1>

      {lines.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ink-soft mb-6">Votre panier est vide.</p>
          <Button asChild className="rounded-sm min-h-11">
            <Link href="/collections/thes">Découvrir nos thés</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_360px] gap-12">
          <div>
            <ul className="flex flex-col divide-y divide-cream-line">
              {lines.map((line) => (
                <CartLineItem key={line.variantId} line={line} size="large" />
              ))}
            </ul>
            <Link
              href="/collections/thes"
              className="inline-flex min-h-11 items-center text-sm text-ink-soft underline underline-offset-4 hover:text-ink"
            >
              Continuer mes achats
            </Link>
          </div>

          <aside className="bg-cream-card border border-cream-line rounded p-6 h-fit md:sticky md:top-44">
            <h2 className="font-display text-2xl mb-4">Résumé</h2>
            <CompanyFields idPrefix="panier" className="mb-6 pb-6 border-b border-cream-line" />
            <div className="flex justify-between text-sm mb-2">
              <span className="text-ink-soft">Sous-total HT</span>
              <span>{formatter.format(subtotalHT)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-ink-soft">TVA (ajoutée au paiement)</span>
              <span>{formatter.format(subtotalTTC - subtotalHT)}</span>
            </div>
            <div className="flex justify-between gap-4 text-sm mb-1">
              <span className="text-ink-soft">Livraison</span>
              <span className="text-right">
                {remainingForFreeShipping > 0 ? `À partir de ${STANDARD_SHIPPING_LABEL}` : "Offerte"}
              </span>
            </div>
            {remainingForFreeShipping > 0 && (
              <p className="text-xs text-ink-soft mb-4">
                Plus que {formatter.format(remainingForFreeShipping)} {SHOPIFY_AMOUNT_UNIT} pour la livraison offerte.
              </p>
            )}
            <div className="flex justify-between font-display text-xl mt-4 mb-1 pt-4 border-t border-cream-line">
              <span>Total TTC</span>
              <span>{formatter.format(subtotalTTC)}</span>
            </div>
            <p className="text-xs text-ink-soft mb-6">Hors frais de livraison, calculés à l&apos;étape suivante.</p>
            {checkoutError && (
              <p role="alert" className="text-xs text-terracotta mb-3">
                {checkoutError}
              </p>
            )}
            <Button
              size="lg"
              className="w-full rounded-sm gap-2 min-h-11"
              onClick={checkout}
              disabled={checkingOut || hasUnavailableLines}
            >
              <Lock className="size-4" /> {checkingOut ? "Redirection..." : "Paiement sécurisé Shopify"}
            </Button>
          </aside>
        </div>
      )}
    </main>
  );
}
