import { ButtonHTMLAttributes, useMemo } from "react";
import { classNames } from "../../utils/string";

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
          return 'text-xs font-semibold'
        case buttonScale.md:
          return 'text-sm font-semibold'
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
        case buttonScale.lg:
          return 'py-1 px-2'
        case buttonScale.md:
          return 'py-2 px-4'
        case buttonScale.sm:
          return 'py-3 px-5'
      }
    }

    const radiusClass = () => {
      switch (scale) {
        case buttonScale.lg:
          return 'rounded-2xl'
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
      borderClass()
      )
  },[scale, variant])

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}