"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Coffee, Minus, Plus, Truck } from "lucide-react";
import type { Product } from "@/lib/shopify/types";
import { costPerCup, variantWeightKg } from "@/lib/b2b";
import { Price } from "@/components/ui/price";
import { categoryLabel, ACCENT_BG } from "@/lib/accent";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { StickyAddToCart } from "@/components/product/sticky-add-to-cart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { addLine } = useCart();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const image = product.images[activeImage] ?? product.images[0];
  const weightKg = variant ? variantWeightKg(variant.title) : null;
  const serving =
    variant && weightKg && product.dosage ? costPerCup(Number(variant.price.amount), weightKg, product.dosage) : null;

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-[1240px] px-6 py-12 grid md:grid-cols-2 gap-12">
      <div>
        <div className="relative aspect-square rounded-sm overflow-hidden bg-cream-card border border-cream-line mb-4">
          <span className={`absolute inset-x-0 top-0 h-1 z-10 ${ACCENT_BG[product.accent]}`} aria-hidden />
          {product.fineTea && (
            <span className="absolute top-4 left-4 z-10 bg-ink text-cream text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm">
              Fine Tea
            </span>
          )}
          {image && <Image src={image.url} alt={image.altText ?? product.title} fill className="object-cover" priority />}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`size-16 rounded-sm overflow-hidden border transition-colors ${i === activeImage ? "border-gold" : "border-cream-line"}`}
              >
                <Image src={img.url} alt="" width={64} height={64} className="size-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-ink-soft mb-2">{categoryLabel(product)}</p>
        <h1 className="font-display text-4xl mb-3">{product.title}</h1>
        {variant && (
          <p className="font-display text-3xl mb-6">
            <Price amount={variant.price.amount} vatRate={product.vatRate} detailed />
          </p>
        )}

        {product.variants.length === 1 && variant && variant.title !== "Default Title" && (
          <p className="text-sm text-ink-soft mb-6">
            <span className="text-xs uppercase tracking-widest mr-2">Format</span>
            {variant.title}
          </p>
        )}

        {serving && weightKg && (
          <p className="flex items-start gap-2 text-sm text-ink-soft mb-6">
            <Coffee className="size-4 mt-0.5 text-gold-dark shrink-0" aria-hidden />
            <span>
              Environ <Price amount={serving.perCup} vatRate={product.vatRate} className="font-medium text-ink" /> la
              tasse, soit ~{Math.round(serving.cups / 10) * 10} tasses de {serving.cupMl} ml par{" "}
              {weightKg === 1 ? "kg" : `${weightKg.toLocaleString("fr-FR")} kg`} au dosage conseillé.
            </span>
          </p>
        )}

        {product.variants.length > 1 && (
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-ink-soft mb-3">Format</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  disabled={!v.availableForSale}
                  className={`px-4 py-2 text-sm rounded-sm border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                    v.id === variantId ? "border-ink bg-ink text-cream" : "border-cream-line hover:border-ink"
                  }`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={ctaRef} className="flex items-center gap-4 mb-8">
          <div className="flex items-center border border-cream-line rounded-sm">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="size-11 flex items-center justify-center hover:bg-cream-deep">
              <Minus className="size-3.5" />
            </button>
            <span className="w-10 text-center text-sm">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="size-11 flex items-center justify-center hover:bg-cream-deep">
              <Plus className="size-3.5" />
            </button>
          </div>
          <Button
            size="lg"
            className="flex-1 rounded-sm"
            disabled={!variant || !variant.availableForSale}
            onClick={() => variant && addLine(product, variant, quantity)}
          >
            {variant?.availableForSale === false ? "Épuisé" : "Ajouter au panier"}
          </Button>
        </div>

        <p className="flex items-center gap-2 text-xs text-ink-soft mb-8">
          <Truck className="size-4" /> Livraison offerte dès 49€ d&apos;achat
        </p>

        <Accordion type="single" collapsible defaultValue="description">
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} className="prose-sm text-ink-soft leading-relaxed [&_p]:mb-3" />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="livraison">
            <AccordionTrigger>Livraison</AccordionTrigger>
            <AccordionContent className="text-ink-soft leading-relaxed">
              Expédition sous 24h ouvrées. Livraison offerte dès 49€ d&apos;achat, sinon 4,90€. Livraison standard 2 à
              4 jours ouvrés.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {variant && (
        <StickyAddToCart
          product={product}
          variant={variant}
          visible={showSticky}
          onAdd={() => addLine(product, variant, quantity)}
        />
      )}
    </div>
  );
}
