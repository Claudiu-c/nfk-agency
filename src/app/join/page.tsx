import type { Metadata } from "next";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./Join.module.scss";
import JoinForm from "./JoinForm";

export const metadata: Metadata = {
  title: "Join",

  description:
    "Apply to join NFK Agency and submit your details, portfolio and experience for consideration.",

  alternates: {
    canonical: "/join",
  },
};

export default function JoinPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} data-header-theme="dark">
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <span>01 — Join</span>
            <span>NFK Agency</span>
          </div>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span>Become</span>
              <span>part of</span>
              <span>NFK.</span>
            </h1>

            <div className={styles.heroSide}>
              <span className={styles.heroLabel}>Applications</span>
              <p>
                We&apos;re always interested in discovering new models and
                talent. Introduce yourself and take the first step toward
                joining NFK.
              </p>

              <span className={styles.heroRegion}>Kuwait — GCC</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.application} data-header-theme="light">
        <div className={styles.applicationInner}>
          <Reveal>
            <div className={styles.applicationHeader}>
              <span className={styles.index}>02 — Application</span>
              <p>
                Complete the form below and tell us a little about yourself.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <JoinForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
