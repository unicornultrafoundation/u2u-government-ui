import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { POLLING_INTERVAL, appConfig } from "../contants";

const injected = new InjectedConnector({ supportedChainIds: [appConfig.chainID] });

export enum ConnectorNames {
    Injected = "injected"
}
export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected
}

export const getLibrary = (provider: any): Web3Provider => {
    const library = new Web3Provider(provider)
    library.pollingInterval = POLLING_INTERVAL
    return library
}