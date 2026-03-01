import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandStrip from "@/components/BrandStrip";
import FeaturesSection from "@/components/FeaturesSection";
import CollectionsSection from "@/components/CollectionsSection";
import CustomizeSection from "@/components/CustomizeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CraftStorySection from "@/components/CraftStorySection";
import GravityStorySection from "@/components/GravityStorySection";
import StatsBar from "@/components/StatsBar";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BrandStrip />
      <FeaturesSection />
      <CollectionsSection />
      <CustomizeSection />
      <TestimonialsSection />
      <CraftStorySection />
      <GravityStorySection />
      <StatsBar />
      <NewsletterSection />
      <Footer />
    </main>
  );
};

export default Index;
