
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CompositeProduct } from "@/types/product";
import { getAllProducts } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Package, PlusCircle, X, ChevronUp, ChevronDown } from "lucide-react";

interface ProductCompositeFormProps {
  currentProductId?: string;
  compositeProducts: CompositeProduct[];
  setCompositeProducts: (compositeProducts: CompositeProduct[]) => void;
}

const ProductCompositeForm = ({
  currentProductId,
  compositeProducts,
  setCompositeProducts,
}: ProductCompositeFormProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  // Filter out the current product and already selected products
  const filteredProducts = allProducts.filter(
    (product) => 
      product.id !== currentProductId &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Products that are available to add (not already in the composite)
  const availableProducts = filteredProducts.filter(
    (product) => !compositeProducts.some((cp) => cp.productId === product.id)
  );

  // Add a product to the composite
  const handleAddProduct = (productId: string) => {
    const productToAdd = allProducts.find(p => p.id === productId);
    if (productToAdd) {
      setCompositeProducts([
        ...compositeProducts,
        {
          productId,
          quantity: 1,
          productName: productToAdd.name
        }
      ]);
    }
    setSearchTerm("");
  };

  // Remove a product from the composite
  const handleRemoveProduct = (productId: string) => {
    setCompositeProducts(
      compositeProducts.filter((product) => product.productId !== productId)
    );
  };

  // Update product quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCompositeProducts(
      compositeProducts.map((product) =>
        product.productId === productId
          ? { ...product, quantity: Math.max(1, quantity) }
          : product
      )
    );
  };

  // Move product up in the list
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newCompositeProducts = [...compositeProducts];
    const temp = newCompositeProducts[index];
    newCompositeProducts[index] = newCompositeProducts[index - 1];
    newCompositeProducts[index - 1] = temp;
    setCompositeProducts(newCompositeProducts);
  };

  // Move product down in the list
  const handleMoveDown = (index: number) => {
    if (index === compositeProducts.length - 1) return;
    const newCompositeProducts = [...compositeProducts];
    const temp = newCompositeProducts[index];
    newCompositeProducts[index] = newCompositeProducts[index + 1];
    newCompositeProducts[index + 1] = temp;
    setCompositeProducts(newCompositeProducts);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Add Products to Bundle</h3>
            <p className="text-sm text-gray-500 mb-4">
              Create a composite product by bundling existing products together
            </p>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products to add..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {searchTerm && availableProducts.length > 0 && (
              <div className="mt-2 border rounded-md overflow-hidden max-h-60 overflow-y-auto">
                {availableProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                    onClick={() => handleAddProduct(product.id)}
                  >
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{product.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <PlusCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {searchTerm && availableProducts.length === 0 && (
              <div className="mt-2 border rounded-md p-3 text-center text-gray-500">
                No products found matching "{searchTerm}"
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Bundle Contents</h3>

            {compositeProducts.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ width: "50px" }}></TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {compositeProducts.map((product, index) => {
                      const productDetails = allProducts.find(
                        (p) => p.id === product.productId
                      );

                      return (
                        <TableRow key={product.productId}>
                          <TableCell>
                            <div className="flex flex-col">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0 text-gray-400"
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0 text-gray-400"
                                onClick={() => handleMoveDown(index)}
                                disabled={index === compositeProducts.length - 1}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {productDetails?.name || product.productName}
                            </div>
                            <div className="text-xs text-gray-500">
                              SKU: {productDetails?.sku || "Unknown"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              value={product.quantity}
                              onChange={(e) =>
                                handleUpdateQuantity(
                                  product.productId,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveProduct(product.productId)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center">
                <p className="text-gray-500">No products added to this bundle yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Search for products above to add them to this bundle
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCompositeForm;
