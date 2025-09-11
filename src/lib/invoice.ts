import { Token } from "./token";

export type Account = {
    chainId: `0x${string}`;
    address: `0x${string}`;
};

export type Store = {
    id: string;
    name: string;
    accounts: Account[];
    rate: string;
};

export type Item = {
    id: string;
    name: string;
    amount: number | string;
    price: {
        unit: string;
        amount: number | string;
    }
};

export type Invoice = {
    id: String;
    stores: Store[];
    items: Item[];
    payments?: (Token & { amount: string | number })[];
    signature: Uint8Array | string;
}
