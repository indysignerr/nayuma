import { amountHT } from "@/lib/b2b";

const formatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

/** Prix affiché hors taxes. La TVA est ajoutée au paiement. */
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
  const ht = amountHT(Number(amount), vatRate);
  const suffixClass = detailed ? "ml-2 font-body text-sm tracking-wider text-ink-soft" : undefined;

  if (vatRate === 0) {
    return <span className={className}>{formatter.format(ht)}</span>;
  }

  return (
    <span className={className}>
      {formatter.format(ht)}
      <span className={suffixClass}> HT</span>
      {detailed && (
        <span className="block mt-1 font-body text-sm text-ink-soft">
          + TVA {(vatRate * 100).toLocaleString("fr-FR")} % ajoutée au paiement
        </span>
      )}
    </span>
  );
}
