import { classNames } from "../../utils"
import { IconProps } from "../index"
export const LogoutIcon = ({ className = "", onClick }: IconProps) => {
  return (
    <svg onClick={onClick} className={classNames("stroke-text-secondary", className)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.016 7.3895V6.4565C15.016 4.4215 13.366 2.7715 11.331 2.7715H6.45597C4.42197 2.7715 2.77197 4.4215 2.77197 6.4565V17.5865C2.77197 19.6215 4.42197 21.2715 6.45597 21.2715H11.341C13.37 21.2715 15.016 19.6265 15.016 17.5975V16.6545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.8096 12.0214H9.76855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.8811 9.10629L21.8091 12.0213L18.8811 14.9373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

