"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Product, WeightVariant } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/shopify/format";
import { Button } from "@/components/ui/button";

export function StickyAddToCart({
  product,
  variant,
  visible,
  onAdd,
}: {
  product: Product;
  variant: WeightVariant;
  visible: boolean;
  onAdd: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: shouldReduceMotion ? 0 : 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: shouldReduceMotion ? 0 : 80, opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
          className="fixed bottom-0 inset-x-0 z-40 bg-cream-card border-t border-cream-line shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
        >
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 h-[72px] flex items-center gap-3 sm:gap-4">
            <div className="size-11 shrink-0 rounded-sm overflow-hidden bg-cream border border-cream-line hidden xs:block sm:block">
              <Image src={product.images[0].url} alt="" width={44} height={44} className="size-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{product.title}</p>
              <p className="text-xs text-ink-soft">
                {formatMoney(variant.price)}
                {variant.weight !== "Unique" && <span> / {variant.weight}</span>}
              </p>
            </div>
            <Button onClick={onAdd} className="rounded-sm shrink-0">
              Ajouter au panier
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
