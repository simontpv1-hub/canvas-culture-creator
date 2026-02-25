import PromoBanner from "@/components/layout/PromoBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import TrustBadges from "@/components/home/TrustBadges";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import ProductCarousel from "@/components/home/ProductCarousel";
import PopularCategories from "@/components/home/PopularCategories";
import NewsletterSignup from "@/components/home/NewsletterSignup";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <HeroSlideshow />
        <TrustBadges />
        <FeaturedCollections />
        <ProductCarousel
          title="Best Sellers"
          viewAllLink="/collections/best-sellers"
          filterTag="best-seller"
        />
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
