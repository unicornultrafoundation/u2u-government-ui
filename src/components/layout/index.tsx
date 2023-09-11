import { ReactNode, useEffect } from "react"
import { LeftBar } from "../left-bar"
import { Header } from "../header"
import { useAuth } from "../../hooks";
import { connectorLocalStorageKey } from "../../contants";
import { ConnectorNames } from "../../utils";
import { isMobile } from 'mobile-device-detect';
import { Footer } from "../footer";

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  const { login } = useAuth()
  useEffect(() => {
    try {
      const connectorID = window.localStorage.getItem(connectorLocalStorageKey);
      if (connectorID) {
        (async () => {
          await login(connectorID as ConnectorNames)
        })()
      } 
      } catch (error) {
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="flex">
      {!isMobile && <LeftBar />}
      <div className={`${!isMobile && 'ml-[300px]'} w-full`}>
        <div className="w-full">
          <Header />
        </div>
        <div className="md:px-5">
          <div className="md:p-8 p-4 pb-10">{children}</div>
        </div>
        {isMobile && <Footer />}
      </div>
    </div>
  )
}