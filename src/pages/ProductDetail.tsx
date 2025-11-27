import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Instagram } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, getProductById } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = getProductById(id || "");
  
  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  // Contact info
  const WHATSAPP_NUMBER = "917025296299";
  const INSTAGRAM_HANDLE = "amanga.in";

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ordering:\n\n${product.name}\nPrice: ₹${product.price.toLocaleString()}\n\nPlease share more details.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleInstagramContact = () => {
    window.open(`https://www.instagram.com/${INSTAGRAM_HANDLE}`, '_blank');
  };

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
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 gradient-bg text-white hover:opacity-90"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Order via WhatsApp
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1"
                  onClick={handleInstagramContact}
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  Contact on Instagram
                </Button>
              </div>
              <Button
                size="lg"
                variant="outline"
                className={`w-full ${isWishlisted ? "border-secondary text-secondary" : ""}`}
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
