import { TokenSetFactory, TokenSetFactoryFromFile } from "./token-factory";

export type Token = {
    chainId: `0x${string}`;
    address: `0x${string}`;
    name?: string;
    symbol?: string;
    decimals?: number;
};

type ExRates = [[string /*token0 name*/, string /*token1 name*/, number /*token0 amt*/, number /*token1 amt*/]];

export class TokenSet extends Array<Token> {
    private static tokenSet: TokenSet;

    static init(factory: TokenSetFactory) {
        TokenSet.tokenSet = factory.createTokenSet();
    }
    static getInstance(): TokenSet {
        if (!TokenSet.tokenSet) {
            throw new Error("TokenSet is not initialized");
        }
        return TokenSet.tokenSet;
    }


    private exRates: ExRates;
    setExRates(r: ExRates) {
        this.exRates = r;
    }
    exchange(amount: string | bigint, src: Token, dst: Token): string {
        const amt = typeof amount == 'string' ? BigInt(amount) : amount;
        for (let i = 0; i < this.exRates.length; i++) {
            const r = this.exRates[i];
            if (r[0] === src.symbol && r[1] === dst.symbol) {
                return (amt * BigInt(r[3]) / BigInt(r[2])).toString();
            }
            if (r[0] === dst.symbol && r[1] === src.symbol) {
                return (amt * BigInt(r[2]) / BigInt(r[3])).toString();
            }
        }

        throw new Error(`token pair(${src.symbol} - ${dst.symbol}) is not found`);
    }

    constructor(...items: Token[]) {
        super(...items);
        this.exRates = [['', '', 0, 0]];
    }
}


TokenSet.init(new TokenSetFactoryFromFile('src/res/sample-tokens.json'));