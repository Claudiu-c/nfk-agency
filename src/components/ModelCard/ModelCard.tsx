import Image from "next/image";
import Link from "next/link";

import type { Model } from "@/types/model";

import styles from "./ModelCard.module.scss";

type ModelCardProps = {
  model: Model;
};

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <Link
      href={`/models/${model.slug}`}
      className={styles.card}
      prefetch={false}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={model.coverImage}
          alt={model.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />

        <div className={styles.overlay} />

        <span className={styles.view}>View profile {"\u2197\uFE0E"}</span>
      </div>

      <div className={styles.meta}>
        <h3 className={styles.name}>{model.name}</h3>
        {model.measurements?.height && (
          <span className={styles.height}>{model.measurements.height}</span>
        )}
      </div>
    </Link>
  );
}
