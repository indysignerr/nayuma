import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProductByHandle, getRelatedProducts } from "@/lib/shopify/products";
import { ProductDetail } from "@/components/product/product-detail";
import { CrossSell } from "@/components/product/cross-sell";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.handle }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
    openGraph: { title: product.title, description: product.description },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images.map((i) => i.url),
            brand: { "@type": "Brand", name: product.vendor },
            offers: product.variants.map((v) => ({
              "@type": "Offer",
              price: v.price.amount,
              priceCurrency: v.price.currencyCode,
              availability: v.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            })),
          }),
        }}
      />
      <ProductDetail product={product} />
      <CrossSell products={related} />
    </main>
  );
}
