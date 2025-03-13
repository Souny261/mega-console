
import { useState } from "react";
import { generateSku } from "@/services/productService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PlusCircle, X, RefreshCw } from "lucide-react";
import { Variant, VariantAttribute } from "@/types/product";

interface ProductVariantsFormProps {
  baseSku: string;
  variants: Variant[];
  setVariants: (variants: Variant[]) => void;
}

const ProductVariantsForm = ({
  baseSku,
  variants,
  setVariants,
}: ProductVariantsFormProps) => {
  const [attributeNames, setAttributeNames] = useState<string[]>(
    variants.length > 0 && variants[0].attributes.length > 0
      ? variants[0].attributes.map(attr => attr.name)
      : ["Size", "Color"] // Default attribute names
  );

  const [newAttributeName, setNewAttributeName] = useState("");
  
  // Get unique attribute values for each attribute name
  const getUniqueAttributeValues = (attributeName: string): string[] => {
    const values = new Set<string>();
    variants.forEach(variant => {
      const attribute = variant.attributes.find(attr => attr.name === attributeName);
      if (attribute) {
        values.add(attribute.value);
      }
    });
    return Array.from(values);
  };

  // Add a new attribute name
  const handleAddAttributeName = () => {
    if (newAttributeName.trim() && !attributeNames.includes(newAttributeName)) {
      setAttributeNames([...attributeNames, newAttributeName]);
      setNewAttributeName("");
      
      // Add the new attribute with empty value to all existing variants
      if (variants.length > 0) {
        setVariants(
          variants.map(variant => ({
            ...variant,
            attributes: [...variant.attributes, { name: newAttributeName, value: "" }],
          }))
        );
      }
    }
  };

  // Remove an attribute name
  const handleRemoveAttributeName = (attributeName: string) => {
    const updatedAttributeNames = attributeNames.filter(name => name !== attributeName);
    setAttributeNames(updatedAttributeNames);
    
    // Remove this attribute from all variants
    setVariants(
      variants.map(variant => ({
        ...variant,
        attributes: variant.attributes.filter(attr => attr.name !== attributeName),
        sku: generateSku(
          baseSku,
          variant.attributes.filter(attr => attr.name !== attributeName)
        ),
      }))
    );
  };

  // Add a new variant
  const handleAddVariant = () => {
    const newVariant: Variant = {
      id: `new-${Date.now()}`,
      attributes: attributeNames.map(name => ({ name, value: "" })),
      price: 0,
      sku: "",
      stock: 0,
    };
    setVariants([...variants, newVariant]);
  };

  // Remove a variant
  const handleRemoveVariant = (variantId: string) => {
    setVariants(variants.filter(variant => variant.id !== variantId));
  };

  // Update variant attribute value
  const handleUpdateVariantAttribute = (variantIndex: number, attributeName: string, value: string) => {
    const updatedVariants = [...variants];
    const attributeIndex = updatedVariants[variantIndex].attributes.findIndex(
      attr => attr.name === attributeName
    );
    
    if (attributeIndex !== -1) {
      updatedVariants[variantIndex].attributes[attributeIndex].value = value;
      
      // Update SKU based on attributes
      updatedVariants[variantIndex].sku = generateSku(
        baseSku,
        updatedVariants[variantIndex].attributes
      );
      
      setVariants(updatedVariants);
    }
  };

  // Update variant price
  const handleUpdateVariantPrice = (variantIndex: number, price: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].price = price;
    setVariants(updatedVariants);
  };

  // Update variant stock
  const handleUpdateVariantStock = (variantIndex: number, stock: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].stock = stock;
    setVariants(updatedVariants);
  };

  // Generate all possible variants based on attribute combinations
  const generateAllVariants = () => {
    // Get all possible values for each attribute
    const attributeValues: Record<string, string[]> = {};
    attributeNames.forEach(name => {
      attributeValues[name] = getUniqueAttributeValues(name).filter(value => value.trim() !== "");
    });
    
    // If no values are defined yet, can't generate variants
    const hasValues = Object.values(attributeValues).some(values => values.length > 0);
    if (!hasValues) return;
    
    // Generate all combinations
    const generateCombinations = (
      current: VariantAttribute[],
      nameIndex: number
    ): VariantAttribute[][] => {
      if (nameIndex >= attributeNames.length) {
        return [current];
      }
      
      const attributeName = attributeNames[nameIndex];
      const values = attributeValues[attributeName];
      
      // If no values for this attribute, skip it
      if (!values || values.length === 0) {
        return generateCombinations(
          [...current, { name: attributeName, value: "" }],
          nameIndex + 1
        );
      }
      
      // Generate combinations for each value of this attribute
      let combinations: VariantAttribute[][] = [];
      values.forEach(value => {
        const newCurrent = [...current, { name: attributeName, value }];
        const nextCombinations = generateCombinations(newCurrent, nameIndex + 1);
        combinations = [...combinations, ...nextCombinations];
      });
      
      return combinations;
    };
    
    const combinations = generateCombinations([], 0);
    
    // Create variants for new combinations
    const existingVariants = [...variants];
    const newVariants: Variant[] = [];
    
    combinations.forEach(attributes => {
      // Check if this combination already exists
      const exists = existingVariants.some(variant => {
        return attributes.every(attr => {
          const existingAttr = variant.attributes.find(a => a.name === attr.name);
          return existingAttr && existingAttr.value === attr.value;
        });
      });
      
      if (!exists) {
        // Find a similar variant to copy price/stock from
        const similarVariant = existingVariants.find(variant => {
          return variant.attributes.some(attr => {
            const newAttr = attributes.find(a => a.name === attr.name);
            return newAttr && newAttr.value === attr.value;
          });
        });
        
        newVariants.push({
          id: `new-${Date.now()}-${newVariants.length}`,
          attributes,
          price: similarVariant?.price || 0,
          sku: generateSku(baseSku, attributes),
          stock: similarVariant?.stock || 0,
        });
      }
    });
    
    if (newVariants.length > 0) {
      setVariants([...existingVariants, ...newVariants]);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Variant Attributes</h3>
            <p className="text-sm text-gray-500 mb-4">
              Define the attributes that create different variants of your product
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {attributeNames.map((name) => (
                <div
                  key={name}
                  className="flex items-center bg-gray-100 rounded-md px-3 py-1.5"
                >
                  <span className="text-sm font-medium">{name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttributeName(name)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add new attribute (e.g. Material)"
                value={newAttributeName}
                onChange={(e) => setNewAttributeName(e.target.value)}
                className="max-w-xs"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleAddAttributeName}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Variant Combinations</h3>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateAllVariants}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate All Combinations
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddVariant}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Variant
                </Button>
              </div>
            </div>
            
            {variants.length > 0 ? (
              <div className="border rounded-md overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {attributeNames.map((name) => (
                        <TableHead key={name}>{name}</TableHead>
                      ))}
                      <TableHead>SKU</TableHead>
                      <TableHead>Price ($)</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variants.map((variant, index) => (
                      <TableRow key={variant.id}>
                        {attributeNames.map((name) => {
                          const attribute = variant.attributes.find(
                            (attr) => attr.name === name
                          );
                          
                          return (
                            <TableCell key={`${variant.id}-${name}`}>
                              <Input
                                value={attribute?.value || ""}
                                onChange={(e) =>
                                  handleUpdateVariantAttribute(
                                    index,
                                    name,
                                    e.target.value
                                  )
                                }
                                className="w-full"
                              />
                            </TableCell>
                          );
                        })}
                        <TableCell>
                          <Input
                            value={variant.sku}
                            readOnly
                            className="w-full bg-gray-50 font-mono text-sm"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={variant.price === 0 ? "" : variant.price}
                            onChange={(e) =>
                              handleUpdateVariantPrice(
                                index,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            value={variant.stock === 0 ? "" : variant.stock}
                            onChange={(e) =>
                              handleUpdateVariantStock(
                                index,
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveVariant(variant.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="border rounded-md p-6 text-center">
                <p className="text-gray-500">No variants added yet</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddVariant}
                  className="mt-4"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add First Variant
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductVariantsForm;
