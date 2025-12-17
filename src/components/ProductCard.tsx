import { Heart, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { getProductById } from "@/data/products";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(id);

  // Contact info
  const WHATSAPP_NUMBER = "917025296299";
  const INSTAGRAM_HANDLE = "amanga.in";

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hi! I'm interested in:\n\n${name}\nPrice: ₹${price.toLocaleString()}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleInstagramContact = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`https://www.instagram.com/${INSTAGRAM_HANDLE}`, '_blank');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      const product = getProductById(id);
      if (product) {
        addToWishlist(product);
      }
    }
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden hover-lift">
      <Link to={`/product/${id}`} className="block">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col space-y-1.5 sm:space-y-2">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full bg-white/30 backdrop-blur-sm border border-white/60 hover:bg-white/50 w-8 h-8 sm:w-10 sm:h-10 active:scale-95 text-foreground hover:text-foreground ${
            isWishlisted ? "text-secondary border-secondary bg-white/50" : ""
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isWishlisted ? "fill-current" : ""}`} strokeWidth={1.5} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/30 backdrop-blur-sm border border-white/60 hover:bg-white/50 w-8 h-8 sm:w-10 sm:h-10 active:scale-95 text-foreground hover:text-foreground"
          onClick={handleWhatsAppOrder}
          title="Order via WhatsApp"
        >
          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.5} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/30 backdrop-blur-sm border border-white/60 hover:bg-white/50 w-8 h-8 sm:w-10 sm:h-10 active:scale-95 text-foreground hover:text-foreground"
          onClick={handleInstagramContact}
          title="Contact on Instagram"
        >
          <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.5} />
        </Button>
      </div>

      <div className="p-2.5 sm:p-4">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-0.5 sm:mb-1">
          {category}
        </p>
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-foreground group-hover:gradient-text transition-all mb-1 sm:mb-2 text-sm sm:text-base line-clamp-2">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-lg font-semibold">₹{price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
