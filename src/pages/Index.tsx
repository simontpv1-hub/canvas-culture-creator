import PromoBanner from "@/components/layout/PromoBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import TrustBadges from "@/components/home/TrustBadges";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import ProductCarousel from "@/components/home/ProductCarousel";
import BrandStory from "@/components/home/BrandStory";
import CustomCanvasCTA from "@/components/home/CustomCanvasCTA";
import PopularCategories from "@/components/home/PopularCategories";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import WelcomePopup from "@/components/WelcomePopup";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <ScrollProgressBar />
      <ScrollToTop />
      <PromoBanner />
      <Header />
      <CartDrawer />
      <WelcomePopup />

      <main className="flex-1">
        <HeroSlideshow />
        <TrustBadges />
        <FeaturedCollections />
        <BrandStory />
        <ProductCarousel
          title="Our Best Sellers"
          viewAllLink="/collections/best-sellers"
          filterTag="best-seller"
        />
        <CustomCanvasCTA />
        <PopularCategories />
        <ProductCarousel
          title="Trending This Week"
          viewAllLink="/collections/all"
        />
        <NewsletterSignup />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
