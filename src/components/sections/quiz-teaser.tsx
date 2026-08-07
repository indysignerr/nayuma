import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function QuizTeaser() {
  return (
    <section className="bg-ink text-cream">
      <ScrollReveal className="mx-auto max-w-[1240px] px-6 py-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <Sparkles className="size-5 text-gold-light shrink-0" />
        <p className="text-sm">
          Vous ne savez pas quel thé choisir ?{" "}
          <span className="text-cream/70">Répondez à 4 questions, on s&apos;occupe du reste.</span>
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4 text-gold-light hover:text-cream transition-colors shrink-0"
        >
          Faire le quiz <ArrowRight className="size-4" />
        </Link>
      </ScrollReveal>
    </section>
  );
}
