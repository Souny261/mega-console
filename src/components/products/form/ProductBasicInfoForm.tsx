
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface ProductBasicInfoFormProps {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  sku: string;
  setSku: (value: string) => void;
  basePrice: number;
  setBasePrice: (value: number) => void;
  stock: number;
  setStock: (value: number) => void;
}

const ProductBasicInfoForm = ({
  name,
  setName,
  description,
  setDescription,
  sku,
  setSku,
  basePrice,
  setBasePrice,
  stock,
  setStock,
}: ProductBasicInfoFormProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU <span className="text-red-500">*</span></Label>
              <Input
                id="sku"
                placeholder="Enter product SKU"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">
                Unique identifier for this product
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Base Price ($) <span className="text-red-500">*</span></Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={basePrice === 0 ? "" : basePrice}
                onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock <span className="text-red-500">*</span></Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="0"
                value={stock === 0 ? "" : stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductBasicInfoForm;
