import type { Metadata } from "next";
import "./globals.css";

const WHATSAPP_NUMBER = "919876543210"; // Sample: replace with real number
const SITE_URL = "https://rjpowersolutions.in";

export const metadata: Metadata = {
  title: {
    default: "RJ Power Solutions – Solar Installation in Indore, MP",
    template: "%s | RJ Power Solutions",
  },
  description:
    "RJ Power Solutions is Indore's trusted solar EPC company offering residential, commercial, and industrial solar installation. Get free consultation and save up to 90% on electricity bills.",
  keywords: [
    "Solar Installation Indore",
    "Solar Company Indore",
    "Rooftop Solar Indore",
    "Solar Panel Installation",
    "Commercial Solar Installation",
    "Residential Solar Solutions",
    "Solar EPC Company",
    "Solar Maintenance Services",
    "Solar Indore Madhya Pradesh",
    "Net Metering Indore",
  ],
  authors: [{ name: "RJ Power Solutions" }],
  creator: "RJ Power Solutions",
  publisher: "RJ Power Solutions",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "RJ Power Solutions",
    title: "RJ Power Solutions – Solar Installation Indore",
    description:
      "Professional solar installation services in Indore, MP. Residential, commercial, and industrial solar solutions. 500+ installations. Free consultation.",
    images: [
      {
        url: "/hero-solar.png",
        width: 1200,
        height: 630,
        alt: "RJ Power Solutions – Solar Installation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RJ Power Solutions – Solar Installation Indore",
    description:
      "Professional solar installation in Indore, MP. Save up to 90% on electricity.",
    images: ["/hero-solar.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RJ Power Solutions",
  description:
    "Solar EPC company offering residential, commercial, and industrial solar installation in Indore, Madhya Pradesh.",
  url: SITE_URL,
  telephone: "+91-98765-43210",
  email: "info@rjpowersolutions.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123, Solar Street, Vijay Nagar",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452010",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.7196,
    longitude: 75.8577,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
  },
  sameAs: [
    "https://wa.me/" + WHATSAPP_NUMBER,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
