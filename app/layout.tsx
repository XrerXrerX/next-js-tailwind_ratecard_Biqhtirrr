/** @format */

import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "andienads_real – TikTok Influencer & KOL Ratecard | Brand Collaboration Indonesia",
  description:
    "Andien (@andienads_real) adalah TikTok KOL & beauty lifestyle influencer Indonesia dengan 223K+ followers dan 11.6M likes. Lihat ratecard, paket kolaborasi brand, dan statistik audiens untuk kemitraan influencer marketing.",
  keywords: [
    "influencer ratecard",
    "KOL Indonesia",
    "TikTok influencer Indonesia",
    "beauty lifestyle influencer",
    "brand collaboration Indonesia",
    "jasa endorsement TikTok",
    "influencer marketing Indonesia",
    "biqhtirrr",
    "KOL ratecard",
    "harga endorsement TikTok",
    "content creator Indonesia",
    "TikTok KOL beauty",
    "influencer beauty lifestyle",
    "ratecard influencer 2025",
    "KOL brand partnership",
  ],
  authors: [{ name: "Andien", url: "https://www.tiktok.com/@andienads_real" }],
  creator: "Andien (@andienads_real)",
  metadataBase: new URL("https://biqhtirrr.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    locale: "id_ID",
    url: "https://biqhtirrr.com",
    siteName: "Biqhtirrr – KOL Ratecard",
    title: "andienads_real – TikTok KOL & Brand Collaboration Ratecard Indonesia",
    description:
      "Kolaborasi brand bersama Andien (@andienads_real), TikTok KOL beauty & lifestyle Indonesia. 217K followers, 11.6M likes, audiens 96.9% Indonesia. Cek ratecard & paket endorsement.",
    images: [
      {
        url: "/image.jpg",
        width: 800,
        height: 800,
        alt: "Andien @andienads_real – TikTok KOL Beauty Lifestyle Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "andienads_real – TikTok KOL Ratecard | Brand Collaboration Indonesia",
    description:
      "Andien (@andienads_real) TikTok KOL beauty & lifestyle – 217K followers, 11.6M likes. Tersedia paket kolaborasi brand mulai Rp 2.650.000.",
    images: ["/image.jpg"],
    creator: "@andienads_real",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Andien",
              alternateName: "@andienads_real",
              description:
                "TikTok KOL & Content Creator spesialis Beauty dan Lifestyle di Indonesia dengan 217K+ followers.",
              url: "https://biqhtirrr.com",
              image: "https://biqhtirrr.com/image.jpg",
              sameAs: [
                "https://www.tiktok.com/@andienads_real",
                "https://www.instagram.com/andienads",
              ],
              jobTitle: "TikTok KOL & Content Creator",
              knowsAbout: ["Beauty", "Lifestyle", "Content Creation", "Influencer Marketing"],
              address: {
                "@type": "PostalAddress",
                addressCountry: "ID",
              },
              offers: {
                "@type": "Offer",
                name: "Brand Collaboration & Endorsement Packages",
                description:
                  "Paket kolaborasi brand untuk TikTok content: Single Video, Triple Video, Fifth Video, dan Custom Package.",
                priceCurrency: "IDR",
                price: "2250000",
                url: "https://biqhtirrr.com",
              },
            }),
          }}
        />
      </head>
      <body className={plusJakartaSans.className}>
        {children}
        <script async src="https://www.tiktok.com/embed.js"></script>
      </body>
    </html>
  );
}
