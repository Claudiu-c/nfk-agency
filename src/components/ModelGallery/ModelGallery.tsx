import Image from "next/image";

import type { ModelImage } from "@/types/model";

import styles from "./ModelGallery.module.scss";

type ModelGalleryProps = {
  modelName: string;
  images: ModelImage[];
};

export default function ModelGallery({ modelName, images }: ModelGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section className={styles.gallery}>
      <div className={styles.header}>
        <span className={styles.index}>01</span>

        <h2 className={styles.title}>Portfolio</h2>

        <span className={styles.count}>
          {images.length.toString().padStart(2, "0")} Images
        </span>
      </div>

      <div className={styles.grid}>
        {images.map((image, index) => {
          const aspectRatio = image.width / image.height;
          const isWide = aspectRatio >= 1.35;

          return (
            <div
              key={image.src}
              className={`${styles.item} ${isWide ? styles.landscape : ""}`}
            >
              <Image
                src={image.src}
                alt={`${modelName} portfolio ${index + 1}`}
                width={image.width}
                height={image.height}
                sizes={isWide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                className={styles.image}
                loading="eager"
                quality={90}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
