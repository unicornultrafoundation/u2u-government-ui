import { ReactNode } from "react"
import { LeftBar } from "../left-bar"


interface Props {
  children: ReactNode
}


export const Layout = ({children}: Props) => {
  return (
    <div className="flex">
      <LeftBar></LeftBar>
      <div>{children}</div> 
    </div>
  )
}