import type { Metadata } from "next";
import { TeaQuiz } from "@/components/quiz/tea-quiz";

export const metadata: Metadata = {
  title: "Trouvez votre thé idéal",
  description: "Répondez à 4 questions pour découvrir les thés NAYUMA qui vous correspondent le mieux.",
};

export default function QuizPage() {
  return (
    <main className="min-h-[70vh]">
      <TeaQuiz />
    </main>
  );
}
