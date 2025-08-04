
import { getProduct } from "@/lib/product";
import { PayementRequest } from '@/components/PaymentRequest';
import { randomHexString } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

const platformAccountAddr = "0x092AA1CB78F490A2E424C7B2E12A6D6C62F401E1";
const storeAccountAddr = "0x89C12C4E4947AFEC2F27495F47DAC691A18CAEE4";
const tokenContractAddr = "0x3aa757aa5749be7d3cb1c0d7c59e6ef70de4ff8b";


export async function GET(request: NextRequest) {
    // URL 객체로 변환
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 추출
    const prodid = searchParams.get('prodid'); // "1234"
    const product = getProduct(Number(prodid))!;
    const chainId = "0xDEAD83";
    const req: PayementRequest = {
        stores: [
            {
                id: String(product.id),
                name: product.seller,
                account: {
                    chainId,
                    address: storeAccountAddr
                }
            }
        ],
        items: [
            {
                id: String(product.id),
                name: product.name,
                amount: 1,
                price: {
                    unit: "CKRW",
                    amount: product.price
                }
            }
        ],
        payment: {
            token: {
                chainId,
                address: tokenContractAddr,
            },
            to: [
                {
                    chainId,
                    address: storeAccountAddr,
                    amount: product.price * 9 / 10
                },
                {
                    chainId,
                    address: platformAccountAddr,
                    amount: product.price * 1 / 10
                }
            ],

        },
        signature: randomHexString(65) as any
    };
    return NextResponse.json(req);
}