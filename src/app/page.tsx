import { Hero } from "@/components/sections/hero";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { UniversesBand } from "@/components/sections/universes-band";
import { SisterBrand } from "@/components/sections/sister-brand";
import { IngredientsStory } from "@/components/sections/ingredients-story";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { Reassurance } from "@/components/sections/reassurance";
import { Reviews } from "@/components/sections/reviews";
import { InstagramTeaser } from "@/components/sections/instagram-teaser";
import { Newsletter } from "@/components/sections/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <UniversesBand />
      <SisterBrand />
      <IngredientsStory />
      <JournalTeaser />
      <Reassurance />
      <Reviews />
      <InstagramTeaser />
      <Newsletter />
    </>
  );
}
