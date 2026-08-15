import Link from "next/link";
import Reveal from "../Reveal/Reveal";
import styles from "./AboutNFK.module.scss";

export default function AboutNFK() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.inner}>
        <div className={styles.top}>
          <span className={styles.index}>03 — About</span>
          <span className={styles.location}>Kuwait — GCC</span>
        </div>

        <div className={styles.content}>
          <Reveal>
            <h2 className={styles.title}>
              <span>Based in Kuwait</span>
              <span>Connected to</span>
              <span>the region.</span>
            </h2>
          </Reveal>

          <Reveal delay={180}>
            <div className={styles.side}>
              <p className={styles.description}>
                NFK is a model and talent agency representing international
                faces for fashion, advertising and commercial productions across
                the region.
              </p>

              <Link href="/about" className={styles.link}>
                Discover the agency
                <span aria-hidden="true">{"\u2198\uFE0E"}</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className={styles.bottom}>
            <span>Models</span>
            <span>Talent</span>
            <span>Fashion</span>
            <span>Commercial</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
