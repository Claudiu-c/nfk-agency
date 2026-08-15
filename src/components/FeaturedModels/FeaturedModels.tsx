import Link from "next/link";

import { models } from "@/data/models";
import ModelCard from "../ModelCard/ModelCard";
import Reveal from "../Reveal/Reveal";

import styles from "./FeaturedModels.module.scss";

export default function FeaturedModels() {
  const featuredModels = models.slice(0, 3);

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <span className={styles.index}>01</span>
            <Reveal>
              <h2 className={styles.title}>Selected Models</h2>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Link href="/models" className={styles.viewAll}>
              View all models
              <span aria-hidden="true">↘</span>
            </Link>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {featuredModels.map((model, index) => (
            <Reveal key={model.id} delay={index * 100}>
              <ModelCard model={model} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
