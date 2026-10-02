import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getI18n } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/lib/i18n";

type SiteSettings = {
  logoText?: string | null;
  footerTagline?: string | null;
  copyright?: string | null;
  footerNavLinks?: { label: string; href: string }[] | null;
  socialLinks?: { platform: string; url: string }[] | null;
};

const NAV_LINKS = [
  { key: "shop", href: "/shop" },
  { key: "about", href: "/about" },
  { key: "contacts", href: "/contacts" },
] as const;

async function getSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(
      `*[_type == "siteSettings"][0]{
        logoText, footerTagline, copyright,
        footerNavLinks[]{ label, href },
        socialLinks[]{ platform, url }
      }`
    );
  } catch {
    return null;
  }
}

export default async function Footer({ lang }: { lang: Locale }) {
  const [settings, { t, href, f }] = await Promise.all([getSettings(), getI18n(lang)]);

  // Sanity footer texts are Lithuanian-only, so they only override the Lithuanian site
  const cms = lang === "lt" ? settings : null;
  const logoText = settings?.logoText ?? t.common.brand;
  const tagline = cms?.footerTagline ?? t.footer.tagline;
  const copyright = cms?.copyright ?? f(t.footer.copyright, { year: new Date().getFullYear() });
  const navLinks = cms?.footerNavLinks ?? NAV_LINKS.map((l) => ({ label: t.nav.links[l.key], href: l.href }));
  const socialLinks = settings?.socialLinks ?? [];

  return (
    <footer className="w-full bg-racing-green-dark text-parchment-deep">
      <div className="mx-auto max-w-[1440px] px-margin-mobile py-space-xl lg:px-margin-desktop">
        <div className="grid gap-gutter-lg sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={href("/")} className="font-serif text-headline-md text-parchment-deep">
              {logoText}
            </Link>
            <p className="mt-space-md max-w-lg font-sans text-body-md text-parchment-deep/80">
              {tagline}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-space-md flex gap-space-sm">
                {socialLinks.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-parchment-deep transition hover:bg-primary"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-label-lg uppercase tracking-wider text-antique-gold-bright">
              {t.footer.navigation}
            </h3>
            <ul className="mt-space-md space-y-space-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={href(link.href)}
                    className="font-sans text-body-md text-parchment-deep/80 transition-colors hover:text-antique-gold-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Info */}
          <div>
            <h3 className="font-sans text-label-lg uppercase tracking-wider text-antique-gold-bright">
              {t.footer.contacts}
            </h3>
            <ul className="mt-space-md space-y-space-sm font-sans text-body-md text-parchment-deep/80">
              <li>
                <a href="mailto:info@ahmadarbata.lt" className="transition-colors hover:text-antique-gold-bright">
                  info@ahmadarbata.lt
                </a>
              </li>
              <li>
                <a href="tel:+37065116331" className="transition-colors hover:text-antique-gold-bright">
                  +370 6 511 6331
                </a>
              </li>
              <li className="text-parchment-deep/60">{t.footer.city}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-space-xl border-t border-hairline-gold/40 pt-space-md font-sans text-body-sm text-parchment-deep/60">
          {copyright}
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "instagram":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "twitter":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
  }
}
