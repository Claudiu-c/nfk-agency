import Link from "next/link";
import Reveal from "../Reveal/Reveal";
import styles from "./AboutCTA.module.scss";

export default function AboutCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.top}>
            <span className={styles.index}>05 — Work With Us</span>
            <span className={styles.location}>NFK Agency</span>
          </div>
        </Reveal>

        <div className={styles.content}>
          <Reveal>
            <h2 className={styles.title}>
              <span>Ready to</span>
              <span>work with us?</span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className={styles.side}>
              <p className={styles.description}>
                Whether you&apos;re an experienced model, emerging talent or
                looking to take your first step into the industry, we&apos;d
                like to hear from you.
              </p>

              <Link href="/join" className={styles.link}>
                Apply to NFK
                <span aria-hidden="true">{"\u2197\uFE0E"}</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
