import { readFileSync } from "fs";
import { TokenSet } from "./token";


export interface TokenSetFactory {
    createTokenSet(): TokenSet;
}

export class TokenSetFactoryFromFile implements TokenSetFactory {
    constructor(private srcTok: string) { }
    createTokenSet(): TokenSet {
        const fileContents = readFileSync(this.srcTok, 'utf-8');
        const res = JSON.parse(fileContents);
        const ret = new TokenSet(...res.tokens);
        ret.setExRates(res.exRates);
        return ret;
    }
}