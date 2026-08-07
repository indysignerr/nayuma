"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { QUIZ_STEPS, getRecommendations, type QuizAnswers } from "@/lib/quiz";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";

export function TeaQuiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();

  const isDone = stepIndex >= QUIZ_STEPS.length;
  const step = QUIZ_STEPS[stepIndex];

  const recommendations = useMemo(() => (isDone ? getRecommendations(answers) : []), [isDone, answers]);

  function selectAnswer(key: (typeof QUIZ_STEPS)[number]["key"], value: string) {
    setDirection(1);
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStepIndex((i) => i + 1);
  }

  function goBack() {
    setDirection(-1);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function restart() {
    setDirection(-1);
    setAnswers({});
    setStepIndex(0);
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: shouldReduceMotion ? 0 : dir * 24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: shouldReduceMotion ? 0 : dir * -24 }),
  };

  if (isDone) {
    return (
      <div className="mx-auto max-w-[900px] px-6 py-16 md:py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4 text-center">Votre résultat</p>
        <h1 className="font-display text-3xl md:text-4xl text-center mb-3">Notre sélection pour vous</h1>
        <p className="text-sm text-ink-soft text-center max-w-md mx-auto mb-10">
          D&apos;après vos réponses, voici les thés qui devraient vous correspondre le mieux.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {recommendations.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={restart} variant="outline" className="rounded-sm gap-2">
            <RotateCcw className="size-4" /> Refaire le quiz
          </Button>
          <Link href="/collections/thes" className="text-sm underline underline-offset-4 hover:text-gold-dark transition-colors">
            Voir toute la collection →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[640px] px-6 py-16 md:py-24">
      <div className="flex items-center gap-3 mb-10">
        {stepIndex > 0 ? (
          <button onClick={goBack} aria-label="Question précédente" className="size-9 flex items-center justify-center -ml-2">
            <ArrowLeft className="size-4" />
          </button>
        ) : (
          <div className="size-9" />
        )}
        <div className="flex-1 h-1 rounded-full bg-cream-deep overflow-hidden">
          <div
            className="h-full bg-gold-dark transition-all duration-500"
            style={{ width: `${(stepIndex / QUIZ_STEPS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-ink-soft w-10 text-right">
          {stepIndex + 1}/{QUIZ_STEPS.length}
        </span>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step.key}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
        >
          <h1 className="font-display text-2xl md:text-3xl mb-8 text-center">{step.question}</h1>
          <div className="grid sm:grid-cols-2 gap-3">
            {step.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => selectAnswer(step.key, opt.value)}
                className="text-left px-5 py-4 rounded-sm border border-cream-line bg-cream-card hover:border-gold hover:bg-cream transition-colors text-sm font-medium"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
