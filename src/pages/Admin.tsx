import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, LogOut, Upload, X } from 'lucide-react';

interface Product {
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

interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

const categories = ['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Sets'];

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<Record<string, ProductImage[]>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [pendingImages, setPendingImages] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Necklaces',
    description: '',
    material: '',
    gemstone: '',
    dimensions: '',
    weight: '',
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchProducts();
    }
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: 'Failed to fetch products', variant: 'destructive' });
      return;
    }

    setProducts(data || []);
    
    // Fetch images for all products
    const { data: images } = await supabase
      .from('product_images')
      .select('*')
      .order('sort_order');
    
    if (images) {
      const imagesByProduct: Record<string, ProductImage[]> = {};
      images.forEach((img) => {
        if (!imagesByProduct[img.product_id]) {
          imagesByProduct[img.product_id] = [];
        }
        imagesByProduct[img.product_id].push(img);
      });
      setProductImages(imagesByProduct);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'Necklaces',
      description: '',
      material: '',
      gemstone: '',
      dimensions: '',
      weight: '',
      is_featured: false,
      is_active: true,
    });
    setPendingImages([]);
    setEditingProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description || '',
      material: product.material || '',
      gemstone: product.gemstone || '',
      dimensions: product.dimensions || '',
      weight: product.weight || '',
      is_featured: product.is_featured,
      is_active: product.is_active,
    });
    setPendingImages([]);
    setIsDialogOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setPendingImages(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removePendingImage = (index: number) => {
    setPendingImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (productId: string) => {
    setUploadingImages(true);
    const existingImages = productImages[productId] || [];
    
    for (let i = 0; i < pendingImages.length; i++) {
      const file = pendingImages[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId}/${Date.now()}-${i}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) {
        toast({ title: 'Upload Error', description: uploadError.message, variant: 'destructive' });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      await supabase.from('product_images').insert({
        product_id: productId,
        image_url: urlData.publicUrl,
        is_primary: existingImages.length === 0 && i === 0,
        sort_order: existingImages.length + i,
      });
    }
    
    setUploadingImages(false);
    setPendingImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description || null,
      material: formData.material || null,
      gemstone: formData.gemstone || null,
      dimensions: formData.dimensions || null,
      weight: formData.weight || null,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id);

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }

      if (pendingImages.length > 0) {
        await uploadImages(editingProduct.id);
      }

      toast({ title: 'Success', description: 'Product updated successfully' });
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        setIsSubmitting(false);
        return;
      }

      if (pendingImages.length > 0 && data) {
        await uploadImages(data.id);
      }

      toast({ title: 'Success', description: 'Product created successfully' });
    }

    setIsSubmitting(false);
    setIsDialogOpen(false);
    resetForm();
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    // Delete images from storage
    const images = productImages[id] || [];
    for (const img of images) {
      const path = img.image_url.split('/product-images/')[1];
      if (path) {
        await supabase.storage.from('product-images').remove([path]);
      }
    }

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: 'Success', description: 'Product deleted' });
    fetchProducts();
  };

  const deleteProductImage = async (imageId: string, imageUrl: string) => {
    const path = imageUrl.split('/product-images/')[1];
    if (path) {
      await supabase.storage.from('product-images').remove([path]);
    }
    
    await supabase.from('product_images').delete().eq('id', imageId);
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Product Management</h1>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">{products.length} products</p>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="material">Material</Label>
                    <Input
                      id="material"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gemstone">Gemstone</Label>
                    <Input
                      id="gemstone"
                      value={formData.gemstone}
                      onChange={(e) => setFormData({ ...formData, gemstone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(v) => setFormData({ ...formData, is_featured: v })}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  
                  {/* Existing images */}
                  {editingProduct && productImages[editingProduct.id]?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {productImages[editingProduct.id].map((img) => (
                        <div key={img.id} className="relative group">
                          <img src={img.image_url} alt="" className="w-20 h-20 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => deleteProductImage(img.id, img.image_url)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pending images preview */}
                  {pendingImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {pendingImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img src={URL.createObjectURL(file)} alt="" className="w-20 h-20 object-cover rounded border-2 border-primary" />
                          <button
                            type="button"
                            onClick={() => removePendingImage(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer hover:bg-accent"
                    >
                      <Upload className="w-4 h-4" />
                      Add Images
                    </Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || uploadingImages}>
                    {isSubmitting || uploadingImages ? 'Saving...' : editingProduct ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className={!product.is_active ? 'opacity-60' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                    {productImages[product.id]?.[0] ? (
                      <img
                        src={productImages[product.id][0].image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{product.name}</h3>
                      {product.is_featured && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Featured</span>
                      )}
                      {!product.is_active && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Inactive</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => openEditDialog(product)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {products.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No products yet. Click "Add Product" to create your first product.
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
