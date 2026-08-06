"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getAllProducts } from "@/lib/shopify/products";
import { formatMoney } from "@/lib/shopify/format";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return getAllProducts()
      .filter((p) => p.title.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-x-0 top-full bg-cream-card border-b border-cream-line shadow-lg z-40"
        >
          <div className="mx-auto max-w-[1240px] px-6 py-6">
            <div className="flex items-center gap-3 border-b border-cream-line pb-3">
              <Search className="size-4 text-ink-soft shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un thé, une infusion, un coffret…"
                className="flex-1 bg-transparent outline-none font-display text-xl placeholder:text-ink-soft/60"
              />
              <button onClick={onClose} aria-label="Fermer la recherche" className="text-ink-soft hover:text-ink">
                <X className="size-5" />
              </button>
            </div>
            {results.length > 0 && (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
                {results.map((p) => (
                  <li key={p.handle}>
                    <Link href={`/produits/${p.handle}`} onClick={onClose} className="flex items-center gap-3 group">
                      <div className="size-14 rounded-sm overflow-hidden bg-cream border border-cream-line shrink-0">
                        <Image src={p.images[0].url} alt="" width={56} height={56} className="size-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm group-hover:text-gold-dark transition-colors">{p.title}</p>
                        <p className="text-xs text-ink-soft">{formatMoney(p.variants[0].price)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {query.trim().length >= 2 && results.length === 0 && (
              <p className="text-sm text-ink-soft mt-5">Aucun résultat pour « {query} ».</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
