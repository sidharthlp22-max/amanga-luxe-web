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

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            My Wishlist
          </h1>
          <p className="text-lg text-muted-foreground">
            {wishlistItems.length > 0
              ? `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? "s" : ""} in your wishlist`
              : "Your wishlist is empty"}
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
            <h2 className="text-2xl font-serif font-bold mb-4">
              No items in your wishlist
            </h2>
            <p className="text-muted-foreground mb-8">
              Start adding items you love by clicking the heart icon on products.
            </p>
            <Link to="/shop">
              <Button size="lg" className="gradient-bg text-white hover:opacity-90">
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
