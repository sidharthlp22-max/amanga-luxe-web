import necklace1 from "@/assets/necklace-blue-pendant.jpg";
import necklace2 from "@/assets/necklace-gold-blue.jpg";
import necklace3 from "@/assets/necklace-gold-green.jpg";
import earrings1 from "@/assets/earrings-silver-bells.jpg";
import earrings2 from "@/assets/earrings-turquoise.jpg";
import lotusNecklace1 from "@/assets/lotus-necklace-1.jpg";
import lotusNecklace2 from "@/assets/lotus-necklace-2.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  details: {
    material: string;
    gemstone?: string;
    dimensions: string;
    weight: string;
  };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Blue Crystal Pendant Set",
    price: 1300,
    image: necklace1,
    category: "Necklaces",
    description: "An exquisite pendant necklace featuring a mesmerizing blue crystal stone set in a delicate rose gold chain. This elegant piece captures light beautifully and adds a touch of sophistication to any outfit.",
    details: {
      material: "Rose Gold Plated",
      gemstone: "Blue Crystal",
      dimensions: "Pendant: 2cm diameter",
      weight: "8.5g",
    },
  },
  {
    id: "2",
    name: "Royal Mango Necklace Set",
    price: 6499,
    image: necklace2,
    category: "Necklaces",
    description: "A stunning traditional mango necklace set featuring intricate gold work with royal blue accents. This piece combines traditional craftsmanship with contemporary elegance, perfect for special occasions.",
    details: {
      material: "Antique Gold Plated",
      gemstone: "Blue Stones",
      dimensions: "Necklace length: 45cm",
      weight: "45g",
    },
  },
  {
    id: "3",
    name: "Emerald Mango Necklace Set",
    price: 7299,
    image: necklace3,
    category: "Necklaces",
    description: "An elegant mango-shaped necklace adorned with lustrous green stones and intricate gold detailing. This exquisite piece showcases traditional Indian jewelry artistry with a modern touch.",
    details: {
      material: "22K Gold Plated",
      gemstone: "Emerald Green Stones",
      dimensions: "Necklace length: 50cm",
      weight: "52g",
    },
  },
  {
    id: "4",
    name: "Silver Bell Drop Earrings",
    price: 2899,
    image: earrings1,
    category: "Earrings",
    description: "Charming bell-shaped drop earrings in oxidized silver with delicate detailing. These earrings feature a unique vintage design that adds character to both traditional and contemporary outfits.",
    details: {
      material: "Oxidized Silver",
      dimensions: "Length: 4cm",
      weight: "6g",
    },
  },
  {
    id: "5",
    name: "Turquoise Vintage Earrings",
    price: 3199,
    image: earrings2,
    category: "Earrings",
    description: "Beautiful vintage-inspired earrings featuring vibrant turquoise stones set in antique gold. The intricate design and striking color combination make these earrings a statement piece for any occasion.",
    details: {
      material: "Antique Gold Plated",
      gemstone: "Turquoise",
      dimensions: "Length: 5cm",
      weight: "7.5g",
    },
  },
  {
    id: "6",
    name: "Lotus Design Invisible Set",
    price: 1600,
    image: lotusNecklace1,
    images: [lotusNecklace1, lotusNecklace2],
    category: "Necklaces",
    description: "A beautiful lotus design invisible set featuring a stunning red lotus pendant with green accents on a delicate gold wire chain adorned with pearls. Includes matching lotus stud earrings for a complete elegant look.",
    details: {
      material: "Gold Plated",
      gemstone: "Enamel & Pearls",
      dimensions: "Pendant: 3cm diameter",
      weight: "12g",
    },
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
