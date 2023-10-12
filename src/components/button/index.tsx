import { ButtonHTMLAttributes, useMemo, useState } from "react";
import { classNames } from "../../utils/string";
import { useWeb3React } from "@web3-react/core";
import { WalletLoginModal } from "../modal/WalletLoginModal";

export const buttonType = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  ghostPrimary: "ghostPrimary",
  ghostSecondary: "ghostSecondary"
}

export type ButtonVariant = typeof buttonType[keyof typeof buttonType];

export const buttonScale = {
  lg: "lg",
  md: "md",
  sm: "sm",
  icon: "icon"
}

export type ButtonScale = typeof buttonScale[keyof typeof buttonScale];

export interface ButtonProps {
  children: React.ReactNode,
  variant?: ButtonVariant,
  scale?: ButtonScale,
  disabled?: boolean,
  wide?: boolean,
  className?: string,
  loading?: boolean
}


export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({
  children,
  variant = buttonType.primary,
  scale = buttonScale.md,
  wide,
  disabled,
  className,
  loading,
  ...rest
}) => {

  const buttonClasses = useMemo(() => {
    const backgroundClass = () => {
      switch (variant) {
        case buttonType.primary:
          return "bg-primary"
        case buttonType.secondary:
        case buttonType.tertiary:
        case buttonType.ghostPrimary:
        case buttonType.ghostSecondary:
          return "bg-white"
        default:
          return `bg-white`
      }
    }


    const borderClass = () => {
      switch (variant) {
        case buttonType.secondary:
          return "border-[1.5px] border-primary"
        case buttonType.tertiary:
          return "border-[1.5px] border-border-outline"
        default:
          return ``
      }
    }

    const fontClass = () => {
      switch (scale) {
        case buttonScale.lg:
          return 'text-base'
        case buttonScale.md:
          return 'text-sm'
        case buttonScale.sm:
          return 'text-sm'
      }
    }

    const colorClass = () => {
      switch (variant) {
        case buttonType.primary:
          return "text-white";
        case buttonType.secondary:
          return "text-primary";
        case buttonType.tertiary:
          return "text-border-outline"
        case buttonType.ghostPrimary:
          return "text-primary";
        case buttonType.ghostSecondary:
          return "text-border-outline"
        default:
          return ``
      }
    }

    const heightClass = () => {
      switch (scale) {
        case buttonScale.sm:
          return 'py-2 px-5'
        case buttonScale.md:
          return 'py-[10px] px-5'
        case buttonScale.lg:
          return 'py-3 px-5'
      }
    }

    const radiusClass = () => {
      return 'rounded-[8px]'
    }


    return classNames(
      "flex items-center justify-center",
      backgroundClass(),
      fontClass(),
      colorClass(),
      heightClass(),
      radiusClass(),
      borderClass(),
      className
    )
  }, [scale, variant, className])

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...rest}>
      {loading && <i className="fa fa-spinner fa-spin mr-2"></i>}
      {children}
    </button>
  )
}

export const ConnectWalletButton = ({ className, scale = buttonScale.lg }: {
  className?: string
  scale?: ButtonScale
}) => {
  const { account } = useWeb3React()

  const [isShow, setIsShow] = useState(false)
  const connect = () => {
    setIsShow(true)
  }
  if (account) return <></>
  return (
    <>
      <Button className={classNames("w-full", className)} scale={scale} onClick={connect}>Connect Wallet</Button>
      <WalletLoginModal isOpenModal={isShow} setIsOpenModal={setIsShow} />
    </>
  )
}