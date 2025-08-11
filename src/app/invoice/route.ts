
import { getProductStore } from "@/lib/product";
import { Invoice } from '@/lib/invoice';
import { randomHexString } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { TokenSet } from "@/lib/token";


const chainId = "0xDEA8D3"; // devnet0
// const platformAccountAddr = "0x092AA1CB78F490A2E424C7B2E12A6D6C62F401E1";
const storeAccountAddr = "0x89C12C4E4947AFEC2F27495F47DAC691A18CAEE4";
const tokenContractAddr = "0x3aa757aa5749be7d3cb1c0d7c59e6ef70de4ff8b";
const storeId = uuidv4();


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const prodid = searchParams.get('prodid')!;
    const wantedChainId = searchParams.get('chainId')!;
    const wantedTokAddr = searchParams.get('tokAddr')!;
    const product = getProductStore().getProduct(prodid)!;

    const tokenset = TokenSet.getInstance();
    const found = tokenset.filter(
        tok => (!wantedChainId || (wantedChainId.toLowerCase() == tok.chainId.toLowerCase())) &&
            (!wantedTokAddr || (wantedTokAddr.toLowerCase() == tok.address.toLowerCase()))
    );

    if (found.length <= 0) {
        return NextResponse.json({ error: 'not found token' });
    }

    const invoice: Invoice = {
        id: uuidv4(),
        stores: [
            {
                id: storeId,
                name: product.seller,
                accounts: [{
                    chainId,
                    address: storeAccountAddr,
                }],
                rate: 100,

            }
        ],
        items: [
            {
                id: product.id,
                name: product.name,
                amount: 1,
                price: {
                    unit: "KRW",
                    amount: product.price
                }
            }
        ],
        payments:
            found != undefined ? found.map(tok => ({
                ...tok, amount: tokenset.exchange(
                    BigInt(product.price) * 10n ** 18n,
                    { chainId: '0x', address: '0x', symbol: "KRW" },
                    tok
                )
            })
            ) : [],
        signature: '0xAAA',
    }
    return NextResponse.json(invoice);
}