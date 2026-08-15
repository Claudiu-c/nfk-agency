import Reveal from "../Reveal/Reveal";
import styles from "./WhatWeDo.module.scss";

const services = [
  {
    number: "01",
    title: "Representation",
    description:
      "Building careers through thoughtful management, personal relationships and opportunities across the region.",
  },
  {
    number: "02",
    title: "Casting",
    description:
      "Connecting clients with the right models and talent for fashion, advertising and commercial productions.",
  },
  {
    number: "03",
    title: "Production Support",
    description:
      "Supporting productions across Kuwait and the GCC, from casting and coordination to the final shoot.",
  },
];

export default function WhatWeDo() {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.header}>
            <span className={styles.index}>03 — What We Do</span>
            <p className={styles.intro}>
              Representation built around people, projects and long-term
              relationships.
            </p>
          </div>
        </Reveal>

        <div className={styles.services}>
          {services.map((service, index) => (
            <Reveal key={service.number} delay={index * 100}>
              <div className={styles.service}>
                <span className={styles.number}>{service.number}</span>
                <h2 className={styles.title}>{service.title}</h2>
                <p className={styles.description}>{service.description}</p>
                <span className={styles.arrow} aria-hidden="true">
                  ↘
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
