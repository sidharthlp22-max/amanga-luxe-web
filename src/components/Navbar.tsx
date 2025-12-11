import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  const handleProductSelect = (productId: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="AMANGA - Quality meets Fashion" className="h-14 w-auto object-contain" />
            <h1 className="text-2xl font-serif font-bold gradient-text hidden sm:block">AMANGA</h1>
          </Link>

          {/* Mobile Center Brand Name */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 sm:hidden">
            <h1 className="text-xl font-serif font-bold gradient-text">AMANGA</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
              <PopoverTrigger asChild>
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search jewelry..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value.trim()) setSearchOpen(true);
                    }}
                    onFocus={() => searchQuery.trim() && setSearchOpen(true)}
                    className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </PopoverTrigger>
              {searchQuery.trim() && (
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandList>
                      {filteredProducts.length === 0 ? (
                        <CommandEmpty>No products found.</CommandEmpty>
                      ) : (
                        <CommandGroup heading="Products">
                          {filteredProducts.map((product) => (
                            <CommandItem
                              key={product.id}
                              onSelect={() => handleProductSelect(product.id)}
                              className="cursor-pointer"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded object-cover mr-3"
                              />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              )}
            </Popover>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="hidden md:flex flex-col items-center">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-white text-xs flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
              <span className="text-xs text-muted-foreground">Wishlist</span>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search jewelry..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex h-11 w-full rounded-md border border-input bg-muted/50 px-3 py-2 pl-10 text-sm"
                    />
                  </div>
                  {searchQuery.trim() && filteredProducts.length > 0 && (
                    <div className="space-y-2">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={() => { setIsOpen(false); setSearchQuery(""); }}
                          className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted"
                        >
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-xs text-muted-foreground">₹{product.price.toLocaleString()}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-border">
                    <Link
                      to="/wishlist"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Wishlist ({wishlistCount})</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
