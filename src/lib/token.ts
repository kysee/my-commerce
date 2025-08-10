export type Token = {
    name?: string;
    symbol?: string;
    decimals?: number;
    chains: {
        chainId: `0x${string}`;
        address: `0x${string}`;
    }[];
};

const rates = [
    ['KRW', 'USDC', 1300, 1],
    ['KRW', 'USDT', 1290, 1],
    ['KRW', 'CKRW', 1, 1],
    ['KRW', 'NKRW', 1, 1],
    ['KRW', 'KKRW', 1, 1],
    ['KRW', 'OKRW', 1, 1],
];


export function exchangeTokens(exinfo: { amount: number | string | bigint, from: string, to: string }): string {
    const amt = BigInt(exinfo.amount);
    for (var i = 0; i < rates.length; i++) {
        const r = rates[i];
        if (r[0] === exinfo.from && r[1] === exinfo.to) {
            return (amt * BigInt(r[3]) / BigInt(r[2])).toString();
        }
        if (r[0] === exinfo.to && r[1] === exinfo.from) {
            return (amt * BigInt(r[2]) / BigInt(r[3])).toString();
        }
    }

    throw new Error(`token pair (${exinfo.from} - ${exinfo.to}) is not found`);
}