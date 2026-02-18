export interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
    avatar?: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    reviews?: Review[];
}

export interface User {
    id: number;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
    role?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface AuthState {
    user: User | null;
    token: string | null; // This will act as our accessToken in Redux
    loading: boolean;
    error: string | null;
}

export interface ProductState {
    items: Product[];
    currentProduct: Product | null;
    loading: boolean;
    error: string | null;
}

export interface CartState {
    items: CartItem[];
    totalAmount: number;
    totalQuantity: number;
}
