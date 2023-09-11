import { Web3Provider } from "@ethersproject/providers";
import { POLLING_INTERVAL } from "../contants";
import { metaMask, metaMaskHooks } from "./connectors/metamaskConnector";
import { Web3ReactHooks } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { walletConnectV2, walletConnectV2Hooks } from "./connectors/walletConnectConnectorV2";
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'


export enum ConnectorNames {
    MetaMaskLogin = "metamaskLogin",
    WalletConnectV2Login = "walletConnectV2Login"
}

export const connectorsByName: { [connectorName in ConnectorNames]: [MetaMask | WalletConnectV2 , Web3ReactHooks] } = {
    [ConnectorNames.MetaMaskLogin]: [metaMask, metaMaskHooks],
    [ConnectorNames.WalletConnectV2Login]: [walletConnectV2, walletConnectV2Hooks]
}

export const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider)
    library.pollingInterval = POLLING_INTERVAL
    return library
}