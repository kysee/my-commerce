import { Token } from "@/lib/token";

export const tokens: Token[] = [
    {
        name: 'CryptoKRW',
        symbol: 'CKRW',
        decimals: 18,
        chains: [
            {
                chainId: '0xDEA8D3',
                address: `0x3aa757aa5749be7d3cb1c0d7c59e6ef70de4ff8b`,
            }
        ]
    },
    {
        name: 'Circle/USDC',
        symbol: 'USDC',
        decimals: 18,
        chains: [
            {
                chainId: '0xDEA8D3',
                address: `0xf8764e78f9a27e46cc35792b49951e3b66cc0b61`,
            }
        ]
    },
    {
        name: 'Tether',
        symbol: 'USDT',
        decimals: 18,
        chains: [
            {
                chainId: '0xDEA8D3',
                address: `0xae817cf98765a1b83cccc7aaec2db49f4df79903`,
            }
        ]
    },
    {
        name: 'NaverKRW',
        symbol: 'NKRW',
        decimals: 18,
        chains: [
            {
                chainId: '0xDEA8D3',
                address: '0x192407cb21c5291be60e54ee0feb4d03f0ee53dd',
            }
        ]
    },
    {
        name: 'KakaoKRW',
        symbol: 'KKRW',
        decimals: 18,
        chains: [
            {
                chainId: '0xDEA8D3',
                address: '0xfaec048558112c43b50d26acaf59565d3f54ed18',
            }
        ]
    },
    {
        name: 'OkKRW',
        symbol: 'KKRW',
        decimals: 18,
        chains: [
            {
                chainId: '0xDEA8D3',
                address: '0x5412b6ad6a61d28267dd0fd7c99f42c5dc8dba90',
            }
        ]
    }
];