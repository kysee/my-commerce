

console.log('100 KRW', 'CKRW', exchangeTokens({ amount: 1000, from: 'KRW', to: 'CKRW' }));
console.log('100 KRW', 'NKRW', exchangeTokens({ amount: 1000, from: 'KRW', to: 'NKRW' }));
console.log('100 KRW', 'KKRW', exchangeTokens({ amount: 1000, from: 'KRW', to: 'KKRW' }));
console.log('100 KRW', 'USDC', exchangeTokens({ amount: 1000, from: 'KRW', to: 'USDC' }));
console.log('100 KRW', 'USDC', exchangeTokens({ amount: 1300, from: 'KRW', to: 'USDC' }));
console.log('100 KRW', 'USDT', exchangeTokens({ amount: 1000, from: 'KRW', to: 'USDT' }));
console.log('1 USDC', 'KRW', exchangeTokens({ amount: 2.54e18, from: 'USDC', to: 'KRW' }));

