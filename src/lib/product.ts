import { DUMMY_PRODUCTS } from "@/lib/sample-prod";
// 상품 타입 정의
export interface Product {
    id: string;
    name: string;
    description: string;
    seller: string;
    price: number;
    image: string;
}

export function getProductList(): Product[] {
    return DUMMY_PRODUCTS;
}
export function getProduct(id: string): Product | undefined {
    return DUMMY_PRODUCTS.find(p => p.id === id);
}
