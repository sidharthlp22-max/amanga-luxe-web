import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { products as staticProducts, Product as StaticProduct } from '@/data/products';

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

interface DBProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string | null;
  material: string | null;
  gemstone: string | null;
  dimensions: string | null;
  weight: string | null;
  is_featured: boolean;
  is_active: boolean;
}

interface DBProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch products from database
      const { data: dbProducts, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Fetch all product images
      const { data: dbImages, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .order('sort_order');

      if (imagesError) throw imagesError;

      // Group images by product
      const imagesByProduct: Record<string, DBProductImage[]> = {};
      (dbImages || []).forEach((img) => {
        if (!imagesByProduct[img.product_id]) {
          imagesByProduct[img.product_id] = [];
        }
        imagesByProduct[img.product_id].push(img);
      });

      // Transform DB products to match the Product interface
      const transformedProducts: Product[] = (dbProducts || []).map((p: DBProduct) => {
        const images = imagesByProduct[p.id] || [];
        const primaryImage = images.find(img => img.is_primary) || images[0];
        
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          image: primaryImage?.image_url || '/placeholder.svg',
          images: images.map(img => img.image_url),
          category: p.category,
          description: p.description || '',
          details: {
            material: p.material || '',
            gemstone: p.gemstone || undefined,
            dimensions: p.dimensions || '',
            weight: p.weight || '',
          },
        };
      });

      // If no products in database, fall back to static products
      if (transformedProducts.length === 0) {
        setProducts(staticProducts);
      } else {
        setProducts(transformedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fall back to static products on error
      setProducts(staticProducts);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, refetch: fetchProducts };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      // First try to fetch from database
      const { data: dbProduct, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .maybeSingle();

      if (productError) throw productError;

      if (dbProduct) {
        // Fetch images for this product
        const { data: dbImages } = await supabase
          .from('product_images')
          .select('*')
          .eq('product_id', id)
          .order('sort_order');

        const images = dbImages || [];
        const primaryImage = images.find(img => img.is_primary) || images[0];

        setProduct({
          id: dbProduct.id,
          name: dbProduct.name,
          price: dbProduct.price,
          image: primaryImage?.image_url || '/placeholder.svg',
          images: images.map(img => img.image_url),
          category: dbProduct.category,
          description: dbProduct.description || '',
          details: {
            material: dbProduct.material || '',
            gemstone: dbProduct.gemstone || undefined,
            dimensions: dbProduct.dimensions || '',
            weight: dbProduct.weight || '',
          },
        });
      } else {
        // Fall back to static products
        const staticProduct = staticProducts.find(p => p.id === id);
        setProduct(staticProduct || null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      // Fall back to static products on error
      const staticProduct = staticProducts.find(p => p.id === id);
      setProduct(staticProduct || null);
    } finally {
      setLoading(false);
    }
  };

  return { product, loading };
};
