import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Instagram, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Dialog as LightboxDialog, DialogContent as LightboxContent } from "@/components/ui/dialog";
import { products, getProductById } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const product = getProductById(id || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  // Get all images for the product (use images array if available, otherwise use single image)
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

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

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-6 md:mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-20">
          {/* Product Images with Slideshow */}
          <div className="space-y-3 sm:space-y-4">
            <div 
              className="aspect-square rounded-lg overflow-hidden bg-muted relative group cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={productImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              
              {/* Tap to zoom indicator */}
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              
              {/* Navigation arrows - always visible on mobile for touch */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-background active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-background active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  
                  {/* Image counter */}
                  <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs sm:text-sm">
                    {currentImageIndex + 1} / {productImages.length}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail gallery */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`aspect-square rounded-md sm:rounded-lg overflow-hidden bg-muted cursor-pointer transition-all active:scale-95 ${
                    i === currentImageIndex 
                      ? "ring-2 ring-primary ring-offset-1 sm:ring-offset-2" 
                      : "hover:opacity-75"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center lg:text-left">
              <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2 sm:mb-4">{product.name}</h1>
              <p className="text-2xl sm:text-3xl font-semibold gradient-text">
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center lg:text-left">
              {product.description}
            </p>

            {/* Actions */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="flex-1 gradient-bg text-white hover:opacity-90 min-h-[48px] text-sm sm:text-base"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>Order via WhatsApp</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 min-h-[48px] text-sm sm:text-base"
                  onClick={handleInstagramContact}
                >
                  <Instagram className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>Contact on Instagram</span>
                </Button>
              </div>
              <Button
                size="lg"
                variant="outline"
                className={`w-full min-h-[48px] ${isWishlisted ? "border-secondary text-secondary" : ""}`}
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

          </div>
        </div>

        {/* Care Instructions */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-xl sm:text-2xl font-serif font-bold mb-4 sm:mb-6 text-center lg:text-left">Care Instructions</h2>
          <div className="prose prose-sm max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <p className="text-sm sm:text-base text-muted-foreground">
              To maintain the beauty and brilliance of your jewelry, we recommend regular cleaning with a soft cloth. 
              Store in a cool, dry place away from direct sunlight. Avoid contact with harsh chemicals and remove 
              during physical activities.
            </p>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 sm:mb-8 text-center lg:text-left">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxDialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <LightboxContent className="max-w-[95vw] sm:max-w-4xl p-0 bg-black/95 border-none">
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/40 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            
            <img
              src={productImages[currentImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
            
            {productImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/40 transition-colors active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-background/40 transition-colors active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Thumbnail dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i === currentImageIndex ? "bg-white" : "bg-white/40"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </LightboxContent>
      </LightboxDialog>

      <Footer />
    </div>
  );
};

export default ProductDetail;
