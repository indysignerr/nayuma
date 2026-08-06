"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, User, ShoppingBag } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { AnnouncementBar } from "./announcement-bar";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { SearchOverlay } from "./search-overlay";
import { NAV_ITEMS } from "@/lib/nav-config";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function Header() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { totalQuantity, openCart } = useCart();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleEnter(index: number) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIndex(index);
    setSearchOpen(false);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpenIndex(null), 150);
  }

  const activeItem = openIndex !== null ? NAV_ITEMS[openIndex] : null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-cream/95 backdrop-blur-sm transition-shadow",
        scrolled && "shadow-[0_1px_0_0_var(--color-cream-line)]"
      )}
      onMouseLeave={handleLeave}
    >
      <AnnouncementBar />
      <div className="relative">
        <div className="mx-auto max-w-[1240px] px-6 h-20 grid grid-cols-3 items-center">
          <div className="flex items-center -ml-2.5">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden size-11 flex items-center justify-center"
              aria-label="Ouvrir le menu"
            >
              <Menu className="size-5" />
            </button>
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="hidden lg:flex size-11 items-center justify-center"
              aria-label="Rechercher"
              aria-expanded={searchOpen}
            >
              <Search className="size-5" />
            </button>
          </div>

          <Link href="/" className="flex justify-center text-ink" aria-label="NAYUMA — Tea & Mood">
            <Image src="/images/logo-nayuma.svg" alt="NAYUMA — Tea & Mood" width={200} height={65} priority className="h-12 md:h-14 w-auto" />
          </Link>

          <div className="flex items-center justify-end -mr-2.5">
            <button onClick={() => setSearchOpen((v) => !v)} className="lg:hidden size-11 flex items-center justify-center" aria-label="Rechercher">
              <Search className="size-5" />
            </button>
            <Link href="/compte" className="hidden sm:flex size-11 items-center justify-center" aria-label="Mon compte">
              <User className="size-5" />
            </Link>
            <button onClick={openCart} className="relative size-11 flex items-center justify-center" aria-label="Voir le panier">
              <ShoppingBag className="size-5" />
              {totalQuantity > 0 && (
                <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-terracotta text-cream text-[10px]">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="hidden lg:block border-t border-cream-line">
          <ul className="mx-auto max-w-[1240px] px-6 flex items-center justify-center gap-8 h-12">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.label} onMouseEnter={() => handleEnter(index)}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm tracking-wide transition-colors hover:text-gold-dark",
                    item.accentClass,
                    openIndex === index && "text-gold-dark"
                  )}
                  aria-expanded={openIndex === index}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <AnimatePresence>
          {activeItem?.columns && (
            <div onMouseEnter={() => handleEnter(openIndex!)}>
              <MegaMenu item={activeItem} onNavigate={() => setOpenIndex(null)} />
            </div>
          )}
        </AnimatePresence>

        <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}
