"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { NavItem } from "@/lib/nav-config";
import { getProductByHandle } from "@/lib/shopify/products";
import { formatMoney } from "@/lib/shopify/format";

export function MegaMenu({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  if (!item.columns) return null;
  const featured = (item.featuredHandles ?? []).map(getProductByHandle).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
      className="absolute inset-x-0 top-full bg-cream-card border-b border-cream-line shadow-lg z-30"
    >
      <div className="mx-auto max-w-[1240px] px-6 py-8 grid grid-cols-[1fr_1fr_1fr_1fr_1.1fr] gap-8">
        {item.columns.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] uppercase tracking-widest text-ink-soft mb-3">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={onNavigate} className="text-sm hover:text-gold-dark transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {featured.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {featured.map((p) => (
              <Link key={p!.handle} href={`/produits/${p!.handle}`} onClick={onNavigate} className="group">
                <div className="relative aspect-square rounded-sm overflow-hidden bg-cream border border-cream-line">
                  <Image
                    src={p!.images[0].url}
                    alt={p!.images[0].altText}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs mt-2 group-hover:text-gold-dark transition-colors">{p!.title}</p>
                <p className="text-xs text-ink-soft">{formatMoney(p!.variants[0].price)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
