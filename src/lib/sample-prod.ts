import { Product, ProductStore } from '@/lib/product';
import { randomInt } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const imgs: string[] = [
    "/food1.jpg",
    "/food2.jpg",
    "/food3.png",
    "/7pants.jpg",
    "/one.jpg"
];

export class SampleProducts implements ProductStore {
    products = Array.from({ length: 30 }).map((_, i) => ({
        id: String(i + 1),
        name: `상품 ${i + 1}`,
        description: `이것은 상품 ${i + 1}의 간략한 설명입니다.`,
        seller: `판매자 ${((i % 5) + 1)}`,
        price: 10000 + i * 500,
        image: imgs[i % imgs.length],
    }));

    constructor() { }

    getProductList(): Product[] {
        return this.products ?? [];
    }

    getProduct(id: string): Product | undefined {
        return this.products.find(p => p.id === id);
    }
}