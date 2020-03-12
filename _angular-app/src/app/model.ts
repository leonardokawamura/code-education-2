export interface Category {
    id?: number;
    name: string;
    readonly slug?: string;
    active: boolean;
    readonly created_at?: {date: string};
    readonly update_at?: {date: string};
}

export interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    readonly slug?: string;
    active: boolean;
    readonly created_at?: {date: string};
    readonly update_at?: {date: string};
}

export interface ProductCategory {
    product: Product;
    categories: Array<Category>;
}

export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string;
    readonly created_at?: {date: string};
    readonly update_at?: {date: string};
}