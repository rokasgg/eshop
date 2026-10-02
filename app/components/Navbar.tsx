"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useI18n } from "./I18nProvider";
import { localizePath, locales, stripLocale, type Locale } from "@/lib/i18n";

const NAV_LINKS = [
  { key: "shop", href: "/shop" },
  { key: "hotels", href: "/shop/hotels" },
  // Cafés & restaurants section hidden for now
  // { label: "Kavinėms ir Restoranams", href: "/shop" },
  { key: "about", href: "/about" },
  { key: "contacts", href: "/contacts" },
] as const;

export default function Navbar() {
  const { t, lang, href, plural, f } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const { totalBoxes, openCart } = useCart();

  // Same page in the other language; the query string (e.g. ?kategorija=…) is kept
  const switchLanguage = (target: Locale) => {
    setLangOpen(false);
    if (target === lang) return;
    window.location.assign(localizePath(stripLocale(window.location.pathname), target) + window.location.search);
  };

  // Longest matching href wins, so /shop/hotels doesn't also highlight /shop
  const pathname = stripLocale(usePathname());
  const activeHref = NAV_LINKS.map((l) => l.href)
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(11,41,27,0.06)]">
      {/* Top utility bar */}
      <div className="hidden bg-racing-green-dark text-parchment-deep text-label-sm font-sans font-bold uppercase tracking-widest lg:block">
        <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-between px-margin-desktop">
          <div className="flex items-center gap-space-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-antique-gold-bright" />
            <span>{t.nav.topBar}</span>
          </div>
          <div className="flex items-center gap-space-lg text-on-surface-variant/80">
            <a className="text-parchment-deep transition-colors hover:text-antique-gold-bright" href="tel:+37065116331">
              +370 6 511 6331
            </a>
            <span className="text-hairline-gold">|</span>
            <a className="text-parchment-deep transition-colors hover:text-antique-gold-bright" href="mailto:info@ahmadarbata.lt">
              info@ahmadarbata.lt
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-margin-mobile lg:px-margin-desktop">
        <Link href={href("/")} className="flex shrink-0 flex-col">
          <span className="font-serif text-headline-sm text-primary font-bold tracking-tight">
            AHMAD TEA LONDON
          </span>
          <span className="font-sans text-label-sm uppercase tracking-wider text-secondary">
            {t.nav.tagline}
          </span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <li key={link.key}>
                <Link
                  href={href(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-space-xs font-sans text-label-lg uppercase transition-colors hover:text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-secondary after:transition-transform ${isActive
                    ? "font-bold text-primary after:scale-x-100"
                    : "text-on-surface-variant after:scale-x-0 hover:after:scale-x-100"
                    }`}
                >
                  {t.nav.links[link.key]}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-space-sm">
          {/* Language selector */}
          <div ref={langRef} className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-label={t.nav.selectLanguage}
              aria-expanded={langOpen}
              className="flex items-center gap-space-xs rounded-lg px-space-sm py-space-xs font-sans text-label-lg font-bold text-on-surface-variant transition-colors hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">language</span>
              <span>{lang.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 w-36 rounded-lg border border-outline-variant bg-surface py-1 shadow-lg">
                {locales.map((code) => (
                  <button
                    key={code}
                    lang={code}
                    onClick={() => switchLanguage(code)}
                    className={`w-full px-3 py-2 text-left font-sans text-body-md transition-colors hover:bg-surface-container ${lang === code ? "font-bold text-primary" : "text-on-surface-variant"
                      }`}
                  >
                    {t.nav.languages[code]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mano pasirinkimas (cart) */}
          <button
            onClick={openCart}
            aria-label={f(t.nav.cartAria, { boxes: plural(totalBoxes, t.common.boxes) })}
            className="flex items-center gap-space-xs rounded-lg bg-surface-container px-space-md py-space-sm text-on-surface transition-colors hover:bg-surface-container-high"
          >
            {/* <span className="font-sans text-label-lg font-semibold hidden sm:inline">Mano pasirinkimas</span> */}
            <span className="material-symbols-outlined text-[20px] sm:hidden" aria-hidden="true">shopping_bag</span>
            {totalBoxes > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary font-sans text-label-sm font-bold text-on-secondary">
                {totalBoxes > 99 ? "99+" : totalBoxes}
              </span>
            )}
          </button>

          {/* Shop CTA */}
          <Link
            href={href("/shop")}
            className="rounded-lg border border-secondary bg-primary-container px-space-md py-space-sm font-sans text-label-lg uppercase tracking-wider text-parchment-deep shadow-[0_0_12px_rgba(197,160,89,0.2)] transition-all hover:bg-racing-green-dark"
          >
            {t.nav.catalog}
          </Link>
        </div>
      </nav>
    </header>
  );
}
