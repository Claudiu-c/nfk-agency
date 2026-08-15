import Link from "next/link";

import { models } from "@/data/models";
import ModelCard from "@/components/ModelCard/ModelCard";
import Reveal from "../Reveal/Reveal";

import styles from "./InTown.module.scss";

export default function InTown() {
  const inTownModels = models
    .filter((model) => model.category === "in-town")
    .slice(0, 4);

  if (inTownModels.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} data-header-theme="dark">
      <div className={styles.inner}>
        <div className={styles.header}>
          <Reveal>
            <div className={styles.heading}>
              <span className={styles.index}>02</span>
              <h2 className={styles.title}>In Town</h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className={styles.description}>
              Models currently in town and available for local productions,
              campaigns and bookings.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <Link href="/models?category=in-town" className={styles.viewAll}>
              View all in town
              <span aria-hidden="true">↘</span>
            </Link>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {inTownModels.map((model, index) => (
            <Reveal key={model.id} delay={index * 80}>
              <ModelCard model={model} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
