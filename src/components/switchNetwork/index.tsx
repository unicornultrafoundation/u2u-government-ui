import { ButtonHTMLAttributes, useMemo } from "react";
import { classNames } from "../../utils/string";
import {useAuth} from "../../hooks";

export const buttonType = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  ghostPrimary: "ghostPrimary",
  ghostSecondary: "ghostSecondary",
  danger: "danger"
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
  className?: string,
  loading?: boolean
}


export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({
  children,
  variant = buttonType.danger,
  scale = buttonScale.md,
  disabled,
  className,
  loading,
  ...rest
}) => {

  const buttonClasses = useMemo(() => {
    const backgroundClass = () => {
      switch (variant) {
        case buttonType.primary:
          return "bg-primary hover:bg-primary-dark"
        case buttonType.secondary:
          return "bg-white hover:bg-primary-light"
        case buttonType.danger:
          return "bg-white hover:bg-error-light"
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
        case buttonType.primary:
          return "border-[1.5px] border-primary border:bg-primary-dark"
        case buttonType.secondary:
          return "border-[1.5px] border-primary hover:border-primary-dark"
        case buttonType.tertiary:
          return "border-[1.5px] border-border-outline"
        case buttonType.danger:
          return "border-[1.5px] border-error hover:border-error-dark"
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
          return "text-neutral hover:text-neutral-surface-active hover:fill-neutral-surface-active hover:stroke-neutral-surface-active fill-neutral stroke-neutral";
        case buttonType.secondary:
          return "text-primary hover:text-primary-dark hover:fill-primary-dark hover:stroke-primary-dark fill-primary stroke-primary";
        case buttonType.tertiary:
          return "text-border-outline fill-border-outline stroke-border-outline"
        case buttonType.ghostPrimary:
          return "text-primary hover:text-primary-dark hover:fill-primary-dark hover:stroke-primary-dark fill-primary stroke-primary";
        case buttonType.ghostSecondary:
          return "text-border-outline hover:text-neutral-surface-active hover:fill-neutral-surface-active hover:stroke-neutral-surface-active fill-neutral stroke-neutral"
        case buttonType.danger:
          return "text-error hover:text-error-dark hover:fill-error-dark hover:stroke-error-dark fill-error stroke-error";
        default:
          return ``
      }
    }

    const heightClass = () => {
      switch (scale) {
        case buttonScale.sm:
          return 'h-[36px] px-5'
        case buttonScale.md:
          return 'h-[40px] px-5'
        case buttonScale.lg:
          return 'h-[48px] px-6'
        case buttonScale.icon:
          return 'p-0'
      }
    }

    const radiusClass = () => {
      if (scale === buttonScale.icon) return 'rounded-full'
      return 'rounded-[24px]'
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

export const SwitchNetworkButton = ({ className, scale = buttonScale.lg }: {
  className?: string
  scale?: ButtonScale
}) => {
  // const { account } = useWeb3React()
  const { switchToNetwork } = useAuth();

  return (
    <>
      <Button className={classNames("w-full rounded-[100px]", className)} scale={scale} onClick={switchToNetwork}>Switch Network</Button>
    </>
  )
}