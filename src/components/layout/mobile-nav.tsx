"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NAV_ITEMS } from "@/lib/nav-config";
import { Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-sm gap-0 bg-cream-card">
        <SheetHeader className="border-b border-cream-line px-5 py-4">
          <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <div className="px-3 pt-2 pb-4 border-b border-cream-line flex flex-col gap-2">
            <Link
              href="/professionnels"
              onClick={() => onOpenChange(false)}
              className="flex flex-col items-center justify-center min-h-12 rounded-sm bg-ink text-cream px-4 py-2"
            >
              <span className="text-sm font-medium uppercase tracking-wider">Espace professionnels</span>
              <span className="text-xs text-orange">Payez à 60 jours</span>
            </Link>
            <Link
              href="/quiz"
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-center gap-2 min-h-11 rounded-sm border border-ink px-4 text-sm"
            >
              <Sparkles className="size-4 text-orange-dark" aria-hidden /> Quel thé pour moi ? Faire le quiz
            </Link>
          </div>
          <Accordion type="single" collapsible>
            {NAV_ITEMS.filter((item) => item.href !== "/quiz").map((item) =>
              item.columns ? (
                <AccordionItem key={item.label} value={item.label} className="border-cream-line">
                  <AccordionTrigger className={cn("px-3 text-base", item.accentClass)}>{item.label}</AccordionTrigger>
                  <AccordionContent className="px-3">
                    <div className="flex flex-col gap-4">
                      {item.columns.map((col) => (
                        <div key={col.title}>
                          <p className="text-[11px] uppercase tracking-widest text-ink-soft mb-2">{col.title}</p>
                          <ul className="flex flex-col gap-2">
                            {col.links.map((link) => (
                              <li key={link.href}>
                                <Link href={link.href} onClick={() => onOpenChange(false)} className="text-sm">
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div key={item.label} className="border-b border-cream-line">
                  <Link
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className={cn("flex px-3 py-4 text-base", item.accentClass)}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            )}
          </Accordion>
          <a href="tel:+33620149060" className="flex items-center gap-2 px-3 py-4 text-base">
            <Phone className="size-4 text-gold-dark" aria-hidden /> 06 20 14 90 60
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
