import FeaturedModels from "@/components/FeaturedModels/FeaturedModels";
import Hero from "@/components/Hero/Hero";
import InTown from "@/components/InTown/InTown";
import AboutNFK from "@/components/AboutNFK/AboutNFK";
import JoinAgency from "@/components/JoinAgency/JoinAgency";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "NFK Agency | International Models & Talent",
  },

  description:
    "NFK Agency represents international models and talent across Kuwait and the GCC.",

  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedModels />
      <InTown />
      <AboutNFK />
      <JoinAgency />
    </main>
  );
}
