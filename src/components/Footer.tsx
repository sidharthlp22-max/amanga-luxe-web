import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-12 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4 text-center md:text-left">
            <Link to="/" className="inline-block">
              <img src={logo} alt="AMANGA - Quality meets Fashion" className="h-16 md:h-20 w-auto object-contain mx-auto md:mx-0" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Where Quality meets Fashion. Discover timeless elegance in every piece.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 -m-2">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 -m-2">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 -m-2">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 -m-2">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Care Instructions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Stay Connected</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates on new arrivals and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Your email"
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <button className="gradient-bg text-white px-4 py-2.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap min-h-[44px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AMANGA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
