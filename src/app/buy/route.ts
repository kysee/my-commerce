
import { getProduct } from "@/lib/product";
import { PayementRequest } from '@/components/PaymentRequest';
import { randomHexString } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log("buy");
    // URL 객체로 변환
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터 추출
    const prodid = searchParams.get('prodid'); // "1234"
    const product = getProduct(Number(prodid))!;
    const chainId = "0xbea8d3";
    const req: PayementRequest = {
        stores: [
            {
                id: String(product.id),
                name: product.seller,
                account: {
                    chainId,
                    address: randomHexString(20) as any
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
                address: randomHexString(20) as any,
            },
            to: [
                {
                    chainId,
                    address: randomHexString(20) as any
                }
            ],
            amount: product.price
        },
        signature: randomHexString(65) as any
    };
    // const jsonstr = JSON.stringify(req);


    return NextResponse.json(req);
}