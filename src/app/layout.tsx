import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.scss";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nfkagency.com"),

  title: {
    default: "NFK Agency | International Models & Talent",
    template: "%s | NFK Agency",
  },

  description:
    "NFK Agency represents international models and talent across Kuwait and the GCC.",

  applicationName: "NFK Agency",

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NFK Agency",
    title: "NFK Agency | International Models & Talent",
    description:
      "NFK Agency represents international models and talent across Kuwait and the GCC.",
  },

  twitter: {
    card: "summary_large_image",
    title: "NFK Agency | International Models & Talent",
    description:
      "NFK Agency represents international models and talent across Kuwait and the GCC.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top" className={`${cormorant.variable} ${inter.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
