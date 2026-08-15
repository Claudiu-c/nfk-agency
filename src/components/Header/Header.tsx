"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./Header.module.scss";

export default function Header() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("dark");

  const usesSectionTheme =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/join" ||
    pathname === "/contact";

  useEffect(() => {
    if (!usesSectionTheme) {
      return;
    }

    let ticking = false;

    const updateHeaderTheme = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-header-theme]",
      );

      const probeY = 80;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= probeY && rect.bottom > probeY) {
          const theme = section.dataset.headerTheme;

          if (theme === "light" || theme === "dark") {
            setHeaderTheme(theme);
          }

          break;
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      requestAnimationFrame(updateHeaderTheme);
    };

    updateHeaderTheme();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, usesSectionTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const routeTheme: "light" | "dark" =
    pathname === "/models" ? "light" : "dark";

  const currentTheme = usesSectionTheme ? headerTheme : routeTheme;

  const isHomeTop = pathname === "/" && !isScrolled;

  const isActive = (href: string) => {
    if (href === "/models") {
      return pathname.startsWith("/models");
    }

    return pathname === href;
  };

  const navigation = [
    {
      label: "Models",
      href: "/models",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Join Us",
      href: "/join",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const isSamePage = pathname === href;

    if (isSamePage) {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    closeMenu();
  };

  return (
    <header
      className={`${styles.header} ${
        isHomeTop
          ? styles.homeTop
          : currentTheme === "light"
            ? styles.onLight
            : styles.onDark
      } ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.logo}
          onClick={(event) => handleNavigation(event, "/")}
          aria-label="NFK Agency — Home"
        >
          <Image
            src="/images/brand/nfk-logo.png"
            alt="NFK Agency"
            width={64}
            height={64}
            className={styles.logoImage}
            loading="eager"
          />
        </Link>

        <nav className={styles.navigation}>
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.active : undefined}
                aria-current={active ? "page" : undefined}
                onClick={(event) => handleNavigation(event, item.href)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          Menu
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileMenuHeader}>
            <Link
              href="/"
              className={styles.mobileLogo}
              onClick={(event) => handleNavigation(event, "/")}
              aria-label="NFK Agency — Home"
            >
              <Image
                src="/images/brand/nfk-logo.png"
                alt="NFK Agency"
                width={64}
                height={64}
                className={styles.mobileLogoImage}
                loading="eager"
              />
            </Link>

            <button
              type="button"
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              Close
            </button>
          </div>

          <nav className={styles.mobileNavigation}>
            <Link
              href="/models"
              onClick={(event) => handleNavigation(event, "/models")}
            >
              <span>01</span>
              Models
            </Link>

            <Link
              href="/about"
              onClick={(event) => handleNavigation(event, "/about")}
            >
              <span>02</span>
              About
            </Link>

            <Link
              href="/join"
              onClick={(event) => handleNavigation(event, "/join")}
            >
              <span>03</span>
              Join Us
            </Link>

            <Link
              href="/contact"
              onClick={(event) => handleNavigation(event, "/contact")}
            >
              <span>04</span>
              Contact
            </Link>
          </nav>

          <div className={styles.mobileFooter}>
            <span>NFK Agency</span>
            <span>Kuwait — GCC</span>
          </div>
        </div>
      </div>
    </header>
  );
}
