"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { companyErrors, type CompanyInfo } from "@/lib/b2b";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const FIELDS: { key: keyof CompanyInfo; label: string; autoComplete: string; placeholder?: string }[] = [
  { key: "name", label: "Raison sociale", autoComplete: "organization" },
  { key: "siret", label: "SIRET", autoComplete: "off", placeholder: "14 chiffres" },
  { key: "vatNumber", label: "N° TVA intracommunautaire", autoComplete: "off", placeholder: "FR12345678901" },
];

/** Infos société (facultatives) transmises à Shopify avec la commande. */
export function CompanyFields({ idPrefix, className }: { idPrefix: string; className?: string }) {
  const { company, setCompany } = useCart();
  const hasValues = Boolean(company.name || company.siret || company.vatNumber);
  const [open, setOpen] = useState(hasValues);
  const [touched, setTouched] = useState<Partial<Record<keyof CompanyInfo, boolean>>>({});

  const errors = companyErrors(company);
  const panelId = `${idPrefix}-company-panel`;

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open || hasValues}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-sm"
      >
        <span>
          <span className="block font-medium">Commande professionnelle ?</span>
          <span className="block text-xs text-ink-soft">Ajoutez vos informations société pour la facture</span>
        </span>
        <ChevronDown className={cn("size-4 shrink-0 transition-transform", (open || hasValues) && "rotate-180")} />
      </button>

      <div id={panelId} hidden={!(open || hasValues)} className="mt-3 flex flex-col gap-3">
        {FIELDS.map((field) => {
          const id = `${idPrefix}-${field.key}`;
          const error = touched[field.key] ? errors[field.key] : undefined;
          return (
            <div key={field.key} className="flex flex-col gap-1">
              <label htmlFor={id} className="text-xs text-ink-soft">
                {field.label}
              </label>
              <input
                id={id}
                value={company[field.key]}
                onChange={(e) => setCompany((prev) => ({ ...prev, [field.key]: e.target.value }))}
                onBlur={() => setTouched((prev) => ({ ...prev, [field.key]: true }))}
                autoComplete={field.autoComplete}
                inputMode={field.key === "siret" ? "numeric" : undefined}
                placeholder={field.placeholder}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className="h-11 rounded-sm border border-cream-line bg-cream px-3 text-sm outline-none transition-colors placeholder:text-ink-soft/60 focus-visible:border-ink aria-invalid:border-terracotta"
              />
              {error && (
                <p id={`${id}-error`} className="text-xs text-terracotta">
                  {error}
                </p>
              )}
            </div>
          );
        })}
        <p className="text-[11px] leading-relaxed text-ink-soft">
          Facultatif. Ces informations accompagnent votre commande pour établir la facture au nom de votre société.
        </p>
      </div>
    </div>
  );
}
