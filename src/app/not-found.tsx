import Link from "next/link";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <main className={styles.page} data-header-theme="dark">
      <div className={styles.inner}>
        <div className={styles.top}>
          <span className={styles.index}>404</span>
          <span className={styles.label}>NFK Agency — Kuwait</span>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            Page not
            <span>found.</span>
          </h1>

          <div className={styles.side}>
            <p>
              The page you&apos;re looking for doesn&apos;t exist or may have
              moved.
            </p>

            <Link href="/" className={styles.link}>
              Back to home
              <span aria-hidden="true">{"\u2198\uFE0E"}</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
