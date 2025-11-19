import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import ring1 from "@/assets/ring-1.jpg";
import necklace1 from "@/assets/necklace-1.jpg";
import earrings1 from "@/assets/earrings-1.jpg";
import bracelet1 from "@/assets/bracelet-1.jpg";

const Shop = () => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  
  const products = [
    { id: "1", name: "Eternal Elegance Ring", price: 2499, image: ring1, category: "Rings" },
    { id: "2", name: "Cascade Pendant Necklace", price: 3299, image: necklace1, category: "Necklaces" },
    { id: "3", name: "Luminous Drop Earrings", price: 1899, image: earrings1, category: "Earrings" },
    { id: "4", name: "Aurora Diamond Bracelet", price: 2799, image: bracelet1, category: "Bracelets" },
    { id: "5", name: "Celestial Band Ring", price: 1799, image: ring1, category: "Rings" },
    { id: "6", name: "Infinity Chain Necklace", price: 2999, image: necklace1, category: "Necklaces" },
    { id: "7", name: "Stellar Stud Earrings", price: 1499, image: earrings1, category: "Earrings" },
    { id: "8", name: "Grace Tennis Bracelet", price: 3499, image: bracelet1, category: "Bracelets" },
  ];

  const categories = ["Rings", "Necklaces", "Earrings", "Bracelets"];
  const materials = ["Gold", "Platinum", "Silver", "Rose Gold"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Shop Collection</h1>
          <p className="text-lg text-muted-foreground">
            Explore our exquisite selection of luxury jewelry
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-4">Category</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div>
                <h3 className="font-semibold mb-4">Material</h3>
                <div className="space-y-3">
                  {materials.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox id={material} />
                      <label
                        htmlFor={material}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} products
              </p>
              <select className="border border-border rounded-md px-4 py-2 text-sm bg-background">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
