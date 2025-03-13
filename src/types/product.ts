
// Product related types
export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  sku: string;
  stock: number;
  images: string[];
  variants: Variant[];
  modifiers: Modifier[];
  isComposite: boolean;
  compositeProducts?: CompositeProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Variant {
  id: string;
  attributes: VariantAttribute[];
  price: number;
  sku: string;
  stock: number;
}

export interface VariantAttribute {
  name: string;
  value: string;
}

export interface Modifier {
  id: string;
  name: string;
  type: 'checkbox' | 'radio' | 'select';
  required: boolean;
  options: ModifierOption[];
}

export interface ModifierOption {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface CompositeProduct {
  productId: string;
  quantity: number;
  productName?: string; // For display purposes
}

// Form related types
export interface ProductFormValues {
  name: string;
  description: string;
  basePrice: number;
  sku: string;
  stock: number;
  images: string[];
  variants: Variant[];
  modifiers: Modifier[];
  isComposite: boolean;
  compositeProducts: CompositeProduct[];
}
