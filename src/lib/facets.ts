export const SELECTION_LABELS: Record<string, string> = {
  "best-sellers": "Best-sellers",
  bio: "Bio",
  "grand-cru": "Grand cru",
};

export function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}
