import TopBanner from "./components/home/TopBanner";
import Hero from "./components/home/Hero";
import HowItWorks from "./components/home/HowItWorks";
import WhyWorkWithUs from "./components/home/WhyWorkWithUs";
import TeaCategoriesGrid from "./components/home/TeaCategoriesGrid";
import SegmentPortals from "./components/home/SegmentPortals";
import AboutDistributor from "./components/home/AboutDistributor";
import TastingRequestForm from "./components/home/TastingRequestForm";

export default function Home() {
  return (
    <>
      <TopBanner />
      <Hero />
      <HowItWorks />
      <WhyWorkWithUs />
      <TeaCategoriesGrid />
      <SegmentPortals />
      <AboutDistributor />
      <TastingRequestForm />
    </>
  );
}
