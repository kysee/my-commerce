import { Product, ProductStore } from '@/lib/product';

const items: { nm: string, desc: string, img: string, seller: string, price: number }[] = [
    { img: "/food1.jpg", nm: "BBQ 양념치킨", seller: 'BBQ', desc: '', price: 21000 },
    { img: "/food2.jpg", nm: "고구마", seller: '여주 주말 농장', desc: '', price: 35000 },
    { img: "/food3.png", nm: "비에날씬 - 다이어트 유산균", seller: '건강식품(주)', desc: '', price: 10000 },
    { img: "/7pants.jpg", nm: "adabat 여성 7부 바지", seller: '쿠팡', desc: '', price: 22000 },
    { img: "/one.jpg", nm: "블루 오리진 원피스", seller: '쿠팡', desc: '', price: 31000 },
];

export class SampleProducts implements ProductStore {
    products = Array.from({ length: 30 }).map((_, i) => ({
        id: `${i + 1}`,
        name: items[i % items.length].nm,
        description: items[i % items.length].desc,
        seller: items[i % items.length].seller,
        price: items[i % items.length].price,
        image: items[i % items.length].img,
    }));

    constructor() {
        console.log("new SampleProducts");
    }

    getProductList(): Product[] {
        return this.products ?? [];
    }

    getProduct(id: string): Product | undefined {
        return this.products.find(p => p.id === id);
    }
}