import { appConfig } from "./config"

// export const ACTIVE_CHAINID = Number(process.env.REACT_APP_U2U_CHAINID) || 2484

// export const NAME = process.env.REACT_APP_CHAIN_NAME as string
// export const NETWORK = process.env.REACT_APP_CHAIN_NETWORK as string
// export const DECIMAL = process.env.REACT_APP_CHAIN_CURRENCY_DECIMAL as string
// export const CHAIN_RPC = process.env.REACT_APP_CHAIN_RPC as string
// export const CHAIN_EXPLORER = process.env.REACT_APP_CHAIN_BLOCK_EXPLORER_NAME as string
// export const CHAIN_EXPLORER_URL = process.env.REACT_APP_CHAIN_BLOCK_EXPLORER_URL as string


// export const u2uNebulasTestnet = {
//   id: 2484,
//   name: 'U2U Nebulas Testnet',
//   network: 'avalanche',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'U2U',
//     symbol: 'U2U',
//   },
//   rpcUrls: {
//     public: { http: ['https://rpc-nebulas-testnet.uniultra.xyz/'] },
//     default: { http: ['https://rpc-nebulas-testnet.uniultra.xyz/'] },
//   },
//   blockExplorers: {
//     etherscan: { name: 'Nebulas Testnet', url: 'https://testnet.u2uscan.xyz/' },
//     default: { name: 'Nebulas Testnet', url: 'https://testnet.u2uscan.xyz/' },
//   },
//   // contracts: {
//   //   multicall3: {
//   //     address: '0xca11bde05977b3631167028862be2a173976ca11',
//   //     blockCreated: 11_907_934,
//   //   },
//   // },
// }

export const u2uNebulasTestnet = {
  id: appConfig.chainID,
  name: appConfig.tokenName,
  network: appConfig.networkName,
  nativeCurrency: {
    decimals: 18,
    name: 'U2U',
    symbol: 'U2U',
  },
  rpcUrls: {
    public: { http: [appConfig.rpc] },
    default: { http: [appConfig.rpc] },
  },
  blockExplorers: {
    etherscan: { name: appConfig.networkName, url: appConfig.explorer },
    default: { name: appConfig.networkName, url: appConfig.explorer },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
}