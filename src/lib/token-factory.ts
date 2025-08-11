import { readFileSync } from "fs";
import { TokenSet } from "./token";


export interface TokenSetFactory {
    createTokenSet(): TokenSet;
}

export class TokenSetFactoryFromFile implements TokenSetFactory {
    constructor(private srcPath: string) { }
    createTokenSet(): TokenSet {
        console.log('TokenSetFactoryFromFile.srcPath', this.srcPath);
        const fileContents = readFileSync(this.srcPath, 'utf-8');
        const res = JSON.parse(fileContents);
        const ret = new TokenSet(...res.tokens);
        ret.setExRates(res.exRates);
        return ret;
    }
}