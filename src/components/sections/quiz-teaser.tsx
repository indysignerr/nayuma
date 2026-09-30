import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function QuizTeaser() {
  return (
    <section className="bg-orange text-ink">
      <ScrollReveal className="mx-auto max-w-[1240px] px-6 py-10 md:py-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-orange" aria-hidden>
          <Sparkles className="size-6" />
        </span>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.25em] mb-2">Le quiz NAYUMA</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight">Vous ne savez pas quel thé choisir ?</h2>
          <p className="text-sm mt-2">Répondez à 4 questions, on vous recommande les thés faits pour vous.</p>
        </div>
        <Link
          href="/quiz"
          className="inline-flex min-h-12 items-center justify-center gap-2 self-start md:self-auto rounded-sm bg-ink px-7 text-sm font-medium text-cream hover:bg-ink-soft transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Faire le quiz <ArrowRight className="size-4" aria-hidden />
        </Link>
      </ScrollReveal>
    </section>
  );
}
