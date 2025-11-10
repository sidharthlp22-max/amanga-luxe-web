import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Award, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-jewelry.jpg";
import ring1 from "@/assets/ring-1.jpg";
import necklace1 from "@/assets/necklace-1.jpg";
import earrings1 from "@/assets/earrings-1.jpg";
import bracelet1 from "@/assets/bracelet-1.jpg";

const Index = () => {
  const featuredProducts = [
    { id: "1", name: "Eternal Elegance Ring", price: 2499, image: ring1, category: "Rings" },
    { id: "2", name: "Cascade Pendant Necklace", price: 3299, image: necklace1, category: "Necklaces" },
    { id: "3", name: "Luminous Drop Earrings", price: 1899, image: earrings1, category: "Earrings" },
    { id: "4", name: "Aurora Diamond Bracelet", price: 2799, image: bracelet1, category: "Bracelets" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxury Jewelry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Where <span className="gradient-text">Quality</span> meets <span className="gradient-text">Fashion</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover timeless elegance in our curated collection of luxury jewelry. Each piece is crafted with exceptional attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" className="gradient-bg text-white hover:opacity-90 text-base">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-base border-2">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg gradient-bg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Ethically sourced materials and certified gemstones
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg gradient-bg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Expert Craftsmanship</h3>
                <p className="text-sm text-muted-foreground">
                  Handcrafted by master artisans with decades of experience
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg gradient-bg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Lifetime Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Every piece comes with our lifetime quality guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked selection of exquisite jewelry pieces
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="lg" variant="outline" className="border-2">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                The AMANGA Story
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded with a passion for exceptional craftsmanship and timeless design, AMANGA represents the perfect fusion of traditional artistry and contemporary elegance.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Each piece in our collection tells a story of dedication, precision, and the pursuit of perfection. We believe that luxury jewelry should not only be beautiful but also meaningful.
              </p>
              <Link to="/about">
                <Button size="lg" className="gradient-bg text-white hover:opacity-90">
                  Discover Our Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-square rounded-lg overflow-hidden shadow-luxury">
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
