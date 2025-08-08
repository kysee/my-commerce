
import { getProductStore } from "@/lib/product";
import { Invoice } from '@/lib/invoice';
import { randomHexString } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';


const chainId = "0xDEA8D3"; // devnet0
// const platformAccountAddr = "0x092AA1CB78F490A2E424C7B2E12A6D6C62F401E1";
const storeAccountAddr = "0x89C12C4E4947AFEC2F27495F47DAC691A18CAEE4";
const tokenContractAddr = "0x3aa757aa5749be7d3cb1c0d7c59e6ef70de4ff8b";
const storeId = uuidv4();


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const prodid = searchParams.get('prodid')!;
    const product = getProductStore().getProduct(prodid)!;
    const req: Invoice = {
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
        payments: [
            {
                chainId,
                address: tokenContractAddr,
                amount: product.price
            },
            {
                chainId,
                address: tokenContractAddr,
                amount: product.price
            },

        ],
        signature: randomHexString(65)// dummy signature
    };
    return NextResponse.json(req);
}