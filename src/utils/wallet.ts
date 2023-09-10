import { appConfig } from "../contants"

export const setupNetwork = async () => {
  const provider = (window as WindowChain).ethereum
  if (provider) {
    const chainId = appConfig.chainID
    try {
      await (provider as any).request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: appConfig.networkName,
            nativeCurrency: {
              name: appConfig.tokenName,
              symbol: 'u2u',
              decimals: 18
            },
            rpcUrls: [appConfig.rpc],
            blockExplorerUrls: [appConfig.explorer],
          },
        ],
      })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  } else {
    console.error("Can't setup the U2U network on metamask because window.ethereum is undefined")
    return false
  }
}