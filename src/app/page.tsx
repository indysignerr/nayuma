import { Hero } from "@/components/sections/hero";
import { QuizTeaser } from "@/components/sections/quiz-teaser";
import { FineTeaSection } from "@/components/sections/fine-tea-section";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { BombayDelightPromo } from "@/components/sections/bombay-delight-promo";
import { ChristmasBanner } from "@/components/sections/christmas-banner";
import { getChristmasProducts } from "@/lib/shopify/products";
import { UniversesBand } from "@/components/sections/universes-band";
import { EditorialGuide } from "@/components/sections/editorial-guide";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { Reassurance } from "@/components/sections/reassurance";
import { Reviews } from "@/components/sections/reviews";
import { InstagramTeaser } from "@/components/sections/instagram-teaser";
import { Newsletter } from "@/components/sections/newsletter";

export default async function Home() {
  const christmas = await getChristmasProducts();

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <ChristmasBanner count={christmas.length} />
      <BombayDelightPromo />
      <QuizTeaser />
      <FineTeaSection />
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
