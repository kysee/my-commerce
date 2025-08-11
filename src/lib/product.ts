import { ProductStoreFactory, ProductStoreFactoryFromFile } from "./product-factory";

export type Product = {
    id: string;
    name: string;
    description: string;
    seller: string;
    price: number;
    image: string;
}


export class ProductStore extends Array<Product> {
    private static prods: ProductStore;

    constructor(...items: Product[]) {
        super(...items);
    }

    static init(factory: ProductStoreFactory) {
        ProductStore.prods = factory.createProductStore();
    }
    static getInstance(): ProductStore {
        if (!ProductStore.prods) {
            throw new Error("ProductStore is not initialized");
        }
        return ProductStore.prods;
    }
}

ProductStore.init(new ProductStoreFactoryFromFile('src/res/sample-products.json'));
