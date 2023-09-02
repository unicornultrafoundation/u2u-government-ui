import { ReactNode, useMemo } from "react"
import { classNames } from "../../utils"

export const boxType = {
  primary: "primary",
  transparent: "transparent",
  gradient: "gradient",
  gradient2: "gradient2"
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
      switch (variant) {
        case boxType.primary:
          return "bg-light-1"
        case boxType.transparent:
          return "bg-transparent"
        case boxType.gradient:
          return "bg-gradient-to-br from-cyan to-[#EBFCFB]" 
        case boxType.gradient2:
          return "bg-gradient-to-br from-[#75FDDE] to-[#6885FB]"
        default:
          return ``
      }
    }

    const boxRadius = "rounded-[8px]"

    const boxWidth = "w-full"

    const heightClass = () => {
      switch (scale) {
        case boxScale.lg:
          return 'p-[24px]'
        case boxScale.md:
          return 'p-[16px]'
        case boxScale.sm:
          return 'p-[12px]'
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