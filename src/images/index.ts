import MenuIcon from "./icons/menu-icon.svg"
import MetamaskIcon from "./metamask-wallet.png"
import WalletConnectLogo from "./icons/walletconnect.png"
import AvatarImage from "./avatar.png"
import Staking1PNG from "./staking-1.png"
import Staking2PNG from "./staking-2.png"
import Staking3PNG from "./staking-3.png"
export interface IconProps {
  className?: string
  onClick?: () => void
}
export * from "./icons/UserIcon"
export * from "./icons/WalletIcon"
export * from "./icons/OptionIcon"
export * from "./icons/CloseIcon"
export * from "./icons/ArrowDownIcon"
export * from "./icons/CopyIcon"
export * from "./icons/GlobeIcon"
export * from "./icons/LogoutIcon"

export const Images = {
  MenuIcon,
  MetamaskIcon,
  AvatarImage,
  Staking1PNG,
  Staking2PNG,
  Staking3PNG,
  WalletConnectLogo
}