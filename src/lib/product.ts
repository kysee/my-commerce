import { SampleProducts } from "../res/sample-prod";

export type Product = {
    id: string;
    name: string;
    description: string;
    seller: string;
    price: number;
    image: string;
}


export interface ProductStore {
    products: Product[];
    getProduct: (id: string) => Product | undefined;
    getProductList: () => Product[];
}

const productStore = new SampleProducts();
export function getProductStore(): ProductStore {
    return productStore;
}