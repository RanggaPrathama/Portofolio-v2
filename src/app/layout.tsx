import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import LightRaysWrapper from "@/components/light-rays-wrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Rangga Prathama",
    "Fullstack Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "AI Enthusiast",
    "Portfolio",
    "Surabaya",
    "React",
    "Next.js",
  ],
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${DATA.name} — ${DATA.description}`,
      },
    ],
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
  twitter: {
    title: `${DATA.name}`,
    description: DATA.description,
    card: "summary_large_image",
    images: ["/og.png"],
  },
  verification: {
    google: "",
    yandex: "",
  },
};

// Structured data injected into <head> for rich snippets.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: DATA.name,
      description: DATA.description,
      url: DATA.url,
    },
    {
      "@type": "Person",
      name: DATA.name,
      url: DATA.url,
      jobTitle: DATA.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: DATA.location,
      },
      knowsAbout: DATA.skills,
      sameAs: Object.values(DATA.contact.social)
        .map((s) => s.url)
        .filter((u) => u.startsWith("http")),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6 overflow-x-hidden",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <LightRaysWrapper />

            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
