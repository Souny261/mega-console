
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "@/services/productService";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Package,
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Tag,
  Box
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProduct(deleteId);
      refetch();
      setDeleteId(null);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProductTypeIcon = (product: Product) => {
    if (product.isComposite) return <Box className="w-4 h-4 text-blue-500" />;
    if (product.variants.length > 0) return <Tag className="w-4 h-4 text-purple-500" />;
    if (product.modifiers.length > 0) return <Package className="w-4 h-4 text-green-500" />;
    return <Package className="w-4 h-4 text-gray-500" />;
  };

  const getProductTypeBadge = (product: Product) => {
    if (product.isComposite) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Composite</Badge>;
    }
    if (product.variants.length > 0 && product.modifiers.length > 0) {
      return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Variant + Modifier</Badge>;
    }
    if (product.variants.length > 0) {
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Variant</Badge>;
    }
    if (product.modifiers.length > 0) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Modifier</Badge>;
    }
    return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Basic</Badge>;
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Button asChild>
          <Link to="/products/new">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <Card className="text-center py-10">
          <CardContent>
            <p className="text-gray-500">No products found</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getProductTypeIcon(product)}
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-md">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>
                      ${product.basePrice.toFixed(2)}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      {getProductTypeBadge(product)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild size="sm" variant="ghost">
                          <Link to={`/products/edit/${product.id}`}>
                            <Edit className="w-4 h-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteId(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductsPage;
