import { ProductStore } from "@/lib/product";
import { readFileSync } from "fs";


export interface ProductStoreFactory {
    createProductStore(): ProductStore;
}

export class ProductStoreFactoryFromFile implements ProductStoreFactory {
    constructor(private srcPath: string) { }

    createProductStore(): ProductStore {
        console.log('ProductStoreFactoryFromFile.srcPath', this.srcPath);
        const fileContents = readFileSync(this.srcPath, 'utf-8');
        const prods = JSON.parse(fileContents);
        return new ProductStore(...prods);
    }
}