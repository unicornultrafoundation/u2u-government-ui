import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { createClient } from 'viem'
import { metaMask } from '@wagmi/connectors';
import {
    bitgetWallet,
      injectedWallet,
      walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";


import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {appConfig} from "./config";
import {u2uNebulasTestnet} from "./chain";
import {CreateConfigParameters} from "@wagmi/core/src/createConfig";

const connectors = connectorsForWallets(
  [
      {
          groupName: "Main",
          wallets: [bitgetWallet, walletConnectWallet, injectedWallet],
      },
  ],
  {
      projectId: "815145290a10a9393358a85a318d47ad",
      appName: 'Staking1',
  }
);

const config: CreateConfigParameters = {
    connectors: [metaMask(), ...connectors],
    chains: [mainnet, sepolia],
    client({ chain }) {
        return createClient({ chain, transport: http() });
    }
}


// export const wagmiConfig = createConfig({...config});
//

export const wagmiConfig: any = createConfig({
    connectors: [metaMask(), ...connectors],
    chains: [mainnet, sepolia, u2uNebulasTestnet],
    client({ chain }) {
        return createClient({ chain, transport: http() });
    },
    ssr: true,
});
