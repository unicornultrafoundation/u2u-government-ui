import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { appConfig } from '../../contants'

export const [walletConnectV2, walletConnectV2Hooks] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "62af7afc9ea027bc1a727c14fce0f5c5",
        chains: [appConfig.chainID],
        showQrModal: true,
      },
      defaultChainId: appConfig.chainID
    })
)