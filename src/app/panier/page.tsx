"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export default function PanierPage() {
  const { lines, subtotal, updateQuantity, removeLine } = useCart();

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-16 min-h-[60vh]">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Votre panier</h1>

      {lines.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ink-soft mb-6">Votre panier est vide.</p>
          <Button asChild className="rounded-sm">
            <Link href="/collections/thes">Découvrir nos thés</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_360px] gap-12">
          <ul className="flex flex-col divide-y divide-cream-line">
            {lines.map((line) => (
              <li key={line.variantId} className="flex gap-4 py-6">
                <div className="size-24 shrink-0 rounded overflow-hidden bg-cream-card border border-cream-line">
                  <Image src={line.image} alt={line.title} width={96} height={96} className="size-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{line.title}</p>
                      <p className="text-sm text-ink-soft">{line.weight}</p>
                    </div>
                    <button onClick={() => removeLine(line.variantId)} className="text-ink-soft hover:text-terracotta">
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 border border-cream-line rounded">
                      <button onClick={() => updateQuantity(line.variantId, line.quantity - 1)} className="size-8 flex items-center justify-center hover:bg-cream-deep">
                        <Minus className="size-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button onClick={() => updateQuantity(line.variantId, line.quantity + 1)} className="size-8 flex items-center justify-center hover:bg-cream-deep">
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <span className="font-medium">{formatter.format(line.unitAmount * line.quantity)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="bg-cream-card border border-cream-line rounded p-6 h-fit sticky top-28">
            <h2 className="font-display text-2xl mb-4">Résumé</h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-ink-soft">Sous-total</span>
              <span>{formatter.format(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-ink-soft">Livraison</span>
              <span>{subtotal >= 49 ? "Offerte" : "Calculée à l'étape suivante"}</span>
            </div>
            <div className="flex justify-between font-display text-xl mb-6 pt-4 border-t border-cream-line">
              <span>Total</span>
              <span>{formatter.format(subtotal)}</span>
            </div>
            <Button size="lg" className="w-full rounded-sm gap-2" disabled>
              <Lock className="size-4" /> Paiement sécurisé Shopify
            </Button>
            <p className="text-xs text-ink-soft mt-3 text-center">
              Le checkout Shopify sera activé dès la connexion de la boutique à l&apos;API Storefront.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
