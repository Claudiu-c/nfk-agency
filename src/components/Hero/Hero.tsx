"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";

type HeroImageVariant = {
  src: string;
  width: number;
  height: number;
  position?: string;
};

type HeroImage = {
  desktop: HeroImageVariant;
  mobile: HeroImageVariant;
  alt: string;
};

const heroImages: HeroImage[] = [
  {
    desktop: {
      src: "/images/hero/hero-01-desktop.webp",
      width: 2200,
      height: 1206,
      position: "center",
    },
    mobile: {
      src: "/images/hero/hero-01-mobile.webp",
      width: 2000,
      height: 3000,
    },
    alt: "NFK Agency model",
  },
  {
    desktop: {
      src: "/images/hero/hero-02-desktop-v2.webp",
      width: 2200,
      height: 1467,
      position: "center 20%",
    },
    mobile: {
      src: "/images/hero/hero-02-mobile-v3.jpg",
      width: 1350,
      height: 1772,
    },
    alt: "NFK Agency model",
  },
  {
    desktop: {
      src: "/images/hero/hero-03-desktop.webp",
      width: 2200,
      height: 1467,
      position: "center",
    },
    mobile: {
      src: "/images/hero/hero-03-mobile.webp",
      width: 2185,
      height: 3000,
    },
    alt: "NFK Agency model",
  },
  {
    desktop: {
      src: "/images/hero/hero-04-desktop.webp",
      width: 2200,
      height: 1467,
      position: "center",
    },
    mobile: {
      src: "/images/hero/hero-04-mobile.webp",
      width: 2000,
      height: 3000,
    },
    alt: "NFK Agency model",
  },
];

type HeroSlideProps = {
  image: (typeof heroImages)[number];
  first: boolean;
};

function HeroSlideImage({ image, first }: HeroSlideProps) {
  const common = {
    alt: image.alt,
    sizes: "100vw",
    quality: 75,
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: image.desktop.src,
    width: image.desktop.width,
    height: image.desktop.height,
    loading: first ? "eager" : "lazy",
  });

  const {
    props: { srcSet: mobileSrcSet, ...mobileProps },
  } = getImageProps({
    ...common,
    src: image.mobile.src,
    width: image.mobile.width,
    height: image.mobile.height,
    loading: first ? "eager" : "lazy",
  });

  return (
    <picture
      className={styles.picture}
      style={
        {
          "--desktop-position": image.desktop.position ?? "center",
          "--mobile-position": image.mobile.position ?? "center",
        } as React.CSSProperties
      }
    >
      <source media="(min-width: 769px)" srcSet={desktopSrcSet} />

      <source media="(max-width: 768px)" srcSet={mobileSrcSet} />

      <img
        {...mobileProps}
        className={styles.image}
        fetchPriority={first ? "high" : "auto"}
      />
    </picture>
  );
}

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className={styles.hero} data-header-theme="dark">
      <div className={`${styles.media} ${styles.heroImage}`}>
        {heroImages.map((image, index) => (
          <div
            key={image.desktop.src}
            className={`${styles.slide} ${
              index === activeImage ? styles.slideActive : ""
            }`}
          >
            <HeroSlideImage image={image} first={index === 0} />
          </div>
        ))}

        <div className={styles.counter}>
          <span>{(activeImage + 1).toString().padStart(2, "0")}</span>

          <span>/</span>

          <span>{heroImages.length.toString().padStart(2, "0")}</span>
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.top}>
          <p className={`${styles.eyebrow} ${styles.heroEyebrow}`}>
            NFK Agency - Kuwait
          </p>
        </div>

        <div className={styles.content}>
          <h1 className={`${styles.title} ${styles.heroTitle}`}>
            International
            <span>Models & Talent</span>
          </h1>
        </div>

        <div className={`${styles.bottom} ${styles.heroBottom}`}>
          <p className={styles.description}>
            Representing international models and talent across Kuwait and the
            GCC.
          </p>

          <Link href="/models" className={styles.link}>
            Explore Models
            <span aria-hidden="true">↘</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
