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
      <div className={`w-full`}>
        <div className="w-full">
          <Header />
        </div>
        <div>{children}</div>
        {isMobile && <Footer />}
      </div>
    </div>
  )
}