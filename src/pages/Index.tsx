import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-jewelry.jpg";
import necklace1 from "@/assets/necklace-blue-pendant.jpg";
import necklace2 from "@/assets/necklace-gold-blue.jpg";
import necklace3 from "@/assets/necklace-gold-green.jpg";
import earrings1 from "@/assets/earrings-silver-bells.jpg";

const Index = () => {
  const featuredProducts = [
    { id: "1", name: "Blue Crystal Pendant Set", price: 4299, image: necklace1, category: "Necklaces" },
    { id: "2", name: "Royal Mango Necklace Set", price: 6499, image: necklace2, category: "Necklaces" },
    { id: "3", name: "Emerald Mango Necklace Set", price: 7299, image: necklace3, category: "Necklaces" },
    { id: "4", name: "Silver Bell Drop Earrings", price: 2899, image: earrings1, category: "Earrings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxury Jewelry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30 md:from-background/90 md:via-background/50 md:to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 z-10">
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-4 md:mb-6 leading-tight">
              Where <span className="gradient-text">Quality</span> meets <span className="gradient-text">Fashion</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed px-2 md:px-0">
              Discover timeless elegance in our curated collection of luxury jewelry. Each piece is crafted with exceptional attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Link to="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="gradient-bg text-white hover:opacity-90 text-base w-full sm:w-auto min-h-[48px]">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-base border-2 w-full sm:w-auto min-h-[48px]">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Collection */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-3 md:mb-4">
              Featured Collection
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Explore our handpicked selection of exquisite jewelry pieces
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link to="/shop">
              <Button size="lg" variant="outline" className="border-2 min-h-[48px]">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 md:mb-6">
                The AMANGA Story
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                Founded with a passion for exceptional craftsmanship and timeless design, AMANGA represents the perfect fusion of traditional artistry and contemporary elegance.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                Each piece in our collection tells a story of dedication, precision, and the pursuit of perfection. We believe that luxury jewelry should not only be beautiful but also meaningful.
              </p>
              <Link to="/about">
                <Button size="lg" className="gradient-bg text-white hover:opacity-90 min-h-[48px] w-full sm:w-auto">
                  Discover Our Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-square rounded-lg overflow-hidden shadow-luxury max-w-md mx-auto lg:max-w-none">
                <img
                  src={heroImage}
                  alt="AMANGA Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
