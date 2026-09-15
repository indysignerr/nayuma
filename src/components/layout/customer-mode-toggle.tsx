"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCustomerMode, type CustomerMode } from "@/lib/customer-mode";
import { cn } from "@/lib/utils";

const OPTIONS: { value: CustomerMode; label: string }[] = [
  { value: "particulier", label: "Particulier" },
  { value: "pro", label: "Pro · HT" },
];

export function CustomerModeToggle({ className, layoutId }: { className?: string; layoutId: string }) {
  const { mode, setMode } = useCustomerMode();
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="radiogroup"
      aria-label="Affichage des prix"
      className={cn("flex items-center rounded-full border border-cream-line p-0.5", className)}
    >
      {OPTIONS.map((option) => {
        const active = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setMode(option.value)}
            className={cn(
              "relative min-h-10 rounded-full px-3 text-xs tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark",
              active ? "text-cream" : "text-ink-soft hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                aria-hidden
                className="absolute inset-0 rounded-full bg-ink"
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative whitespace-nowrap">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function ProModeButton({ className }: { className?: string }) {
  const { isPro, setMode } = useCustomerMode();

  return (
    <button
      type="button"
      aria-pressed={isPro}
      onClick={() => setMode(isPro ? "particulier" : "pro")}
      className={cn(
        "inline-flex min-h-11 items-center rounded-sm border border-ink px-5 text-sm transition-colors hover:bg-ink hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark",
        className
      )}
    >
      {isPro ? "Prix HT affichés ✓" : "Afficher les prix HT"}
    </button>
  );
}
