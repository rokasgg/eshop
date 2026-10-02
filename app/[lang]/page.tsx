import TopBanner from "@/app/components/home/TopBanner";
import Hero from "@/app/components/home/Hero";
import HowItWorks from "@/app/components/home/HowItWorks";
import WhyWorkWithUs from "@/app/components/home/WhyWorkWithUs";
import TeaCategoriesGrid from "@/app/components/home/TeaCategoriesGrid";
import SegmentPortals from "@/app/components/home/SegmentPortals";
import AboutDistributor from "@/app/components/home/AboutDistributor";
import TastingRequestForm from "@/app/components/home/TastingRequestForm";

import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <>
      <TopBanner lang={lang} />
      <Hero lang={lang} />
      <HowItWorks lang={lang} />
      <WhyWorkWithUs lang={lang} />
      <TeaCategoriesGrid lang={lang} />
      <SegmentPortals lang={lang} />
      <AboutDistributor lang={lang} />
      <TastingRequestForm />
    </>
  );
}
