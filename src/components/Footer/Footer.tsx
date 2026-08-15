import Link from "next/link";
import Reveal from "../Reveal/Reveal";
import styles from "./Footer.module.scss";
import BackToTop from "../BackToTop/BackToTop";

const navigation = [
  {
    label: "Models",
    href: "/models",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Join",
    href: "/join",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer} data-header-theme="dark">
      <div className={styles.inner}>
        <div className={styles.top}>
          <span className={styles.index}>Contact</span>
          <span className={styles.location}>Kuwait — GCC</span>
        </div>

        <div className={styles.main}>
          <Reveal>
            <h2 className={styles.title}>
              <span>Book.</span>
              <span>Cast.</span>
              <span>Connect.</span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className={styles.links}>
              <div className={styles.navigation}>
                <span className={styles.label}>Navigate</span>

                <nav className={styles.nav} aria-label="Footer navigation">
                  {navigation.map((item) => (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className={styles.contact}>
                <span className={styles.label}>Connect</span>

                <div className={styles.contactLinks}>
                  <a
                    href="https://www.instagram.com/nfkagency/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram {"\u2197\uFE0E"}
                  </a>

                  <a href="mailto:agency.nfk@gmail.com">
                    Email {"\u2197\uFE0E"}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className={styles.bottom}>
          <span className={styles.brand}>NFK Agency</span>
          <span className={styles.copyright}>© 2026 NFK Agency</span>
          <BackToTop className={styles.backToTop} />
        </div>
      </div>
    </footer>
  );
}
