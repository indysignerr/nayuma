import { Hero } from "@/components/sections/hero";
import { QuizTeaser } from "@/components/sections/quiz-teaser";
import { FineTeaSection } from "@/components/sections/fine-tea-section";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { UniversesBand } from "@/components/sections/universes-band";
import { EditorialGuide } from "@/components/sections/editorial-guide";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { Reassurance } from "@/components/sections/reassurance";
import { Reviews } from "@/components/sections/reviews";
import { InstagramTeaser } from "@/components/sections/instagram-teaser";
import { Newsletter } from "@/components/sections/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <QuizTeaser />
      <FineTeaSection />
      <FeaturedProducts />
      <UniversesBand />
      <EditorialGuide />
      <JournalTeaser />
      <Reassurance />
      <Reviews />
      <InstagramTeaser />
      <Newsletter />
    </>
  );
}
