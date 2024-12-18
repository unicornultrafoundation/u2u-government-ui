import { classNames } from "../../utils"
import { IconProps } from "../index"
export const MenuIcon = ({ className = "", onClick }: IconProps) => {
  return (
    <svg onClick={onClick} width="20" height="12" viewBox="0 0 20 12" className={classNames("stroke-text-secondary", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11H19M1 6H19M1 1H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}


