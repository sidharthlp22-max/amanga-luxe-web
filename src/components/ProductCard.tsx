import { Heart, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Contact info - Update these with your actual details
  const WHATSAPP_NUMBER = "919999999999"; // Replace with your WhatsApp number
  const INSTAGRAM_HANDLE = "amanga_jewelry"; // Replace with your Instagram username

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
      
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="icon"
          className={`rounded-full bg-background/90 backdrop-blur-sm hover:bg-background ${
            isWishlisted ? "text-secondary" : ""
          }`}
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
          onClick={handleWhatsAppOrder}
          title="Order via WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
          onClick={handleInstagramContact}
          title="Contact on Instagram"
        >
          <Instagram className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {category}
        </p>
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-foreground group-hover:gradient-text transition-all mb-2">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">₹{price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
