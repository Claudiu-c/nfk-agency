"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./ModelSearch.module.scss";

export default function ModelSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      const trimmedSearch = search.trim();

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      const currentQuery = searchParams.toString();
      const nextQuery = params.toString();

      if (currentQuery === nextQuery) {
        return;
      }

      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [search, pathname, router, searchParams]);

  return (
    <div className={styles.search}>
      <label htmlFor="model-search" className={styles.label}>
        Search
      </label>

      <input
        id="model-search"
        type="search"
        placeholder="Model name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className={styles.input}
      />
    </div>
  );
}
