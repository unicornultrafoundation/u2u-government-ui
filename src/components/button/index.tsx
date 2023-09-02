import { ButtonHTMLAttributes, useMemo } from "react";
import { classNames } from "../../utils/string";
import { useAuth } from "../../hooks";
import { ConnectorNames } from "../../utils";
import { useWeb3React } from "@web3-react/core";

export const buttonType = {
  primary: "primary",
  secondary: "secondary",
  light: "light"
}

export type ButtonVariant = typeof buttonType[keyof typeof buttonType];

export const buttonScale = {
  sm: "sm",
  md: "md",
  lg: "lg"
}

export type ButtonScale = typeof buttonScale[keyof typeof buttonScale];

export interface ButtonProps {
  children: React.ReactNode,
  variant?: ButtonVariant,
  scale?: ButtonScale,
  disabled?: boolean,
  wide?: boolean,
  className?: string
}


export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({
  children,
  variant = buttonType.primary,
  scale = buttonScale.md,
  wide,
  disabled,
  className,
  ...rest
}) => {

  const buttonClasses = useMemo(() => {
    const backgroundClass = () => {
      switch (true) {
        case variant === buttonType.primary:
          return "bg-green"
        case variant === buttonType.secondary:
          return "bg-white"
        case variant === buttonType.light:
          return "bg-light"
        default:
          return ``
      }
    }

    const fontClass = () => {
      switch (scale) {
        case buttonScale.sm:
          return 'text-xs font-medium'
        case buttonScale.md:
          return 'text-sm font-medium'
        case buttonScale.lg:
          return 'text-md font-semibold'
      }
    }

    const colorClass = () => {
      switch (variant) {
        case buttonType.primary:
          return "text-white";
        case buttonType.secondary:
          return "text-green"
        case buttonType.light:
          return "text-green"
        default:
          return ``
      }
    }

    const heightClass = () => {
      switch (scale) {
        case buttonScale.sm:
          return 'py-1 px-2'
        case buttonScale.md:
          return 'py-2 px-4'
        case buttonScale.lg:
          return 'py-3 px-5'
      }
    }

    const radiusClass = () => {
      switch (scale) {
        case buttonScale.lg:
          return 'rounded-[40px]'
        case buttonScale.md:
          return 'rounded-[20px]'
        case buttonScale.sm:
          return 'rounded-lg'
      }
    }

    const borderClass = () => {
      switch (variant) {
        case buttonType.secondary:
          return "border border-green"
        default:
          return ""
      }
    }

    return classNames(
      backgroundClass(),
      fontClass(),
      colorClass(),
      heightClass(),
      radiusClass(),
      borderClass(),
      className
      )
  },[scale, variant, className])

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

export const ConnectWalletButton = ({className, scale = buttonScale.lg}: {
  className?: string
  scale?: ButtonScale
}) => {
  const { login } = useAuth()
  const { account } = useWeb3React()
  const connect = () => {
    login(ConnectorNames.Injected)
  }
  if (account) return <></>
  return (
    <Button className={classNames("w-full", className)} scale={scale} onClick={connect}>Connect Wallet</Button>
  )
}