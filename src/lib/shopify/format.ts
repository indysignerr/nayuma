import type { Money } from "./types";

const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatMoney(money: Money): string {
  return formatter.format(Number(money.amount));
}
