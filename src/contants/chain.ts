
export const ACTIVE_CHAINID = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 2484

export const u2uNebulasTestnet = {
  id: 2484,
  name: 'U2U Nebulas Testnet',
  network: 'avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'U2U',
    symbol: 'U2U',
  },
  rpcUrls: {
    public: { http: ['https://rpc-nebulas-testnet.uniultra.xyz/'] },
    default: { http: ['https://rpc-nebulas-testnet.uniultra.xyz/'] },
  },
  blockExplorers: {
    etherscan: { name: 'Nebulas Testnet', url: 'https://testnet.u2uscan.xyz/' },
    default: { name: 'Nebulas Testnet', url: 'https://testnet.u2uscan.xyz/' },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
}

// export const u2uNebulasTestnet = {
//   id: ACTIVE_CHAINID,
//   name: NAME,
//   network: NETWORK,
//   nativeCurrency: {
//     decimals: Number(DECIMAL),
//     name: 'U2U',
//     symbol: 'U2U',
//   },
//   rpcUrls: {
//     public: { http: [CHAIN_RPC] },
//     default: { http: [CHAIN_RPC] },
//   },
//   blockExplorers: {
//     etherscan: { name: CHAIN_EXPLORER, url: CHAIN_EXPLORER_URL },
//     default: { name: CHAIN_EXPLORER, url: CHAIN_EXPLORER_URL },
//   },
//   // contracts: {
//   //   multicall3: {
//   //     address: '0xca11bde05977b3631167028862be2a173976ca11',
//   //     blockCreated: 11_907_934,
//   //   },
//   // },
// }
