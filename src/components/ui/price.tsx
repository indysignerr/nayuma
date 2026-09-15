"use client";

import { amountHT } from "@/lib/b2b";
import { useCustomerMode } from "@/lib/customer-mode";

const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

/** Prix saisi TTC dans Shopify, affiché HT quand le visiteur est en mode Pro. */
export function Price({
  amount,
  vatRate,
  detailed = false,
  className,
}: {
  amount: number | string;
  vatRate: number;
  detailed?: boolean;
  className?: string;
}) {
  const { isPro } = useCustomerMode();
  const ttc = Number(amount);
  const suffixClass = detailed ? "ml-2 font-body text-sm tracking-wider text-ink-soft" : undefined;

  if (!isPro || vatRate === 0) {
    return (
      <span className={className}>
        {formatter.format(ttc)}
        {detailed && vatRate > 0 && <span className={suffixClass}>TTC</span>}
      </span>
    );
  }

  return (
    <span className={className}>
      {formatter.format(amountHT(ttc, vatRate))}
      <span className={suffixClass}> HT</span>
      {detailed && (
        <span className="block mt-1 font-body text-sm text-ink-soft">
          {formatter.format(ttc)} TTC · TVA {(vatRate * 100).toLocaleString("fr-FR")} %
        </span>
      )}
    </span>
  );
}
