
import { Product } from "@/types/product";
import { toast } from "sonner";

// Mock data for initial products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Basic T-Shirt",
    description: "A comfortable cotton t-shirt",
    basePrice: 19.99,
    sku: "TS-001",
    stock: 100,
    images: [],
    variants: [
      {
        id: "1-1",
        attributes: [
          { name: "Size", value: "S" },
          { name: "Color", value: "Red" }
        ],
        price: 19.99,
        sku: "TS-001-S-RED",
        stock: 30
      },
      {
        id: "1-2",
        attributes: [
          { name: "Size", value: "M" },
          { name: "Color", value: "Red" }
        ],
        price: 19.99,
        sku: "TS-001-M-RED",
        stock: 25
      },
      {
        id: "1-3",
        attributes: [
          { name: "Size", value: "L" },
          { name: "Color", value: "Red" }
        ],
        price: 19.99,
        sku: "TS-001-L-RED",
        stock: 20
      },
      {
        id: "1-4",
        attributes: [
          { name: "Size", value: "S" },
          { name: "Color", value: "Blue" }
        ],
        price: 19.99,
        sku: "TS-001-S-BLUE",
        stock: 25
      }
    ],
    modifiers: [],
    isComposite: false,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  },
  {
    id: "2",
    name: "Coffee",
    description: "Premium coffee with customizable options",
    basePrice: 3.99,
    sku: "CF-001",
    stock: 500,
    images: [],
    variants: [],
    modifiers: [
      {
        id: "2-1",
        name: "Size",
        type: "radio",
        required: true,
        options: [
          { id: "2-1-1", name: "Small", priceAdjustment: 0 },
          { id: "2-1-2", name: "Medium", priceAdjustment: 1 },
          { id: "2-1-3", name: "Large", priceAdjustment: 2 }
        ]
      },
      {
        id: "2-2",
        name: "Add-ons",
        type: "checkbox",
        required: false,
        options: [
          { id: "2-2-1", name: "Extra Shot", priceAdjustment: 0.75 },
          { id: "2-2-2", name: "Whipped Cream", priceAdjustment: 0.5 },
          { id: "2-2-3", name: "Vanilla Syrup", priceAdjustment: 0.5 }
        ]
      }
    ],
    isComposite: false,
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-02-20")
  },
  {
    id: "3",
    name: "Breakfast Combo",
    description: "Complete breakfast bundle",
    basePrice: 12.99,
    sku: "BC-001",
    stock: 50,
    images: [],
    variants: [],
    modifiers: [],
    isComposite: true,
    compositeProducts: [
      { productId: "2", quantity: 1, productName: "Coffee" },
      { productId: "4", quantity: 1, productName: "Croissant" }
    ],
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-10")
  },
  {
    id: "4",
    name: "Croissant",
    description: "Freshly baked croissant",
    basePrice: 2.99,
    sku: "CR-001",
    stock: 75,
    images: [],
    variants: [
      {
        id: "4-1",
        attributes: [
          { name: "Type", value: "Plain" }
        ],
        price: 2.99,
        sku: "CR-001-PLAIN",
        stock: 25
      },
      {
        id: "4-2",
        attributes: [
          { name: "Type", value: "Chocolate" }
        ],
        price: 3.49,
        sku: "CR-001-CHOC",
        stock: 25
      },
      {
        id: "4-3",
        attributes: [
          { name: "Type", value: "Almond" }
        ],
        price: 3.99,
        sku: "CR-001-ALMOND",
        stock: 25
      }
    ],
    modifiers: [],
    isComposite: false,
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-05")
  }
];

// Create a store for our products
let productsStore: Product[] = [...mockProducts];

// Helper function to get a product by ID
export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return productsStore.find(product => product.id === id);
  } catch (error) {
    console.error("Error fetching product:", error);
    toast.error("Failed to load product");
    return undefined;
  }
};

// Helper function to get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return productsStore;
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to load products");
    return [];
  }
};

// Helper function to create a new product
export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newProduct: Product = {
      ...product,
      id: String(productsStore.length + 1),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    productsStore.push(newProduct);
    toast.success("Product created successfully");
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    toast.error("Failed to create product");
    throw error;
  }
};

// Helper function to update an existing product
export const updateProduct = async (id: string, product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = productsStore.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const updatedProduct: Product = {
      ...product,
      id,
      createdAt: productsStore[index].createdAt,
      updatedAt: new Date(),
    };

    productsStore[index] = updatedProduct;
    toast.success("Product updated successfully");
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    toast.error("Failed to update product");
    throw error;
  }
};

// Helper function to delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    productsStore = productsStore.filter(product => product.id !== id);
    toast.success("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Failed to delete product");
    throw error;
  }
};

// Helper function to update composite products when a product name changes
export const updateCompositeProductReference = (productId: string, newName: string): void => {
  productsStore = productsStore.map(product => {
    if (product.isComposite && product.compositeProducts) {
      const updatedCompositeProducts = product.compositeProducts.map(cp => {
        if (cp.productId === productId) {
          return { ...cp, productName: newName };
        }
        return cp;
      });
      return { ...product, compositeProducts: updatedCompositeProducts };
    }
    return product;
  });
};

// Helper function to generate a unique SKU
export const generateSku = (baseSku: string, attributes?: { name: string; value: string }[]): string => {
  if (!attributes || attributes.length === 0) {
    return baseSku;
  }

  const suffix = attributes
    .map(attr => attr.value.toUpperCase().substring(0, 3))
    .join('-');

  return `${baseSku}-${suffix}`;
};
