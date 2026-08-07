import type { Metadata } from "next";
import { TeaQuiz } from "@/components/quiz/tea-quiz";

export const metadata: Metadata = {
  title: "Trouvez votre rituel idéal",
  description: "Répondez à 2 questions pour découvrir le rituel NAYUMA qui vous correspond le mieux.",
};

export default function QuizPage() {
  return (
    <main className="min-h-[70vh]">
      <TeaQuiz />
    </main>
  );
}
