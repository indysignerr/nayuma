"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Plus, Star, Truck, Thermometer, Timer } from "lucide-react";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/shopify/format";
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
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { addLine } = useCart();

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

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
          <Image src={product.images[activeImage].url} alt={product.images[activeImage].altText} fill className="object-cover" priority />
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
        <p className="text-xs uppercase tracking-wider text-ink-soft mb-2">{categoryLabel(product.category, product.line)}</p>
        <h1 className="font-display text-4xl mb-3">{product.title}</h1>
        <div className="flex items-center gap-1.5 text-sm text-ink-soft mb-5">
          <Star className="size-4 fill-gold text-gold" />
          <span>{product.rating}</span>
          <span>({product.reviewCount} avis)</span>
        </div>
        <p className="font-display text-3xl mb-6">{formatMoney(variant.price)}</p>

        {product.variants.length > 1 && (
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-ink-soft mb-3">Format</p>
            <div className="flex gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVariantId(v.id)}
                  className={`px-4 py-2 text-sm rounded-sm border transition-colors ${
                    v.id === variantId ? "border-ink bg-ink text-cream" : "border-cream-line hover:border-ink"
                  }`}
                >
                  {v.format}
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
          <Button size="lg" className="flex-1 rounded-sm" onClick={() => addLine(product, variant, quantity)}>
            Ajouter au panier
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
          {product.preparation && (
            <AccordionItem value="preparation">
              <AccordionTrigger>Préparation</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-6 text-ink-soft mb-2">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="size-4" /> {product.preparation.temperatureC}°C
                  </span>
                  {product.preparation.minutesMax > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Timer className="size-4" /> {product.preparation.minutesMin}–{product.preparation.minutesMax} min
                    </span>
                  )}
                </div>
                <p className="text-ink-soft leading-relaxed">{product.preparation.advice}</p>
              </AccordionContent>
            </AccordionItem>
          )}
          <AccordionItem value="actifs">
            <AccordionTrigger>Actifs</AccordionTrigger>
            <AccordionContent className="text-ink-soft leading-relaxed">{product.actifs}</AccordionContent>
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

      <StickyAddToCart
        product={product}
        variant={variant}
        visible={showSticky}
        onAdd={() => addLine(product, variant, quantity)}
      />
    </div>
  );
}
