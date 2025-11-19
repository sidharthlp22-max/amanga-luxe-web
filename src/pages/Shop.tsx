import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import necklace1 from "@/assets/necklace-blue-pendant.jpg";
import necklace2 from "@/assets/necklace-gold-blue.jpg";
import necklace3 from "@/assets/necklace-gold-green.jpg";
import earrings1 from "@/assets/earrings-silver-bells.jpg";
import earrings2 from "@/assets/earrings-turquoise.jpg";

const Shop = () => {
  const products = [
    { id: "1", name: "Blue Crystal Pendant Set", price: 4299, image: necklace1, category: "Necklaces" },
    { id: "2", name: "Royal Mango Necklace Set", price: 6499, image: necklace2, category: "Necklaces" },
    { id: "3", name: "Emerald Mango Necklace Set", price: 7299, image: necklace3, category: "Necklaces" },
    { id: "4", name: "Silver Bell Drop Earrings", price: 2899, image: earrings1, category: "Earrings" },
    { id: "5", name: "Turquoise Vintage Earrings", price: 3199, image: earrings2, category: "Earrings" },
  ];

  const categories = ["Necklaces", "Earrings"];
  const materials = ["Gold", "Silver", "Gemstone", "Antique Gold"];

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
