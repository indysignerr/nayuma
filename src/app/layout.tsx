import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { IntroAnimation } from "@/components/layout/intro-animation";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nayumatea.com"),
  title: {
    default: "NAYUMA — Tea & Mood | Infusions capillaires & rituels de bien-être",
    template: "%s | NAYUMA Tea & Mood",
  },
  description:
    "Découvrez NAYUMA, infusions botaniques et cosmétiques pensés pour la santé du cheveu et le bien-être féminin. Rituels ciblés, échantillons offerts et livraison gratuite dès 49€.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "NAYUMA Tea & Mood",
    title: "NAYUMA — Tea & Mood",
    description: "Infusions capillaires et rituels de bien-être féminin, formulés avec exigence.",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#18140d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${workSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-ink font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NAYUMA Tea & Mood",
              url: "https://nayumatea.com",
              logo: "https://nayumatea.com/images/logo-nayuma.svg",
              sameAs: [],
            }),
          }}
        />
        <CartProvider>
          <IntroAnimation />
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
