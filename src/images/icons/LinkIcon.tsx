import { classNames } from "../../utils"
import { IconProps } from "../index"
export const LinkIcon = ({ className = "", onClick }: IconProps) => {
  return (
    <svg className={classNames("", className)} onClick={onClick} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.66684 3.33329H5.46684C4.7201 3.33329 4.34645 3.33329 4.06124 3.47862C3.81036 3.60645 3.60653 3.81027 3.4787 4.06116C3.33337 4.34637 3.33337 4.72002 3.33337 5.46676V10.5334C3.33337 11.2802 3.33337 11.6533 3.4787 11.9385C3.60653 12.1894 3.81036 12.3936 4.06124 12.5214C4.34618 12.6666 4.71937 12.6666 5.46465 12.6666H10.5354C11.2807 12.6666 11.6534 12.6666 11.9383 12.5214C12.1892 12.3936 12.3937 12.1892 12.5215 11.9384C12.6667 11.6534 12.6667 11.2806 12.6667 10.5354V9.33329M13.3334 5.99996V2.66663M13.3334 2.66663H10M13.3334 2.66663L8.66671 7.33329" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}





