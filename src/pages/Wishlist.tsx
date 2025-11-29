import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2 md:mb-4">
            My Wishlist
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            {wishlistItems.length > 0
              ? `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? "s" : ""} in your wishlist`
              : "Your wishlist is empty"}
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-20 px-4">
            <Heart className="h-12 w-12 md:h-16 md:w-16 mx-auto text-muted-foreground/50 mb-4 md:mb-6" />
            <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 md:mb-4">
              No items in your wishlist
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
              Start adding items you love by clicking the heart icon on products.
            </p>
            <Link to="/shop">
              <Button size="lg" className="gradient-bg text-white hover:opacity-90 min-h-[48px] w-full sm:w-auto">
                Browse Collection
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
