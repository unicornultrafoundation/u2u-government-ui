import { ReactNode, useMemo } from "react"
import { classNames } from "../../utils"

export const boxType = {
  primary: "primary",
  transparent: "transparent",
  gradient: "gradient"
}

export type BoxVariant = typeof boxType[keyof typeof boxType];

export const boxScale = {
  sm: "sm",
  md: "md",
  lg: "lg"
}
export type BoxScale = typeof boxScale[keyof typeof boxScale];

interface BoxProps {
  children: ReactNode
  className?: string
  variant?: BoxVariant
  scale?: BoxScale
}

export const Box = ({
  children,
  variant = boxType.primary,
  scale = boxScale.md,
  className
}: BoxProps) => {

  const boxClasses = useMemo(() => {
    const backgroundClass = () => {
      switch (true) {
        case variant === boxType.primary:
          return "bg-light-1"
        case variant === boxType.transparent:
          return "bg-transparent"
        case variant === boxType.gradient:
          return "bg-gradient-to-br from-cyan to-white"
        default:
          return ``
      }
    }

    const boxRadius = "rounded-[8px]"

    const boxWidth = "w-full"

    const heightClass = () => {
      switch (scale) {
        case boxScale.lg:
          return 'p-[12px]'
        case boxScale.md:
          return 'p-[16px]'
        case boxScale.sm:
          return 'p-[24px]'
      }
    }

    return classNames(
      backgroundClass(),
      boxRadius,
      boxWidth,
      heightClass(),
      className
    )
  }, [className, variant, scale])

  return (
    <div className={boxClasses}>{children}</div>
  )
}