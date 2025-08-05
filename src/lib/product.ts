import { SampleProducts } from "./sample-prod";

export interface Product {
    id: string;
    name: string;
    description: string;
    seller: string;
    price: number;
    image: string;
}


export interface ProductStore {
    products: Product[];
    getProduct(id: string): Product | undefined;
    getProductList(): Product[];
}

export function getProductStore(): ProductStore {
    return new SampleProducts();
}