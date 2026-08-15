import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal/Reveal";
import { models } from "@/data/models";
import styles from "./About.module.scss";
import WhatWeDo from "@/components/WhatWeDo/WhatWeDo";
import Region from "@/components/Region/Region";
import AboutCTA from "@/components/AboutCTA/AboutCTA";

export const metadata: Metadata = {
  title: "About",

  description:
    "Learn more about NFK Agency, an international models and talent agency based in Kuwait and connected across the GCC.",

  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const editorialModel =
    models.find((model) => model.gallery.length >= 10) ?? models[0];

  const editorialImage = editorialModel.gallery[3] ?? editorialModel.gallery[0];

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-header-theme="dark">
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <span>01 — About</span>
            <span>Kuwait — GCC</span>
          </div>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span>International</span>
              <span>representation</span>
              <span>from Kuwait.</span>
            </h1>

            <div className={styles.heroSide}>
              <span className={styles.heroIndex}>NFK Agency</span>
              <p>
                Connecting international models, talent and clients across
                fashion, advertising and commercial productions in the Gulf
                region.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.story} data-header-theme="light">
        <div className={styles.storyInner}>
          <Reveal className={styles.storyLabel}>
            <span className={styles.storyIndex}>02 — The Agency</span>
          </Reveal>

          <Reveal className={styles.imageReveal}>
            <div className={styles.imageWrapper}>
              <Image
                src={editorialImage.src}
                alt={`${editorialModel.name} — NFK Agency`}
                width={editorialImage.width}
                height={editorialImage.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />

              <span className={styles.imageCaption}>{editorialModel.name}</span>
            </div>
          </Reveal>

          <div className={styles.storyContent}>
            <Reveal delay={100}>
              <h2 className={styles.storyTitle}>
                More than
                <span>a roster.</span>
              </h2>
            </Reveal>

            <Reveal delay={180}>
              <div className={styles.storyText}>
                <p>
                  NFK is a model and talent agency based in Kuwait, representing
                  international faces for clients across fashion, advertising
                  and commercial productions.
                </p>
                <p>
                  Our approach is built around strong representation, personal
                  relationships and connecting the right talent with the right
                  opportunities across the region.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <WhatWeDo />
      <Region />
      <AboutCTA />
    </main>
  );
}
