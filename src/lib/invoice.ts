export type Account = {
    chainId: `0x${string}`;
    address: `0x${string}`;
};

export type Token = {
    chainId: `0x${string}`;
    address: `0x${string}`;
    name?: string;
    symbol?: string;
    decimal?: number;
};

export type Store = {
    id: string;
    name: string;
    accounts: Account[];
    rate: number;
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
    payments: (Token & { amount: string | number })[];
    signature: Uint8Array | string;
}
