import { classNames } from "../../utils"
import { IconProps } from "../index"
export const CloseIcon = ({ className = "", onClick }: IconProps) => {
  return (
    <svg onClick={onClick} width="24" height="24" className={classNames("stroke-text-disabled", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

