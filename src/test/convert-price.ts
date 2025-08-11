import { TokenSet } from '@/lib/token';


const tokenSet = TokenSet.getInstance();
const amt = tokenSet.exchange(
    "2300000000000000000000",
    { chainId: '0x', address: '0x', symbol: 'KRW' },
    { chainId: '0x', address: '0x', symbol: 'USDC' }
);
console.log("amount", `${amt.substring(0, amt.length - 18)}.${amt.substring(amt.length - 18)}`);


