export type Account = {
    chainId: `0x${string}`;
    address: `0x${string}`;
};

export type Token = {
    chainId: `0x${string}`;
    address: `0x${string}`;
};

export type Store = {
    id: string;
    name: string;
    account: Account;
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

export type PayInfo = {
    token: Token;
    to: Account[];
    amount: string | number;
}


export type PayementRequest = {
    stores: Store[];
    items: Item[];
    payment: PayInfo;
    signature: Uint8Array | string;
}
