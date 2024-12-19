import {http, createConfig, createStorage, cookieStorage} from 'wagmi'
import { u2uNebulasTestnet } from './chain'
import { metaMask } from '@wagmi/connectors';
import {
    bitgetWallet,
    injectedWallet, okxWallet,
    walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";


import { connectorsForWallets } from '@rainbow-me/rainbowkit'

// const connectors = connectorsForWallets(
//     [
//         {
//             groupName: "Main",
//             wallets: [okxWallet,bitgetWallet, walletConnectWallet, injectedWallet],
//         },
//     ],
//     {
//         projectId: "815145290a10a9393358a85a318d47ad",
//         appName: 'BlockFun',
//     }
// );



// export const wagmiConfig = createConfig({
//     connectors: [metaMask(), ...connectors],
//     chains: [mainnet, sepolia, u2uNebulasTestnet],
//     client({ chain }) {
//         return createClient({ chain, transport: http() });
//     },
//     ssr: true,
// });

export const projectId = '815145290a10a9393358a85a318d47ad';

if (!projectId) {
    throw new Error('Project ID is not defined');
}

const appName = 'U2U Staking';

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Main',
            wallets: [okxWallet, bitgetWallet, walletConnectWallet, injectedWallet],
        },
    ],
    {
        projectId,
        appName,
    },
);

export const wagmiConfig = createConfig({
    connectors: [metaMask(), ...connectors],
    chains: [u2uNebulasTestnet],
    ccipRead: false,
    transports: {
        [u2uNebulasTestnet.id]: http(),
    },
    multiInjectedProviderDiscovery: false,
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true,
});
