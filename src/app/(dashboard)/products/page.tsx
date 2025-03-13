"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/types/product";
import { ProductDialog } from "@/components/products/ProductDialog";

// Mock data - replace with actual data fetching
const mockProducts: Product[] = [
    {
        id: "1",
        name: "Basic T-Shirt",
        description: "A comfortable cotton t-shirt",
        category: "Apparel",
        basePrice: 19.99,
        images: [],
        variants: [
            {
                id: "1-1",
                sku: "TS-BLK-L",
                name: "Black Large",
                price: 19.99,
                stockLevel: 100,
                attributes: { size: "L", color: "Black" },
            },
        ],
        modifiers: [],
        isComposite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(mockProducts);

    const handleAddProduct = (data: Product) => {
        const newProduct = {
            ...data,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setProducts([...products, newProduct]);
    };

    const handleEditProduct = (data: Product) => {
        setProducts(
            products.map((product) =>
                product.id === data.id
                    ? { ...data, updatedAt: new Date() }
                    : product
            )
        );
    };

    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground">
                        Manage your products, variants, and bundles
                    </p>
                </div>
                <ProductDialog onSubmit={handleAddProduct} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product Inventory</CardTitle>
                    <CardDescription>
                        A list of all your products including variants and bundles.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Base Price</TableHead>
                                <TableHead>Variants</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>${product.basePrice.toFixed(2)}</TableCell>
                                    <TableCell>{product.variants.length}</TableCell>
                                    <TableCell>
                                        {product.isComposite ? "Bundle" : "Simple"}
                                    </TableCell>
                                    <TableCell>
                                        <ProductDialog
                                            product={product}
                                            onSubmit={handleEditProduct}
                                            trigger={
                                                <Button variant="ghost" size="sm">
                                                    Edit
                                                </Button>
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
} 