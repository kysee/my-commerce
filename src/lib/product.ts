
// 상품 타입 정의
export interface Product {
    id: number;
    name: string;
    description: string;
    seller: string;
    price: number;
    image: string;
}

const imgs: string[] = [
    "/food1.jpg",
    "/food2.jpg",
    "/food3.png",
    "/7pants.jpg",
    "/one.jpg"
]

// 더미 데이터
export const DUMMY_PRODUCTS: Product[] = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    name: `상품 ${i + 1}`,
    description: `이것은 상품 ${i + 1}의 간략한 설명입니다.`,
    seller: `판매자 ${((i % 5) + 1)}`,
    price: 10000 + i * 500,
    image: imgs[i % imgs.length],
}));

export function getProduct(id: number): Product | undefined {
    return DUMMY_PRODUCTS.find(p => p.id === id);
}
