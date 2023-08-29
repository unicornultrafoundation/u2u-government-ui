import { ReactNode } from "react"
import { LeftBar } from "../left-bar"
import { Header } from "../header"


export const boxType = {
  light: "light"
}

export type BoxVariant = typeof boxType[keyof typeof boxType];

interface Props {
  children: ReactNode  
  variant?: BoxVariant,

}


export const Layout = ({children}: Props) => {
  return (
    <div className="flex">
      <LeftBar></LeftBar>
      <div className="w-full px-5">
        <Header/>
        <div className="py-6">{children}</div> 
      </div>
    </div>
  )
}