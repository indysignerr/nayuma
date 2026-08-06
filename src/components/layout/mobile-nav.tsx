"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { NAV_ITEMS } from "@/lib/nav-config";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-sm gap-0 bg-cream-card">
        <SheetHeader className="border-b border-cream-line px-5 py-4">
          <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <Accordion type="single" collapsible>
            {NAV_ITEMS.map((item) =>
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
