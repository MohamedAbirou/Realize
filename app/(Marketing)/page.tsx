import { MarketingHero } from "@/app/(Marketing)/_components/marketing-hero";
import { MarketingNavbar } from "@/app/(Marketing)/_components/marketing-navbar";

const MarketingPage = () => {
  return (
    <div className="h-full">
      <MarketingNavbar />
      <MarketingHero />
    </div>
  );
};

export default MarketingPage;
