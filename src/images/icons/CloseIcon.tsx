import { classNames } from "../../utils"
import { IconProps } from "../index"
export const CloseIcon = ({ className = "", onClick }: IconProps) => {
  return (
    <svg onClick={onClick} width="24" height="24" className={classNames("fill-text-disabled stroke-text-disabled", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

