'use client';

import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import * as React from "react";
import { Product, ProductStore } from "@/lib/product";
import QRCode from "react-qr-code";

const PRODUCTS_PER_ROW = 3;
const MAX_ROWS = 3;
const PRODUCTS_PER_PAGE = PRODUCTS_PER_ROW * MAX_ROWS;

interface ProductListProps {
    products: Product[];
}
export default function ProductList(props: ProductListProps) {
    const prodStore = props.products;
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [invoiceUrl, setInvoiceUrl] = React.useState("");
    const [qrValue, setQrValue] = React.useState("");

    const filtered = prodStore.filter((p) =>
        p.name.includes(search) || p.description.includes(search) || p.seller.includes(search)
    );
    const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
    const paged = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
    const isMobile = useIsMobile();

    function showDeepLinkQR(product: Product) {
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const port = window.location.port;
        const getUrl = encodeURIComponent(`${protocol}//${host}:${port}/invoice?prodid=${product.id}`);
        const deepLink = `mywallet://invoice?r=${getUrl}`;

        if (isMobile) {
            window.location.href = deepLink;
            return;
        } else {
            setInvoiceUrl(getUrl);
            setQrValue(deepLink);
            setDialogOpen(true);
        }
    }

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto py-8">
            {/* 검색 UI */}
            <div className="w-full flex justify-center mb-8">
                <input
                    className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="상품명, 설명, 판매자 검색..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
            </div>
            {/* 상품 그리드 */}
            <div className="grid w-full gap-4"
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
                    justifyContent: 'center',
                    gridAutoRows: "1fr",
                    padding: '0 16px'
                }}
            >
                {paged.map(product => (
                    <Card key={product.id} className="flex flex-col items-center p-0 rounded-2xl overflow-hidden h-72">
                        <div className="relative w-full h-2/3 flex-shrink-0">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 20vw"
                                priority
                            />
                        </div>
                        <CardContent className="flex flex-col w-full px-3 pt-0 pb-4 gap-0 flex-1 justify-end">
                            <div className="flex w-full items-center mb-0.5">
                                <span className="font-bold text-[12px] truncate w-0 flex-1 leading-[1.1] text-left">{product.name}</span>
                                <span className="text-[11px] text-gray-500 leading-none text-right ml-2 whitespace-nowrap">{product.seller}</span>
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-1 w-full leading-snug mb-0.5">{product.description}</div>
                            <Button variant="outline"
                                className="w-auto mt-1 mb-2 px-0.5 py-0.5 flex justify-end items-center gap-1 self-end !h-auto !min-h-0 !rounded bg-primary text-white"
                                onClick={() => showDeepLinkQR(product)}>
                                <span className="font-semibold text-sm">{product.price.toLocaleString()}</span>
                                <span className="align-middle text-[10px]">CKRW</span>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {/* 페이징 UI */}
            <div className="flex gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 rounded-md border ${page === i + 1 ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                        onClick={() => setPage(i + 1)}
                        disabled={page === i + 1}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            {/* 다이얼로그 */}
            {dialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative flex flex-col items-center">
                        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setDialogOpen(false)}>&times;</button>
                        <h2 className="text-lg font-bold mb-4">PaymentRequest QR</h2>
                        <div className="flex flex-col items-center">
                            <QRCode value={qrValue} size={256} />
                        </div>
                        <p> <a href={decodeURIComponent(invoiceUrl)}>InvoiceURL</a></p>
                    </div >
                </div>
            )}
        </div >
    );
}

export function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 브라우저 환경에서만 동작
        const checkMobile = () => setIsMobile(window.innerWidth <= breakpoint);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [breakpoint]);

    return isMobile;
}
