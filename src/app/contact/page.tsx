import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./Contact.module.scss";

export const metadata: Metadata = {
  title: "Contact",

  description:
    "Contact NFK Agency for model bookings, casting and collaborations across Kuwait and the GCC.",

  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} data-header-theme="dark">
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <span>01 — Contact</span>
            <span>Kuwait — GCC</span>
          </div>

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span>Let&apos;s</span>
              <span>work</span>
              <span>together.</span>
            </h1>

            <div className={styles.heroSide}>
              <span className={styles.heroLabel}>Get in touch</span>

              <p>
                For bookings, collaborations and general enquiries, contact the
                NFK team directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contact} data-header-theme="light">
        <div className={styles.contactInner}>
          <Reveal>
            <div className={styles.contactHeader}>
              <span className={styles.index}>02 — Connect</span>
              <p>
                Model bookings, casting and collaborations across Kuwait and the
                GCC.
              </p>
            </div>
          </Reveal>

          <div className={styles.contactList}>
            <Reveal>
              <a
                href="mailto:agency.nfk@gmail.com"
                className={`${styles.contactItem} ${styles.contactItemLink}`}
                aria-label="Email NFK Agency"
              >
                <span className={styles.number}>01</span>

                <div className={styles.itemContent}>
                  <span className={styles.label}>
                    Bookings & collaborations
                  </span>

                  <span className={styles.value}>agency.nfk@gmail.com</span>
                </div>

                <span className={styles.arrow} aria-hidden="true">
                  {"\u2197\uFE0E"}
                </span>
              </a>
            </Reveal>

            <Reveal delay={80}>
              <a
                href="https://www.instagram.com/nfkagency/"
                target="_blank"
                rel="noreferrer"
                className={`${styles.contactItem} ${styles.contactItemLink}`}
                aria-label="Open NFK Agency on Instagram"
              >
                <span className={styles.number}>02</span>

                <div className={styles.itemContent}>
                  <span className={styles.label}>Instagram</span>

                  <span className={styles.value}>@nfkagency</span>
                </div>

                <span className={styles.arrow} aria-hidden="true">
                  {"\u2197\uFE0E"}
                </span>
              </a>
            </Reveal>

            <Reveal delay={160}>
              <div className={styles.contactItem}>
                <span className={styles.number}>03</span>
                <div className={styles.itemContent}>
                  <span className={styles.label}>Based in</span>
                  <span className={styles.value}>Kuwait — GCC</span>
                </div>
                <span className={styles.arrowMuted} aria-hidden="true">
                  —
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className={styles.join}>
              <span className={styles.joinLabel}>
                Looking to join the agency?
              </span>
              <Link href="/join" className={styles.joinLink}>
                Apply to NFK
                <span aria-hidden="true">{"\u2197\uFE0E"}</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
