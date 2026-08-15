import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { models } from "@/data/models";
import ModelGallery from "@/components/ModelGallery/ModelGallery";

import styles from "./ModelProfile.module.scss";

type ModelPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return models.map((model) => ({
    slug: model.slug,
  }));
}

export async function generateMetadata({
  params,
}: ModelPageProps): Promise<Metadata> {
  const { slug } = await params;

  const model = models.find((model) => model.slug === slug);

  if (!model) {
    return {
      title: "Model Not Found",
    };
  }

  const description = `${model.name} is represented by NFK Agency, an international models and talent agency based in Kuwait and working across the GCC.`;

  return {
    title: model.name,

    description,

    alternates: {
      canonical: `/models/${model.slug}`,
    },

    openGraph: {
      type: "profile",
      title: `${model.name} | NFK Agency`,
      description,
      url: `/models/${model.slug}`,
      images: [
        {
          url: model.coverImage,
          alt: `${model.name} — NFK Agency`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${model.name} | NFK Agency`,
      description,
      images: [model.coverImage],
    },
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { slug } = await params;

  const model = models.find((model) => model.slug === slug);

  if (!model) {
    notFound();
  }

  return (
    <main>
      <section className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <Link href="/models" className={styles.back}>
              ← All Models
            </Link>

            <span className={styles.category}>
              {model.category.replace("-", " ")}
            </span>
          </div>

          <div className={styles.hero}>
            <div className={styles.info}>
              <h1 className={styles.name}>{model.name}</h1>

              {model.measurements && (
                <dl className={styles.measurements}>
                  {model.measurements.height && (
                    <div>
                      <dt>Height</dt>
                      <dd>{model.measurements.height}</dd>
                    </div>
                  )}

                  {model.measurements.bust && (
                    <div>
                      <dt>Bust</dt>
                      <dd>{model.measurements.bust}</dd>
                    </div>
                  )}

                  {model.measurements.waist && (
                    <div>
                      <dt>Waist</dt>
                      <dd>{model.measurements.waist}</dd>
                    </div>
                  )}

                  {model.measurements.hips && (
                    <div>
                      <dt>Hips</dt>
                      <dd>{model.measurements.hips}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>

            <div className={styles.imageWrapper}>
              <Image
                src={model.coverImage}
                alt={model.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <ModelGallery modelName={model.name} images={model.gallery.slice(1)} />
    </main>
  );
}
