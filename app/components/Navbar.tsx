"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { label: "Arbatos", href: "/shop" },
  { label: "Viešbučiams", href: "/shop/hotels" },
  { label: "Kavinėms ir Restoranams", href: "/shop" },
  { label: "Apie mus", href: "/about" },
  { label: "Kontaktai", href: "/contacts" },
];

const LANGUAGES = [
  { code: "LT", label: "Lietuvių" },
  { code: "EN", label: "English" },
];

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("LT");
  const langRef = useRef<HTMLDivElement>(null);

  const { totalItems, openCart } = useCart();

  // Longest matching href wins, so /shop/hotels doesn't also highlight /shop
  const pathname = usePathname();
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
        <div className="mx-auto flex h-10 max-w-[1440px] items-center justify-between px-margin-desktop">
          <div className="flex items-center gap-space-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-antique-gold-bright" />
            <span>Oficialus Ahmad Tea London distributorius Lietuvoje (HoReCa partneriams)</span>
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
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-margin-mobile lg:px-margin-desktop">
        <Link href="/" className="flex shrink-0 flex-col">
          <span className="font-serif text-headline-sm text-primary font-bold tracking-tight">
            AHMAD TEA LONDON
          </span>
          <span className="font-sans text-label-sm uppercase tracking-wider text-secondary">
            Oficialus Distributorius Lietuvoje (UAB Temus)
          </span>
        </Link>

        <ul className="hidden items-center gap-space-lg lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-space-xs font-sans text-label-lg uppercase transition-colors hover:text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-secondary after:transition-transform ${isActive
                    ? "font-bold text-primary after:scale-x-100"
                    : "text-on-surface-variant after:scale-x-0 hover:after:scale-x-100"
                    }`}
                >
                  {link.label}
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
              aria-label="Select language"
              className="flex items-center gap-space-xs rounded-lg px-space-sm py-space-xs font-sans text-label-lg font-bold text-on-surface-variant transition-colors hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">language</span>
              <span>{activeLang}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 w-36 rounded-lg border border-outline-variant bg-surface py-1 shadow-lg">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setActiveLang(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left font-sans text-body-md transition-colors hover:bg-surface-container ${activeLang === lang.code ? "font-bold text-primary" : "text-on-surface-variant"
                      }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mano pasirinkimas (cart) */}
          <button
            onClick={openCart}
            aria-label={`Mano pasirinkimas, ${totalItems} prekė(-ių)`}
            className="flex items-center gap-space-xs rounded-lg bg-surface-container px-space-md py-space-sm text-on-surface transition-colors hover:bg-surface-container-high"
          >
            {/* <span className="font-sans text-label-lg font-semibold hidden sm:inline">Mano pasirinkimas</span> */}
            <span className="material-symbols-outlined text-[20px] sm:hidden" aria-hidden="true">shopping_bag</span>
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary font-sans text-label-sm font-bold text-on-secondary">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Shop CTA */}
          <Link
            href="/shop"
            className="rounded-lg border border-secondary bg-primary-container px-space-md py-space-sm font-sans text-label-lg uppercase tracking-wider text-parchment-deep shadow-[0_0_12px_rgba(197,160,89,0.2)] transition-all hover:bg-racing-green-dark"
          >
            Katalogas
          </Link>
        </div>
      </nav>
    </header>
  );
}
