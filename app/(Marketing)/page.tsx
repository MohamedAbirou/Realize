import { MarketingContent } from "@/app/(Marketing)/_components/marketing-content";
import { MarketingHero } from "@/app/(Marketing)/_components/marketing-hero";
import { MarketingNavbar } from "@/app/(Marketing)/_components/marketing-navbar";

const MarketingPage = () => {
  return (
    <div className="h-full">
      <MarketingNavbar />
      <MarketingHero />
      <MarketingContent />
    </div>
  );
};

export default MarketingPage;
