import Reveal from "../Reveal/Reveal";
import styles from "./Region.module.scss";

const regions = [
  {
    number: "01",
    name: "Kuwait",
  },
  {
    number: "02",
    name: "United Arab Emirates",
  },
  {
    number: "03",
    name: "Saudi Arabia",
  },
  {
    number: "04",
    name: "Qatar",
  },
  {
    number: "05",
    name: "Bahrain",
  },
  {
    number: "06",
    name: "Oman",
  },
];

export default function Region() {
  return (
    <section className={styles.section} data-header-theme="dark">
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.top}>
            <span className={styles.index}>04 — Region</span>
            <span className={styles.location}>GCC</span>
          </div>
        </Reveal>

        <div className={styles.intro}>
          <Reveal>
            <h2 className={styles.title}>
              <span>Working</span>
              <span>across the</span>
              <span>region.</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className={styles.description}>
              Connecting international talent with clients and productions
              throughout the Gulf.
            </p>
          </Reveal>
        </div>

        <div className={styles.list}>
          {regions.map((region, index) => (
            <Reveal key={region.number} delay={index * 60}>
              <div className={styles.region}>
                <span className={styles.regionName}>{region.name}</span>
                <span className={styles.regionNumber}>{region.number}</span>
                <span className={styles.arrow} aria-hidden="true">
                  {"\u2198\uFE0E"}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
