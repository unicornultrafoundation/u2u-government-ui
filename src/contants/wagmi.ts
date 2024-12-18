import { http, createConfig } from 'wagmi'
import { u2uNebulasTestnet } from './chain'
import { mainnet, sepolia } from 'wagmi/chains'
import { metaMask } from '@wagmi/connectors';
import {
    bitgetWallet,
    injectedWallet,
    walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";


import { connectorsForWallets } from '@rainbow-me/rainbowkit'

const connectors = connectorsForWallets(
    [
        {
            groupName: "Main",
            wallets: [bitgetWallet, walletConnectWallet, injectedWallet],
        },
    ],
    {
        projectId: "815145290a10a9393358a85a318d47ad",
        appName: 'Staking',
    }
);


export const wagmiConfig = createConfig({
    connectors: [metaMask(), ...connectors],
    chains: [u2uNebulasTestnet],
    ccipRead: false,
    transports: {
        [u2uNebulasTestnet.id]: http(),
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
    multiInjectedProviderDiscovery: false,
    ssr: true,
});
