export interface ProductVariant {
    id: string;
    sku: string;
    name: string;
    price: number;
    stockLevel: number;
    attributes: {
        [key: string]: string; // e.g., { size: "L", color: "Red" }
    };
}

export interface ProductModifier {
    id: string;
    name: string;
    required: boolean;
    multiSelect: boolean;
    options: {
        id: string;
        name: string;
        price: number;
    }[];
}

export interface CompositeProductComponent {
    id: string;
    productId: string;
    quantity: number;
    required: boolean;
    allowSubstitutions: boolean;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    images: string[];
    variants: ProductVariant[];
    modifiers: ProductModifier[];
    isComposite: boolean;
    components?: CompositeProductComponent[];
    createdAt: Date;
    updatedAt: Date;
} 