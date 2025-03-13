
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import {
  createProduct,
  getProductById,
  updateProduct,
  updateCompositeProductReference
} from "@/services/productService";
import { Product, Variant, Modifier, CompositeProduct } from "@/types/product";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import ProductBasicInfoForm from "./form/ProductBasicInfoForm";
import ProductVariantsForm from "./form/ProductVariantsForm";
import ProductModifiersForm from "./form/ProductModifiersForm";
import ProductCompositeForm from "./form/ProductCompositeForm";

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Product form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);
  const [isComposite, setIsComposite] = useState(false);
  const [compositeProducts, setCompositeProducts] = useState<CompositeProduct[]>([]);

  // Fetch product data if editing
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id as string),
    enabled: isEditing,
  });

  // Populate form fields with product data
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setSku(product.sku);
      setBasePrice(product.basePrice);
      setStock(product.stock);
      setVariants(product.variants);
      setModifiers(product.modifiers);
      setIsComposite(product.isComposite);
      setCompositeProducts(product.compositeProducts || []);
    }
  }, [product]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !sku.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
        name,
        description,
        sku,
        basePrice,
        stock,
        variants,
        modifiers,
        isComposite,
        compositeProducts: isComposite ? compositeProducts : [],
        images: [],
      };

      if (isEditing && id) {
        const prevProduct = product as Product;
        const updatedProduct = await updateProduct(id, productData);

        // Update references to this product in composite products if name changed
        if (prevProduct.name !== name) {
          updateCompositeProductReference(id, name);
        }

        toast.success("Product updated successfully");
      } else {
        await createProduct(productData);
        toast.success("Product created successfully");
      }

      navigate("/products");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (

      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>

    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mb-2"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Edit Product" : "Create New Product"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6 mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Details</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="modifiers">Modifiers</TabsTrigger>
              <TabsTrigger value="composite">Composite</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <ProductBasicInfoForm
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                sku={sku}
                setSku={setSku}
                basePrice={basePrice}
                setBasePrice={setBasePrice}
                stock={stock}
                setStock={setStock}
              />

              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isComposite"
                    checked={isComposite}
                    onCheckedChange={(checked) => setIsComposite(checked === true)}
                  />
                  <Label htmlFor="isComposite">
                    This is a composite product (bundle of other products)
                  </Label>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="variants">
              <ProductVariantsForm
                baseSku={sku}
                variants={variants}
                setVariants={setVariants}
              />
            </TabsContent>

            <TabsContent value="modifiers">
              <ProductModifiersForm
                modifiers={modifiers}
                setModifiers={setModifiers}
              />
            </TabsContent>

            <TabsContent value="composite">
              <ProductCompositeForm
                currentProductId={id}
                compositeProducts={compositeProducts}
                setCompositeProducts={setCompositeProducts}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-3 mb-10">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/products")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="min-w-28">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Save Changes" : "Create Product"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
