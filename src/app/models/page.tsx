import Link from "next/link";

import { models } from "@/data/models";
import ModelCard from "@/components/ModelCard/ModelCard";
import type { ModelCategory, ModelGender } from "@/types/model";
import ModelSearch from "@/components/ModelSearch/ModelSearch";
import { Metadata } from "next";

import styles from "./Models.module.scss";

export const metadata: Metadata = {
  title: "Models",

  description:
    "Discover the international models and talent represented by NFK Agency in Kuwait and across the GCC.",

  alternates: {
    canonical: "/models",
  },
};

type ModelsPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    gender?: string | string[];
    search?: string | string[];
  }>;
};

const categories = [
  {
    label: "New Faces",
    value: "new-faces",
  },
  {
    label: "In Town",
    value: "in-town",
  },
  {
    label: "Direct Booking",
    value: "direct-booking",
  },
] satisfies {
  label: string;
  value: ModelCategory;
}[];

const genders = [
  {
    label: "Women",
    value: "women",
  },
  {
    label: "Men",
    value: "men",
  },
] satisfies {
  label: string;
  value: ModelGender;
}[];

function isModelCategory(value: string | undefined): value is ModelCategory {
  return categories.some((category) => category.value === value);
}

function isModelGender(value: string | undefined): value is ModelGender {
  return genders.some((gender) => gender.value === value);
}

export default async function ModelsPage({ searchParams }: ModelsPageProps) {
  const { category, gender, search } = await searchParams;

  const categoryParam = Array.isArray(category) ? category[0] : category;

  const genderParam = Array.isArray(gender) ? gender[0] : gender;

  const searchParam = Array.isArray(search) ? search[0] : search;

  const normalizedSearch = searchParam?.trim().toLowerCase() ?? "";

  const activeCategory = isModelCategory(categoryParam) ? categoryParam : null;

  const activeGender = isModelGender(genderParam) ? genderParam : null;

  const filteredModels = models.filter((model) => {
    const matchesCategory =
      !activeCategory || model.category === activeCategory;

    const matchesGender = !activeGender || model.gender === activeGender;

    const matchesSearch =
      !normalizedSearch || model.name.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesGender && matchesSearch;
  });

  function buildFilterHref({
    category: nextCategory = activeCategory,
    gender: nextGender = activeGender,
  }: {
    category?: ModelCategory | null;
    gender?: ModelGender | null;
  }) {
    const params = new URLSearchParams();

    if (nextCategory) {
      params.set("category", nextCategory);
    }

    if (nextGender) {
      params.set("gender", nextGender);
    }

    if (normalizedSearch) {
      params.set("search", normalizedSearch);
    }

    const query = params.toString();

    return query ? `/models?${query}` : "/models";
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>NFK AGENCY</span>
          <h1 className={styles.title}>Models</h1>
          <p className={styles.count}>
            {filteredModels.length.toString().padStart(2, "0")} Models
          </p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.filterGroups}>
            <nav
              className={styles.filters}
              aria-label="Filter models by gender"
            >
              <Link
                href={buildFilterHref({
                  gender: null,
                })}
                className={!activeGender ? styles.activeFilter : undefined}
              >
                All
              </Link>

              {genders.map((gender) => (
                <Link
                  key={gender.value}
                  href={buildFilterHref({
                    gender: gender.value,
                  })}
                  className={
                    activeGender === gender.value
                      ? styles.activeFilter
                      : undefined
                  }
                >
                  {gender.label}
                </Link>
              ))}
            </nav>

            <nav
              className={styles.filters}
              aria-label="Filter models by category"
            >
              <Link
                href={buildFilterHref({
                  category: null,
                })}
                className={!activeCategory ? styles.activeFilter : undefined}
              >
                All
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.value}
                  href={buildFilterHref({
                    category: category.value,
                  })}
                  className={
                    activeCategory === category.value
                      ? styles.activeFilter
                      : undefined
                  }
                >
                  {category.label}
                </Link>
              ))}
            </nav>
          </div>

          <ModelSearch />
        </div>

        {filteredModels.length > 0 ? (
          <div className={styles.grid}>
            {filteredModels.map((model) => (
              <ModelCard key={model.id} model={model} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIndex}>00</span>
            <p className={styles.emptyTitle}>No models found</p>

            <Link href="/models" className={styles.clearFilters}>
              Clear filters {"\u2198\uFE0E"}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
