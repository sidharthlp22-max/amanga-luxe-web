import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ring1 from "@/assets/ring-1.jpg";
import necklace1 from "@/assets/necklace-1.jpg";
import earrings1 from "@/assets/earrings-1.jpg";
import bracelet1 from "@/assets/bracelet-1.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data
  const product = {
    id: "1",
    name: "Eternal Elegance Ring",
    price: 2499,
    image: ring1,
    category: "Rings",
    description: "A timeless masterpiece crafted with precision and care. This ring features a brilliant-cut diamond set in 18k white gold, symbolizing eternal love and commitment.",
    details: {
      material: "18K White Gold",
      gemstone: "1.5ct Diamond",
      dimensions: "2mm band width",
      weight: "3.2g",
    },
    sizes: ["5", "6", "7", "8", "9"],
  };

  const relatedProducts = [
    { id: "2", name: "Cascade Pendant Necklace", price: 3299, image: necklace1, category: "Necklaces" },
    { id: "3", name: "Luminous Drop Earrings", price: 1899, image: earrings1, category: "Earrings" },
    { id: "4", name: "Aurora Diamond Bracelet", price: 2799, image: bracelet1, category: "Bracelets" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-75 transition-opacity">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-semibold gradient-text">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                size="lg"
                variant="outline"
                className={`flex-1 ${isWishlisted ? "border-secondary text-secondary" : ""}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Heart className="h-4 w-4 text-primary" />
                <span>Lifetime Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Heart className="h-4 w-4 text-primary" />
                <span>Certificate of Authenticity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-20">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-8">
              <div className="grid grid-cols-2 gap-4 max-w-md">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-muted-foreground capitalize">{key}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="care" className="mt-8">
              <div className="prose prose-sm max-w-2xl">
                <p className="text-muted-foreground">
                  To maintain the beauty and brilliance of your jewelry, we recommend regular cleaning with a soft cloth. 
                  Store in a cool, dry place away from direct sunlight. Avoid contact with harsh chemicals and remove 
                  during physical activities.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-serif font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
