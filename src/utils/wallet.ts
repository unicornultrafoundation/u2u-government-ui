import { EXPLORER_LINK, NODE_RPC, U2U_CHAINID_MAINET } from "../contants"
export const setupNetwork = async () => {
  const provider = (window as WindowChain).ethereum
  if (provider) {
    const chainId = U2U_CHAINID_MAINET
    try {
      await (provider as any).request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: "U2U Chain",
            nativeCurrency: {
              name: 'U2U',
              symbol: 'u2u',
              decimals: 18
            },
            rpcUrls: [NODE_RPC],
            blockExplorerUrls: [EXPLORER_LINK],
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