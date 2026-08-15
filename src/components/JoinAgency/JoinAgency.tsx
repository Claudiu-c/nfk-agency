import Image from "next/image";
import Link from "next/link";
import { models } from "@/data/models";
import Reveal from "../Reveal/Reveal";
import styles from "./JoinAgency.module.scss";

export default function JoinAgency() {
  const featuredModel = models.find((model) => model.slug === "ula");

  if (!featuredModel) {
    return null;
  }

  const image = featuredModel.gallery[0];

  return (
    <section className={styles.section} data-header-theme="dark">
      <div className={styles.inner}>
        <div className={styles.top}>
          <span className={styles.index}>04 — Join</span>
          <span className={styles.location}>NFK Agency</span>
        </div>

        <div className={styles.content}>
          <Reveal>
            <div className={styles.imageWrapper}>
              <Image
                src={image.src}
                alt={`${featuredModel.name} — NFK Agency`}
                width={image.width}
                height={image.height}
                sizes="(max-width: 768px) 100vw, 45vw"
                className={styles.image}
              />

              <span className={styles.imageCaption}>{featuredModel.name}</span>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className={styles.info}>
              <p className={styles.eyebrow}>Become part of NFK</p>

              <h2 className={styles.title}>
                <span>Want to</span>
                <span>work with</span>
                <span>us?</span>
              </h2>

              <div className={styles.bottom}>
                <p className={styles.description}>
                  We&apos;re always interested in discovering new models and
                  talent. Introduce yourself and take the first step toward
                  joining NFK.
                </p>

                <Link href="/join" className={styles.cta}>
                  Apply to NFK
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
