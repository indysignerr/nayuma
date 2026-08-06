import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductByHandle, getRelatedProducts } from "@/lib/shopify/products";
import { ProductDetail } from "@/components/product/product-detail";
import { CrossSell } from "@/components/product/cross-sell";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.handle }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductByHandle(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.shortDescription,
    openGraph: { title: product.title, description: product.shortDescription },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductByHandle(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.shortDescription,
            image: product.images.map((i) => `https://nayumatea.com${i.url}`),
            brand: { "@type": "Brand", name: "NAYUMA" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
            offers: product.variants.map((v) => ({
              "@type": "Offer",
              price: v.price.amount,
              priceCurrency: v.price.currencyCode,
              availability: v.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              sku: v.sku,
            })),
          }),
        }}
      />
      <ProductDetail product={product} />
      <CrossSell products={related} />
    </main>
  );
}
